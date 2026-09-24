import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Save, Briefcase, Link2, FileText, CheckCircle2, Clock } from 'lucide-react';

export function ApplicationModal({ isOpen, onClose, onSave, applicationToEdit, companiesList = [] }) {
  const sources = [
    'LinkedIn',
    'Indeed',
    'Company Portal',
    'Emploi-Public',
    'ReKrute',
    'Anapec',
    'Remote Board',
    'Spontaneous',
  ];

  const statuses = [
    { label: 'To Apply', value: 'To Apply' },
    { label: 'Applied', value: 'Applied' },
  ];

  const [formData, setFormData] = useState({
    companyName: '',
    jobTitle: '',
    source: 'LinkedIn',
    status: 'To Apply',
    linkToApply: '',
    deadlineDate: '',
    requirements: '',
    notes: '',
  });

  useEffect(() => {
    if (applicationToEdit) {
      setFormData({
        companyName: applicationToEdit.companyName || '',
        jobTitle: applicationToEdit.jobTitle || '',
        source: applicationToEdit.source || 'LinkedIn',
        status: applicationToEdit.isApplied ? 'Applied' : 'To Apply',
        linkToApply: applicationToEdit.linkToApply || '',
        deadlineDate: applicationToEdit.deadlineDate || '',
        requirements: applicationToEdit.requirements || '',
        notes: applicationToEdit.notes || '',
      });
    } else {
      setFormData({
        companyName: '',
        jobTitle: '',
        source: 'LinkedIn',
        status: 'To Apply',
        linkToApply: '',
        deadlineDate: new Date().toISOString().split('T')[0],
        requirements: '',
        notes: '',
      });
    }
  }, [applicationToEdit, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.companyName.trim() || !formData.jobTitle.trim()) return;

    onSave({
      companyName: formData.companyName.trim(),
      jobTitle: formData.jobTitle.trim(),
      source: formData.source,
      isApplied: formData.status === 'Applied',
      linkToApply: formData.linkToApply.trim(),
      deadlineDate: formData.deadlineDate,
      requirements: formData.requirements.trim(),
      notes: formData.notes.trim(),
    });
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-slate-900/10 backdrop-blur-sm overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="w-full max-w-xl bg-white border border-slate-200 rounded-3xl shadow-xl overflow-hidden font-sans"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-slate-200 bg-slate-50/80">
            <h3 className="text-xl font-extrabold text-slate-900 flex items-center gap-3">
              <Briefcase className="w-5 h-5 text-blue-600" />
              <span>{applicationToEdit ? 'Edit Opportunity' : 'Add Opportunity to Vault'}</span>
            </h3>
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-200/60 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-7 space-y-5">
            {/* Job Title */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                Job / Concours Title *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Ingénieur d'État en Informatique, Full-Stack Developer..."
                value={formData.jobTitle}
                onChange={(e) => setFormData({ ...formData, jobTitle: e.target.value })}
                className="w-full px-4 py-2.5 bg-white border border-slate-300 rounded-xl text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 shadow-xs"
              />
            </div>

            {/* Company Name */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                Company / Organization Name *
              </label>
              <input
                type="text"
                required
                list="companies-list"
                placeholder="e.g. Ministère de la Transition Numérique, Renault Group Tanger..."
                value={formData.companyName}
                onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                className="w-full px-4 py-2.5 bg-white border border-slate-300 rounded-xl text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 shadow-xs"
              />
              <datalist id="companies-list">
                {companiesList.map((comp) => (
                  <option key={comp.id} value={comp.companyName} />
                ))}
              </datalist>
            </div>

            {/* Grid 3-cols: Source Channel, Status & Deadline Date */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {/* Source Channel */}
              <div className="space-y-2">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Source Channel
                </label>
                <select
                  value={formData.source}
                  onChange={(e) => setFormData({ ...formData, source: e.target.value })}
                  className="w-full px-3 py-2.5 bg-white border border-slate-300 rounded-xl text-xs text-slate-900 font-semibold focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 shadow-xs cursor-pointer"
                >
                  {sources.map((src) => (
                    <option key={src} value={src} className="bg-white text-slate-900">
                      {src}
                    </option>
                  ))}
                </select>
              </div>

              {/* Status Dropdown */}
              <div className="space-y-2">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Status
                </label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  className="w-full px-3 py-2.5 bg-white border border-slate-300 rounded-xl text-xs font-bold focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 shadow-xs cursor-pointer text-slate-900"
                >
                  {statuses.map((st) => (
                    <option key={st.value} value={st.value} className="bg-white text-slate-900">
                      {st.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Deadline Date */}
              <div className="space-y-2">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Deadline Date
                </label>
                <input
                  type="date"
                  value={formData.deadlineDate}
                  onChange={(e) => setFormData({ ...formData, deadlineDate: e.target.value })}
                  className="w-full px-3 py-2.5 bg-white border border-slate-300 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 shadow-xs"
                />
              </div>
            </div>

            {/* Link to Apply */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                Direct Offer Link (URL)
              </label>
              <div className="relative">
                <Link2 className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="https://www.emploi-public.ma/fr/concours..."
                  value={formData.linkToApply}
                  onChange={(e) => setFormData({ ...formData, linkToApply: e.target.value })}
                  className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-300 rounded-xl text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 shadow-xs font-mono"
                />
              </div>
            </div>

            {/* Required Documents & Criteria (Optional) */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                <FileText className="w-4 h-4 text-slate-400" />
                Required Documents & Criteria (Optional)
              </label>
              <textarea
                rows="3"
                placeholder="Paste key requirements or documents needed (CIN, degree copy, cover letter)..."
                value={formData.requirements}
                onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
                className="w-full px-4 py-3 bg-white border border-slate-300 rounded-xl text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 font-mono shadow-xs"
              />
            </div>

            {/* Additional Notes */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                Additional Notes (Optional)
              </label>
              <textarea
                rows="2"
                placeholder="Platform login notes, interview dates, submission details..."
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                className="w-full px-4 py-2.5 bg-white border border-slate-300 rounded-xl text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 shadow-xs"
              />
            </div>

            {/* Action Buttons */}
            <div className="pt-5 border-t border-slate-200 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-5 py-2.5 rounded-xl bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 font-bold text-xs shadow-xs transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs flex items-center gap-2 shadow-xs transition-all active:scale-95 cursor-pointer"
              >
                <Save className="w-4 h-4" />
                <span>{applicationToEdit ? 'Save Changes' : 'Add to Vault'}</span>
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
