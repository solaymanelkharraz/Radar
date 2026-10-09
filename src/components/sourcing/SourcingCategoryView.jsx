import React, { useState } from 'react';
import {
  Landmark,
  Laptop,
  Headphones,
  ExternalLink,
  Globe,
  Copy,
  Check,
  Tag,
  Info,
  ArrowUpRight,
  Sparkles,
} from 'lucide-react';

export const SOURCING_CATEGORIES = {
  'sourcing-government': {
    id: 'sourcing-government',
    title: '🏛️ Government Concours',
    subtitle: 'Public sector exam announcements, civil service hiring, and grade 3 IT exam notices',
    icon: Landmark,
    iconColor: 'text-emerald-600',
    bgColor: 'bg-emerald-50',
    borderColor: 'border-emerald-200',
    bannerGradient: 'from-emerald-600 via-teal-600 to-emerald-700',
    badge: 'Public Sector',
    badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    keywords: [
      'Technicien de 3ème grade',
      'Développement Digital',
      'Informatique',
    ],
    links: [
      {
        name: 'Emploi-Public.ma',
        url: 'https://www.emploi-public.ma',
        category: 'Official Government Portal',
        desc: 'Official Moroccan government portal for civil service recruitment, grade 3 exam notices, and tenders.',
        badge: 'Official Portal',
        badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      },
      {
        name: 'Alwadifa Maroc',
        url: 'https://alwadifa-maroc.com',
        category: 'Concours Portal',
        desc: 'Leading Moroccan portal for public sector concours, regional government exams, and results.',
        badge: 'Concours Hub',
        badgeColor: 'bg-teal-50 text-teal-700 border-teal-200',
      },
      {
        name: 'Anapec',
        url: 'http://www.anapec.org',
        category: 'National Insertion Agency',
        desc: 'National agency for employment insertion programs (CI contracts) and public agency jobs.',
        badge: 'National Agency',
        badgeColor: 'bg-indigo-50 text-indigo-700 border-indigo-200',
      },
      {
        name: 'Emploi.ma',
        url: 'https://www.emploi.ma',
        category: 'Moroccan Job Portal',
        desc: 'Leading Moroccan job board for public sector notices, IT offers, and corporate hiring.',
        badge: 'Morocco Portal',
        badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      },
    ],
  },
  'sourcing-remote': {
    id: 'sourcing-remote',
    title: '💻 Remote Tech Hub',
    subtitle: 'Global tech startup platforms & remote engineering job boards',
    icon: Laptop,
    iconColor: 'text-purple-600',
    bgColor: 'bg-purple-50',
    borderColor: 'border-purple-200',
    bannerGradient: 'from-purple-600 via-indigo-600 to-purple-700',
    badge: 'Global Remote',
    badgeColor: 'bg-purple-50 text-purple-700 border-purple-200',
    keywords: [
      '"React Developer" AND "Remote"',
      '"Full Stack Laravel" OR "PHP Developer"',
      '"Remote Web Developer"',
    ],
    links: [
      {
        name: 'Wellfound',
        url: 'https://wellfound.com',
        category: 'Tech Startups',
        desc: 'Direct applications for global tech startup engineering, product, and remote developer roles.',
        badge: 'Startup Tech',
        badgeColor: 'bg-purple-50 text-purple-700 border-purple-200',
      },
      {
        name: 'RemoteOK',
        url: 'https://remoteok.com',
        category: 'Tech Jobs Board',
        desc: 'Popular remote jobs board for software developers, full stack engineers, and tech pros.',
        badge: 'Tech Focused',
        badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      },
    ],
  },
  'sourcing-local-fallback': {
    id: 'sourcing-local-fallback',
    title: '🎧 Local Fallback',
    subtitle: 'Direct career portal for Tangier-based BPO & customer experience technical support',
    icon: Headphones,
    iconColor: 'text-blue-600',
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-200',
    bannerGradient: 'from-blue-600 via-indigo-600 to-blue-700',
    badge: 'Tangier Hub',
    badgeColor: 'bg-blue-50 text-blue-700 border-blue-200',
    keywords: [
      'Support Informatique Tangier',
      'Assistance Technique N1/N2',
    ],
    links: [
      {
        name: 'MyOpla Careers',
        url: 'https://www.myopla.com/carrieres',
        category: 'BPO / Tech Center',
        desc: 'Major customer experience & IT helpdesk center in Tangier & Tetouan.',
        badge: 'Tangier Hub',
        badgeColor: 'bg-teal-50 text-teal-700 border-teal-200',
      },
    ],
  },
};

