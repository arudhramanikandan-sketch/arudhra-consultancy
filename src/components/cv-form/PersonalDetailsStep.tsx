import React from 'react';
import { CVPersonalDetails } from '../../types';
import { User, Phone, Mail, MapPin, Calendar, Camera, FileText, Info, Trash2 } from 'lucide-react';

interface PersonalDetailsStepProps {
  personalDetails: CVPersonalDetails;
  onChange: (details: CVPersonalDetails) => void;
  careerObjective: string;
  onObjectiveChange: (objective: string) => void;
}

export const PersonalDetailsStep: React.FC<PersonalDetailsStepProps> = ({
  personalDetails,
  onChange,
  careerObjective,
  onObjectiveChange
}) => {
  const handleFieldChange = (field: keyof CVPersonalDetails, value: string) => {
    onChange({ ...personalDetails, [field]: value });
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      alert('Photo must be less than 2MB');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      handleFieldChange('profilePhotoUrl', reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleRemovePhoto = () => {
    handleFieldChange('profilePhotoUrl', '');
  };

  return (
    <div className="space-y-6">
      {/* Step Header */}
      <div>
        <h3 className="text-lg font-extrabold text-stone-900">
          Personal Information & Contact Details
        </h3>
        <p className="text-xs text-stone-500 mt-1">
          Provide your core contact details so recruiters and our CV team can reach you. Sensitive personal fields are completely optional.
        </p>
      </div>

      {/* Mandatory Contact Fields */}
      <div className="bg-stone-50 border border-stone-200 rounded-2xl p-5 space-y-4">
        <span className="text-[11px] font-bold text-red-900 uppercase tracking-wider block">
          Primary Contact Details (Required)
        </span>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="text-xs font-bold text-stone-800 block mb-1">
              Full Name <span className="text-red-600">*</span>
            </label>
            <div className="relative">
              <User className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-3" />
              <input
                type="text"
                required
                value={personalDetails.fullName}
                onChange={e => handleFieldChange('fullName', e.target.value)}
                placeholder="Name as in passport/Aadhaar"
                className="w-full pl-9 pr-3 py-2 bg-white border border-stone-300 rounded-xl text-xs text-stone-900 focus:outline-hidden focus:ring-2 focus:ring-red-900"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-stone-800 block mb-1">
              WhatsApp Mobile Number <span className="text-red-600">*</span>
            </label>
            <div className="relative">
              <Phone className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-3" />
              <input
                type="tel"
                required
                value={personalDetails.mobile}
                onChange={e => handleFieldChange('mobile', e.target.value)}
                placeholder="e.g. 9840123456"
                className="w-full pl-9 pr-3 py-2 bg-white border border-stone-300 rounded-xl text-xs text-stone-900 focus:outline-hidden focus:ring-2 focus:ring-red-900"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-stone-800 block mb-1">
              Email Address <span className="text-red-600">*</span>
            </label>
            <div className="relative">
              <Mail className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-3" />
              <input
                type="email"
                required
                value={personalDetails.email}
                onChange={e => handleFieldChange('email', e.target.value)}
                placeholder="name@example.com"
                className="w-full pl-9 pr-3 py-2 bg-white border border-stone-300 rounded-xl text-xs text-stone-900 focus:outline-hidden focus:ring-2 focus:ring-red-900"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Optional Photo & Additional Details */}
      <div className="bg-white border border-stone-200 rounded-2xl p-5 space-y-5 shadow-2xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-stone-100 pb-3">
          <div>
            <span className="text-[11px] font-bold text-stone-700 uppercase tracking-wider block">
              Additional Personal Details (Optional)
            </span>
            <p className="text-[11px] text-stone-400">
              Only provide these if you want them included in your CV profile.
            </p>
          </div>

          {/* Profile Photo Option */}
          <div className="flex items-center gap-3">
            {personalDetails.profilePhotoUrl ? (
              <div className="flex items-center gap-2">
                <img
                  src={personalDetails.profilePhotoUrl}
                  alt="Profile Preview"
                  className="w-10 h-10 rounded-full object-cover border-2 border-stone-300"
                />
                <button
                  type="button"
                  onClick={handleRemovePhoto}
                  className="p-1 text-red-600 hover:text-red-800 text-xs flex items-center gap-1 font-semibold"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Remove Photo</span>
                </button>
              </div>
            ) : (
              <label className="cursor-pointer inline-flex items-center gap-1.5 px-3 py-1.5 bg-stone-100 hover:bg-stone-200 border border-stone-300 text-stone-700 text-xs font-semibold rounded-xl transition-colors">
                <Camera className="w-3.5 h-3.5 text-stone-500" />
                <span>Upload Photo (Optional)</span>
                <input
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  onChange={handlePhotoUpload}
                  className="hidden"
                />
              </label>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="text-xs font-bold text-stone-700 block mb-1">
              Father / Parent Name
            </label>
            <input
              type="text"
              value={personalDetails.fatherParentName || ''}
              onChange={e => handleFieldChange('fatherParentName', e.target.value)}
              placeholder="e.g. K. Sundaram"
              className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-xl text-xs text-stone-900 focus:outline-hidden focus:ring-2 focus:ring-red-900"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-stone-700 block mb-1">
              Date of Birth
            </label>
            <div className="relative">
              <Calendar className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-3" />
              <input
                type="text"
                value={personalDetails.dateOfBirth || ''}
                onChange={e => handleFieldChange('dateOfBirth', e.target.value)}
                placeholder="e.g. 15-May-1996"
                className="w-full pl-9 pr-3 py-2 bg-stone-50 border border-stone-300 rounded-xl text-xs text-stone-900 focus:outline-hidden focus:ring-2 focus:ring-red-900"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-stone-700 block mb-1">
              Gender
            </label>
            <select
              value={personalDetails.gender || ''}
              onChange={e => handleFieldChange('gender', e.target.value)}
              className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-xl text-xs text-stone-900 focus:outline-hidden focus:ring-2 focus:ring-red-900"
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div>
            <label className="text-xs font-bold text-stone-700 block mb-1">
              Marital Status
            </label>
            <select
              value={personalDetails.maritalStatus || ''}
              onChange={e => handleFieldChange('maritalStatus', e.target.value)}
              className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-xl text-xs text-stone-900 focus:outline-hidden focus:ring-2 focus:ring-red-900"
            >
              <option value="">Select Status</option>
              <option value="Single">Single</option>
              <option value="Married">Married</option>
            </select>
          </div>

          <div>
            <label className="text-xs font-bold text-stone-700 block mb-1">
              Nationality
            </label>
            <input
              type="text"
              value={personalDetails.nationality || 'Indian'}
              onChange={e => handleFieldChange('nationality', e.target.value)}
              placeholder="e.g. Indian"
              className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-xl text-xs text-stone-900 focus:outline-hidden focus:ring-2 focus:ring-red-900"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-stone-700 block mb-1">
              Current City & State
            </label>
            <div className="relative">
              <MapPin className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-3" />
              <input
                type="text"
                value={personalDetails.currentCity || ''}
                onChange={e => handleFieldChange('currentCity', e.target.value)}
                placeholder="e.g. Chennai, Tamil Nadu"
                className="w-full pl-9 pr-3 py-2 bg-stone-50 border border-stone-300 rounded-xl text-xs text-stone-900 focus:outline-hidden focus:ring-2 focus:ring-red-900"
              />
            </div>
          </div>
        </div>

        <div>
          <label className="text-xs font-bold text-stone-700 block mb-1">
            Communication / Residential Address (Optional)
          </label>
          <textarea
            rows={2}
            value={personalDetails.communicationAddress || ''}
            onChange={e => handleFieldChange('communicationAddress', e.target.value)}
            placeholder="Door No, Street Name, Town, District, PIN Code"
            className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-xl text-xs text-stone-900 focus:outline-hidden focus:ring-2 focus:ring-red-900"
          />
        </div>
      </div>

      {/* Professional Summary / Career Objective */}
      <div className="bg-stone-50 border border-stone-200 rounded-2xl p-5 space-y-2">
        <div className="flex items-center gap-2">
          <FileText className="w-4 h-4 text-red-900" />
          <label className="text-xs font-extrabold text-stone-900">
            Career Objective / Professional Summary (Optional)
          </label>
        </div>
        <p className="text-[11px] text-stone-500">
          Describe your career aspirations and top strengths in your own words. Our CV specialists will polish and professionally format this statement into MOM/ATS standards.
        </p>
        <textarea
          rows={3}
          value={careerObjective}
          onChange={e => onObjectiveChange(e.target.value)}
          placeholder="e.g. Dedicated mechanical engineer with 4 years experience in process piping seeking to leverage technical drafting and site supervision skills in Singapore..."
          className="w-full px-3.5 py-2.5 bg-white border border-stone-300 rounded-xl text-xs text-stone-900 focus:outline-hidden focus:ring-2 focus:ring-red-900"
        />
      </div>
    </div>
  );
};
