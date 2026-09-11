import React from 'react';
import { Smartphone, Search, Send, UserCheck, PlaneTakeoff } from 'lucide-react';

export const ProcessSection: React.FC = () => {
  const steps = [
    {
      num: '01',
      icon: Smartphone,
      title: 'Mobile OTP Sign In',
      description: 'Sign in effortlessly using your mobile number and one-time verification code. Quick and passwordless.'
    },
    {
      num: '02',
      icon: Search,
      title: 'Browse Singapore Openings',
      description: 'Explore live Singapore vacancies with clear salary in SGD, Singapore location, and skill requirements.'
    },
    {
      num: '03',
      icon: Send,
      title: 'Show Interest & Enquire',
      description: 'Click "I\'m Interested" to submit your application directly to Arudhra Consultancy\'s recruitment desk.'
    },
    {
      num: '04',
      icon: UserCheck,
      title: 'Consultant Screening',
      description: 'Our recruitment team calls or WhatsApps you to review your certificates, trade experience, and Singapore eligibility.'
    },
    {
      num: '05',
      icon: PlaneTakeoff,
      title: 'Processing & Deployment',
      description: 'Employer interview coordination, MOM Work Permit / S Pass filing guidance, and pre-departure briefing.'
    }
  ];

  return (
    <section className="py-16 sm:py-20 bg-slate-50 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
          <span className="text-red-900 text-xs font-extrabold uppercase tracking-widest bg-red-50 px-3 py-1 rounded-full border border-red-200">
            Simple 5-Step Path
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            How the Recruitment Process Works
          </h2>
          <p className="text-sm text-slate-600">
            A transparent and structured approach designed to make your Singapore overseas application clear and simple.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 relative">
          {steps.map((s, idx) => {
            const Icon = s.icon;
            return (
              <div
                key={idx}
                className="relative bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between space-y-4 hover:shadow-md transition-shadow"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black text-slate-400 font-mono tracking-widest">
                    STEP {s.num}
                  </span>
                  <div className="w-10 h-10 rounded-xl bg-red-50 text-red-900 flex items-center justify-center border border-red-100">
                    <Icon className="w-5 h-5" />
                  </div>
                </div>

                <div>
                  <h3 className="text-base font-bold text-slate-900 leading-snug mb-1.5">
                    {s.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {s.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
