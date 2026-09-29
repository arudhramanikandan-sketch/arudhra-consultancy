import React, { useState } from 'react';
import {
  CVEmploymentRecord,
  CVFresherDetails,
  CVExperienceLevel,
  CVPersonalDetails,
  CVEducationRecord,
  CVSkillsData,
  CVProjectRecord,
  CVInternshipRecord,
  CVCertificationRecord,
  CVSeminarRecord,
  CVActivityRecord,
  CVAchievementRecord,
  CVOverseasInfo,
  CVSupportingDocument,
  CVLanguageItem
} from '../types';
import {
  Briefcase,
  GraduationCap,
  Plus,
  Trash2,
  Calendar,
  MapPin,
  Building2,
  CheckCircle2,
  AlertCircle,
  Award,
  Wrench,
  BookOpen,
  FileCheck,
  User,
  Globe,
  Languages,
  FolderGit2,
  Paperclip,
  Check,
  ChevronDown,
  ChevronUp,
  FileText,
  BadgeCheck,
  Clock,
  Sparkles,
  Upload
} from 'lucide-react';

interface CVProfileDetailsFormProps {
  experienceLevel: CVExperienceLevel;
  // Personal Details
  personalDetails: CVPersonalDetails;
  onUpdatePersonalDetails: (field: keyof CVPersonalDetails, value: string) => void;

  // Career Objective
  careerObjective: string;
  onChangeCareerObjective: (value: string) => void;

  // Education
  educationList: CVEducationRecord[];
  onAddEducation: () => void;
  onRemoveEducation: (index: number) => void;
  onUpdateEducation: (index: number, field: keyof CVEducationRecord, value: string) => void;

  // Work Experience
  employmentRecords: CVEmploymentRecord[];
  onAddEmploymentRecord: () => void;
  onRemoveEmploymentRecord: (index: number) => void;
  onUpdateEmploymentRecord: (index: number, field: keyof CVEmploymentRecord, value: any) => void;

  // Skills & Languages
  skillsData: CVSkillsData;
  onUpdateSkillsData: (updater: (prev: CVSkillsData) => CVSkillsData) => void;

  // Projects
  projects: CVProjectRecord[];
  onAddProject: () => void;
  onRemoveProject: (index: number) => void;
  onUpdateProject: (index: number, field: keyof CVProjectRecord, value: string) => void;

  // Internships
  internships: CVInternshipRecord[];
  onAddInternship: () => void;
  onRemoveInternship: (index: number) => void;
  onUpdateInternship: (index: number, field: keyof CVInternshipRecord, value: string) => void;

  // Certifications
  certifications: CVCertificationRecord[];
  onAddCertification: () => void;
  onRemoveCertification: (index: number) => void;
  onUpdateCertification: (index: number, field: keyof CVCertificationRecord, value: string) => void;

  // Seminars
  seminars: CVSeminarRecord[];
  onAddSeminar: () => void;
  onRemoveSeminar: (index: number) => void;
  onUpdateSeminar: (index: number, field: keyof CVSeminarRecord, value: string) => void;

  // Activities & Achievements
  activities: CVActivityRecord[];
  onAddActivity: () => void;
  onRemoveActivity: (index: number) => void;
  onUpdateActivity: (index: number, field: keyof CVActivityRecord, value: any) => void;

  achievements: CVAchievementRecord[];
  onAddAchievement: () => void;
  onRemoveAchievement: (index: number) => void;
  onUpdateAchievement: (index: number, field: keyof CVAchievementRecord, value: string) => void;

  // Overseas Preferences
  overseasInfo: CVOverseasInfo;
  onUpdateOverseasInfo: (field: keyof CVOverseasInfo, value: string) => void;

  // Documents
  sendDocsViaWhatsApp: boolean;
  onToggleSendDocsViaWhatsApp: (val: boolean) => void;
  uploadedDocuments: CVSupportingDocument[];
  onAddDocument: (doc: CVSupportingDocument) => void;
  onRemoveDocument: (id: string) => void;

  // Legacy Fresher fallback support
  fresherDetails: CVFresherDetails;
  onUpdateFresherDetails: (field: keyof CVFresherDetails, value: string) => void;
}

