import React, { useState } from 'react';
import { ApplicationCard } from './ApplicationCard';
import { ApplicationDetailDrawer } from './ApplicationDetailDrawer';
import { Plus, Clock, Archive, CheckCircle2, Filter, RotateCcw } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export function ApplicationsBoard({ applications, searchQuery, onEdit, onDelete, onToggleApplied, onOpenAdd }) {
  // Vault Tab Filter: 'pending' (isApplied: false) | 'archive' (isApplied: true)
  const [activeVaultTab, setActiveVaultTab] = useState('pending');

  // Priority Filter: 'All' | 'High' | 'Medium' | 'Low'
  const [priorityFilter, setPriorityFilter] = useState('All');

  // Selected Application for Detail Drawer
  const [selectedApp, setSelectedApp] = useState(null);

  // Raw counts before search & priority filters
  const rawPendingCount = applications.filter((app) => !app.isApplied).length;
  const rawArchiveCount = applications.filter((app) => app.isApplied).length;

  // Filter applications by search query AND priority filter
  const filteredApps = applications.filter((app) => {
    const appPriority = app.priority || 'Medium';
    const matchesPriority = priorityFilter === 'All' || appPriority === priorityFilter;

    if (!matchesPriority) return false;

    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return (
      app.jobTitle.toLowerCase().includes(q) ||
      app.companyName.toLowerCase().includes(q) ||
      (app.source && app.source.toLowerCase().includes(q)) ||
      (app.requirements && app.requirements.toLowerCase().includes(q)) ||
      (app.notes && app.notes.toLowerCase().includes(q))
    );
  });

  const pendingApps = filteredApps.filter((app) => !app.isApplied);
  const archiveApps = filteredApps.filter((app) => app.isApplied);

  const currentTabApps = activeVaultTab === 'pending' ? pendingApps : archiveApps;
  const isFilterActive = priorityFilter !== 'All' || !!searchQuery;

  return (
    <div className="p-8 space-y-8 font-sans">
      {/* Opportunity Vault Top Filter Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        {/* Left: Filter Tabs (Pending vs Archive) */}
        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={() => setActiveVaultTab('pending')}
            className={`flex items-center gap-3 px-5 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
              activeVaultTab === 'pending'
                ? 'bg-amber-50 text-amber-800 border border-amber-300 shadow-xs'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            <Clock className={`w-4 h-4 ${activeVaultTab === 'pending' ? 'text-amber-600' : 'text-slate-400'}`} />
            <span>Pending (Action Needed)</span>
            <span
              className={`px-2.5 py-0.5 rounded-full text-[11px] font-extrabold border ${
                activeVaultTab === 'pending'
                  ? 'bg-amber-100 text-amber-900 border-amber-300'
                  : 'bg-slate-100 text-slate-600 border-slate-200'
              }`}
            >
              {isFilterActive ? `${pendingApps.length} / ${rawPendingCount}` : pendingApps.length}
            </span>
          </button>

          <button
            onClick={() => setActiveVaultTab('archive')}
            className={`flex items-center gap-3 px-5 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
              activeVaultTab === 'archive'
                ? 'bg-slate-100 text-slate-800 border border-slate-300 shadow-xs'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            <Archive className={`w-4 h-4 ${activeVaultTab === 'archive' ? 'text-slate-700' : 'text-slate-400'}`} />
            <span>Done / Archive</span>
            <span
              className={`px-2.5 py-0.5 rounded-full text-[11px] font-extrabold border ${
                activeVaultTab === 'archive'
                  ? 'bg-slate-200 text-slate-800 border-slate-300'
                  : 'bg-slate-100 text-slate-600 border-slate-200'
              }`}
            >
              {isFilterActive ? `${archiveApps.length} / ${rawArchiveCount}` : archiveApps.length}
            </span>
          </button>
        </div>

        {/* Right: Priority Filter & Quick Add Button */}
        <div className="flex flex-wrap items-center gap-3 justify-end">
          {/* Priority Filter Dropdown */}
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-slate-400" />
            <select
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
              className="px-3.5 py-2.5 bg-white border border-slate-300 rounded-xl text-xs font-bold text-slate-700 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 shadow-xs cursor-pointer"
            >
              <option value="All">All Priorities</option>
              <option value="High">🔴 High Priority</option>
              <option value="Medium">🟡 Medium Priority</option>
              <option value="Low">🟢 Low Priority</option>
            </select>

            {priorityFilter !== 'All' && (
              <button
                onClick={() => setPriorityFilter('All')}
                className="p-2 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100 transition-colors"
                title="Reset Priority Filter"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Quick Add Button */}
          <button
            onClick={onOpenAdd}
            className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs flex items-center gap-2 shadow-xs transition-all active:scale-95 flex-shrink-0 cursor-pointer"
          >
            <Plus className="w-4 h-4 stroke-[2.5]" />
            <span>+ Add Opportunity</span>
          </button>
        </div>
      </div>

      {/* Grid of Compact Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence mode="popLayout">
          {currentTabApps.length > 0 ? (
            currentTabApps.map((app) => (
              <ApplicationCard
                key={app.id}
                application={app}
                onClick={() => setSelectedApp(app)}
              />
            ))
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="col-span-full p-16 rounded-2xl border border-dashed border-slate-300 bg-white text-center flex flex-col items-center justify-center gap-3 shadow-sm"
            >
              {activeVaultTab === 'pending' ? (
                <>
                  <CheckCircle2 className="w-10 h-10 text-emerald-600" />
                  <p className="text-base font-bold text-slate-900">No matching opportunities</p>
                  <p className="text-xs text-slate-500 max-w-sm">
                    {priorityFilter !== 'All'
                      ? `No ${priorityFilter} priority items in pending action.`
                      : 'No pending opportunities requiring action. Click below to add a new offer to your vault.'}
                  </p>
                </>
              ) : (
                <>
                  <Archive className="w-10 h-10 text-slate-400" />
                  <p className="text-base font-bold text-slate-700">Archive is empty or filtered</p>
                  <p className="text-xs text-slate-500 max-w-sm">
                    {priorityFilter !== 'All'
                      ? `No ${priorityFilter} priority items match your filter in archive.`
                      : 'Mark opportunities as applied to move them to your archive vault.'}
                  </p>
                </>
              )}

              <button
                onClick={onOpenAdd}
                className="mt-3 px-5 py-2.5 rounded-xl bg-blue-50 text-blue-700 border border-blue-200 text-xs font-extrabold flex items-center gap-2 cursor-pointer hover:bg-blue-100"
              >
                <Plus className="w-4 h-4" />
                <span>Add New Opportunity</span>
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Slide-over Detail Drawer */}
      <ApplicationDetailDrawer
        isOpen={!!selectedApp}
        onClose={() => setSelectedApp(null)}
        application={selectedApp}
        onEdit={onEdit}
        onDelete={onDelete}
        onToggleApplied={onToggleApplied}
      />
    </div>
  );
}
