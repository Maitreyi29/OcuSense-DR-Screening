import React, { useState } from 'react';
import { HelpCircle, ChevronDown } from 'lucide-react';

export default function FaqSection() {
  const [openIdx, setOpenIdx] = useState(0);

  const faqs = [
    {
      q: 'What is OcuSense?',
      a: 'OcuSense is an AI-powered Diabetic Retinopathy Screening System designed to analyze digital fundus photographs, classify disease severity across 5 clinical stages, and generate Grad-CAM heatmaps highlighting microvascular pathology.'
    },
    {
      q: 'What is Diabetic Retinopathy?',
      a: 'Diabetic Retinopathy (DR) is a microvascular complication of diabetes caused by prolonged high blood sugar damaging small blood vessels in the retina. Symptoms range from microaneurysms to severe hemorrhages and proliferative new vessel growth.'
    },
    {
      q: 'What type of image can I upload?',
      a: 'You can upload high-resolution macula-centered or optic disc fundus photographs in PNG or JPEG format up to 10MB in size.'
    },
    {
      q: 'How does the AI screening work?',
      a: 'The image is normalized to 224x224 RGB and passed through a fine-tuned MobileNetV2 deep neural network. The model predicts class probabilities via softmax and extracts gradients from the final convolutional layer (features[-1]) to construct a Grad-CAM heatmap overlay.'
    },
    {
      q: 'What are the five severity levels?',
      a: 'The system uses the International Clinical Diabetic Retinopathy (ICDR) scale: Stage 0 (No DR), Stage 1 (Mild), Stage 2 (Moderate), Stage 3 (Severe), and Stage 4 (Proliferative DR).'
    },
    {
      q: 'How long does screening take?',
      a: 'Inference and heatmap generation typically complete in under 1 second when connected to the FastAPI backend.'
    },
    {
      q: 'Is OcuSense a medical diagnosis?',
      a: 'No. OcuSense is an educational and screening decision-support tool. All results must be evaluated and confirmed by a certified ophthalmologist or qualified healthcare professional.'
    },
    {
      q: 'Can I upload another image?',
      a: 'Yes. Simply click the "Screen Another Image" or "Clear Selection" button to reset the dropzone and upload a new fundus photo.'
    }
  ];

  return (
    <section id="faq-section" className="w-full py-12 text-left scroll-mt-24">
      <div className="space-y-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-semibold">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Frequently Asked Questions</span>
          </div>
          <h2 className="text-3xl font-extrabold text-white tracking-tight">
            Got Questions? We Have Answers
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 max-w-2xl">
            Everything you need to know about the OcuSense AI screening platform.
          </p>
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
