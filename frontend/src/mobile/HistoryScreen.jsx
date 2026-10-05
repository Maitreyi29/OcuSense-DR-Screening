import React, { useState, useEffect } from 'react';
import { History, Trash2, ChevronRight, Eye, Sparkles, Clock, AlertTriangle } from 'lucide-react';

export default function HistoryScreen({ onSelectRecord, onStartScreening }) {
  const [historyList, setHistoryList] = useState([]);
  const [showConfirmClear, setShowConfirmClear] = useState(false);

  // Load history from localStorage on mount
  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = () => {
    try {
      const saved = localStorage.getItem('ocusense_screening_history');
      if (saved) {
        setHistoryList(JSON.parse(saved));
      }
    } catch (e) {
      console.error('Failed to read screening history', e);
    }
  };

  const handleClearHistory = () => {
    localStorage.removeItem('ocusense_screening_history');
    setHistoryList([]);
    setShowConfirmClear(false);
  };

  const getStageBadgeColor = (stage) => {
    switch (stage) {
      case 0:
        return 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400';
      case 1:
        return 'bg-amber-500/10 border-amber-500/30 text-amber-400';
      case 2:
        return 'bg-orange-500/10 border-orange-500/30 text-orange-400';
      case 3:
      case 4:
      default:
        return 'bg-rose-500/10 border-rose-500/30 text-rose-400';
    }
  };

  return (
    <div className="min-h-screen bg-[#070b14] text-slate-100 flex flex-col p-5 pb-24 space-y-6">
      
      {/* Top Header */}
      <div className="pt-2 flex items-center justify-between">
        <div>
          <span className="text-[10px] uppercase font-mono tracking-wider text-cyan-400 font-bold">
            Screening Log
          </span>
          <h1 className="text-2xl font-black text-white tracking-tight">
            History & Records
          </h1>
        </div>

        {historyList.length > 0 && (
          <button
            onClick={() => setShowConfirmClear(true)}
            className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-rose-400 hover:text-rose-300 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Trash2 className="w-4 h-4" />
            <span>Clear</span>
          </button>
        )}
      </div>

      {/* Confirmation Modal */}
      {showConfirmClear && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-6 animate-fadeIn">
          <div className="bg-[#0b0f19] border border-slate-800 rounded-3xl p-6 max-w-xs w-full space-y-4 shadow-2xl text-center">
            <div className="w-12 h-12 rounded-full bg-rose-500/10 text-rose-400 mx-auto flex items-center justify-center">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h3 className="text-base font-bold text-white">Clear All History?</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                This action will permanently delete all saved screening reports from this device.
              </p>
            </div>
            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={() => setShowConfirmClear(false)}
                className="flex-1 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-white cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleClearHistory}
                className="flex-1 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-xs font-bold text-white cursor-pointer"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main List / Empty State */}
      {historyList.length === 0 ? (
        <div className="my-auto py-16 flex flex-col items-center justify-center text-center space-y-4">
          <div className="w-16 h-16 rounded-3xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-600">
            <History className="w-8 h-8" />
          </div>
          <div className="space-y-1">
            <h3 className="text-base font-bold text-white">No Saved Records</h3>
            <p className="text-xs text-slate-400 max-w-xs leading-relaxed">
              Your completed retinal screening results will automatically appear here.
            </p>
          </div>
          <button
            onClick={onStartScreening}
            className="py-3 px-6 rounded-2xl bg-gradient-to-r from-cyan-500 to-emerald-500 text-slate-950 font-bold text-xs flex items-center gap-2 shadow-lg shadow-cyan-500/20 active:scale-95 transition-transform cursor-pointer"
          >
            <Sparkles className="w-4 h-4" />
            <span>Perform First Screening</span>
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          <span className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold font-mono">
            Past Tests ({historyList.length})
          </span>

          <div className="space-y-3">
            {historyList.map((item, index) => (
              <div
                key={index}
                onClick={() => onSelectRecord(item)}
                className="p-3.5 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-cyan-500/40 transition-all flex items-center gap-3.5 cursor-pointer active:scale-[0.99]"
              >
                {/* Image Thumbnail */}
                <div className="w-14 h-14 rounded-xl bg-slate-950 border border-slate-800 overflow-hidden flex-shrink-0">
                  {item.original_image ? (
                    <img
                      src={item.original_image}
                      alt="Fundus Thumbnail"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-slate-600">
                      <Eye className="w-5 h-5" />
                    </div>
                  )}
                </div>

                {/* Details */}
                <div className="flex-1 min-w-0 space-y-1 text-left">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-bold text-white truncate">
                      {item.class_name || 'Screening Record'}
                    </h4>
                    <span className="text-[10px] text-slate-400 font-mono flex items-center gap-1">
                      <Clock className="w-3 h-3 text-slate-500" />
                      {item.timestamp || 'Recent'}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-0.5 rounded-md border text-[10px] font-bold ${getStageBadgeColor(item.predicted_stage)}`}>
                      Stage {item.predicted_stage ?? 0}
                    </span>
                    <span className="text-[10px] text-cyan-400 font-mono font-semibold">
                      {item.confidence ? `${(item.confidence * 100).toFixed(1)}%` : ''}
                    </span>
                  </div>
                </div>

                <ChevronRight className="w-4 h-4 text-slate-500 flex-shrink-0" />
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}
