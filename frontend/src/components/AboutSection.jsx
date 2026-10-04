import React from 'react';
import { Eye, ShieldCheck, HeartPulse, CheckCircle2, Code2, Server, Brain } from 'lucide-react';

export default function AboutSection() {
  return (
    <section id="about-section" className="w-full py-12 text-left scroll-mt-24">
      <div className="glass-panel p-8 sm:p-12 rounded-3xl border border-slate-800 space-y-8 bg-gradient-to-r from-slate-900/90 via-slate-900/60 to-slate-950/90 shadow-2xl">
        
        <div className="grid lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column: Text & Academic Overview */}
          <div className="lg:col-span-7 space-y-5">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-semibold">
              <Brain className="w-3.5 h-3.5" />
              <span>Academic Research & Project Overview</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
              Explainable AI for <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-emerald-400">
                Diabetic Retinopathy Triage
              </span>
            </h2>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-medium">
              Diabetic Retinopathy (DR) is a progressive microvascular complication of diabetes and a leading cause of preventable adult blindness globally. Early routine fundus screening can mitigate severe vision loss by over 95%.
            </p>

            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              OcuSense is an academic AI research platform designed to assist in automated screening. By deploying a transfer-learned MobileNetV2 architecture fine-tuned on standardized retinal fundus images, the system evaluates microvascular pathology and computes 5-stage ICDR severity predictions paired with Grad-CAM spatial heatmaps for visual explainability.
            </p>

            {/* Key Technical Highlights */}
            <div className="grid sm:grid-cols-2 gap-3 pt-2 text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>MobileNetV2 Transfer Learning</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                <span>5-Stage ICDR Severity Classification</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>Grad-CAM Visual Heatmaps</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                <span>FastAPI + PyTorch Backend</span>
              </div>
            </div>
          </div>

          {/* Right Column: Full-Stack Architecture Cards */}
          <div className="lg:col-span-5 space-y-4">
            
            <div className="glass-card p-5 rounded-2xl border border-slate-800 space-y-2 text-left">
              <div className="flex items-center gap-2 text-cyan-400 font-bold text-xs">
                <Brain className="w-4 h-4" />
                <span>DEEP LEARNING MODEL</span>
              </div>
              <p className="text-xs text-slate-300 font-medium">
                MobileNetV2 convolutional neural network fine-tuned on 224×224 normalized RGB fundus photography for 5-class multi-class classification.
              </p>
            </div>

            <div className="glass-card p-5 rounded-2xl border border-slate-800 space-y-2 text-left">
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs">
                <Server className="w-4 h-4" />
                <span>FASTAPI BACKEND SERVING</span>
              </div>
              <p className="text-xs text-slate-300 font-medium">
                PyTorch CPU inference pipeline providing lightweight zero-hook Grad-CAM heatmap extraction and REST API endpoint serving.
              </p>
            </div>

            <div className="glass-card p-5 rounded-2xl border border-slate-800 space-y-2 text-left">
              <div className="flex items-center gap-2 text-teal-400 font-bold text-xs">
                <Code2 className="w-4 h-4" />
                <span>REACT + TAILWIND FRONTEND</span>
              </div>
              <p className="text-xs text-slate-300 font-medium">
                Responsive medical dashboard providing interactive opacity sliders, visual progress tracking, and standardized clinical pathway guidance.
              </p>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
