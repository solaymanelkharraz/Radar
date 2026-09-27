import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  Copy,
  Check,
  MapPin,
  Linkedin,
  Code2,
  Share2,
  Briefcase,
  Layers,
  Sparkles,
  ExternalLink,
} from 'lucide-react';

export const SEARCH_CATEGORIES = [
  {
    id: 'core-web',
    title: 'Category 1: Core Web & Software',
    priorityBadge: 'High Priority',
    priorityColor: 'bg-red-50 text-red-700 border-red-200',
    icon: Code2,
    iconColor: 'text-blue-600',
    description: 'Target companies that build custom software, web apps, SaaS, and digital products.',
    queries: [
      { text: 'Société de développement informatique Tanger', notes: 'Core software houses & dev shops' },
      { text: 'Création application web sur mesure Tanger', notes: 'Bespoke web application developers' },
      { text: 'Développement web et mobile Tanger', notes: 'Full-stack & mobile engineering agencies' },
      { text: 'Éditeur de logiciels Tanger', notes: 'SaaS products & desktop software publishers' },
      { text: 'Studio de développement web Tanger', notes: 'Agile dev studios & product teams' },
    ],
  },
  {
    id: 'digital-agencies',
    title: 'Category 2: Digital & Communication Agencies',
    priorityBadge: 'Agencies',
    priorityColor: 'bg-purple-50 text-purple-700 border-purple-200',
    icon: Share2,
    iconColor: 'text-purple-600',
    description: 'Full-service creative agencies with dedicated web and frontend development teams.',
    queries: [
      { text: 'Agence web Tanger', notes: 'Direct web design & development agencies' },
      { text: 'Agence digitale Tanger', notes: 'Full-service digital agency partners' },
      { text: 'Agence de communication digitale Tanger', notes: 'Marketing agencies with web departments' },
      { text: 'Agence SEO et développement web Tanger', notes: 'Growth & SEO tech agencies' },
    ],
  },
  {
    id: 'corporate-it',
    title: 'Category 3: Corporate IT & Consulting (B2B/System Integrators)',
    priorityBadge: 'B2B & ESN',
    priorityColor: 'bg-amber-50 text-amber-700 border-amber-200',
    icon: Briefcase,
    iconColor: 'text-amber-600',
    description: 'IT service consultancies, system integrators, and enterprise tech providers.',
    queries: [
      { text: 'IT services Tanger', notes: 'Corporate IT & managed service providers' },
      { text: 'ESN Tanger', notes: 'Entreprise de Services du Numérique (IT consultancies)' },
      { text: 'SSII Tanger', notes: 'Société de Services en Ingénierie Informatique' },
      { text: 'Intégrateur de solutions informatiques Tanger', notes: 'Enterprise system integrators' },
    ],
  },
  {
    id: 'stack-specific',
    title: 'Category 4: Stack-Specific (Ultra-Targeted)',
    priorityBadge: 'Targeted Stack',
    priorityColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    icon: Layers,
    iconColor: 'text-emerald-600',
    description: 'Ultra-targeted queries focused specifically on modern web stacks (Laravel, React, SaaS).',
    queries: [
      { text: 'Développement Laravel Tanger', notes: 'Laravel PHP backend specialists' },
      { text: 'Développement React Tanger', notes: 'React & modern JS frontend teams' },
      { text: 'Création plateforme SaaS Tanger', notes: 'Cloud SaaS platform builders' },
    ],
  },
];

