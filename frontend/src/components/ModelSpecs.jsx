import React from 'react';
import { Cpu, HardDrive, Layers, Eye, ShieldCheck, FileText } from 'lucide-react';

export default function ModelSpecs() {
  const specs = [
    { label: 'Neural Architecture', value: 'MobileNetV2 (Inverted Residuals)', icon: Cpu },
    { label: 'Deep Learning Engine', value: 'PyTorch (torch / torchvision)', icon: Layers },
    { label: 'Weights File', value: 'best_mobilenet_v2.pth (9.17 MB)', icon: HardDrive },
    { label: 'Target Grad-CAM Layer', value: 'model.features[-1] (Conv2d 1280)', icon: Eye },
    { label: 'Input Preprocessing', value: '224 × 224 RGB • ImageNet Mean/Std', icon: FileText },
    { label: 'Classifier Output', value: 'Softmax over 5 ICDR DR Classes', icon: ShieldCheck },
  ];

  return (
    <div className="w-full space-y-6 text-left animate-fadeIn">
      <div className="space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-semibold">
          <Cpu className="w-3.5 h-3.5" />
          <span>Technical Model Architecture Specifications</span>
        </div>
        <h2 className="text-3xl font-extrabold text-white tracking-tight">
          MobileNetV2 Deep Learning Specs
        </h2>
        <p className="text-xs sm:text-sm text-slate-400 max-w-2xl">
          Complete breakdown of PyTorch model parameters, input transformations, and explainability layer configurations.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {specs.map((item, idx) => {
          const IconComp = item.icon;
          return (
            <div
              key={idx}
              className="glass-panel p-6 rounded-3xl border border-slate-800 glass-card-hover space-y-3"
            >
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
                  <IconComp className="w-5 h-5" />
                </div>
                <span className="text-xs font-semibold text-slate-400">
                  {item.label}
                </span>
              </div>
              <p className="text-base font-bold text-white font-mono tracking-tight">
                {item.value}
              </p>
            </div>
          );
        })}
      </div>

      <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-3">
        <h4 className="text-sm font-bold text-white tracking-tight">
          Standard ImageNet Normalization Parameters
        </h4>
        <div className="grid sm:grid-cols-2 gap-4 text-xs font-mono text-slate-300">
          <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
            <span className="text-slate-500 block mb-1">Mean Vector (RGB):</span>
            <span className="text-cyan-400">[0.485, 0.456, 0.406]</span>
          </div>
          <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
            <span className="text-slate-500 block mb-1">Std Vector (RGB):</span>
            <span className="text-emerald-400">[0.229, 0.224, 0.225]</span>
          </div>
        </div>
      </div>
    </div>
  );
}
