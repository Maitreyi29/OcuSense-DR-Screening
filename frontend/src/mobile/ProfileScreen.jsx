import React from 'react';
import { User, Mail, LogOut, ShieldAlert, Code2, Sparkles, CheckCircle2, Heart } from 'lucide-react';
import { supabase } from '../supabaseClient';

export default function ProfileScreen({ user, onLogout }) {
  const userName = user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'Clinician';
  const userEmail = user?.email || 'authenticated@ocusense.org';

  const handleLogoutClick = async () => {
    try {
      await supabase.auth.signOut();
      if (onLogout) onLogout();
    } catch (err) {
      console.error('Logout error:', err);
    }
  };

  return (
    <div className="min-h-screen bg-[#070b14] text-slate-100 flex flex-col p-5 pb-24 space-y-6">
      
      {/* Top Header */}
      <div className="pt-2">
        <span className="text-[10px] uppercase font-mono tracking-wider text-cyan-400 font-bold">
          Account Portal
        </span>
        <h1 className="text-2xl font-black text-white tracking-tight">
          User Profile
        </h1>
      </div>

      {/* User Info Card */}
      <div className="p-6 rounded-3xl bg-gradient-to-br from-slate-900 to-cyan-950/30 border border-cyan-500/30 space-y-4 shadow-xl relative overflow-hidden text-left">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-cyan-500 to-emerald-500 p-0.5 shadow-lg shadow-cyan-500/20 flex-shrink-0">
            <div className="w-full h-full rounded-[14px] bg-slate-950 flex items-center justify-center">
              <User className="w-7 h-7 text-cyan-400" />
            </div>
          </div>

          <div className="space-y-0.5 min-w-0 flex-1">
            <h2 className="text-lg font-extrabold text-white truncate">
              {userName}
            </h2>
            <p className="text-xs text-slate-400 truncate flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-slate-500 flex-shrink-0" />
              <span>{userEmail}</span>
            </p>
          </div>
        </div>

        <div className="pt-2 flex items-center gap-2">
          <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[10px] font-mono font-bold flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3" /> Supabase Session Active
          </span>
          <span className="px-2.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-[10px] font-mono font-bold">
            MobileNetV2 Edge
          </span>
        </div>
      </div>

      {/* Developer & Contact Info Card */}
      <div className="glass-panel p-5 rounded-3xl border border-slate-800 bg-slate-900/40 space-y-3.5 text-left">
        <div className="flex items-center gap-2 text-xs font-bold uppercase font-mono text-cyan-400">
          <Code2 className="w-4 h-4" />
          <span>Developer & Support Contact</span>
        </div>

        <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800/80 space-y-2">
          <div className="flex justify-between items-center text-xs">
            <span className="text-slate-400 font-mono">Lead Developer:</span>
            <span className="font-bold text-white">Maitreyi</span>
          </div>

          <div className="flex justify-between items-center text-xs">
            <span className="text-slate-400 font-mono">Project Role:</span>
            <span className="font-semibold text-cyan-300">Project Developer</span>
          </div>

          <div className="flex justify-between items-center text-xs pt-1 border-t border-slate-900">
            <span className="text-slate-400 font-mono">Contact Email:</span>
            <a
              href="mailto:maitreyishandilya29@gmail.com"
              className="font-bold text-emerald-400 hover:text-emerald-300 transition-colors underline font-mono text-[11px]"
            >
              maitreyishandilya29@gmail.com
            </a>
          </div>
        </div>
      </div>

      {/* Medical Screening Scope Disclaimer Card */}
      <div className="glass-panel p-5 rounded-3xl border border-amber-500/30 bg-amber-500/10 space-y-2 text-left">
        <div className="flex items-center gap-2 text-amber-400 font-mono font-bold text-xs uppercase">
          <ShieldAlert className="w-4 h-4 flex-shrink-0" />
          <span>Medical Screening Scope Disclaimer</span>
        </div>
        <p className="text-xs text-amber-200/90 leading-relaxed font-medium">
          OcuSense is an AI-based screening and educational research system. Results are not a medical diagnosis and should not replace evaluation by a qualified healthcare professional.
        </p>
      </div>

      {/* Prominent Log Out Button */}
      <div className="pt-2">
        <button
          onClick={handleLogoutClick}
          className="w-full py-4 px-6 rounded-2xl bg-slate-900/90 hover:bg-rose-500/15 border border-slate-800 hover:border-rose-500/40 text-rose-400 hover:text-rose-300 font-bold text-xs flex items-center justify-center gap-2 transition-all active:scale-[0.98] cursor-pointer"
        >
          <LogOut className="w-4 h-4" />
          <span>Log Out of OcuSense</span>
        </button>
      </div>

      {/* App Version Info */}
      <div className="text-center pt-2 text-[10px] text-slate-500 font-mono space-y-1">
        <p>OcuSense Mobile v1.0.0 • React + Vite</p>
        <p className="flex items-center justify-center gap-1">
          Built with <Heart className="w-3 h-3 text-rose-500 fill-rose-500 inline" /> for DR Early Screening
        </p>
      </div>

    </div>
  );
}
