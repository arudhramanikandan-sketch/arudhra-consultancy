import React, { useState } from 'react';
import { Job } from '../types';
import { useApp } from '../context/AppContext';
import { MapPin, Banknote, Clock, GraduationCap, Users, ArrowUpRight, MessageSquare } from 'lucide-react';
import { QuickApplyWhatsAppModal } from './QuickApplyWhatsAppModal';

interface JobCardProps {
  job: Job;
}

export const JobCard: React.FC<JobCardProps> = ({ job }) => {
  const { setSelectedJob, setApplyModalJob } = useApp();
  const [isQuickApplyOpen, setIsQuickApplyOpen] = useState(false);

  return (
    <>
      <div
        id={`job-card-${job.id}`}
        className="group relative bg-white rounded-2xl border border-slate-200 shadow-xs hover:shadow-xl hover:border-red-800/40 transition-all duration-300 flex flex-col justify-between overflow-hidden"
      >
        {/* Top Banner & Badges */}
        <div>
          <div className="relative p-5 pb-3">
            {/* Badges Row */}
            <div className="flex flex-wrap items-center gap-1.5 mb-3">
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200 flex items-center gap-1.5 shadow-2xs">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span>Live Opening</span>
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-red-50 text-red-900 border border-red-200 flex items-center gap-1">
                <span>🇸🇬 Singapore</span>
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-stone-100 text-stone-800 border border-stone-200">
                {job.jobType}
              </span>
              {job.featured && (
                <span className="px-2 py-0.5 rounded-full text-[11px] font-semibold bg-amber-50 text-amber-900 border border-amber-200">
                  ★ Featured
                </span>
              )}
              {job.latest && (
                <span className="px-2 py-0.5 rounded-full text-[11px] font-semibold bg-slate-100 text-slate-800 border border-slate-200">
                  Latest
                </span>
              )}
              <span className="ml-auto text-[11px] text-slate-400 font-mono">
                Ref: {job.id}
              </span>
            </div>

            {/* Title & Employer */}
            <h3 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-red-900 transition-colors leading-snug line-clamp-2">
              {job.title}
            </h3>

            <div className="flex items-center justify-between text-xs text-slate-500 mt-1">
              <span className="font-medium text-slate-700">{job.category}</span>
              {job.employer && <span className="truncate max-w-[160px] text-slate-400">{job.employer}</span>}
            </div>

            {/* Salary Highlight Pill */}
            <div className="mt-3 p-2.5 bg-red-50/70 border border-red-200/80 rounded-xl flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Banknote className="w-4 h-4 text-red-900" />
                <span className="text-xs text-red-950 font-medium">Monthly Salary:</span>
              </div>
              <span className="text-sm font-extrabold text-red-900 tracking-tight">
                {job.salary}
              </span>
            </div>

            {/* Compact Meta Specs */}
            <div className="mt-3.5 space-y-1.5 text-xs text-slate-600">
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-red-700 shrink-0" />
                <span className="truncate font-medium text-slate-800">{job.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                <span className="truncate">{job.experience}</span>
              </div>
              <div className="flex items-center gap-2">
                <GraduationCap className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                <span className="truncate">{job.qualification}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Card Footer Actions */}
        <div className="p-4 pt-3 bg-slate-50/80 border-t border-slate-100 flex items-center justify-between gap-2">
          <div className="text-[11px] text-slate-500 flex items-center gap-1">
            <Users className="w-3 h-3 text-slate-400" />
            <span>{job.vacancyCount ? `${job.vacancyCount} Openings` : 'Singapore Vacancy'}</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              id={`view-job-btn-${job.id}`}
              type="button"
              onClick={() => setSelectedJob(job)}
              className="px-2.5 py-1.5 text-xs font-semibold text-slate-700 hover:text-red-900 hover:bg-slate-200/80 rounded-lg transition-colors flex items-center gap-1 cursor-pointer"
              title="View full job details"
            >
              <span>Details</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
            <button
              id={`apply-now-btn-${job.id}`}
              type="button"
              onClick={() => setIsQuickApplyOpen(true)}
              className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-lg shadow-xs hover:shadow-md transition-all flex items-center gap-1.5 cursor-pointer"
              title="Apply Now via WhatsApp"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Apply Now</span>
            </button>
          </div>
        </div>
      </div>

      {/* Quick Apply WhatsApp Modal */}
      <QuickApplyWhatsAppModal
        job={job}
        isOpen={isQuickApplyOpen}
        onClose={() => setIsQuickApplyOpen(false)}
      />
    </>
  );
};
