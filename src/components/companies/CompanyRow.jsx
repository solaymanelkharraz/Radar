import React, { useState } from 'react';
import { Building2, ChevronRight, Mail, Send, Clock } from 'lucide-react';
import { handleOpenGmail } from '../../utils/gmailUtils';
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
    relanceSent,
  } = company;

  const pipelineStatus = getRelancePipelineStatus(company);

  const handleDraftClick = (e) => {
    e.stopPropagation();
    // Open Web Gmail composer
    handleOpenGmail(hrEmail, emailSubject, emailBody, companyName);

    // Lock to next Tuesday at 09:30 AM
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
          <div className="space-y-0.5 min-w-0">
            <div className="font-bold text-slate-900 text-sm tracking-tight group-hover:text-blue-600 transition-colors truncate">
              {companyName}
            </div>
            {website && (
              <span className="text-[11px] text-slate-500 block truncate max-w-[200px]">
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

      {/* 3. Pipeline Status & Web Gmail Draft Action */}
      <td className="py-4 px-6 text-xs">
        <div className="flex items-center gap-3 flex-wrap">
          {/* Status Badge */}
          <span
            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border transition-all ${pipelineStatus.bgColor} ${pipelineStatus.textColor} ${pipelineStatus.borderColor} ${
              pipelineStatus.isHighlighted ? 'ring-2 ring-rose-400/30 animate-pulse' : ''
            }`}
          >
            <Clock className="w-3.5 h-3.5 flex-shrink-0" />
            <span>{pipelineStatus.label}</span>
          </span>

          {/* 1-Click Draft in Web Gmail Button */}
          {hrEmail && (
            <button
              onClick={handleDraftClick}
              title="Open Web Gmail draft and schedule for next Tuesday at 09:30 AM"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-[11px] transition-all active:scale-95 shadow-xs cursor-pointer"
            >
              <Mail className="w-3.5 h-3.5 text-white stroke-[2.5]" />
              <span>Draft in Web Gmail</span>
            </button>
          )}

          {/* Quick Action: Marquer Relance Envoyée */}
          {(pipelineStatus.rawKey === 'RELANCE_DUE' || pipelineStatus.rawKey === 'EMAIL_1_SENT' || relanceSent) && (
            <button
              onClick={handleRelanceClick}
              title={relanceSent ? "Relance mark enabled" : "Click to mark follow-up email as sent"}
              className={`inline-flex items-center gap-1 text-[10px] font-extrabold px-2.5 py-1 rounded-xl border transition-all cursor-pointer ${
                relanceSent
                  ? 'bg-indigo-100 text-indigo-800 border-indigo-300'
                  : 'bg-white hover:bg-indigo-50 text-indigo-700 border-indigo-200 shadow-2xs'
              }`}
            >
              <Send className="w-3 h-3 text-indigo-600" />
              <span>{relanceSent ? '✓ Relance Envoyée' : '+ Marquer Relance Envoyée'}</span>
            </button>
          )}
        </div>
      </td>

      {/* 4. Details Arrow */}
      <td className="py-4 px-6 text-xs text-right">
        <div className="flex items-center justify-end text-slate-400 group-hover:text-blue-600 transition-colors gap-1 font-bold">
          <span>Details</span>
          <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
        </div>
      </td>
    </tr>
  );
}
