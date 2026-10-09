import React, { useState } from 'react';
import { Code2, ExternalLink, Search, Copy, Check, Terminal, Sparkles, Briefcase } from 'lucide-react';

export function DeveloperSearch({ searchQuery = '' }) {
  const [copiedQuery, setCopiedQuery] = useState(null);

  const jobFeeds = [
    {
      title: 'Indeed Maroc Dev',
      url: 'https://ma.indeed.com/jobs?q=développeur+full+stack+OR+react+OR+laravel&l=Tanger&sort=date',
      desc: 'Live Tangier feed for Full-Stack, React, or Laravel developer openings sorted by date.',
      badge: 'Indeed Feed',
      badgeColor: 'bg-blue-50 text-blue-700 border-blue-200',
    },
    {
      title: 'LinkedIn Jobs Dev',
      url: 'https://www.linkedin.com/jobs/search/?keywords=développeur%20full%20stack%20OR%20react%20OR%20laravel&location=Tanger%2C%20Maroc&f_TPR=r2592000',
      desc: 'Tangier developer job postings updated in the last 30 days.',
      badge: 'LinkedIn Feed',
      badgeColor: 'bg-sky-50 text-sky-700 border-sky-200',
    },
    {
      title: 'ReKrute Dev',
      url: 'https://www.rekrute.com/offres.html?s=1&p=1&keyword=développeur+tanger&sectorId=24',
      desc: 'IT & Software sector developer listings in Tangier on ReKrute Maroc.',
      badge: 'ReKrute Portal',
      badgeColor: 'bg-purple-50 text-purple-700 border-purple-200',
    },
  ];

  const xrayDorks = [
    {
      title: 'Stack Finder (.ma)',
      query: 'site:.ma "tanger" AND ("laravel" OR "react")',
      url: 'https://www.google.com/search?q=site:.ma+"tanger"+AND+("laravel"+OR+"react")',
      desc: 'Scans Moroccan corporate websites with .ma domain for Laravel or React tech stack in Tangier.',
    },
    {
      title: 'HR LinkedIn Posts',
      query: 'site:linkedin.com/posts "nous recrutons" "tanger" "react" OR "laravel"',
      url: 'https://www.google.com/search?q=site:linkedin.com/posts+"nous+recrutons"+"tanger"+"react"+OR+"laravel"',
      desc: 'Direct X-Ray search into recruiter & founder posts hiring React or Laravel devs in Tangier.',
    },
    {
      title: 'Direct Careers Page Finder',
      query: 'intitle:"recrutement" OR intitle:"carrières" "tanger" "développeur"',
      url: 'https://www.google.com/search?q=intitle:"recrutement"+OR+intitle:"carrières"+"tanger"+"développeur"',
      desc: 'Find hidden or unindexed Tangier career pages and direct recruitment calls.',
    },
  ];

  const handleCopy = (query) => {
    navigator.clipboard.writeText(query);
    setCopiedQuery(query);
    setTimeout(() => setCopiedQuery(null), 1800);
  };

  const filteredFeeds = jobFeeds.filter(
    (feed) =>
      !searchQuery ||
      feed.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      feed.desc.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredDorks = xrayDorks.filter(
    (dork) =>
      !searchQuery ||
      dork.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dork.query.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dork.desc.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-6 font-sans">
      {/* Dense Header */}
      <div className="bg-white p-4 px-5 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-blue-50 border border-blue-200 text-blue-600">
            <Code2 className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-extrabold text-slate-900 tracking-tight">
              Developer Search
            </h2>
            <p className="text-xs text-slate-500 font-medium">
              High-signal developer job feeds & Google X-Ray dorks for Tangier Full-Stack, React & Laravel sourcing.
            </p>
          </div>
        </div>
        <span className="text-[11px] font-mono font-bold bg-blue-50 text-blue-800 px-3 py-1 rounded-xl border border-blue-200">
          Developer Tech Radar
        </span>
      </div>

      {/* SECTION A: Pre-Filtered Job Feeds */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-4 px-5 bg-slate-50/80 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Briefcase className="w-4 h-4 text-blue-600" />
            <h3 className="text-sm font-extrabold text-slate-900">
              Section A: Pre-Filtered Job Feeds (Direct Tangier Tech Openings)
            </h3>
          </div>
          <span className="text-[10px] font-bold text-blue-800 bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-200">
            Live Feeds
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
          {filteredFeeds.map((feed, idx) => (
            <div
              key={idx}
              className="p-4 rounded-xl border border-slate-200 bg-white hover:bg-slate-50/80 transition-all flex flex-col justify-between space-y-3 group shadow-2xs"
            >
              <div className="space-y-1.5">
                <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md border ${feed.badgeColor}`}>
                  {feed.badge}
                </span>
                <h4 className="text-sm font-extrabold text-slate-900 group-hover:text-blue-600 transition-colors">
                  {feed.title}
                </h4>
                <p className="text-xs text-slate-500 font-normal leading-relaxed">
                  {feed.desc}
                </p>
              </div>

              <div className="pt-2 border-t border-slate-100">
                <a
                  href={feed.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2 px-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs flex items-center justify-center gap-1.5 shadow-xs transition-all active:scale-95 cursor-pointer"
                >
                  <span>Open Feed</span>
                  <ExternalLink className="w-3.5 h-3.5 stroke-[2.5]" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* SECTION B: Google X-Ray Dorks */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-4 px-5 bg-slate-50/80 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Terminal className="w-4 h-4 text-purple-600" />
            <h3 className="text-sm font-extrabold text-slate-900">
              Section B: Google X-Ray Dorks (Hidden Dev Postings)
            </h3>
          </div>
          <span className="text-[10px] font-bold text-purple-800 bg-purple-50 px-2.5 py-0.5 rounded-full border border-purple-200">
            Advanced Dorks
          </span>
        </div>

        <div className="divide-y divide-slate-100 p-2">
          {filteredDorks.map((dork, idx) => {
            const isCopied = copiedQuery === dork.query;
            return (
              <div
                key={idx}
                className="p-4 px-5 rounded-xl hover:bg-slate-50/80 transition-colors space-y-2.5 group"
              >
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="text-xs font-extrabold text-slate-900">{dork.title}</span>
                    <span className="text-[11px] text-slate-500 font-medium truncate">({dork.desc})</span>
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
                      className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-extrabold text-xs shadow-xs transition-all active:scale-95 cursor-pointer"
                    >
                      <span>Execute Dork</span>
                      <ExternalLink className="w-3.5 h-3.5 stroke-[2.5]" />
                    </a>
                  </div>
                </div>

                <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200 font-mono text-xs text-purple-700 font-semibold truncate select-all">
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
    </div>
  );
}
