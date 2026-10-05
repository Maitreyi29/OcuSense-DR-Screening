import React from 'react';
import { Eye, Sparkles } from 'lucide-react';

export default function SplashScreen() {
  return (
    <div className="fixed inset-0 z-50 bg-[#070b14] flex flex-col items-center justify-center text-white px-6 select-none animate-fadeIn">
      {/* Background radial glow */}
      <div className="absolute w-72 h-72 rounded-full bg-cyan-500/15 blur-3xl pointer-events-none animate-pulse" />

      {/* Central Animated Retinal Logo */}
      <div className="relative mb-6">
        <div className="w-24 h-24 rounded-3xl bg-gradient-to-tr from-cyan-500/20 via-slate-850 to-emerald-500/20 border border-cyan-500/40 flex items-center justify-center shadow-2xl shadow-cyan-500/30">
          <Eye className="w-12 h-12 text-cyan-400 animate-pulse" />
        </div>
        <div className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-cyan-400/20 border border-cyan-400/60 flex items-center justify-center">
          <Sparkles className="w-3.5 h-3.5 text-cyan-300" />
        </div>
      </div>

      {/* Brand Title */}
      <h1 className="text-3xl font-extrabold tracking-tight text-white mb-2 font-mono">
        Ocu<span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400">Sense</span>
      </h1>

      {/* Tagline */}
      <p className="text-xs uppercase tracking-widest text-cyan-400 font-semibold mb-8">
        AI-Powered Retinal Screening
      </p>

      {/* Minimalistic Loading Bar */}
      <div className="w-36 h-1 rounded-full bg-slate-800 overflow-hidden">
        <div className="h-full bg-gradient-to-r from-cyan-400 to-emerald-400 rounded-full animate-[pulse_1.2s_infinite]" />
      </div>

      <span className="absolute bottom-8 text-[11px] text-slate-500 font-mono tracking-wider">
        MobileNetV2 • Grad-CAM XAI
      </span>
    </div>
  );
}