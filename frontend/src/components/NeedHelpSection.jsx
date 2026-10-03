import React from 'react';
import { LifeBuoy, FileImage, Percent, Eye, Calendar, ArrowRight } from 'lucide-react';

export default function NeedHelpSection({ onStartScreening }) {
  const guides = [
    {
      title: 'Uploading an Image',
      desc: 'Use macula-centered or optic disc fundus photography in PNG or JPEG format under 10MB.',
      icon: FileImage,
      action: 'Try Dropzone'
    },
    {
      title: 'Reading AI Confidence',
      desc: 'Confidence represents softmax output percentage for the winning class out of 100%.',
      icon: Percent,
      action: 'View Specs'
    },
    {
      title: 'Interpreting Grad-CAM Heatmaps',
      desc: 'Warm red regions represent high model activation corresponding to microvascular lesions.',
      icon: Eye,
      action: 'Learn More'
    },
    {
      title: 'Ophthalmic Follow-ups',
      desc: 'Each predicted stage includes recommended clinical referral timelines from routine to urgent.',
      icon: Calendar,
      action: 'See 5 Stages'
    }
  ];

  return (
    <section id="help-section" className="w-full py-12 text-left scroll-mt-24">
      <div className="glass-panel p-8 sm:p-10 rounded-3xl border border-slate-800 space-y-6">
        
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-semibold">
            <LifeBuoy className="w-3.5 h-3.5" />
            <span>Support & Guidance</span>
          </div>
          <h2 className="text-3xl font-extrabold text-white tracking-tight">
            Need Help Navigating OcuSense?
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 max-w-2xl">
            Quick reference guides to help clinicians and evaluators get the most out of the system.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {guides.map((item, idx) => {
            const IconComp = item.icon;
            return (
              <div
                key={idx}
                className="glass-card p-5 rounded-2xl border border-slate-800 space-y-3 glass-card-hover flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-400 w-fit">
                    <IconComp className="w-5 h-5" />
                  </div>
                  <h4 className="text-sm font-bold text-white tracking-tight">
                    {item.title}
                  </h4>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                <button
                  onClick={onStartScreening}
                  className="flex items-center gap-1.5 text-xs font-semibold text-cyan-400 hover:text-cyan-300 transition-colors pt-2 cursor-pointer"
                >
                  <span>{item.action}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
