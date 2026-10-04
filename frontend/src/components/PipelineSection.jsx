import React from 'react';
import { UploadCloud, Sliders, Cpu, Eye, CheckCircle2, ArrowRight } from 'lucide-react';

export default function PipelineSection() {
  const steps = [
    {
      id: 1,
      title: 'Retinal Image Input',
      desc: 'Upload a fundus image.',
      icon: UploadCloud,
      color: 'from-cyan-500 to-blue-500',
    },
    {
      id: 2,
      title: 'Preprocessing',
      desc: 'Resize and normalize.',
      icon: Sliders,
      color: 'from-blue-500 to-teal-500',
    },
    {
      id: 3,
      title: 'MobileNetV2',
      desc: 'Run AI inference.',
      icon: Cpu,
      color: 'from-teal-500 to-emerald-500',
    },
    {
      id: 4,
      title: 'Grad-CAM',
      desc: 'Generate visual explanation.',
      icon: Eye,
      color: 'from-emerald-500 to-amber-500',
    },
    {
      id: 5,
      title: 'Screening Result',
      desc: 'Display stage and confidence.',
      icon: CheckCircle2,
      color: 'from-amber-500 to-rose-500',
    },
  ];

  return (
    <section id="pipeline-section" className="w-full glass-panel p-8 sm:p-10 rounded-3xl border border-slate-800 text-left space-y-6 my-10 scroll-mt-24">
      <div>
        <h3 className="text-xl font-bold text-white tracking-tight">
          AI Retinal Screening Workflow
        </h3>
        <p className="text-xs text-slate-400">
          Step-by-step pipeline from upload to visual explainability.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 relative">
        {steps.map((s, index) => {
          const IconComp = s.icon;
          return (
            <div
              key={s.id}
              className="relative glass-card p-5 rounded-2xl border border-slate-800/80 space-y-3 glass-card-hover flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-tr ${s.color} p-0.5 flex items-center justify-center text-slate-950 font-bold shadow-md`}>
                  <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center text-cyan-400">
                    <IconComp className="w-5 h-5" />
                  </div>
                </div>

                <div>
                  <span className="text-[10px] font-mono font-bold text-slate-500 uppercase">
                    0{s.id}
                  </span>
                  <h4 className="text-sm font-bold text-white tracking-tight">
                    {s.title}
                  </h4>
                </div>

                <p className="text-xs text-slate-400 leading-relaxed">
                  {s.desc}
                </p>
              </div>

              {index < steps.length - 1 && (
                <div className="hidden md:block absolute -right-3 top-1/2 -translate-y-1/2 z-10 text-slate-600">
                  <ArrowRight className="w-4 h-4" />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
