import React, { useState } from 'react';
import { Copy, Check, Tag, Headset, Truck, Landmark, Sparkles, Code, Terminal, Search, Info } from 'lucide-react';

export function KeywordVault({ searchQuery = '', isCollapsible = false }) {
  const [copiedKeyword, setCopiedKeyword] = useState(null);
  const [copiedSection, setCopiedSection] = useState(null);
  const [isOpen, setIsOpen] = useState(true);

  const categories = [
    {
      id: 'it-support',
      title: 'IT Support & Helpdesk (Indeed & Call Centers)',
      subtitle: 'Optimized terms for Tangier BPO centers, Teleperformance, MyOpla & Indeed',
      icon: Headset,
      iconColor: 'text-blue-600',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
      keywords: [
        'Support Informatique',
        'Helpdesk',
        'Technicien IT',
        'Assistance Technique',
        'Support N1',
        'IT Support English',
      ],
    },
    {
      id: 'back-office',
      title: 'Back-Office & TFZ Logistics (LinkedIn & Indeed)',
      subtitle: 'Target administrative and logistics roles in Tangier Free Zone & ports',
      icon: Truck,
      iconColor: 'text-amber-600',
      bgColor: 'bg-amber-50',
      borderColor: 'border-amber-200',
      keywords: [
        '"Agent de saisie" Tanger',
        '"Assistant logistique" Tanger',
        '"Back office" Tanger',
        '"Agent administratif" Tanger',
        'Saisie de données',
      ],
    },
    {
      id: 'government',
      title: 'Government Jobs (Emploi-Public)',
      subtitle: 'Public sector exam keywords for civil service recruitment',
      icon: Landmark,
      iconColor: 'text-emerald-600',
      bgColor: 'bg-emerald-50',
      borderColor: 'border-emerald-200',
      keywords: [
        'Technicien de 3ème grade',
        'Développement Digital',
        'Informatique',
      ],
    },
    {
      id: 'remote-boolean',
      title: 'Remote Tech & Boolean Operators (LinkedIn / Google)',
      subtitle: 'Targeted Boolean search logic for international remote engineering',
      icon: Code,
      iconColor: 'text-purple-600',
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-200',
      keywords: [
        '"React Developer" AND "Remote"',
        '"Full Stack Laravel" OR "PHP Developer"',
        '"Frontend Developer" AND "Junior"',
        '"Support Specialist" AND "Remote"',
      ],
    },
  ];

  const handleCopy = (keyword) => {
    navigator.clipboard.writeText(keyword);
    setCopiedKeyword(keyword);
    setTimeout(() => {
      setCopiedKeyword(null);
    }, 1800);
  };

  const handleCopySectionAll = (category) => {
    const combined = category.keywords.join(' OR ');
    navigator.clipboard.writeText(combined);
    setCopiedSection(category.id);
    setTimeout(() => setCopiedSection(null), 1800);
  };

  // Filter categories based on searchQuery
  const filteredCategories = categories.map((cat) => {
    const matchingKeywords = cat.keywords.filter((kw) =>
      kw.toLowerCase().includes(searchQuery.toLowerCase())
    );
    return { ...cat, keywords: matchingKeywords };
  }).filter((cat) => cat.keywords.length > 0 || searchQuery === '');

  // If used as collapsible sidebar widget
  if (isCollapsible) {
    return (
      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden text-slate-900 transition-all">
        <div
          onClick={() => setIsOpen(!isOpen)}
          className="p-4 bg-slate-50/80 border-b border-slate-200 flex items-center justify-between cursor-pointer hover:bg-slate-100/80 transition-colors"
        >
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 rounded-lg bg-blue-50 border border-blue-200 text-blue-600">
              <Tag className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 flex items-center gap-1.5">
                <span>Keyword Vault</span>
                {copiedKeyword && (
                  <span className="text-[10px] text-emerald-600 font-extrabold normal-case bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200 animate-pulse">
                    Copied!
                  </span>
                )}
              </h3>
              <p className="text-[11px] text-slate-500 font-medium">Quick-Copy Search Cheat Sheet</p>
            </div>
          </div>
        </div>

        {isOpen && (
          <div className="p-4 space-y-4 text-xs">
            {categories.map((cat, idx) => {
              const Icon = cat.icon;
              return (
                <div
                  key={cat.title}
                  className={`space-y-2 ${idx > 0 ? 'pt-3 border-t border-slate-100' : ''}`}
                >
                  <div className="flex items-center gap-1.5 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                    <Icon className={`w-3.5 h-3.5 ${cat.iconColor}`} />
                    <span>{cat.title}</span>
                  </div>

                  <div className="flex flex-wrap gap-1.5">
                    {cat.keywords.map((kw) => {
                      const isCopied = copiedKeyword === kw;
                      return (
                        <button
                          key={kw}
                          onClick={() => handleCopy(kw)}
                          title="Click to copy search term"
                          className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold font-mono border transition-all cursor-pointer active:scale-95 ${
                            isCopied
                              ? 'bg-emerald-50 text-emerald-700 border-emerald-300 shadow-sm'
                              : 'bg-slate-50/80 hover:bg-blue-50 text-slate-700 hover:text-blue-700 border-slate-200 hover:border-blue-300'
                          }`}
                        >
                          <span>{kw}</span>
                          {isCopied ? (
                            <Check className="w-3 h-3 text-emerald-600 flex-shrink-0" />
                          ) : (
                            <Copy className="w-3 h-3 text-slate-400 group-hover:text-blue-500 flex-shrink-0 opacity-60" />
                          )}
                        </button>
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

  // Full Main Content View (when clicked in TOOLS section)
  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 rounded-2xl p-6 text-white shadow-md flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-white/10 backdrop-blur-md">
              <Tag className="w-5 h-5 text-blue-400" />
            </span>
            <h2 className="text-xl font-extrabold tracking-tight">
              Keyword Vault & Search Cheat Sheet
            </h2>
          </div>
          <p className="text-xs text-slate-300 max-w-2xl font-medium leading-relaxed">
            Click any badge below to instantly copy pre-formated search strings for LinkedIn, Indeed, Emploi-Public, and Google Boolean operator queries.
          </p>
        </div>

        <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-3.5 py-2 rounded-xl text-xs font-semibold border border-white/10">
          <Sparkles className="w-4 h-4 text-emerald-400" />
          <span>1-Click Search Copy</span>
        </div>
      </div>

      {/* Usage Tip Banner */}
      <div className="p-4 rounded-2xl bg-blue-50 border border-blue-200 flex items-start gap-3 text-blue-900 text-xs">
        <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
        <div className="space-y-1">
          <span className="font-bold">Pro Tip for Job Hunting:</span>
          <p className="text-blue-800 font-normal leading-relaxed">
            Use quotes like <code className="bg-white px-1.5 py-0.5 rounded border border-blue-200 font-mono font-bold text-blue-900">"Agent de saisie" Tanger</code> on Indeed or LinkedIn to match exact phrases. Use <code className="bg-white px-1.5 py-0.5 rounded border border-blue-200 font-mono font-bold text-blue-900">AND</code> / <code className="bg-white px-1.5 py-0.5 rounded border border-blue-200 font-mono font-bold text-blue-900">OR</code> in capital letters for Google & LinkedIn Boolean search filters.
          </p>
        </div>
      </div>

      {/* Main Categories Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredCategories.map((cat) => {
          const Icon = cat.icon;
          const isSectionCopied = copiedSection === cat.id;

          return (
            <div
              key={cat.id}
              className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-6"
            >
              <div className="space-y-4">
                {/* Card Title Header */}
                <div className="flex items-start justify-between gap-3 pb-3 border-b border-slate-100">
                  <div className="flex items-center gap-3">
                    <div className={`p-2.5 rounded-xl ${cat.bgColor} border ${cat.borderColor} ${cat.iconColor}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-slate-900">{cat.title}</h3>
                      <p className="text-xs text-slate-500 font-medium">{cat.subtitle}</p>
                    </div>
                  </div>

                  <button
                    onClick={() => handleCopySectionAll(cat)}
                    className="text-[11px] font-bold text-slate-600 hover:text-blue-600 bg-slate-100 hover:bg-blue-50 px-2.5 py-1 rounded-lg border border-slate-200 hover:border-blue-200 transition-all flex items-center gap-1 flex-shrink-0"
                    title="Copy all keywords in this section combined with OR"
                  >
                    {isSectionCopied ? (
                      <>
                        <Check className="w-3 h-3 text-emerald-600" />
                        <span className="text-emerald-700">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3" />
                        <span>Copy All</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Badges Grid */}
                <div className="flex flex-wrap gap-2 pt-1">
                  {cat.keywords.map((kw) => {
                    const isCopied = copiedKeyword === kw;
                    return (
                      <button
                        key={kw}
                        onClick={() => handleCopy(kw)}
                        title="Click to copy term to clipboard"
                        className={`inline-flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold font-mono border transition-all cursor-pointer active:scale-95 shadow-2xs ${
                          isCopied
                            ? 'bg-emerald-50 text-emerald-800 border-emerald-300 ring-2 ring-emerald-400/20'
                            : 'bg-slate-50 hover:bg-blue-50 text-slate-800 hover:text-blue-700 border-slate-200 hover:border-blue-300'
                        }`}
                      >
                        <span>{kw}</span>
                        {isCopied ? (
                          <Check className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0 animate-bounce" />
                        ) : (
                          <Copy className="w-3.5 h-3.5 text-slate-400 hover:text-blue-600 flex-shrink-0 opacity-70" />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400 font-medium">
                <span>{cat.keywords.length} Keyword strings</span>
                <span className="text-[11px] text-slate-400">Click badge to copy</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
