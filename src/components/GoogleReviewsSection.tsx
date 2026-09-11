import React from 'react';
import { useApp } from '../context/AppContext';
import { Star, ExternalLink, ShieldCheck, CheckCircle2, MessageCircle } from 'lucide-react';

export const GoogleReviewsSection: React.FC = () => {
  const { settings } = useApp();

  return (
    <section className="py-16 bg-slate-50 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl border border-slate-200 shadow-xs p-8 sm:p-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left side: Rating score & Google Badge */}
            <div className="lg:col-span-5 space-y-4 border-b lg:border-b-0 lg:border-r border-slate-200 pb-8 lg:pb-0 lg:pr-8">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-50 text-red-900 text-xs font-bold border border-red-200">
                <span>Google Business Profile</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                Candidate Trust & Feedback
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed">
                Read direct candidate experiences and verified feedback about Arudhra Consultancy's Singapore recruitment facilitation on Google.
              </p>

              {/* Score Display */}
              <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200 flex items-center gap-4">
                <div className="text-4xl font-black text-slate-900 tracking-tight">
                  {settings.googleRating || 4.8}
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>
                  <p className="text-xs text-slate-500 font-medium">
                    Based on <strong>{settings.totalReviewsCount || 140}+ verified candidate ratings</strong>
                  </p>
                </div>
              </div>

              {settings.googleReviewsUrl && (
                <div>
                  <a
                    id="view-all-google-reviews-btn"
                    href={settings.googleReviewsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 w-full py-3 px-5 bg-red-900 hover:bg-red-800 text-white text-xs font-bold rounded-xl shadow-md transition-all cursor-pointer"
                  >
                    <span>View All Reviews on Google</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              )}
            </div>

            {/* Right side: Trust pillars & Google verification rules */}
            <div className="lg:col-span-7 space-y-4 lg:pl-4">
              <h3 className="text-base font-bold text-slate-900">
                Our Commitment to Authentic Overseas Placement
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-1.5">
                  <div className="flex items-center gap-2 text-red-900 font-bold text-xs">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>No Fake Claims</span>
                  </div>
                  <p className="text-xs text-slate-600">
                    We strictly present genuine Singapore employer requirements without exaggerated salary figures or false promises.
                  </p>
                </div>

                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-1.5">
                  <div className="flex items-center gap-2 text-red-900 font-bold text-xs">
                    <ShieldCheck className="w-4 h-4" />
                    <span>Direct Employer Criteria</span>
                  </div>
                  <p className="text-xs text-slate-600">
                    All qualification and trade test requirements are directly set by Singapore hiring managers.
                  </p>
                </div>

                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-1.5">
                  <div className="flex items-center gap-2 text-red-900 font-bold text-xs">
                    <MessageCircle className="w-4 h-4" />
                    <span>Live Lead Tracking</span>
                  </div>
                  <p className="text-xs text-slate-600">
                    Candidates can log in with their mobile OTP anytime to check their enquiry and application stage.
                  </p>
                </div>

                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-1.5">
                  <div className="flex items-center gap-2 text-red-900 font-bold text-xs">
                    <Star className="w-4 h-4" />
                    <span>Real Candidate Support</span>
                  </div>
                  <p className="text-xs text-slate-600">
                    Personal phone & WhatsApp consultations from our Neelambur, Coimbatore office.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
