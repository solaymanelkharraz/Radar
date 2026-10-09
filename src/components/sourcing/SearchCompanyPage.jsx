import React, { useState } from 'react';
import {
  Building2,
  MapPin,
  Search,
  Copy,
  Check,
  ExternalLink,
  Sparkles,
  Globe,
  Briefcase,
  Compass,
} from 'lucide-react';

export function SearchCompanyPage({ searchQuery = '' }) {
  const [copiedIndex, setCopiedIndex] = useState(null);

  const mapsQueries = [
    'Société de développement informatique Tanger',
    'website designer',
    'Agence web Tanger',
    'ESN Tanger',
  ];

  const companyDorks = [
    {
      title: 'Moroccan Domain Tech Finder',
      url: 'https://www.google.com/search?q=site:.ma+"tanger"+AND+("logiciel"+OR+"informatique"+OR+"digital"+OR+"web")',
      desc: 'Finds registered .ma domain websites and local tech agency landing pages operating in Tangier.',
      tag: '.ma Domain Finder',
      tagColor: 'bg-blue-50 text-blue-700 border-blue-200',
    },
    {
      title: 'Moroccan Corporate Registry Search',
      url: 'https://www.google.com/search?q=site:charika.ma+"tanger"+AND+("sarl"+OR+"informatique")',
      desc: 'Locates officially registered SARL IT companies and software shop entries in Tangier via Charika.ma.',
      tag: 'Charika.ma Registry',
      tagColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    },
    {
      title: 'LinkedIn Local Company Directory Dork',
      url: 'https://www.google.com/search?q=site:linkedin.com/company+"tanger"+AND+("software"+OR+"digital"+OR+"web")',
      desc: 'X-Ray scans LinkedIn company pages to catalog active software development agencies based in Tangier.',
      tag: 'LinkedIn Companies',
      tagColor: 'bg-purple-50 text-purple-700 border-purple-200',
    },
  ];

  const handleCopy = (text, index) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 1800);
  };

  const filteredMapsQueries = mapsQueries.filter((q) =>
    q.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredDorks = companyDorks.filter(
    (d) =>
      d.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.tag.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-8 max-w-6xl mx-auto space-y-8 font-sans">
      {/* Page Header */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600 flex-shrink-0 shadow-2xs">
            <Building2 className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
              <span>Search Company</span>
              <span className="text-xs px-2.5 py-0.5 rounded-full font-bold bg-blue-50 text-blue-700 border border-blue-200">
                Tangier Local Recon
              </span>
            </h2>
            <p className="text-xs text-slate-500 font-medium mt-0.5">
              Locate physical IT companies, web agencies, and unlisted tech businesses in Tangier
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono font-bold text-slate-500 bg-slate-50 px-3.5 py-2 rounded-xl border border-slate-200">
          <MapPin className="w-4 h-4 text-rose-500" />
          <span>Location: Tangier, Morocco</span>
        </div>
      </div>

      {/* Section A: Local Maps Recon (One-Click Copy) */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-5">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div className="space-y-0.5">
            <h3 className="text-sm font-extrabold text-slate-900 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-rose-500" />
              <span>Section A: Local Maps Recon (One-Click Copy)</span>
            </h3>
            <p className="text-xs text-slate-500 font-medium">
              Copy these core terms to paste directly into Google Maps (Centre-Ville, Technopark, TFZ)
            </p>
          </div>
          <span className="text-xs font-bold text-slate-400 bg-slate-100 px-3 py-1 rounded-xl">
            {filteredMapsQueries.length} Queries
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
          {filteredMapsQueries.map((query, index) => {
            const isCopied = copiedIndex === index;
            return (
              <div
                key={query}
                className="p-4 rounded-xl border border-slate-200 hover:border-blue-300 bg-slate-50/50 hover:bg-blue-50/30 transition-all flex items-center justify-between gap-3 group"
              >
                <span className="text-xs font-bold font-mono text-slate-800 group-hover:text-blue-600 transition-colors truncate">
                  "{query}"
                </span>

                <button
                  onClick={() => handleCopy(query, index)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-extrabold flex items-center gap-1.5 transition-all cursor-pointer flex-shrink-0 ${
                    isCopied
                      ? 'bg-emerald-600 text-white shadow-2xs'
                      : 'bg-white text-slate-700 border border-slate-300 hover:bg-slate-100 shadow-2xs'
                  }`}
                >
                  {isCopied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-white" />
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

      {/* Section B: Advanced Company Search Dorks (Hidden Local Tech Shops) */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-5">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div className="space-y-0.5">
            <h3 className="text-sm font-extrabold text-slate-900 flex items-center gap-2">
              <Search className="w-4 h-4 text-purple-600" />
              <span>Section B: Advanced Company Search Dorks (Hidden Local Tech Shops)</span>
            </h3>
            <p className="text-xs text-slate-500 font-medium">
              Uncover local companies, SARL entries, and agency pages that don't appear directly on Google Maps
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
              className="p-5 rounded-2xl bg-slate-50/70 border border-slate-200 hover:border-blue-300 transition-all flex flex-col justify-between space-y-4 group"
            >
              <div className="space-y-2.5">
                <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-md border ${dork.tagColor}`}>
                  {dork.tag}
                </span>

                <h4 className="text-sm font-extrabold text-slate-900 group-hover:text-blue-600 transition-colors leading-snug">
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
                  className="w-full py-2.5 px-4 rounded-xl bg-white hover:bg-blue-50 text-blue-600 font-extrabold text-xs flex items-center justify-center gap-2 border border-blue-200 shadow-2xs transition-all cursor-pointer group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-600"
                >
                  <span>Launch Google Dork</span>
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
