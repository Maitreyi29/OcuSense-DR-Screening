import React from 'react';
import { BookOpen, CheckCircle, AlertTriangle, AlertCircle, Eye, ShieldAlert } from 'lucide-react';

export default function ClassGuide() {
  const stages = [
    {
      stage: 0,
      name: 'No Diabetic Retinopathy',
      severity: 'Normal Retina',
      badgeColor: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
      icon: CheckCircle,
      lesions: 'None',
      description: 'Retinal blood vessels appear healthy without microaneurysms, hemorrhages, or macular edema.',
      pathology: 'Normal basement membrane integrity; clear macula and optic disc boundaries.',
      recommendation: 'Annual routine dilated fundus examination.'
    },
    {
      stage: 1,
      name: 'Mild Diabetic Retinopathy',
      severity: 'Early Non-Proliferative (NPDR)',
      badgeColor: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
      icon: AlertTriangle,
      lesions: 'Microaneurysms only',
      description: 'Small red outpouchings in retinal capillaries caused by pericyte loss.',
      pathology: 'Earliest clinically visible sign of DR. Localized capillary dilation.',
      recommendation: 'Follow-up exam in 6–12 months with tight glycemic control.'
    },
    {
      stage: 2,
      name: 'Moderate Diabetic Retinopathy',
      severity: 'Moderate Non-Proliferative (NPDR)',
      badgeColor: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
      icon: AlertCircle,
      lesions: 'Microaneurysms, blot hemorrhages, cotton-wool spots, hard exudates',
      description: 'More extensive capillary occlusion leading to retinal ischemia and lipid exudate leakage.',
      pathology: 'Capillary dropout, lipid deposits around macula, axonal transport breakdown.',
      recommendation: 'Referral to an ophthalmologist within 2–4 months.'
    },
    {
      stage: 3,
      name: 'Severe Diabetic Retinopathy',
      severity: 'Severe Non-Proliferative (NPDR)',
      badgeColor: 'bg-rose-500/20 text-rose-400 border-rose-500/30',
      icon: ShieldAlert,
      lesions: 'Extensive intraretinal hemorrhages (4 quadrants), venous beading (2+ quadrants), IRMA (1+ quadrant)',
      description: 'Meets the 4-2-1 clinical rule. Widespread retinal ischemia indicating high progression risk.',
      pathology: 'Severe vascular compromise leading to intense VEGF expression signaling neovascular growth.',
      recommendation: 'Urgent ophthalmic evaluation within 2–4 weeks.'
    },
    {
      stage: 4,
      name: 'Proliferative Diabetic Retinopathy',
      severity: 'Advanced PDR Stage',
      badgeColor: 'bg-rose-950 text-rose-300 border-rose-700',
      icon: Eye,
      lesions: 'Neovascularization of the disc (NVD/NVE), vitreous hemorrhage, fibrovascular proliferation',
      description: 'Growth of abnormal fragile new blood vessels that bleed into the vitreous body and cause retinal detachment.',
      pathology: 'Abnormal angiogenesis driven by ischemia; extreme risk of vision loss.',
      recommendation: 'Immediate specialized ophthalmic treatment (panretinal photocoagulation / anti-VEGF injections).'
    }
  ];

  return (
    <div className="w-full space-y-8 text-left animate-fadeIn">
      
      {/* Header */}
      <div className="space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-semibold">
          <BookOpen className="w-3.5 h-3.5" />
          <span>International Clinical Diabetic Retinopathy (ICDR) Scale</span>
        </div>
        <h2 className="text-3xl font-extrabold text-white tracking-tight">
          5-Stage Diabetic Retinopathy Classification
        </h2>
        <p className="text-xs sm:text-sm text-slate-400 max-w-2xl">
          Detailed breakdown of clinical lesions, microvascular pathology, and recommended ophthalmic follow-up schedules.
        </p>
      </div>

      {/* Cards List */}
      <div className="grid gap-4">
        {stages.map((item) => {
          const IconComp = item.icon;
          return (
            <div
              key={item.stage}
              className="glass-panel p-6 rounded-3xl border border-slate-800 glass-card-hover space-y-4"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-center text-white font-bold font-mono">
                    {item.stage}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white tracking-tight">
                      {item.name}
                    </h3>
                    <p className="text-xs text-slate-400 font-medium">
                      {item.severity}
                    </p>
                  </div>
                </div>

                <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${item.badgeColor} w-fit`}>
                  Lesions: {item.lesions}
                </span>
              </div>

              <div className="grid md:grid-cols-2 gap-4 pt-2 border-t border-slate-800/80 text-xs text-slate-300">
                <div>
                  <span className="text-slate-400 font-semibold block mb-1">Clinical Manifestation:</span>
                  <p>{item.description}</p>
                </div>
                <div>
                  <span className="text-cyan-400 font-semibold block mb-1">Ophthalmic Pathway:</span>
                  <p className="text-slate-200">{item.recommendation}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
}
