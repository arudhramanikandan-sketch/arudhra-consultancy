import React from 'react';
import { CVEducationRecord } from '../../types';
import { GraduationCap, Plus, Trash2, BookOpen, Calendar, MapPin, Award } from 'lucide-react';
import { createEmptyEducationRecord } from './CVFormTypes';

interface EducationStepProps {
  educationList: CVEducationRecord[];
  onChange: (list: CVEducationRecord[]) => void;
}

const QUALIFICATION_LEVELS = [
  '10th / Secondary',
  '12th / Higher Secondary',
  'Diploma',
  'ITI',
  'UG',
  'PG',
  'PhD / Doctorate',
  'Professional Certification',
  'Other'
];

export const EducationStep: React.FC<EducationStepProps> = ({ educationList, onChange }) => {
  const handleAdd = () => {
    onChange([...educationList, createEmptyEducationRecord()]);
  };

  const handleRemove = (index: number) => {
    if (educationList.length <= 1) return;
    onChange(educationList.filter((_, i) => i !== index));
  };

  const handleUpdate = (index: number, field: keyof CVEducationRecord, value: string) => {
    const updated = educationList.map((item, i) => (i === index ? { ...item, [field]: value } : item));
    onChange(updated);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-stone-100 pb-3">
        <div>
          <h3 className="text-lg font-extrabold text-stone-900 flex items-center gap-2">
            <GraduationCap className="w-5 h-5 text-red-900" />
            <span>Education & Qualifications</span>
          </h3>
          <p className="text-xs text-stone-500 mt-0.5">
            Add your formal degrees, diplomas, ITI certificates, or school education records.
          </p>
        </div>

        <button
          type="button"
          onClick={handleAdd}
          className="inline-flex items-center gap-1.5 px-4 py-2 bg-red-900 hover:bg-red-800 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer shrink-0 self-start sm:self-auto shadow-xs"
        >
          <Plus className="w-4 h-4" />
          <span>+ Add Qualification</span>
        </button>
      </div>

      <div className="space-y-4">
        {educationList.map((record, index) => (
          <div
            key={record.id || index}
            className="bg-stone-50/70 border-2 border-stone-200 rounded-2xl p-5 space-y-4 transition-all hover:border-stone-300"
          >
            <div className="flex items-center justify-between border-b border-stone-200 pb-2.5">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-red-950 text-white text-xs font-bold flex items-center justify-center">
                  {index + 1}
                </span>
                <span className="font-extrabold text-stone-900 text-sm">
                  {record.qualificationLevel || `Qualification #${index + 1}`}
                  {record.courseDegree ? ` — ${record.courseDegree}` : ''}
                </span>
              </div>

              {educationList.length > 1 && (
                <button
                  type="button"
                  onClick={() => handleRemove(index)}
                  className="text-stone-400 hover:text-red-700 p-1.5 rounded-lg hover:bg-red-50 text-xs font-semibold flex items-center gap-1 transition-colors cursor-pointer"
                  title="Remove this qualification"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Remove</span>
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
              <div>
                <label className="text-xs font-bold text-stone-800 block mb-1">
                  Qualification Level <span className="text-red-600">*</span>
                </label>
                <select
                  value={record.qualificationLevel}
                  onChange={e => handleUpdate(index, 'qualificationLevel', e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-stone-300 rounded-xl text-xs text-stone-900 focus:outline-hidden focus:ring-2 focus:ring-red-900 font-semibold"
                >
                  {QUALIFICATION_LEVELS.map(lvl => (
                    <option key={lvl} value={lvl}>
                      {lvl}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-stone-800 block mb-1">
                  Course / Degree <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={record.courseDegree}
                  onChange={e => handleUpdate(index, 'courseDegree', e.target.value)}
                  placeholder="e.g. B.E. / Diploma / ITI / SSLC"
                  className="w-full px-3 py-2 bg-white border border-stone-300 rounded-xl text-xs text-stone-900 focus:outline-hidden focus:ring-2 focus:ring-red-900"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-stone-800 block mb-1">
                  Specialization / Branch
                </label>
                <input
                  type="text"
                  value={record.specialization || ''}
                  onChange={e => handleUpdate(index, 'specialization', e.target.value)}
                  placeholder="e.g. Mechanical / Civil / Electrician"
                  className="w-full px-3 py-2 bg-white border border-stone-300 rounded-xl text-xs text-stone-900 focus:outline-hidden focus:ring-2 focus:ring-red-900"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
              <div>
                <label className="text-xs font-bold text-stone-800 block mb-1">
                  School / College / Institution <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={record.schoolCollege}
                  onChange={e => handleUpdate(index, 'schoolCollege', e.target.value)}
                  placeholder="e.g. Govt Polytechnic College"
                  className="w-full px-3 py-2 bg-white border border-stone-300 rounded-xl text-xs text-stone-900 focus:outline-hidden focus:ring-2 focus:ring-red-900"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-stone-800 block mb-1">
                  Board / University
                </label>
                <input
                  type="text"
                  value={record.boardUniversity || ''}
                  onChange={e => handleUpdate(index, 'boardUniversity', e.target.value)}
                  placeholder="e.g. DOTE / Anna University / State Board"
                  className="w-full px-3 py-2 bg-white border border-stone-300 rounded-xl text-xs text-stone-900 focus:outline-hidden focus:ring-2 focus:ring-red-900"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-stone-800 block mb-1">
                  Location (City / State)
                </label>
                <div className="relative">
                  <MapPin className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    value={record.location || ''}
                    onChange={e => handleUpdate(index, 'location', e.target.value)}
                    placeholder="e.g. Trichy, Tamil Nadu"
                    className="w-full pl-9 pr-3 py-2 bg-white border border-stone-300 rounded-xl text-xs text-stone-900 focus:outline-hidden focus:ring-2 focus:ring-red-900"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
              <div>
                <label className="text-xs font-bold text-stone-800 block mb-1">
                  Year of Joining (Optional)
                </label>
                <div className="relative">
                  <Calendar className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    value={record.yearJoining || ''}
                    onChange={e => handleUpdate(index, 'yearJoining', e.target.value)}
                    placeholder="e.g. 2018"
                    className="w-full pl-9 pr-3 py-2 bg-white border border-stone-300 rounded-xl text-xs text-stone-900 focus:outline-hidden focus:ring-2 focus:ring-red-900"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-stone-800 block mb-1">
                  Year of Passing <span className="text-red-600">*</span>
                </label>
                <div className="relative">
                  <Calendar className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    required
                    value={record.yearPassing}
                    onChange={e => handleUpdate(index, 'yearPassing', e.target.value)}
                    placeholder="e.g. 2021"
                    className="w-full pl-9 pr-3 py-2 bg-white border border-stone-300 rounded-xl text-xs text-stone-900 focus:outline-hidden focus:ring-2 focus:ring-red-900"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-stone-800 block mb-1">
                  Percentage / CGPA / Grade
                </label>
                <div className="relative">
                  <Award className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    value={record.percentageCgpa || ''}
                    onChange={e => handleUpdate(index, 'percentageCgpa', e.target.value)}
                    placeholder="e.g. 82.5% / First Class"
                    className="w-full pl-9 pr-3 py-2 bg-white border border-stone-300 rounded-xl text-xs text-stone-900 focus:outline-hidden focus:ring-2 focus:ring-red-900"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-stone-700 block mb-1">
                Additional Notes / Honors (Optional)
              </label>
              <input
                type="text"
                value={record.notes || ''}
                onChange={e => handleUpdate(index, 'notes', e.target.value)}
                placeholder="e.g. Department Rank 2nd, Gold Medalist, Completed with Distinction"
                className="w-full px-3 py-2 bg-white border border-stone-300 rounded-xl text-xs text-stone-900 focus:outline-hidden focus:ring-2 focus:ring-red-900"
              />
            </div>
          </div>
        ))}
      </div>

      <div className="text-center pt-1">
        <button
          type="button"
          onClick={handleAdd}
          className="w-full sm:w-auto px-5 py-2.5 bg-stone-100 hover:bg-stone-200 border border-stone-300 text-stone-800 font-bold text-xs rounded-xl shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer mx-auto"
        >
          <Plus className="w-4 h-4 text-red-900" />
          <span>+ Add Another Qualification</span>
        </button>
      </div>
    </div>
  );
};
