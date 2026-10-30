import React, { useState } from 'react';
import {
  FileCheck2,
  CheckCircle2,
  Info,
  Layers,
  FileText,
  GraduationCap,
  MessageSquare,
  Lock
} from 'lucide-react';
import { useApp } from '../context/AppContext';

interface CertificateVerificationSectionProps {
  isFullPageView?: boolean;
}

type QualificationType = 'Diploma' | 'UG' | 'PG';
type ServiceOptionType = 'Option A' | 'Option B';
type CertificateSelectionType = 'single' | 'both';

export const CertificateVerificationSection: React.FC<CertificateVerificationSectionProps> = ({
  isFullPageView = false
}) => {
  const { settings } = useApp();

  // Candidate Form State
  const [fullName, setFullName] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [qualification, setQualification] = useState<QualificationType>('UG');
  const [courseName, setCourseName] = useState('');
  const [universityName, setUniversityName] = useState('');
  const [yearOfCompletion, setYearOfCompletion] = useState('');
  const [certSelection, setCertSelection] = useState<CertificateSelectionType>('single');
  const [purpose, setPurpose] = useState('Singapore Employment & Work Pass Background Check');
  const [selectedOption, setSelectedOption] = useState<ServiceOptionType>('Option A');
  const [hasConsented, setHasConsented] = useState(false);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  // Helper title for exact certificate selection labels
  const getCertificateSelectionTitle = (type: CertificateSelectionType) => {
    return type === 'single' ? 'Single Certificate (UG or PG)' : 'Both Certificates (UG + PG)';
  };

  // Dynamic price calculation - Total and final amounts payable
  const getPriceDetails = (option: ServiceOptionType, type: CertificateSelectionType) => {
    if (option === 'Option A') {
      return {
        amount: type === 'single' ? 10000 : 20000,
        amountFormatted: type === 'single' ? '₹10,000' : '₹20,000'
      };
    } else {
      return {
        amount: type === 'single' ? 7500 : 9500,
        amountFormatted: type === 'single' ? '₹7,500' : '₹9,500'
      };
    }
  };

  const currentPriceInfo = getPriceDetails(selectedOption, certSelection);

  // Validate form
  const validateForm = () => {
    const errors: Record<string, string> = {};
    if (!fullName.trim()) errors.fullName = 'Please enter your full name as in your passport';
    if (!contactNumber.trim()) errors.contactNumber = 'Please enter your contact WhatsApp number';
    if (!courseName.trim()) errors.courseName = 'Please enter your course / degree title';
    if (!universityName.trim()) errors.universityName = 'Please enter the awarding university or institution';
    if (!yearOfCompletion.trim()) errors.yearOfCompletion = 'Please enter completion year';
    if (!hasConsented) errors.consent = 'Your consent is required to process and share details with the verification provider';

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Generate WhatsApp message
  const handleProceedWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }

    const rawPhone = settings.whatsappNumber.replace(/\D/g, '') || '7418845083';
    const waNumber = `91${rawPhone.slice(-10)}`;

    const message = [
      `*CERTIFICATE VERIFICATION ASSISTANCE ENQUIRY*`,
      `_Submitted via Arudhra Consultancy Portal_`,
      ``,
      `*1. Candidate Details:*`,
      `• Full Name: ${fullName.trim()}`,
      `• Contact Number: ${contactNumber.trim()}`,
      `• Qualification Level: ${qualification}`,
      `• Course Name: ${courseName.trim()}`,
      `• Awarding University / Institution: ${universityName.trim()}`,
      `• Year of Completion: ${yearOfCompletion.trim()}`,
      ``,
      `*2. Service Option & Selected Certificates:*`,
      `• Service Name: Certificate Verification Assistance`,
      `• Selected Option: ${selectedOption}`,
      `• Certificate Selection: ${getCertificateSelectionTitle(certSelection)}`,
      `• Total Final Amount: ${currentPriceInfo.amountFormatted} (Inclusive of applicable service charges and GST)`,
      `• Purpose of Verification: ${purpose}`,
      ``,
      `*3. Candidate Consent:*`,
      `✓ Candidate has consented to Arudhra Consultancy processing the entered information and sharing documents with the relevant independent verification provider where necessary for credential verification assistance.`,
      ``,
      `*4. Document Checklist Prepared for Manual Attachment:*`,
      `• Passport front and back pages`,
      `• Overall marksheet or transcript (where required)`,
      `• Degree / Provisional certificate (where applicable)`,
      `• Transfer Certificate (where required)`,
      ``,
      `_Note: Candidate will manually review, send this message, and manually attach scanned documents directly in WhatsApp._`
    ].join('\n');

    const encoded = encodeURIComponent(message);
    const waUrl = `https://wa.me/${waNumber}?text=${encoded}`;
    window.open(waUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <section
      id="certificate-verification-section"
      className={`relative w-full ${isFullPageView ? 'py-6' : 'py-16'} bg-slate-50 text-slate-900 border-t border-slate-200`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-red-900/10 border border-red-900/20 text-red-900 text-xs font-bold tracking-wide">
            <FileCheck2 className="w-3.5 h-3.5 text-red-700" />
            <span>Singapore Employment Credential Support</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Certificate Verification Assistance
          </h2>

          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            Arudhra Consultancy provides assistance with the education certificate verification application process
            for eligible candidates applying for Singapore employment-related purposes.
          </p>
        </div>

        {/* Essential Service Scope Notice */}
        <div className="bg-amber-50/90 border border-amber-200/80 rounded-2xl p-4 sm:p-5 text-amber-900 text-xs sm:text-sm leading-relaxed shadow-xs flex items-start gap-3.5">
          <Info className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <p className="font-bold text-amber-950">Notice of Service Scope & Transparency</p>
            <p className="text-amber-900/90">
              Arudhra Consultancy provides guidance and application coordination assistance for candidates seeking
              education certificate verification. Verification is performed by independent, recognized verification
              providers. Arudhra Consultancy does not itself perform the official verification, does not guarantee
              verification results, does not guarantee employment, and does not guarantee Singapore work-pass approval.
              We do not claim official authorisation, partnership, or agency status without confirmed documented permission.
            </p>
          </div>
        </div>

        {/* Service Options & Pricing */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 pb-3">
            <div>
              <h3 className="text-lg font-bold text-slate-900">Certificate Verification Assistance Options</h3>
              <p className="text-xs text-slate-500">
                Both options provide Certificate Verification Assistance, distinguished by Option A and Option B and their respective final prices.
              </p>
            </div>
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-600 bg-white px-3 py-1.5 rounded-xl border border-slate-200 shadow-xs">
              <span>Selected:</span>
              <strong className="text-red-900 font-bold">{selectedOption}</strong>
              <span className="text-slate-400">|</span>
              <span className="text-slate-800 font-bold">{getCertificateSelectionTitle(certSelection)}</span>
              <span className="text-slate-400">|</span>
              <strong className="text-emerald-700 font-extrabold text-sm">
                {currentPriceInfo.amountFormatted}
              </strong>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Option A Card */}
            <div
              onClick={() => setSelectedOption('Option A')}
              className={`relative rounded-3xl p-6 transition-all cursor-pointer border-2 bg-white ${
                selectedOption === 'Option A'
                  ? 'border-red-900 shadow-lg ring-2 ring-red-900/10'
                  : 'border-slate-200 hover:border-slate-300 shadow-xs'
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="space-y-1">
                  <span className="text-xs font-bold text-slate-600 bg-slate-100 px-2.5 py-1 rounded-md border border-slate-200 inline-block">
                    Option A
                  </span>
                  <h4 className="text-xl font-bold text-slate-900">Certificate Verification Assistance</h4>
                  <p className="text-xs text-slate-600">
                    Assistance with the education certificate verification application process for Singapore employment-related purposes.
                  </p>
                </div>
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center border ${
                    selectedOption === 'Option A'
                      ? 'border-red-900 bg-red-900 text-white'
                      : 'border-slate-300 bg-white text-transparent'
                  }`}
                >
                  <CheckCircle2 className="w-4 h-4 fill-current" />
                </div>
              </div>

              {/* Pricing Rows */}
              <div className="mt-5 pt-4 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedOption('Option A');
                    setCertSelection('single');
                  }}
                  className={`p-3.5 rounded-2xl border text-center transition-all ${
                    selectedOption === 'Option A' && certSelection === 'single'
                      ? 'bg-red-50/80 border-red-800/40 text-red-950 font-semibold ring-1 ring-red-800/30'
                      : 'bg-slate-50 border-slate-200/80 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <span className="block text-xs text-slate-600 font-bold">Single Certificate (UG or PG)</span>
                  <strong className="block text-xl font-extrabold text-slate-900 mt-1">₹10,000</strong>
                  <span className="block text-[10px] text-slate-500 mt-0.5">Either UG or PG certificate</span>
                </div>

                <div
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedOption('Option A');
                    setCertSelection('both');
                  }}
                  className={`p-3.5 rounded-2xl border text-center transition-all ${
                    selectedOption === 'Option A' && certSelection === 'both'
                      ? 'bg-red-50/80 border-red-800/40 text-red-950 font-semibold ring-1 ring-red-800/30'
                      : 'bg-slate-50 border-slate-200/80 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <span className="block text-xs text-slate-600 font-bold">Both Certificates (UG + PG)</span>
                  <strong className="block text-xl font-extrabold text-slate-900 mt-1">₹20,000</strong>
                  <span className="block text-[10px] text-slate-500 mt-0.5">UG + PG certificates together</span>
                </div>
              </div>

              <ul className="mt-5 space-y-2 text-xs text-slate-600">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Document checklist review and scan clarity check</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Application coordination with independent verification provider</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Direct updates and status communication via WhatsApp</span>
                </li>
              </ul>
            </div>

            {/* Option B Card */}
            <div
              onClick={() => setSelectedOption('Option B')}
              className={`relative rounded-3xl p-6 transition-all cursor-pointer border-2 bg-white ${
                selectedOption === 'Option B'
                  ? 'border-red-900 shadow-lg ring-2 ring-red-900/10'
                  : 'border-slate-200 hover:border-slate-300 shadow-xs'
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="space-y-1">
                  <span className="text-xs font-bold text-slate-600 bg-slate-100 px-2.5 py-1 rounded-md border border-slate-200 inline-block">
                    Option B
                  </span>
                  <h4 className="text-xl font-bold text-slate-900">Certificate Verification Assistance</h4>
                  <p className="text-xs text-slate-600">
                    Assistance with the education certificate verification application process for Singapore employment-related purposes.
                  </p>
                </div>
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center border ${
                    selectedOption === 'Option B'
                      ? 'border-red-900 bg-red-900 text-white'
                      : 'border-slate-300 bg-white text-transparent'
                  }`}
                >
                  <CheckCircle2 className="w-4 h-4 fill-current" />
                </div>
              </div>

              {/* Pricing Rows */}
              <div className="mt-5 pt-4 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedOption('Option B');
                    setCertSelection('single');
                  }}
                  className={`p-3.5 rounded-2xl border text-center transition-all ${
                    selectedOption === 'Option B' && certSelection === 'single'
                      ? 'bg-red-50/80 border-red-800/40 text-red-950 font-semibold ring-1 ring-red-800/30'
                      : 'bg-slate-50 border-slate-200/80 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <span className="block text-xs text-slate-600 font-bold">Single Certificate (UG or PG)</span>
                  <strong className="block text-xl font-extrabold text-slate-900 mt-1">₹7,500</strong>
                  <span className="block text-[10px] text-slate-500 mt-0.5">Either UG or PG certificate</span>
                </div>

                <div
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedOption('Option B');
                    setCertSelection('both');
                  }}
                  className={`p-3.5 rounded-2xl border text-center transition-all ${
                    selectedOption === 'Option B' && certSelection === 'both'
                      ? 'bg-red-50/80 border-red-800/40 text-red-950 font-semibold ring-1 ring-red-800/30'
                      : 'bg-slate-50 border-slate-200/80 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <span className="block text-xs text-slate-600 font-bold">Both Certificates (UG + PG)</span>
                  <strong className="block text-xl font-extrabold text-slate-900 mt-1">₹9,500</strong>
                  <span className="block text-[10px] text-slate-500 mt-0.5">UG + PG certificates together</span>
                </div>
              </div>

              <ul className="mt-5 space-y-2 text-xs text-slate-600">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Document checklist review and scan clarity check</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Application coordination with independent verification provider</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Direct updates and status communication via WhatsApp</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Certificate Selection Meaning Clarification Box */}
          <div className="bg-slate-100/90 border border-slate-200 rounded-2xl p-4 text-xs text-slate-700 space-y-2.5">
            <h4 className="font-bold text-slate-900 flex items-center gap-1.5 text-xs sm:text-sm">
              <Info className="w-4 h-4 text-red-900 shrink-0" />
              <span>Certificate Selection Details:</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-[11px] sm:text-xs">
              <div className="p-3 bg-white rounded-xl border border-slate-200/80 space-y-1">
                <strong className="text-slate-900 block font-bold text-xs text-red-950">
                  Single Certificate (UG or PG)
                </strong>
                <p className="text-slate-600 leading-relaxed">
                  A single certificate means the candidate selects either their UG (Bachelor) certificate OR their PG (Master) certificate for verification assistance.
                </p>
              </div>

              <div className="p-3 bg-white rounded-xl border border-slate-200/80 space-y-1">
                <strong className="text-slate-900 block font-bold text-xs text-red-950">
                  Both Certificates (UG + PG)
                </strong>
                <p className="text-slate-600 leading-relaxed">
                  Both certificates means the candidate requests verification assistance for both their UG (Bachelor) and PG (Master) educational certificates together.
                </p>
              </div>
            </div>
          </div>

          {/* Important Pricing Clarification Notice */}
          <div className="text-xs text-slate-700 bg-emerald-50/70 p-4 rounded-2xl border border-emerald-200/80 leading-relaxed">
            <strong className="text-emerald-950 font-bold block mb-1">Pricing Clarification:</strong>
            All prices displayed above are the total and final amounts payable by the customer, inclusive of applicable service charges and GST, wherever applicable. For Option B – Both Certificates (UG + PG), ₹9,500 is the complete final amount. No additional charges or extra fees apply on top of the displayed final prices.
          </div>
        </div>

        {/* Two-Column Layout: Form + Document Checklist */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Candidate Application Form */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
            <div className="border-b border-slate-100 pb-4">
              <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                <FileText className="w-5 h-5 text-red-900" />
                <span>Candidate Application Form</span>
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Enter your details to generate your pre-filled WhatsApp application.
              </p>
            </div>

            <form onSubmit={handleProceedWhatsApp} className="space-y-5">
              {/* Full Name & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Full Name <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Full name as in passport"
                    className={`w-full px-3.5 py-2.5 rounded-xl border text-sm font-medium focus:outline-hidden focus:ring-2 focus:ring-red-900 transition-all ${
                      formErrors.fullName ? 'border-red-400 bg-red-50/50' : 'border-slate-300 bg-slate-50/50 focus:bg-white'
                    }`}
                  />
                  {formErrors.fullName && <p className="text-red-600 text-[11px] mt-1">{formErrors.fullName}</p>}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Contact Number <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="tel"
                    value={contactNumber}
                    onChange={(e) => setContactNumber(e.target.value)}
                    placeholder="WhatsApp mobile number"
                    className={`w-full px-3.5 py-2.5 rounded-xl border text-sm font-medium focus:outline-hidden focus:ring-2 focus:ring-red-900 transition-all ${
                      formErrors.contactNumber ? 'border-red-400 bg-red-50/50' : 'border-slate-300 bg-slate-50/50 focus:bg-white'
                    }`}
                  />
                  {formErrors.contactNumber && (
                    <p className="text-red-600 text-[11px] mt-1">{formErrors.contactNumber}</p>
                  )}
                </div>
              </div>

              {/* Qualification Level & Certificate Selection */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Qualification <span className="text-red-600">*</span>
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {(['Diploma', 'UG', 'PG'] as QualificationType[]).map((q) => (
                      <button
                        type="button"
                        key={q}
                        onClick={() => setQualification(q)}
                        className={`py-2 px-3 rounded-xl text-xs font-bold border transition-all text-center cursor-pointer ${
                          qualification === q
                            ? 'bg-red-900 text-white border-red-900 shadow-xs'
                            : 'bg-slate-50 text-slate-700 border-slate-300 hover:bg-slate-100'
                        }`}
                      >
                        {q === 'UG' ? 'UG' : q === 'PG' ? 'PG' : 'Diploma'}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Certificate Selection <span className="text-red-600">*</span>
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <button
                      type="button"
                      key="single"
                      onClick={() => setCertSelection('single')}
                      className={`p-2.5 rounded-xl text-xs font-bold border transition-all text-left cursor-pointer ${
                        certSelection === 'single'
                          ? 'bg-red-900 text-white border-red-900 shadow-xs'
                          : 'bg-slate-50 text-slate-700 border-slate-300 hover:bg-slate-100'
                      }`}
                    >
                      <span className="block leading-tight">Single Certificate (UG or PG)</span>
                      <span className={`block text-[10px] font-normal mt-0.5 ${certSelection === 'single' ? 'text-red-100' : 'text-slate-500'}`}>
                        Either UG or PG
                      </span>
                    </button>

                    <button
                      type="button"
                      key="both"
                      onClick={() => setCertSelection('both')}
                      className={`p-2.5 rounded-xl text-xs font-bold border transition-all text-left cursor-pointer ${
                        certSelection === 'both'
                          ? 'bg-red-900 text-white border-red-900 shadow-xs'
                          : 'bg-slate-50 text-slate-700 border-slate-300 hover:bg-slate-100'
                      }`}
                    >
                      <span className="block leading-tight">Both Certificates (UG + PG)</span>
                      <span className={`block text-[10px] font-normal mt-0.5 ${certSelection === 'both' ? 'text-red-100' : 'text-slate-500'}`}>
                        Both UG and PG
                      </span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Course Name & University */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Course Name <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    value={courseName}
                    onChange={(e) => setCourseName(e.target.value)}
                    placeholder="e.g. B.E Mechanical Engineering"
                    className={`w-full px-3.5 py-2.5 rounded-xl border text-sm font-medium focus:outline-hidden focus:ring-2 focus:ring-red-900 transition-all ${
                      formErrors.courseName ? 'border-red-400 bg-red-50/50' : 'border-slate-300 bg-slate-50/50 focus:bg-white'
                    }`}
                  />
                  {formErrors.courseName && <p className="text-red-600 text-[11px] mt-1">{formErrors.courseName}</p>}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Awarding University / Institution <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    value={universityName}
                    onChange={(e) => setUniversityName(e.target.value)}
                    placeholder="Name of university or institution"
                    className={`w-full px-3.5 py-2.5 rounded-xl border text-sm font-medium focus:outline-hidden focus:ring-2 focus:ring-red-900 transition-all ${
                      formErrors.universityName ? 'border-red-400 bg-red-50/50' : 'border-slate-300 bg-slate-50/50 focus:bg-white'
                    }`}
                  />
                  {formErrors.universityName && (
                    <p className="text-red-600 text-[11px] mt-1">{formErrors.universityName}</p>
                  )}
                </div>
              </div>

              {/* Year of Completion & Purpose */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Year of Completion <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    value={yearOfCompletion}
                    onChange={(e) => setYearOfCompletion(e.target.value)}
                    placeholder="e.g. 2022"
                    maxLength={4}
                    className={`w-full px-3.5 py-2.5 rounded-xl border text-sm font-medium focus:outline-hidden focus:ring-2 focus:ring-red-900 transition-all ${
                      formErrors.yearOfCompletion ? 'border-red-400 bg-red-50/50' : 'border-slate-300 bg-slate-50/50 focus:bg-white'
                    }`}
                  />
                  {formErrors.yearOfCompletion && (
                    <p className="text-red-600 text-[11px] mt-1">{formErrors.yearOfCompletion}</p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Purpose of Verification
                  </label>
                  <select
                    value={purpose}
                    onChange={(e) => setPurpose(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-slate-50/50 focus:bg-white text-sm font-medium focus:outline-hidden focus:ring-2 focus:ring-red-900"
                  >
                    <option value="Singapore Employment & Work Pass Background Check">
                      Singapore Employment & Work Pass Background Check
                    </option>
                    <option value="Singapore Overseas Employment Application">
                      Singapore Overseas Employment Application
                    </option>
                    <option value="Higher Education / Further Studies in Singapore">
                      Higher Education / Further Studies in Singapore
                    </option>
                    <option value="General Professional Credential Documentation">
                      General Professional Credential Documentation
                    </option>
                  </select>
                </div>
              </div>

              {/* Selected Option: A or B */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Selected Option: A or B
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setSelectedOption('Option A')}
                    className={`p-3 rounded-xl border text-left flex items-center justify-between transition-all cursor-pointer ${
                      selectedOption === 'Option A'
                        ? 'border-red-900 bg-red-50/70 text-red-950 font-bold ring-1 ring-red-900/20'
                        : 'border-slate-300 bg-slate-50 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    <div>
                      <span className="block text-xs font-bold">Option A</span>
                      <span className="block text-[11px] text-slate-500 font-normal">
                        {certSelection === 'single'
                          ? 'Single (UG or PG): ₹10,000'
                          : 'Both (UG + PG): ₹20,000'}
                      </span>
                    </div>
                    {selectedOption === 'Option A' && <CheckCircle2 className="w-4 h-4 text-red-900 shrink-0" />}
                  </button>

                  <button
                    type="button"
                    onClick={() => setSelectedOption('Option B')}
                    className={`p-3 rounded-xl border text-left flex items-center justify-between transition-all cursor-pointer ${
                      selectedOption === 'Option B'
                        ? 'border-red-900 bg-red-50/70 text-red-950 font-bold ring-1 ring-red-900/20'
                        : 'border-slate-300 bg-slate-50 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    <div>
                      <span className="block text-xs font-bold">Option B</span>
                      <span className="block text-[11px] text-slate-500 font-normal">
                        {certSelection === 'single'
                          ? 'Single (UG or PG): ₹7,500'
                          : 'Both (UG + PG): ₹9,500'}
                      </span>
                    </div>
                    {selectedOption === 'Option B' && <CheckCircle2 className="w-4 h-4 text-red-900 shrink-0" />}
                  </button>
                </div>
              </div>

              {/* Mandatory Candidate Consent Checkbox */}
              <div className="pt-2">
                <label className="flex items-start gap-3 p-3 rounded-2xl bg-slate-50 border border-slate-200 cursor-pointer hover:bg-slate-100/80 transition-colors">
                  <input
                    type="checkbox"
                    checked={hasConsented}
                    onChange={(e) => setHasConsented(e.target.checked)}
                    className="mt-1 w-4 h-4 text-red-900 border-slate-300 rounded-sm focus:ring-red-900"
                  />
                  <span className="text-xs text-slate-700 leading-relaxed">
                    <strong className="text-slate-900 font-semibold">Consent to Process & Share Information: </strong>
                    I consent to Arudhra Consultancy processing my entered information and sharing documents with the
                    relevant independent verification provider where necessary for credential verification assistance.
                  </span>
                </label>
                {formErrors.consent && <p className="text-red-600 text-[11px] mt-1">{formErrors.consent}</p>}
              </div>

              {/* WhatsApp Launch Button */}
              <div className="space-y-3 pt-2">
                <button
                  type="submit"
                  id="submit-verification-whatsapp-btn"
                  className="w-full flex items-center justify-center gap-2.5 px-6 py-4 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm sm:text-base shadow-lg shadow-emerald-950/20 transition-all hover:scale-[1.01] cursor-pointer"
                >
                  <MessageSquare className="w-5 h-5" />
                  <span>Send Verification Enquiry via WhatsApp ({currentPriceInfo.amountFormatted})</span>
                </button>

                {/* Clear Process Notice */}
                <div className="bg-slate-50 rounded-xl p-3 border border-slate-200 text-slate-600 text-xs space-y-1">
                  <p className="font-semibold text-slate-800 flex items-center gap-1.5">
                    <Info className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                    <span>How WhatsApp Application Works:</span>
                  </p>
                  <p className="text-[11px] leading-relaxed">
                    Clicking the button above generates a pre-filled WhatsApp message containing your entered details.
                    <strong> You must manually send the message in WhatsApp and manually attach your required documents in the chat.</strong>
                    The website does not automatically send messages or attachments.
                  </p>
                </div>
              </div>
            </form>
          </div>

          {/* Right Column: Document Checklist & Privacy */}
          <div className="lg:col-span-5 space-y-6">
            {/* Document Checklist Card */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
              <div className="border-b border-slate-100 pb-3">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-slate-100 text-slate-700 text-[11px] font-bold uppercase tracking-wider mb-1">
                  Document Checklist
                </div>
                <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                  <Layers className="w-4 h-4 text-red-900" />
                  <span>Applicable Document Checklist</span>
                </h3>
                <p className="text-xs text-slate-500">
                  Please prepare the applicable documents to attach manually when your WhatsApp chat opens:
                </p>
              </div>

              <ul className="space-y-2.5 text-xs text-slate-700">
                <li className="flex items-start gap-2.5 p-2 rounded-xl bg-slate-50 border border-slate-100">
                  <CheckCircle2 className="w-4 h-4 text-red-900 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-900">Passport Front Page:</strong>
                    <span className="text-slate-500 block text-[11px]">Clear, readable scan or photo</span>
                  </div>
                </li>

                <li className="flex items-start gap-2.5 p-2 rounded-xl bg-slate-50 border border-slate-100">
                  <CheckCircle2 className="w-4 h-4 text-red-900 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-900">Passport Back Page:</strong>
                    <span className="text-slate-500 block text-[11px]">Clear, readable scan or photo</span>
                  </div>
                </li>

                <li className="flex items-start gap-2.5 p-2 rounded-xl bg-slate-50 border border-slate-100">
                  <CheckCircle2 className="w-4 h-4 text-red-900 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-900">Overall Marksheet or Transcript:</strong>
                    <span className="text-slate-500 block text-[11px]">Where required by the qualification or institution</span>
                  </div>
                </li>

                <li className="flex items-start gap-2.5 p-2 rounded-xl bg-slate-50 border border-slate-100">
                  <CheckCircle2 className="w-4 h-4 text-red-900 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-900">Degree Certificate:</strong>
                    <span className="text-slate-500 block text-[11px]">Where applicable</span>
                  </div>
                </li>

                <li className="flex items-start gap-2.5 p-2 rounded-xl bg-slate-50 border border-slate-100">
                  <CheckCircle2 className="w-4 h-4 text-red-900 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-900">Provisional Certificate:</strong>
                    <span className="text-slate-500 block text-[11px]">Where applicable</span>
                  </div>
                </li>

                <li className="flex items-start gap-2.5 p-2 rounded-xl bg-slate-50 border border-slate-100">
                  <CheckCircle2 className="w-4 h-4 text-red-900 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-900">Transfer Certificate (TC):</strong>
                    <span className="text-slate-500 block text-[11px]">Where required</span>
                  </div>
                </li>

                <li className="flex items-start gap-2.5 p-2 rounded-xl bg-slate-50 border border-slate-100">
                  <CheckCircle2 className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-900">Additional Documents:</strong>
                    <span className="text-slate-500 block text-[11px]">Any additional documents requested by the verification provider</span>
                  </div>
                </li>
              </ul>

              {/* UG and PG Document Guidance */}
              <div className="bg-slate-100 border border-slate-200 rounded-2xl p-3.5 text-xs text-slate-800 space-y-1">
                <span className="font-bold flex items-center gap-1.5 text-slate-900">
                  <GraduationCap className="w-4 h-4 text-red-900" />
                  <span>Document Sets by Qualification:</span>
                </span>
                <p className="text-[11px] leading-relaxed text-slate-600">
                  {certSelection === 'both'
                    ? 'For Both Certificates (UG + PG), please prepare the applicable document sets for both your Bachelor qualification and your Master qualification.'
                    : qualification === 'PG'
                    ? 'For PG verification, please prepare the applicable document set for your Master qualification.'
                    : qualification === 'UG'
                    ? 'For UG verification, please prepare the applicable document set for your Bachelor qualification.'
                    : 'For Diploma verification, please prepare the applicable document set for your Diploma qualification.'}
                </p>
              </div>

              {/* Document Scans & LOA Guidance */}
              <div className="border-t border-slate-100 pt-3 space-y-2 text-[11px] text-slate-600">
                <p>
                  <strong>Document Quality:</strong> Please prepare clear, complete, and readable scans in PDF or image format.
                </p>
                <p className="bg-slate-50 p-2.5 rounded-xl border border-slate-200 text-slate-700">
                  <strong>Letter of Authorisation (LOA):</strong> A Letter of Authorisation is not requested during the initial enquiry.
                  It will only be requested later if required by the relevant provider.
                </p>
              </div>
            </div>

            {/* Privacy and Transparency Notice */}
            <div className="bg-slate-900 text-white rounded-3xl p-6 space-y-3 shadow-md border border-slate-800">
              <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-wider">
                <Lock className="w-4 h-4" />
                <span>Privacy & Transparency</span>
              </div>
              <h4 className="text-base font-bold text-white">Notice on Data Usage</h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Candidate information and documents will be used solely for the requested assistance and shared with the
                relevant independent verification provider where necessary and with appropriate consent.
              </p>
              <ul className="space-y-1.5 text-xs text-slate-400 pt-1">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  <span>No public exposure or insecure storage of sensitive personal documents</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  <span>Enquiries and documents are handled directly via WhatsApp with candidate consent</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  <span>Transparent fee disclosure with final payable amounts confirmed before payment</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
