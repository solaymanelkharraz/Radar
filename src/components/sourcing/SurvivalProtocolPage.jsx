import React, { useState } from 'react';
import { LifeBuoy, Copy, Check, ExternalLink, ShieldAlert, Radio, Globe, Search } from 'lucide-react';

export function SurvivalProtocolPage() {
  const [copiedText, setCopiedText] = useState(null);

  const keywords = [
    { label: 'IT Support', query: 'Support informatique Tanger' },
    { label: 'Technician', query: 'Technicien IT Tanger' },
    { label: 'Back Office', query: 'Agent Back Office Tanger' },
    { label: 'Helpdesk', query: 'Helpdesk Tanger' },
    { label: 'Data Entry', query: 'Saisie de données Tanger' },
  ];

  const aggregatorFeeds = [
    {
      name: 'Indeed Maroc (Support & IT)',
      url: 'https://ma.indeed.com/jobs?q=informatique+OR+helpdesk+OR+support+OR+saisie&l=Tanger&sort=date',
      desc: 'Live feed sorted by date for Tangier IT support, helpdesk, and data entry.',
      badge: 'Live Feed',
      badgeColor: 'bg-purple-950 text-purple-300 border-purple-800',
    },
    {
      name: 'LinkedIn Jobs (Tangier IT Support)',
      url: 'https://www.linkedin.com/jobs/search/?keywords=support%20OR%20helpdesk%20OR%20informatique&location=Tanger%2C%20Maroc&f_TPR=r2592000',
      desc: 'Filtered for Tangier, Morocco within the past 30 days for IT support roles.',
      badge: 'Filtered',
      badgeColor: 'bg-sky-950 text-sky-300 border-sky-800',
    },
    {
      name: 'ReKrute Maroc (Tangier IT)',
      url: 'https://www.rekrute.com/offres.html?s=1&p=1&keyword=tanger&sectorId=24',
      desc: 'Direct IT and technical services job vacancies portal for Morocco.',
      badge: 'Corporate',
      badgeColor: 'bg-blue-950 text-blue-300 border-blue-800',
    },
  ];

  const hiddenMarketSites = [
    {
      name: 'LinkedIn HR Posts (Google Dork)',
      url: 'https://www.google.com/search?q=site:linkedin.com/posts+"nous+recrutons"+"tanger"+"support"+OR+"technicien"+OR+"informatique"',
      desc: 'Bypass boards to find organic recruiter post announcements on LinkedIn.',
      badge: 'Dork Scan',
      badgeColor: 'bg-rose-950 text-rose-300 border-rose-800',
    },
    {
      name: 'MyOpla (Tanger Tech Support)',
      url: 'https://myopla.com/carrieres',
      desc: 'Direct career portal for French & English CX & tech support in Tangier.',
      badge: 'Direct Portal',
      badgeColor: 'bg-teal-950 text-teal-300 border-teal-800',
    },
    {
      name: 'Anapec (National Portal)',
      url: 'http://www.anapec.org/',
      desc: 'National agency for employment insertion & public agency listings.',
      badge: 'National Portal',
      badgeColor: 'bg-emerald-950 text-emerald-300 border-emerald-800',
    },
  ];

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    setCopiedText(text);
    setTimeout(() => setCopiedText(null), 1800);
  };

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-6 font-sans text-slate-100 selection:bg-rose-500/30 selection:text-rose-200">
      {/* Dark Utilitarian Banner Header */}
      <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl shadow-xl flex items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="p-2.5 rounded-xl bg-rose-950/80 border border-rose-800/80 text-rose-400 shadow-inner">
            <LifeBuoy className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-extrabold tracking-tight text-white">
                Survival Protocol: Quick-Hire Fallback (Tangier)
              </h2>
              <span className="text-[10px] font-mono font-extrabold uppercase px-2 py-0.5 rounded bg-rose-950 text-rose-300 border border-rose-800">
                Fallback Route
              </span>
            </div>
            <p className="text-xs text-slate-400 font-medium mt-0.5">
              Emergency pipeline for quick-hire IT Support, Helpdesk N1/N2, Back-Office, and Data Entry roles in Tangier.
            </p>
          </div>
        </div>

        <div className="hidden sm:flex items-center gap-2 bg-slate-950 px-3 py-1.5 rounded-xl text-xs font-mono text-slate-400 border border-slate-800">
          <Radio className="w-3.5 h-3.5 text-rose-500 animate-ping" />
          <span>Utilitarian Radar</span>
        </div>
      </div>

      {/* SECTION A: The Quick-Copy Keywords */}
      <div className="bg-slate-900 rounded-2xl border border-slate-800 shadow-md overflow-hidden">
        <div className="p-4 px-5 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Search className="w-4 h-4 text-rose-400" />
            <h3 className="text-xs font-extrabold text-slate-100 uppercase tracking-wider">
              Section A: The Quick-Copy Keywords
            </h3>
          </div>
          <span className="text-[10px] font-mono text-slate-400">
            5 Tactical Strings
          </span>
        </div>

        <div className="p-3 divide-y divide-slate-800/60">
          {keywords.map((kw, idx) => {
            const isCopied = copiedText === kw.query;
            return (
              <div
                key={idx}
                className="py-2.5 px-3 rounded-xl hover:bg-slate-800/50 transition-colors flex items-center justify-between gap-4"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <span className="text-[10px] font-mono font-bold text-slate-500 w-5">
                    0{idx + 1}
                  </span>
                  <span className="text-xs font-bold text-slate-300 w-24 flex-shrink-0">
                    {kw.label}
                  </span>
                  <code className="text-xs font-mono font-bold text-slate-100 bg-slate-950 px-3 py-1 rounded-lg border border-slate-800 truncate select-all">
                    "{kw.query}"
                  </code>
                </div>

                <button
                  onClick={() => handleCopy(kw.query)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-bold transition-all active:scale-95 cursor-pointer ${
                    isCopied
                      ? 'bg-emerald-950 text-emerald-300 border-emerald-800'
                      : 'bg-slate-800 text-slate-200 border-slate-700 hover:bg-slate-700'
                  }`}
                >
                  {isCopied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-slate-400" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* SECTION B: The Aggregator Feeds (Pre-Filtered Links) */}
      <div className="bg-slate-900 rounded-2xl border border-slate-800 shadow-md overflow-hidden">
        <div className="p-4 px-5 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Globe className="w-4 h-4 text-purple-400" />
            <h3 className="text-xs font-extrabold text-slate-100 uppercase tracking-wider">
              Section B: The Aggregator Feeds (Pre-Filtered Links)
            </h3>
          </div>
          <span className="text-[10px] font-mono text-slate-400">
            3 Live Aggregators
          </span>
        </div>

        <div className="p-3 divide-y divide-slate-800/60">
          {aggregatorFeeds.map((feed, idx) => (
            <div
              key={idx}
              className="p-3.5 rounded-xl hover:bg-slate-800/50 transition-colors flex items-center justify-between gap-4 group"
            >
              <div className="space-y-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border ${feed.badgeColor}`}>
                    {feed.badge}
                  </span>
                  <h4 className="text-xs font-extrabold text-slate-100 group-hover:text-purple-400 transition-colors">
                    {feed.name}
                  </h4>
                </div>
                <p className="text-[11px] text-slate-400 font-medium truncate">
                  {feed.desc}
                </p>
              </div>

              <a
                href={feed.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-purple-950 hover:bg-purple-900 text-purple-200 border border-purple-800 text-xs font-extrabold transition-all active:scale-95 cursor-pointer flex-shrink-0"
              >
                <span>Launch Feed</span>
                <ExternalLink className="w-3.5 h-3.5 stroke-[2.5]" />
              </a>
            </div>
          ))}
        </div>
      </div>

      {/* SECTION C: Hidden Market & Direct Sites */}
      <div className="bg-slate-900 rounded-2xl border border-slate-800 shadow-md overflow-hidden">
        <div className="p-4 px-5 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <ShieldAlert className="w-4 h-4 text-emerald-400" />
            <h3 className="text-xs font-extrabold text-slate-100 uppercase tracking-wider">
              Section C: Hidden Market & Direct Sites
            </h3>
          </div>
          <span className="text-[10px] font-mono text-slate-400">
            3 Direct Outlets
          </span>
        </div>

        <div className="p-3 divide-y divide-slate-800/60">
          {hiddenMarketSites.map((site, idx) => (
            <div
              key={idx}
              className="p-3.5 rounded-xl hover:bg-slate-800/50 transition-colors flex items-center justify-between gap-4 group"
            >
              <div className="space-y-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border ${site.badgeColor}`}>
                    {site.badge}
                  </span>
                  <h4 className="text-xs font-extrabold text-slate-100 group-hover:text-emerald-400 transition-colors">
                    {site.name}
                  </h4>
                </div>
                <p className="text-[11px] text-slate-400 font-medium truncate">
                  {site.desc}
                </p>
              </div>

              <a
                href={site.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-emerald-950 hover:bg-emerald-900 text-emerald-200 border border-emerald-800 text-xs font-extrabold transition-all active:scale-95 cursor-pointer flex-shrink-0"
              >
                <span>Bypass Boards</span>
                <ExternalLink className="w-3.5 h-3.5 stroke-[2.5]" />
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
