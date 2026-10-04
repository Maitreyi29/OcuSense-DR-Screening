import React, { useState } from 'react';
import { X, Lock, Mail, User, ArrowRight, CheckCircle2, Eye, Sparkles, AlertCircle } from 'lucide-react';
import { registerUser, loginUser, resetPassword } from '../services/authService';

export default function AuthModal({ isOpen, onClose, onLoginSuccess }) {
  const [mode, setMode] = useState('login'); // 'login' | 'signup' | 'forgot'
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [verificationSentEmail, setVerificationSentEmail] = useState('');

  if (!isOpen) return null;

  const handleSwitchMode = (newMode) => {
    setMode(newMode);
    setErrorMessage('');
    setSuccessMsg('');
    setVerificationSentEmail('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMsg('');
    setVerificationSentEmail('');

    try {
      if (mode === 'forgot') {
        setIsLoading(true);
        await resetPassword(formData.email);
        setIsLoading(false);
        setSuccessMsg(`Password reset instructions sent to ${formData.email}. Please check your inbox.`);
        return;
      }

      if (mode === 'signup') {
        if (!formData.name.trim()) {
          setErrorMessage('Please enter your name.');
          return;
        }
        if (formData.password !== formData.confirmPassword) {
          setErrorMessage('Password and Confirm Password do not match.');
          return;
        }
        if (formData.password.length < 6) {
          setErrorMessage('Password must be at least 6 characters long.');
          return;
        }

        setIsLoading(true);
        const result = await registerUser({
          name: formData.name,
          email: formData.email,
          password: formData.password,
        });
        setIsLoading(false);

        if (result.requiresVerification) {
          setVerificationSentEmail(result.email);
          setSuccessMsg(`Verification email sent! Please check your inbox at ${result.email} and click the confirmation link to activate your OcuSense account.`);
        } else {
          setSuccessMsg('Account created and activated successfully! Logging you in...');
          setTimeout(() => {
            onLoginSuccess(result.user);
            onClose();
          }, 1200);
        }

      } else {
        // Login Flow
        setIsLoading(true);
        const user = await loginUser({
          email: formData.email,
          password: formData.password,
        });
        setIsLoading(false);

        setSuccessMsg(`Welcome back, ${user.name}!`);
        setTimeout(() => {
          onLoginSuccess(user);
          onClose();
          setSuccessMsg('');
        }, 600);
      }
    } catch (err) {
      setIsLoading(false);
      setErrorMessage(err.message || 'Authentication error. Please try again.');
    }
  };

  const handleGuestAccess = () => {
    const guestUser = {
      uid: 'guest_session',
      name: 'Guest User',
      email: 'guest@ocusense.ai',
    };
    onLoginSuccess(guestUser);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-md glass-panel p-6 sm:p-8 rounded-3xl border border-slate-700 shadow-2xl space-y-6 bg-slate-900/95 text-left">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white transition-all cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Modal Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>OcuSense Access Portal</span>
          </div>

          <h2 className="text-2xl font-bold text-white tracking-tight">
            {mode === 'login' ? 'Log In' : mode === 'signup' ? 'Create Account' : 'Reset Password'}
          </h2>
          <p className="text-xs text-slate-400">
            {mode === 'login'
              ? 'Enter your registered credentials to sign in'
              : mode === 'signup'
              ? 'Enter your name, email, and password to register'
              : 'Enter your email address to receive password reset instructions'}
          </p>
        </div>

        {/* Tab Switcher */}
        {mode !== 'forgot' && (
          <div className="flex bg-slate-950 p-1 rounded-2xl border border-slate-800 text-xs font-semibold">
            <button
              type="button"
              onClick={() => handleSwitchMode('login')}
              className={`flex-1 py-2 rounded-xl transition-all cursor-pointer ${
                mode === 'login'
                  ? 'bg-gradient-to-r from-cyan-500 to-emerald-500 text-slate-950 shadow-md font-bold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Log In
            </button>
            <button
              type="button"
              onClick={() => handleSwitchMode('signup')}
              className={`flex-1 py-2 rounded-xl transition-all cursor-pointer ${
                mode === 'signup'
                  ? 'bg-gradient-to-r from-cyan-500 to-emerald-500 text-slate-950 shadow-md font-bold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Sign Up
            </button>
          </div>
        )}

        {/* Error Alert */}
        {errorMessage && (
          <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2 font-medium">
            <AlertCircle className="w-4 h-4 text-rose-400 flex-shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Success Alert */}
        {successMsg && (
          <div className="p-4 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs space-y-1 font-semibold animate-fadeIn">
            <div className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
              <div className="space-y-1">
                <p>{successMsg}</p>
              </div>
            </div>
          </div>
        )}

        {/* Auth Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* Sign Up Name */}
          {mode === 'signup' && (
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300">Name *</label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Your name"
                  className="w-full pl-10 pr-4 py-3 bg-slate-950/80 border border-slate-800 rounded-xl text-slate-100 text-xs focus:outline-none focus:border-cyan-500 focus:ring-1"
                />
              </div>
            </div>
          )}

          {/* Email Input */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300">Email *</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="your.email@example.com"
                className="w-full pl-10 pr-4 py-3 bg-slate-950/80 border border-slate-800 rounded-xl text-slate-100 text-xs focus:outline-none focus:border-cyan-500 focus:ring-1"
              />
            </div>
          </div>

          {/* Password Input */}
          {mode !== 'forgot' && (
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold text-slate-300">Password *</label>
                {mode === 'login' && (
                  <span
                    onClick={() => handleSwitchMode('forgot')}
                    className="text-[11px] text-cyan-400 hover:underline cursor-pointer"
                  >
                    Forgot Password?
                  </span>
                )}
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
                <input
                  type="password"
                  required
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  placeholder="At least 6 characters"
                  className="w-full pl-10 pr-4 py-3 bg-slate-950/80 border border-slate-800 rounded-xl text-slate-100 text-xs focus:outline-none focus:border-cyan-500"
                />
              </div>
            </div>
          )}

          {/* Confirm Password (Sign Up Mode) */}
          {mode === 'signup' && (
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300">Confirm Password *</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
                <input
                  type="password"
                  required
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  placeholder="Re-enter password"
                  className="w-full pl-10 pr-4 py-3 bg-slate-950/80 border border-slate-800 rounded-xl text-slate-100 text-xs focus:outline-none focus:border-cyan-500"
                />
              </div>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 px-4 bg-gradient-to-r from-cyan-500 via-teal-500 to-emerald-500 hover:from-cyan-400 hover:to-emerald-400 text-slate-950 font-bold text-xs rounded-xl shadow-lg shadow-cyan-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            {isLoading ? (
              <div className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                <span>
                  {mode === 'login' ? 'Log In' : mode === 'signup' ? 'Sign Up' : 'Send Reset Link'}
                </span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        {/* Footer Toggle Text */}
        <div className="text-center text-xs text-slate-400">
          {mode === 'login' ? (
            <span>
              Don't have an account?{' '}
              <button
                type="button"
                onClick={() => handleSwitchMode('signup')}
                className="text-cyan-400 font-semibold hover:underline cursor-pointer"
              >
                Sign Up
              </button>
            </span>
          ) : mode === 'signup' ? (
            <span>
              Already have an account?{' '}
              <button
                type="button"
                onClick={() => handleSwitchMode('login')}
                className="text-cyan-400 font-semibold hover:underline cursor-pointer"
              >
                Log In
              </button>
            </span>
          ) : (
            <button
              type="button"
              onClick={() => handleSwitchMode('login')}
              className="text-cyan-400 font-semibold hover:underline cursor-pointer"
            >
              Back to Log In
            </button>
          )}
        </div>

        {/* Guest Access Sandbox Button */}
        <div className="pt-2 border-t border-slate-800">
          <button
            onClick={handleGuestAccess}
            className="w-full py-2.5 px-4 bg-slate-800/80 hover:bg-slate-800 border border-slate-700/80 text-slate-200 text-xs font-semibold rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <Eye className="w-4 h-4 text-cyan-400" />
            <span>Continue as Guest</span>
          </button>
        </div>

      </div>
    </div>
  );
}
