import React, { useState } from 'react';
import { ExternalLink, Globe, Search, Briefcase, Building2, ChevronDown, ChevronUp, Compass } from 'lucide-react';

export function SourcingHub({ isCollapsible = false }) {
  const [isOpen, setIsOpen] = useState(true);

  const jobBoards = [
    { name: 'Alwadifa Maroc', url: 'https://alwadifa-maroc.com', category: 'Concours' },
    { name: 'Emploi-Public', url: 'https://www.emploi-public.ma', category: 'Concours' },
    { name: 'Rekrute', url: 'https://www.rekrute.com', category: 'Private Sector' },
    { name: 'Anapec', url: 'https://www.anapec.org', category: 'Public Agency' },
    { name: 'LinkedIn Jobs', url: 'https://www.linkedin.com/jobs', category: 'Global' },
  ];

  const companyDirectories = [
    { name: 'Charika.ma', url: 'https://www.charika.ma', category: 'Business Directory' },
    { name: 'Telecontact', url: 'https://www.telecontact.ma', category: 'Directory' },
    { name: 'Tanger Free Zone (TFZ)', url: 'https://www.google.com/search?q=entreprises+TFZ+Tanger', category: 'Google Sourcing' },
  ];

  return (
    <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden text-slate-900 transition-all">
      {/* Header Bar */}
      <div
        onClick={() => isCollapsible && setIsOpen(!isOpen)}
        className={`p-4 bg-slate-50/80 border-b border-slate-200 flex items-center justify-between ${
          isCollapsible ? 'cursor-pointer hover:bg-slate-100/80 transition-colors' : ''
        }`}
      >
        <div className="flex items-center gap-2.5">
          <div className="p-1.5 rounded-lg bg-blue-50 border border-blue-200 text-blue-600">
            <Compass className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900">
              Sourcing Hub
            </h3>
            <p className="text-[11px] text-slate-500 font-medium">Quick Launchpad</p>
          </div>
        </div>

        {isCollapsible && (
          <button className="p-1 text-slate-400 hover:text-slate-600">
            {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        )}
      </div>

      {/* Content Section */}
      {isOpen && (
        <div className="p-4 space-y-4 text-xs">
          {/* Category 1: Job Boards & Concours */}
          <div className="space-y-2">
            <div className="flex items-center gap-1.5 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
              <Briefcase className="w-3.5 h-3.5 text-blue-600" />
              <span>Job Boards & Concours</span>
            </div>
            <div className="grid grid-cols-1 gap-1.5">
              {jobBoards.map((link) => (
                <a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-2 px-2.5 rounded-xl border border-slate-200/80 bg-slate-50/50 hover:bg-slate-100 hover:border-slate-300 text-slate-700 hover:text-blue-600 font-semibold transition-all group"
                >
                  <div className="flex items-center gap-2">
                    <Globe className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-600 transition-colors" />
                    <span>{link.name}</span>
                  </div>
                  <ExternalLink className="w-3 h-3 opacity-50 group-hover:opacity-100 transition-opacity" />
                </a>
              ))}
            </div>
          </div>

          {/* Category 2: Company Directories */}
          <div className="space-y-2 pt-1 border-t border-slate-100">
            <div className="flex items-center gap-1.5 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
              <Building2 className="w-3.5 h-3.5 text-amber-600" />
              <span>Company Directories</span>
            </div>
            <div className="grid grid-cols-1 gap-1.5">
              {companyDirectories.map((link) => (
                <a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-2 px-2.5 rounded-xl border border-slate-200/80 bg-slate-50/50 hover:bg-slate-100 hover:border-slate-300 text-slate-700 hover:text-amber-700 font-semibold transition-all group"
                >
                  <div className="flex items-center gap-2">
                    {link.name.includes('Google') ? (
                      <Search className="w-3.5 h-3.5 text-slate-400 group-hover:text-amber-600 transition-colors" />
                    ) : (
                      <Globe className="w-3.5 h-3.5 text-slate-400 group-hover:text-amber-600 transition-colors" />
                    )}
                    <span>{link.name}</span>
                  </div>
                  <ExternalLink className="w-3 h-3 opacity-50 group-hover:opacity-100 transition-opacity" />
                </a>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
