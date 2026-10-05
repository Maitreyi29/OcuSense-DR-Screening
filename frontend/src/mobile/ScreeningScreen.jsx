import React, { useState, useRef } from 'react';
import { UploadCloud, FileImage, X, Sparkles, AlertCircle, Loader2, Camera, ShieldCheck, CheckCircle2 } from 'lucide-react';

const API_BASE_URL = 'https://ocusense-api.onrender.com';

const PROGRESS_STEPS = [
  'Image received',
  'Preprocessing (224x224)',
  'MobileNetV2 AI inference',
  'Generating Grad-CAM explanation',
  'Preparing clinical results'
];

export default function ScreeningScreen({ onAnalysisComplete }) {
  const fileInputRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isLoadingSample, setIsLoadingSample] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  // Handle file selection
  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      setErrorMessage(null);
      const reader = new FileReader();
      reader.onloadend = () => setPreviewUrl(reader.result);
      reader.readAsDataURL(file);
    }
  };

  // Clear selected image
  const handleClear = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
    setErrorMessage(null);
  };

  // Fetch sample image from real live backend
  const handleLoadSample = async () => {
    setIsLoadingSample(true);
    setErrorMessage(null);

    try {
      const res = await fetch(`${API_BASE_URL}/api/sample`);
      if (res.ok) {
        const data = await res.json();
        if (data.sample_image_base64) {
          setPreviewUrl(data.sample_image_base64);
          const blob = await (await fetch(data.sample_image_base64)).blob();
          const file = new File([blob], 'sample_retina.png', { type: 'image/png' });
          setSelectedFile(file);
        } else {
          throw new Error('Sample image data empty.');
        }
      } else {
        throw new Error('Could not load sample image from cloud backend.');
      }
    } catch (err) {
      setErrorMessage('Unable to load sample image from backend. Please select a local retinal fundus image.');
    } finally {
      setIsLoadingSample(false);
    }
  };

  // Run AI Analysis with live progress steps & POST /api/predict
  const handleAnalyze = async () => {
    if (!selectedFile && !previewUrl) return;

    setIsAnalyzing(true);
    setErrorMessage(null);
    setCurrentStepIndex(0);

    // Progress stepper animation timer
    const stepInterval = setInterval(() => {
      setCurrentStepIndex((prev) => {
        if (prev < PROGRESS_STEPS.length - 1) return prev + 1;
        return prev;
      });
    }, 800);

    try {
      // Step A: Prepare FormData
      let fileToUpload = selectedFile;
      if (!fileToUpload && previewUrl) {
        const blob = await (await fetch(previewUrl)).blob();
        fileToUpload = new File([blob], 'retina_input.png', { type: 'image/png' });
      }

      const formData = new FormData();
      formData.append('file', fileToUpload);

      // Step B: Warm up readiness check
      try {
        const warmupController = new AbortController();
        const warmupTimeout = setTimeout(() => warmupController.abort(), 15000);
        await fetch(`${API_BASE_URL}/api/health`, { signal: warmupController.signal });
        clearTimeout(warmupTimeout);
      } catch (warmupErr) {
        console.warn('[OcuSense Mobile] Health check timeout/error:', warmupErr);
      }

      // Step C: Execute POST request to /api/predict
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 120000); // 120s timeout for Render cold start

      const res = await fetch(`${API_BASE_URL}/api/predict`, {
        method: 'POST',
        body: formData,
        signal: controller.signal,
      });
      clearTimeout(timeoutId);

      if (!res.ok) {
        throw new Error(`Server status ${res.status}`);
      }

      const data = await res.json();
      
      // Ensure all progress steps show before navigation
      setCurrentStepIndex(PROGRESS_STEPS.length - 1);
      setTimeout(() => {
        clearInterval(stepInterval);
        setIsAnalyzing(false);

        // Save to localStorage history
        const historyItem = {
          ...data,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', day: 'numeric', month: 'short' }),
        };
        try {
          const saved = JSON.parse(localStorage.getItem('ocusense_screening_history') || '[]');
          localStorage.setItem('ocusense_screening_history', JSON.stringify([historyItem, ...saved.slice(0, 19)]));
        } catch (e) {
          console.error('History save error', e);
        }

        onAnalysisComplete(data);
      }, 600);

    } catch (err) {
      clearInterval(stepInterval);
      setIsAnalyzing(false);
      console.error('[OcuSense Mobile] Prediction failed:', err);
      setErrorMessage('AI screening service is currently unavailable. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-[#070b14] text-slate-100 flex flex-col p-5 pb-24 space-y-6">
      
      {/* Title & Subtitle Header */}
      <div className="pt-2 space-y-1 text-left">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-black text-white tracking-tight">
            Retinal Screening
          </h1>
          <span className="px-2.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 font-mono text-[10px] font-semibold">
            MobileNetV2 XAI
          </span>
        </div>
        <p className="text-xs text-slate-400 leading-relaxed">
          Upload a retinal fundus image to begin AI-assisted screening.
        </p>
      </div>

      {/* Error Banner */}
      {errorMessage && (
        <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-start gap-3 animate-fadeIn">
          <AlertCircle className="w-5 h-5 text-rose-400 flex-shrink-0 mt-0.5" />
          <div className="space-y-1">
            <h4 className="font-bold text-rose-200">Screening Unavailable</h4>
            <p className="text-slate-300 text-[11px] leading-relaxed">{errorMessage}</p>
          </div>
        </div>
      )}

      {/* Live AI Progress View vs Upload/Preview Card */}
      {isAnalyzing ? (
        <div className="glass-panel p-6 rounded-3xl border border-cyan-500/40 bg-slate-900/80 space-y-6 animate-fadeIn text-center">
          {/* Glowing Animated Retina Scanner */}
          <div className="relative w-44 h-44 mx-auto rounded-3xl bg-slate-950 border border-cyan-500/50 p-2 overflow-hidden shadow-2xl shadow-cyan-500/20">
            {previewUrl && (
              <img
                src={previewUrl}
                alt="Scanning preview"
                className="w-full h-full object-cover rounded-2xl opacity-75"
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-500/20 to-transparent animate-[pulse_1.5s_infinite]" />
            <div className="absolute top-0 left-0 w-full h-1 bg-cyan-400 shadow-[0_0_15px_#22d3ee] animate-bounce" />
          </div>

          <div className="space-y-2">
            <h3 className="text-base font-bold text-white flex items-center justify-center gap-2">
              <Loader2 className="w-5 h-5 text-cyan-400 animate-spin" />
              Running Neural Inference...
            </h3>
            <p className="text-xs text-cyan-400 font-mono font-semibold">
              {PROGRESS_STEPS[currentStepIndex]}
            </p>
          </div>

          {/* Step Progress Pills */}
          <div className="space-y-2 text-left bg-slate-950/80 p-4 rounded-2xl border border-slate-800 text-xs font-mono">
            {PROGRESS_STEPS.map((step, idx) => {
              const isDone = idx < currentStepIndex;
              const isCurrent = idx === currentStepIndex;
              return (
                <div key={step} className="flex items-center gap-2.5">
                  <div className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-bold ${
                    isDone ? 'bg-emerald-500 text-slate-950' : isCurrent ? 'bg-cyan-400 text-slate-950 animate-pulse' : 'bg-slate-800 text-slate-500'
                  }`}>
                    {isDone ? '✓' : idx + 1}
                  </div>
                  <span className={isDone ? 'text-emerald-400 font-semibold' : isCurrent ? 'text-cyan-300 font-bold' : 'text-slate-500'}>
                    {step}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      ) : !previewUrl ? (
        /* Touch-Friendly Upload Dropzone Area */
        <div className="space-y-4">
          <div
            onClick={() => fileInputRef.current?.click()}
            className="group relative cursor-pointer rounded-3xl p-8 border-2 border-dashed border-slate-800 hover:border-cyan-500/50 bg-slate-900/40 hover:bg-slate-900/70 transition-all flex flex-col items-center justify-center text-center space-y-4 shadow-xl"
          >
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />

            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-cyan-500/20 to-emerald-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-400 shadow-lg group-active:scale-95 transition-transform">
              <Camera className="w-8 h-8 text-cyan-400" />
            </div>

            <div className="space-y-1">
              <p className="text-sm font-bold text-white">
                Tap to Select or Capture Retina Photo
              </p>
              <p className="text-xs text-slate-400">
                Supports camera capture & photo gallery (JPEG, PNG)
              </p>
            </div>

            <div className="px-3 py-1 rounded-full bg-slate-950 border border-slate-800 text-[10px] text-slate-400 font-mono">
              Auto Resized to 224×224 • RGB Normalized
            </div>
          </div>

          {/* Demo Button: Use Sample Retinal Image */}
          <button
            type="button"
            onClick={handleLoadSample}
            disabled={isLoadingSample}
            className="w-full py-3.5 px-4 rounded-2xl bg-slate-900/80 hover:bg-slate-800 border border-slate-800 text-cyan-400 text-xs font-semibold flex items-center justify-center gap-2 transition-all active:scale-[0.98] cursor-pointer disabled:opacity-50"
          >
            {isLoadingSample ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <FileImage className="w-4 h-4 text-cyan-400" />
            )}
            <span>Use Sample Retinal Image</span>
          </button>
        </div>
      ) : (
        /* Image Selected Preview Card */
        <div className="glass-panel p-5 rounded-3xl border border-slate-800 bg-slate-900/60 space-y-5 animate-fadeIn">
          <div className="flex items-center justify-between">
            <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold inline-flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5" /> Image Selected
            </span>

            <button
              onClick={handleClear}
              className="p-1.5 rounded-xl bg-slate-800/80 text-slate-300 hover:text-rose-400 border border-slate-700/60 text-xs flex items-center gap-1 cursor-pointer"
            >
              <X className="w-4 h-4" />
              <span>Clear</span>
            </button>
          </div>

          {/* Preview Image Container */}
          <div className="relative w-52 h-52 mx-auto rounded-2xl bg-slate-950 p-2 border border-cyan-500/40 shadow-xl overflow-hidden">
            <img
              src={previewUrl}
              alt="Retinal Preview"
              className="w-full h-full object-cover rounded-xl"
            />
            <div className="absolute top-3 left-3 px-2 py-0.5 bg-slate-950/80 rounded border border-slate-800 text-[10px] font-mono text-cyan-400">
              FUNDUS PHOTO
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 text-xs space-y-1.5 font-mono text-slate-300">
            <div className="flex justify-between">
              <span className="text-slate-500">Target Model:</span>
              <span className="text-cyan-400 font-bold">MobileNetV2</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Pipeline:</span>
              <span className="text-emerald-400 font-bold">5-Stage + Grad-CAM</span>
            </div>
          </div>

          {/* Analyze Image Action Button */}
          <button
            onClick={handleAnalyze}
            className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-cyan-500 via-teal-500 to-emerald-500 hover:from-cyan-400 hover:to-emerald-400 text-slate-950 font-extrabold text-sm shadow-xl shadow-cyan-500/20 flex items-center justify-center gap-2 transition-all active:scale-[0.98] cursor-pointer"
          >
            <Sparkles className="w-4 h-4" />
            <span>Analyze Image</span>
          </button>
        </div>
      )}

      {/* Safety Notice */}
      <div className="p-4 rounded-2xl bg-slate-900/40 border border-slate-800 text-[11px] text-slate-400 flex items-start gap-2.5 leading-relaxed">
        <ShieldCheck className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" />
        <span>Images are processed in memory by our secure AI backend and encrypted with SSL during transmission.</span>
      </div>

    </div>
  );
}
