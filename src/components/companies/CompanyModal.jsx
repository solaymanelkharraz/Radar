import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Save, Building2 } from 'lucide-react';

export function CompanyModal({ isOpen, onClose, onSave, companyToEdit }) {
  const [formData, setFormData] = useState({
    companyName: '',
    sector: 'IT & Services',
    location: '',
    hrEmail: '',
    website: '',
    contactStatus: 'Not Contacted',
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
        website: companyToEdit.website || '',
        contactStatus: companyToEdit.contactStatus || 'Not Contacted',
      });
    } else {
      setFormData({
        companyName: '',
        sector: 'IT & Services',
        location: '',
        hrEmail: '',
        website: '',
        contactStatus: 'Not Contacted',
      });
    }
  }, [companyToEdit, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.companyName.trim()) return;
    onSave(formData);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-slate-900/10 backdrop-blur-sm overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="w-full max-w-xl bg-white border border-slate-200 rounded-3xl shadow-xl overflow-hidden"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-slate-200 bg-slate-50/80">
            <h3 className="text-xl font-extrabold text-slate-900 flex items-center gap-3">
              <Building2 className="w-5 h-5 text-blue-600" />
              <span>{companyToEdit ? 'Edit Company Profile' : 'Add New Company to Directory'}</span>
            </h3>
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-200/60 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-7 space-y-5">
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

            {/* HR Email */}
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
                    onClick={() => setFormData({ ...formData, contactStatus: st })}
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
