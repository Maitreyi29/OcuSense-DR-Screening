import React, { useRef, useState } from 'react';
import { UploadCloud, FileImage, X, Scan, Sparkles, CheckCircle2 } from 'lucide-react';

export default function UploadSection({
  selectedFile,
  previewUrl,
  onFileSelect,
  onClearFile,
  onStartAnalysis,
  onLoadSample,
  isAnalyzing,
}) {
  const fileInputRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (file.type.startsWith('image/')) {
        onFileSelect(file);
      }
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      onFileSelect(e.target.files[0]);
    }
  };

  return (
    <section id="screening-area" className="w-full space-y-6 scroll-mt-24">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
            <Scan className="w-5 h-5 text-cyan-400" />
            Retinal Image Acquisition
          </h2>
          <p className="text-xs text-slate-400">
            Select or drag a fundus photo (PNG or JPEG format) for AI classification & heatmap generation.
          </p>
        </div>

        {previewUrl && (
          <button
            onClick={onClearFile}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800/80 hover:bg-rose-500/20 hover:text-rose-400 border border-slate-700/60 text-slate-300 text-xs transition-all cursor-pointer"
          >
            <X className="w-3.5 h-3.5" />
            Clear Selection
          </button>
        )}
      </div>

      {!previewUrl ? (
        /* Dropzone view */
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`relative cursor-pointer rounded-3xl p-10 sm:p-14 border-2 border-dashed transition-all duration-300 flex flex-col items-center justify-center text-center space-y-4 ${
            isDragging
              ? 'border-cyan-400 bg-cyan-500/10 scale-[1.01]'
              : 'border-slate-800 hover:border-cyan-500/50 bg-slate-900/40 hover:bg-slate-900/60'
          }`}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/png, image/jpeg, image/jpg"
            onChange={handleFileChange}
            className="hidden"
          />

          <div className="relative w-20 h-20 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
            <div className="absolute inset-0 rounded-2xl bg-cyan-500/5 animate-pulse-glow" />
            <UploadCloud className="w-10 h-10 text-cyan-400" />
          </div>

          <div className="space-y-1 max-w-sm">
            <p className="text-sm font-semibold text-white">
              <span className="text-cyan-400">Click to upload</span> or drag and drop
            </p>
            <p className="text-xs text-slate-400">
              High-resolution macula-centered or optic disc fundus photography
            </p>
          </div>

          <div className="flex items-center gap-4 text-[11px] text-slate-500 font-mono">
            <span>PNG, JPG up to 10MB</span>
            <span>•</span>
            <span>224×224 AI Resized</span>
          </div>

          <div className="pt-2">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onLoadSample();
              }}
              className="px-4 py-2 rounded-xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700/80 text-cyan-400 text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer"
            >
              <FileImage className="w-3.5 h-3.5" />
              Use Sample Retinal Image
            </button>
          </div>
        </div>
      ) : (
        /* Image Preview View */
        <div className="glass-panel p-6 rounded-3xl border border-slate-800 grid md:grid-cols-12 gap-6 items-center">
          
          <div className="md:col-span-5 flex justify-center">
            <div className="relative w-56 h-56 sm:w-64 sm:h-64 rounded-2xl bg-slate-950 p-2 border border-cyan-500/40 shadow-xl overflow-hidden group">
              <img
                src={previewUrl}
                alt="Retinal Fundus Preview"
                className="w-full h-full object-cover rounded-xl"
              />
              <div className="absolute inset-0 rounded-2xl border-2 border-cyan-500/20 pointer-events-none" />
              <div className="absolute top-3 left-3 px-2 py-1 bg-slate-950/80 rounded-md border border-slate-800 text-[10px] font-mono text-cyan-400">
                INPUT RETINA
              </div>
            </div>
          </div>

          <div className="md:col-span-7 space-y-5 text-left">
            <div>
              <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold inline-flex items-center gap-1.5 mb-2">
                <CheckCircle2 className="w-3.5 h-3.5" /> Ready for AI Analysis
              </span>
              <h3 className="text-lg font-bold text-white truncate">
                {selectedFile ? selectedFile.name : 'sample_retina.png'}
              </h3>
              <p className="text-xs text-slate-400">
                {selectedFile
                  ? `${(selectedFile.size / 1024).toFixed(1)} KB • ${selectedFile.type}`
                  : 'Sample Fundus Image Loaded'}
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 text-xs text-slate-300 space-y-2">
              <div className="flex justify-between">
                <span className="text-slate-400">Model Pipeline:</span>
                <span className="font-mono text-cyan-400">MobileNetV2 Transfer Learning</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Input Resolution:</span>
                <span className="font-mono text-slate-200">224 × 224 (Normalized)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Explainability:</span>
                <span className="font-mono text-emerald-400">Grad-CAM Feature Overlay</span>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={onStartAnalysis}
                disabled={isAnalyzing}
                className="flex-1 py-3.5 px-6 rounded-xl bg-gradient-to-r from-cyan-500 via-teal-500 to-emerald-500 hover:from-cyan-400 hover:to-emerald-400 text-slate-950 font-bold text-sm shadow-lg shadow-cyan-500/25 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Sparkles className="w-4 h-4" />
                <span>Run AI Screening Analysis</span>
              </button>
            </div>
          </div>

        </div>
      )}
    </section>
  );
}
