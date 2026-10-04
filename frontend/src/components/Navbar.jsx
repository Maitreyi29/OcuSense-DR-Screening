import React, { useState } from 'react';
import { Eye, History, LogOut, UserCheck, Menu, X, LogIn, Activity } from 'lucide-react';

export default function Navbar({
  backendStatus,
  currentUser,
  onOpenAuth,
  onLogout,
  historyCount,
  openHistory,
  onNavigate,
}) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Home', sectionId: 'hero-section' },
    { name: 'Services', sectionId: 'services-section' },
    { name: 'About Us', sectionId: 'about-section' },
    { name: 'How It Works', sectionId: 'pipeline-section' },
    { name: 'FAQs', sectionId: 'faq-section' },
    { name: 'Need Help?', sectionId: 'help-section' },
    { name: 'Contact Us', sectionId: 'contact-section' },
  ];

  const handleLinkClick = (id) => {
    onNavigate(id);
    setIsMobileMenuOpen(false);
  };

  const isOnline = backendStatus.connected;

  return (
    <header className="sticky top-0 z-40 w-full glass-panel border-b border-slate-800/80 bg-[#0b0f19]/85 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Brand Logo */}
        <div 
          onClick={() => handleLinkClick('hero-section')}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="relative w-11 h-11 rounded-xl bg-gradient-to-tr from-cyan-600 to-emerald-500 p-0.5 shadow-lg shadow-cyan-500/20 group-hover:scale-105 transition-transform duration-300">
            <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
              <Eye className="w-6 h-6 text-cyan-400 group-hover:rotate-12 transition-transform duration-300" />
            </div>
            <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
              <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${isOnline ? 'bg-emerald-400' : 'bg-amber-400'} opacity-75`}></span>
              <span className={`relative inline-flex rounded-full h-3.5 w-3.5 ${isOnline ? 'bg-emerald-500' : 'bg-amber-500'} border-2 border-slate-950`}></span>
            </span>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold tracking-tight text-white font-sans">
                Ocu<span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400">Sense</span>
              </span>
              <span className="px-2 py-0.5 text-[10px] font-semibold tracking-wider uppercase bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 rounded-full hidden sm:inline-block">
                AI Healthcare
              </span>
            </div>
            <p className="text-[11px] text-slate-400 font-medium tracking-wide">
              AI-Powered Diabetic Retinopathy Screening
            </p>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden xl:flex items-center gap-1 bg-slate-900/60 p-1.5 rounded-2xl border border-slate-800/80">
          {navLinks.map((link) => (
            <button
              key={link.name}
              onClick={() => handleLinkClick(link.sectionId)}
              className="px-3 py-1.5 rounded-xl text-xs font-medium text-slate-300 hover:text-white hover:bg-slate-800/60 transition-all cursor-pointer"
            >
              {link.name}
            </button>
          ))}
        </nav>

        {/* Right Status & Actions */}
        <div className="flex items-center gap-3">
          
          {/* History Button */}
          <button
            onClick={openHistory}
            className="relative flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-800/60 hover:bg-slate-800 border border-slate-700/60 text-slate-200 text-xs font-medium transition-all cursor-pointer"
            title="View screening history"
          >
            <History className="w-4 h-4 text-cyan-400" />
            <span className="hidden sm:inline">History</span>
            {historyCount > 0 && (
              <span className="px-1.5 py-0.2 bg-cyan-500 text-slate-950 font-bold text-[10px] rounded-full">
                {historyCount}
              </span>
            )}
          </button>

          {/* AI Engine Status Indicator */}
          <div 
            className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900/90 border border-slate-800 text-xs shadow-inner"
            title={isOnline ? "FastAPI PyTorch Backend Online" : "AI Engine Offline or Waking Up"}
          >
            <span className={`w-2.5 h-2.5 rounded-full ${isOnline ? 'bg-emerald-400 animate-pulse shadow-[0_0_8px_#10b981]' : 'bg-amber-500 shadow-[0_0_8px_#f59e0b]'}`} />
            <div className="flex flex-col text-left">
              <span className="text-[10px] text-slate-400 font-semibold leading-none">AI ENGINE</span>
              <span className={`text-[11px] font-bold font-mono ${isOnline ? 'text-emerald-400' : 'text-amber-400'}`}>
                {isOnline ? 'ONLINE' : 'OFFLINE'}
              </span>
            </div>
          </div>

          {/* Log In / Sign Up OR User Profile */}
          {currentUser ? (
            <div className="flex items-center gap-2">
              <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold">
                <UserCheck className="w-3.5 h-3.5" />
                <span className="truncate max-w-[120px]">
                  {currentUser.name ? `Welcome, ${currentUser.name}` : 'Account'}
                </span>
              </div>
              <button
                onClick={onLogout}
                className="p-2.5 rounded-xl bg-slate-800/80 hover:bg-rose-500/20 hover:text-rose-400 border border-slate-700/60 text-slate-300 text-xs transition-all cursor-pointer"
                title="Log Out"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <button
              onClick={onOpenAuth}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-emerald-500 hover:from-cyan-400 hover:to-emerald-400 text-slate-950 font-bold text-xs shadow-md shadow-cyan-500/20 transition-all cursor-pointer"
            >
              <LogIn className="w-4 h-4" />
              <span>Log In / Sign Up</span>
            </button>
          )}

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="xl:hidden p-2.5 rounded-xl bg-slate-800/80 text-slate-300 hover:text-white border border-slate-700/60 transition-all cursor-pointer"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="xl:hidden p-4 bg-slate-950/95 border-b border-slate-800 space-y-2 animate-fadeIn">
          
          {/* Mobile AI Engine Status */}
          <div className="flex items-center justify-between px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs mb-3">
            <span className="text-slate-400 font-semibold">AI ENGINE STATUS</span>
            <div className="flex items-center gap-1.5 font-bold font-mono">
              <span className={`w-2 h-2 rounded-full ${isOnline ? 'bg-emerald-400 animate-pulse' : 'bg-amber-500'}`} />
              <span className={isOnline ? 'text-emerald-400' : 'text-amber-400'}>
                {isOnline ? 'ONLINE' : 'OFFLINE'}
              </span>
            </div>
          </div>

          {navLinks.map((link) => (
            <button
              key={link.name}
              onClick={() => handleLinkClick(link.sectionId)}
              className="w-full text-left px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-200 hover:bg-slate-900 hover:text-cyan-400 transition-all"
            >
              {link.name}
            </button>
          ))}

          {!currentUser ? (
            <button
              onClick={() => {
                onOpenAuth();
                setIsMobileMenuOpen(false);
              }}
              className="w-full mt-2 py-3 px-4 rounded-xl bg-gradient-to-r from-cyan-500 to-emerald-500 text-slate-950 font-bold text-xs flex items-center justify-center gap-2"
            >
              <LogIn className="w-4 h-4" />
              <span>Log In / Sign Up</span>
            </button>
          ) : (
            <button
              onClick={() => {
                onLogout();
                setIsMobileMenuOpen(false);
              }}
              className="w-full mt-2 py-3 px-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 font-bold text-xs flex items-center justify-center gap-2"
            >
              <LogOut className="w-4 h-4" />
              <span>Log Out ({currentUser.name})</span>
            </button>
          )}
        </div>
      )}
    </header>
  );
}
