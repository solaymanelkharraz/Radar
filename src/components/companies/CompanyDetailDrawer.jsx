import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Building2,
  MapPin,
  Globe,
  Mail,
  Send,
  Copy,
  Check,
  Edit2,
  Trash2,
  ExternalLink,
  FileText,
  Phone,
  MessageCircle,
  Clock,
} from 'lucide-react';
import { handleOpenGmail, handleOpenGmailFollowUp } from '../../utils/gmailUtils';
import { sanitizeMoroccanPhone, getWhatsAppUrl, getNextScheduledTuesday, getRelancePipelineStatus } from '../../utils/companyUtils';

export function CompanyDetailDrawer({
  isOpen,
  onClose,
  company,
  onEdit,
  onDelete,
  onCopyEmail,
  onDraftGmail,
  onToggleRelanceSent,
  onStatusToggle,
}) {
  const [copied, setCopied] = useState(false);

  if (!isOpen || !company) return null;

  const {
    id,
    companyName,
    sector,
    location,
    hrEmail,
    phone,
    website,
    contactStatus,
    emailSubject,
    emailBody,
    scheduledFor,
    relanceSent,
  } = company;

  const cleanPhone = sanitizeMoroccanPhone(phone);
  const waUrl = getWhatsAppUrl(phone);
  const pipelineStatus = getRelancePipelineStatus(company);

  const isFollowUpDue = pipelineStatus.rawKey === 'RELANCE_DUE';
  const isEmailSent = scheduledFor || contactStatus === 'CV Sent';

  const handleCopy = () => {
    if (!hrEmail) return;
    navigator.clipboard.writeText(hrEmail);
    setCopied(true);
    if (onCopyEmail) onCopyEmail(hrEmail);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDraftClick = () => {
    handleOpenGmail(hrEmail, emailSubject, emailBody, companyName);
    const nextTuesdayISO = getNextScheduledTuesday().toISOString();
    if (onDraftGmail) {
      onDraftGmail(id, nextTuesdayISO);
    } else if (onStatusToggle) {
      onStatusToggle(id, 'CV Sent', nextTuesdayISO);
    }
  };

  const handleFollowUpClick = () => {
    handleOpenGmailFollowUp(hrEmail, companyName);
    if (onToggleRelanceSent) {
      onToggleRelanceSent(id, true);
    }
  };

  const handleRelanceClick = () => {
    if (onToggleRelanceSent) {
      onToggleRelanceSent(id, !relanceSent);
    }
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
              <span
                className={`px-3 py-1 rounded-full text-xs font-bold border ${pipelineStatus.bgColor} ${pipelineStatus.textColor} ${pipelineStatus.borderColor}`}
              >
                {pipelineStatus.label}
              </span>
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
                    <span>{location || 'Tangier, Morocco'}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Phone & Direct WhatsApp Section */}
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block">
                Direct Contact & WhatsApp Outreach
              </span>
              {cleanPhone ? (
                <div className="flex items-center justify-between p-3 rounded-xl bg-white border border-slate-200 shadow-xs">
                  <div className="flex items-center gap-2.5 text-xs font-mono font-semibold text-slate-800">
                    <Phone className="w-4 h-4 text-emerald-600" />
                    <span>{phone}</span>
                  </div>
                  <a
                    href={waUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-300 font-extrabold text-xs transition-all active:scale-95 shadow-2xs"
                  >
                    <MessageCircle className="w-4 h-4 text-emerald-600 fill-emerald-100" />
                    <span>Chat on WhatsApp ↗</span>
                  </a>
                </div>
              ) : (
                <p className="text-xs text-slate-400 italic">No contact number provided for this company.</p>
              )}
            </div>

            {/* Pipeline & Scheduled Tuesday Send Status */}
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block">
                Scheduled Tuesday Send & Relance Engine
              </span>
              <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-500 font-medium flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-slate-400" />
                    Current Pipeline Status:
                  </span>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-bold border ${pipelineStatus.bgColor} ${pipelineStatus.textColor} ${pipelineStatus.borderColor}`}
                  >
                    {pipelineStatus.label}
                  </span>
                </div>

                {scheduledFor && (
                  <p className="text-[11px] text-slate-500">
                    Scheduled Send Lock:{' '}
                    <strong className="text-slate-800 font-mono">
                      {new Date(scheduledFor).toLocaleString('en-US', {
                        weekday: 'short',
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </strong>
                  </p>
                )}

                <div className="pt-2 border-t border-slate-100">
                  <button
                    onClick={handleRelanceClick}
                    className={`w-full py-2.5 px-4 rounded-xl text-xs font-extrabold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                      relanceSent
                        ? 'bg-indigo-100 text-indigo-800 border border-indigo-300'
                        : 'bg-white hover:bg-indigo-50 text-indigo-700 border border-indigo-200 shadow-2xs'
                    }`}
                  >
                    <Send className="w-4 h-4 text-indigo-600" />
                    <span>{relanceSent ? '✓ Follow-Up Sent (Marked)' : 'Mark Follow-Up Sent'}</span>
                  </button>
                </div>
              </div>
            </div>

            {/* HR Contact & Gmail Pitching Box */}
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block">
                HR Contact & Web Gmail Drafting
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

                  {/* Smart Web Gmail Action Button */}
                  {!isEmailSent ? (
                    <button
                      onClick={handleDraftClick}
                      className="w-full py-3 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs flex items-center justify-center gap-2 shadow-sm transition-all active:scale-[0.98] cursor-pointer"
                    >
                      <Mail className="w-4 h-4 stroke-[2.5]" />
                      <span>Draft Initial Email in Web Gmail (Schedule Tuesday 09:30) ↗</span>
                    </button>
                  ) : isFollowUpDue ? (
                    <button
                      onClick={handleFollowUpClick}
                      className="w-full py-3 px-4 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-extrabold text-xs flex items-center justify-center gap-2 shadow-md ring-2 ring-rose-500/30 animate-pulse transition-all active:scale-[0.98] cursor-pointer"
                    >
                      <Send className="w-4 h-4 stroke-[2.5]" />
                      <span>🚨 Send Follow-Up Now (Web Gmail) ↗</span>
                    </button>
                  ) : relanceSent ? (
                    <div className="w-full py-2.5 px-4 rounded-xl bg-indigo-50 border border-indigo-200 text-indigo-700 font-bold text-xs flex items-center justify-center gap-2">
                      <Check className="w-4 h-4 text-indigo-600" />
                      <span>✓ Follow-Up Sent</span>
                    </div>
                  ) : (
                    <button
                      onClick={handleFollowUpClick}
                      className="w-full py-3 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-xs flex items-center justify-center gap-2 shadow-sm transition-all active:scale-[0.98] cursor-pointer"
                    >
                      <Send className="w-4 h-4 stroke-[2.5]" />
                      <span>Send Follow-Up in Web Gmail ↗</span>
                    </button>
                  )}
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
                  {emailSubject || "Application: Full-Stack Developer Position"}
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
