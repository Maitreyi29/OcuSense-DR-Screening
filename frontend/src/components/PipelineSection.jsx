import React from 'react';
import { UploadCloud, Sliders, Cpu, Eye, CheckCircle2, ArrowRight } from 'lucide-react';

export default function PipelineSection() {
  const steps = [
    {
      id: 1,
      title: 'Retinal Image Input',
      desc: 'High-resolution digital fundus photography centered on macula or optic nerve.',
      icon: UploadCloud,
      color: 'from-cyan-500 to-blue-500',
    },
    {
      id: 2,
      title: 'Preprocessing Pipeline',
      desc: 'Aspect-ratio preserving resize to 224×224, tensor conversion & ImageNet mean/std normalization.',
      icon: Sliders,
      color: 'from-blue-500 to-teal-500',
    },
    {
      id: 3,
      title: 'MobileNetV2 Inference',
      desc: 'Inverted residual bottleneck blocks extract deep spatial microvascular lesion features.',
      icon: Cpu,
      color: 'from-teal-500 to-emerald-500',
    },
    {
      id: 4,
      title: 'Grad-CAM Heatmap Overlay',
      desc: 'Calculates gradients at features[-1] layer and overlays colormap heatmaps.',
      icon: Eye,
      color: 'from-emerald-500 to-amber-500',
    },
    {
      id: 5,
      title: 'Screening Result & Triage',
      desc: 'Returns predicted stage, confidence, 5-stage distribution & ophthalmic pathway.',
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
          End-to-end data transformation pipeline from image upload to explainable diagnosis.
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
                    Step 0{s.id}
                  </span>
                  <h4 className="text-sm font-bold text-white tracking-tight">
                    {s.title}
                  </h4>
                </div>

                <p className="text-[11px] text-slate-400 leading-relaxed">
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
