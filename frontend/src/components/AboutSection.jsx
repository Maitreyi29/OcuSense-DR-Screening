import React from 'react';
import { Eye, ShieldCheck, HeartPulse, Sparkles, CheckCircle2 } from 'lucide-react';

export default function AboutSection() {
  return (
    <section id="about-section" className="w-full py-12 text-left scroll-mt-24">
      <div className="glass-panel p-8 sm:p-12 rounded-3xl border border-slate-800 space-y-8 bg-gradient-to-r from-slate-900/90 via-slate-900/60 to-slate-950/90 shadow-2xl">
        
        <div className="grid lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column: Text */}
          <div className="lg:col-span-7 space-y-5">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-semibold">
              <HeartPulse className="w-3.5 h-3.5" />
              <span>About OcuSense</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
              Pioneering AI in <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-emerald-400">
                Ophthalmological Screening
              </span>
            </h2>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-medium">
              Diabetic Retinopathy (DR) is the leading cause of preventable blindness in working-age adults worldwide. Early detection through routine retinal examination reduces the risk of severe vision loss by over 95%.
            </p>

            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              OcuSense bridges the screening gap by deploying MobileNetV2 deep convolutional neural networks fine-tuned on clinical fundus datasets. It delivers automated 5-stage ICDR classification alongside Grad-CAM spatial heatmaps, providing visual explainability for clinical decision support.
            </p>

            <div className="grid sm:grid-cols-2 gap-3 pt-2 text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>Microvascular Lesion Localization</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                <span>5-Stage ICDR Standardized Scale</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>Fast PyTorch Inference Pipeline</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                <span>Grad-CAM Visual Explainability</span>
              </div>
            </div>
          </div>

          {/* Right Column: Statistics Grid */}
          <div className="lg:col-span-5 grid grid-cols-2 gap-4">
            <div className="glass-card p-6 rounded-2xl border border-slate-800 space-y-2 text-center">
              <span className="block text-3xl font-black text-cyan-400 font-mono">95%+</span>
              <span className="text-xs text-slate-400">Blindness Preventable with Early Screening</span>
            </div>
            <div className="glass-card p-6 rounded-2xl border border-slate-800 space-y-2 text-center">
              <span className="block text-3xl font-black text-emerald-400 font-mono">5</span>
              <span className="text-xs text-slate-400">ICDR Clinical Severity Stages</span>
            </div>
            <div className="glass-card p-6 rounded-2xl border border-slate-800 space-y-2 text-center">
              <span className="block text-3xl font-black text-teal-400 font-mono">224px</span>
              <span className="text-xs text-slate-400">Standard ImageNet Input Matrix</span>
            </div>
            <div className="glass-card p-6 rounded-2xl border border-slate-800 space-y-2 text-center">
              <span className="block text-3xl font-black text-amber-400 font-mono">&lt; 1s</span>
              <span className="text-xs text-slate-400">Average Screening Response Time</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
