import { supabase, isDemoMode } from '../config/supabaseClient';
import { INITIAL_APPLICATIONS, INITIAL_COMPANIES } from '../mock/initialData';

const STORAGE_KEYS = {
  APPLICATIONS: 'radar_applications_v2',
  COMPANIES: 'radar_companies_v1',
};

// Helper: Get local storage data or initialize with fallback seed data
const getLocalData = (key, initialFallback) => {
  const data = localStorage.getItem(key);
  if (!data) {
    localStorage.setItem(key, JSON.stringify(initialFallback));
    return initialFallback;
  }
  try {
    return JSON.parse(data);
  } catch (e) {
    return initialFallback;
  }
};

const saveLocalData = (key, items) => {
  localStorage.setItem(key, JSON.stringify(items));
};

// Map Supabase rows to JS objects
const mapAppFromSupabase = (row) => ({
  id: row.id,
  companyName: row.company_name || row.companyName,
  jobTitle: row.job_title || row.jobTitle,
  source: row.source,
  priority: row.priority || 'Medium',
  linkToApply: row.link_to_apply || row.linkToApply || '',
  responseUrl: row.response_url || row.responseUrl || '',
  deadlineDate: row.deadline_date || row.deadlineDate,
  isApplied: row.is_applied !== undefined ? row.is_applied : (row.isApplied ?? false),
  requirements: row.requirements || '',
  notes: row.notes || '',
  createdAt: row.created_at || row.createdAt,
});

const mapAppToSupabase = (app) => ({
  company_name: app.companyName,
  job_title: app.jobTitle,
  source: app.source,
  priority: app.priority || 'Medium',
  link_to_apply: app.linkToApply || null,
  response_url: app.responseUrl || null,
  deadline_date: app.deadlineDate || null,
  is_applied: app.isApplied ?? false,
  requirements: app.requirements || null,
  notes: app.notes || null,
});

const mapCompanyFromSupabase = (row) => ({
  id: row.id,
  companyName: row.company_name || row.companyName,
  sector: row.sector,
  location: row.location,
  hrEmail: row.hr_email || row.hrEmail,
  website: row.website,
  contactStatus: row.contact_status || row.contactStatus,
  createdAt: row.created_at || row.createdAt,
});

const mapCompanyToSupabase = (company) => ({
  company_name: company.companyName,
  sector: company.sector || null,
  location: company.location || null,
  hr_email: company.hrEmail || null,
  website: company.website || null,
  contact_status: company.contactStatus || 'Not Contacted',
});

// -------------------------------------------------------------
// APPLICATIONS SERVICE (SUPABASE & LOCAL FALLBACK)
// -------------------------------------------------------------

export const subscribeApplications = (callback) => {
  if (isDemoMode || !supabase) {
    const localApps = getLocalData(STORAGE_KEYS.APPLICATIONS, INITIAL_APPLICATIONS);
    callback(localApps);

    const handleStorageChange = () => {
      callback(getLocalData(STORAGE_KEYS.APPLICATIONS, INITIAL_APPLICATIONS));
    };
    window.addEventListener('radar_app_update', handleStorageChange);
    return () => window.removeEventListener('radar_app_update', handleStorageChange);
  } else {
    const fetchApps = async () => {
      const { data, error } = await supabase
        .from('applications')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching applications from Supabase:', error);
      } else {
        callback((data || []).map(mapAppFromSupabase));
      }
    };

    fetchApps();

    const handleImmediateUpdate = () => {
      fetchApps();
    };
    window.addEventListener('radar_app_update', handleImmediateUpdate);

    const channel = supabase
      .channel('public:applications')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'applications' }, () => {
        fetchApps();
      })
      .subscribe();

    return () => {
      window.removeEventListener('radar_app_update', handleImmediateUpdate);
      supabase.removeChannel(channel);
    };
  }
};

export const addApplication = async (appData) => {
  const newItem = {
    ...appData,
    priority: appData.priority || 'Medium',
    responseUrl: appData.responseUrl || '',
    isApplied: appData.isApplied ?? false,
  };

  if (isDemoMode || !supabase) {
    const local = getLocalData(STORAGE_KEYS.APPLICATIONS, INITIAL_APPLICATIONS);
    const id = 'app-' + Date.now();
    const itemToSave = { id, ...newItem, createdAt: Date.now() };
    const updated = [itemToSave, ...local];
    saveLocalData(STORAGE_KEYS.APPLICATIONS, updated);
    window.dispatchEvent(new Event('radar_app_update'));
    return itemToSave;
  } else {
    const payload = mapAppToSupabase(newItem);
    let { data, error } = await supabase.from('applications').insert([payload]).select();

    // Fallback: If priority or response_url columns do not exist yet in Supabase table schema
    if (error && (error.code === 'PGRST204' || error.status === 400)) {
      console.warn('Supabase schema error. Retrying insert with sanitized payload...');
      delete payload.priority;
      delete payload.response_url;
      const retry = await supabase.from('applications').insert([payload]).select();
      data = retry.data;
      error = retry.error;
    }

    if (error) {
      console.error('Error adding application to Supabase:', error);
      throw error;
    }
    window.dispatchEvent(new Event('radar_app_update'));
    return mapAppFromSupabase(data[0]);
  }
};

