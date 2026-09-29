import React from 'react';
import { CVEmploymentRecord } from '../../types';
import { Briefcase, Building2, MapPin, Calendar, Wrench, Award, Plus, Trash2 } from 'lucide-react';
import { createEmptyEmploymentRecord } from './CVFormTypes';

interface ExperienceStepProps {
  employmentList: CVEmploymentRecord[];
  onChange: (list: CVEmploymentRecord[]) => void;
}

export const ExperienceStep: React.FC<ExperienceStepProps> = ({ employmentList, onChange }) => {
  const handleAdd = () => {
    onChange([...employmentList, createEmptyEmploymentRecord()]);
  };

  const handleRemove = (index: number) => {
    if (employmentList.length <= 1) return;
    onChange(employmentList.filter((_, i) => i !== index));
  };

  const handleUpdate = (index: number, field: keyof CVEmploymentRecord, value: any) => {
    const updated = employmentList.map((item, i) => {
      if (i !== index) return item;
      const rec = { ...item, [field]: value };
      if (field === 'isCurrentlyWorking' && value === true) {
        rec.endDate = '';
      }
      return rec;
    });
    onChange(updated);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-stone-100 pb-3">
        <div>
          <h3 className="text-lg font-extrabold text-stone-900 flex items-center gap-2">
            <Briefcase className="w-5 h-5 text-red-900" />
            <span>Work Experience & Employment History</span>
          </h3>
          <p className="text-xs text-stone-500 mt-0.5">
            Add all your previous companies and current employment. You can add unlimited employment records.
          </p>
        </div>

        <button
          type="button"
          onClick={handleAdd}
          className="inline-flex items-center gap-1.5 px-4 py-2 bg-red-900 hover:bg-red-800 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer shrink-0 self-start sm:self-auto shadow-xs"
        >
          <Plus className="w-4 h-4" />
          <span>+ Add Another Employment</span>
        </button>
      </div>

      <div className="space-y-4">
        {employmentList.map((record, index) => (
          <div
            key={record.id || index}
            className="bg-stone-50/70 border-2 border-stone-200 rounded-2xl p-5 space-y-4 transition-all hover:border-stone-300"
          >
            <div className="flex items-center justify-between border-b border-stone-200 pb-2.5">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-stone-900 text-white text-xs font-bold flex items-center justify-center">
                  {index + 1}
                </span>
                <span className="font-extrabold text-stone-900 text-sm">
                  {record.jobTitle || `Employment Record #${index + 1}`}
                  {record.companyName ? ` at ${record.companyName}` : ''}
                </span>
                {record.isCurrentlyWorking && (
                  <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                    Current Job
                  </span>
                )}
              </div>

              {employmentList.length > 1 && (
                <button
                  type="button"
                  onClick={() => handleRemove(index)}
                  className="text-stone-400 hover:text-red-700 p-1.5 rounded-lg hover:bg-red-50 text-xs font-semibold flex items-center gap-1 transition-colors cursor-pointer"
                  title="Remove this employment"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Remove</span>
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
              <div>
                <label className="text-xs font-bold text-stone-800 block mb-1">
                  Company Name <span className="text-red-600">*</span>
                </label>
                <div className="relative">
                  <Building2 className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    required
                    value={record.companyName}
                    onChange={e => handleUpdate(index, 'companyName', e.target.value)}
                    placeholder="e.g. Sembcorp Marine / Larsen & Toubro"
                    className="w-full pl-9 pr-3 py-2 bg-white border border-stone-300 rounded-xl text-xs text-stone-900 focus:outline-hidden focus:ring-2 focus:ring-red-900"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-stone-800 block mb-1">
                  Job Title / Designation <span className="text-red-600">*</span>
                </label>
                <div className="relative">
                  <Briefcase className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    required
                    value={record.jobTitle}
                    onChange={e => handleUpdate(index, 'jobTitle', e.target.value)}
                    placeholder="e.g. Piping Supervisor / Senior Welder"
                    className="w-full pl-9 pr-3 py-2 bg-white border border-stone-300 rounded-xl text-xs text-stone-900 focus:outline-hidden focus:ring-2 focus:ring-red-900"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-stone-800 block mb-1">
                  Company Location
                </label>
                <div className="relative">
                  <MapPin className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    value={record.location || ''}
                    onChange={e => handleUpdate(index, 'location', e.target.value)}
                    placeholder="e.g. Singapore / Chennai / Dubai"
                    className="w-full pl-9 pr-3 py-2 bg-white border border-stone-300 rounded-xl text-xs text-stone-900 focus:outline-hidden focus:ring-2 focus:ring-red-900"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 items-end">
              <div>
                <label className="text-xs font-bold text-stone-800 block mb-1">
                  Employment Start Date <span className="text-red-600">*</span>
                </label>
                <div className="relative">
                  <Calendar className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    required
                    value={record.startDate}
                    onChange={e => handleUpdate(index, 'startDate', e.target.value)}
                    placeholder="e.g. Jun 2021 or 2021-06"
                    className="w-full pl-9 pr-3 py-2 bg-white border border-stone-300 rounded-xl text-xs text-stone-900 focus:outline-hidden focus:ring-2 focus:ring-red-900"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-stone-800 block mb-1">
                  Employment End Date {!record.isCurrentlyWorking && <span className="text-red-600">*</span>}
                </label>
                <div className="relative">
                  <Calendar className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    disabled={record.isCurrentlyWorking}
                    required={!record.isCurrentlyWorking}
                    value={record.isCurrentlyWorking ? 'Present / Currently Working' : (record.endDate || '')}
                    onChange={e => handleUpdate(index, 'endDate', e.target.value)}
                    placeholder={record.isCurrentlyWorking ? 'Present' : 'e.g. Aug 2024 or 2024-08'}
                    className={`w-full pl-9 pr-3 py-2 border rounded-xl text-xs ${
                      record.isCurrentlyWorking
                        ? 'bg-stone-100 border-stone-200 text-stone-500 font-semibold'
                        : 'bg-white border-stone-300 text-stone-900 focus:outline-hidden focus:ring-2 focus:ring-red-900'
                    }`}
                  />
                </div>
              </div>

              <div className="pb-2">
                <label className="inline-flex items-center gap-2 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={record.isCurrentlyWorking}
                    onChange={e => handleUpdate(index, 'isCurrentlyWorking', e.target.checked)}
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
                onChange={e => handleUpdate(index, 'responsibilities', e.target.value)}
                placeholder="e.g. Operated CNC milling stations, inspected weld joints according to ASME Section IX, managed team of 8 fitters, ensured MOM workplace safety protocols..."
                className="w-full px-3 py-2 bg-white border border-stone-300 rounded-xl text-xs text-stone-900 focus:outline-hidden focus:ring-2 focus:ring-red-900"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div>
                <label className="text-xs font-bold text-stone-800 block mb-1">
                  Key Skills & Tools Used
                </label>
                <div className="relative">
                  <Wrench className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    value={record.keySkills || ''}
                    onChange={e => handleUpdate(index, 'keySkills', e.target.value)}
                    placeholder="e.g. TIG Welding, CoreTrade, Lathe Machine, AutoCAD"
                    className="w-full pl-9 pr-3 py-2 bg-white border border-stone-300 rounded-xl text-xs text-stone-900 focus:outline-hidden focus:ring-2 focus:ring-red-900"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-stone-800 block mb-1">
                  Major Achievements (Optional)
                </label>
                <div className="relative">
                  <Award className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    value={record.achievements || ''}
                    onChange={e => handleUpdate(index, 'achievements', e.target.value)}
                    placeholder="e.g. Promoted to Senior Technician, Zero lost-time accident record"
                    className="w-full pl-9 pr-3 py-2 bg-white border border-stone-300 rounded-xl text-xs text-stone-900 focus:outline-hidden focus:ring-2 focus:ring-red-900"
                  />
                </div>
              </div>
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
          <span>+ Add Another Employment</span>
        </button>
      </div>
    </div>
  );
};
