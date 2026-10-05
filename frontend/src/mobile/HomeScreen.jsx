import React, { useState } from 'react';
import { Eye, ArrowRight, Activity, History, Shield, HelpCircle, Mail, Sparkles, CheckCircle2 } from 'lucide-react';

export default function HomeScreen({ user, onStartScreening, onNavigateTab }) {
  const userName = user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'Clinician';
  const [showHowItWorks, setShowHowItWorks] = useState(false);

  return (
    <div className="min-h-screen bg-[#070b14] text-slate-100 flex flex-col p-5 pb-24 space-y-6">
      
      {/* Top Greeting Bar */}
      <div className="pt-3 flex items-center justify-between">
        <div className="space-y-0.5">
          <span className="text-[11px] uppercase tracking-wider text-cyan-400 font-semibold font-mono">
            Clinical Screening Portal
          </span>
          <h2 className="text-xl font-bold text-white tracking-tight">
            Welcome, {userName}
          </h2>
        </div>

        <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-cyan-500/20 to-emerald-500/20 border border-cyan-500/30 flex items-center justify-center">
          <Eye className="w-5 h-5 text-cyan-400" />
        </div>
      </div>

      {/* Primary Action Card: Start Screening */}
      <div className="relative rounded-3xl bg-gradient-to-br from-slate-900 via-slate-900 to-cyan-950/40 border border-cyan-500/30 p-6 shadow-2xl shadow-cyan-500/10 overflow-hidden space-y-4">
        {/* Background glow */}
        <div className="absolute -right-8 -top-8 w-36 h-36 rounded-full bg-cyan-500/20 blur-2xl pointer-events-none" />

        <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 font-bold uppercase">
          <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
          <span>Core AI Pipeline</span>
        </div>

        <div className="space-y-1">
          <h3 className="text-lg font-extrabold text-white">
            Diabetic Retinopathy Screening
          </h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            Upload or capture a retinal fundus image for instant 5-stage classification and Grad-CAM explainability.
          </p>
        </div>

        <button
          onClick={onStartScreening}
          className="w-full py-3.5 px-5 rounded-2xl bg-gradient-to-r from-cyan-500 to-emerald-500 hover:from-cyan-400 hover:to-emerald-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/20 active:scale-[0.98] transition-all cursor-pointer"
        >
          <span>Start Screening</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* System Status Pill */}
      <div className="px-4 py-3 rounded-2xl bg-slate-900/60 border border-slate-800/80 flex items-center justify-between text-xs font-mono">
        <span className="text-slate-400 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          AI Cloud Engine
        </span>
        <span className="text-emerald-400 font-semibold">MobileNetV2 Live</span>
      </div>

      {/* Quick Access Grid */}
      <div className="space-y-2.5">
        <span className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold font-mono">
          Screening Tools & Info
        </span>

        <div className="grid grid-cols-2 gap-3">
          {/* History */}
          <button
            onClick={() => onNavigateTab('history')}
            className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800/80 hover:border-slate-700 text-left space-y-2 transition-all active:scale-[0.98] cursor-pointer"
          >
            <div className="w-8 h-8 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center">
              <History className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-white">Past Records</h4>
              <p className="text-[10px] text-slate-400">View screening history</p>
            </div>
          </button>

          {/* How It Works */}
          <button
            onClick={() => setShowHowItWorks(true)}
            className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800/80 hover:border-slate-700 text-left space-y-2 transition-all active:scale-[0.98] cursor-pointer"
          >
            <div className="w-8 h-8 rounded-xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center">
              <Activity className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-white">How It Works</h4>
              <p className="text-[10px] text-slate-400">MobileNetV2 & XAI</p>
            </div>
          </button>
        </div>
      </div>

      {/* Medical Safety Banner */}
      <div className="p-4 rounded-2xl bg-slate-900/40 border border-slate-800/80 text-[11px] text-slate-400 space-y-1.5 leading-relaxed">
        <div className="flex items-center gap-1.5 text-cyan-400 font-semibold text-xs font-mono uppercase">
          <Shield className="w-3.5 h-3.5" />
          <span>Clinical Screening Scope</span>
        </div>
        <p>
          OcuSense is designed for primary healthcare triage and educational research. Results do not substitute formal ophthalmologic diagnosis.
        </p>
      </div>

      {/* How It Works Popup Modal */}
      {showHowItWorks && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-6 animate-fadeIn">
          <div className="bg-[#0b0f19] border border-slate-800 rounded-3xl p-6 max-w-sm w-full space-y-4 shadow-2xl">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Activity className="w-5 h-5 text-cyan-400" />
              How OcuSense AI Works
            </h3>

            <div className="space-y-3 text-xs text-slate-300 leading-relaxed">
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                <span><strong>MobileNetV2:</strong> Inverted residuals detect microvascular pathology (hemorrhages, exudates).</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" />
                <span><strong>Grad-CAM:</strong> Computes backpropagated gradients on conv features to highlight exact lesion zones.</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-purple-400 flex-shrink-0 mt-0.5" />
                <span><strong>5-Stage Triage:</strong> Categorizes into ICDR clinical stages from No DR to Proliferative DR.</span>
              </div>
            </div>

            <button
              onClick={() => setShowHowItWorks(false)}
              className="w-full py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-white cursor-pointer"
            >
              Got it
            </button>
          </div>
        </div>
      )}

    </div>
  );
}