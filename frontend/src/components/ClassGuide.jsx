import React, { useState } from 'react';
import { BookOpen, CheckCircle, AlertTriangle, AlertCircle, Eye, ShieldAlert, ChevronDown, ChevronUp } from 'lucide-react';

export default function ClassGuide() {
  const [expandedStage, setExpandedStage] = useState(null);

  const stages = [
    {
      stage: 0,
      name: 'No Diabetic Retinopathy',
      severity: 'Stage 0',
      badgeColor: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
      icon: CheckCircle,
      description: 'Normal retina without microaneurysms or lesions.',
      lesions: 'None',
      pathology: 'Normal basement membrane integrity; clear macula and optic disc boundaries.',
      recommendation: 'Annual routine dilated fundus examination.'
    },
    {
      stage: 1,
      name: 'Mild Diabetic Retinopathy',
      severity: 'Stage 1',
      badgeColor: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
      icon: AlertTriangle,
      description: 'Microaneurysms only present in retinal capillaries.',
      lesions: 'Microaneurysms only',
      pathology: 'Earliest visible sign of DR; localized capillary outpouching.',
      recommendation: 'Follow-up exam in 6–12 months.'
    },
    {
      stage: 2,
      name: 'Moderate Diabetic Retinopathy',
      severity: 'Stage 2',
      badgeColor: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
      icon: AlertCircle,
      description: 'Multiple microaneurysms, hemorrhages, or exudates.',
      lesions: 'Hemorrhages, cotton-wool spots, hard exudates',
      pathology: 'Capillary occlusion and localized lipid leakage around macula.',
      recommendation: 'Ophthalmic evaluation within 2–4 months.'
    },
    {
      stage: 3,
      name: 'Severe Diabetic Retinopathy',
      severity: 'Stage 3',
      badgeColor: 'bg-rose-500/20 text-rose-400 border-rose-500/30',
      icon: ShieldAlert,
      description: 'Extensive intraretinal hemorrhages or venous beading.',
      lesions: 'Severe hemorrhages (4 quadrants), venous beading',
      pathology: 'Widespread retinal ischemia signaling high risk of neovascularization.',
      recommendation: 'Urgent evaluation within 2–4 weeks.'
    },
    {
      stage: 4,
      name: 'Proliferative Diabetic Retinopathy',
      severity: 'Stage 4',
      badgeColor: 'bg-rose-950 text-rose-300 border-rose-700',
      icon: Eye,
      description: 'Growth of fragile abnormal new blood vessels.',
      lesions: 'Neovascularization, vitreous hemorrhage risk',
      pathology: 'Severe ischemia driving abnormal angiogenesis and vision loss risk.',
      recommendation: 'Immediate specialized ophthalmic treatment.'
    }
  ];

  return (
    <div className="w-full space-y-6 text-left animate-fadeIn my-10">
      
      {/* Header */}
      <div className="space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-semibold">
          <BookOpen className="w-3.5 h-3.5" />
          <span>ICDR Severity Scale</span>
        </div>
        <h2 className="text-3xl font-extrabold text-white tracking-tight">
          5-Stage Diabetic Retinopathy Classification
        </h2>
      </div>

      {/* Cards List */}
      <div className="grid gap-3">
        {stages.map((item) => {
          const isExpanded = expandedStage === item.stage;
          return (
            <div
              key={item.stage}
              className="glass-panel p-5 rounded-2xl border border-slate-800 space-y-3"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-center text-cyan-400 font-bold font-mono text-sm">
                    {item.stage}
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white tracking-tight">
                      {item.name}
                    </h3>
                    <p className="text-xs text-slate-400 font-medium">
                      {item.description}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 self-end sm:self-auto">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${item.badgeColor}`}>
                    {item.severity}
                  </span>
                  
                  <button
                    onClick={() => setExpandedStage(isExpanded ? null : item.stage)}
                    className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white transition-all cursor-pointer flex items-center gap-1 text-xs"
                  >
                    <span>{isExpanded ? 'Less' : 'Learn More'}</span>
                    {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>

              {/* Expandable Details */}
              {isExpanded && (
                <div className="grid sm:grid-cols-2 gap-3 pt-3 border-t border-slate-800/80 text-xs text-slate-300 animate-fadeIn">
                  <div>
                    <span className="text-slate-400 font-semibold block mb-0.5">Primary Lesions:</span>
                    <p>{item.lesions}</p>
                  </div>
                  <div>
                    <span className="text-cyan-400 font-semibold block mb-0.5">Recommendation:</span>
                    <p className="text-slate-200">{item.recommendation}</p>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

    </div>
  );
}
