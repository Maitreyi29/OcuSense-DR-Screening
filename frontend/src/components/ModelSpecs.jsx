import React, { useState } from 'react';
import { Cpu, HardDrive, Layers, Eye, ShieldCheck, FileText, ChevronDown, ChevronUp } from 'lucide-react';

export default function ModelSpecs() {
  const [isExpanded, setIsExpanded] = useState(false);

  const specs = [
    { label: 'Neural Architecture', value: 'MobileNetV2 (Inverted Residuals)', icon: Cpu },
    { label: 'Deep Learning Engine', value: 'PyTorch (torch / torchvision)', icon: Layers },
    { label: 'Weights Checkpoint File', value: 'best_mobilenet_v2.pth (9.17 MB)', icon: HardDrive },
    { label: 'Target Grad-CAM Layer', value: 'model.features[-1] (Conv2d 1280)', icon: Eye },
    { label: 'Input Preprocessing', value: '224 × 224 RGB • ImageNet Mean/Std', icon: FileText },
    { label: 'Classifier Output', value: 'Softmax over 5 ICDR DR Classes', icon: ShieldCheck },
  ];

  return (
    <div className="w-full space-y-4 text-left my-10 animate-fadeIn">
      
      {/* Collapsible Header Bar */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-semibold">
            <Cpu className="w-3.5 h-3.5" />
            <span>Technical Deep Learning Architecture</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
            Technical Model Specifications & Parameters
          </h3>
          <p className="text-xs text-slate-400 max-w-xl">
            Detailed breakdown of PyTorch MobileNetV2 architecture, input matrix transformations, and layer configurations.
          </p>
        </div>

        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 font-semibold text-xs flex items-center gap-2 transition-all cursor-pointer flex-shrink-0"
        >
          <span>{isExpanded ? 'Collapse Model Details' : 'View Technical Model Details'}</span>
          {isExpanded ? <ChevronUp className="w-4 h-4 text-cyan-400" /> : <ChevronDown className="w-4 h-4 text-cyan-400" />}
        </button>

      </div>

      {/* Expandable Technical Grid */}
      {isExpanded && (
        <div className="space-y-6 pt-2 animate-fadeIn">
          
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
              Standard ImageNet Preprocessing Parameters
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
      )}

    </div>
  );
}
