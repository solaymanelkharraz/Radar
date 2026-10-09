import React, { useState, useEffect } from 'react';
import { Sidebar } from './components/layout/Sidebar';
import { Header } from './components/layout/Header';
import { ApplicationsBoard } from './components/applications/ApplicationsBoard';
import { ApplicationModal } from './components/applications/ApplicationModal';
import { CompanyDirectory } from './components/companies/CompanyDirectory';
import { CompanyModal } from './components/companies/CompanyModal';
import { SourcingCategoryView } from './components/sourcing/SourcingCategoryView';
import { DailyRoutePage } from './components/sourcing/DailyRoutePage';
import { SearchCompanyPage } from './components/sourcing/SearchCompanyPage';
import { DeveloperSearchPage } from './components/sourcing/DeveloperSearchPage';
import { SurvivalProtocolPage } from './components/sourcing/SurvivalProtocolPage';
import { Toast } from './components/ui/Toast';
import {
  subscribeApplications,
  addApplication,
  updateApplication,
  deleteApplication,
  subscribeCompanies,
  addCompany,
  updateCompany,
  deleteCompany,
} from './services/dbService';
import { motion, AnimatePresence } from 'framer-motion';

export default function App() {
  // Default activeView state set to 'daily-route' (The FIRST page that opens!)
  const [activeView, setActiveView] = useState('daily-route');
  const [searchQuery, setSearchQuery] = useState('');

  // Data states
  const [applications, setApplications] = useState([]);
  const [companies, setCompanies] = useState([]);

  // Modal states
  const [isAppModalOpen, setIsAppModalOpen] = useState(false);
  const [appToEdit, setAppToEdit] = useState(null);

  const [isCompanyModalOpen, setIsCompanyModalOpen] = useState(false);
  const [companyToEdit, setCompanyToEdit] = useState(null);

  // Toast notification state
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 3000);
  };

  // Subscribe to Supabase / Local storage feeds
  useEffect(() => {
    const unsubApps = subscribeApplications((data) => {
      setApplications(data);
    });
    const unsubComp = subscribeCompanies((data) => {
      setCompanies(data);
    });

    return () => {
      if (unsubApps) unsubApps();
      if (unsubComp) unsubComp();
    };
  }, []);

  // Reset search query when activeView changes
  const handleSelectView = (viewId) => {
    setActiveView(viewId);
    setSearchQuery('');
  };

  // -------------------------------------------------------------
  // APPLICATION HANDLERS
  // -------------------------------------------------------------
  const handleOpenAddApp = () => {
    setAppToEdit(null);
    setIsAppModalOpen(true);
  };

  const handleEditApp = (app) => {
    setAppToEdit(app);
    setIsAppModalOpen(true);
  };

  const handleSaveApp = async (formData) => {
    try {
      if (appToEdit) {
        setApplications((prev) =>
          prev.map((app) => (app.id === appToEdit.id ? { ...app, ...formData } : app))
        );
        await updateApplication(appToEdit.id, formData);
        showToast('Opportunity updated in vault!', 'success');
      } else {
        const saved = await addApplication(formData);
        if (saved && saved.id) {
          setApplications((prev) => [saved, ...prev.filter((a) => a.id !== saved.id)]);
        }
        showToast('New opportunity added to vault!', 'success');
      }
      setIsAppModalOpen(false);
      setAppToEdit(null);
    } catch (err) {
      console.error(err);
      showToast('Failed to save opportunity', 'warning');
    }
  };

  const handleDeleteApp = async (id) => {
    if (window.confirm('Are you sure you want to remove this opportunity from your vault?')) {
      setApplications((prev) => prev.filter((app) => app.id !== id));
      await deleteApplication(id);
      showToast('Opportunity removed', 'info');
    }
  };

  const handleToggleAppliedApp = async (id, isApplied) => {
    // Optimistically update React state immediately (<1ms)
    setApplications((prev) =>
      prev.map((app) => (app.id === id ? { ...app, isApplied } : app))
    );
    await updateApplication(id, { isApplied });
    showToast(
      isApplied ? 'Moved to Done / Archive ✓' : 'Moved back to Pending (Action Needed)',
      isApplied ? 'success' : 'info'
    );
  };

  // -------------------------------------------------------------
  // COMPANY HANDLERS
  // -------------------------------------------------------------
  const handleOpenAddCompany = () => {
    setCompanyToEdit(null);
    setIsCompanyModalOpen(true);
  };

  const handleEditCompany = (company) => {
    setCompanyToEdit(company);
    setIsCompanyModalOpen(true);
  };

  const handleSaveCompany = async (formData) => {
    try {
      if (companyToEdit) {
        setCompanies((prev) =>
          prev.map((c) => (c.id === companyToEdit.id ? { ...c, ...formData } : c))
        );
        await updateCompany(companyToEdit.id, formData);
        showToast('Company profile updated!', 'success');
      } else {
        const saved = await addCompany(formData);
        if (saved && saved.id) {
          setCompanies((prev) => [
            saved,
            ...prev.filter(
              (c) =>
                c.id !== saved.id &&
                c.companyName?.trim().toLowerCase() !== saved.companyName?.trim().toLowerCase()
            ),
          ]);
        }
        showToast('Company added to directory!', 'success');
      }
      setIsCompanyModalOpen(false);
      setCompanyToEdit(null);
    } catch (err) {
      console.error(err);
      showToast('Failed to save company', 'warning');
    }
  };

  const handleDeleteCompany = async (id) => {
    if (window.confirm('Are you sure you want to remove this company from directory?')) {
      setCompanies((prev) => prev.filter((c) => c.id !== id));
      await deleteCompany(id);
      showToast('Company removed', 'info');
    }
  };

  const handleToggleCompanyStatus = async (id, newContactStatus, scheduledForDate = null) => {
    const updatePayload = { contactStatus: newContactStatus };
    if (scheduledForDate) updatePayload.scheduledFor = scheduledForDate;

    setCompanies((prev) =>
      prev.map((c) => (c.id === id ? { ...c, ...updatePayload } : c))
    );
    await updateCompany(id, updatePayload);
    showToast(`Contact status updated to "${newContactStatus}"`, 'success');
  };

  const handleDraftGmailAndSchedule = async (id, nextTuesdayISO) => {
    setCompanies((prev) =>
      prev.map((c) =>
        c.id === id
          ? { ...c, contactStatus: 'CV Sent', scheduledFor: nextTuesdayISO }
          : c
      )
    );
    await updateCompany(id, { contactStatus: 'CV Sent', scheduledFor: nextTuesdayISO });
    showToast('Draft opened! Locked to Tuesday 09:30 AM send', 'success');
  };

  const handleToggleRelanceSent = async (id, relanceSent) => {
    setCompanies((prev) =>
      prev.map((c) => (c.id === id ? { ...c, relanceSent } : c))
    );
    await updateCompany(id, { relanceSent });
    showToast(
      relanceSent ? 'Follow-up marked as sent ✓' : 'Follow-up status reset',
      relanceSent ? 'success' : 'info'
    );
  };

  const handleResetAllCompanyStatuses = async () => {
    if (window.confirm('Reset all companies back to "À Contacter" (Not Contacted)?')) {
      setCompanies((prev) =>
        prev.map((c) => ({
          ...c,
          contactStatus: 'Not Contacted',
          scheduledFor: null,
          relanceSent: false,
        }))
      );
      for (const comp of companies) {
        await updateCompany(comp.id, {
          contactStatus: 'Not Contacted',
          scheduledFor: null,
          relanceSent: false,
        });
      }
      showToast('All companies reset to "À Contacter"', 'info');
    }
  };

  const handleCopyEmailToast = (email) => {
    showToast(`Copied ${email} to clipboard!`, 'info');
  };

  // Stats calculation
  const pendingCount = applications.filter((a) => !a.isApplied).length;
  const archiveCount = applications.filter((a) => a.isApplied).length;

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-blue-500/20 selection:text-blue-900">
      {/* Sidebar */}
      <Sidebar
        activeView={activeView}
        setActiveView={handleSelectView}
        onOpenAddApp={handleOpenAddApp}
        onOpenAddCompany={handleOpenAddCompany}
        applicationsCount={applications.length}
        companiesCount={companies.length}
      />

      {/* Main Content Workspace */}
      <div className="flex-1 flex flex-col min-w-0 min-h-screen">
        <Header
          activeView={activeView}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          onOpenAdd={handleOpenAddApp}
          upcomingCount={pendingCount}
          interviewCount={archiveCount}
        />

        <main className="flex-1 pb-12">
          <AnimatePresence mode="wait">
            {/* 1. FIRST PAGE THAT OPENS: Daily Scouting Route */}
            {activeView === 'daily-route' && (
              <motion.div
                key="daily-route"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.15 }}
              >
                <DailyRoutePage onNavigateCategory={handleSelectView} />
              </motion.div>
            )}

            {/* 2. Opportunity Vault */}
            {activeView === 'applications' && (
              <motion.div
                key="applications"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.15 }}
              >
                <ApplicationsBoard
                  applications={applications}
                  searchQuery={searchQuery}
                  onEdit={handleEditApp}
                  onDelete={handleDeleteApp}
                  onToggleApplied={handleToggleAppliedApp}
                  onOpenAdd={handleOpenAddApp}
                />
              </motion.div>
            )}

            {/* 3. Company Directory */}
            {activeView === 'companies' && (
              <motion.div
                key="companies"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.15 }}
              >
                <CompanyDirectory
                  companies={companies}
                  searchQuery={searchQuery}
                  onEdit={handleEditCompany}
                  onDelete={handleDeleteCompany}
                  onCopyEmail={handleCopyEmailToast}
                  onDraftGmail={handleDraftGmailAndSchedule}
                  onToggleRelanceSent={handleToggleRelanceSent}
                  onResetAllCompanyStatuses={handleResetAllCompanyStatuses}
                  onStatusToggle={handleToggleCompanyStatus}
                  onOpenAdd={handleOpenAddCompany}
                />
              </motion.div>
            )}

            {/* 4. Search Company (Local Recon) */}
            {(activeView === 'search-company' || activeView === 'search-library') && (
              <motion.div
                key="search-company"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.15 }}
              >
                <SearchCompanyPage searchQuery={searchQuery} />
              </motion.div>
            )}

            {/* 5. Developer Search (Dev Feeds & Dorks) */}
            {activeView === 'developer-search' && (
              <motion.div
                key="developer-search"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.15 }}
              >
                <DeveloperSearchPage searchQuery={searchQuery} />
              </motion.div>
            )}

            {/* 5. Survival Protocol (Quick-Hire Fallback) */}
            {activeView === 'survival-protocol' && (
              <motion.div
                key="survival-protocol"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.15 }}
              >
                <SurvivalProtocolPage />
              </motion.div>
            )}

            {/* 4. Sourcing Hub Category Sub-Pages */}
            {activeView.startsWith('sourcing-') && (
              <motion.div
                key={activeView}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.15 }}
              >
                <SourcingCategoryView categoryId={activeView} searchQuery={searchQuery} />
              </motion.div>
            )}
          </AnimatePresence>
        </main>
      </div>

      {/* Application Add/Edit Modal */}
      <ApplicationModal
        isOpen={isAppModalOpen}
        onClose={() => {
          setIsAppModalOpen(false);
          setAppToEdit(null);
        }}
        onSave={handleSaveApp}
        applicationToEdit={appToEdit}
        companiesList={companies}
      />

      {/* Company Add/Edit Modal */}
      <CompanyModal
        isOpen={isCompanyModalOpen}
        onClose={() => {
          setIsCompanyModalOpen(false);
          setCompanyToEdit(null);
        }}
        onSave={handleSaveCompany}
        companyToEdit={companyToEdit}
      />

      {/* Notification Toast */}
      <Toast toast={toast} onClose={() => setToast(null)} />
    </div>
  );
}
