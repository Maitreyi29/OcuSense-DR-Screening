import React, { useEffect, useState } from 'react';
import { Eye, Sparkles, CheckCircle2 } from 'lucide-react';

export default function AnalysisProgress({ previewUrl }) {
  const [step, setStep] = useState(1);

  useEffect(() => {
    const t1 = setTimeout(() => setStep(2), 250);
    const t2 = setTimeout(() => setStep(3), 500);
    const t3 = setTimeout(() => setStep(4), 800);
    const t4 = setTimeout(() => setStep(5), 1100);
    const t5 = setTimeout(() => setStep(6), 1400);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      clearTimeout(t5);
    };
  }, []);

  const steps = [
    { id: 1, title: 'Retinal Image Received', desc: 'Decoding digital fundus photograph array' },
    { id: 2, title: 'Image Validation', desc: 'Verifying MIME header, resolution, and color channels' },
    { id: 3, title: 'Image Preprocessing', desc: 'Resizing to 224×224 RGB & applying ImageNet normalization' },
    { id: 4, title: 'MobileNetV2 Inference', desc: 'Extracting bottleneck residual features across 18 layers' },
    { id: 5, title: 'Probability Analysis', desc: 'Evaluating softmax confidence distribution across 5 ICDR stages' },
    { id: 6, title: 'Grad-CAM Generation', desc: 'Computing spatial feature gradients for visual lesion heatmap' },
  ];

  return (
    <div className="glass-panel p-8 sm:p-12 rounded-3xl border border-cyan-500/30 shadow-2xl space-y-8 my-8 text-center max-w-3xl mx-auto animate-fadeIn">
      
      {/* Retinal Scanning Core Visual */}
      <div className="relative w-40 h-40 sm:w-48 sm:h-48 mx-auto rounded-full bg-slate-950 p-2 border-2 border-cyan-500/40 shadow-2xl flex items-center justify-center overflow-hidden">
        
        {/* Retinal Preview inside */}
        {previewUrl ? (
          <img
            src={previewUrl}
            alt="Scanning Fundus"
            className="w-full h-full object-cover rounded-full opacity-70 filter contrast-125"
          />
        ) : (
          <Eye className="w-16 h-16 text-cyan-400 opacity-40 animate-pulse" />
        )}

        {/* Laser Scanner Beam */}
        <div className="absolute inset-x-0 h-1 scanner-beam animate-scan-line" />

        {/* Rotating Concentric Rings */}
        <div className="absolute inset-2 rounded-full border border-cyan-400/40 animate-spin-slow pointer-events-none" />
        <div className="absolute inset-5 rounded-full border border-dashed border-emerald-400/50 pointer-events-none" />
      </div>

      {/* Header text */}
      <div className="space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5 animate-spin" />
          <span>AI Neural Inference Active</span>
        </div>
        <h3 className="text-2xl font-extrabold text-white tracking-tight">
          Analyzing Retinal Microvascular Structure
        </h3>
        <p className="text-xs text-slate-400 max-w-md mx-auto">
          Please wait while OcuSense processes the fundus photo through the MobileNetV2 deep neural network.
        </p>
      </div>

      {/* Progress Steps List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-left max-w-2xl mx-auto">
        {steps.map((s) => {
          const isDone = step > s.id;
          const isCurrent = step === s.id;
          return (
            <div
              key={s.id}
              className={`p-3.5 rounded-xl border transition-all ${
                isDone
                  ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
                  : isCurrent
                  ? 'bg-cyan-500/10 border-cyan-500/40 text-cyan-300 shadow-md shadow-cyan-500/10'
                  : 'bg-slate-900/40 border-slate-800 text-slate-500 opacity-60'
              }`}
            >
              <div className="flex items-center gap-2.5">
                {isDone ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                ) : isCurrent ? (
                  <div className="w-4 h-4 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin flex-shrink-0" />
                ) : (
                  <div className="w-4 h-4 rounded-full border border-slate-700 flex-shrink-0" />
                )}
                <span className="text-xs font-semibold">{s.title}</span>
              </div>
              <p className="text-[11px] mt-1 pl-6 opacity-80 line-clamp-1">{s.desc}</p>
            </div>
          );
        })}
      </div>

    </div>
  );
}
