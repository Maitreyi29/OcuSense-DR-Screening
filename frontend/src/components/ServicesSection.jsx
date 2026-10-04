import React from 'react';
import { Activity, ShieldCheck, Eye, Layers, Sparkles, ArrowRight } from 'lucide-react';

export default function ServicesSection({ onStartScreening }) {
  const services = [
    {
      id: 'screening',
      title: 'AI Retinal Screening',
      desc: 'Analyze retinal fundus images using deep learning.',
      icon: Eye,
      color: 'from-cyan-500 to-teal-500',
    },
    {
      id: 'classification',
      title: '5-Stage Classification',
      desc: 'Classify images across five diabetic retinopathy stages.',
      icon: Layers,
      color: 'from-emerald-500 to-teal-600',
    },
    {
      id: 'confidence',
      title: 'Confidence Analysis',
      desc: 'View probability across all five classes.',
      icon: Activity,
      color: 'from-teal-500 to-cyan-600',
    },
    {
      id: 'heatmap',
      title: 'Grad-CAM Explainability',
      desc: 'Visualize image regions influencing the prediction.',
      icon: ShieldCheck,
      color: 'from-blue-500 to-cyan-500',
    }
  ];

  return (
    <section id="services-section" className="w-full py-10 space-y-6 text-left scroll-mt-24">
      <div className="space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Platform Capabilities</span>
        </div>
        <h2 className="text-3xl font-extrabold text-white tracking-tight">
          Core AI Services
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {services.map((item) => {
          const IconComp = item.icon;
          return (
            <div
              key={item.id}
              className="glass-panel p-6 rounded-3xl border border-slate-800 glass-card-hover space-y-4 flex flex-col justify-between group"
            >
              <div className="space-y-3">
                <div className={`w-12 h-12 rounded-2xl bg-gradient-to-tr ${item.color} p-0.5 shadow-lg shadow-cyan-500/10`}>
                  <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center text-cyan-400 group-hover:scale-110 transition-transform">
                    <IconComp className="w-6 h-6" />
                  </div>
                </div>

                <div>
                  <h3 className="text-base font-bold text-white tracking-tight group-hover:text-cyan-400 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed mt-1.5">
                    {item.desc}
                  </p>
                </div>
              </div>

              <button
                onClick={onStartScreening}
                className="pt-3 border-t border-slate-800/80 flex items-center gap-1.5 text-xs font-semibold text-cyan-400 group-hover:text-cyan-300 transition-colors cursor-pointer"
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
