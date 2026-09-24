import React, { useState } from 'react';
import { Copy, Check, Tag, Headset, Truck, Landmark, Sparkles } from 'lucide-react';

export function KeywordVault({ isCollapsible = false }) {
  const [copiedKeyword, setCopiedKeyword] = useState(null);
  const [isOpen, setIsOpen] = useState(true);

  const categories = [
    {
      title: 'IT Support & Helpdesk (Indeed & Call Centers)',
      icon: Headset,
      iconColor: 'text-blue-600',
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
      title: 'Back-Office & TFZ Logistics (LinkedIn & Indeed)',
      icon: Truck,
      iconColor: 'text-amber-600',
      keywords: [
        '"Agent de saisie" Tanger',
        '"Assistant logistique" Tanger',
        '"Back office" Tanger',
        '"Agent administratif" Tanger',
        'Saisie de données',
      ],
    },
    {
      title: 'Government Jobs (Emploi-Public)',
      icon: Landmark,
      iconColor: 'text-emerald-600',
      keywords: [
        'Technicien de 3ème grade',
        'Développement Digital',
        'Informatique',
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

  return (
    <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden text-slate-900 transition-all">
      {/* Header */}
      <div
        onClick={() => isCollapsible && setIsOpen(!isOpen)}
        className={`p-4 bg-slate-50/80 border-b border-slate-200 flex items-center justify-between ${
          isCollapsible ? 'cursor-pointer hover:bg-slate-100/80 transition-colors' : ''
        }`}
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

      {/* Content */}
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