export function SourcingCategoryView({ categoryId, searchQuery = '' }) {
  const [copiedKeyword, setCopiedKeyword] = useState(null);
  const [copiedUrl, setCopiedUrl] = useState(null);

  const category = SOURCING_CATEGORIES[categoryId] || SOURCING_CATEGORIES['sourcing-government'];
  const IconComponent = category.icon;

  const handleCopyKeyword = (kw) => {
    navigator.clipboard.writeText(kw);
    setCopiedKeyword(kw);
    setTimeout(() => setCopiedKeyword(null), 1800);
  };

  const handleCopyUrl = (url) => {
    navigator.clipboard.writeText(url);
    setCopiedUrl(url);
    setTimeout(() => setCopiedUrl(null), 1800);
  };

  const filteredKeywords = category.keywords.filter((kw) =>
    kw.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredLinks = category.links.filter(
    (link) =>
      link.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      link.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
      link.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-6 font-sans">
      {/* Banner */}
      <div className={`bg-gradient-to-r ${category.bannerGradient} rounded-2xl p-5 text-white shadow-md flex items-center justify-between gap-4`}>
        <div className="space-y-0.5">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-white/10 backdrop-blur-md">
              <IconComponent className="w-4 h-4 text-white" />
            </span>
            <h2 className="text-lg font-extrabold tracking-tight">{category.title}</h2>
          </div>
          <p className="text-xs text-white/80 font-medium">
            {category.subtitle}
          </p>
        </div>

        <span className="bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-xl text-xs font-semibold border border-white/20">
          {category.links.length} Direct Portals
        </span>
      </div>

      {/* Quick Keywords */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-3">
        <div className="flex items-center justify-between pb-2 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <Tag className="w-4 h-4 text-slate-400" />
            <h3 className="text-xs font-extrabold text-slate-900">Search Keywords</h3>
          </div>
          {copiedKeyword && (
            <span className="text-[10px] text-emerald-600 font-extrabold bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
              Copied!
            </span>
          )}
        </div>

        <div className="flex flex-wrap gap-2">
          {filteredKeywords.map((kw) => {
            const isCopied = copiedKeyword === kw;
            return (
              <button
                key={kw}
                onClick={() => handleCopyKeyword(kw)}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold font-mono border transition-all cursor-pointer ${
                  isCopied
                    ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                    : 'bg-slate-50 hover:bg-blue-50 text-slate-800 border-slate-200'
                }`}
              >
                <span>{kw}</span>
                {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-slate-400" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* Links Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredLinks.map((link) => {
          const isCopied = copiedUrl === link.url;
          return (
            <div
              key={link.name}
              className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs hover:border-blue-300 transition-all flex flex-col justify-between group space-y-3"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md border ${link.badgeColor}`}>
                    {link.badge}
                  </span>
                  <button
                    onClick={() => handleCopyUrl(link.url)}
                    className="text-slate-400 hover:text-slate-600 p-1 rounded-md hover:bg-slate-100 transition-colors"
                  >
                    {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>

                <div>
                  <h4 className="text-sm font-extrabold text-slate-900 group-hover:text-blue-600 transition-colors">
                    {link.name}
                  </h4>
                  <p className="text-xs text-slate-500 mt-1 font-normal leading-relaxed">
                    {link.desc}
                  </p>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[11px] font-semibold text-slate-400">{link.category}</span>
                <a
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs font-bold text-blue-600 hover:text-blue-700 bg-blue-50 px-3 py-1.5 rounded-xl border border-blue-200 transition-all"
                >
                  <span>Visit Portal</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
