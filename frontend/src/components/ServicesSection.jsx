import React from 'react';
import { Activity, ShieldCheck, Eye, Layers, Sparkles, ArrowRight } from 'lucide-react';

export default function ServicesSection({ onStartScreening }) {
  const services = [
    {
      id: 'screening',
      title: 'AI Retinal Screening',
      desc: 'Instant automated triaging of macula-centered and optic disc digital fundus photography with deep learning.',
      icon: Eye,
      color: 'from-cyan-500 to-teal-500',
      tag: 'Core Pipeline'
    },
    {
      id: 'classification',
      title: '5-Stage ICDR Classification',
      desc: 'Accurately categorizes retinal pathology into standard ICDR clinical stages from No DR to Proliferative DR.',
      icon: Layers,
      color: 'from-emerald-500 to-teal-600',
      tag: 'Clinical Standard'
    },
    {
      id: 'confidence',
      title: 'Softmax Confidence Analysis',
      desc: 'Evaluates probability distributions across all five severity classes for objective decision support.',
      icon: Activity,
      color: 'from-teal-500 to-cyan-600',
      tag: 'Quantitative Metrics'
    },
    {
      id: 'heatmap',
      title: 'Grad-CAM Regional Localization',
      desc: 'Generates explainable activation heatmaps pin-pointing microvascular lesions like microaneurysms & exudates.',
      icon: ShieldCheck,
      color: 'from-blue-500 to-cyan-500',
      tag: 'Explainable AI'
    }
  ];

  return (
    <section id="services-section" className="w-full py-12 space-y-8 text-left scroll-mt-24">
      <div className="space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Platform Capabilities</span>
        </div>
        <h2 className="text-3xl font-extrabold text-white tracking-tight">
          Comprehensive Clinical AI Services
        </h2>
        <p className="text-xs sm:text-sm text-slate-400 max-w-2xl">
          Powered by deep convolutional transfer learning and explainable computer vision algorithms.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {services.map((item) => {
          const IconComp = item.icon;
          return (
            <div
              key={item.id}
              className="glass-panel p-6 rounded-3xl border border-slate-800 glass-card-hover space-y-4 flex flex-col justify-between group"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className={`w-12 h-12 rounded-2xl bg-gradient-to-tr ${item.color} p-0.5 shadow-lg shadow-cyan-500/10`}>
                    <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center text-cyan-400 group-hover:scale-110 transition-transform">
                      <IconComp className="w-6 h-6" />
                    </div>
                  </div>
                  <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded-md bg-slate-800 text-slate-400">
                    {item.tag}
                  </span>
                </div>

                <div>
                  <h3 className="text-base font-bold text-white tracking-tight group-hover:text-cyan-400 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed mt-2">
                    {item.desc}
                  </p>
                </div>
              </div>

              <button
                onClick={onStartScreening}
                className="pt-4 border-t border-slate-800/80 flex items-center gap-1.5 text-xs font-semibold text-cyan-400 group-hover:text-cyan-300 transition-colors cursor-pointer"
              >
                <span>Launch Tool</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          );
        })}
      </div>
    </section>
  );
}
