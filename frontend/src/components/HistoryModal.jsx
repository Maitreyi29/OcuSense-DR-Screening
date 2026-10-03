import React from 'react';
import { X, History, Trash2, ExternalLink } from 'lucide-react';

export default function HistoryModal({ isOpen, onClose, history, onSelectHistory, onClearHistory }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-2xl glass-panel p-6 sm:p-8 rounded-3xl border border-slate-700 shadow-2xl space-y-6 max-h-[85vh] flex flex-col bg-slate-900/90">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-2 text-white font-bold text-lg">
            <History className="w-5 h-5 text-cyan-400" />
            <span>Retinal Screening History</span>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white transition-all"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="overflow-y-auto space-y-3 flex-1 pr-1">
          {history.length === 0 ? (
            <div className="text-center py-12 space-y-2">
              <History className="w-10 h-10 text-slate-600 mx-auto" />
              <p className="text-sm font-semibold text-slate-300">No Screening History Yet</p>
              <p className="text-xs text-slate-500">Completed screenings will be automatically saved locally.</p>
            </div>
          ) : (
            history.map((item, idx) => (
              <div
                key={idx}
                onClick={() => {
                  onSelectHistory(item);
                  onClose();
                }}
                className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 hover:border-cyan-500/40 transition-all flex items-center justify-between gap-4 cursor-pointer group"
              >
                <div className="flex items-center gap-4">
                  {item.original_image && (
                    <img
                      src={item.original_image}
                      alt="History preview"
                      className="w-12 h-12 rounded-xl object-cover border border-slate-800"
                    />
                  )}
                  <div className="text-left space-y-0.5">
                    <span className="text-xs font-bold text-white group-hover:text-cyan-400 transition-colors">
                      {item.class_name}
                    </span>
                    <p className="text-[11px] text-slate-400 font-mono">
                      {item.timestamp || 'Recent Session'} • {(item.confidence * 100).toFixed(1)}% Confidence
                    </p>
                  </div>
                </div>

                <ExternalLink className="w-4 h-4 text-slate-500 group-hover:text-cyan-400 transition-colors" />
              </div>
            ))
          )}
        </div>

        {/* Modal Footer */}
        {history.length > 0 && (
          <div className="pt-4 border-t border-slate-800 flex justify-between items-center">
            <button
              onClick={onClearHistory}
              className="px-3 py-1.5 rounded-xl text-xs text-rose-400 hover:bg-rose-500/10 border border-rose-500/20 flex items-center gap-1.5 transition-all"
            >
              <Trash2 className="w-3.5 h-3.5" />
              Clear History
            </button>
            <span className="text-xs text-slate-500 font-mono">
              {history.length} saved screenings
            </span>
          </div>
        )}

      </div>
    </div>
  );
}
