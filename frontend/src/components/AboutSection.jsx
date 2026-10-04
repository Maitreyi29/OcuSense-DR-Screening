import React from 'react';
import { Brain, CheckCircle2, Layers, Cpu, Eye, Image } from 'lucide-react';

export default function AboutSection() {
  const specs = [
    { label: 'Model Architecture', value: 'MobileNetV2', icon: Cpu, color: 'text-cyan-400' },
    { label: 'Output Schema', value: '5-Class Classification', icon: Layers, color: 'text-emerald-400' },
    { label: 'Explainability', value: 'Grad-CAM Heatmaps', icon: Eye, color: 'text-teal-400' },
    { label: 'Input Resolution', value: '224 × 224 RGB', icon: Image, color: 'text-cyan-300' },
  ];

  return (
    <section id="about-section" className="w-full py-10 text-left scroll-mt-24">
      <div className="glass-panel p-8 sm:p-10 rounded-3xl border border-slate-800 space-y-6 bg-gradient-to-r from-slate-900/90 via-slate-900/60 to-slate-950/90 shadow-2xl">
        
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-semibold">
            <Brain className="w-3.5 h-3.5" />
            <span>Project Overview</span>
          </div>
          <h2 className="text-3xl font-extrabold text-white tracking-tight">
            OcuSense — AI-Based Diabetic Retinopathy Screening
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 max-w-xl">
            An automated screening research system designed to evaluate fundus images and assist early detection.
          </p>
        </div>

        {/* Key Specification Badges */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
          {specs.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div key={idx} className="glass-card p-4 rounded-2xl border border-slate-800 space-y-1.5 text-center sm:text-left">
                <div className="flex items-center justify-center sm:justify-start gap-2">
                  <Icon className={`w-4 h-4 ${item.color}`} />
                  <span className="text-[11px] font-semibold text-slate-400">{item.label}</span>
                </div>
                <p className="text-sm font-bold text-white tracking-tight font-mono">{item.value}</p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
