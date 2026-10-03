import React, { useState } from 'react';
import { Eye, Shield, Lock, Mail, ArrowRight, Activity, Sparkles, CheckCircle2 } from 'lucide-react';

export default function LoginView({ onLoginSuccess, onGuestAccess }) {
  const [email, setEmail] = useState('clinician@ocusense.ai');
  const [password, setPassword] = useState('••••••••••••');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onLoginSuccess();
    }, 800);
  };

  return (
    <div className="relative min-h-[85vh] flex items-center justify-center p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-5xl grid lg:grid-cols-12 gap-8 items-center">
        
        {/* Left Visual Column: Medical Eye AI Graphic */}
        <div className="lg:col-span-6 flex flex-col justify-center space-y-6 text-left">
          
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-semibold tracking-wide w-fit">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Next-Gen Retinal Intelligence</span>
          </div>

          <div className="space-y-3">
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight font-sans">
              Ocu<span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-emerald-400">Sense</span>
            </h1>
            <p className="text-lg text-slate-300 font-medium">
              AI-Powered Diabetic Retinopathy Screening System
            </p>
            <p className="text-sm text-slate-400 leading-relaxed max-w-md">
              Accelerate clinical triage using MobileNetV2 deep learning models and Grad-CAM explainability heatmaps for early microvascular lesion detection.
            </p>
          </div>

          {/* Eye AI Visual Card */}
          <div className="relative rounded-3xl p-6 glass-panel border border-slate-700/50 shadow-2xl overflow-hidden group">
            {/* Background scanner mesh */}
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-emerald-500/5 to-transparent pointer-events-none" />
            
            <div className="relative z-10 flex items-center gap-5">
              
              {/* Animated 3D Retinal Graphic Element */}
              <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-slate-950 border border-cyan-500/30 flex items-center justify-center shadow-xl flex-shrink-0">
                <div className="absolute inset-0 rounded-2xl bg-cyan-500/10 animate-pulse-glow" />
                
                {/* Concentric retinal scanner rings */}
                <div className="w-20 h-20 rounded-full border border-cyan-400/40 flex items-center justify-center animate-spin-slow">
                  <div className="w-14 h-14 rounded-full border border-emerald-400/30 border-dashed flex items-center justify-center">
                    <Eye className="w-8 h-8 text-cyan-400 drop-shadow-[0_0_10px_rgba(6,182,212,0.8)]" />
                  </div>
                </div>

                {/* Laser scan line */}
                <div className="absolute inset-x-2 h-0.5 scanner-beam animate-scan-line" />
              </div>

              {/* Specs list */}
              <div className="space-y-2 text-xs text-slate-300">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>5-Stage ICDR DR Severity Classification</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                  <span>Grad-CAM Explainable Activation Heatmaps</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Instant MobileNetV2 Deep Learning Inference</span>
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* Right Form Column: Medical Portal Login */}
        <div className="lg:col-span-6">
          <div className="glass-panel p-8 sm:p-10 rounded-3xl border border-slate-700/60 shadow-2xl space-y-6 bg-slate-900/80 backdrop-blur-xl">
            
            <div className="space-y-2 text-center lg:text-left">
              <h2 className="text-2xl font-bold text-white tracking-tight flex items-center justify-center lg:justify-start gap-2">
                <Shield className="w-6 h-6 text-cyan-400" />
                Clinician Portal Login
              </h2>
              <p className="text-xs text-slate-400">
                Enter your credentials to access the OcuSense Retinal Screening System
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Email Input */}
              <div className="space-y-1.5 text-left">
                <label className="text-xs font-semibold text-slate-300 tracking-wide">
                  Clinical User ID / Email
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                    <Mail className="w-4 h-4" />
                  </div>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-slate-950/80 border border-slate-800 rounded-xl text-slate-100 text-sm focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all"
                    placeholder="name@ophthalmology.org"
                  />
                </div>
              </div>

              {/* Password Input */}
              <div className="space-y-1.5 text-left">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-semibold text-slate-300 tracking-wide">
                    Password
                  </label>
                  <span className="text-[11px] text-cyan-400 hover:underline cursor-pointer">
                    Forgot Key?
                  </span>
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                    <Lock className="w-4 h-4" />
                  </div>
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-slate-950/80 border border-slate-800 rounded-xl text-slate-100 text-sm focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3.5 px-4 bg-gradient-to-r from-cyan-500 via-teal-500 to-emerald-500 hover:from-cyan-400 hover:to-emerald-400 text-slate-950 font-bold text-sm rounded-xl shadow-lg shadow-cyan-500/25 transition-all flex items-center justify-center gap-2 group cursor-pointer"
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <span>Authenticate & Access Portal</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </form>

            {/* Divider */}
            <div className="relative flex items-center justify-center">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-800" />
              </div>
              <span className="relative px-3 bg-slate-900 text-slate-500 text-xs font-mono uppercase">
                Or Quick Access
              </span>
            </div>

            {/* Guest / Demo Mode Button */}
            <button
              onClick={onGuestAccess}
              className="w-full py-3 px-4 bg-slate-800/80 hover:bg-slate-800 border border-slate-700/80 text-slate-200 text-xs font-semibold rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Activity className="w-4 h-4 text-cyan-400" />
              <span>Launch Guest Screening Environment</span>
            </button>

            <p className="text-[11px] text-center text-slate-500">
              Authorized clinical researchers & faculty evaluation access.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
