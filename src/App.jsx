import React, { useState, useEffect } from 'react';
import { Sidebar } from './components/layout/Sidebar';
import { Header } from './components/layout/Header';
import { ApplicationsBoard } from './components/applications/ApplicationsBoard';
import { ApplicationModal } from './components/applications/ApplicationModal';
import { CompanyDirectory } from './components/companies/CompanyDirectory';
import { CompanyModal } from './components/companies/CompanyModal';
import { LocalSourcing } from './components/sourcing/LocalSourcing';
import { RemoteSourcing } from './components/sourcing/RemoteSourcing';
import { KeywordVault } from './components/layout/KeywordVault';
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
  // Navigation activeView state: 'applications' | 'companies' | 'local-sourcing' | 'remote-sourcing' | 'keyword-vault'
  const [activeView, setActiveView] = useState('applications');
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
        await updateApplication(appToEdit.id, formData);
        showToast('Opportunity updated in vault!', 'success');
      } else {
        await addApplication(formData);
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
      await deleteApplication(id);
      showToast('Opportunity removed', 'info');
    }
  };

  const handleToggleAppliedApp = async (id, isApplied) => {
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
        await updateCompany(companyToEdit.id, formData);
        showToast('Company profile updated!', 'success');
      } else {
        await addCompany(formData);
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
      await deleteCompany(id);
      showToast('Company removed', 'info');
    }
  };

  const handleToggleCompanyStatus = async (id, newContactStatus) => {
    await updateCompany(id, { contactStatus: newContactStatus });
    showToast(`Contact status updated to "${newContactStatus}"`, 'success');
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
          onOpenAdd={activeView === 'applications' ? handleOpenAddApp : handleOpenAddCompany}
          upcomingCount={pendingCount}
          interviewCount={archiveCount}
        />

        <main className="flex-1 pb-12">
          <AnimatePresence mode="wait">
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
                  onStatusToggle={handleToggleCompanyStatus}
                  onOpenAdd={handleOpenAddCompany}
                />
              </motion.div>
            )}

            {activeView === 'local-sourcing' && (
              <motion.div
                key="local-sourcing"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.15 }}
              >
                <LocalSourcing searchQuery={searchQuery} />
              </motion.div>
            )}

            {activeView === 'remote-sourcing' && (
              <motion.div
                key="remote-sourcing"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.15 }}
              >
                <RemoteSourcing searchQuery={searchQuery} />
              </motion.div>
            )}

            {activeView === 'keyword-vault' && (
              <motion.div
                key="keyword-vault"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.15 }}
              >
                <KeywordVault searchQuery={searchQuery} isCollapsible={false} />
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
