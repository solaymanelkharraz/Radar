import React, { useState } from 'react';
import { MapPin, Search, Copy, Check, ExternalLink, Code2, Globe, Terminal } from 'lucide-react';

export function SearchLibraryPage({ searchQuery = '' }) {
  const [copiedText, setCopiedText] = useState(null);

  const mapsReconQueries = [
    { label: 'Core Dev Shops', text: 'Société de développement informatique Tanger' },
    { label: 'Web Design Agencies', text: 'website designer' },
    { label: 'Tangier Web Agencies', text: 'Agence web Tanger' },
    { label: 'IT Consultancies', text: 'ESN Tanger' },
  ];

  const devFeeds = [
    {
      name: 'Indeed Maroc Dev',
      url: 'https://ma.indeed.com/jobs?q=développeur+full+stack+OR+react+OR+laravel&l=Tanger&sort=date',
      desc: 'Live Tangier feed for Full-Stack, React & Laravel roles (Sorted by Date).',
      badge: 'Indeed Dev',
      badgeColor: 'bg-purple-50 text-purple-700 border-purple-200',
    },
    {
      name: 'LinkedIn Jobs Dev',
      url: 'https://www.linkedin.com/jobs/search/?keywords=développeur%20full%20stack%20OR%20react%20OR%20laravel&location=Tanger%2C%20Maroc&f_TPR=r2592000',
      desc: 'Filtered for Tangier, Morocco (Past 30 Days) for Full-Stack & Modern Web roles.',
      badge: 'LinkedIn Dev',
      badgeColor: 'bg-sky-50 text-sky-700 border-sky-200',
    },
    {
      name: 'ReKrute Dev',
      url: 'https://www.rekrute.com/offres.html?s=1&p=1&keyword=développeur+tanger&sectorId=24',
      desc: 'Moroccan IT sector portal pre-filtered for Tangier web software developers.',
      badge: 'ReKrute Dev',
      badgeColor: 'bg-blue-50 text-blue-700 border-blue-200',
    },
  ];

  const xrayDorks = [
    {
      title: 'Google Dork (Stack)',
      query: 'site:.ma "tanger" AND ("laravel" OR "react")',
      url: 'https://www.google.com/search?q=site:.ma+"tanger"+AND+("laravel"+OR+"react")',
      desc: 'Scan Moroccan .ma domains in Tangier for Laravel & React tech stacks.',
    },
    {
      title: 'Google Dork (HR Posts)',
      query: 'site:linkedin.com/posts "nous recrutons" "tanger" "react" OR "laravel"',
      url: 'https://www.google.com/search?q=site:linkedin.com/posts+"nous+recrutons"+"tanger"+"react"+OR+"laravel"',
      desc: 'Discover active recruiter hiring posts on LinkedIn for Tangier devs.',
    },
    {
      title: 'Google Dork (Careers)',
      query: 'intitle:"recrutement" OR intitle:"carrières" "tanger" "développeur"',
      url: 'https://www.google.com/search?q=intitle:"recrutement"+OR+intitle:"carrières"+"tanger"+"développeur"',
      desc: 'Uncover unindexed recruitment pages & direct developer hiring forms.',
    },
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

  const filteredDevFeeds = devFeeds.filter(
    (f) =>
      !searchQuery ||
      f.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.desc.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredDorks = xrayDorks.filter(
    (d) =>
      !searchQuery ||
      d.query.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-6 font-sans">
      {/* Header */}
      <div className="bg-white p-4 px-5 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-blue-50 border border-blue-200 text-blue-600">
            <Terminal className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-extrabold text-slate-900 tracking-tight">
              Developer Sourcing & Search Library
            </h2>
            <p className="text-xs text-slate-500 font-medium">
              Pre-filtered Tangier developer job feeds, Google X-Ray dorks, and quick-copy maps terms.
            </p>
          </div>
        </div>
        <span className="text-[11px] font-mono font-bold bg-slate-100 text-slate-700 px-3 py-1 rounded-xl border border-slate-200">
          Developer Command Center
        </span>
      </div>

      {/* 1. Direct Pre-Filtered Developer Feeds */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-4 px-5 bg-slate-50/80 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Globe className="w-4 h-4 text-purple-600" />
            <h3 className="text-sm font-extrabold text-slate-900">
              Direct Tangier Developer Feeds
            </h3>
          </div>
          <span className="text-[10px] font-bold text-purple-700 bg-purple-50 px-2.5 py-0.5 rounded-full border border-purple-200">
            3 Pre-Filtered Feeds
          </span>
        </div>

        <div className="divide-y divide-slate-100 p-2">
          {filteredDevFeeds.map((feed, idx) => (
            <div
              key={idx}
              className="p-3.5 px-4 rounded-xl hover:bg-slate-50/80 transition-colors flex items-center justify-between gap-4 group"
            >
              <div className="space-y-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md border ${feed.badgeColor}`}>
                    {feed.badge}
                  </span>
                  <h4 className="text-xs font-extrabold text-slate-900 group-hover:text-blue-600 transition-colors">
                    {feed.name}
                  </h4>
                </div>
                <p className="text-[11px] text-slate-500 font-medium truncate">
                  {feed.desc}
                </p>
              </div>

              <a
                href={feed.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs shadow-xs transition-all active:scale-95 cursor-pointer flex-shrink-0"
              >
                <span>Launch Feed</span>
                <ExternalLink className="w-3.5 h-3.5 stroke-[2.5]" />
              </a>
            </div>
          ))}
        </div>
      </div>

      {/* 2. Google X-Ray Dorks */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-4 px-5 bg-slate-50/80 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Code2 className="w-4 h-4 text-blue-600" />
            <h3 className="text-sm font-extrabold text-slate-900">
              Google X-Ray Dorks (Direct External Links)
            </h3>
          </div>
          <span className="text-[10px] font-bold text-blue-800 bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-200">
            3 Developer Dorks
          </span>
        </div>

        <div className="divide-y divide-slate-100 p-2">
          {filteredDorks.map((dork, idx) => {
            const isCopied = copiedText === dork.query;

            return (
              <div
                key={idx}
                className="p-4 px-5 rounded-xl hover:bg-slate-50/80 transition-colors space-y-2 group"
              >
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-extrabold text-slate-900">{dork.title}</span>
                    <span className="text-[11px] text-slate-500 font-medium">({dork.desc})</span>
                  </div>

                  <div className="flex items-center gap-2 flex-shrink-0">
                    <button
                      onClick={() => handleCopy(dork.query)}
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
                          <span>Copy Query</span>
                        </>
                      )}
                    </button>

                    <a
                      href={dork.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs shadow-xs transition-all active:scale-95 cursor-pointer"
                    >
                      <span>Execute Dork</span>
                      <ExternalLink className="w-3.5 h-3.5 stroke-[2.5]" />
                    </a>
                  </div>
                </div>

                <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200 font-mono text-xs text-blue-700 font-semibold truncate select-all">
                  <a
                    href={dork.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline"
                  >
                    {dork.query}
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 3. Quick-Copy Maps Keywords */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-4 px-5 bg-slate-50/80 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <MapPin className="w-4 h-4 text-amber-600" />
            <h3 className="text-sm font-extrabold text-slate-900">
              Quick-Copy Maps Keywords
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
                  <code className="text-xs font-mono font-bold text-slate-900 bg-slate-100 px-3 py-1 rounded-lg border border-slate-200 truncate select-all group-hover:border-blue-300">
                    "{item.text}"
                  </code>
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
                    <span>Maps ↗</span>
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
