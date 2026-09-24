import React from 'react';
import { LayoutDashboard, Building2, Plus, Radar as RadarIcon, Database } from 'lucide-react';
import { SourcingHub } from './SourcingHub';
import { KeywordVault } from './KeywordVault';
import { isDemoMode } from '../../config/supabaseClient';

export function Sidebar({ activeView, setActiveView, onOpenAddApp, onOpenAddCompany, applicationsCount, companiesCount }) {
  return (
    <aside className="w-full md:w-80 flex-shrink-0 bg-white border-r border-slate-200 p-6 flex flex-col justify-between min-h-screen">
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
              Career & Concours
            </p>
          </div>
        </div>

        {/* Quick Add Action Buttons */}
        <div className="space-y-2">
          <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 px-1">
            Quick Actions
          </div>
          <div className="grid grid-cols-2 gap-3">
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

        {/* Navigation Section */}
        <nav className="space-y-2">
          <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 px-1">
            Navigation
          </div>
          
          <button
            onClick={() => setActiveView('applications')}
            className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
              activeView === 'applications'
                ? 'bg-blue-50 text-blue-700 border border-blue-200 shadow-sm'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <div className="flex items-center gap-3">
              <LayoutDashboard className={`w-5 h-5 ${activeView === 'applications' ? 'text-blue-600' : 'text-slate-400'}`} />
              <span>Opportunity Vault</span>
            </div>
            <span className={`text-xs px-2.5 py-0.5 rounded-full font-bold ${
              activeView === 'applications' ? 'bg-blue-100 text-blue-800' : 'bg-slate-100 text-slate-600'
            }`}>
              {applicationsCount}
            </span>
          </button>

          <button
            onClick={() => setActiveView('companies')}
            className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
              activeView === 'companies'
                ? 'bg-blue-50 text-blue-700 border border-blue-200 shadow-sm'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <div className="flex items-center gap-3">
              <Building2 className={`w-5 h-5 ${activeView === 'companies' ? 'text-blue-600' : 'text-slate-400'}`} />
              <span>Company Directory</span>
            </div>
            <span className={`text-xs px-2.5 py-0.5 rounded-full font-bold ${
              activeView === 'companies' ? 'bg-blue-100 text-blue-800' : 'bg-slate-100 text-slate-600'
            }`}>
              {companiesCount}
            </span>
          </button>
        </nav>

        {/* Sourcing Hub Launchpad Widget */}
        <div className="pt-1 space-y-4">
          <SourcingHub isCollapsible={true} />
          <KeywordVault isCollapsible={true} />
        </div>
      </div>

      {/* Database Mode Status */}
      <div className="mt-8 pt-5 border-t border-slate-200">
        <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-500 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Database className={`w-4 h-4 ${isDemoMode ? 'text-amber-500' : 'text-emerald-600'}`} />
            <span className="font-semibold text-slate-700">
              {isDemoMode ? 'Demo Mode' : 'Supabase Live ⚡'}
            </span>
          </div>
          <span className={`w-2 h-2 rounded-full ${isDemoMode ? 'bg-amber-500' : 'bg-emerald-500'}`} />
        </div>
      </div>
    </aside>
  );
}
