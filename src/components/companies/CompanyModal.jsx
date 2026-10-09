import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Save, Building2, Send } from 'lucide-react';
import { getNextScheduledTuesday } from '../../utils/companyUtils';

export function CompanyModal({ isOpen, onClose, onSave, companyToEdit }) {
  const [formData, setFormData] = useState({
    companyName: '',
    sector: 'IT & Services',
    location: '',
    hrEmail: '',
    phone: '',
    website: '',
    contactStatus: 'Not Contacted',
    emailSubject: 'Application: Full-Stack Developer Position',
    emailBody: '',
    scheduledFor: null,
    relanceSent: false,
  });

  const sectors = [
    'IT & Services',
    'Automotive & Logistics',
    'Government & Infrastructure',
    'Banking & Finance',
    'Engineering & Manufacturing',
    'Consulting & HR',
    'Telecom & Media',
    'Pharmaceutical & Healthcare',
    'Other Sector',
  ];

  useEffect(() => {
    if (companyToEdit) {
      setFormData({
        companyName: companyToEdit.companyName || '',
        sector: companyToEdit.sector || 'IT & Services',
        location: companyToEdit.location || '',
        hrEmail: companyToEdit.hrEmail || '',
        phone: companyToEdit.phone || '',
        website: companyToEdit.website || '',
        contactStatus: companyToEdit.contactStatus || 'Not Contacted',
        emailSubject: companyToEdit.emailSubject || 'Application: Full-Stack Developer Position',
        emailBody: companyToEdit.emailBody || '',
        scheduledFor: companyToEdit.scheduledFor || null,
        relanceSent: companyToEdit.relanceSent ?? false,
      });
    } else {
      setFormData({
        companyName: '',
        sector: 'IT & Services',
        location: '',
        hrEmail: '',
        phone: '',
        website: '',
        contactStatus: 'Not Contacted',
        emailSubject: 'Application: Full-Stack Developer Position',
        emailBody: '',
        scheduledFor: null,
        relanceSent: false,
      });
    }
  }, [companyToEdit, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.companyName.trim()) return;

    const payload = { ...formData };
    if (payload.contactStatus === 'CV Sent' && !payload.scheduledFor) {
      payload.scheduledFor = getNextScheduledTuesday().toISOString();
    } else if (payload.contactStatus === 'Not Contacted') {
      payload.scheduledFor = null;
      payload.relanceSent = false;
    }

    onSave(payload);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-slate-900/10 backdrop-blur-sm overflow-y-auto font-sans">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="w-full max-w-xl bg-white border border-slate-200 rounded-3xl shadow-xl overflow-hidden max-h-[90vh] flex flex-col"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-slate-200 bg-slate-50/80 flex-shrink-0">
            <h3 className="text-xl font-extrabold text-slate-900 flex items-center gap-3">
              <Building2 className="w-5 h-5 text-blue-600" />
              <span>{companyToEdit ? 'Edit Company Profile' : 'Add New Company to Directory'}</span>
            </h3>
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-200/60 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-7 space-y-5 overflow-y-auto flex-1">
            {/* Company Name */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                Company Name *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Renault Group Tanger, TMSA, Capgemini..."
                value={formData.companyName}
                onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                className="w-full px-4 py-2.5 bg-white border border-slate-300 rounded-xl text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 shadow-sm"
              />
            </div>

            {/* Grid 2-cols: Sector & Location */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="space-y-2">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Sector
                </label>
                <select
                  value={formData.sector}
                  onChange={(e) => setFormData({ ...formData, sector: e.target.value })}
                  className="w-full px-4 py-2.5 bg-white border border-slate-300 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 shadow-sm cursor-pointer"
                >
                  {sectors.map((sec) => (
                    <option key={sec} value={sec} className="bg-white text-slate-900">
                      {sec}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Location / Industrial Zone
                </label>
                <input
                  type="text"
                  placeholder="e.g. TFZ, Tanger Med, Casablanca..."
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="w-full px-4 py-2.5 bg-white border border-slate-300 rounded-xl text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 shadow-sm"
                />
              </div>
            </div>

            {/* Grid 2-cols: HR Email & Phone */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="space-y-2">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                  HR / Recruiter Email
                </label>
                <input
                  type="email"
                  placeholder="e.g. recrutement.tanger@company.com"
                  value={formData.hrEmail}
                  onChange={(e) => setFormData({ ...formData, hrEmail: e.target.value })}
                  className="w-full px-4 py-2.5 bg-white border border-slate-300 rounded-xl text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 shadow-sm font-mono"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Phone / WhatsApp Number
                </label>
                <input
                  type="text"
                  placeholder="e.g. 0612345678 or +212612345678"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-2.5 bg-white border border-slate-300 rounded-xl text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 shadow-sm font-mono"
                />
              </div>
            </div>

            {/* Email Subject */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                Default Email Subject
              </label>
              <input
                type="text"
                placeholder="e.g. Application: Full-Stack Developer Position"
                value={formData.emailSubject}
                onChange={(e) => setFormData({ ...formData, emailSubject: e.target.value })}
                className="w-full px-4 py-2.5 bg-white border border-slate-300 rounded-xl text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 shadow-sm"
              />
            </div>

            {/* Email Body Pitch */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                Default Email Body Pitch (Optional)
              </label>
              <textarea
                rows="5"
                placeholder="Hello, I am writing to express my interest in a Full-Stack Developer position..."
                value={formData.emailBody}
                onChange={(e) => setFormData({ ...formData, emailBody: e.target.value })}
                className="w-full px-4 py-3 bg-white border border-slate-300 rounded-xl text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 font-mono shadow-sm"
              />
            </div>

            {/* Website URL */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                Careers / Corporate Website
              </label>
              <input
                type="text"
                placeholder="e.g. https://www.company.com/careers"
                value={formData.website}
                onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                className="w-full px-4 py-2.5 bg-white border border-slate-300 rounded-xl text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 shadow-sm"
              />
            </div>

            {/* Contact Status */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                Spontaneous Contact Status
              </label>
              <div className="flex items-center gap-4">
                {['Not Contacted', 'CV Sent'].map((st) => (
                  <button
                    type="button"
                    key={st}
                    onClick={() => {
                      const isCvSent = st === 'CV Sent';
                      setFormData({
                        ...formData,
                        contactStatus: st,
                        scheduledFor: isCvSent ? (formData.scheduledFor || getNextScheduledTuesday().toISOString()) : null,
                        relanceSent: isCvSent ? formData.relanceSent : false,
                      });
                    }}
                    className={`flex-1 py-2.5 px-4 text-xs font-bold rounded-xl border text-center transition-all cursor-pointer ${
                      formData.contactStatus === st
                        ? 'bg-blue-50 text-blue-700 border-blue-200 shadow-sm'
                        : 'bg-white text-slate-600 border-slate-300 hover:bg-slate-50'
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>
            </div>

            {/* Follow-Up Status (when CV Sent) */}
            {formData.contactStatus === 'CV Sent' && (
              <div className="p-4 rounded-2xl bg-indigo-50/70 border border-indigo-200/80 flex items-center justify-between">
                <div className="space-y-0.5">
                  <span className="text-xs font-bold text-indigo-900 block">
                    Follow-Up Status
                  </span>
                  <span className="text-[11px] text-indigo-600 font-medium block">
                    Mark if a 7-day follow-up email has already been sent
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, relanceSent: !formData.relanceSent })}
                  className={`px-3.5 py-1.5 text-xs font-extrabold rounded-xl border flex items-center gap-1.5 transition-all cursor-pointer ${
                    formData.relanceSent
                      ? 'bg-indigo-600 text-white border-indigo-600 shadow-xs'
                      : 'bg-white text-indigo-700 border-indigo-300 hover:bg-indigo-50'
                  }`}
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{formData.relanceSent ? '✓ Follow-Up Sent' : 'Mark Follow-Up Sent'}</span>
                </button>
              </div>
            )}

            {/* Action Buttons */}
            <div className="pt-5 border-t border-slate-200 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-5 py-2.5 rounded-xl bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 font-bold text-xs shadow-sm transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs flex items-center gap-2 shadow-sm transition-all active:scale-95 cursor-pointer"
              >
                <Save className="w-4 h-4" />
                <span>{companyToEdit ? 'Save Changes' : 'Add Company'}</span>
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
