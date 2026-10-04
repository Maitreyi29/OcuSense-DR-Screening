import React from 'react';
import { Activity, BookOpen, Sparkles, Layers, ShieldCheck, FileImage } from 'lucide-react';
import InteractiveEye3D from './InteractiveEye3D';

export default function HeroSection({ onStartScreening, onLearnMore, onLoadSample, isLoadingSample }) {
  return (
    <section id="hero-section" className="relative overflow-hidden rounded-3xl glass-panel border border-slate-800 p-8 sm:p-12 bg-gradient-to-r from-slate-900/95 via-slate-900/80 to-slate-950/95 mb-10 shadow-2xl scroll-mt-24">
      
      {/* Background Glow Blobs */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 grid lg:grid-cols-12 gap-8 items-center text-left">
        
        {/* Left Headline Column */}
        <div className="lg:col-span-7 space-y-6">
          
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-semibold tracking-wide">
            <Sparkles className="w-3.5 h-3.5" />
            <span>AI-Powered Retinal Screening Platform</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight">
            Early Detection Through <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-emerald-400">
              Intelligent Retinal Analysis
            </span>
          </h1>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-medium max-w-xl">
            OcuSense uses deep neural networks to evaluate retinal fundus photography, classifying severity across 5 clinical stages with explainable Grad-CAM visual heatmaps.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            
            <button
              onClick={onStartScreening}
              className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 via-teal-500 to-emerald-500 hover:from-cyan-400 hover:to-emerald-400 text-slate-950 font-bold text-sm shadow-lg shadow-cyan-500/25 transition-all flex items-center gap-2 cursor-pointer"
            >
              <Activity className="w-4 h-4" />
              <span>Start Screening</span>
            </button>

            <button
              onClick={onLearnMore}
              className="px-5 py-3.5 rounded-xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700/80 text-slate-200 text-sm font-semibold flex items-center gap-2 transition-all cursor-pointer"
            >
              <BookOpen className="w-4 h-4 text-cyan-400" />
              <span>Learn How It Works</span>
            </button>

            <button
              onClick={onLoadSample}
              disabled={isLoadingSample}
              className="px-4 py-3.5 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 text-cyan-300 text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer"
              title="Load standard sample fundus image"
            >
              {isLoadingSample ? (
                <div className="w-4 h-4 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin" />
              ) : (
                <FileImage className="w-4 h-4 text-cyan-400" />
              )}
              <span className="hidden sm:inline">Load Sample Image</span>
            </button>

          </div>

          {/* Stats Badges */}
          <div className="pt-4 flex flex-wrap items-center gap-6 border-t border-slate-800/80 text-xs text-slate-400">
            <div className="flex items-center gap-2">
              <Layers className="w-4 h-4 text-emerald-400" />
              <span>5 ICDR Severity Stages</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-cyan-400" />
              <span>Grad-CAM Region Heatmaps</span>
            </div>
          </div>

        </div>

        {/* Right Column: 3D Interactive Cursor-Following Eye */}
        <div className="lg:col-span-5 flex items-center justify-center">
          <InteractiveEye3D />
        </div>

      </div>
    </section>
  );
}
