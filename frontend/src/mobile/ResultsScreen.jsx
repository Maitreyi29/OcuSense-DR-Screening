import React, { useState } from 'react';
import { Eye, Activity, RefreshCw, Sliders, Info, Image as ImageIcon, Flame, Layers, ShieldAlert, CheckCircle2 } from 'lucide-react';

export default function ResultsScreen({ resultData, onAnalyzeAnother }) {
  const [activeTab, setActiveTab] = useState('overlay'); // 'original' | 'heatmap' | 'overlay'
  const [heatmapOpacity, setHeatmapOpacity] = useState(0.75);

  if (!resultData) {
    return (
      <div className="min-h-screen bg-[#070b14] text-slate-100 flex flex-col items-center justify-center p-6 text-center space-y-4">
        <p className="text-sm text-slate-400">No screening result data available.</p>
        <button
          onClick={onAnalyzeAnother}
          className="py-3 px-6 rounded-2xl bg-cyan-500 text-slate-950 font-bold text-xs"
        >
          Start Screening
        </button>
      </div>
    );
  }

  const {
    predicted_stage = 0,
    class_name = 'No DR',
    confidence = 0.95,
    description = '',
    recommendation = '',
    probability_distribution = [],
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
          badgeBg: 'bg-emerald-500 text-slate-950',
          label: 'Stage 0 • No DR'
        };
      case 1:
        return {
          bg: 'bg-amber-500/10',
          border: 'border-amber-500/30',
          text: 'text-amber-400',
          badgeBg: 'bg-amber-500 text-slate-950',
          label: 'Stage 1 • Mild DR'
        };
      case 2:
        return {
          bg: 'bg-orange-500/10',
          border: 'border-orange-500/30',
          text: 'text-orange-400',
          badgeBg: 'bg-orange-500 text-slate-950',
          label: 'Stage 2 • Moderate DR'
        };
      case 3:
        return {
          bg: 'bg-rose-500/10',
          border: 'border-rose-500/30',
          text: 'text-rose-400',
          badgeBg: 'bg-rose-500 text-slate-950',
          label: 'Stage 3 • Severe DR'
        };
      case 4:
      default:
        return {
          bg: 'bg-rose-500/10',
          border: 'border-rose-500/30',
          text: 'text-rose-400',
          badgeBg: 'bg-rose-500 text-slate-950',
          label: 'Stage 4 • Proliferative DR'
        };
    }
  };

  const style = getSeverityStyle(predicted_stage);
  const confidencePercent = (confidence * 100).toFixed(1);

  return (
    <div className="min-h-screen bg-[#070b14] text-slate-100 flex flex-col p-5 pb-24 space-y-6 animate-fadeIn">
      
      {/* Top Bar / Header */}
      <div className="pt-2 flex items-center justify-between">
        <div>
          <span className="text-[10px] uppercase font-mono tracking-wider text-cyan-400 font-bold">
            Analysis Complete
          </span>
          <h1 className="text-xl font-extrabold text-white">
            Screening Results
          </h1>
        </div>

        <button
          onClick={onAnalyzeAnother}
          className="py-2 px-3.5 rounded-xl bg-slate-900 border border-slate-800 text-cyan-400 text-xs font-semibold flex items-center gap-1.5 active:scale-95 transition-transform"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>New Test</span>
        </button>
      </div>

      {/* Primary Result Card */}
      <div className={`p-5 rounded-3xl border ${style.border} ${style.bg} space-y-4 shadow-xl relative overflow-hidden`}>
        <div className="flex items-center justify-between">
          <span className={`px-3 py-1 rounded-full text-[11px] font-extrabold tracking-wide uppercase ${style.badgeBg}`}>
            {style.label}
          </span>
          
          <div className="text-right">
            <span className="text-[10px] uppercase font-mono text-slate-400 block">AI Confidence</span>
            <span className={`text-xl font-black font-mono ${style.text}`}>
              {confidencePercent}%
            </span>
          </div>
        </div>

        <div className="space-y-1">
          <h2 className="text-2xl font-black text-white tracking-tight">
            {class_name}
          </h2>
          <p className="text-xs text-slate-300 leading-relaxed">
            {description}
          </p>
        </div>
      </div>

      {/* Grad-CAM Dual Visualizer Section */}
      <div className="glass-panel p-5 rounded-3xl border border-slate-800 space-y-4 bg-slate-900/40">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Eye className="w-4 h-4 text-cyan-400" />
            <h3 className="text-xs font-bold text-white uppercase tracking-wider font-mono">
              Grad-CAM Explainability
            </h3>
          </div>

          {/* Mode Switcher Tabs */}
          <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800">
            <button
              onClick={() => setActiveTab('original')}
              className={`px-2.5 py-1 rounded-lg text-[10px] font-bold transition-all cursor-pointer ${
                activeTab === 'original' ? 'bg-slate-800 text-cyan-400' : 'text-slate-400'
              }`}
            >
              Original
            </button>

            <button
              onClick={() => setActiveTab('heatmap')}
              className={`px-2.5 py-1 rounded-lg text-[10px] font-bold transition-all cursor-pointer ${
                activeTab === 'heatmap' ? 'bg-slate-800 text-cyan-400' : 'text-slate-400'
              }`}
            >
              Heatmap
            </button>

            <button
              onClick={() => setActiveTab('overlay')}
              className={`px-2.5 py-1 rounded-lg text-[10px] font-bold transition-all cursor-pointer ${
                activeTab === 'overlay' ? 'bg-gradient-to-r from-cyan-500 to-emerald-500 text-slate-950' : 'text-slate-400'
              }`}
            >
              Overlay
            </button>
          </div>
        </div>

        {/* Dual Layer Image Container */}
        <div className="relative w-60 h-60 mx-auto rounded-2xl bg-slate-950 border border-slate-800 overflow-hidden shadow-2xl">
          {original_image && (
            <img
              src={original_image}
              alt="Original Fundus"
              className="absolute inset-0 w-full h-full object-cover"
            />
          )}

          {activeTab !== 'original' && gradcam_overlay && (
            <img
              src={gradcam_overlay}
              alt="Grad-CAM Overlay"
              style={{
                opacity: activeTab === 'heatmap' ? 1 : heatmapOpacity,
              }}
              className="absolute inset-0 w-full h-full object-cover transition-opacity duration-150"
            />
          )}

          {/* Overlay Status Tag */}
          <div className="absolute bottom-2 left-2 px-2 py-1 bg-slate-950/90 backdrop-blur-md rounded-lg border border-slate-800 text-[9px] font-mono text-cyan-300">
            {activeTab === 'original' ? 'Base Retinal Fundus' : activeTab === 'heatmap' ? 'Grad-CAM Gradient' : `Blended (${Math.round(heatmapOpacity * 100)}%)`}
          </div>
        </div>

        {/* Opacity Range Slider (Overlay Mode) */}
        {activeTab === 'overlay' && (
          <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 space-y-1.5">
            <div className="flex items-center justify-between text-[11px] text-slate-300">
              <span className="flex items-center gap-1 font-mono">
                <Sliders className="w-3.5 h-3.5 text-cyan-400" /> Heatmap Opacity
              </span>
              <span className="font-mono text-cyan-400 font-bold">{Math.round(heatmapOpacity * 100)}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={heatmapOpacity}
              onChange={(e) => setHeatmapOpacity(parseFloat(e.target.value))}
              className="w-full accent-cyan-400 bg-slate-900 cursor-pointer h-1.5 rounded-lg"
            />
          </div>
        )}
      </div>

      {/* 5-Stage Softmax Probability Distribution */}
      <div className="glass-panel p-5 rounded-3xl border border-slate-800 bg-slate-900/40 space-y-3.5">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-bold text-white uppercase tracking-wider font-mono flex items-center gap-2">
            <Activity className="w-4 h-4 text-emerald-400" />
            5-Stage Probability Distribution
          </h3>
          <span className="text-[10px] text-slate-400 font-mono">Softmax</span>
        </div>

        <div className="space-y-3">
          {Array.isArray(probability_distribution) && probability_distribution.map((item) => {
            const isWinner = item.stage === predicted_stage;
            return (
              <div key={item.stage} className="space-y-1 text-xs">
                <div className="flex justify-between">
                  <span className={isWinner ? 'text-cyan-300 font-bold' : 'text-slate-400'}>
                    Stage {item.stage}: {item.name}
                  </span>
                  <span className={`font-mono ${isWinner ? 'text-cyan-400 font-extrabold' : 'text-slate-400'}`}>
                    {typeof item.probability === 'number' ? item.probability.toFixed(1) : '0.0'}%
                  </span>
                </div>

                <div className="w-full h-2 rounded-full bg-slate-950 border border-slate-800 overflow-hidden">
                  <div
                    style={{ width: `${Math.max(item.probability || 0, 2)}%` }}
                    className={`h-full transition-all duration-500 rounded-full ${
                      isWinner
                        ? 'bg-gradient-to-r from-cyan-400 to-emerald-400 shadow-sm shadow-cyan-400'
                        : 'bg-slate-700/60'
                    }`}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Clinical Referral Pathway */}
      <div className="glass-panel p-5 rounded-3xl border border-slate-800 bg-slate-900/40 space-y-2">
        <div className="flex items-center gap-2 text-cyan-400 font-mono font-bold text-xs uppercase">
          <Info className="w-4 h-4" />
          <span>Recommended Clinical Pathway</span>
        </div>
        <p className="text-xs text-slate-200 leading-relaxed font-medium">
          {recommendation || 'Consult an ophthalmologist for comprehensive dilated eye examination.'}
        </p>
      </div>

      {/* Primary Action Button */}
      <button
        onClick={onAnalyzeAnother}
        className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-cyan-500 via-teal-500 to-emerald-500 hover:from-cyan-400 hover:to-emerald-400 text-slate-950 font-extrabold text-sm shadow-xl shadow-cyan-500/20 flex items-center justify-center gap-2 transition-all active:scale-[0.98] cursor-pointer"
      >
        <RefreshCw className="w-4 h-4" />
        <span>Analyze Another Image</span>
      </button>

      {/* Medical Safety Disclaimer */}
      <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-200 text-[11px] flex items-start gap-2.5 leading-relaxed">
        <ShieldAlert className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
        <span>
          <strong>Research System Notice:</strong> OcuSense screening outputs do not replace professional ophthalmic evaluation. Always consult a certified eye specialist.
        </span>
      </div>

    </div>
  );
}
