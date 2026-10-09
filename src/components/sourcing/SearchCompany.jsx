import React, { useState } from 'react';
import { MapPin, Copy, Check, ExternalLink, Building2 } from 'lucide-react';

export function SearchCompany({ searchQuery = '' }) {
  const [copiedText, setCopiedText] = useState(null);

  const mapsReconQueries = [
    { label: 'Core Dev Shops', text: 'Société de développement informatique Tanger' },
    { label: 'Web Design Agencies', text: 'website designer' },
    { label: 'Tangier Web Agencies', text: 'Agence web Tanger' },
    { label: 'IT Consultancies', text: 'ESN Tanger' },
  ];

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    setCopiedText(text);
    setTimeout(() => setCopiedText(null), 1800);
  };

  const filteredMapsQueries = mapsReconQueries.filter(
    (q) =>
      !searchQuery ||
      q.text.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.label.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-6 font-sans">
      {/* Header */}
      <div className="bg-white p-4 px-5 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-blue-50 border border-blue-200 text-blue-600">
            <Building2 className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-extrabold text-slate-900 tracking-tight">
              Search Company (Local Recon)
            </h2>
            <p className="text-xs text-slate-500 font-medium">
              Targeted Google Maps queries to locate local physical tech agencies and dev companies in Tangier.
            </p>
          </div>
        </div>
        <span className="text-[11px] font-mono font-bold bg-amber-50 text-amber-800 px-3 py-1 rounded-xl border border-amber-200">
          Local Maps Recon
        </span>
      </div>

      {/* Local Maps Recon Queries */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-4 px-5 bg-slate-50/80 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <MapPin className="w-4 h-4 text-amber-600" />
            <h3 className="text-sm font-extrabold text-slate-900">
              Local Physical Companies Search Queries
            </h3>
          </div>
          <span className="text-[10px] font-bold text-amber-800 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200">
            Google Maps Tangier
          </span>
        </div>

        <div className="divide-y divide-slate-100 p-2">
          {filteredMapsQueries.map((item, idx) => {
            const isCopied = copiedText === item.text;
            const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(item.text)}`;

            return (
              <div
                key={idx}
                className="p-3 px-4 rounded-xl hover:bg-slate-50/80 transition-colors flex items-center justify-between gap-4 group"
              >
                <div className="flex items-center gap-3 min-w-0 flex-1">
                  <span className="text-[10px] font-bold uppercase text-slate-400 font-mono w-4">
                    0{idx + 1}
                  </span>
                  <div className="min-w-0">
                    <span className="text-[11px] font-bold text-slate-500 block">
                      {item.label}
                    </span>
                    <code className="text-xs font-mono font-bold text-slate-900 bg-slate-100 px-3 py-1 rounded-lg border border-slate-200 inline-block truncate select-all group-hover:border-blue-300">
                      {item.text}
                    </code>
                  </div>
                </div>

                <div className="flex items-center gap-2 flex-shrink-0">
                  <button
                    onClick={() => handleCopy(item.text)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-bold transition-all active:scale-95 cursor-pointer ${
                      isCopied
                        ? 'bg-emerald-50 text-emerald-700 border-emerald-300'
                        : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50 shadow-2xs'
                    }`}
                  >
                    {isCopied ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 text-slate-500" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>

                  <a
                    href={mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200 text-xs font-bold transition-all shadow-2xs"
                  >
                    <span>Open Maps ↗</span>
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
