import React from 'react';
import { motion } from 'framer-motion';
import { Building2, Calendar, AlertTriangle, ChevronRight, Globe, CheckCircle2 } from 'lucide-react';
import { Badge } from '../ui/Badge';
import { PriorityBadge } from '../ui/PriorityBadge';

export function ApplicationCard({ application, onClick }) {
  const { companyName, jobTitle, source, priority = 'Medium', deadlineDate, isApplied, responseUrl } = application;

  // Calculate deadline urgency
  const calculateDeadline = (dateStr) => {
    if (!dateStr) return { text: 'No deadline', color: 'text-slate-500', isUrgent: false };
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const deadline = new Date(dateStr);
    const diffTime = deadline - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 0) {
      return { text: `Expired (${Math.abs(diffDays)}d ago)`, color: 'text-amber-700 font-bold', isUrgent: true };
    } else if (diffDays === 0) {
      return { text: 'Due Today!', color: 'text-amber-700 font-extrabold', isUrgent: true };
    } else if (diffDays <= 3) {
      return { text: `${diffDays} days left`, color: 'text-amber-700 font-bold', isUrgent: true };
    } else {
      return { text: `${diffDays} days left`, color: 'text-slate-600', isUrgent: false };
    }
  };

  const deadlineInfo = calculateDeadline(deadlineDate);
  const isUrgent = deadlineInfo.isUrgent && !isApplied;

  // Light Mode card styling - full 100% opacity for both active and archived cards
  const cardStyleClass = isApplied
    ? 'bg-slate-50 border-slate-200 shadow-xs hover:border-slate-300'
    : isUrgent
    ? 'bg-amber-50/40 border-amber-300 shadow-xs hover:border-amber-400'
    : 'bg-white border-slate-200 shadow-xs hover:border-blue-300 hover:shadow-md';

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.15 }}
    >
      <div
        onClick={onClick}
        className={`group rounded-2xl p-5 border transition-all duration-200 cursor-pointer flex flex-col justify-between space-y-4 ${cardStyleClass}`}
      >
        <div className="space-y-3">
          {/* Top Row: Source badge, Priority badge & Status/Urgency indicators */}
          <div className="flex items-center justify-between gap-2 flex-wrap">
            <div className="flex items-center gap-2 flex-wrap">
              <Badge variant={source}>{source || 'Spontaneous'}</Badge>
              <PriorityBadge priority={priority} />
            </div>

            <div className="flex items-center gap-1.5 flex-wrap">
              {isApplied && (
                <span className="flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-emerald-100 text-emerald-800 border border-emerald-300 uppercase tracking-wider">
                  <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                  Applied
                </span>
              )}

              {responseUrl && (
                <span
                  className="flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-emerald-50 text-emerald-700 border border-emerald-200"
                  title="Response / Results tracking URL attached"
                >
                  <Globe className="w-3 h-3 text-emerald-600" />
                  <span>Results Link</span>
                </span>
              )}

              {isUrgent && (
                <span className="flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-amber-100 text-amber-800 border border-amber-300 uppercase tracking-wider">
                  <AlertTriangle className="w-3 h-3 text-amber-600" />
                  Urgent
                </span>
              )}
            </div>
          </div>

          {/* Job Title */}
          <h3 className="text-base font-bold text-slate-900 group-hover:text-blue-600 leading-snug line-clamp-2 transition-colors">
            {jobTitle}
          </h3>

          {/* Company Name */}
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-600">
            <Building2 className="w-4 h-4 text-slate-400 flex-shrink-0" />
            <span className="truncate">{companyName}</span>
          </div>
        </div>

        {/* Card Footer: Deadline & Arrow Indicator */}
        <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs">
            <Calendar className={`w-3.5 h-3.5 ${deadlineInfo.color}`} />
            <span className={`font-semibold ${deadlineInfo.color}`}>
              {deadlineDate ? deadlineDate : 'No date'}
            </span>
            <span className={`text-[11px] ${isUrgent ? 'text-amber-800 font-bold' : 'text-slate-500'}`}>
              ({deadlineInfo.text})
            </span>
          </div>

          <div className="flex items-center text-xs text-slate-400 group-hover:text-blue-600 font-semibold gap-0.5 transition-colors">
            <span>View</span>
            <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </div>
        </div>
      </div>
    </motion.div>
  );
}
