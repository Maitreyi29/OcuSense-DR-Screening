import React, { useState } from 'react';
import { ShieldAlert, CheckCircle2, Eye, Activity, Download, RefreshCw, Layers, Info, Sliders } from 'lucide-react';

export default function ResultsDashboard({ resultData, onReset }) {
  const [heatmapOpacity, setHeatmapOpacity] = useState(0.85);
  const [showHeatmapOnly, setShowHeatmapOnly] = useState(false);

  if (!resultData) return null;

  const {
    predicted_stage,
    class_name,
    severity,
    confidence,
    description,
    recommendation,
    probability_distribution,
    original_image,
    gradcam_overlay,
  } = resultData;

  // Severity color mappings
  const getSeverityStyle = (stage) => {
    switch (stage) {
      case 0:
        return {
          bg: 'bg-emerald-500/10',
          border: 'border-emerald-500/30',
          text: 'text-emerald-400',
          badgeBg: 'bg-emerald-500',
          glow: 'shadow-emerald-500/20',
          label: 'Stage 0 • No Diabetic Retinopathy'
        };
      case 1:
        return {
          bg: 'bg-amber-500/10',
          border: 'border-amber-500/30',
          text: 'text-amber-400',
          badgeBg: 'bg-amber-500',
          glow: 'shadow-amber-500/20',
          label: 'Stage 1 • Mild DR'
        };
      case 2:
        return {
          bg: 'bg-orange-500/10',
          border: 'border-orange-500/30',
          text: 'text-orange-400',
          badgeBg: 'bg-orange-500',
          glow: 'shadow-orange-500/20',
          label: 'Stage 2 • Moderate DR'
        };
      case 3:
        return {
          bg: 'bg-rose-500/10',
          border: 'border-rose-500/30',
          text: 'text-rose-400',
          badgeBg: 'bg-rose-500',
          glow: 'shadow-rose-500/20',
          label: 'Stage 3 • Severe DR'
        };
      case 4:
      default:
        return {
          bg: 'bg-rose-950/40',
          border: 'border-rose-600/50',
          text: 'text-rose-300',
          badgeBg: 'bg-rose-600',
          glow: 'shadow-rose-600/30',
          label: 'Stage 4 • Proliferative DR'
        };
    }
  };

  const style = getSeverityStyle(predicted_stage);
  const confidencePercent = (confidence * 100).toFixed(1);

  return (
    <div className="w-full space-y-8 animate-fadeIn">
      
      {/* Top Banner: Primary Diagnosis Stage */}
      <div className={`glass-panel p-6 sm:p-8 rounded-3xl border ${style.border} ${style.bg} shadow-2xl relative overflow-hidden`}>
        
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <span className={`px-3 py-1 rounded-full text-xs font-bold text-slate-950 uppercase tracking-wider ${style.badgeBg}`}>
                {style.label}
              </span>
              <span className="text-xs font-mono text-slate-400">
                ICDR Scale Severity
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              {class_name}
            </h2>

            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
              {description}
            </p>
          </div>

          {/* Confidence Score Dial */}
          <div className="flex items-center gap-4 bg-slate-950/70 p-4 rounded-2xl border border-slate-800 flex-shrink-0">
            <div className="text-right">
              <span className="block text-xs font-semibold text-slate-400">AI Confidence</span>
              <span className={`text-2xl font-black ${style.text} font-mono`}>
                {confidencePercent}%
              </span>
            </div>
            <div className="w-12 h-12 rounded-full border-4 border-slate-800 border-t-cyan-400 flex items-center justify-center font-mono text-xs text-white font-bold">
              {predicted_stage}
            </div>
          </div>

        </div>
      </div>

      {/* Grid: Grad-CAM Explainability & Probability Distribution */}
      <div className="grid lg:col-span-12 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left: Dual Image Heatmap Visualizer (7 Columns) */}
        <div className="lg:col-span-7 glass-panel p-6 rounded-3xl border border-slate-800 space-y-4">
          
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Eye className="w-5 h-5 text-cyan-400" />
              Grad-CAM Explainability Visualization
            </h3>
            <span className="text-xs text-slate-400 font-mono">MobileNetV2 features[-1]</span>
          </div>

          {/* Image Overlay Frame */}
          <div className="relative w-full aspect-square max-w-md mx-auto rounded-2xl bg-slate-950 border border-slate-800 overflow-hidden shadow-2xl group">
            
            {/* Base Original Image */}
            <img
              src={original_image}
              alt="Original Retinal Fundus"
              className="absolute inset-0 w-full h-full object-cover"
            />

            {/* Grad-CAM Overlay Image */}
            <img
              src={gradcam_overlay}
              alt="Grad-CAM Heatmap"
              style={{ opacity: showHeatmapOnly ? 1 : heatmapOpacity }}
              className="absolute inset-0 w-full h-full object-cover transition-opacity duration-200"
            />

            {/* Retinal Scan Ring Grid overlay */}
            <div className="absolute inset-0 border border-cyan-500/20 pointer-events-none rounded-2xl" />

            {/* Legend Tag */}
            <div className="absolute bottom-3 left-3 px-3 py-1.5 rounded-lg bg-slate-950/80 backdrop-blur-md border border-slate-800 text-[11px] font-mono text-cyan-300 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-ping" />
              <span>Red/Warm = Key Microvascular Lesions</span>
            </div>
          </div>

          {/* Heatmap Opacity Controls */}
          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between text-xs text-slate-300">
              <span className="flex items-center gap-1.5 font-semibold">
                <Sliders className="w-4 h-4 text-cyan-400" />
                Grad-CAM Heatmap Blend Opacity
              </span>
              <span className="font-mono text-cyan-400">{Math.round(heatmapOpacity * 100)}%</span>
            </div>
            
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={heatmapOpacity}
              onChange={(e) => setHeatmapOpacity(parseFloat(e.target.value))}
              className="w-full accent-cyan-400 bg-slate-950 cursor-pointer h-1.5 rounded-lg"
            />
          </div>

        </div>

        {/* Right: 5-Stage Probability Breakdown & Clinical Recommendation (5 Columns) */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Probability Distribution Card */}
          <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-4 text-left">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Activity className="w-5 h-5 text-emerald-400" />
                5-Stage Probability Distribution
              </h3>
              <span className="text-[11px] text-slate-400 font-mono">Softmax Probabilities</span>
            </div>

            <div className="space-y-3.5">
              {probability_distribution.map((item) => {
                const isWinner = item.stage === predicted_stage;
                return (
                  <div key={item.stage} className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span className={`font-semibold ${isWinner ? 'text-cyan-300' : 'text-slate-300'}`}>
                        {item.stage}: {item.name}
                      </span>
                      <span className={`font-mono ${isWinner ? 'text-cyan-400 font-bold' : 'text-slate-400'}`}>
                        {item.probability.toFixed(1)}%
                      </span>
                    </div>

                    {/* Progress Bar Container */}
                    <div className="w-full h-2.5 rounded-full bg-slate-950 border border-slate-800 overflow-hidden">
                      <div
                        style={{ width: `${Math.max(item.probability, 2)}%` }}
                        className={`h-full transition-all duration-700 rounded-full ${
                          isWinner
                            ? 'bg-gradient-to-r from-cyan-400 to-emerald-400 shadow-md shadow-cyan-500/50'
                            : 'bg-slate-700/60'
                        }`}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Clinical Recommendation Card */}
          <div className="glass-panel p-6 rounded-3xl border border-slate-800 text-left space-y-3">
            <div className="flex items-center gap-2 text-cyan-400 font-semibold text-xs uppercase tracking-wider">
              <Info className="w-4 h-4" />
              <span>Recommended Screening Pathway</span>
            </div>
            <p className="text-sm text-slate-200 font-medium leading-relaxed">
              {recommendation}
            </p>
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <button
              onClick={onReset}
              className="flex-1 py-3.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white font-semibold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <RefreshCw className="w-4 h-4 text-cyan-400" />
              <span>Screen Another Image</span>
            </button>
          </div>

        </div>

      </div>

    </div>
  );
}
