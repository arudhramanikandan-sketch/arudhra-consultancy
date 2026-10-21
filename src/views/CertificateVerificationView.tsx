import React from 'react';
import { SubpageBackButton } from '../components/SubpageBackButton';
import { CertificateVerificationSection } from '../components/CertificateVerificationSection';
import { ShieldCheck, HelpCircle, FileCheck2, ArrowRight } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const CertificateVerificationView: React.FC = () => {
  const { setCurrentTab } = useApp();

  return (
    <div id="certificate-verification-view-page" className="min-h-screen bg-slate-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        {/* Subpage Back Button */}
        <SubpageBackButton
          label="Back to Home"
          currentPageTitle="Certificate Verification Assistance"
          fallbackTab="home"
        />

        {/* Main Verification Section */}
        <CertificateVerificationSection isFullPageView={true} />

        {/* Frequently Asked Questions Section */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-sm space-y-6 mt-12">
          <div className="border-b border-slate-100 pb-4">
            <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-red-900" />
              <span>Frequently Asked Questions</span>
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Common questions regarding certificate verification assistance for Singapore employment.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2 p-4 rounded-2xl bg-slate-50 border border-slate-100">
              <h4 className="text-sm font-bold text-slate-900">
                Why is educational certificate verification needed for Singapore?
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                For Singapore Ministry of Manpower (MOM) Employment Pass (E Pass) and certain S Pass categories,
                employers and candidates must submit verified educational qualifications from accredited screening
                organizations to prove degree authenticity.
              </p>
            </div>

            <div className="space-y-2 p-4 rounded-2xl bg-slate-50 border border-slate-100">
              <h4 className="text-sm font-bold text-slate-900">
                Does Arudhra Consultancy verify the certificates directly?
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                No. Arudhra Consultancy assists candidates in reviewing documents, organizing submission packages,
                and coordinating the application filing with independent, recognized verification providers. We do
                not perform the verification directly or issue verification seals.
              </p>
            </div>

            <div className="space-y-2 p-4 rounded-2xl bg-slate-50 border border-slate-100">
              <h4 className="text-sm font-bold text-slate-900">
                Does verification guarantee a job or Singapore work pass?
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                No. Verification only verifies the authenticity of the academic credential. Work pass issuance,
                eligibility criteria, and employment decisions remain strictly subject to employer discretion
                and Singapore Ministry of Manpower (MOM) approvals.
              </p>
            </div>

            <div className="space-y-2 p-4 rounded-2xl bg-slate-50 border border-slate-100">
              <h4 className="text-sm font-bold text-slate-900">
                When do I need to submit a Letter of Authorisation (LOA)?
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                You do not need to provide an LOA during your initial enquiry. An LOA will only be requested if
                the specific university or verification provider mandates candidate authorization to release
                transcripts.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