export function SearchLibraryPage({ searchQuery = '' }) {
  const [copiedText, setCopiedText] = useState(null);

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    setCopiedText(text);
    setTimeout(() => setCopiedText(null), 2000);
  };

  const handleGoogleMapsSearch = (queryText) => {
    const encoded = encodeURIComponent(queryText);
    const url = `https://www.google.com/maps/search/?api=1&query=${encoded}`;
    window.open(url, '_blank');
  };

  const handleLinkedInSearch = (queryText) => {
    const encoded = encodeURIComponent(queryText);
    const url = `https://www.linkedin.com/search/results/companies/?keywords=${encoded}`;
    window.open(url, '_blank');
  };

  return (
    <div className="p-8 space-y-8 font-sans max-w-7xl mx-auto">
      {/* Top Welcome Banner */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-blue-50 border border-blue-200 text-blue-600">
              <Sparkles className="w-5 h-5" />
            </span>
            <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">
              Sourcing Command Center & Search Library
            </h2>
          </div>
          <p className="text-xs text-slate-500 font-medium">
            Pre-configured boolean & keyword search templates to uncover local Tangier tech companies, agencies, and dev shops.
          </p>
        </div>

        <div className="flex items-center gap-3 text-xs font-bold text-slate-600 bg-slate-50 px-4 py-2.5 rounded-xl border border-slate-200">
          <Search className="w-4 h-4 text-blue-600" />
          <span>Total Queries: <strong className="text-slate-900 font-extrabold">16</strong> Search Commands</span>
        </div>
      </div>

      {/* Grid of Categories */}
      <div className="space-y-8">
        {SEARCH_CATEGORIES.map((cat) => {
          const CategoryIcon = cat.icon;

          // Filter queries by header search bar input
          const filteredQueries = cat.queries.filter(
            (q) =>
              !searchQuery ||
              q.text.toLowerCase().includes(searchQuery.toLowerCase()) ||
              q.notes.toLowerCase().includes(searchQuery.toLowerCase())
          );

          if (filteredQueries.length === 0) return null;

          return (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
              className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden"
            >
              {/* Category Card Header */}
              <div className="p-5 px-6 bg-slate-50/80 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-white border border-slate-200 shadow-2xs">
                    <CategoryIcon className={`w-5 h-5 ${cat.iconColor}`} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-base font-extrabold text-slate-900">{cat.title}</h3>
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold border ${cat.priorityColor}`}>
                        {cat.priorityBadge}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 font-medium mt-0.5">{cat.description}</p>
                  </div>
                </div>

                <span className="text-xs font-bold text-slate-400 bg-white px-3 py-1 rounded-xl border border-slate-200 self-start sm:self-auto">
                  {filteredQueries.length} Queries
                </span>
              </div>

              {/* Queries List */}
              <div className="divide-y divide-slate-100 p-2">
                {filteredQueries.map((queryObj, idx) => {
                  const isCopied = copiedText === queryObj.text;

                  return (
                    <div
                      key={idx}
                      className="p-4 px-5 rounded-xl hover:bg-slate-50/80 transition-colors flex flex-col md:flex-row md:items-center justify-between gap-4 group"
                    >
                      {/* Query Text & Note */}
                      <div className="space-y-1 min-w-0 flex-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <code className="text-xs font-mono font-bold text-slate-900 bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200 select-all group-hover:border-blue-300 transition-colors">
                            "{queryObj.text}"
                          </code>
                        </div>
                        <p className="text-[11px] text-slate-500 font-medium">{queryObj.notes}</p>
                      </div>

                      {/* Action Buttons: Copy, Google Maps Search, LinkedIn Search */}
                      <div className="flex items-center gap-2 flex-shrink-0 flex-wrap">
                        {/* Copy Button */}
                        <button
                          onClick={() => handleCopy(queryObj.text)}
                          title="Copy search query to clipboard"
                          className={`flex items-center gap-1.5 px-3 py-2 rounded-xl border text-xs font-bold transition-all active:scale-95 cursor-pointer ${
                            isCopied
                              ? 'bg-emerald-50 text-emerald-700 border-emerald-300'
                              : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50 hover:text-slate-900 shadow-2xs'
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

                        {/* Google Maps Search Button */}
                        <button
                          onClick={() => handleGoogleMapsSearch(queryObj.text)}
                          className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-300 font-extrabold text-xs transition-all active:scale-95 shadow-2xs cursor-pointer"
                        >
                          <MapPin className="w-3.5 h-3.5 text-amber-600 stroke-[2.5]" />
                          <span>Google Maps ↗</span>
                        </button>

                        {/* LinkedIn Search Button */}
                        <button
                          onClick={() => handleLinkedInSearch(queryObj.text)}
                          className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-800 border border-blue-300 font-extrabold text-xs transition-all active:scale-95 shadow-2xs cursor-pointer"
                        >
                          <Linkedin className="w-3.5 h-3.5 text-blue-600 stroke-[2.5]" />
                          <span>LinkedIn Companies ↗</span>
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
