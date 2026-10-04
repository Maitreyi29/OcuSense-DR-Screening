import React, { useState } from 'react';
import { Mail, User, Send, MessageSquare, AlertCircle, ExternalLink, Info } from 'lucide-react';
import emailjs from '@emailjs/browser';

export default function ContactSection() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [statusNotice, setStatusNotice] = useState(null); // { type: 'success'|'info'|'error', text: string }
  const [errorMessage, setErrorMessage] = useState('');

  const developerEmail = "maitreyishandilya29@gmail.com";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setStatusNotice(null);

    if (!formData.name.trim()) {
      setErrorMessage('Please enter your name.');
      return;
    }
    if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }
    if (!formData.message.trim() || formData.message.trim().length < 5) {
      setErrorMessage('Please enter a message (at least 5 characters).');
      return;
    }

    setIsLoading(true);

    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    // Send via EmailJS if configured
    if (serviceId && templateId && publicKey) {
      try {
        await emailjs.send(
          serviceId,
          templateId,
          {
            from_name: formData.name,
            from_email: formData.email,
            message: formData.message,
            to_email: developerEmail
          },
          publicKey
        );

        setIsLoading(false);
        setStatusNotice({
          type: 'success',
          text: `Message delivered via email service to ${developerEmail}.`
        });
        setFormData({ name: '', email: '', message: '' });
        return;
      } catch (err) {
        console.error('EmailJS send error:', err);
        setIsLoading(false);
        // Fall back to opening mail client without faking
      }
    }

    // Direct mailto client trigger (Honest fallback: no fake "sent" message without launching mailto)
    setTimeout(() => {
      setIsLoading(false);
      const mailtoUrl = `mailto:${developerEmail}?subject=${encodeURIComponent('OcuSense Message from ' + formData.name)}&body=${encodeURIComponent(
        `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
      )}`;
      window.location.href = mailtoUrl;

      setStatusNotice({
        type: 'info',
        text: `Opening your default email client to send your message directly to ${developerEmail}.`
      });
      setFormData({ name: '', email: '', message: '' });
    }, 400);
  };

  return (
    <section id="contact-section" className="w-full py-10 text-left scroll-mt-24">
      <div className="glass-panel p-8 sm:p-12 rounded-3xl border border-slate-800 space-y-8 bg-gradient-to-r from-slate-900/80 via-slate-900/50 to-slate-950/80 shadow-2xl">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto space-y-2 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-semibold">
            <Mail className="w-3.5 h-3.5" />
            <span>Developer Contact</span>
          </div>
          <h2 className="text-3xl font-extrabold text-white tracking-tight">
            Contact Us
          </h2>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 items-start max-w-5xl mx-auto">
          
          {/* Left Column: Developer Contact Info Card */}
          <div className="lg:col-span-5 space-y-4 glass-card p-6 rounded-3xl border border-slate-800">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-cyan-500 to-emerald-500 p-0.5 flex items-center justify-center shadow-lg shadow-cyan-500/20">
                <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center text-cyan-400 font-bold text-lg">
                  M
                </div>
              </div>
              <div>
                <h3 className="text-lg font-bold text-white tracking-tight">Maitreyi</h3>
                <p className="text-xs text-cyan-400 font-medium">Project Developer</p>
              </div>
            </div>

            <div className="space-y-3 pt-3 border-t border-slate-800/80 text-xs text-slate-300">
              <div className="space-y-1">
                <span className="text-[10px] font-mono font-bold text-slate-500 uppercase">EMAIL ADDRESS</span>
                <a
                  href={`mailto:${developerEmail}`}
                  className="flex items-center gap-2 text-cyan-300 hover:text-cyan-200 font-mono font-bold hover:underline"
                  title="Send email to Maitreyi"
                >
                  <Mail className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                  <span className="truncate">{developerEmail}</span>
                  <ExternalLink className="w-3 h-3 text-cyan-400 flex-shrink-0" />
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Simplified Contact Form */}
          <div className="lg:col-span-7 glass-card p-6 sm:p-8 rounded-3xl border border-slate-800">
            
            {statusNotice && (
              <div className={`p-4 rounded-2xl border text-xs mb-4 flex items-start gap-2.5 ${
                statusNotice.type === 'success'
                  ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
                  : 'bg-cyan-500/10 border-cyan-500/30 text-cyan-300'
              }`}>
                <Info className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" />
                <span>{statusNotice.text}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              
              {errorMessage && (
                <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-rose-400 flex-shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

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
                    className="w-full pl-10 pr-4 py-3 bg-slate-950/80 border border-slate-800 rounded-xl text-slate-100 text-xs focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
                  />
                </div>
              </div>

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
                    className="w-full pl-10 pr-4 py-3 bg-slate-950/80 border border-slate-800 rounded-xl text-slate-100 text-xs focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300">Message *</label>
                <div className="relative">
                  <MessageSquare className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Write your message here..."
                    className="w-full pl-10 pr-4 py-3 bg-slate-950/80 border border-slate-800 rounded-xl text-slate-100 text-xs focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 resize-none"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-cyan-500 via-teal-500 to-emerald-500 hover:from-cyan-400 hover:to-emerald-400 text-slate-950 font-bold text-xs shadow-lg shadow-cyan-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                {isLoading ? (
                  <div className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Send Message</span>
                  </>
                )}
              </button>
            </form>

          </div>

        </div>

      </div>
    </section>
  );
}
