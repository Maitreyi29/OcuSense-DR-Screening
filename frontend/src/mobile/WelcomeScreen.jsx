import React from 'react';
import { Eye, ShieldCheck, ArrowRight, Activity, Sparkles } from 'lucide-react';

export default function WelcomeScreen({ onGetStarted, onLogin }) {
  return (
    <div className="min-h-screen bg-[#070b14] text-slate-100 flex flex-col justify-between p-6 relative overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-80 h-80 rounded-full bg-cyan-500/10 blur-3xl pointer-events-none" />

      {/* Top Header */}
      <div className="pt-8 flex items-center justify-between z-10">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center">
            <Eye className="w-5 h-5 text-cyan-400" />
          </div>
          <span className="text-base font-bold tracking-tight text-white font-mono">
            Ocu<span className="text-cyan-400">Sense</span>
          </span>
        </div>
        <span className="text-[10px] uppercase font-mono px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-semibold flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
          AI Online
        </span>
      </div>

      {/* Middle Hero Visual & Copy */}
      <div className="my-auto py-8 z-10 space-y-6">
        {/* Futuristic Glowing Retina Icon Card */}
        <div className="w-20 h-20 mx-auto rounded-3xl bg-slate-900/80 border border-slate-800 shadow-2xl shadow-cyan-500/20 flex items-center justify-center relative">
          <Activity className="w-10 h-10 text-cyan-400 animate-pulse" />
          <div className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-cyan-400/20 border border-cyan-400/60 flex items-center justify-center">
            <Sparkles className="w-3.5 h-3.5 text-cyan-300" />
          </div>
        </div>

        <div className="text-center space-y-3">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-snug">
            Early Detection Through <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400">
              Intelligent Retinal Analysis
            </span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 max-w-xs mx-auto leading-relaxed">
            AI-assisted diabetic retinopathy screening with clinical Grad-CAM explainability.
          </p>
        </div>

        {/* Feature Badges */}
        <div className="flex flex-wrap items-center justify-center gap-2 pt-2 text-[11px] font-mono text-slate-300">
          <span className="px-3 py-1 rounded-full bg-slate-900 border border-slate-800">
            5 ICDR Stages
          </span>
          <span className="px-3 py-1 rounded-full bg-slate-900 border border-slate-800">
            Grad-CAM Heatmaps
          </span>
          <span className="px-3 py-1 rounded-full bg-slate-900 border border-slate-800">
            MobileNetV2 Edge
          </span>
        </div>
      </div>

      {/* Bottom Action Buttons */}
      <div className="space-y-3 pb-6 z-10">
        <button
          onClick={onGetStarted}
          className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-cyan-500 to-emerald-500 hover:from-cyan-400 hover:to-emerald-400 text-slate-950 font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/25 transition-all active:scale-[0.98] cursor-pointer"
        >
          <span>Get Started</span>
          <ArrowRight className="w-4 h-4" />
        </button>

        <button
          onClick={onLogin}
          className="w-full py-3.5 px-6 rounded-2xl bg-slate-900/80 hover:bg-slate-800 border border-slate-800 text-white font-semibold text-xs transition-all active:scale-[0.98] cursor-pointer"
        >
          I already have an account • Log In
        </button>

        <p className="text-[10px] text-center text-slate-500 pt-2 flex items-center justify-center gap-1">
          <ShieldCheck className="w-3.5 h-3.5 text-cyan-400/70" />
          Academic & Clinical Screening Research Tool
        </p>
      </div>
    </div>
  );
}