import React, { useState } from 'react';
import { HelpCircle, ChevronDown } from 'lucide-react';

export default function FaqSection() {
  const [openIdx, setOpenIdx] = useState(0);

  const faqs = [
    {
      q: 'What is OcuSense?',
      a: 'OcuSense is an AI screening system for Diabetic Retinopathy that classifies fundus images across 5 stages and generates Grad-CAM heatmaps.'
    },
    {
      q: 'What images are supported?',
      a: 'Macula-centered or optic disc fundus photography in PNG or JPEG format up to 10MB.'
    },
    {
      q: 'How are the predictions generated?',
      a: 'Images are normalized and evaluated by a MobileNetV2 deep learning model with Grad-CAM visual heatmaps.'
    },
    {
      q: 'What are the five severity levels?',
      a: 'Stage 0 (No DR), Stage 1 (Mild), Stage 2 (Moderate), Stage 3 (Severe), and Stage 4 (Proliferative DR).'
    },
    {
      q: 'Is OcuSense a medical diagnosis?',
      a: 'No. It is an educational and research screening tool. Results should be reviewed by a qualified healthcare professional.'
    },
    {
      q: 'Can I upload another image?',
      a: 'Yes. Use the Clear or Load Sample buttons to select or reset the screening image.'
    }
  ];

  return (
    <section id="faq-section" className="w-full py-10 text-left scroll-mt-24">
      <div className="space-y-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-semibold">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Frequently Asked Questions</span>
          </div>
          <h2 className="text-3xl font-extrabold text-white tracking-tight">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-3">
          {faqs.map((item, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className="glass-panel rounded-2xl border border-slate-800 overflow-hidden transition-all"
              >
                <button
                  onClick={() => setOpenIdx(isOpen ? -1 : idx)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 font-semibold text-sm text-white hover:text-cyan-400 transition-colors cursor-pointer"
                >
                  <span>{item.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-cyan-400 flex-shrink-0 transition-transform duration-300 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 text-xs text-slate-300 leading-relaxed border-t border-slate-800/60 pt-3 animate-fadeIn">
                    {item.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
