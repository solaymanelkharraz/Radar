import React, { useState } from 'react';
import {
  Code2,
  Copy,
  Check,
  ExternalLink,
  Search,
  Sparkles,
  Terminal,
  Globe,
  Briefcase,
  Layers,
} from 'lucide-react';

export function DeveloperSearchPage({ searchQuery = '' }) {
  const [copiedKeyword, setCopiedKeyword] = useState(null);

  const keywords = [
    'React Developer',
    'Full Stack Laravel',
    'PHP Developer',
    'Frontend Developer',
    'Développeur Full Stack',
  ];

  const jobFeeds = [
    {
      title: 'Indeed Maroc Dev Feed',
      url: 'https://ma.indeed.com/jobs?q=développeur+full+stack+OR+react+OR+laravel&l=Tanger&sort=date',
      desc: 'Live Indeed Maroc feed filtered strictly for Full-Stack, React, and Laravel developer roles in Tangier.',
      source: 'Indeed Maroc',
      tagColor: 'bg-blue-50 text-blue-700 border-blue-200',
    },
    {
      title: 'LinkedIn Jobs Dev Feed',
      url: 'https://www.linkedin.com/jobs/search/?keywords=développeur%20full%20stack%20OR%20react%20OR%20laravel&location=Tanger%2C%20Maroc&f_TPR=r2592000',
      desc: 'LinkedIn job search filtered for Tangier developer postings published in the last 30 days.',
      source: 'LinkedIn Jobs',
      tagColor: 'bg-sky-50 text-sky-700 border-sky-200',
    },
    {
      title: 'ReKrute Dev Feed',
      url: 'https://www.rekrute.com/offres.html?s=1&p=1&keyword=développeur+tanger&sectorId=24',
      desc: 'ReKrute IT sector feed for developer vacancies registered in the Tangier region.',
      source: 'ReKrute Maroc',
      tagColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    },
  ];

  const xrayDorks = [
    {
      title: 'Stack Finder (.ma)',
      url: 'https://www.google.com/search?q=site:.ma+"tanger"+AND+("laravel"+OR+"react")',
      desc: 'Google X-Ray scan searching .ma websites in Tangier containing Laravel or React tech stack indicators.',
      tag: '.ma Stack Finder',
      tagColor: 'bg-purple-50 text-purple-700 border-purple-200',
    },
    {
      title: 'HR LinkedIn Posts Finder',
      url: 'https://www.google.com/search?q=site:linkedin.com/posts+"nous+recrutons"+"tanger"+"react"+OR+"laravel"',
      desc: 'Searches direct recruiter and founder LinkedIn posts calling for React or Laravel developers in Tangier.',
      tag: 'LinkedIn HR Posts',
      tagColor: 'bg-indigo-50 text-indigo-700 border-indigo-200',
    },
    {
      title: 'Direct Careers Page Finder',
      url: 'https://www.google.com/search?q=intitle:"recrutement"+OR+intitle:"carrières"+"tanger"+"développeur"',
      desc: 'Bypasses job portals to target internal company recruitment and career pages in Tangier.',
      tag: 'Hidden Careers Pages',
      tagColor: 'bg-teal-50 text-teal-700 border-teal-200',
    },
  ];

  const handleCopy = (kw) => {
    navigator.clipboard.writeText(kw);
    setCopiedKeyword(kw);
    setTimeout(() => setCopiedKeyword(null), 1800);
  };

  const filteredKeywords = keywords.filter((kw) =>
    kw.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredFeeds = jobFeeds.filter(
    (f) =>
      f.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.source.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredDorks = xrayDorks.filter(
    (d) =>
      d.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.tag.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-8 max-w-6xl mx-auto space-y-8 font-sans">
      {/* Header */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-indigo-50 border border-indigo-200 flex items-center justify-center text-indigo-600 flex-shrink-0 shadow-2xs">
            <Code2 className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
              <span>Developer Search</span>
              <span className="text-xs px-2.5 py-0.5 rounded-full font-bold bg-indigo-50 text-indigo-700 border border-indigo-200">
                Full-Stack & React/Laravel
              </span>
            </h2>
            <p className="text-xs text-slate-500 font-medium mt-0.5">
              High-signal developer feeds, quick-copy keywords, and Google X-Ray dorks
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono font-bold text-slate-600 bg-slate-50 px-3.5 py-2 rounded-xl border border-slate-200">
          <Terminal className="w-4 h-4 text-indigo-600" />
          <span>Stack: React • Laravel • PHP</span>
        </div>
      </div>

      {/* Section A: Quick-Copy Search Keywords */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-5">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div className="space-y-0.5">
            <h3 className="text-sm font-extrabold text-slate-900 flex items-center gap-2">
              <Terminal className="w-4 h-4 text-indigo-600" />
              <span>Section A: Quick-Copy Search Keywords</span>
            </h3>
            <p className="text-xs text-slate-500 font-medium">
              Click to copy keywords for pasting into LinkedIn Jobs, Wellfound, or Indeed search bars
            </p>
          </div>
          <span className="text-xs font-bold text-slate-400 bg-slate-100 px-3 py-1 rounded-xl">
            {filteredKeywords.length} Keywords
          </span>
        </div>

        <div className="flex flex-wrap gap-3">
          {filteredKeywords.map((kw) => {
            const isCopied = copiedKeyword === kw;
            return (
              <button
                key={kw}
                onClick={() => handleCopy(kw)}
                className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold font-mono border transition-all cursor-pointer ${
                  isCopied
                    ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
                    : 'bg-slate-50 hover:bg-indigo-50 text-slate-800 border-slate-200 hover:border-indigo-300 shadow-2xs'
                }`}
              >
                <span>{kw}</span>
                {isCopied ? (
                  <Check className="w-4 h-4 text-white" />
                ) : (
                  <Copy className="w-4 h-4 text-slate-400" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Section B: Pre-Filtered Job Feeds (Direct Tangier Tech Openings) */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-5">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div className="space-y-0.5">
            <h3 className="text-sm font-extrabold text-slate-900 flex items-center gap-2">
              <Briefcase className="w-4 h-4 text-blue-600" />
              <span>Section B: Pre-Filtered Job Feeds (Direct Tangier Tech Openings)</span>
            </h3>
            <p className="text-xs text-slate-500 font-medium">
              Live pre-filtered search feeds targeting Tangier full-stack and web development positions
            </p>
          </div>
          <span className="text-xs font-bold text-blue-700 bg-blue-50 px-3 py-1 rounded-xl border border-blue-200">
            3 Direct Feeds
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {filteredFeeds.map((feed) => (
            <div
              key={feed.title}
              className="p-5 rounded-2xl bg-slate-50/70 border border-slate-200 hover:border-blue-300 transition-all flex flex-col justify-between space-y-4 group"
            >
              <div className="space-y-2.5">
                <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-md border ${feed.tagColor}`}>
                  {feed.source}
                </span>

                <h4 className="text-sm font-extrabold text-slate-900 group-hover:text-blue-600 transition-colors leading-snug">
                  {feed.title}
                </h4>

                <p className="text-xs text-slate-500 leading-relaxed">
                  {feed.desc}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-200/60">
                <a
                  href={feed.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 px-4 rounded-xl bg-white hover:bg-blue-600 text-blue-600 hover:text-white font-extrabold text-xs flex items-center justify-center gap-2 border border-blue-200 shadow-2xs transition-all cursor-pointer"
                >
                  <span>Open Feed ↗</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Section C: Google X-Ray Dorks (Hidden Dev Postings) */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-5">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div className="space-y-0.5">
            <h3 className="text-sm font-extrabold text-slate-900 flex items-center gap-2">
              <Search className="w-4 h-4 text-purple-600" />
              <span>Section C: Google X-Ray Dorks (Hidden Dev Postings)</span>
            </h3>
            <p className="text-xs text-slate-500 font-medium">
              Advanced Google search operators to locate unadvertised developer calls, HR posts, and career pages
            </p>
          </div>
          <span className="text-xs font-bold text-purple-700 bg-purple-50 px-3 py-1 rounded-xl border border-purple-200">
            3 X-Ray Dorks
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {filteredDorks.map((dork) => (
            <div
              key={dork.title}
              className="p-5 rounded-2xl bg-slate-50/70 border border-slate-200 hover:border-purple-300 transition-all flex flex-col justify-between space-y-4 group"
            >
              <div className="space-y-2.5">
                <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-md border ${dork.tagColor}`}>
                  {dork.tag}
                </span>

                <h4 className="text-sm font-extrabold text-slate-900 group-hover:text-purple-600 transition-colors leading-snug">
                  {dork.title}
                </h4>

                <p className="text-xs text-slate-500 leading-relaxed">
                  {dork.desc}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-200/60">
                <a
                  href={dork.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 px-4 rounded-xl bg-white hover:bg-purple-600 text-purple-600 hover:text-white font-extrabold text-xs flex items-center justify-center gap-2 border border-purple-200 shadow-2xs transition-all cursor-pointer"
                >
                  <span>Launch X-Ray Dork</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