export const updateApplication = async (id, appData) => {
  if (isDemoMode || !supabase) {
    const local = getLocalData(STORAGE_KEYS.APPLICATIONS, INITIAL_APPLICATIONS);
    const updated = local.map((item) => (item.id === id ? { ...item, ...appData } : item));
    saveLocalData(STORAGE_KEYS.APPLICATIONS, updated);
    window.dispatchEvent(new Event('radar_app_update'));
  } else {
    const payload = {};
    if (appData.companyName !== undefined) payload.company_name = appData.companyName;
    if (appData.jobTitle !== undefined) payload.job_title = appData.jobTitle;
    if (appData.source !== undefined) payload.source = appData.source;
    if (appData.priority !== undefined) payload.priority = appData.priority;
    if (appData.linkToApply !== undefined) payload.link_to_apply = appData.linkToApply || null;
    if (appData.responseUrl !== undefined) payload.response_url = appData.responseUrl || null;
    if (appData.deadlineDate !== undefined) payload.deadline_date = appData.deadlineDate || null;
    if (appData.isApplied !== undefined) payload.is_applied = appData.isApplied;
    if (appData.requirements !== undefined) payload.requirements = appData.requirements || null;
    if (appData.notes !== undefined) payload.notes = appData.notes || null;

    let { error } = await supabase.from('applications').update(payload).eq('id', id);

    // Fallback: If column does not exist yet in Supabase table schema
    if (error && (error.code === 'PGRST204' || error.status === 400)) {
      console.warn('Supabase schema missing columns. Retrying update with base payload...');
      delete payload.priority;
      delete payload.response_url;
      const retry = await supabase.from('applications').update(payload).eq('id', id);
      error = retry.error;
    }

    if (error) {
      console.error('Error updating application in Supabase:', error);
      throw error;
    }
    window.dispatchEvent(new Event('radar_app_update'));
  }
};

export const deleteApplication = async (id) => {
  if (isDemoMode || !supabase) {
    const local = getLocalData(STORAGE_KEYS.APPLICATIONS, INITIAL_APPLICATIONS);
    const updated = local.filter((item) => item.id !== id);
    saveLocalData(STORAGE_KEYS.APPLICATIONS, updated);
    window.dispatchEvent(new Event('radar_app_update'));
  } else {
    const { error } = await supabase.from('applications').delete().eq('id', id);
    if (error) {
      console.error('Error deleting application from Supabase:', error);
      throw error;
    }
    window.dispatchEvent(new Event('radar_app_update'));
  }
};

// -------------------------------------------------------------
// COMPANIES SERVICE (SUPABASE & LOCAL FALLBACK)
// -------------------------------------------------------------

export const subscribeCompanies = (callback) => {
  if (isDemoMode || !supabase) {
    const localComp = getLocalData(STORAGE_KEYS.COMPANIES, INITIAL_COMPANIES);
    callback(localComp);

    const handleStorageChange = () => {
      callback(getLocalData(STORAGE_KEYS.COMPANIES, INITIAL_COMPANIES));
    };
    window.addEventListener('radar_company_update', handleStorageChange);
    return () => window.removeEventListener('radar_company_update', handleStorageChange);
  } else {
    const fetchCompanies = async () => {
      const { data, error } = await supabase
        .from('companies')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching companies from Supabase:', error);
      } else {
        callback((data || []).map(mapCompanyFromSupabase));
      }
    };

    fetchCompanies();

    const handleImmediateUpdate = () => {
      fetchCompanies();
    };
    window.addEventListener('radar_company_update', handleImmediateUpdate);

    const channel = supabase
      .channel('public:companies')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'companies' }, () => {
        fetchCompanies();
      })
      .subscribe();

    return () => {
      window.removeEventListener('radar_company_update', handleImmediateUpdate);
      supabase.removeChannel(channel);
    };
  }
};

export const addCompany = async (companyData) => {
  if (isDemoMode || !supabase) {
    const local = getLocalData(STORAGE_KEYS.COMPANIES, INITIAL_COMPANIES);
    const id = 'comp-' + Date.now();
    const newItem = { id, ...companyData, createdAt: Date.now() };
    const updated = [newItem, ...local];
    saveLocalData(STORAGE_KEYS.COMPANIES, updated);
    window.dispatchEvent(new Event('radar_company_update'));
    return newItem;
  } else {
    const payload = mapCompanyToSupabase(companyData);
    const { data, error } = await supabase.from('companies').insert([payload]).select();
    if (error) {
      console.error('Error adding company to Supabase:', error);
      throw error;
    }
    window.dispatchEvent(new Event('radar_company_update'));
    return mapCompanyFromSupabase(data[0]);
  }
};

export const updateCompany = async (id, companyData) => {
  if (isDemoMode || !supabase) {
    const local = getLocalData(STORAGE_KEYS.COMPANIES, INITIAL_COMPANIES);
    const updated = local.map((item) => (item.id === id ? { ...item, ...companyData } : item));
    saveLocalData(STORAGE_KEYS.COMPANIES, updated);
    window.dispatchEvent(new Event('radar_company_update'));
  } else {
    const payload = mapCompanyToSupabase(companyData);
    const { error } = await supabase.from('companies').update(payload).eq('id', id);
    if (error) {
      console.error('Error updating company in Supabase:', error);
      throw error;
    }
    window.dispatchEvent(new Event('radar_company_update'));
  }
};

export const deleteCompany = async (id) => {
  if (isDemoMode || !supabase) {
    const local = getLocalData(STORAGE_KEYS.COMPANIES, INITIAL_COMPANIES);
    const updated = local.filter((item) => item.id !== id);
    saveLocalData(STORAGE_KEYS.COMPANIES, updated);
    window.dispatchEvent(new Event('radar_company_update'));
  } else {
    const { error } = await supabase.from('companies').delete().eq('id', id);
    if (error) {
      console.error('Error deleting company from Supabase:', error);
      throw error;
    }
    window.dispatchEvent(new Event('radar_company_update'));
  }
};
