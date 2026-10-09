import React, { useState } from 'react';
import { Copy, Check, MapPin, Building2, ChevronRight, Mail, Phone, MessageCircle, Send, Clock, Calendar } from 'lucide-react';
import { handleOpenGmail } from '../../utils/gmailUtils';
import { sanitizeMoroccanPhone, getWhatsAppUrl, getNextScheduledTuesday, getRelancePipelineStatus } from '../../utils/companyUtils';

export function CompanyRow({
  company,
  onClick,
  onCopyEmail,
  onDraftGmail,
  onToggleRelanceSent,
  onStatusToggle,
}) {
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

  const [copied, setCopied] = useState(false);

  const cleanPhone = sanitizeMoroccanPhone(phone);
  const waUrl = getWhatsAppUrl(phone);
  const pipelineStatus = getRelancePipelineStatus(company);

  const handleCopy = (e) => {
    e.stopPropagation();
    if (!hrEmail) return;
    navigator.clipboard.writeText(hrEmail);
    setCopied(true);
    if (onCopyEmail) onCopyEmail(hrEmail);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDraftClick = (e) => {
    e.stopPropagation();
    // 1. Open Web Gmail composer
    handleOpenGmail(hrEmail, emailSubject, emailBody, companyName);

    // 2. Trigger Tuesday schedule engine
    const nextTuesdayISO = getNextScheduledTuesday().toISOString();
    if (onDraftGmail) {
      onDraftGmail(id, nextTuesdayISO);
    } else if (onStatusToggle) {
      onStatusToggle(id, 'CV Sent', nextTuesdayISO);
    }
  };

  const handleRelanceClick = (e) => {
    e.stopPropagation();
    if (onToggleRelanceSent) {
      onToggleRelanceSent(id, !relanceSent);
    }
  };

  return (
    <tr
      onClick={onClick}
      className="border-b border-slate-200 hover:bg-slate-50/90 transition-colors group cursor-pointer"
    >
      {/* 1. Company Name & Website */}
      <td className="py-4 px-6">
        <div className="flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-2xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600 flex-shrink-0">
            <Building2 className="w-5 h-5" />
          </div>
          <div className="space-y-0.5">
            <div className="font-bold text-slate-900 text-sm tracking-tight group-hover:text-blue-600 transition-colors">
              {companyName}
            </div>
            {website && (
              <span className="text-[11px] text-slate-500 flex items-center gap-1">
                <span className="truncate max-w-[170px]">{website.replace(/^https?:\/\//, '')}</span>
              </span>
            )}
          </div>
        </div>
      </td>

      {/* 2. Sector & Location */}
      <td className="py-4 px-6 text-xs space-y-1">
        <span className="px-2.5 py-0.5 rounded-lg bg-slate-100 border border-slate-200 font-semibold text-slate-700 inline-block">
          {sector || 'IT & Services'}
        </span>
        <div className="flex items-center gap-1.5 text-[11px] text-slate-500 font-medium">
          <MapPin className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
          <span>{location || 'Tangier, Morocco'}</span>
        </div>
      </td>

      {/* 3. Phone & Direct WhatsApp Action Link */}
      <td className="py-4 px-6 text-xs">
        {cleanPhone ? (
          <div className="flex items-center gap-2">
            <span className="font-mono text-slate-800 font-medium text-xs">{phone}</span>
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              title="Open WhatsApp chat with pre-filled pitch"
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-300 font-extrabold text-[11px] transition-all active:scale-95 cursor-pointer shadow-2xs"
            >
              <MessageCircle className="w-3.5 h-3.5 text-emerald-600 fill-emerald-100" />
              <span>WhatsApp ↗</span>
            </a>
          </div>
        ) : (
          <span className="text-slate-400 italic text-xs">No phone saved</span>
        )}
      </td>

      {/* 4. Scheduled Tuesday Send & 7-Day Relance Engine Status */}
      <td className="py-4 px-6 text-xs">
        <div className="space-y-1.5">
          <span
            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border transition-all ${pipelineStatus.bgColor} ${pipelineStatus.textColor} ${pipelineStatus.borderColor} ${
              pipelineStatus.isHighlighted ? 'ring-2 ring-rose-400/30 animate-pulse' : ''
            }`}
          >
            <Clock className="w-3.5 h-3.5 flex-shrink-0" />
            <span>{pipelineStatus.label}</span>
          </span>

          {/* Quick Action: Marquer Relance Envoyée */}
          {(pipelineStatus.rawKey === 'RELANCE_DUE' || pipelineStatus.rawKey === 'EMAIL_1_SENT' || relanceSent) && (
            <div>
              <button
                onClick={handleRelanceClick}
                title={relanceSent ? "Relance mark enabled" : "Click to mark follow-up email as sent"}
                className={`inline-flex items-center gap-1 text-[10px] font-extrabold px-2.5 py-0.5 rounded-lg border transition-all cursor-pointer ${
                  relanceSent
                    ? 'bg-indigo-100 text-indigo-800 border-indigo-300'
                    : 'bg-white hover:bg-indigo-50 text-indigo-700 border-indigo-200 shadow-2xs'
                }`}
              >
                <Send className="w-3 h-3 text-indigo-600" />
                <span>{relanceSent ? '✓ Relance Envoyée' : '+ Marquer Relance Envoyée'}</span>
              </button>
            </div>
          )}
        </div>
      </td>

      {/* 5. HR Email & 1-Click Web Gmail Draft */}
      <td className="py-4 px-6 text-xs">
        {hrEmail ? (
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-slate-800 font-mono text-xs truncate max-w-[150px]">{hrEmail}</span>
            <div className="flex items-center gap-1.5">
              <button
                onClick={handleCopy}
                title="Copy HR Email"
                className={`p-1.5 rounded-lg border transition-all cursor-pointer ${
                  copied
                    ? 'bg-emerald-50 text-emerald-700 border-emerald-300'
                    : 'bg-white text-slate-400 border-slate-300 hover:text-blue-600 hover:bg-slate-50'
                }`}
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              </button>

              <button
                onClick={handleDraftClick}
                title="Open Web Gmail draft and schedule for next Tuesday at 09:30 AM"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-[11px] transition-all active:scale-95 shadow-xs cursor-pointer"
              >
                <Mail className="w-3.5 h-3.5 text-white" />
                <span>Draft in Web Gmail</span>
              </button>
            </div>
          </div>
        ) : (
          <span className="text-slate-400 italic">No email</span>
        )}
      </td>

      {/* 6. Details Arrow */}
      <td className="py-4 px-6 text-xs text-right">
        <div className="flex items-center justify-end text-slate-400 group-hover:text-blue-600 transition-colors gap-1 font-semibold">
          <span>Details</span>
          <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
        </div>
      </td>
    </tr>
  );
}