export const CVProfileDetailsForm: React.FC<CVProfileDetailsFormProps> = ({
  experienceLevel,
  personalDetails,
  onUpdatePersonalDetails,
  careerObjective,
  onChangeCareerObjective,
  educationList,
  onAddEducation,
  onRemoveEducation,
  onUpdateEducation,
  employmentRecords,
  onAddEmploymentRecord,
  onRemoveEmploymentRecord,
  onUpdateEmploymentRecord,
  skillsData,
  onUpdateSkillsData,
  projects,
  onAddProject,
  onRemoveProject,
  onUpdateProject,
  internships,
  onAddInternship,
  onRemoveInternship,
  onUpdateInternship,
  certifications,
  onAddCertification,
  onRemoveCertification,
  onUpdateCertification,
  seminars,
  onAddSeminar,
  onRemoveSeminar,
  onUpdateSeminar,
  activities,
  onAddActivity,
  onRemoveActivity,
  onUpdateActivity,
  achievements,
  onAddAchievement,
  onRemoveAchievement,
  onUpdateAchievement,
  overseasInfo,
  onUpdateOverseasInfo,
  sendDocsViaWhatsApp,
  onToggleSendDocsViaWhatsApp,
  uploadedDocuments,
  onAddDocument,
  onRemoveDocument,
  fresherDetails,
  onUpdateFresherDetails
}) => {
  const isFresher = experienceLevel === 'Fresher / No Experience';

  // Active section accordions
  const [openSections, setOpenSections] = useState<{ [key: string]: boolean }>({
    personal: true,
    objective: false,
    education: true,
    employment: !isFresher,
    skills: true,
    projects: false,
    internships: false,
    certifications: false,
    activities: false,
    overseas: true,
    documents: true
  });

  const toggleSection = (sec: string) => {
    setOpenSections(prev => ({ ...prev, [sec]: !prev[sec] }));
  };

  // Helper for adding language
  const handleAddLanguage = () => {
    onUpdateSkillsData(prev => ({
      ...prev,
      languagesKnown: [...prev.languagesKnown, { name: '', proficiency: 'Fluent' }]
    }));
  };

  const handleUpdateLanguage = (index: number, field: keyof CVLanguageItem, value: any) => {
    onUpdateSkillsData(prev => ({
      ...prev,
      languagesKnown: prev.languagesKnown.map((lang, idx) =>
        idx === index ? { ...lang, [field]: value } : lang
      )
    }));
  };

  const handleRemoveLanguage = (index: number) => {
    onUpdateSkillsData(prev => ({
      ...prev,
      languagesKnown: prev.languagesKnown.filter((_, idx) => idx !== index)
    }));
  };

  // File upload simulation (small base64 / record)
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    for (let i = 0; i < files.length; i++) {
      const f = files[i];
      const newDoc: CVSupportingDocument = {
        id: `doc-${Date.now()}-${i}`,
        name: f.name,
        type: f.type || 'application/octet-stream',
        fileSize: `${(f.size / 1024).toFixed(1)} KB`,
        uploadedAt: new Date().toISOString()
      };
      onAddDocument(newDoc);
    }
  };

  return (
    <div className="space-y-6 pt-4 border-t border-stone-200">
      {/* Intro Banner */}
      <div className="bg-stone-50 border border-stone-200 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-base font-extrabold text-stone-900">
              Detailed Candidate Information Form
            </h3>
            <span className="px-2.5 py-0.5 rounded-full bg-red-100 text-red-950 font-bold text-[11px]">
              {isFresher ? 'Fresher Profile' : 'Experienced Profile'}
            </span>
          </div>
          <p className="text-xs text-stone-600 mt-1 leading-relaxed">
            Please fill in your background. Our resume specialists will manually prepare, polish, and structure your final CV. Only marked <span className="text-red-600 font-bold">*</span> fields are mandatory.
          </p>
        </div>

        <div className="text-xs text-stone-500 bg-white border border-stone-200 px-3 py-2 rounded-xl shrink-0">
          <span className="font-bold text-stone-800 block text-[11px]">Preparation Guarantee:</span>
          <span>No automated generation. 100% human reviewed.</span>
        </div>
      </div>

      {/* SECTION 1: PERSONAL DETAILS */}
      <div className="bg-white rounded-2xl border border-stone-200 shadow-2xs overflow-hidden transition-all">
        <button
          type="button"
          onClick={() => toggleSection('personal')}
          className="w-full px-5 py-4 flex items-center justify-between bg-stone-50/60 hover:bg-stone-100/70 border-b border-stone-100 text-left cursor-pointer transition-colors"
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-red-900 text-white flex items-center justify-center">
              <User className="w-4 h-4" />
            </div>
            <div>
              <h4 className="font-extrabold text-stone-900 text-sm flex items-center gap-2">
                <span>1. Personal & Contact Details</span>
                <span className="text-red-600 text-xs font-bold">* Required</span>
              </h4>
              <p className="text-[11px] text-stone-500">Name, mobile, email, and optional demographic info</p>
            </div>
          </div>
          {openSections.personal ? <ChevronUp className="w-5 h-5 text-stone-400" /> : <ChevronDown className="w-5 h-5 text-stone-400" />}
        </button>

        {openSections.personal && (
          <div className="p-5 sm:p-6 space-y-4 animate-in fade-in">
            {/* Required Primary Contacts */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="text-xs font-bold text-stone-800 block mb-1">
                  Full Name <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={personalDetails.fullName || ''}
                  onChange={e => onUpdatePersonalDetails('fullName', e.target.value)}
                  placeholder="e.g. S. Murugan / John Doe"
                  className="w-full px-3.5 py-2.5 bg-white border border-stone-300 rounded-xl text-xs text-stone-900 focus:outline-hidden focus:ring-2 focus:ring-red-900"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-stone-800 block mb-1">
                  Mobile Number (WhatsApp) <span className="text-red-600">*</span>
                </label>
                <input
                  type="tel"
                  required
                  value={personalDetails.mobile || ''}
                  onChange={e => onUpdatePersonalDetails('mobile', e.target.value)}
                  placeholder="e.g. 9840123456"
                  className="w-full px-3.5 py-2.5 bg-white border border-stone-300 rounded-xl text-xs text-stone-900 focus:outline-hidden focus:ring-2 focus:ring-red-900"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-stone-800 block mb-1">
                  Email Address <span className="text-red-600">*</span>
                </label>
                <input
                  type="email"
                  required
                  value={personalDetails.email || ''}
                  onChange={e => onUpdatePersonalDetails('email', e.target.value)}
                  placeholder="e.g. candidate@email.com"
                  className="w-full px-3.5 py-2.5 bg-white border border-stone-300 rounded-xl text-xs text-stone-900 focus:outline-hidden focus:ring-2 focus:ring-red-900"
                />
              </div>
            </div>

            {/* Optional Personal Demographics */}
            <div className="pt-2 border-t border-stone-100">
              <span className="text-[11px] font-bold text-stone-400 uppercase tracking-wider block mb-3">
                Optional Personal Demographics (For CV Biodata Section)
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-4 gap-3.5">
                <div>
                  <label className="text-xs font-semibold text-stone-700 block mb-1">
                    Father's / Parent Name
                  </label>
                  <input
                    type="text"
                    value={personalDetails.fatherName || ''}
                    onChange={e => onUpdatePersonalDetails('fatherName', e.target.value)}
                    placeholder="e.g. K. Subramanian"
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-xl text-xs text-stone-900 focus:outline-hidden focus:ring-2 focus:ring-red-900"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-stone-700 block mb-1">
                    Date of Birth
                  </label>
                  <input
                    type="date"
                    value={personalDetails.dob || ''}
                    onChange={e => onUpdatePersonalDetails('dob', e.target.value)}
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-xl text-xs text-stone-900 focus:outline-hidden focus:ring-2 focus:ring-red-900"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-stone-700 block mb-1">
                    Gender
                  </label>
                  <select
                    value={personalDetails.gender || ''}
                    onChange={e => onUpdatePersonalDetails('gender', e.target.value)}
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-xl text-xs text-stone-900 focus:outline-hidden focus:ring-2 focus:ring-red-900"
                  >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-semibold text-stone-700 block mb-1">
                    Marital Status
                  </label>
                  <select
                    value={personalDetails.maritalStatus || ''}
                    onChange={e => onUpdatePersonalDetails('maritalStatus', e.target.value)}
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-xl text-xs text-stone-900 focus:outline-hidden focus:ring-2 focus:ring-red-900"
                  >
                    <option value="">Select Status</option>
                    <option value="Single">Single / Unmarried</option>
                    <option value="Married">Married</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 mt-3">
                <div>
                  <label className="text-xs font-semibold text-stone-700 block mb-1">
                    Nationality
                  </label>
                  <input
                    type="text"
                    value={personalDetails.nationality || 'Indian'}
                    onChange={e => onUpdatePersonalDetails('nationality', e.target.value)}
                    placeholder="e.g. Indian"
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-xl text-xs text-stone-900 focus:outline-hidden focus:ring-2 focus:ring-red-900"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-stone-700 block mb-1">
                    Current City & State
                  </label>
                  <input
                    type="text"
                    value={personalDetails.currentCity || ''}
                    onChange={e => onUpdatePersonalDetails('currentCity', e.target.value)}
                    placeholder="e.g. Trichy, Tamil Nadu"
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-xl text-xs text-stone-900 focus:outline-hidden focus:ring-2 focus:ring-red-900"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-stone-700 block mb-1">
                    Country
                  </label>
                  <input
                    type="text"
                    value={personalDetails.country || 'India'}
                    onChange={e => onUpdatePersonalDetails('country', e.target.value)}
                    placeholder="e.g. India"
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-xl text-xs text-stone-900 focus:outline-hidden focus:ring-2 focus:ring-red-900"
                  />
                </div>
              </div>

              <div className="mt-3">
                <label className="text-xs font-semibold text-stone-700 block mb-1">
                  Permanent / Communication Address (Optional)
                </label>
                <textarea
                  rows={2}
                  value={personalDetails.communicationAddress || ''}
                  onChange={e => onUpdatePersonalDetails('communicationAddress', e.target.value)}
                  placeholder="e.g. No. 14, Main Road, Thillai Nagar, Tiruchirappalli, Tamil Nadu - 620018"
                  className="w-full px-3.5 py-2 bg-stone-50 border border-stone-300 rounded-xl text-xs text-stone-900 focus:outline-hidden focus:ring-2 focus:ring-red-900"
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* SECTION 2: CAREER OBJECTIVE / PROFESSIONAL SUMMARY */}
      <div className="bg-white rounded-2xl border border-stone-200 shadow-2xs overflow-hidden transition-all">
        <button
          type="button"
          onClick={() => toggleSection('objective')}
          className="w-full px-5 py-4 flex items-center justify-between bg-stone-50/60 hover:bg-stone-100/70 border-b border-stone-100 text-left cursor-pointer transition-colors"
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-stone-800 text-white flex items-center justify-center">
              <FileText className="w-4 h-4" />
            </div>
            <div>
              <h4 className="font-extrabold text-stone-900 text-sm flex items-center gap-2">
                <span>2. Career Objective / Professional Summary</span>
                <span className="text-stone-400 text-xs font-normal">(Optional)</span>
              </h4>
              <p className="text-[11px] text-stone-500">Provide rough points or your existing statement; our team will rewrite it professionally.</p>
            </div>
          </div>
          {openSections.objective ? <ChevronUp className="w-5 h-5 text-stone-400" /> : <ChevronDown className="w-5 h-5 text-stone-400" />}
        </button>

        {openSections.objective && (
          <div className="p-5 sm:p-6 space-y-3 animate-in fade-in">
            <textarea
              rows={3}
              value={careerObjective}
              onChange={e => onChangeCareerObjective(e.target.value)}
              placeholder="e.g. Dedicated Welder with 4 years experience in structural fabrication and pipe joints seeking an overseas role in Singapore shipyards..."
              className="w-full px-3.5 py-2.5 bg-white border border-stone-300 rounded-xl text-xs text-stone-900 focus:outline-hidden focus:ring-2 focus:ring-red-900"
            />
            <p className="text-[11px] text-stone-500 italic">
              Note: The Arudhra Consultancy team will professionally polish and rewrite this summary during manual CV drafting according to Singapore recruiter ATS standards.
            </p>
          </div>
        )}
      </div>

      {/* SECTION 3: EDUCATION & QUALIFICATIONS (DYNAMIC + ADD QUALIFICATION) */}
      <div className="bg-white rounded-2xl border border-stone-200 shadow-2xs overflow-hidden transition-all">
        <button
          type="button"
          onClick={() => toggleSection('education')}
          className="w-full px-5 py-4 flex items-center justify-between bg-stone-50/60 hover:bg-stone-100/70 border-b border-stone-100 text-left cursor-pointer transition-colors"
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-red-900 text-white flex items-center justify-center">
              <GraduationCap className="w-4 h-4" />
            </div>
            <div>
              <h4 className="font-extrabold text-stone-900 text-sm flex items-center gap-2">
                <span>3. Education & Qualifications</span>
                <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                  {educationList.length} {educationList.length === 1 ? 'Record' : 'Records'}
                </span>
              </h4>
              <p className="text-[11px] text-stone-500">Add 10th, 12th, ITI, Diploma, UG, PG, or Professional Degrees</p>
            </div>
          </div>
          {openSections.education ? <ChevronUp className="w-5 h-5 text-stone-400" /> : <ChevronDown className="w-5 h-5 text-stone-400" />}
        </button>

        {openSections.education && (
          <div className="p-5 sm:p-6 space-y-5 animate-in fade-in">
            <div className="flex items-center justify-between">
              <span className="text-xs text-stone-500">
                List your academic qualifications. You can add multiple degrees/diplomas using <strong>“+ Add Qualification”</strong>.
              </span>
              <button
                type="button"
                onClick={onAddEducation}
                className="px-3.5 py-1.5 bg-red-900 hover:bg-red-800 text-white text-xs font-bold rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer shrink-0"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>+ Add Qualification</span>
              </button>
            </div>

            {educationList.map((edu, idx) => (
              <div
                key={edu.id || idx}
                className="bg-stone-50 border border-stone-200 rounded-xl p-4 sm:p-5 space-y-3 relative"
              >
                <div className="flex items-center justify-between border-b border-stone-200 pb-2.5">
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-stone-900 text-white text-[10px] font-bold flex items-center justify-center">
                      {idx + 1}
                    </span>
                    <span className="font-bold text-xs text-stone-900">
                      {edu.qualificationLevel || 'Education Record'} {edu.courseDegree ? `– ${edu.courseDegree}` : ''}
                    </span>
                  </div>
                  {educationList.length > 1 && (
                    <button
                      type="button"
                      onClick={() => onRemoveEducation(idx)}
                      className="text-stone-400 hover:text-red-700 text-xs font-semibold flex items-center gap-1 cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Remove</span>
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="text-[11px] font-bold text-stone-700 block mb-1">
                      Qualification Level <span className="text-red-600">*</span>
                    </label>
                    <select
                      value={edu.qualificationLevel}
                      onChange={e => onUpdateEducation(idx, 'qualificationLevel', e.target.value)}
                      className="w-full px-3 py-2 bg-white border border-stone-300 rounded-xl text-xs text-stone-900 focus:outline-hidden focus:ring-2 focus:ring-red-900"
                    >
                      <option value="10th / Secondary">10th / Secondary / SSLC</option>
                      <option value="12th / Higher Secondary">12th / Higher Secondary / HSC</option>
                      <option value="ITI">ITI / Vocational Trade</option>
                      <option value="Diploma">Diploma / Polytechnic</option>
                      <option value="UG">UG (Undergraduate / Bachelor Degree)</option>
                      <option value="PG">PG (Postgraduate / Master Degree)</option>
                      <option value="PhD / Doctorate">PhD / Doctorate</option>
                      <option value="Professional Certification">Professional Certification</option>
                      <option value="Other">Other Qualification</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-[11px] font-bold text-stone-700 block mb-1">
                      Course / Degree / Branch <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={edu.courseDegree}
                      onChange={e => onUpdateEducation(idx, 'courseDegree', e.target.value)}
                      placeholder="e.g. DME / B.E. Mechanical / ITI Fitter / SSLC"
                      className="w-full px-3 py-2 bg-white border border-stone-300 rounded-xl text-xs text-stone-900 focus:outline-hidden focus:ring-2 focus:ring-red-900"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-semibold text-stone-700 block mb-1">
                      Specialization / Major
                    </label>
                    <input
                      type="text"
                      value={edu.specialization || ''}
                      onChange={e => onUpdateEducation(idx, 'specialization', e.target.value)}
                      placeholder="e.g. Thermal / Piping / General"
                      className="w-full px-3 py-2 bg-white border border-stone-300 rounded-xl text-xs text-stone-900 focus:outline-hidden focus:ring-2 focus:ring-red-900"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="text-[11px] font-bold text-stone-700 block mb-1">
                      School / College / Institution <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={edu.schoolCollege}
                      onChange={e => onUpdateEducation(idx, 'schoolCollege', e.target.value)}
                      placeholder="e.g. Government Polytechnic College"
                      className="w-full px-3 py-2 bg-white border border-stone-300 rounded-xl text-xs text-stone-900 focus:outline-hidden focus:ring-2 focus:ring-red-900"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-semibold text-stone-700 block mb-1">
                      Board / University
                    </label>
                    <input
                      type="text"
                      value={edu.boardUniversity || ''}
                      onChange={e => onUpdateEducation(idx, 'boardUniversity', e.target.value)}
                      placeholder="e.g. DOTE Tamil Nadu / Anna University"
                      className="w-full px-3 py-2 bg-white border border-stone-300 rounded-xl text-xs text-stone-900 focus:outline-hidden focus:ring-2 focus:ring-red-900"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-semibold text-stone-700 block mb-1">
                      Institution Location
                    </label>
                    <input
                      type="text"
                      value={edu.location || ''}
                      onChange={e => onUpdateEducation(idx, 'location', e.target.value)}
                      placeholder="e.g. Trichy, Tamil Nadu"
                      className="w-full px-3 py-2 bg-white border border-stone-300 rounded-xl text-xs text-stone-900 focus:outline-hidden focus:ring-2 focus:ring-red-900"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="text-[11px] font-semibold text-stone-700 block mb-1">
                      Year of Joining (Optional)
                    </label>
                    <input
                      type="text"
                      value={edu.yearJoining || ''}
                      onChange={e => onUpdateEducation(idx, 'yearJoining', e.target.value)}
                      placeholder="e.g. 2019"
                      className="w-full px-3 py-2 bg-white border border-stone-300 rounded-xl text-xs text-stone-900 focus:outline-hidden focus:ring-2 focus:ring-red-900"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-bold text-stone-700 block mb-1">
                      Year of Passing <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={edu.yearPassing}
                      onChange={e => onUpdateEducation(idx, 'yearPassing', e.target.value)}
                      placeholder="e.g. 2022"
                      className="w-full px-3 py-2 bg-white border border-stone-300 rounded-xl text-xs text-stone-900 focus:outline-hidden focus:ring-2 focus:ring-red-900"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-semibold text-stone-700 block mb-1">
                      Percentage / CGPA / Grade
                    </label>
                    <input
                      type="text"
                      value={edu.percentageCgpa || ''}
                      onChange={e => onUpdateEducation(idx, 'percentageCgpa', e.target.value)}
                      placeholder="e.g. 78% or 8.2 CGPA / First Class"
                      className="w-full px-3 py-2 bg-white border border-stone-300 rounded-xl text-xs text-stone-900 focus:outline-hidden focus:ring-2 focus:ring-red-900"
                    />
                  </div>
                </div>
              </div>
            ))}

            <button
              type="button"
              onClick={onAddEducation}
              className="w-full py-2.5 bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-bold rounded-xl transition-colors flex items-center justify-center gap-1.5 cursor-pointer border border-stone-200"
            >
              <Plus className="w-3.5 h-3.5 text-red-900" />
              <span>+ Add Another Qualification</span>
            </button>
          </div>
        )}
      </div>

      {/* SECTION 4: WORK EXPERIENCE (FOR EXPERIENCED CANDIDATES ONLY) */}
      {!isFresher ? (
        <div className="bg-white rounded-2xl border border-stone-200 shadow-2xs overflow-hidden transition-all">
          <button
            type="button"
            onClick={() => toggleSection('employment')}
            className="w-full px-5 py-4 flex items-center justify-between bg-stone-50/60 hover:bg-stone-100/70 border-b border-stone-100 text-left cursor-pointer transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-red-900 text-white flex items-center justify-center">
                <Briefcase className="w-4 h-4" />
              </div>
              <div>
                <h4 className="font-extrabold text-stone-900 text-sm flex items-center gap-2">
                  <span>4. Work Experience & Employment History</span>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                    {employmentRecords.length} {employmentRecords.length === 1 ? 'Company' : 'Companies'}
                  </span>
                </h4>
                <p className="text-[11px] text-stone-500">Current and previous employers, job responsibilities, skills, and tools used</p>
              </div>
            </div>
            {openSections.employment ? <ChevronUp className="w-5 h-5 text-stone-400" /> : <ChevronDown className="w-5 h-5 text-stone-400" />}
          </button>

          {openSections.employment && (
            <div className="p-5 sm:p-6 space-y-5 animate-in fade-in">
              <div className="flex items-center justify-between">
                <span className="text-xs text-stone-500">
                  Add all your employment records. You can add multiple companies using <strong>“+ Add Another Employment”</strong>.
                </span>
                <button
                  type="button"
                  onClick={onAddEmploymentRecord}
                  className="px-3.5 py-1.5 bg-red-900 hover:bg-red-800 text-white text-xs font-bold rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer shrink-0"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>+ Add Another Employment</span>
                </button>
              </div>

              {employmentRecords.map((record, index) => {
                const isOnlyRecord = employmentRecords.length === 1;

                return (
                  <div
                    key={record.id || index}
                    className="bg-stone-50 border-2 border-stone-200 rounded-2xl p-4 sm:p-5 shadow-2xs space-y-3.5"
                  >
                    <div className="flex items-center justify-between border-b border-stone-200 pb-2.5">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="w-6 h-6 rounded-full bg-stone-900 text-white text-xs font-bold flex items-center justify-center">
                          {index + 1}
                        </span>
                        <span className="font-extrabold text-stone-900 text-xs sm:text-sm">
                          {record.jobTitle ? record.jobTitle : `Employment Record #${index + 1}`}
                        </span>
                        {record.companyName && (
                          <span className="text-xs text-stone-500 font-medium">
                            at <strong className="text-stone-700">{record.companyName}</strong>
                          </span>
                        )}
                        {record.isCurrentlyWorking && (
                          <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                            Current Job
                          </span>
                        )}
                      </div>

                      {!isOnlyRecord && (
                        <button
                          type="button"
                          onClick={() => onRemoveEmploymentRecord(index)}
                          className="text-stone-400 hover:text-red-700 text-xs font-semibold flex items-center gap-1 cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span>Remove</span>
                        </button>
                      )}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                      <div>
                        <label className="text-xs font-bold text-stone-800 block mb-1">
                          Company Name <span className="text-red-600">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          value={record.companyName}
                          onChange={e => onUpdateEmploymentRecord(index, 'companyName', e.target.value)}
                          placeholder="e.g. Jurong Engineering / Tata Steel"
                          className="w-full px-3 py-2 bg-white border border-stone-300 rounded-xl text-xs text-stone-900 focus:outline-hidden focus:ring-2 focus:ring-red-900"
                        />
                      </div>

                      <div>
                        <label className="text-xs font-bold text-stone-800 block mb-1">
                          Job Title / Designation <span className="text-red-600">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          value={record.jobTitle}
                          onChange={e => onUpdateEmploymentRecord(index, 'jobTitle', e.target.value)}
                          placeholder="e.g. Senior Welder / Site Supervisor"
                          className="w-full px-3 py-2 bg-white border border-stone-300 rounded-xl text-xs text-stone-900 focus:outline-hidden focus:ring-2 focus:ring-red-900"
                        />
                      </div>

                      <div>
                        <label className="text-xs font-bold text-stone-800 block mb-1">
                          Company Location <span className="text-red-600">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          value={record.location}
                          onChange={e => onUpdateEmploymentRecord(index, 'location', e.target.value)}
                          placeholder="e.g. Singapore / Chennai / Dubai"
                          className="w-full px-3 py-2 bg-white border border-stone-300 rounded-xl text-xs text-stone-900 focus:outline-hidden focus:ring-2 focus:ring-red-900"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 items-end">
                      <div>
                        <label className="text-xs font-bold text-stone-800 block mb-1">
                          Employment Start Date <span className="text-red-600">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          value={record.startDate}
                          onChange={e => onUpdateEmploymentRecord(index, 'startDate', e.target.value)}
                          placeholder="e.g. Jun 2021 or 2021-06"
                          className="w-full px-3 py-2 bg-white border border-stone-300 rounded-xl text-xs text-stone-900 focus:outline-hidden focus:ring-2 focus:ring-red-900"
                        />
                      </div>

                      <div>
                        <label className="text-xs font-bold text-stone-800 block mb-1">
                          Employment End Date {!record.isCurrentlyWorking && <span className="text-red-600">*</span>}
                        </label>
                        <input
                          type="text"
                          disabled={record.isCurrentlyWorking}
                          required={!record.isCurrentlyWorking}
                          value={record.isCurrentlyWorking ? 'Present / Currently Working' : (record.endDate || '')}
                          onChange={e => onUpdateEmploymentRecord(index, 'endDate', e.target.value)}
                          placeholder={record.isCurrentlyWorking ? 'Present' : 'e.g. Aug 2023 or 2023-08'}
                          className={`w-full px-3 py-2 border rounded-xl text-xs ${
                            record.isCurrentlyWorking
                              ? 'bg-stone-100 border-stone-200 text-stone-500 font-semibold'
                              : 'bg-white border-stone-300 text-stone-900 focus:outline-hidden focus:ring-2 focus:ring-red-900'
                          }`}
                        />
                      </div>

                      <div className="pb-2">
                        <label className="inline-flex items-center gap-2 cursor-pointer select-none">
                          <input
                            type="checkbox"
                            checked={record.isCurrentlyWorking}
                            onChange={e => onUpdateEmploymentRecord(index, 'isCurrentlyWorking', e.target.checked)}
                            className="w-4 h-4 text-red-900 rounded border-stone-300 focus:ring-red-900 cursor-pointer"
                          />
                          <span className="text-xs font-bold text-stone-800">
                            Currently Working Here
                          </span>
                        </label>
                      </div>
                    </div>

                    <div>
                      <label className="text-xs font-bold text-stone-800 block mb-1">
                        Main Job Responsibilities <span className="text-red-600">*</span>
                      </label>
                      <textarea
                        rows={2}
                        required
                        value={record.responsibilities}
                        onChange={e => onUpdateEmploymentRecord(index, 'responsibilities', e.target.value)}
                        placeholder="e.g. Operated CNC milling machines, performed pipe welding as per ASME standards, supervised team..."
                        className="w-full px-3.5 py-2.5 bg-white border border-stone-300 rounded-xl text-xs text-stone-900 focus:outline-hidden focus:ring-2 focus:ring-red-900"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                      <div>
                        <label className="text-xs font-bold text-stone-800 block mb-1">
                          Key Skills & Tools Used <span className="text-red-600">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          value={record.keySkills}
                          onChange={e => onUpdateEmploymentRecord(index, 'keySkills', e.target.value)}
                          placeholder="e.g. TIG Welding, CoreTrade, Lathe Machine, AutoCAD"
                          className="w-full px-3 py-2 bg-white border border-stone-300 rounded-xl text-xs text-stone-900 focus:outline-hidden focus:ring-2 focus:ring-red-900"
                        />
                      </div>

                      <div>
                        <label className="text-xs font-bold text-stone-800 block mb-1">
                          Major Achievements <span className="text-stone-400 font-normal">(Optional)</span>
                        </label>
                        <input
                          type="text"
                          value={record.achievements || ''}
                          onChange={e => onUpdateEmploymentRecord(index, 'achievements', e.target.value)}
                          placeholder="e.g. Promoted to Senior Technician, Zero incident record"
                          className="w-full px-3 py-2 bg-white border border-stone-300 rounded-xl text-xs text-stone-900 focus:outline-hidden focus:ring-2 focus:ring-red-900"
                        />
                      </div>
                    </div>
                  </div>
                );
              })}

              <button
                type="button"
                onClick={onAddEmploymentRecord}
                className="w-full py-2.5 bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-bold rounded-xl transition-colors flex items-center justify-center gap-1.5 cursor-pointer border border-stone-200"
              >
                <Plus className="w-3.5 h-3.5 text-red-900" />
                <span>+ Add Another Employment</span>
              </button>
            </div>
          )}
        </div>
      ) : (
        /* Fresher Notice: No employment fields required */
        <div className="bg-red-50/50 border border-red-200 rounded-2xl p-4 flex items-start gap-3">
          <GraduationCap className="w-5 h-5 text-red-900 shrink-0 mt-0.5" />
          <div className="text-xs text-stone-700 space-y-1">
            <span className="font-extrabold text-stone-900 block">
              Fresher Profile Selected — Work Experience Section Omitted
            </span>
            <p>
              As a fresher, you do not need to provide employment records. Our CV specialists will emphasize your Education, Technical Skills, Projects, and Certifications to present a strong profile to recruiters.
            </p>
          </div>
        </div>
      )}

      {/* SECTION 5: SKILLS & LANGUAGES */}
      <div className="bg-white rounded-2xl border border-stone-200 shadow-2xs overflow-hidden transition-all">
        <button
          type="button"
          onClick={() => toggleSection('skills')}
          className="w-full px-5 py-4 flex items-center justify-between bg-stone-50/60 hover:bg-stone-100/70 border-b border-stone-100 text-left cursor-pointer transition-colors"
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-red-900 text-white flex items-center justify-center">
              <Wrench className="w-4 h-4" />
            </div>
            <div>
              <h4 className="font-extrabold text-stone-900 text-sm flex items-center gap-2">
                <span>5. Skills & Languages Known</span>
                <span className="text-red-600 text-xs font-bold">*</span>
              </h4>
              <p className="text-[11px] text-stone-500">Technical skills, machinery/software tools, professional abilities, and languages</p>
            </div>
          </div>
          {openSections.skills ? <ChevronUp className="w-5 h-5 text-stone-400" /> : <ChevronDown className="w-5 h-5 text-stone-400" />}
        </button>

        {openSections.skills && (
          <div className="p-5 sm:p-6 space-y-4 animate-in fade-in">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-stone-800 block mb-1">
                  Technical & Practical Skills <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={skillsData.technicalSkills.join(', ')}
                  onChange={e =>
                    onUpdateSkillsData(prev => ({
                      ...prev,
                      technicalSkills: e.target.value.split(',').map(s => s.trim()).filter(Boolean)
                    }))
                  }
                  placeholder="e.g. Arc Welding, CNC Milling, PLC Programming, Piping"
                  className="w-full px-3 py-2 bg-white border border-stone-300 rounded-xl text-xs text-stone-900 focus:outline-hidden focus:ring-2 focus:ring-red-900"
                />
                <span className="text-[10px] text-stone-400 mt-1 block">Separate skills with commas.</span>
              </div>

              <div>
                <label className="text-xs font-bold text-stone-800 block mb-1">
                  Software, Machinery & Tools
                </label>
                <input
                  type="text"
                  value={skillsData.softwareTools.join(', ')}
                  onChange={e =>
                    onUpdateSkillsData(prev => ({
                      ...prev,
                      softwareTools: e.target.value.split(',').map(s => s.trim()).filter(Boolean)
                    }))
                  }
                  placeholder="e.g. AutoCAD, MS Excel, Tally Prime, Lathe Machine"
                  className="w-full px-3 py-2 bg-white border border-stone-300 rounded-xl text-xs text-stone-900 focus:outline-hidden focus:ring-2 focus:ring-red-900"
                />
                <span className="text-[10px] text-stone-400 mt-1 block">Separate tools with commas.</span>
              </div>

              <div>
                <label className="text-xs font-semibold text-stone-700 block mb-1">
                  Professional / Soft Skills
                </label>
                <input
                  type="text"
                  value={skillsData.professionalSkills.join(', ')}
                  onChange={e =>
                    onUpdateSkillsData(prev => ({
                      ...prev,
                      professionalSkills: e.target.value.split(',').map(s => s.trim()).filter(Boolean)
                    }))
                  }
                  placeholder="e.g. Team Leadership, Problem Solving, Workplace Safety"
                  className="w-full px-3 py-2 bg-white border border-stone-300 rounded-xl text-xs text-stone-900 focus:outline-hidden focus:ring-2 focus:ring-red-900"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-stone-700 block mb-1">
                  Other Relevant Skills
                </label>
                <input
                  type="text"
                  value={skillsData.otherSkills.join(', ')}
                  onChange={e =>
                    onUpdateSkillsData(prev => ({
                      ...prev,
                      otherSkills: e.target.value.split(',').map(s => s.trim()).filter(Boolean)
                    }))
                  }
                  placeholder="e.g. First Aid, Rigging & Slinging, Blueprint Reading"
                  className="w-full px-3 py-2 bg-white border border-stone-300 rounded-xl text-xs text-stone-900 focus:outline-hidden focus:ring-2 focus:ring-red-900"
                />
              </div>
            </div>

            {/* Languages Known with Proficiency */}
            <div className="pt-3 border-t border-stone-100 space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-stone-800 block">Languages Known</span>
                  <span className="text-[10px] text-stone-500">Indicate proficiency for overseas recruiters</span>
                </div>
                <button
                  type="button"
                  onClick={handleAddLanguage}
                  className="px-3 py-1 bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-bold rounded-lg transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <Plus className="w-3 h-3 text-red-900" />
                  <span>+ Add Language</span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {skillsData.languagesKnown.map((lang, idx) => (
                  <div key={idx} className="flex items-center gap-2 bg-stone-50 p-2.5 rounded-xl border border-stone-200">
                    <input
                      type="text"
                      value={lang.name}
                      onChange={e => handleUpdateLanguage(idx, 'name', e.target.value)}
                      placeholder="e.g. English, Tamil, Hindi"
                      className="w-full px-2.5 py-1.5 bg-white border border-stone-300 rounded-lg text-xs text-stone-900"
                    />
                    <select
                      value={lang.proficiency}
                      onChange={e => handleUpdateLanguage(idx, 'proficiency', e.target.value)}
                      className="px-2 py-1.5 bg-white border border-stone-300 rounded-lg text-xs font-medium text-stone-800"
                    >
                      <option value="Basic">Basic</option>
                      <option value="Intermediate">Intermediate</option>
                      <option value="Fluent">Fluent</option>
                      <option value="Native">Native</option>
                    </select>
                    {skillsData.languagesKnown.length > 1 && (
                      <button
                        type="button"
                        onClick={() => handleRemoveLanguage(idx)}
                        className="text-stone-400 hover:text-red-700 p-1 cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* SECTION 6: PROJECTS */}
      <div className="bg-white rounded-2xl border border-stone-200 shadow-2xs overflow-hidden transition-all">
        <button
          type="button"
          onClick={() => toggleSection('projects')}
          className="w-full px-5 py-4 flex items-center justify-between bg-stone-50/60 hover:bg-stone-100/70 border-b border-stone-100 text-left cursor-pointer transition-colors"
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-stone-800 text-white flex items-center justify-center">
              <FolderGit2 className="w-4 h-4" />
            </div>
            <div>
              <h4 className="font-extrabold text-stone-900 text-sm flex items-center gap-2">
                <span>6. Academic & Industrial Projects</span>
                <span className="text-stone-400 text-xs font-normal">({projects.length} added)</span>
              </h4>
              <p className="text-[11px] text-stone-500">Final year college projects or industrial site projects</p>
            </div>
          </div>
          {openSections.projects ? <ChevronUp className="w-5 h-5 text-stone-400" /> : <ChevronDown className="w-5 h-5 text-stone-400" />}
        </button>

        {openSections.projects && (
          <div className="p-5 sm:p-6 space-y-4 animate-in fade-in">
            <div className="flex items-center justify-between">
              <span className="text-xs text-stone-500">
                Showcase practical engineering, software, or technical projects.
              </span>
              <button
                type="button"
                onClick={onAddProject}
                className="px-3.5 py-1.5 bg-red-900 hover:bg-red-800 text-white text-xs font-bold rounded-xl flex items-center gap-1.5 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>+ Add Project</span>
              </button>
            </div>

            {projects.length === 0 ? (
              <p className="text-xs text-stone-400 italic text-center py-3 bg-stone-50 rounded-xl">
                No projects added yet. Click "+ Add Project" if you want to include college or work projects.
              </p>
            ) : (
              projects.map((proj, idx) => (
                <div key={proj.id || idx} className="bg-stone-50 p-4 rounded-xl border border-stone-200 space-y-3">
                  <div className="flex items-center justify-between border-b border-stone-200 pb-2">
                    <span className="font-bold text-xs text-stone-900">Project #{idx + 1}</span>
                    <button
                      type="button"
                      onClick={() => onRemoveProject(idx)}
                      className="text-stone-400 hover:text-red-700 text-xs flex items-center gap-1 cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Remove</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-[11px] font-bold text-stone-700 block mb-1">Project Title</label>
                      <input
                        type="text"
                        value={proj.title}
                        onChange={e => onUpdateProject(idx, 'title', e.target.value)}
                        placeholder="e.g. Automated Pneumatic Can Crusher / E-Commerce Portal"
                        className="w-full px-3 py-2 bg-white border border-stone-300 rounded-xl text-xs text-stone-900"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-semibold text-stone-700 block mb-1">Role / Technologies Used</label>
                      <input
                        type="text"
                        value={proj.toolsUsed || ''}
                        onChange={e => onUpdateProject(idx, 'toolsUsed', e.target.value)}
                        placeholder="e.g. AutoCAD, Pneumatic valves, PLC, Python"
                        className="w-full px-3 py-2 bg-white border border-stone-300 rounded-xl text-xs text-stone-900"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[11px] font-semibold text-stone-700 block mb-1">Project Description & Outcome</label>
                    <textarea
                      rows={2}
                      value={proj.description || ''}
                      onChange={e => onUpdateProject(idx, 'description', e.target.value)}
                      placeholder="Briefly describe what was designed, fabricated, or implemented and results achieved..."
                      className="w-full px-3 py-2 bg-white border border-stone-300 rounded-xl text-xs text-stone-900"
                    />
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>

      {/* SECTION 7: INTERNSHIP / TRAINING */}
      <div className="bg-white rounded-2xl border border-stone-200 shadow-2xs overflow-hidden transition-all">
        <button
          type="button"
          onClick={() => toggleSection('internships')}
          className="w-full px-5 py-4 flex items-center justify-between bg-stone-50/60 hover:bg-stone-100/70 border-b border-stone-100 text-left cursor-pointer transition-colors"
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-stone-800 text-white flex items-center justify-center">
              <BookOpen className="w-4 h-4" />
            </div>
            <div>
              <h4 className="font-extrabold text-stone-900 text-sm flex items-center gap-2">
                <span>7. Internship / Industrial In-Plant Training</span>
                <span className="text-stone-400 text-xs font-normal">({internships.length} added)</span>
              </h4>
              <p className="text-[11px] text-stone-500">In-plant training, apprenticeships, or short vocational courses</p>
            </div>
          </div>
          {openSections.internships ? <ChevronUp className="w-5 h-5 text-stone-400" /> : <ChevronDown className="w-5 h-5 text-stone-400" />}
        </button>

        {openSections.internships && (
          <div className="p-5 sm:p-6 space-y-4 animate-in fade-in">
            <div className="flex items-center justify-between">
              <span className="text-xs text-stone-500">
                Mention any apprentice training, plant visits, or practical workshops.
              </span>
              <button
                type="button"
                onClick={onAddInternship}
                className="px-3.5 py-1.5 bg-red-900 hover:bg-red-800 text-white text-xs font-bold rounded-xl flex items-center gap-1.5 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>+ Add Internship / Training</span>
              </button>
            </div>

            {internships.length === 0 ? (
              <p className="text-xs text-stone-400 italic text-center py-3 bg-stone-50 rounded-xl">
                No internships added yet. Click "+ Add Internship / Training" if applicable.
              </p>
            ) : (
              internships.map((int, idx) => (
                <div key={int.id || idx} className="bg-stone-50 p-4 rounded-xl border border-stone-200 space-y-3">
                  <div className="flex items-center justify-between border-b border-stone-200 pb-2">
                    <span className="font-bold text-xs text-stone-900">Training Record #{idx + 1}</span>
                    <button
                      type="button"
                      onClick={() => onRemoveInternship(idx)}
                      className="text-stone-400 hover:text-red-700 text-xs flex items-center gap-1 cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Remove</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-[11px] font-bold text-stone-700 block mb-1">Company / Institution</label>
                      <input
                        type="text"
                        value={int.company}
                        onChange={e => onUpdateInternship(idx, 'company', e.target.value)}
                        placeholder="e.g. BHEL Trichy / Southern Railway Workshop"
                        className="w-full px-3 py-2 bg-white border border-stone-300 rounded-xl text-xs text-stone-900"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-semibold text-stone-700 block mb-1">Position / Training Area</label>
                      <input
                        type="text"
                        value={int.position}
                        onChange={e => onUpdateInternship(idx, 'position', e.target.value)}
                        placeholder="e.g. Boiler Fabrication Intern / Electrical Trainee"
                        className="w-full px-3 py-2 bg-white border border-stone-300 rounded-xl text-xs text-stone-900"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[11px] font-semibold text-stone-700 block mb-1">Key Responsibilities / Skills Learned</label>
                    <textarea
                      rows={2}
                      value={int.responsibilities || ''}
                      onChange={e => onUpdateInternship(idx, 'responsibilities', e.target.value)}
                      placeholder="e.g. Learned safety procedures, assisted technician in machine maintenance..."
                      className="w-full px-3 py-2 bg-white border border-stone-300 rounded-xl text-xs text-stone-900"
                    />
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>

      {/* SECTION 8: CERTIFICATIONS & SEMINARS */}
      <div className="bg-white rounded-2xl border border-stone-200 shadow-2xs overflow-hidden transition-all">
        <button
          type="button"
          onClick={() => toggleSection('certifications')}
          className="w-full px-5 py-4 flex items-center justify-between bg-stone-50/60 hover:bg-stone-100/70 border-b border-stone-100 text-left cursor-pointer transition-colors"
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-stone-800 text-white flex items-center justify-center">
              <FileCheck className="w-4 h-4" />
            </div>
            <div>
              <h4 className="font-extrabold text-stone-900 text-sm flex items-center gap-2">
                <span>8. Certifications, Safety Passes & Seminars</span>
                <span className="text-stone-400 text-xs font-normal">({certifications.length + seminars.length} added)</span>
              </h4>
              <p className="text-[11px] text-stone-500">MOM CoreTrade, CSOC, BCSS, NDT, AWS, Safety licenses, technical seminars</p>
            </div>
          </div>
          {openSections.certifications ? <ChevronUp className="w-5 h-5 text-stone-400" /> : <ChevronDown className="w-5 h-5 text-stone-400" />}
        </button>

        {openSections.certifications && (
          <div className="p-5 sm:p-6 space-y-5 animate-in fade-in">
            {/* Certifications Sub-list */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-bold text-xs text-stone-900">Professional Certifications & Licenses:</span>
                <button
                  type="button"
                  onClick={onAddCertification}
                  className="px-3 py-1 bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-bold rounded-lg flex items-center gap-1 cursor-pointer"
                >
                  <Plus className="w-3 h-3 text-red-900" />
                  <span>+ Add Certification</span>
                </button>
              </div>

              {certifications.map((cert, idx) => (
                <div key={cert.id || idx} className="bg-stone-50 p-3.5 rounded-xl border border-stone-200 grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="text-[10px] font-bold text-stone-700 block mb-1">Certification Name</label>
                    <input
                      type="text"
                      value={cert.name}
                      onChange={e => onUpdateCertification(idx, 'name', e.target.value)}
                      placeholder="e.g. Singapore CoreTrade / NDT Level II"
                      className="w-full px-2.5 py-1.5 bg-white border border-stone-300 rounded-lg text-xs"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-stone-700 block mb-1">Issuing Organization</label>
                    <input
                      type="text"
                      value={cert.issuingOrganization}
                      onChange={e => onUpdateCertification(idx, 'issuingOrganization', e.target.value)}
                      placeholder="e.g. BCA Singapore / ASNT"
                      className="w-full px-2.5 py-1.5 bg-white border border-stone-300 rounded-lg text-xs"
                    />
                  </div>
                  <div className="flex items-end gap-2">
                    <div className="flex-1">
                      <label className="text-[10px] font-bold text-stone-700 block mb-1">Year / Date</label>
                      <input
                        type="text"
                        value={cert.yearDate || ''}
                        onChange={e => onUpdateCertification(idx, 'yearDate', e.target.value)}
                        placeholder="e.g. 2023"
                        className="w-full px-2.5 py-1.5 bg-white border border-stone-300 rounded-lg text-xs"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() => onRemoveCertification(idx)}
                      className="text-stone-400 hover:text-red-700 p-2 cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Seminars Sub-list */}
            <div className="pt-3 border-t border-stone-200 space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-bold text-xs text-stone-900">Workshops & Seminars Attended (Optional):</span>
                <button
                  type="button"
                  onClick={onAddSeminar}
                  className="px-3 py-1 bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-bold rounded-lg flex items-center gap-1 cursor-pointer"
                >
                  <Plus className="w-3 h-3 text-red-900" />
                  <span>+ Add Seminar / Workshop</span>
                </button>
              </div>

              {seminars.map((sem, idx) => (
                <div key={sem.id || idx} className="bg-stone-50 p-3 rounded-xl border border-stone-200 grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="text-[10px] font-bold text-stone-700 block mb-1">Seminar / Workshop Title</label>
                    <input
                      type="text"
                      value={sem.title}
                      onChange={e => onUpdateSeminar(idx, 'title', e.target.value)}
                      placeholder="e.g. WSH Supervisor Refresher"
                      className="w-full px-2.5 py-1.5 bg-white border border-stone-300 rounded-lg text-xs"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-stone-700 block mb-1">Institution</label>
                    <input
                      type="text"
                      value={sem.organization || ''}
                      onChange={e => onUpdateSeminar(idx, 'organization', e.target.value)}
                      placeholder="e.g. Singapore Safety Council"
                      className="w-full px-2.5 py-1.5 bg-white border border-stone-300 rounded-lg text-xs"
                    />
                  </div>
                  <div className="flex items-end gap-2">
                    <div className="flex-1">
                      <label className="text-[10px] font-bold text-stone-700 block mb-1">Year / Date</label>
                      <input
                        type="text"
                        value={sem.dateYear || ''}
                        onChange={e => onUpdateSeminar(idx, 'dateYear', e.target.value)}
                        placeholder="e.g. 2022"
                        className="w-full px-2.5 py-1.5 bg-white border border-stone-300 rounded-lg text-xs"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() => onRemoveSeminar(idx)}
                      className="text-stone-400 hover:text-red-700 p-2 cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* SECTION 9: EXTRA-CURRICULAR & ACHIEVEMENTS */}
      <div className="bg-white rounded-2xl border border-stone-200 shadow-2xs overflow-hidden transition-all">
        <button
          type="button"
          onClick={() => toggleSection('activities')}
          className="w-full px-5 py-4 flex items-center justify-between bg-stone-50/60 hover:bg-stone-100/70 border-b border-stone-100 text-left cursor-pointer transition-colors"
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-stone-800 text-white flex items-center justify-center">
              <Award className="w-4 h-4" />
            </div>
            <div>
              <h4 className="font-extrabold text-stone-900 text-sm flex items-center gap-2">
                <span>9. Extra-Curricular Activities & Major Awards</span>
                <span className="text-stone-400 text-xs font-normal">({activities.length + achievements.length} added)</span>
              </h4>
              <p className="text-[11px] text-stone-500">Sports, volunteer work, leadership positions, employee of the month, or trophies</p>
            </div>
          </div>
          {openSections.activities ? <ChevronUp className="w-5 h-5 text-stone-400" /> : <ChevronDown className="w-5 h-5 text-stone-400" />}
        </button>

        {openSections.activities && (
          <div className="p-5 sm:p-6 space-y-4 animate-in fade-in">
            <div className="flex items-center justify-between">
              <span className="text-xs text-stone-500">
                Mention sports, community participation, or special recognitions.
              </span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={onAddActivity}
                  className="px-3 py-1.5 bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-bold rounded-lg flex items-center gap-1 cursor-pointer"
                >
                  <Plus className="w-3 h-3 text-red-900" />
                  <span>+ Add Activity</span>
                </button>
                <button
                  type="button"
                  onClick={onAddAchievement}
                  className="px-3 py-1.5 bg-red-900 hover:bg-red-800 text-white text-xs font-bold rounded-lg flex items-center gap-1 cursor-pointer"
                >
                  <Plus className="w-3 h-3" />
                  <span>+ Add Award / Achievement</span>
                </button>
              </div>
            </div>

            {activities.map((act, idx) => (
              <div key={act.id || idx} className="bg-stone-50 p-3 rounded-xl border border-stone-200 flex items-center gap-3">
                <select
                  value={act.category}
                  onChange={e => onUpdateActivity(idx, 'category', e.target.value)}
                  className="px-2.5 py-1.5 bg-white border border-stone-300 rounded-lg text-xs"
                >
                  <option value="Sports">Sports</option>
                  <option value="Competitions">Competitions</option>
                  <option value="Leadership">Leadership</option>
                  <option value="Volunteer Activities">Volunteer</option>
                  <option value="Clubs / Organizations">Clubs</option>
                  <option value="Other">Other</option>
                </select>
                <input
                  type="text"
                  value={act.title}
                  onChange={e => onUpdateActivity(idx, 'title', e.target.value)}
                  placeholder="e.g. Captain of College Cricket Team / Red Cross Volunteer"
                  className="w-full px-2.5 py-1.5 bg-white border border-stone-300 rounded-lg text-xs"
                />
                <button
                  type="button"
                  onClick={() => onRemoveActivity(idx)}
                  className="text-stone-400 hover:text-red-700 p-1.5 cursor-pointer"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}

            {achievements.map((ach, idx) => (
              <div key={ach.id || idx} className="bg-amber-50/60 border border-amber-200 p-3 rounded-xl flex items-center gap-3">
                <span className="text-sm">🏆</span>
                <input
                  type="text"
                  value={ach.title}
                  onChange={e => onUpdateAchievement(idx, 'title', e.target.value)}
                  placeholder="e.g. Best Welder of the Year 2022 / 100% Safety Compliance Award"
                  className="w-full px-2.5 py-1.5 bg-white border border-amber-300 rounded-lg text-xs"
                />
                <button
                  type="button"
                  onClick={() => onRemoveAchievement(idx)}
                  className="text-stone-400 hover:text-red-700 p-1.5 cursor-pointer"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* SECTION 10: OVERSEAS / JOB APPLICATION PREFERENCES */}
      <div className="bg-white rounded-2xl border border-stone-200 shadow-2xs overflow-hidden transition-all">
        <button
          type="button"
          onClick={() => toggleSection('overseas')}
          className="w-full px-5 py-4 flex items-center justify-between bg-stone-50/60 hover:bg-stone-100/70 border-b border-stone-100 text-left cursor-pointer transition-colors"
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-red-900 text-white flex items-center justify-center">
              <Globe className="w-4 h-4" />
            </div>
            <div>
              <h4 className="font-extrabold text-stone-900 text-sm flex items-center gap-2">
                <span>10. Overseas & Job Application Preferences</span>
                <span className="text-red-600 text-xs font-bold">Important for Singapore</span>
              </h4>
              <p className="text-[11px] text-stone-500">Target country, passport readiness, driving license, and visa category</p>
            </div>
          </div>
          {openSections.overseas ? <ChevronUp className="w-5 h-5 text-stone-400" /> : <ChevronDown className="w-5 h-5 text-stone-400" />}
        </button>

        {openSections.overseas && (
          <div className="p-5 sm:p-6 space-y-4 animate-in fade-in">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
              <div>
                <label className="text-xs font-bold text-stone-800 block mb-1">
                  Preferred Job Role / Position
                </label>
                <input
                  type="text"
                  value={overseasInfo.preferredPosition || ''}
                  onChange={e => onUpdateOverseasInfo('preferredPosition', e.target.value)}
                  placeholder="e.g. Pipe Welder / CNC Operator / Driver"
                  className="w-full px-3 py-2 bg-white border border-stone-300 rounded-xl text-xs text-stone-900"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-stone-800 block mb-1">
                  Preferred Country
                </label>
                <select
                  value={overseasInfo.preferredCountry || 'Singapore'}
                  onChange={e => onUpdateOverseasInfo('preferredCountry', e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-stone-300 rounded-xl text-xs text-stone-900"
                >
                  <option value="Singapore">Singapore (Primary Focus)</option>
                  <option value="Malaysia">Malaysia</option>
                  <option value="UAE / Dubai">UAE / Dubai</option>
                  <option value="Saudi Arabia">Saudi Arabia</option>
                  <option value="Qatar">Qatar</option>
                  <option value="Europe / Poland / Romania">Europe</option>
                  <option value="India">India (Domestic)</option>
                  <option value="Other">Other Overseas Country</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-stone-800 block mb-1">
                  Passport Available?
                </label>
                <select
                  value={overseasInfo.passportAvailable || 'Yes'}
                  onChange={e => onUpdateOverseasInfo('passportAvailable', e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-stone-300 rounded-xl text-xs text-stone-900"
                >
                  <option value="Yes">Yes, Valid Passport Available</option>
                  <option value="No">No Passport Yet</option>
                  <option value="Applied">Passport Applied / Renewal</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
              <div>
                <label className="text-xs font-semibold text-stone-700 block mb-1">
                  Passport Expiry Date (if available)
                </label>
                <input
                  type="text"
                  value={overseasInfo.passportExpiryDate || ''}
                  onChange={e => onUpdateOverseasInfo('passportExpiryDate', e.target.value)}
                  placeholder="e.g. 2031-08 or Aug 2031"
                  className="w-full px-3 py-2 bg-white border border-stone-300 rounded-xl text-xs text-stone-900"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-stone-700 block mb-1">
                  Visa / MOM Pass Status
                </label>
                <input
                  type="text"
                  value={overseasInfo.visaStatus || ''}
                  onChange={e => onUpdateOverseasInfo('visaStatus', e.target.value)}
                  placeholder="e.g. ECNR / Ex-Singapore Work Permit / Fresh"
                  className="w-full px-3 py-2 bg-white border border-stone-300 rounded-xl text-xs text-stone-900"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-stone-700 block mb-1">
                  Notice Period / Availability
                </label>
                <select
                  value={overseasInfo.noticePeriod || 'Immediate'}
                  onChange={e => onUpdateOverseasInfo('noticePeriod', e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-stone-300 rounded-xl text-xs text-stone-900"
                >
                  <option value="Immediate">Immediate (Within 7 Days)</option>
                  <option value="15 Days">15 Days</option>
                  <option value="1 Month">1 Month</option>
                  <option value="2 Months">2 Months</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
              <div>
                <label className="text-xs font-semibold text-stone-700 block mb-1">
                  Driving License
                </label>
                <input
                  type="text"
                  value={overseasInfo.drivingLicence || ''}
                  onChange={e => onUpdateOverseasInfo('drivingLicence', e.target.value)}
                  placeholder="e.g. Singapore Class 3 / Indian Heavy / LMV"
                  className="w-full px-3 py-2 bg-white border border-stone-300 rounded-xl text-xs text-stone-900"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-stone-700 block mb-1">
                  LinkedIn URL (Optional)
                </label>
                <input
                  type="url"
                  value={overseasInfo.linkedinProfile || ''}
                  onChange={e => onUpdateOverseasInfo('linkedinProfile', e.target.value)}
                  placeholder="https://linkedin.com/in/..."
                  className="w-full px-3 py-2 bg-white border border-stone-300 rounded-xl text-xs text-stone-900"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-stone-700 block mb-1">
                  Portfolio / GitHub / Website (Optional)
                </label>
                <input
                  type="url"
                  value={overseasInfo.portfolioWebsite || ''}
                  onChange={e => onUpdateOverseasInfo('portfolioWebsite', e.target.value)}
                  placeholder="https://..."
                  className="w-full px-3 py-2 bg-white border border-stone-300 rounded-xl text-xs text-stone-900"
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* SECTION 11: SUPPORTING DOCUMENTS & WHATSAPP TRANSMISSION */}
      <div className="bg-white rounded-2xl border border-stone-200 shadow-2xs overflow-hidden transition-all">
        <button
          type="button"
          onClick={() => toggleSection('documents')}
          className="w-full px-5 py-4 flex items-center justify-between bg-stone-50/60 hover:bg-stone-100/70 border-b border-stone-100 text-left cursor-pointer transition-colors"
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-stone-800 text-white flex items-center justify-center">
              <Paperclip className="w-4 h-4" />
            </div>
            <div>
              <h4 className="font-extrabold text-stone-900 text-sm flex items-center gap-2">
                <span>11. Supporting Documents & WhatsApp Direct Option</span>
                <span className="text-emerald-700 text-xs font-bold">Convenient</span>
              </h4>
              <p className="text-[11px] text-stone-500">Upload existing draft, certificates, passport copy or send directly via WhatsApp</p>
            </div>
          </div>
          {openSections.documents ? <ChevronUp className="w-5 h-5 text-stone-400" /> : <ChevronDown className="w-5 h-5 text-stone-400" />}
        </button>

        {openSections.documents && (
          <div className="p-5 sm:p-6 space-y-4 animate-in fade-in">
            {/* Preferred WhatsApp Option Checkbox */}
            <div className="bg-emerald-50/70 border border-emerald-200 rounded-xl p-4">
              <label className="flex items-start gap-3 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={sendDocsViaWhatsApp}
                  onChange={e => onToggleSendDocsViaWhatsApp(e.target.checked)}
                  className="w-4 h-4 mt-0.5 text-emerald-600 rounded border-emerald-300 focus:ring-emerald-500 cursor-pointer"
                />
                <div>
                  <span className="font-bold text-xs text-emerald-950 block">
                    ✓ Recommended: I will send my certificates, marksheets, and old CV via WhatsApp after payment
                  </span>
                  <span className="text-[11px] text-emerald-800 block mt-0.5 leading-relaxed">
                    Most candidates prefer WhatsApp because you can photograph your certificates, experience letters, and passport on your phone and send them instantly to our team.
                  </span>
                </div>
              </label>
            </div>

            {/* Optional Document Upload Box */}
            <div className="space-y-3 pt-2">
              <span className="text-xs font-bold text-stone-800 block">
                Or Upload Files Directly Now (PDF, DOCX, JPG, PNG):
              </span>

              <label className="border-2 border-dashed border-stone-300 hover:border-red-900 rounded-xl p-5 flex flex-col items-center justify-center gap-2 cursor-pointer bg-stone-50/50 hover:bg-stone-50 transition-colors">
                <Upload className="w-6 h-6 text-stone-400" />
                <span className="text-xs font-semibold text-stone-700">
                  Click to browse and upload files from your device
                </span>
                <span className="text-[10px] text-stone-400">
                  Supports Old CV, Marksheets, Trade Certificates, Passport Scans (up to 10MB each)
                </span>
                <input
                  type="file"
                  multiple
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </label>

              {/* Uploaded Documents List */}
              {uploadedDocuments.length > 0 && (
                <div className="space-y-2 pt-2">
                  <span className="text-xs font-bold text-stone-800 block">Attached Files ({uploadedDocuments.length}):</span>
                  {uploadedDocuments.map(doc => (
                    <div
                      key={doc.id}
                      className="flex items-center justify-between p-2.5 bg-stone-100 rounded-xl border border-stone-200 text-xs"
                    >
                      <div className="flex items-center gap-2">
                        <FileCheck className="w-4 h-4 text-emerald-600" />
                        <span className="font-semibold text-stone-800">{doc.name}</span>
                        {doc.fileSize && <span className="text-stone-400 text-[10px]">({doc.fileSize})</span>}
                      </div>
                      <button
                        type="button"
                        onClick={() => onRemoveDocument(doc.id)}
                        className="text-stone-400 hover:text-red-700 p-1 cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
