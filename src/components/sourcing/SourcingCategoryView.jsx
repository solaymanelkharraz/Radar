import React, { useState } from 'react';
import {
  Headphones,
  Package,
  Landmark,
  Laptop,
  ExternalLink,
  Globe,
  Copy,
  Check,
  Search,
  Sparkles,
  Tag,
  Info,
  Code,
  ArrowUpRight,
} from 'lucide-react';

export const SOURCING_CATEGORIES = {
  'sourcing-it-support': {
    id: 'sourcing-it-support',
    title: 'IT Support & Helpdesk',
    subtitle: 'Search terms & recruitment portals for Tangier IT support, helpdesk N1/N2, and call centers',
    icon: Headphones,
    iconColor: 'text-blue-600',
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-200',
    bannerGradient: 'from-blue-600 via-indigo-600 to-blue-700',
    badge: 'Tangier & BPO Hub',
    badgeColor: 'bg-blue-50 text-blue-700 border-blue-200',
    keywords: [
      'Support Informatique',
      'Helpdesk',
      'Technicien IT',
      'Assistance Technique',
      'Support N1',
      'IT Support English',
    ],
    links: [
      {
        name: 'Indeed Maroc',
        url: 'https://ma.indeed.com',
        category: 'Job Aggregator',
        desc: 'Search local IT support, helpdesk, and technical assistance job postings in Morocco.',
        badge: 'Aggregator',
        badgeColor: 'bg-purple-50 text-purple-700 border-purple-200',
      },
      {
        name: 'ReKrute',
        url: 'https://www.rekrute.com',
        category: 'Private Sector Portal',
        desc: 'Leading IT, helpdesk, and corporate tech jobs portal in Morocco.',
        badge: 'Corporate',
        badgeColor: 'bg-blue-50 text-blue-700 border-blue-200',
      },
      {
        name: 'MyOpla Careers',
        url: 'https://www.myopla.com/carrieres',
        category: 'BPO / Tech Center',
        desc: 'Major French & English customer experience & IT helpdesk center in Tangier & Tetouan.',
        badge: 'Tangier Hub',
        badgeColor: 'bg-teal-50 text-teal-700 border-teal-200',
      },
      {
        name: 'Teleperformance / Majorel',
        url: 'https://jobs.teleperformance.ma',
        category: 'Global BPO',
        desc: 'Global CX and technical support leader hiring English & French IT support agents.',
        badge: 'Global BPO',
        badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      },
      {
        name: 'Foundever Morocco',
        url: 'https://jobs.foundever.com/go/Jobs-in-Morocco/9266102/',
        category: 'Tech Support Center',
        desc: 'Multinational customer experience & IT support center hiring in Tangier.',
        badge: 'Tech Support',
        badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      },
      {
        name: 'Intelcia',
        url: 'https://www.intelcia.com/fr/candidats/offres-emploi',
        category: 'Outsourcing Leader',
        desc: 'Leading Moroccan outsourcing provider for IT, administrative, and helpdesk roles.',
        badge: 'Morocco Leader',
        badgeColor: 'bg-green-50 text-green-700 border-green-200',
      },
    ],
  },
  'sourcing-back-office': {
    id: 'sourcing-back-office',
    title: 'Back-Office & TFZ Logistics',
    subtitle: 'Target administrative, data entry, and logistics roles in Tangier Free Zone & port ecosystems',
    icon: Package,
    iconColor: 'text-amber-600',
    bgColor: 'bg-amber-50',
    borderColor: 'border-amber-200',
    bannerGradient: 'from-amber-600 via-orange-600 to-amber-700',
    badge: 'Logistics & TFZ',
    badgeColor: 'bg-amber-50 text-amber-700 border-amber-200',
    keywords: [
      '"Agent de saisie" Tanger',
      '"Assistant logistique" Tanger',
      '"Back office" Tanger',
      '"Agent administratif" Tanger',
      'Saisie de données',
    ],
    links: [
      {
        name: 'LinkedIn Jobs',
        url: 'https://www.linkedin.com/jobs/',
        category: 'Professional Network',
        desc: 'Filter by "Tangier, Morocco" for back-office, supply chain, and logistics roles.',
        badge: 'Global Network',
        badgeColor: 'bg-sky-50 text-sky-700 border-sky-200',
      },
      {
        name: 'Indeed Maroc',
        url: 'https://ma.indeed.com',
        category: 'Job Aggregator',
        desc: 'Local Tangier job search for administrative, data entry, and back-office agents.',
        badge: 'Aggregator',
        badgeColor: 'bg-purple-50 text-purple-700 border-purple-200',
      },
      {
        name: 'Tanger Free Zone Directory',
        url: 'https://www.medhub.ma',
        category: 'Free Zone & Logistics',
        desc: 'Industrial and logistics zone directory for Medhub & TFZ automotive/freight companies.',
        badge: 'Industrial Zone',
        badgeColor: 'bg-orange-50 text-orange-700 border-orange-200',
      },
      {
        name: 'Charika.ma',
        url: 'https://www.charika.ma',
        category: 'Corporate Database',
        desc: 'Database of registered companies in Tangier, legal forms, sectors, and HR contacts.',
        badge: 'Business Data',
        badgeColor: 'bg-amber-50 text-amber-700 border-amber-200',
      },
      {
        name: 'Telecontact',
        url: 'https://www.telecontact.ma',
        category: 'Directory',
        desc: 'Moroccan business directory for contacting administrative offices and logistics firms.',
        badge: 'Yellow Pages',
        badgeColor: 'bg-amber-50 text-amber-700 border-amber-200',
      },
    ],
  },
  'sourcing-government': {
    id: 'sourcing-government',
    title: 'Government Concours',
    subtitle: 'Public sector exam announcements, civil service hiring, and national insertion portals',
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
        desc: 'Leading Moroccan website for public sector concours, regional government exams, and results.',
        badge: 'Concours Hub',
        badgeColor: 'bg-teal-50 text-teal-700 border-teal-200',
      },
      {
        name: 'Anapec',
        url: 'https://www.anapec.org',
        category: 'National Insertion Agency',
        desc: 'National agency for employment insertion programs (CI contracts) and public agency jobs.',
        badge: 'National Agency',
        badgeColor: 'bg-indigo-50 text-indigo-700 border-indigo-200',
      },
    ],
  },
  'sourcing-remote': {
    id: 'sourcing-remote',
    title: 'Online & Remote Work',
    subtitle: 'Global tech startup platforms, international remote developer roles, and freelance hubs',
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
      '"Frontend Developer" AND "Junior"',
      '"Remote Web Developer"',
    ],
    links: [
      {
        name: 'Wellfound / AngelList',
        url: 'https://wellfound.com',
        category: 'Tech Startups',
        desc: 'Direct applications for global tech startup engineering, product, and remote roles.',
        badge: 'Startup Tech',
        badgeColor: 'bg-purple-50 text-purple-700 border-purple-200',
      },
      {
        name: 'WeWorkRemotely',
        url: 'https://weworkremotely.com',
        category: 'Remote Community',
        desc: 'World\'s largest remote community for software development, DevOps, and customer support.',
        badge: 'Global Leader',
        badgeColor: 'bg-blue-50 text-blue-700 border-blue-200',
      },
      {
        name: 'RemoteOK',
        url: 'https://remoteok.com',
        category: 'Tech Jobs Board',
        desc: 'Popular remote jobs board for software developers, full stack engineers, and tech pros.',
        badge: 'Tech Focused',
        badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      },
      {
        name: 'Otta',
        url: 'https://otta.com',
        category: 'Curated Matches',
        desc: 'Smart job matching platform connecting tech talent to top global remote scaleups.',
        badge: 'Curated',
        badgeColor: 'bg-amber-50 text-amber-700 border-amber-200',
      },
      {
        name: 'LinkedIn Remote',
        url: 'https://www.linkedin.com/jobs/remote-jobs/',
        category: 'Global Network',
        desc: 'Filter global remote software development and support engineering jobs on LinkedIn.',
        badge: 'LinkedIn Remote',
        badgeColor: 'bg-sky-50 text-sky-700 border-sky-200',
      },
    ],
  },
};

