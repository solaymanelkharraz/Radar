import React from 'react';
import { Search, Plus, Calendar, Award, MapPin, Globe, Tag } from 'lucide-react';

export function Header({
  activeView,
  searchQuery,
  setSearchQuery,
  onOpenAdd,
  upcomingCount = 0,
  interviewCount = 0,
}) {
  const getHeaderInfo = () => {
    switch (activeView) {
      case 'applications':
        return {
          title: 'Opportunity Vault',
          desc: 'Track job applications, public sector concours, and document checklists.',
          searchPlaceholder: 'Search job, company, source...',
          icon: null,
        };
      case 'companies':
        return {
          title: 'Company & HR Directory',
          desc: 'Manage corporate contacts, HR emails, and spontaneous submission pitches.',
          searchPlaceholder: 'Search company, sector, HR email...',
          icon: null,
        };
      case 'local-sourcing':
        return {
          title: 'Local Jobs Launchpad (Tangier & Morocco)',
          desc: 'Moroccan job portals, public sector concours, business directories, and Tangier BPO centers.',
          searchPlaceholder: 'Filter local portals & companies...',
          icon: MapPin,
        };
      case 'remote-sourcing':
        return {
          title: 'Online & Remote Jobs Hub',
          desc: 'Global remote startup job boards, freelance platforms, and Boolean search strings.',
          searchPlaceholder: 'Filter remote platforms & keywords...',
          icon: Globe,
        };
      case 'keyword-vault':
        return {
          title: 'Keyword Vault & Search Terms',
          desc: 'Quick-copy search terms for LinkedIn, Indeed, and Emploi-Public.',
          searchPlaceholder: 'Filter search terms & keywords...',
          icon: Tag,
        };
      default:
        return {
          title: 'Dashboard',
          desc: 'Radar Job Tracking & Sourcing Hub',
          searchPlaceholder: 'Search...',
          icon: null,
        };
    }
  };

  const info = getHeaderInfo();
  const IconComponent = info.icon;

  return (
    <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-slate-200 px-8 py-4 flex flex-col md:flex-row items-center justify-between gap-6">
      {/* Title section */}
      <div className="space-y-1">
        <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2.5">
          {IconComponent && (
            <span className="p-1.5 rounded-lg bg-blue-50 border border-blue-200 text-blue-600">
              <IconComponent className="w-4 h-4" />
            </span>
          )}
          <span>{info.title}</span>
        </h2>
        <p className="text-xs text-slate-500 font-medium">{info.desc}</p>
      </div>

      {/* Stats Chips & Controls */}
      <div className="flex flex-wrap items-center gap-4 w-full md:w-auto justify-end">
        {/* Quick Stats Chips for Applications */}
        {activeView === 'applications' && (
          <div className="hidden lg:flex items-center gap-3">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-amber-50 border border-amber-200 text-xs font-semibold text-amber-800">
              <Calendar className="w-4 h-4 text-amber-600" />
              <span>
                Pending Action: <strong className="font-extrabold">{upcomingCount}</strong>
              </span>
            </div>

            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-100 border border-slate-200 text-xs font-semibold text-slate-700">
              <Award className="w-4 h-4 text-slate-500" />
              <span>
                Archived: <strong className="font-extrabold">{interviewCount}</strong>
              </span>
            </div>
          </div>
        )}

        {/* Search Bar */}
        <div className="relative flex-1 md:w-72">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={info.searchPlaceholder}
            className="w-full pl-10 pr-9 py-2 bg-white border border-slate-300 rounded-xl text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 shadow-xs transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600 font-bold"
            >
              ✕
            </button>
          )}
        </div>

        {/* Action Button (Show on applications & companies views) */}
        {(activeView === 'applications' || activeView === 'companies') && (
          <button
            onClick={onOpenAdd}
            className="py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center gap-2 shadow-xs transition-all active:scale-95 flex-shrink-0 cursor-pointer"
          >
            <Plus className="w-4 h-4 stroke-[2.5]" />
            <span>{activeView === 'applications' ? 'New Opportunity' : 'New Company'}</span>
          </button>
        )}
      </div>
    </header>
  );
}
