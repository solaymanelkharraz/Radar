import React, { useState } from 'react';
import {
  Folder,
  Target,
  Wrench,
  Settings,
  Briefcase,
  Building2,
  MapPin,
  Globe,
  Tag,
  Database,
  ChevronDown,
  ChevronRight,
  Plus,
  Radar as RadarIcon,
  Sparkles,
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
  // Collapsible section expanded states
  const [sections, setSections] = useState({
    tracking: true,
    sourcing: true,
    tools: true,
    system: true,
  });

  const toggleSection = (key) => {
    setSections((prev) => ({ ...prev, [key]: !prev[key] }));
  };

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

        {/* Navigation Sections */}
        <nav className="space-y-5">
          {/* SECTION 1: 📁 TRACKING */}
          <div className="space-y-1.5">
            <button
              onClick={() => toggleSection('tracking')}
              className="w-full flex items-center justify-between text-[11px] font-bold uppercase tracking-wider text-slate-400 hover:text-slate-600 px-2 py-1 transition-colors group cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <Folder className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-600 transition-colors" />
                <span>Tracking</span>
              </div>
              {sections.tracking ? (
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              ) : (
                <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
              )}
            </button>

            {sections.tracking && (
              <div className="space-y-1 pl-1">
                <button
                  onClick={() => setActiveView('applications')}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                    activeView === 'applications'
                      ? 'bg-blue-50 text-blue-700 border border-blue-200 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Briefcase
                      className={`w-4 h-4 ${
                        activeView === 'applications' ? 'text-blue-600' : 'text-slate-400'
                      }`}
                    />
                    <span>Opportunity Vault</span>
                  </div>
                  <span
                    className={`text-[11px] px-2 py-0.5 rounded-full font-bold ${
                      activeView === 'applications'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    {applicationsCount}
                  </span>
                </button>

                <button
                  onClick={() => setActiveView('companies')}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                    activeView === 'companies'
                      ? 'bg-blue-50 text-blue-700 border border-blue-200 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Building2
                      className={`w-4 h-4 ${
                        activeView === 'companies' ? 'text-blue-600' : 'text-slate-400'
                      }`}
                    />
                    <span>Company Directory</span>
                  </div>
                  <span
                    className={`text-[11px] px-2 py-0.5 rounded-full font-bold ${
                      activeView === 'companies'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    {companiesCount}
                  </span>
                </button>
              </div>
            )}
          </div>

          {/* SECTION 2: 🎯 SOURCING HUB */}
          <div className="space-y-1.5">
            <button
              onClick={() => toggleSection('sourcing')}
              className="w-full flex items-center justify-between text-[11px] font-bold uppercase tracking-wider text-slate-400 hover:text-slate-600 px-2 py-1 transition-colors group cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <Target className="w-3.5 h-3.5 text-slate-400 group-hover:text-indigo-600 transition-colors" />
                <span>Sourcing Hub</span>
              </div>
              {sections.sourcing ? (
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              ) : (
                <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
              )}
            </button>

            {sections.sourcing && (
              <div className="space-y-1 pl-1">
                <button
                  onClick={() => setActiveView('local-sourcing')}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                    activeView === 'local-sourcing'
                      ? 'bg-blue-50 text-blue-700 border border-blue-200 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <MapPin
                      className={`w-4 h-4 ${
                        activeView === 'local-sourcing' ? 'text-blue-600' : 'text-slate-400'
                      }`}
                    />
                    <span>Local Jobs (Tangier)</span>
                  </div>
                  <span className="text-[10px] uppercase font-extrabold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md border border-blue-200">
                    Local
                  </span>
                </button>

                <button
                  onClick={() => setActiveView('remote-sourcing')}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                    activeView === 'remote-sourcing'
                      ? 'bg-purple-50 text-purple-700 border border-purple-200 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Globe
                      className={`w-4 h-4 ${
                        activeView === 'remote-sourcing' ? 'text-purple-600' : 'text-slate-400'
                      }`}
                    />
                    <span>Online / Remote Jobs</span>
                  </div>
                  <span className="text-[10px] uppercase font-extrabold text-purple-600 bg-purple-50 px-2 py-0.5 rounded-md border border-purple-200">
                    Global
                  </span>
                </button>
              </div>
            )}
          </div>

          {/* SECTION 3: 🛠️ TOOLS */}
          <div className="space-y-1.5">
            <button
              onClick={() => toggleSection('tools')}
              className="w-full flex items-center justify-between text-[11px] font-bold uppercase tracking-wider text-slate-400 hover:text-slate-600 px-2 py-1 transition-colors group cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <Wrench className="w-3.5 h-3.5 text-slate-400 group-hover:text-amber-600 transition-colors" />
                <span>Tools</span>
              </div>
              {sections.tools ? (
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              ) : (
                <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
              )}
            </button>

            {sections.tools && (
              <div className="space-y-1 pl-1">
                <button
                  onClick={() => setActiveView('keyword-vault')}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                    activeView === 'keyword-vault'
                      ? 'bg-amber-50 text-amber-800 border border-amber-200 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Tag
                      className={`w-4 h-4 ${
                        activeView === 'keyword-vault' ? 'text-amber-600' : 'text-slate-400'
                      }`}
                    />
                    <span>Keyword Vault</span>
                  </div>
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                </button>
              </div>
            )}
          </div>

          {/* SECTION 4: ⚙️ SYSTEM */}
          <div className="space-y-1.5">
            <button
              onClick={() => toggleSection('system')}
              className="w-full flex items-center justify-between text-[11px] font-bold uppercase tracking-wider text-slate-400 hover:text-slate-600 px-2 py-1 transition-colors group cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <Settings className="w-3.5 h-3.5 text-slate-400 group-hover:text-emerald-600 transition-colors" />
                <span>System</span>
              </div>
              {sections.system ? (
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              ) : (
                <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
              )}
            </button>

            {sections.system && (
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-500 flex items-center justify-between mt-1">
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
            )}
          </div>
        </nav>
      </div>
    </aside>
  );
}
