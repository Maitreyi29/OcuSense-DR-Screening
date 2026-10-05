import React, { useState } from 'react';
import { supabase } from '../supabaseClient';
import { Eye, Mail, Lock, User, ArrowLeft, AlertCircle, CheckCircle2, Loader2 } from 'lucide-react';

export default function AuthScreen({ initialMode = 'login', onAuthSuccess, onBack }) {
  const [mode, setMode] = useState(initialMode); // 'login' | 'signup'
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [verificationSent, setVerificationSent] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(null);
    setLoading(true);

    try {
      if (mode === 'signup') {
        if (!name.trim()) throw new Error('Please enter your full name.');
        
        const { data, error } = await supabase.auth.signUp({
          email: email.trim(),
          password: password,
          options: {
            data: { full_name: name.trim() }
          }
        });

        if (error) throw error;

        // If Supabase requires email verification
        if (data?.user && (!data.session || data.user.identities?.length === 0)) {
          setVerificationSent(true);
        } else if (data?.session) {
          onAuthSuccess(data.user);
        } else {
          setVerificationSent(true);
        }
      } else {
        // Log In
        const { data, error } = await supabase.auth.signInWithPassword({
          email: email.trim(),
          password: password,
        });

        if (error) {
          if (error.message.toLowerCase().includes('email not confirmed')) {
            throw new Error('Please verify your email before logging in. Check your inbox.');
          }
          throw error;
        }

        if (data?.user) {
          onAuthSuccess(data.user);
        }
      }
    } catch (err) {
      setErrorMessage(err.message || 'Authentication failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#070b14] text-slate-100 flex flex-col justify-between p-6">
      {/* Top Header */}
      <div className="pt-4 flex items-center justify-between">
        <button
          onClick={onBack}
          className="p-2 -ml-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-900 transition-all cursor-pointer"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2">
          <Eye className="w-5 h-5 text-cyan-400" />
          <span className="font-bold font-mono text-sm">OcuSense</span>
        </div>

        <div className="w-8" /> {/* Spacer */}
      </div>

      {/* Main Form Box */}
      <div className="my-auto py-6 max-w-sm w-full mx-auto space-y-6">
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-bold text-white tracking-tight">
            {mode === 'signup' ? 'Create OcuSense Account' : 'Welcome Back'}
          </h2>
          <p className="text-xs text-slate-400">
            {mode === 'signup'
              ? 'Register to begin AI-assisted retinal screening'
              : 'Enter your credentials to access your screening portal'}
          </p>
        </div>

        {/* Error Banner */}
        {errorMessage && (
          <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-start gap-2.5 animate-fadeIn">
            <AlertCircle className="w-4 h-4 text-rose-400 flex-shrink-0 mt-0.5" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Verification Sent Success Screen */}
        {verificationSent ? (
          <div className="p-6 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 text-center space-y-4 animate-fadeIn">
            <div className="w-12 h-12 rounded-full bg-cyan-500/20 text-cyan-400 mx-auto flex items-center justify-center">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h3 className="font-bold text-white text-sm">Verification Email Sent!</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Please check your inbox at <span className="text-cyan-300 font-semibold">{email}</span> and click the confirmation link to activate your OcuSense account.
              </p>
            </div>
            <button
              onClick={() => {
                setVerificationSent(false);
                setMode('login');
              }}
              className="w-full py-2.5 px-4 rounded-xl bg-slate-900 border border-slate-800 text-xs font-semibold text-white hover:bg-slate-800 cursor-pointer"
            >
              Back to Log In
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Full Name (Sign Up only) */}
            {mode === 'signup' && (
              <div className="space-y-1.5 text-left">
                <label className="block text-[11px] font-semibold text-slate-300 uppercase tracking-wider">
                  Full Name
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Dr. Maitreyi"
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-900/80 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500/50"
                  />
                </div>
              </div>
            )}

            {/* Email */}
            <div className="space-y-1.5 text-left">
              <label className="block text-[11px] font-semibold text-slate-300 uppercase tracking-wider">
                Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@clinic.org"
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-900/80 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500/50"
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-1.5 text-left">
              <label className="block text-[11px] font-semibold text-slate-300 uppercase tracking-wider">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
                <input
                  type="password"
                  required
                  minLength={6}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Minimum 6 characters"
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-900/80 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500/50"
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full mt-2 py-3.5 px-4 rounded-xl bg-gradient-to-r from-cyan-500 to-emerald-500 hover:from-cyan-400 hover:to-emerald-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/20 active:scale-[0.98] transition-all cursor-pointer disabled:opacity-50"
            >
              {loading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : mode === 'signup' ? (
                'Create Account'
              ) : (
                'Log In to OcuSense'
              )}
            </button>
          </form>
        )}

        {/* Mode Switcher */}
        {!verificationSent && (
          <div className="text-center pt-2">
            <button
              type="button"
              onClick={() => {
                setErrorMessage(null);
                setMode(mode === 'login' ? 'signup' : 'login');
              }}
              className="text-xs text-slate-400 hover:text-cyan-400 transition-colors cursor-pointer"
            >
              {mode === 'login' ? (
                <>Don't have an account? <span className="text-cyan-400 font-semibold underline">Sign Up</span></>
              ) : (
                <>Already have an account? <span className="text-cyan-400 font-semibold underline">Log In</span></>
              )}
            </button>
          </div>
        )}
      </div>

      {/* Footer Info */}
      <p className="text-[10px] text-center text-slate-500 pb-2">
        Secured by Supabase Encrypted Authentication
      </p>
    </div>
  );
}