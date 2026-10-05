import React from 'react';
import { Home, Eye, History, User } from 'lucide-react';

export default function MobileBottomNav({ activeTab, onTabChange, historyCount = 0 }) {
  const tabs = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'screening', label: 'Screening', icon: Eye, isPill: true },
    { id: 'history', label: 'History', icon: History, badge: historyCount },
    { id: 'profile', label: 'Profile', icon: User },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-[#070b14]/90 backdrop-blur-lg border-t border-slate-800/80 px-4 py-2.5 max-w-md mx-auto">
      <div className="flex items-center justify-around">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          if (tab.isPill) {
            // Highlighted Screening Tab with glowing active pill
            return (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={`relative px-4 py-2 rounded-full flex items-center gap-2 transition-all cursor-pointer ${
                  isActive
                    ? 'bg-gradient-to-r from-cyan-500 to-emerald-500 text-slate-950 font-bold shadow-lg shadow-cyan-500/30 scale-105'
                    : 'bg-slate-900 border border-cyan-500/40 text-cyan-400 font-semibold'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span className="text-xs font-mono">{tab.label}</span>
              </button>
            );
          }

          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`relative flex flex-col items-center gap-1 p-2 rounded-xl transition-all cursor-pointer ${
                isActive ? 'text-cyan-400 font-bold' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <div className="relative">
                <Icon className={`w-5 h-5 transition-transform ${isActive ? 'scale-110' : ''}`} />
                {tab.badge > 0 && (
                  <span className="absolute -top-1.5 -right-2 px-1.5 py-0.2 rounded-full bg-cyan-500 text-slate-950 text-[9px] font-bold font-mono">
                    {tab.badge}
                  </span>
                )}
              </div>
              <span className="text-[10px] font-mono tracking-tight">{tab.label}</span>

              {/* Active Indicator Dot */}
              {isActive && (
                <span className="w-1 h-1 rounded-full bg-cyan-400 animate-pulse" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
