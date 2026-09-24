import React, { useState } from 'react';
import {
  Briefcase,
  Building2,
  Compass,
  Headphones,
  Package,
  Landmark,
  Laptop,
  Database,
  ChevronDown,
  ChevronRight,
  Plus,
  Radar as RadarIcon,
} from 'lucide-react';
import { isDemoMode } from '../../config/supabaseClient';

export function Sidebar({
  activeView,
  setActiveView,
  onOpenAddApp,
  onOpenAddCompany,
  applicationsCount = 0,
  companiesCount = 0,
}) {
  // Accordion state for Sourcing Hub sub-links
  const [isSourcingOpen, setIsSourcingOpen] = useState(true);

  const sourcingItems = [
    {
      id: 'sourcing-it-support',
      label: 'IT Support & Helpdesk',
      icon: Headphones,
      badge: 'BPO / Tangier',
      color: 'text-blue-600',
    },
    {
      id: 'sourcing-back-office',
      label: 'Back-Office & TFZ Logistics',
      icon: Package,
      badge: 'TFZ / Port',
      color: 'text-amber-600',
    },
    {
      id: 'sourcing-government',
      label: 'Government Concours',
      icon: Landmark,
      badge: 'Public Sector',
      color: 'text-emerald-600',
    },
    {
      id: 'sourcing-remote',
      label: 'Online & Remote Work',
      icon: Laptop,
      badge: 'Global Remote',
      color: 'text-purple-600',
    },
  ];

  const isSourcingActive = activeView.startsWith('sourcing-');

  return (
    <aside className="w-full md:w-80 flex-shrink-0 bg-white border-r border-slate-200 p-6 flex flex-col justify-between min-h-screen font-sans selection:bg-blue-500/20">
      <div className="space-y-6">
        {/* Brand Logo Header */}
        <div className="flex items-center gap-3.5 px-2 py-2">
          <div className="relative flex items-center justify-center w-10 h-10 rounded-2xl bg-blue-50 border border-blue-200 text-blue-600 shadow-sm">
            <RadarIcon className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl font-extrabold tracking-tight text-slate-900">
              RADAR
            </h1>
            <p className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">
              Career & Concours Dashboard
            </p>
          </div>
        </div>

        {/* Quick Add Action Buttons */}
        <div className="space-y-2">
          <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 px-1">
            Quick Actions
          </div>
          <div className="grid grid-cols-2 gap-2.5">
            <button
              onClick={onOpenAddApp}
              className="w-full py-2.5 px-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm transition-all active:scale-95 cursor-pointer"
            >
              <Plus className="w-4 h-4 stroke-[2.5]" />
              <span>+ Job App</span>
            </button>

            <button
              onClick={onOpenAddCompany}
              className="w-full py-2.5 px-3 rounded-xl bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 font-bold text-xs flex items-center justify-center gap-1.5 transition-all active:scale-95 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>+ Company</span>
            </button>
          </div>
        </div>

        {/* High-Level Navigation Links */}
        <nav className="space-y-2">
          <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 px-1">
            Navigation
          </div>

          {/* 1. Opportunity Vault */}
          <button
            onClick={() => setActiveView('applications')}
            className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              activeView === 'applications'
                ? 'bg-blue-50 text-blue-700 border border-blue-200 shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <div className="flex items-center gap-3">
              <Briefcase
                className={`w-4 h-4 ${
                  activeView === 'applications' ? 'text-blue-600' : 'text-slate-400'
                }`}
              />
              <span>Opportunity Vault</span>
            </div>
            <span
              className={`text-[11px] px-2.5 py-0.5 rounded-full font-bold ${
                activeView === 'applications'
                  ? 'bg-blue-100 text-blue-800'
                  : 'bg-slate-100 text-slate-600'
              }`}
            >
              {applicationsCount}
            </span>
          </button>

          {/* 2. Company Directory */}
          <button
            onClick={() => setActiveView('companies')}
            className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              activeView === 'companies'
                ? 'bg-blue-50 text-blue-700 border border-blue-200 shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <div className="flex items-center gap-3">
              <Building2
                className={`w-4 h-4 ${
                  activeView === 'companies' ? 'text-blue-600' : 'text-slate-400'
                }`}
              />
              <span>Company Directory</span>
            </div>
            <span
              className={`text-[11px] px-2.5 py-0.5 rounded-full font-bold ${
                activeView === 'companies'
                  ? 'bg-blue-100 text-blue-800'
                  : 'bg-slate-100 text-slate-600'
              }`}
            >
              {companiesCount}
            </span>
          </button>

          {/* 3. Sourcing Hub (Expandable Accordion) */}
          <div className="pt-2 space-y-1">
            <button
              onClick={() => setIsSourcingOpen(!isSourcingOpen)}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                isSourcingActive
                  ? 'bg-slate-100 text-slate-900 font-extrabold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <div className="flex items-center gap-3">
                <Compass
                  className={`w-4 h-4 ${isSourcingActive ? 'text-blue-600' : 'text-slate-400'}`}
                />
                <span>Sourcing Hub</span>
              </div>
              {isSourcingOpen ? (
                <ChevronDown className="w-4 h-4 text-slate-400" />
              ) : (
                <ChevronRight className="w-4 h-4 text-slate-400" />
              )}
            </button>

            {/* Sourcing Hub 4 Sub-Categories */}
            {isSourcingOpen && (
              <div className="pl-3 space-y-1 pt-1 border-l-2 border-slate-100 ml-5">
                {sourcingItems.map((item) => {
                  const ItemIcon = item.icon;
                  const isActive = activeView === item.id;

                  return (
                    <button
                      key={item.id}
                      onClick={() => setActiveView(item.id)}
                      className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                        isActive
                          ? 'bg-blue-50 text-blue-700 border border-blue-200 shadow-2xs'
                          : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                      }`}
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <ItemIcon
                          className={`w-3.5 h-3.5 flex-shrink-0 ${
                            isActive ? 'text-blue-600' : 'text-slate-400'
                          }`}
                        />
                        <span className="truncate">{item.label}</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </nav>
      </div>

      {/* Footer System Status */}
      <div className="pt-6 border-t border-slate-200">
        <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-500 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Database
              className={`w-4 h-4 ${isDemoMode ? 'text-amber-500' : 'text-emerald-600'}`}
            />
            <span className="font-semibold text-slate-700">
              {isDemoMode ? 'Demo Mode' : 'Supabase Live ⚡'}
            </span>
          </div>
          <span
            className={`w-2 h-2 rounded-full ${
              isDemoMode ? 'bg-amber-500' : 'bg-emerald-500 animate-pulse'
            }`}
          />
        </div>
      </div>
    </aside>
  );
}
