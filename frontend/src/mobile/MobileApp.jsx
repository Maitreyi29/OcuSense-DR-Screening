import React, { useState, useEffect } from 'react';
import SplashScreen from './SplashScreen';
import WelcomeScreen from './WelcomeScreen';
import AuthScreen from './AuthScreen';
import HomeScreen from './HomeScreen';
import ScreeningScreen from './ScreeningScreen';
import ResultsScreen from './ResultsScreen';
import HistoryScreen from './HistoryScreen';
import ProfileScreen from './ProfileScreen';
import MobileBottomNav from './MobileBottomNav';
import { supabase } from '../supabaseClient';
import { formatSupabaseUser } from '../services/authService';

export default function MobileApp() {
  // Splash Screen Stage (1.8s timer)
  const [showSplash, setShowSplash] = useState(true);

  // Authentication State with Supabase
  const [sessionUser, setSessionUser] = useState(null);
  const [isAuthLoading, setIsAuthLoading] = useState(true);

  // Unauthenticated Sub-flow: 'welcome' | 'auth-login' | 'auth-signup'
  const [authFlowState, setAuthFlowState] = useState('welcome');

  // Authenticated Main Tab: 'home' | 'screening' | 'results' | 'history' | 'profile'
  const [activeTab, setActiveTab] = useState('home');

  // Active screening result data for ResultsScreen view
  const [activeResult, setActiveResult] = useState(null);

  // Screening history count badge state
  const [historyCount, setHistoryCount] = useState(0);

  // 1. Splash Screen Timer
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 1800);
    return () => clearTimeout(timer);
  }, []);

  // 2. Supabase Auth Session Persistence & Listener
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        setSessionUser(formatSupabaseUser(session.user));
      } else {
        setSessionUser(null);
      }
      setIsAuthLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        setSessionUser(formatSupabaseUser(session.user));
      } else {
        setSessionUser(null);
      }
      setIsAuthLoading(false);
    });

    return () => {
      subscription?.unsubscribe();
    };
  }, []);

  // 3. Keep history count updated
  useEffect(() => {
    const updateCount = () => {
      try {
        const saved = localStorage.getItem('ocusense_screening_history');
        if (saved) {
          const list = JSON.parse(saved);
          setHistoryCount(list.length);
        } else {
          setHistoryCount(0);
        }
      } catch (e) {
        setHistoryCount(0);
      }
    };
    updateCount();
    window.addEventListener('storage', updateCount);
    return () => window.removeEventListener('storage', updateCount);
  }, [activeResult, activeTab]);

  // Handle successful authentication
  const handleAuthSuccess = (user) => {
    setSessionUser(formatSupabaseUser(user));
    setActiveTab('home');
  };

  // Handle logout
  const handleLogout = async () => {
    await supabase.auth.signOut();
    setSessionUser(null);
    setAuthFlowState('welcome');
    setActiveTab('home');
    setActiveResult(null);
  };

  // Handle analysis completion -> switch to results view
  const handleAnalysisComplete = (resultData) => {
    setActiveResult(resultData);
    setActiveTab('results');
  };

  // Handle tab switching from bottom nav
  const handleTabChange = (tabId) => {
    if (tabId === 'screening' && activeResult && activeTab === 'results') {
      // Stay or reset
    }
    setActiveTab(tabId);
  };

  // Render Splash Screen
  if (showSplash || isAuthLoading) {
    return <SplashScreen />;
  }

  // Render Unauthenticated Flow
  if (!sessionUser) {
    if (authFlowState === 'auth-login') {
      return (
        <AuthScreen
          initialMode="login"
          onAuthSuccess={handleAuthSuccess}
          onBack={() => setAuthFlowState('welcome')}
        />
      );
    }

    if (authFlowState === 'auth-signup') {
      return (
        <AuthScreen
          initialMode="signup"
          onAuthSuccess={handleAuthSuccess}
          onBack={() => setAuthFlowState('welcome')}
        />
      );
    }

    return (
      <WelcomeScreen
        onGetStarted={() => setAuthFlowState('auth-signup')}
        onLogin={() => setAuthFlowState('auth-login')}
      />
    );
  }

  // Render Authenticated Mobile App Shell
  return (
    <div className="relative min-h-screen bg-[#070b14] text-slate-100 max-w-md mx-auto shadow-2xl overflow-x-hidden font-sans select-none">
      
      {/* Main Tab Screen Switcher */}
      <main className="w-full">
        {activeTab === 'home' && (
          <HomeScreen
            user={sessionUser}
            onStartScreening={() => setActiveTab('screening')}
            onNavigateTab={(tab) => setActiveTab(tab)}
          />
        )}

        {activeTab === 'screening' && (
          <ScreeningScreen
            onAnalysisComplete={handleAnalysisComplete}
          />
        )}

        {activeTab === 'results' && (
          <ResultsScreen
            resultData={activeResult}
            onAnalyzeAnother={() => {
              setActiveResult(null);
              setActiveTab('screening');
            }}
          />
        )}

        {activeTab === 'history' && (
          <HistoryScreen
            onSelectRecord={(item) => {
              setActiveResult(item);
              setActiveTab('results');
            }}
            onStartScreening={() => {
              setActiveResult(null);
              setActiveTab('screening');
            }}
          />
        )}

        {activeTab === 'profile' && (
          <ProfileScreen
            user={sessionUser}
            onLogout={handleLogout}
          />
        )}
      </main>

      {/* Fixed Mobile Bottom Navigation Bar */}
      <MobileBottomNav
        activeTab={activeTab === 'results' ? 'screening' : activeTab}
        onTabChange={handleTabChange}
        historyCount={historyCount}
      />

    </div>
  );
}
