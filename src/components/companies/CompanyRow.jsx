import React, { useState } from 'react';
import { Copy, Check, MapPin, Building2, ChevronRight } from 'lucide-react';

export function CompanyRow({ company, onClick, onCopyEmail }) {
  const { companyName, sector, location, hrEmail, website } = company;
  const [copied, setCopied] = useState(false);

  const handleCopy = (e) => {
    e.stopPropagation();
    if (!hrEmail) return;
    navigator.clipboard.writeText(hrEmail);
    setCopied(true);
    if (onCopyEmail) onCopyEmail(hrEmail);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <tr
      onClick={onClick}
      className="border-b border-slate-200 hover:bg-slate-50 transition-colors group cursor-pointer"
    >
      {/* Company Name & Website */}
      <td className="py-4 px-6">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-2xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600 flex-shrink-0">
            <Building2 className="w-5 h-5" />
          </div>
          <div className="space-y-0.5">
            <div className="font-bold text-slate-900 text-sm tracking-tight group-hover:text-blue-600 transition-colors">
              {companyName}
            </div>
            {website && (
              <span className="text-[11px] text-slate-500 flex items-center gap-1">
                <span className="truncate max-w-[180px]">{website.replace(/^https?:\/\//, '')}</span>
              </span>
            )}
          </div>
        </div>
      </td>

      {/* Sector */}
      <td className="py-4 px-6 text-xs font-semibold text-slate-700">
        <span className="px-3 py-1 rounded-xl bg-slate-100 border border-slate-200 inline-block shadow-sm">
          {sector || 'N/A'}
        </span>
      </td>

      {/* Location */}
      <td className="py-4 px-6 text-xs text-slate-600 font-medium">
        <div className="flex items-center gap-2">
          <MapPin className="w-4 h-4 text-slate-400 flex-shrink-0" />
          <span>{location || 'Morocco'}</span>
        </div>
      </td>

      {/* HR Email */}
      <td className="py-4 px-6 text-xs">
        {hrEmail ? (
          <div className="flex items-center gap-2">
            <span className="text-slate-800 font-mono text-xs truncate max-w-[180px]">{hrEmail}</span>
            <button
              onClick={handleCopy}
              title="Copy HR Email to clipboard"
              className={`p-1.5 rounded-lg border transition-all ${
                copied
                  ? 'bg-emerald-50 text-emerald-700 border-emerald-300'
                  : 'bg-white text-slate-400 border-slate-300 hover:text-blue-600 hover:bg-slate-50'
              }`}
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
            </button>
          </div>
        ) : (
          <span className="text-slate-400 italic">No email</span>
        )}
      </td>

      {/* Details Arrow */}
      <td className="py-4 px-6 text-xs text-right">
        <div className="flex items-center justify-end text-slate-400 group-hover:text-blue-600 transition-colors gap-1 font-semibold">
          <span>Details</span>
          <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
        </div>
      </td>
    </tr>
  );
}
