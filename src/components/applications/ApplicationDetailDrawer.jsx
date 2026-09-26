import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  ExternalLink,
  Calendar,
  CheckCircle,
  RotateCcw,
  Edit2,
  Trash2,
  FileText,
  Building2,
  AlertTriangle,
  Link2,
  Globe,
  ArrowUpRight,
} from 'lucide-react';
import { Badge } from '../ui/Badge';
import { PriorityBadge } from '../ui/PriorityBadge';

export function ApplicationDetailDrawer({
  isOpen,
  onClose,
  application,
  onEdit,
  onDelete,
  onToggleApplied,
}) {
  const [isEditingResponseUrl, setIsEditingResponseUrl] = useState(false);
  const [responseUrlInput, setResponseUrlInput] = useState('');

  useEffect(() => {
    if (application) {
      setResponseUrlInput(application.responseUrl || '');
      setIsEditingResponseUrl(false);
    }
  }, [application]);

  if (!isOpen || !application) return null;

  const {
    id,
    companyName,
    jobTitle,
    source,
    priority = 'Medium',
    linkToApply,
    responseUrl,
    deadlineDate,
    isApplied,
    requirements,
    notes,
  } = application;

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

  const handleSaveResponseUrl = () => {
    const trimmed = responseUrlInput.trim();
    onEdit({
      ...application,
      responseUrl: trimmed,
    });
    setIsEditingResponseUrl(false);
  };

  const handleMarkApplied = () => {
    // If no response URL is set yet, open editing mode so user can set it or proceed
    onToggleApplied(id, true);
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex justify-end font-sans">
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
            <div className="flex items-center gap-2.5">
              <Badge variant={source}>{source || 'Spontaneous'}</Badge>
              <PriorityBadge priority={priority} />
              {isUrgent && (
                <span className="flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-amber-100 text-amber-800 border border-amber-300 uppercase tracking-wider">
                  <AlertTriangle className="w-3 h-3 text-amber-600" />
                  Urgent
                </span>
              )}
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition-colors cursor-pointer"
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
                className="w-full py-3 px-5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-xs transition-all active:scale-[0.98]"
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

            {/* RESPONSE / RESULTS TRACKING PORTAL (NEW!) */}
            <div className="space-y-2.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-800">
                  <Globe className="w-4 h-4 text-emerald-600" />
                  <span>Response & Candidate Results Portal</span>
                </div>
                {!isEditingResponseUrl && (
                  <button
                    onClick={() => setIsEditingResponseUrl(true)}
                    className="text-[11px] font-extrabold text-emerald-700 hover:text-emerald-800 bg-emerald-50 hover:bg-emerald-100 px-2.5 py-1 rounded-lg border border-emerald-200 transition-all cursor-pointer flex items-center gap-1"
                  >
                    <Edit2 className="w-3 h-3" />
                    <span>{responseUrl ? 'Edit Link' : '+ Add Link'}</span>
                  </button>
                )}
              </div>

              {isEditingResponseUrl ? (
                <div className="p-3.5 rounded-xl bg-emerald-50/60 border border-emerald-300 space-y-2.5">
                  <label className="block text-[11px] font-bold text-slate-700">
                    Paste URL where results, exam schedules, or candidate updates will be posted:
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      placeholder="https://www.emploi-public.ma/results or candidate portal..."
                      value={responseUrlInput}
                      onChange={(e) => setResponseUrlInput(e.target.value)}
                      className="flex-1 px-3 py-2 bg-white border border-slate-300 rounded-lg text-xs font-mono text-slate-900 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                    />
                    <button
                      onClick={handleSaveResponseUrl}
                      className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs rounded-lg transition-all shadow-xs cursor-pointer"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => {
                        setResponseUrlInput(responseUrl || '');
                        setIsEditingResponseUrl(false);
                      }}
                      className="px-3 py-2 bg-white border border-slate-300 hover:bg-slate-100 text-slate-600 font-bold text-xs rounded-lg transition-all cursor-pointer"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : responseUrl ? (
                <div className="p-4 rounded-xl bg-emerald-50/60 border border-emerald-200 space-y-3">
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2 min-w-0">
                      <Globe className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                      <span className="text-xs font-semibold text-slate-800 truncate font-mono">
                        {responseUrl}
                      </span>
                    </div>
                  </div>
                  <a
                    href={responseUrl.startsWith('http') ? responseUrl : `https://${responseUrl}`}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs flex items-center justify-center gap-2 shadow-xs transition-all active:scale-[0.98] cursor-pointer"
                  >
                    <span>Open Response & Results Portal</span>
                    <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
                  </a>
                </div>
              ) : (
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between text-xs text-slate-500">
                  <span>No response tracking link set for exam results or updates.</span>
                  <button
                    onClick={() => setIsEditingResponseUrl(true)}
                    className="text-xs font-bold text-emerald-700 hover:text-emerald-800 bg-emerald-50 hover:bg-emerald-100 px-3 py-1.5 rounded-lg border border-emerald-200 transition-all cursor-pointer flex items-center gap-1"
                  >
                    <span>+ Add Link</span>
                  </button>
                </div>
              )}
            </div>

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
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-700">
                <FileText className="w-4 h-4 text-slate-400" />
                <span>Required Documents & Criteria</span>
              </div>
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 font-mono leading-relaxed whitespace-pre-line min-h-[100px]">
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
                onClick={handleMarkApplied}
                className="w-full py-3 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs flex items-center justify-center gap-2 shadow-xs transition-all active:scale-[0.98] cursor-pointer"
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
