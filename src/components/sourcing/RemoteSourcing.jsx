import React, { useState } from 'react';
import { ExternalLink, Globe, Laptop, Sparkles, Check, Copy, Tag, Code, Terminal, Zap } from 'lucide-react';

export function RemoteSourcing({ searchQuery = '' }) {
  const [copiedText, setCopiedText] = useState(null);
  const [copiedUrl, setCopiedUrl] = useState(null);

  const remoteKeywords = [
    {
      label: 'React Remote',
      query: '"React Developer" AND "Remote"',
      desc: 'LinkedIn & Google Boolean search for React engineering roles.',
      badge: 'Frontend',
      badgeColor: 'bg-sky-50 text-sky-700 border-sky-200',
    },
    {
      label: 'Laravel / PHP',
      query: '"Full Stack Laravel" OR "PHP Developer"',
      desc: 'Target full stack & backend PHP positions.',
      badge: 'Backend',
      badgeColor: 'bg-rose-50 text-rose-700 border-rose-200',
    },
    {
      label: 'Junior Frontend',
      query: '"Frontend Developer" AND "Junior"',
      desc: 'Target junior-level frontend positions.',
      badge: 'Entry / Mid',
      badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    },
    {
      label: 'Remote IT Support',
      query: '"Support Specialist" AND "Remote"',
      desc: 'Global remote IT support & helpdesk engineering.',
      badge: 'Support',
      badgeColor: 'bg-indigo-50 text-indigo-700 border-indigo-200',
    },
  ];

  const remotePlatforms = [
    {
      name: 'Wellfound (AngelList)',
      url: 'https://wellfound.com',
      category: 'Startup Tech Jobs',
      desc: 'Apply directly to tech startups hiring global remote developers, product, and design talent.',
      badge: 'Top Pick',
      badgeColor: 'bg-purple-50 text-purple-700 border-purple-200',
    },
    {
      name: 'WeWorkRemotely',
      url: 'https://weworkremotely.com',
      category: 'Remote Community',
      desc: 'The world\'s largest remote work platform for software development, DevOps, and customer support.',
      badge: 'Global Leader',
      badgeColor: 'bg-blue-50 text-blue-700 border-blue-200',
    },
    {
      name: 'RemoteOK',
      url: 'https://remoteok.com',
      category: 'Tech & Dev Jobs',
      desc: 'Popular job board for remote software engineers, full stack devs, and digital nomads.',
      badge: 'Tech Focused',
      badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    },
    {
      name: 'Otta',
      url: 'https://otta.com',
      category: 'Curated Matches',
      desc: 'AI-curated matches connecting software engineers to high-growth tech scaleups.',
      badge: 'Curated',
      badgeColor: 'bg-amber-50 text-amber-700 border-amber-200',
    },
  ];

  const freelancePlatforms = [
    {
      name: 'Upwork',
      url: 'https://www.upwork.com',
      category: 'Global Freelance',
      desc: 'World\'s largest marketplace for freelance software development, QA testing, and tech support contracts.',
      badge: 'Global Marketplace',
      badgeColor: 'bg-green-50 text-green-700 border-green-200',
    },
    {
      name: 'Mostaql',
      url: 'https://mostaql.com',
      category: 'MENA Tech Marketplace',
      desc: 'Leading Arab freelance platform for web development, mobile apps, and technical projects.',
      badge: 'MENA Region',
      badgeColor: 'bg-blue-50 text-blue-700 border-blue-200',
    },
    {
      name: 'Khamsat',
      url: 'https://khamsat.com',
      category: 'Micro-Services',
      desc: 'Micro-services marketplace for quick web bug fixes, script writing, and data entry.',
      badge: 'Micro-Jobs',
      badgeColor: 'bg-amber-50 text-amber-700 border-amber-200',
    },
  ];

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    setCopiedText(text);
    setTimeout(() => setCopiedText(null), 1800);
  };

  const handleCopyUrl = (url) => {
    navigator.clipboard.writeText(url);
    setCopiedUrl(url);
    setTimeout(() => setCopiedUrl(null), 1800);
  };

  // Filter based on search query
  const filteredKeywords = remoteKeywords.filter(
    (kw) =>
      kw.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
      kw.query.toLowerCase().includes(searchQuery.toLowerCase()) ||
      kw.desc.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredPlatforms = remotePlatforms.filter(
    (p) =>
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredFreelance = freelancePlatforms.filter(
    (f) =>
      f.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 rounded-2xl p-6 text-white shadow-md flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-white/10 backdrop-blur-md">
              <Laptop className="w-5 h-5 text-purple-200" />
            </span>
            <h2 className="text-xl font-extrabold tracking-tight">
              Online & Remote Jobs Hub
            </h2>
          </div>
          <p className="text-xs text-purple-100 max-w-2xl font-medium leading-relaxed">
            Curated platforms for global tech startup roles, freelance marketplaces, and boolean search shortcuts optimized for remote engineers and developers.
          </p>
        </div>

        <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-3 py-2 rounded-xl text-xs font-semibold border border-white/20">
          <Zap className="w-4 h-4 text-yellow-300" />
          <span>Global Work Opportunities</span>
        </div>
      </div>

      {/* Category 3: The Remote Keyword Vault (Quick-copy badges) */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-purple-50 border border-purple-200 text-purple-600">
              <Code className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <span>The Remote Keyword Vault</span>
                {copiedText && (
                  <span className="text-[10px] text-emerald-600 font-extrabold normal-case bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200 animate-pulse">
                    Copied to clipboard!
                  </span>
                )}
              </h3>
              <p className="text-xs text-slate-500">Quick-copy Boolean search strings for LinkedIn Jobs & Google Search</p>
            </div>
          </div>
          <span className="text-xs font-bold text-slate-400 bg-slate-100 px-2.5 py-1 rounded-full">
            Boolean Search
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {filteredKeywords.map((kw) => {
            const isCopied = copiedText === kw.query;
            return (
              <div
                key={kw.query}
                onClick={() => handleCopy(kw.query)}
                className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                  isCopied
                    ? 'bg-emerald-50 border-emerald-300 text-emerald-900 shadow-sm'
                    : 'bg-slate-50/80 hover:bg-purple-50/60 border-slate-200 hover:border-purple-300 text-slate-800'
                }`}
              >
                <div className="space-y-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${kw.badgeColor}`}>
                      {kw.badge}
                    </span>
                    <span className="text-xs font-bold text-slate-900">{kw.label}</span>
                  </div>
                  <div className="font-mono text-xs font-semibold text-slate-700 truncate bg-white/70 px-2 py-1 rounded border border-slate-200/60">
                    {kw.query}
                  </div>
                </div>

                <div className="flex-shrink-0">
                  {isCopied ? (
                    <span className="p-2 rounded-lg bg-emerald-100 text-emerald-700 flex items-center gap-1 text-xs font-bold">
                      <Check className="w-4 h-4" /> Copied
                    </span>
                  ) : (
                    <span className="p-2 rounded-lg bg-white border border-slate-200 text-slate-500 hover:text-purple-600 flex items-center gap-1 text-xs font-semibold shadow-2xs">
                      <Copy className="w-3.5 h-3.5" /> Copy
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Category 1: Remote Tech Platforms */}
      <div className="space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-slate-200">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-blue-50 border border-blue-200 text-blue-600">
              <Laptop className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">Category 1: Remote Tech Platforms</h3>
              <p className="text-xs text-slate-500">Dedicated global startup platforms & software engineering job boards</p>
            </div>
          </div>
          <span className="text-xs font-bold text-slate-400 bg-slate-100 px-2.5 py-1 rounded-full">
            {filteredPlatforms.length} Platforms
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredPlatforms.map((platform) => {
            const isCopied = copiedUrl === platform.url;
            return (
              <div
                key={platform.name}
                className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm hover:shadow-md hover:border-purple-300 transition-all flex flex-col justify-between group"
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${platform.badgeColor}`}>
                      {platform.badge}
                    </span>

                    <button
                      onClick={() => handleCopyUrl(platform.url)}
                      title="Copy URL"
                      className="text-slate-400 hover:text-slate-600 p-1 rounded-md hover:bg-slate-100 transition-colors"
                    >
                      {isCopied ? (
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>
                  </div>

                  <div>
                    <h4 className="text-sm font-bold text-slate-900 group-hover:text-purple-600 transition-colors">
                      {platform.name}
                    </h4>
                    <p className="text-xs text-slate-500 mt-1 font-normal leading-relaxed">
                      {platform.desc}
                    </p>
                  </div>
                </div>

                <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[11px] font-medium text-slate-400 flex items-center gap-1">
                    <Globe className="w-3 h-3 text-slate-400" />
                    {platform.category}
                  </span>

                  <a
                    href={platform.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-purple-700 hover:text-purple-800 bg-purple-50 hover:bg-purple-100 px-3 py-1.5 rounded-xl border border-purple-200 transition-all"
                  >
                    <span>Visit Platform</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Category 2: Global Freelance & MENA */}
      <div className="space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-slate-200">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-600">
              <Globe className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">Category 2: Global Freelance & MENA</h3>
              <p className="text-xs text-slate-500">Contracting, freelancing, and regional MENA digital project platforms</p>
            </div>
          </div>
          <span className="text-xs font-bold text-slate-400 bg-slate-100 px-2.5 py-1 rounded-full">
            {filteredFreelance.length} Platforms
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {filteredFreelance.map((platform) => {
            const isCopied = copiedUrl === platform.url;
            return (
              <div
                key={platform.name}
                className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm hover:shadow-md hover:border-emerald-300 transition-all flex flex-col justify-between group"
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${platform.badgeColor}`}>
                      {platform.badge}
                    </span>

                    <button
                      onClick={() => handleCopyUrl(platform.url)}
                      title="Copy URL"
                      className="text-slate-400 hover:text-slate-600 p-1 rounded-md hover:bg-slate-100 transition-colors"
                    >
                      {isCopied ? (
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>
                  </div>

                  <div>
                    <h4 className="text-sm font-bold text-slate-900 group-hover:text-emerald-600 transition-colors">
                      {platform.name}
                    </h4>
                    <p className="text-xs text-slate-500 mt-1 font-normal leading-relaxed">
                      {platform.desc}
                    </p>
                  </div>
                </div>

                <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[11px] font-medium text-slate-400 flex items-center gap-1">
                    <Globe className="w-3 h-3 text-slate-400" />
                    {platform.category}
                  </span>

                  <a
                    href={platform.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 hover:text-emerald-800 bg-emerald-50 hover:bg-emerald-100 px-3 py-1.5 rounded-xl border border-emerald-200 transition-all"
                  >
                    <span>Visit Platform</span>
                    <ExternalLink className="w-3.5 h-3.5" />
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