export function SourcingCategoryView({ categoryId, searchQuery = '' }) {
  const [copiedKeyword, setCopiedKeyword] = useState(null);
  const [copiedUrl, setCopiedUrl] = useState(null);
  const [copiedAll, setCopiedAll] = useState(false);

  const category = SOURCING_CATEGORIES[categoryId] || SOURCING_CATEGORIES['sourcing-it-support'];
  const IconComponent = category.icon;

  const handleCopyKeyword = (kw) => {
    navigator.clipboard.writeText(kw);
    setCopiedKeyword(kw);
    setTimeout(() => setCopiedKeyword(null), 1800);
  };

  const handleCopyAllKeywords = () => {
    const combined = category.keywords.join(' OR ');
    navigator.clipboard.writeText(combined);
    setCopiedAll(true);
    setTimeout(() => setCopiedAll(false), 1800);
  };

  const handleCopyUrl = (url) => {
    navigator.clipboard.writeText(url);
    setCopiedUrl(url);
    setTimeout(() => setCopiedUrl(null), 1800);
  };

  // Search filter
  const filteredKeywords = category.keywords.filter((kw) =>
    kw.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredLinks = category.links.filter(
    (link) =>
      link.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      link.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
      link.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      link.badge.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8 font-sans">
      {/* Top Banner Header */}
      <div
        className={`bg-gradient-to-r ${category.bannerGradient} rounded-2xl p-6 text-white shadow-md flex flex-col md:flex-row items-start md:items-center justify-between gap-4`}
      >
        <div className="space-y-1">
          <div className="flex items-center gap-2.5">
            <span className="p-2 rounded-xl bg-white/10 backdrop-blur-md">
              <IconComponent className="w-5 h-5 text-white" />
            </span>
            <h2 className="text-xl font-extrabold tracking-tight">{category.title}</h2>
          </div>
          <p className="text-xs text-white/80 max-w-2xl font-medium leading-relaxed">
            {category.subtitle}
          </p>
        </div>

        <div className="flex items-center gap-2.5 bg-white/10 backdrop-blur-md px-3.5 py-2 rounded-xl text-xs font-semibold border border-white/20">
          <Sparkles className="w-4 h-4 text-amber-300" />
          <span>
            {category.keywords.length} Keywords &bull; {category.links.length} Direct Portals
          </span>
        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* TOP CARD: Quick-Copy Keywords */}
      {/* ------------------------------------------------------------- */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-5">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <div className={`p-2 rounded-xl ${category.bgColor} border ${category.borderColor} ${category.iconColor}`}>
              <Tag className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <span>Quick-Copy Search Keywords</span>
                {copiedKeyword && (
                  <span className="text-[10px] text-emerald-600 font-extrabold normal-case bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200 animate-pulse">
                    Copied!
                  </span>
                )}
              </h3>
              <p className="text-xs text-slate-500 font-medium">
                Click any search term to copy to clipboard for LinkedIn, Indeed, or Google
              </p>
            </div>
          </div>

          <button
            onClick={handleCopyAllKeywords}
            className="text-xs font-bold text-slate-700 hover:text-blue-700 bg-slate-100 hover:bg-blue-50 px-3 py-1.5 rounded-xl border border-slate-200 hover:border-blue-200 transition-all flex items-center gap-1.5 cursor-pointer"
            title="Copy all keywords combined with OR operator"
          >
            {copiedAll ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span className="text-emerald-700">Copied All!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copy All (OR)</span>
              </>
            )}
          </button>
        </div>

        {/* Badges Flex Grid */}
        <div className="flex flex-wrap gap-2.5">
          {filteredKeywords.map((kw) => {
            const isCopied = copiedKeyword === kw;
            return (
              <button
                key={kw}
                onClick={() => handleCopyKeyword(kw)}
                title="Click to copy term"
                className={`inline-flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-xs font-bold font-mono border transition-all cursor-pointer active:scale-95 shadow-2xs ${
                  isCopied
                    ? 'bg-emerald-50 text-emerald-800 border-emerald-300 ring-2 ring-emerald-400/20'
                    : 'bg-slate-50 hover:bg-blue-50/80 text-slate-800 hover:text-blue-700 border-slate-200 hover:border-blue-300'
                }`}
              >
                <span>{kw}</span>
                {isCopied ? (
                  <Check className="w-4 h-4 text-emerald-600 flex-shrink-0 animate-bounce" />
                ) : (
                  <Copy className="w-3.5 h-3.5 text-slate-400 hover:text-blue-600 flex-shrink-0 opacity-70" />
                )}
              </button>
            );
          })}
        </div>

        <div className="pt-2 flex items-center gap-2 text-[11px] text-slate-400 font-medium">
          <Info className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
          <span>Tip: Paste copied terms directly into the job search input bar.</span>
        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* BOTTOM CARD: Platform & Portal Links */}
      {/* ------------------------------------------------------------- */}
      <div className="space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-slate-200">
          <div className="flex items-center gap-2.5">
            <div className={`p-2 rounded-xl ${category.bgColor} border ${category.borderColor} ${category.iconColor}`}>
              <Globe className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">Launchpad & Recruitment Portals</h3>
              <p className="text-xs text-slate-500 font-medium">
                Direct 1-click links to active job boards and directories
              </p>
            </div>
          </div>
          <span className="text-xs font-bold text-slate-400 bg-slate-100 px-2.5 py-1 rounded-full">
            {filteredLinks.length} Portals
          </span>
        </div>

        {/* Links Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredLinks.map((link) => {
            const isCopied = copiedUrl === link.url;
            return (
              <div
                key={link.name}
                className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm hover:shadow-md hover:border-blue-300 transition-all flex flex-col justify-between group"
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <span
                      className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${link.badgeColor}`}
                    >
                      {link.badge}
                    </span>

                    <button
                      onClick={() => handleCopyUrl(link.url)}
                      title="Copy URL"
                      className="text-slate-400 hover:text-slate-600 p-1 rounded-md hover:bg-slate-100 transition-colors cursor-pointer"
                    >
                      {isCopied ? (
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>
                  </div>

                  <div>
                    <h4 className="text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors flex items-center gap-1.5">
                      <span>{link.name}</span>
                    </h4>
                    <p className="text-xs text-slate-500 mt-1 line-clamp-2 font-normal leading-relaxed">
                      {link.desc}
                    </p>
                  </div>
                </div>

                <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[11px] font-medium text-slate-400 flex items-center gap-1">
                    <Globe className="w-3 h-3 text-slate-400" />
                    {link.category}
                  </span>

                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:text-blue-700 bg-blue-50 hover:bg-blue-100 px-3 py-1.5 rounded-xl border border-blue-200 transition-all cursor-pointer"
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
    </div>
  );
}
