import React from 'react';
import { AlertCircle, ShieldCheck } from 'lucide-react';

export default function FooterDisclaimer() {
  return (
    <footer className="w-full mt-12 pb-12 pt-8 border-t border-slate-800/80 text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
        {/* Medical & Clinical Disclaimer */}
        <div className="p-4 rounded-2xl bg-amber-500/5 border border-amber-500/20 flex items-start gap-3 text-xs text-amber-300/90 leading-relaxed">
          <AlertCircle className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
          <div>
            OcuSense is an AI-based screening and educational research system. Results are not a medical diagnosis and should not replace evaluation by a qualified healthcare professional.
          </div>
        </div>

        {/* Footer Bottom Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-cyan-400" />
            <span className="font-semibold text-slate-400">OcuSense Screening Platform</span>
            <span>•</span>
            <span>Final-Year BTech ML Healthcare Project</span>
          </div>

          <div className="flex items-center gap-3 font-mono text-[11px] text-slate-400">
            <span>FastAPI</span>
            <span>•</span>
            <span>PyTorch</span>
            <span>•</span>
            <span>MobileNetV2</span>
            <span>•</span>
            <span>Grad-CAM</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
