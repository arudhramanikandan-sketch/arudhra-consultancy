import React from 'react';
import { ShieldCheck, Compass, FileText, Users, Building, PhoneCall } from 'lucide-react';

export const WhyChooseSection: React.FC = () => {
  const points = [
    {
      icon: Compass,
      title: 'Dedicated Singapore Recruitment Focus',
      description: 'We do not dilute our expertise with other countries. Singapore is our sole specialization, ensuring deep familiarity with MOM regulations and employer criteria.'
    },
    {
      icon: Building,
      title: 'Verified Singapore Employers',
      description: 'Vacancies are directly sourced from registered Singapore companies in Jurong, Tuas, Changi, Woodlands, and central commercial districts.'
    },
    {
      icon: FileText,
      title: 'Transparent Salary & Job Terms',
      description: 'Exact basic salary in Singapore Dollars (SGD), overtime multiplier rules, accommodation provisions, and daily shift hours are clearly explained up front.'
    },
    {
      icon: ShieldCheck,
      title: 'End-to-End Candidate Guidance',
      description: 'From resume formatting to trade-specific skill video preparation, educational certificate verification, and MOM biometric briefing.'
    },
    {
      icon: Users,
      title: 'Real Overseas Support',
      description: 'Experienced recruitment coordinators who guide candidates honestly without misleading claims or unverified promises.'
    },
    {
      icon: PhoneCall,
      title: 'Prompt Follow-Up & Enquiry Status',
      description: 'Track your enquiry directly through our mobile OTP portal and receive dedicated phone and WhatsApp updates from our consultancy team.'
    }
  ];

  return (
    <section className="py-16 bg-stone-950 text-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <span className="text-red-400 text-xs font-extrabold uppercase tracking-widest bg-red-950/80 px-3 py-1 rounded-full border border-red-800/60">
            Trust & Transparency
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            Why Choose Arudhra Consultancy
          </h2>
          <p className="text-sm text-stone-300">
            Professional recruitment consulting dedicated strictly to verified Singapore career opportunities.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {points.map((p, idx) => {
            const Icon = p.icon;
            return (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-stone-900/90 border border-stone-800 hover:border-red-700/60 hover:bg-stone-900 transition-all space-y-3"
              >
                <div className="w-12 h-12 rounded-xl bg-red-950/80 border border-red-800/50 flex items-center justify-center text-red-400">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-white tracking-tight">{p.title}</h3>
                <p className="text-xs text-stone-300 leading-relaxed">{p.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
