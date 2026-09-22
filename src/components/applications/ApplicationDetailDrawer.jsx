import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Calendar, CheckCircle, RotateCcw, Edit2, Trash2, FileText, Building2, AlertTriangle, Link2 } from 'lucide-react';
import { Badge } from '../ui/Badge';

export function ApplicationDetailDrawer({ isOpen, onClose, application, onEdit, onDelete, onToggleApplied }) {
  if (!isOpen || !application) return null;

  const { id, companyName, jobTitle, source, linkToApply, deadlineDate, isApplied, requirements, notes } = application;

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

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex justify-end">
        {/* Backdrop overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-slate-900/10 backdrop-blur-sm"
        />

        {/* Slide-over Drawer Panel */}
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="relative z-50 w-full max-w-xl h-full bg-white border-l border-slate-200 shadow-xl flex flex-col justify-between overflow-y-auto"
        >
          {/* Drawer Header */}
          <div className="p-6 border-b border-slate-200 bg-slate-50/80 flex items-center justify-between sticky top-0 z-10 backdrop-blur-md">
            <div className="flex items-center gap-3">
              <Badge variant={source}>{source || 'Spontaneous'}</Badge>
              {isUrgent && (
                <span className="flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-amber-100 text-amber-800 border border-amber-300 uppercase tracking-wider">
                  <AlertTriangle className="w-3 h-3 text-amber-600" />
                  Urgent
                </span>
              )}
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Drawer Content */}
          <div className="p-7 space-y-6 flex-1">
            {/* Title & Company */}
            <div className="space-y-2">
              <h2 className="text-2xl font-extrabold text-slate-900 leading-tight">
                {jobTitle}
              </h2>
              <div className="flex items-center gap-2 text-sm font-semibold text-slate-600">
                <Building2 className="w-4 h-4 text-slate-400" />
                <span>{companyName}</span>
              </div>
            </div>

            {/* Direct Offer Apply Link Button */}
            {linkToApply ? (
              <a
                href={linkToApply.startsWith('http') ? linkToApply : `https://${linkToApply}`}
                target="_blank"
                rel="noreferrer"
                className="w-full py-3 px-5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition-all active:scale-[0.98]"
              >
                <Link2 className="w-4 h-4 stroke-[2.5]" />
                <span>Open Direct Offer Link</span>
                <ExternalLink className="w-4 h-4 stroke-[2.5]" />
              </a>
            ) : (
              <div className="p-3.5 rounded-xl bg-slate-100 border border-slate-200 text-xs text-slate-500 italic">
                No direct apply link specified.
              </div>
            )}

            {/* Deadline & Urgency Box */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Deadline</span>
              <div className="flex items-center gap-2 text-xs">
                <Calendar className={`w-4 h-4 ${deadlineInfo.color}`} />
                <span className={`font-bold ${deadlineInfo.color}`}>
                  {deadlineDate ? deadlineDate : 'No deadline date'}
                </span>
                <span className={`text-[11px] ${isUrgent ? 'text-amber-800 font-bold' : 'text-slate-500'}`}>
                  ({deadlineInfo.text})
                </span>
              </div>
            </div>

            {/* Required Documents / Criteria Section */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-800">
                <FileText className="w-4 h-4 text-amber-600" />
                <span>Required Documents & Criteria</span>
              </div>
              <div className="p-4 rounded-xl bg-amber-50/60 border border-amber-200 text-xs text-slate-800 font-mono leading-relaxed whitespace-pre-line min-h-[100px]">
                {requirements || 'No specific document requirements listed.'}
              </div>
            </div>

            {/* Personal Notes Section */}
            <div className="space-y-2">
              <span className="block text-xs font-bold uppercase tracking-wider text-slate-500">
                Personal Notes
              </span>
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700 italic min-h-[80px]">
                {notes || 'No additional notes added.'}
              </div>
            </div>
          </div>

          {/* Drawer Footer Actions */}
          <div className="p-6 border-t border-slate-200 bg-slate-50/80 space-y-3 sticky bottom-0 z-10 backdrop-blur-md">
            {/* Mark as Applied Action Button */}
            {!isApplied ? (
              <button
                onClick={() => {
                  onToggleApplied(id, true);
                  onClose();
                }}
                className="w-full py-3 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs flex items-center justify-center gap-2 shadow-sm transition-all active:scale-[0.98] cursor-pointer"
              >
                <CheckCircle className="w-4 h-4 stroke-[2.5]" />
                <span>Mark as Applied & Archive</span>
              </button>
            ) : (
              <button
                onClick={() => {
                  onToggleApplied(id, false);
                  onClose();
                }}
                className="w-full py-3 px-4 rounded-xl bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 font-bold text-xs flex items-center justify-center gap-2 transition-all active:scale-[0.98] cursor-pointer"
              >
                <RotateCcw className="w-4 h-4 text-slate-500" />
                <span>Move Back to Pending</span>
              </button>
            )}

            {/* Edit & Delete Actions */}
            <div className="flex items-center gap-3 pt-1">
              <button
                onClick={() => {
                  onEdit(application);
                  onClose();
                }}
                className="flex-1 py-2.5 px-3 rounded-xl bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 font-bold text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <Edit2 className="w-4 h-4 text-slate-500" />
                <span>Edit Details</span>
              </button>

              <button
                onClick={() => {
                  onDelete(id);
                  onClose();
                }}
                className="flex-1 py-2.5 px-3 rounded-xl bg-white border border-rose-200 text-rose-600 hover:bg-rose-50 font-bold text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <Trash2 className="w-4 h-4" />
                <span>Delete</span>
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
