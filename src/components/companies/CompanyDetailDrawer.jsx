import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Building2, MapPin, Globe, Mail, Send, Copy, Check, Edit2, Trash2, ExternalLink, FileText } from 'lucide-react';
import { Badge } from '../ui/Badge';
import { handleOpenGmail } from '../../utils/gmailUtils';

export function CompanyDetailDrawer({ isOpen, onClose, company, onEdit, onDelete, onCopyEmail, onStatusToggle }) {
  const [copied, setCopied] = useState(false);

  if (!isOpen || !company) return null;

  const { id, companyName, sector, location, hrEmail, website, contactStatus, emailSubject, emailBody } = company;

  const handleCopy = () => {
    if (!hrEmail) return;
    navigator.clipboard.writeText(hrEmail);
    setCopied(true);
    if (onCopyEmail) onCopyEmail(hrEmail);
    setTimeout(() => setCopied(false), 2000);
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
            <div className="flex items-center gap-3">
              <span className="px-3 py-1.5 rounded-xl bg-blue-50 border border-blue-200 text-blue-700 font-bold text-xs">
                {sector || 'Corporate'}
              </span>
              <button
                onClick={() => onStatusToggle(id, contactStatus === 'CV Sent' ? 'Not Contacted' : 'CV Sent')}
                className="focus:outline-none cursor-pointer"
              >
                <Badge variant={contactStatus}>{contactStatus || 'Not Contacted'}</Badge>
              </button>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Drawer Content */}
          <div className="p-7 space-y-7 flex-1">
            {/* Title & Location */}
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600 flex-shrink-0">
                  <Building2 className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-2xl font-extrabold text-slate-900 leading-tight">
                    {companyName}
                  </h2>
                  <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 mt-1">
                    <MapPin className="w-4 h-4 text-slate-400" />
                    <span>{location || 'Morocco'}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* HR Contact & Gmail Pitching Box */}
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block">
                HR Contact & Gmail Drafting
              </span>

              {hrEmail ? (
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-3 p-3 rounded-xl bg-white border border-slate-200 shadow-sm">
                    <div className="flex items-center gap-2 text-xs font-mono text-slate-800 min-w-0 truncate">
                      <Mail className="w-4 h-4 text-blue-600 flex-shrink-0" />
                      <span className="truncate">{hrEmail}</span>
                    </div>

                    <button
                      onClick={handleCopy}
                      className={`p-2 rounded-xl border transition-all cursor-pointer ${
                        copied
                          ? 'bg-emerald-50 text-emerald-700 border-emerald-300'
                          : 'bg-white text-slate-500 border-slate-300 hover:text-blue-600 hover:bg-slate-50'
                      }`}
                    >
                      {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                    </button>
                  </div>

                  {/* Draft in Web Gmail Button */}
                  <button
                    onClick={() => handleOpenGmail(hrEmail, emailSubject, emailBody, companyName)}
                    className="w-full py-3 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs flex items-center justify-center gap-2 shadow-sm transition-all active:scale-[0.98] cursor-pointer"
                  >
                    <Mail className="w-4 h-4 stroke-[2.5]" />
                    <span>Draft in Web Gmail ↗</span>
                  </button>
                </div>
              ) : (
                <p className="text-xs text-slate-400 italic">No HR email recorded for this company.</p>
              )}
            </div>

            {/* Email Subject & Pitch Body Preview */}
            <div className="space-y-3 p-5 rounded-2xl bg-slate-50 border border-slate-200">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-700">
                <FileText className="w-4 h-4 text-slate-400" />
                <span>Configured Email Subject & Pitch</span>
              </div>
              <div className="space-y-2">
                <div className="text-xs font-semibold text-slate-900 bg-white p-3 rounded-xl border border-slate-200">
                  <span className="text-slate-400 font-normal">Subject: </span>
                  {emailSubject || "Candidature Spontanée : Développeur Full-Stack"}
                </div>
                {emailBody && (
                  <div className="text-xs text-slate-700 bg-white p-3 rounded-xl border border-slate-200 font-mono whitespace-pre-line leading-relaxed max-h-[140px] overflow-y-auto">
                    {emailBody}
                  </div>
                )}
              </div>
            </div>

            {/* Corporate Website Link */}
            {website && (
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs text-slate-700 font-medium">
                  <Globe className="w-4 h-4 text-slate-400" />
                  <span>Careers / Corporate Website</span>
                </div>
                <a
                  href={website.startsWith('http') ? website : `https://${website}`}
                  target="_blank"
                  rel="noreferrer"
                  className="px-3.5 py-1.5 rounded-xl bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 font-semibold text-xs flex items-center gap-1.5 shadow-sm"
                >
                  <span>Visit Site</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            )}
          </div>

          {/* Drawer Footer Actions */}
          <div className="p-6 border-t border-slate-200 bg-slate-50/80 flex items-center gap-3 sticky bottom-0 z-10 backdrop-blur-md">
            <button
              onClick={() => {
                onEdit(company);
                onClose();
              }}
              className="flex-1 py-2.5 px-4 rounded-xl bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 font-bold text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
              <Edit2 className="w-4 h-4 text-slate-500" />
              <span>Edit Company</span>
            </button>

            <button
              onClick={() => {
                onDelete(id);
                onClose();
              }}
              className="flex-1 py-2.5 px-4 rounded-xl bg-white border border-rose-200 hover:bg-rose-50 text-rose-600 font-bold text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
              <Trash2 className="w-4 h-4" />
              <span>Delete</span>
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
