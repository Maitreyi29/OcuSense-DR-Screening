import React, { useState, useEffect } from 'react';
import DynamicBackground from './components/DynamicBackground';
import Navbar from './components/Navbar';
import AuthModal from './components/AuthModal';
import HeroSection from './components/HeroSection';
import UploadSection from './components/UploadSection';
import AnalysisProgress from './components/AnalysisProgress';
import ResultsDashboard from './components/ResultsDashboard';
import ServicesSection from './components/ServicesSection';
import AboutSection from './components/AboutSection';
import PipelineSection from './components/PipelineSection';
import ClassGuide from './components/ClassGuide';
import ModelSpecs from './components/ModelSpecs';
import FaqSection from './components/FaqSection';
import NeedHelpSection from './components/NeedHelpSection';
import ContactSection from './components/ContactSection';
import HistoryModal from './components/HistoryModal';
import FooterDisclaimer from './components/FooterDisclaimer';
import { AlertCircle } from 'lucide-react';

const API_BASE_URL = 'https://ocusense-api.onrender.com';

export default function App() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isLoadingSample, setIsLoadingSample] = useState(false);
  const [resultData, setResultData] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  // Authentication State
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem('ocusense_user_session');
    return saved ? JSON.parse(saved) : null;
  });
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  // Screening History State
  const [history, setHistory] = useState(() => {
    const saved = localStorage.getItem('ocusense_screening_history');
    return saved ? JSON.parse(saved) : [];
  });
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);

  // Backend Health State
  const [backendStatus, setBackendStatus] = useState({ connected: false, device: 'cpu' });

  // 1. Check Backend Health on mount & polling
  useEffect(() => {
    checkHealth();
    const interval = setInterval(checkHealth, 10000);
    return () => clearInterval(interval);
  }, []);

  const checkHealth = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/health`);
      if (res.ok) {
        const data = await res.json();
        setBackendStatus({ connected: true, device: data.device || 'cpu' });
      } else {
        setBackendStatus({ connected: false, device: 'cpu' });
      }
    } catch {
      setBackendStatus({ connected: false, device: 'cpu' });
    }
  };

  // 2. Persist history & user session
  useEffect(() => {
    localStorage.setItem('ocusense_screening_history', JSON.stringify(history));
  }, [history]);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('ocusense_user_session', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('ocusense_user_session');
    }
  }, [currentUser]);

  // 3. User Auth Handlers
  const handleLoginSuccess = (user) => {
    setCurrentUser(user);
  };

  const handleLogout = () => {
    setCurrentUser(null);
  };

  // 4. Smooth Navigation handler
  const handleNavigate = (sectionId) => {
    const elem = document.getElementById(sectionId);
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // 5. File selection
  const handleFileSelect = (file) => {
    setSelectedFile(file);
    setResultData(null);
    setErrorMessage(null);
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewUrl(reader.result);
    };
    reader.readAsDataURL(file);
  };

  // 6. Clear file
  const handleClearFile = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
    setResultData(null);
    setErrorMessage(null);
  };

  // 7. Fetch sample image from backend
  const handleLoadSample = async () => {
    setIsLoadingSample(true);
    setErrorMessage(null);
    setResultData(null);

    try {
      const res = await fetch(`${API_BASE_URL}/api/sample`);
      if (res.ok) {
        const data = await res.json();
        if (data.sample_image_base64) {
          setPreviewUrl(data.sample_image_base64);
          const blob = await (await fetch(data.sample_image_base64)).blob();
          const file = new File([blob], 'sample_retina.png', { type: 'image/png' });
          setSelectedFile(file);
          handleNavigate('screening-area');
        }
      } else {
        setErrorMessage('Could not load sample image from server. Ensure FastAPI is running.');
      }
    } catch {
      setErrorMessage('Backend unavailable. Start backend server at http://127.0.0.1:8000');
    } finally {
      setIsLoadingSample(false);
    }
  };

  // 8. Submit image for inference to POST /api/predict
  const handleStartAnalysis = async () => {
    if (!selectedFile && !previewUrl) return;

    setIsAnalyzing(true);
    setErrorMessage(null);

    try {
      // Step A: Prepare file for upload
      let fileToUpload = selectedFile;
      if (!fileToUpload && previewUrl) {
        const blob = await (await fetch(previewUrl)).blob();
        fileToUpload = new File([blob], 'retina_input.png', { type: 'image/png' });
      }

      // Step B: Warm up the backend if it's cold-starting (Render free tier sleeps after inactivity)
      console.log('[OcuSense] Checking backend readiness...');
      try {
        const warmupController = new AbortController();
        const warmupTimeout = setTimeout(() => warmupController.abort(), 60000); // 60s for cold start
        const healthRes = await fetch(`${API_BASE_URL}/api/health`, { signal: warmupController.signal });
        clearTimeout(warmupTimeout);
        if (!healthRes.ok) {
          throw new Error('Backend health check failed');
        }
        const healthData = await healthRes.json();
        console.log('[OcuSense] Backend ready:', healthData);
      } catch (warmupErr) {
        if (warmupErr.name === 'AbortError') {
          throw new Error('Backend server is waking up and took too long. Please wait 30 seconds and try again — Render free tier needs time to cold-start.');
        }
        console.warn('[OcuSense] Health check failed, proceeding anyway:', warmupErr.message);
      }

      // Step C: Send image for prediction with a generous timeout
      const formData = new FormData();
      formData.append('file', fileToUpload);

      const predictWithTimeout = async (timeoutMs = 120000) => {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

        try {
          console.log('[OcuSense] Sending image to /api/predict...');
          const res = await fetch(`${API_BASE_URL}/api/predict`, {
            method: 'POST',
            body: formData,
            signal: controller.signal,
          });
          clearTimeout(timeoutId);
          return res;
        } catch (fetchErr) {
          clearTimeout(timeoutId);
          throw fetchErr;
        }
      };

      // Try prediction, retry once on network failure
      let res;
      try {
        res = await predictWithTimeout(120000);
      } catch (firstErr) {
        if (firstErr.name === 'AbortError') {
          throw new Error('Analysis timed out after 2 minutes. The server may be under heavy load. Please try again.');
        }
        console.warn('[OcuSense] First attempt failed, retrying in 3s...', firstErr.message);
        await new Promise(resolve => setTimeout(resolve, 3000));
        try {
          res = await predictWithTimeout(120000);
        } catch (retryErr) {
          if (retryErr.name === 'AbortError') {
            throw new Error('Analysis timed out after retry. Please ensure the backend is running and try again.');
          }
          throw new Error(`Network error: Could not connect to the AI backend. Please check your internet connection and ensure the server at ${API_BASE_URL} is running.`);
        }
      }

      if (!res.ok) {
        let errorDetail = 'Prediction request failed';
        try {
          const errData = await res.json();
          errorDetail = errData.detail || errorDetail;
        } catch {
          errorDetail = `Server returned status ${res.status}: ${res.statusText}`;
        }
        throw new Error(errorDetail);
      }

      const data = await res.json();
      console.log('[OcuSense] Prediction successful:', data.class_name, `(${(data.confidence * 100).toFixed(1)}%)`);
      
      setTimeout(() => {
        setResultData(data);
        setIsAnalyzing(false);

        const historyItem = {
          ...data,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };
        setHistory((prev) => [historyItem, ...prev.slice(0, 9)]);

        // Auto-scroll to results
        setTimeout(() => {
          const el = document.getElementById('screening-area');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 200);
      }, 1500);

    } catch (err) {
      console.error('[OcuSense] Analysis failed:', err);
      setIsAnalyzing(false);
      setErrorMessage(err.message || 'Error communicating with the AI backend. Please try again.');
      // Scroll to error banner so user sees it
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 100);
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col font-sans bg-[#0b0f19] text-slate-100 selection:bg-cyan-500 selection:text-white">
      
      {/* Interactive Medical/AI Dynamic Background */}
      <DynamicBackground />

      {/* Main Header / Navbar */}
      <Navbar
        backendStatus={backendStatus}
        currentUser={currentUser}
        onOpenAuth={() => setIsAuthOpen(true)}
        onLogout={handleLogout}
        historyCount={history.length}
        openHistory={() => setIsHistoryOpen(true)}
        onNavigate={handleNavigate}
      />

      {/* Main Page Content */}
      <main className="relative z-10 flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        
        {/* Error Banner */}
        {errorMessage && (
          <div className="mb-6 p-4 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center justify-between animate-fadeIn">
            <div className="flex items-center gap-2.5">
              <AlertCircle className="w-5 h-5 text-rose-400 flex-shrink-0" />
              <span>{errorMessage}</span>
            </div>
            <button
              onClick={() => setErrorMessage(null)}
              className="text-slate-400 hover:text-white font-bold text-base px-2"
            >
              ×
            </button>
          </div>
        )}

        {/* Hero Section with Interactive 3D Cursor Eye */}
        <HeroSection
          onStartScreening={() => handleNavigate('screening-area')}
          onLearnMore={() => handleNavigate('pipeline-section')}
          onLoadSample={handleLoadSample}
          isLoadingSample={isLoadingSample}
        />

        {/* Screening Core Area: Upload / Progress / Results */}
        {isAnalyzing ? (
          <AnalysisProgress previewUrl={previewUrl} />
        ) : resultData ? (
          <ResultsDashboard
            resultData={resultData}
            onReset={handleClearFile}
          />
        ) : (
          <UploadSection
            selectedFile={selectedFile}
            previewUrl={previewUrl}
            onFileSelect={handleFileSelect}
            onClearFile={handleClearFile}
            onStartAnalysis={handleStartAnalysis}
            onLoadSample={handleLoadSample}
            isAnalyzing={isAnalyzing}
          />
        )}

        {/* Platform Services Section */}
        <ServicesSection onStartScreening={() => handleNavigate('screening-area')} />

        {/* About OcuSense Section */}
        <AboutSection />

        {/* How It Works Pipeline Section */}
        <PipelineSection />

        {/* 5-Stage Classification Guide Section */}
        <ClassGuide />

        {/* Technical Model Specs Section */}
        <ModelSpecs />

        {/* FAQ Accordion Section */}
        <FaqSection />

        {/* Need Help Section */}
        <NeedHelpSection onStartScreening={() => handleNavigate('screening-area')} />

        {/* Contact Us Section */}
        <ContactSection />

      </main>

      {/* Log In / Sign Up Modal */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        onLoginSuccess={handleLoginSuccess}
      />

      {/* History Modal */}
      <HistoryModal
        isOpen={isHistoryOpen}
        onClose={() => setIsHistoryOpen(false)}
        history={history}
        onSelectHistory={(item) => {
          setResultData(item);
          handleNavigate('screening-area');
        }}
        onClearHistory={() => setHistory([])}
      />

      {/* Footer Disclaimer */}
      <FooterDisclaimer />

    </div>
  );
}
