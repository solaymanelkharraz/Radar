import React, { useState } from 'react';
import { ExternalLink, Globe, Search, Briefcase, Building2, Headphones, MapPin, Sparkles, Check, Copy } from 'lucide-react';

export function LocalSourcing({ searchQuery = '' }) {
  const [copiedUrl, setCopiedUrl] = useState(null);

  const categories = [
    {
      id: 'job-boards',
      title: 'Job Boards & Public Concours',
      subtitle: 'Primary portals for Moroccan government exams and private sector vacancies',
      icon: Briefcase,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
      links: [
        {
          name: 'Alwadifa Maroc',
          url: 'https://alwadifa-maroc.com',
          category: 'Government Concours',
          desc: 'Official public sector exam announcements, military, and regional recruitment.',
          badge: 'Government',
          badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
        },
        {
          name: 'Emploi-Public.ma',
          url: 'https://www.emploi-public.ma',
          category: 'Public Portal',
          desc: 'Official portal for civil service job offers, exams, and government tenders.',
          badge: 'Official Portal',
          badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
        },
        {
          name: 'Rekrute',
          url: 'https://www.rekrute.com',
          category: 'Private Sector',
          desc: 'Leading IT, executive, and multinational corporate job portal in Morocco.',
          badge: 'Corporate',
          badgeColor: 'bg-blue-50 text-blue-700 border-blue-200',
        },
        {
          name: 'Anapec',
          url: 'https://www.anapec.org',
          category: 'National Agency',
          desc: 'National agency for employment promotion & insertion programs (CI).',
          badge: 'National Agency',
          badgeColor: 'bg-indigo-50 text-indigo-700 border-indigo-200',
        },
        {
          name: 'Indeed Maroc',
          url: 'https://ma.indeed.com',
          category: 'Aggregator',
          desc: 'Search tech support, back-office, and local Tangier job postings.',
          badge: 'Aggregator',
          badgeColor: 'bg-purple-50 text-purple-700 border-purple-200',
        },
        {
          name: 'LinkedIn Jobs',
          url: 'https://www.linkedin.com/jobs',
          category: 'Global Network',
          desc: 'Filter by "Tangier, Morocco" for IT support, logistics, and corporate roles.',
          badge: 'Networking',
          badgeColor: 'bg-sky-50 text-sky-700 border-sky-200',
        },
      ],
    },
    {
      id: 'directories',
      title: 'Company Directories (Tangier & TFZ)',
      subtitle: 'Sourcing tools for spontaneous applications and HR contact info',
      icon: Building2,
      color: 'text-amber-600',
      bgColor: 'bg-amber-50',
      borderColor: 'border-amber-200',
      links: [
        {
          name: 'Charika.ma',
          url: 'https://www.charika.ma',
          category: 'Business Directory',
          desc: 'Database of Moroccan registered companies, legal names, sectors, and emails.',
          badge: 'Corporate Data',
          badgeColor: 'bg-amber-50 text-amber-700 border-amber-200',
        },
        {
          name: 'Telecontact',
          url: 'https://www.telecontact.ma',
          category: 'Yellow Pages',
          desc: 'Comprehensive directory for company phone numbers, addresses, and websites.',
          badge: 'Yellow Pages',
          badgeColor: 'bg-amber-50 text-amber-700 border-amber-200',
        },
        {
          name: 'Tanger Free Zone (TFZ)',
          url: 'https://www.google.com/search?q=entreprises+TFZ+Tanger',
          category: 'Industrial Zone',
          desc: 'Automotive, aerospace, and logistics companies in Tangier Automotive City & TFZ.',
          badge: 'Tangier Zone',
          badgeColor: 'bg-orange-50 text-orange-700 border-orange-200',
        },
      ],
    },
    {
      id: 'bpo-tech',
      title: 'BPO & Tech Support (Direct Portals)',
      subtitle: 'Multinational call centers & IT support centers hiring in Tangier',
      icon: Headphones,
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-50',
      borderColor: 'border-emerald-200',
      links: [
        {
          name: 'MyOpla Careers',
          url: 'https://www.myopla.com/carrieres',
          category: 'BPO / Tech Support',
          desc: 'Major customer experience & IT helpdesk center located in Tangier & Tetouan.',
          badge: 'Tangier Hub',
          badgeColor: 'bg-teal-50 text-teal-700 border-teal-200',
        },
        {
          name: 'Teleperformance / Majorel',
          url: 'https://jobs.teleperformance.ma',
          category: 'Customer Experience',
          desc: 'Global CX leader offering technical support and back-office jobs in Morocco.',
          badge: 'Global BPO',
          badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
        },
        {
          name: 'Foundever Morocco',
          url: 'https://jobs.foundever.com/go/Jobs-in-Morocco/9266102/',
          category: 'Tech Support',
          desc: 'Multinational BPO center with IT helpdesk and customer service positions.',
          badge: 'Tech Support',
          badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
        },
        {
          name: 'Intelcia',
          url: 'https://www.intelcia.com/fr/candidats/offres-emploi',
          category: 'IT & Back-Office',
          desc: 'Leading outsourcing provider in Morocco for IT, administrative, and CX roles.',
          badge: 'Morocco Leader',
          badgeColor: 'bg-green-50 text-green-700 border-green-200',
        },
      ],
    },
  ];

  const handleCopyUrl = (url) => {
    navigator.clipboard.writeText(url);
    setCopiedUrl(url);
    setTimeout(() => setCopiedUrl(null), 1800);
  };

  // Filter links based on searchQuery
  const filteredCategories = categories.map((cat) => {
    const matchingLinks = cat.links.filter(
      (link) =>
        link.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        link.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
        link.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        link.badge.toLowerCase().includes(searchQuery.toLowerCase())
    );
    return { ...cat, links: matchingLinks };
  }).filter((cat) => cat.links.length > 0);

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 rounded-2xl p-6 text-white shadow-md flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-white/10 backdrop-blur-md">
              <MapPin className="w-5 h-5 text-blue-200" />
            </span>
            <h2 className="text-xl font-extrabold tracking-tight">
              Local Sourcing Launchpad (Tangier & Morocco)
            </h2>
          </div>
          <p className="text-xs text-blue-100 max-w-2xl font-medium leading-relaxed">
            One-click access to Moroccan public sector concours portals, business directories for spontaneous outreach, and Tangier tech support centers.
          </p>
        </div>

        <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-3 py-2 rounded-xl text-xs font-semibold border border-white/20">
          <Sparkles className="w-4 h-4 text-amber-300" />
          <span>{categories.reduce((acc, c) => acc + c.links.length, 0)} Direct Portals</span>
        </div>
      </div>

      {/* Main Categories Grid */}
      {filteredCategories.length === 0 ? (
        <div className="p-12 text-center bg-white rounded-2xl border border-slate-200 shadow-sm space-y-3">
          <Search className="w-8 h-8 text-slate-400 mx-auto" />
          <h3 className="text-sm font-bold text-slate-700">No matching local sourcing links found</h3>
          <p className="text-xs text-slate-500">Try adjusting your search query "{searchQuery}".</p>
        </div>
      ) : (
        <div className="space-y-8">
          {filteredCategories.map((cat) => {
            const CategoryIcon = cat.icon;
            return (
              <div key={cat.id} className="space-y-4">
                {/* Section Title */}
                <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                  <div className="flex items-center gap-2.5">
                    <div className={`p-2 rounded-xl ${cat.bgColor} border ${cat.borderColor} ${cat.color}`}>
                      <CategoryIcon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-slate-900">{cat.title}</h3>
                      <p className="text-xs text-slate-500">{cat.subtitle}</p>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-slate-400 bg-slate-100 px-2.5 py-1 rounded-full">
                    {cat.links.length} items
                  </span>
                </div>

                {/* Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {cat.links.map((link) => {
                    const isCopied = copiedUrl === link.url;
                    return (
                      <div
                        key={link.name}
                        className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm hover:shadow-md hover:border-blue-300 transition-all flex flex-col justify-between group"
                      >
                        <div className="space-y-3">
                          <div className="flex items-start justify-between gap-2">
                            <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${link.badgeColor}`}>
                              {link.badge}
                            </span>

                            <button
                              onClick={() => handleCopyUrl(link.url)}
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
                            className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:text-blue-700 bg-blue-50 hover:bg-blue-100 px-3 py-1.5 rounded-xl border border-blue-200 transition-all"
                          >
                            <span>Visit Site</span>
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
