import React from 'react';
import { Building2, ChevronRight, Mail, Send, Clock, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { handleOpenGmail, handleOpenGmailFollowUp } from '../../utils/gmailUtils';
import { getNextScheduledTuesday, getRelancePipelineStatus } from '../../utils/companyUtils';

export function CompanyRow({
  company,
  onClick,
  onDraftGmail,
  onToggleRelanceSent,
  onStatusToggle,
}) {
  const {
    id,
    companyName,
    sector,
    hrEmail,
    website,
    emailSubject,
    emailBody,
    scheduledFor,
    relanceSent,
  } = company;

  const pipelineStatus = getRelancePipelineStatus(company);

  // Initial Email Draft Click
  const handleInitialDraftClick = (e) => {
    e.stopPropagation();
    handleOpenGmail(hrEmail, emailSubject, emailBody, companyName);
    const nextTuesdayISO = getNextScheduledTuesday().toISOString();
    if (onDraftGmail) {
      onDraftGmail(id, nextTuesdayISO);
    } else if (onStatusToggle) {
      onStatusToggle(id, 'CV Sent', nextTuesdayISO);
    }
  };

  // Follow-Up (Relance) Draft Click
  const handleFollowUpClick = (e) => {
    e.stopPropagation();
    handleOpenGmailFollowUp(hrEmail, companyName);
    if (onToggleRelanceSent) {
      onToggleRelanceSent(id, true);
    }
  };

  const isFollowUpDue = pipelineStatus.rawKey === 'RELANCE_DUE';
  const isEmailSent = scheduledFor || company.contactStatus === 'CV Sent';

  return (
    <tr
      onClick={onClick}
      className={`border-b border-slate-200 transition-colors group cursor-pointer ${
        isFollowUpDue ? 'bg-rose-50/50 hover:bg-rose-50' : 'hover:bg-slate-50/90'
      }`}
    >
      {/* 1. Company Name & Website */}
      <td className="py-4 px-6">
        <div className="flex items-center gap-3.5">
          <div className={`w-10 h-10 rounded-2xl border flex items-center justify-center flex-shrink-0 ${
            isFollowUpDue ? 'bg-rose-100 border-rose-300 text-rose-600' : 'bg-blue-50 border-blue-200 text-blue-600'
          }`}>
            <Building2 className="w-5 h-5" />
          </div>
          <div className="space-y-0.5 min-w-0">
            <div className="font-bold text-slate-900 text-sm tracking-tight group-hover:text-blue-600 transition-colors truncate flex items-center gap-2">
              <span>{companyName}</span>
              {isFollowUpDue && (
                <span className="inline-flex items-center gap-1 text-[10px] font-extrabold uppercase bg-rose-500 text-white px-2 py-0.5 rounded-full animate-bounce">
                  <AlertTriangle className="w-3 h-3" /> Relance Time!
                </span>
              )}
            </div>
            {website && (
              <span className="text-[11px] text-slate-500 block truncate max-w-[190px]">
                {website.replace(/^https?:\/\//, '')}
              </span>
            )}
          </div>
        </div>
      </td>

      {/* 2. Sector */}
      <td className="py-4 px-6 text-xs">
        <span className="px-3 py-1 rounded-xl bg-slate-100 border border-slate-200 font-semibold text-slate-700 inline-block shadow-2xs">
          {sector || 'IT & Services'}
        </span>
      </td>

      {/* 3. SEPARATE COLUMN: Pipeline Status */}
      <td className="py-4 px-6 text-xs">
        <span
          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border transition-all ${pipelineStatus.bgColor} ${pipelineStatus.textColor} ${pipelineStatus.borderColor} ${
            pipelineStatus.isHighlighted ? 'ring-2 ring-rose-400/40 animate-pulse shadow-sm' : ''
          }`}
        >
          <Clock className="w-3.5 h-3.5 flex-shrink-0" />
          <span>{pipelineStatus.label}</span>
        </span>
      </td>

      {/* 4. SEPARATE COLUMN: Smart Gmail Action Button */}
      <td className="py-4 px-6 text-xs">
        {hrEmail ? (
          <div>
            {!isEmailSent ? (
              /* State 1: Initial Email Draft */
              <button
                onClick={handleInitialDraftClick}
                title="Draft initial email in Web Gmail & lock to Tuesday 09:30 AM send"
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-[11px] transition-all active:scale-95 shadow-xs cursor-pointer"
              >
                <Mail className="w-3.5 h-3.5 text-white stroke-[2.5]" />
                <span>Draft in Web Gmail</span>
              </button>
            ) : isFollowUpDue ? (
              /* State 2: Relance Due Alert Button */
              <button
                onClick={handleFollowUpClick}
                title="7 days elapsed! Click to send follow-up pitch in Web Gmail"
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-extrabold text-[11px] transition-all active:scale-95 shadow-md ring-2 ring-rose-500/30 animate-pulse cursor-pointer"
              >
                <Send className="w-3.5 h-3.5 text-white stroke-[2.5]" />
                <span>🚨 Send Follow-Up Now</span>
              </button>
            ) : relanceSent ? (
              /* State 3: Relance Already Sent */
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-xl bg-indigo-50 border border-indigo-200 text-indigo-700 font-bold text-[11px]">
                <CheckCircle2 className="w-3.5 h-3.5 text-indigo-600" />
                <span>✓ Relance Envoyée</span>
              </span>
            ) : (
              /* State 4: E-mail 1 Sent, ready to send follow-up anytime */
              <button
                onClick={handleFollowUpClick}
                title="Open Web Gmail with pre-filled follow-up pitch"
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-[11px] transition-all active:scale-95 shadow-xs cursor-pointer"
              >
                <Send className="w-3.5 h-3.5 text-white stroke-[2.5]" />
                <span>Send Follow-Up (Relance)</span>
              </button>
            )}
          </div>
        ) : (
          <span className="text-slate-400 italic text-xs">No HR email</span>
        )}
      </td>

      {/* 5. Details Arrow */}
      <td className="py-4 px-6 text-xs text-right">
        <div className="flex items-center justify-end text-slate-400 group-hover:text-blue-600 transition-colors gap-1 font-bold">
          <span>Details</span>
          <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
        </div>
      </td>
    </tr>
  );
}
