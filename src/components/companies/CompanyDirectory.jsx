import React, { useState } from 'react';
import { CompanyRow } from './CompanyRow';
import { CompanyDetailDrawer } from './CompanyDetailDrawer';
import { Building2, Plus, Filter, Mail, RotateCcw, Clock } from 'lucide-react';
import { getRelancePipelineStatus } from '../../utils/companyUtils';

export function CompanyDirectory({
  companies,
  searchQuery,
  onEdit,
  onDelete,
  onCopyEmail,
  onStatusToggle,
  onDraftGmail,
  onToggleRelanceSent,
  onResetAllCompanyStatuses,
  onOpenAdd,
}) {
  const [sectorFilter, setSectorFilter] = useState('ALL');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [selectedCompanyId, setSelectedCompanyId] = useState(null);

  const selectedCompany = companies.find((c) => c.id === selectedCompanyId) || null;

  // Extract unique sectors
  const sectorsList = ['ALL', ...new Set(companies.map((c) => c.sector).filter(Boolean))];

  // Pipeline status counts
  const relanceDueCount = companies.filter((c) => getRelancePipelineStatus(c).rawKey === 'RELANCE_DUE').length;
  const programmedCount = companies.filter((c) => getRelancePipelineStatus(c).rawKey === 'PROGRAMME').length;
  const email1SentCount = companies.filter((c) => getRelancePipelineStatus(c).rawKey === 'EMAIL_1_SENT').length;
  const relanceSentCount = companies.filter((c) => getRelancePipelineStatus(c).rawKey === 'RELANCE_SENT').length;
  const aContacterCount = companies.filter((c) => getRelancePipelineStatus(c).rawKey === 'A_CONTACTER').length;

  // Filter companies by search query, sector & pipeline status
  const filteredCompanies = companies.filter((c) => {
    const pipeline = getRelancePipelineStatus(c);
    const matchesSearch =
      !searchQuery ||
      c.companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (c.sector && c.sector.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (c.location && c.location.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (c.hrEmail && c.hrEmail.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (c.phone && c.phone.includes(searchQuery));

    const matchesSector = sectorFilter === 'ALL' || c.sector === sectorFilter;
    const matchesStatus = statusFilter === 'ALL' || pipeline.rawKey === statusFilter;

    return matchesSearch && matchesSector && matchesStatus;
  });

  return (
    <div className="p-8 space-y-7 font-sans">
      {/* Directory Header Bar & Sector Pills */}
      <div className="bg-white p-4 px-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        {/* Left: Sector Filter Pills */}
        <div className="flex items-center gap-3 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
          <span className="text-xs text-slate-500 font-bold uppercase tracking-wider mr-2 flex items-center gap-2 flex-shrink-0">
            <Filter className="w-4 h-4 text-slate-400" />
            Sector:
          </span>
          {sectorsList.map((sec) => (
            <button
              key={sec}
              onClick={() => setSectorFilter(sec)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                sectorFilter === sec
                  ? 'bg-blue-50 text-blue-700 border border-blue-200 shadow-xs'
                  : 'bg-slate-100 text-slate-600 border border-slate-200 hover:bg-slate-200/60'
              }`}
            >
              {sec}
            </button>
          ))}
        </div>

        {/* Right: Pipeline Status Filter & Add Button */}
        <div className="flex flex-wrap items-center gap-3 justify-end flex-shrink-0">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-slate-400" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3.5 py-2.5 bg-white border border-slate-300 rounded-xl text-xs font-bold text-slate-700 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 shadow-xs cursor-pointer"
            >
              <option value="ALL">All Pipeline Statuses ({companies.length})</option>
              <option value="RELANCE_DUE">🚨 Follow-Up Due ({relanceDueCount})</option>
              <option value="PROGRAMME">📅 Scheduled ({programmedCount})</option>
              <option value="EMAIL_1_SENT">✉️ Email 1 Sent ({email1SentCount})</option>
              <option value="RELANCE_SENT">✅ Follow-Up Sent ({relanceSentCount})</option>
              <option value="A_CONTACTER">⏳ To Contact ({aContacterCount})</option>
            </select>

            {statusFilter !== 'ALL' && (
              <button
                onClick={() => setStatusFilter('ALL')}
                className="p-2 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100 transition-colors"
                title="Reset Status Filter"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          <button
            onClick={onOpenAdd}
            className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs flex items-center justify-center gap-2 shadow-xs transition-all active:scale-95 flex-shrink-0 cursor-pointer"
          >
            <Plus className="w-4 h-4 stroke-[2.5]" />
            <span>+ Add Company</span>
          </button>
        </div>
      </div>

      {/* Clean Data Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[850px]">
            <thead>
              <tr className="bg-slate-50/80 border-b border-slate-200 text-[11px] font-bold uppercase tracking-wider text-slate-500">
                <th className="py-3.5 px-6">Company</th>
                <th className="py-3.5 px-6">Sector</th>
                <th className="py-3.5 px-6">Pipeline Status</th>
                <th className="py-3.5 px-6">Gmail Action</th>
                <th className="py-3.5 px-6 text-right">Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredCompanies.length > 0 ? (
                filteredCompanies.map((comp) => (
                  <CompanyRow
                    key={comp.id}
                    company={comp}
                    onClick={() => setSelectedCompanyId(comp.id)}
                    onCopyEmail={onCopyEmail}
                    onDraftGmail={onDraftGmail}
                    onToggleRelanceSent={onToggleRelanceSent}
                    onStatusToggle={onStatusToggle}
                  />
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="py-16 text-center text-slate-500">
                    <div className="flex flex-col items-center justify-center gap-3">
                      <Building2 className="w-10 h-10 text-slate-300" />
                      <p className="text-sm font-medium">No companies match your search or filter.</p>
                      <button
                        onClick={onOpenAdd}
                        className="text-xs text-blue-600 hover:text-blue-700 font-bold mt-1 underline cursor-pointer"
                      >
                        + Add company to directory
                      </button>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Slide-over Company Detail Drawer */}
      <CompanyDetailDrawer
        isOpen={!!selectedCompanyId && !!selectedCompany}
        onClose={() => setSelectedCompanyId(null)}
        company={selectedCompany}
        onEdit={onEdit}
        onDelete={onDelete}
        onCopyEmail={onCopyEmail}
        onDraftGmail={onDraftGmail}
        onToggleRelanceSent={onToggleRelanceSent}
        onStatusToggle={onStatusToggle}
      />
    </div>
  );
}
