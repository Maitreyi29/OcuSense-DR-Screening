import React, { useState } from 'react';
import { ShieldAlert, Eye, Activity, RefreshCw, Sliders, Info, Image as ImageIcon, Layers, Flame } from 'lucide-react';

export default function ResultsDashboard({ resultData, onReset }) {
  const [activeTab, setActiveTab] = useState('overlay'); // 'original' | 'heatmap' | 'overlay'
  const [heatmapOpacity, setHeatmapOpacity] = useState(0.75);

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

  // Severity color mappings matching clinical ICDR stages
  const getSeverityStyle = (stage) => {
    switch (stage) {
      case 0:
        return {
          bg: 'bg-emerald-500/10',
          border: 'border-emerald-500/30',
          text: 'text-emerald-400',
          badgeBg: 'bg-emerald-500',
          label: 'Stage 0 • No Diabetic Retinopathy'
        };
      case 1:
        return {
          bg: 'bg-amber-500/10',
          border: 'border-amber-500/30',
          text: 'text-amber-400',
          badgeBg: 'bg-amber-500',
          label: 'Stage 1 • Mild DR'
        };
      case 2:
        return {
          bg: 'bg-orange-500/10',
          border: 'border-orange-500/30',
          text: 'text-orange-400',
          badgeBg: 'bg-orange-500',
          label: 'Stage 2 • Moderate DR'
        };
      case 3:
        return {
          bg: 'bg-rose-500/10',
          border: 'border-rose-500/30',
          text: 'text-rose-400',
          badgeBg: 'bg-rose-500',
          label: 'Stage 3 • Severe DR'
        };
      case 4:
      default:
        return {
          bg: 'bg-rose-950/40',
          border: 'border-rose-600/50',
          text: 'text-rose-300',
          badgeBg: 'bg-rose-600',
          label: 'Stage 4 • Proliferative DR'
        };
    }
  };

  const style = getSeverityStyle(predicted_stage);
  const confidencePercent = (confidence * 100).toFixed(1);

  return (
    <div className="w-full space-y-8 my-8 text-left animate-fadeIn">
      
      {/* Top Banner: Primary Screening Stage Result */}
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

            <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              {class_name}
            </h2>

            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
              {description}
            </p>
          </div>

          {/* Confidence Score Badge */}
          <div className="flex items-center gap-4 bg-slate-950/80 p-4 rounded-2xl border border-slate-800 flex-shrink-0">
            <div className="text-right">
              <span className="block text-xs font-semibold text-slate-400">AI Confidence</span>
              <span className={`text-2xl font-black ${style.text} font-mono`}>
                {confidencePercent}%
              </span>
            </div>
            <div className="w-12 h-12 rounded-full border-4 border-slate-800 border-t-cyan-400 flex items-center justify-center font-mono text-xs text-white font-bold">
              Stage {predicted_stage}
            </div>
          </div>

        </div>
      </div>

      {/* Main Grid: Grad-CAM Visualization Area & Clinical Details */}
      <div className="grid lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Grad-CAM Interactive Presentation (7 Columns) */}
        <div className="lg:col-span-7 glass-panel p-6 rounded-3xl border border-slate-800 space-y-5">
          
          {/* Header & Tabs */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800/80 pb-4">
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Eye className="w-5 h-5 text-cyan-400" />
                Grad-CAM Explainability Heatmap
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Visualizing spatial feature activation from layer features[-1]
              </p>
            </div>

            {/* View Mode Tabs */}
            <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800">
              <button
                onClick={() => setActiveTab('original')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                  activeTab === 'original'
                    ? 'bg-slate-800 text-cyan-400 shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <ImageIcon className="w-3.5 h-3.5" />
                <span>Original</span>
              </button>

              <button
                onClick={() => setActiveTab('heatmap')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                  activeTab === 'heatmap'
                    ? 'bg-slate-800 text-cyan-400 shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Flame className="w-3.5 h-3.5" />
                <span>Heatmap</span>
              </button>

              <button
                onClick={() => setActiveTab('overlay')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                  activeTab === 'overlay'
                    ? 'bg-gradient-to-r from-cyan-500 to-emerald-500 text-slate-950 font-bold shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span>Overlay</span>
              </button>
            </div>
          </div>

          {/* Interactive Image Frame */}
          <div className="relative w-full aspect-square max-w-md mx-auto rounded-2xl bg-slate-950 border border-slate-800 overflow-hidden shadow-2xl">
            
            {/* Original Image Layer */}
            <img
              src={original_image}
              alt="Original Retinal Fundus"
              className="absolute inset-0 w-full h-full object-cover"
            />

            {/* Heatmap Overlay Layer */}
            {activeTab !== 'original' && (
              <img
                src={gradcam_overlay}
                alt="Grad-CAM Heatmap"
                style={{
                  opacity: activeTab === 'heatmap' ? 1 : heatmapOpacity,
                }}
                className="absolute inset-0 w-full h-full object-cover transition-opacity duration-200"
              />
            )}

            {/* Retinal Scan Grid Lines Overlay */}
            <div className="absolute inset-0 border border-cyan-500/20 pointer-events-none rounded-2xl" />

            {/* Tag Badge */}
            <div className="absolute bottom-3 left-3 px-3 py-1.5 rounded-lg bg-slate-950/90 backdrop-blur-md border border-slate-800 text-[11px] font-mono text-cyan-300 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-ping" />
              <span>
                {activeTab === 'original'
                  ? 'Input Fundus Photo'
                  : activeTab === 'heatmap'
                  ? 'Raw Grad-CAM Heatmap'
                  : `Blended Overlay (${Math.round(heatmapOpacity * 100)}%)`}
              </span>
            </div>
          </div>

          {/* Opacity Slider (Only in Overlay Mode) */}
          {activeTab === 'overlay' && (
            <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2.5 animate-fadeIn">
              <div className="flex items-center justify-between text-xs text-slate-300">
                <span className="flex items-center gap-1.5 font-semibold">
                  <Sliders className="w-4 h-4 text-cyan-400" />
                  Heatmap Blend Opacity
                </span>
                <span className="font-mono text-cyan-400 font-bold">{Math.round(heatmapOpacity * 100)}%</span>
              </div>
              
              <input
                type="range"
                min="0.1"
                max="1.0"
                step="0.05"
                value={heatmapOpacity}
                onChange={(e) => setHeatmapOpacity(parseFloat(e.target.value))}
                className="w-full accent-cyan-400 bg-slate-950 cursor-pointer h-2 rounded-lg"
              />
            </div>
          )}

          {/* Explanation Callout */}
          <div className="p-4 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 text-xs text-cyan-200 flex items-start gap-3">
            <Info className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              Highlighted warm regions indicate areas in the retinal fundus photo that contributed most strongly to MobileNetV2's classification decision.
            </p>
          </div>

        </div>

        {/* Right Column: 5-Stage Distribution & Clinical Recommendations (5 Columns) */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Probability Distribution Card */}
          <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Activity className="w-5 h-5 text-emerald-400" />
                5-Stage Softmax Probabilities
              </h3>
              <span className="text-[11px] text-slate-400 font-mono">MobileNetV2 Output</span>
            </div>

            <div className="space-y-3.5">
              {probability_distribution.map((item) => {
                const isWinner = item.stage === predicted_stage;
                return (
                  <div key={item.stage} className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span className={`font-semibold ${isWinner ? 'text-cyan-300' : 'text-slate-300'}`}>
                        Stage {item.stage}: {item.name}
                      </span>
                      <span className={`font-mono ${isWinner ? 'text-cyan-400 font-bold' : 'text-slate-400'}`}>
                        {item.probability.toFixed(1)}%
                      </span>
                    </div>

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

          {/* Recommended Pathway */}
          <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-2.5">
            <div className="flex items-center gap-2 text-cyan-400 font-semibold text-xs uppercase tracking-wider">
              <Info className="w-4 h-4" />
              <span>Recommended Screening Pathway</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-200 font-medium leading-relaxed">
              {recommendation}
            </p>
          </div>

          {/* Prominent Reset / Analyze Another Image CTA */}
          <button
            onClick={onReset}
            className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-cyan-500 via-teal-500 to-emerald-500 hover:from-cyan-400 hover:to-emerald-400 text-slate-950 font-extrabold text-sm shadow-xl shadow-cyan-500/20 flex items-center justify-center gap-2 transition-all cursor-pointer transform hover:-translate-y-0.5"
          >
            <RefreshCw className="w-5 h-5 text-slate-950" />
            <span>Analyze Another Image</span>
          </button>

        </div>

      </div>

      {/* Elegant Medical Safety Disclaimer */}
      <div className="glass-panel p-5 rounded-2xl border border-amber-500/30 bg-amber-500/10 text-amber-200 text-xs flex items-start gap-3">
        <ShieldAlert className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
        <p className="leading-relaxed font-medium">
          <strong>Medical Safety Disclaimer:</strong> OcuSense is an AI-based screening and educational research system. Results are derived from deep learning feature evaluation and do NOT constitute a formal clinical diagnosis. All automated findings must be reviewed by a qualified ophthalmologist or optometrist before initiating medical treatment.
        </p>
      </div>

    </div>
  );
}
