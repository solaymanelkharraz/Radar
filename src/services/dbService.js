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

// Map Supabase rows to JS objects with full fallback support
const mapAppFromSupabase = (row) => ({
  id: row.id,
  companyName: row.company_name || row.companyName || row.company || '',
  jobTitle: row.job_title || row.jobTitle || row.title || '',
  source: row.source || 'Spontaneous',
  priority: row.priority || 'Medium',
  linkToApply: row.link_to_apply || row.linkToApply || row.link || '',
  responseUrl: row.response_url || row.responseUrl || '',
  deadlineDate: row.deadline_date || row.deadlineDate || '',
  isApplied: row.is_applied !== undefined ? row.is_applied : (row.isApplied ?? false),
  requirements: row.requirements || '',
  notes: row.notes || '',
  createdAt: row.created_at || row.createdAt || Date.now(),
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

const mapCompanyFromSupabase = (row) => {
  const contactStatus = row.contact_status || row.contactStatus || 'Not Contacted';
  let scheduledFor = row.scheduled_for || row.scheduledFor || null;

  // Fallback: If company has 'CV Sent' but scheduled_for timestamp wasn't saved in DB,
  // lock it to last Tuesday, Oct 6, 2026 at 09:30 AM
  if (contactStatus === 'CV Sent' && !scheduledFor) {
    scheduledFor = '2026-10-06T09:30:00.000Z';
  }

  return {
    id: row.id,
    companyName: row.company_name || row.companyName,
    sector: row.sector,
    location: row.location,
    hrEmail: row.hr_email || row.hrEmail,
    phone: row.phone || row.contact_number || row.contactNumber || row.phone_number || '',
    website: row.website,
    contactStatus,
    emailSubject: row.email_subject || row.emailSubject || "Application: Full-Stack Developer Position",
    emailBody: row.email_body !== undefined ? (row.email_body || "") : (row.emailBody || ""),
    scheduledFor,
    relanceSent: row.relance_sent !== undefined ? row.relance_sent : (row.relanceSent ?? false),
    createdAt: row.created_at || row.createdAt,
  };
};

const mapCompanyToSupabase = (company) => ({
  company_name: company.companyName,
  sector: company.sector || null,
  location: company.location || null,
  hr_email: company.hrEmail || null,
  phone: company.phone || null,
  website: company.website || null,
  contact_status: company.contactStatus || 'Not Contacted',
  email_subject: company.emailSubject || "Application: Full-Stack Developer Position",
  email_body: company.emailBody || null,
  scheduled_for: company.scheduledFor || null,
  relance_sent: company.relanceSent ?? false,
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
      const localApps = getLocalData(STORAGE_KEYS.APPLICATIONS, INITIAL_APPLICATIONS);
      try {
        const { data, error } = await supabase
          .from('applications')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) {
          console.warn('Network issue fetching applications from Supabase. Using local cache:', error);
          callback(localApps);
        } else {
          // Merge Supabase data with Local Storage cache to ensure zero data loss and prevent duplicates
          const parsedFromSupabase = (data || []).map((row) => {
            const mapped = mapAppFromSupabase(row);
            const localMatch = localApps.find((l) =>
              l.id === mapped.id ||
              (l.jobTitle && mapped.jobTitle && l.jobTitle.trim().toLowerCase() === mapped.jobTitle.trim().toLowerCase() &&
               l.companyName && mapped.companyName && l.companyName.trim().toLowerCase() === mapped.companyName.trim().toLowerCase())
            );
            if (localMatch) {
              return {
                ...mapped,
                ...localMatch,
                id: mapped.id || localMatch.id,
                companyName: mapped.companyName || localMatch.companyName || 'Unknown Organization',
                jobTitle: mapped.jobTitle || localMatch.jobTitle || 'Untitled Opportunity',
                requirements: mapped.requirements || localMatch.requirements || '',
                notes: mapped.notes || localMatch.notes || '',
                linkToApply: mapped.linkToApply || localMatch.linkToApply || '',
                responseUrl: mapped.responseUrl || localMatch.responseUrl || '',
                priority: localMatch.priority || mapped.priority || 'Medium',
                source: mapped.source || localMatch.source || 'Spontaneous',
                isApplied: localMatch.isApplied !== undefined ? localMatch.isApplied : mapped.isApplied,
              };
            }
            return mapped;
          });

          // Also preserve any local-only applications that have not hit Supabase yet and filter duplicates
          const localOnly = localApps.filter(
            (localItem) =>
              !parsedFromSupabase.some(
                (p) =>
                  p.id === localItem.id ||
                  (p.jobTitle && localItem.jobTitle && p.jobTitle.trim().toLowerCase() === localItem.jobTitle.trim().toLowerCase() &&
                   p.companyName && localItem.companyName && p.companyName.trim().toLowerCase() === localItem.companyName.trim().toLowerCase())
              )
          );

          const parsed = [...localOnly, ...parsedFromSupabase];

          saveLocalData(STORAGE_KEYS.APPLICATIONS, parsed);
          callback(parsed);
        }
      } catch (err) {
        console.warn('Connection reset/offline. Falling back to local applications:', err);
        callback(localApps);
      }
    };

    fetchApps();

    const handleImmediateUpdate = () => {
      fetchApps();
    };
    window.addEventListener('radar_app_update', handleImmediateUpdate);

    let channel;
    try {
      channel = supabase
        .channel('public:applications')
        .on('postgres_changes', { event: '*', schema: 'public', table: 'applications' }, () => {
          fetchApps();
        })
        .subscribe();
    } catch (e) {
      console.warn('Realtime channel subscription unavailable');
    }

    return () => {
      window.removeEventListener('radar_app_update', handleImmediateUpdate);
      if (channel) supabase.removeChannel(channel);
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

  const saveLocalApp = (assignedId) => {
    const local = getLocalData(STORAGE_KEYS.APPLICATIONS, INITIAL_APPLICATIONS);
    const id = assignedId || appData.id || 'app-' + Date.now();
    const itemToSave = { id, ...newItem, createdAt: Date.now() };
    const updated = [
      itemToSave,
      ...local.filter(
        (item) =>
          item.id !== id &&
          !(
            item.jobTitle?.trim().toLowerCase() === newItem.jobTitle?.trim().toLowerCase() &&
            item.companyName?.trim().toLowerCase() === newItem.companyName?.trim().toLowerCase()
          )
      ),
    ];
    saveLocalData(STORAGE_KEYS.APPLICATIONS, updated);
    window.dispatchEvent(new Event('radar_app_update'));
    return itemToSave;
  };

  if (isDemoMode || !supabase) {
    return saveLocalApp();
  }

  try {
    const payload = mapAppToSupabase(newItem);
    let { data, error } = await supabase.from('applications').insert([payload]).select();

    if (error && (error.code === 'PGRST204' || error.status === 400)) {
      delete payload.priority;
      delete payload.response_url;
      const retry = await supabase.from('applications').insert([payload]).select();
      data = retry.data;
      error = retry.error;
    }

    if (error) {
      console.warn('Supabase insert failed. Saving locally as fallback:', error);
      return saveLocalApp();
    }

    const createdApp = mapAppFromSupabase(data[0]);
    saveLocalApp(createdApp.id);
    return createdApp;
  } catch (err) {
    console.warn('Connection reset during addApplication. Saving locally:', err);
    return saveLocalApp();
  }
};

export const updateApplication = async (id, appData) => {
  const saveLocalUpdate = () => {
    const local = getLocalData(STORAGE_KEYS.APPLICATIONS, INITIAL_APPLICATIONS);
    const updated = local.map((item) => (item.id === id ? { ...item, ...appData } : item));
    saveLocalData(STORAGE_KEYS.APPLICATIONS, updated);
    window.dispatchEvent(new Event('radar_app_update'));
  };

  // Always update local cache first for instant UI response and zero data loss
  saveLocalUpdate();

  if (isDemoMode || !supabase) {
    return;
  }

  try {
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

    if (error && (error.code === 'PGRST204' || error.status === 400)) {
      delete payload.priority;
      delete payload.response_url;
      const retry = await supabase.from('applications').update(payload).eq('id', id);
      error = retry.error;
    }

    if (error) {
      console.warn('Supabase update error. Retaining local updates:', error);
    }
  } catch (err) {
    console.warn('Connection reset during updateApplication. Retaining local updates:', err);
  }
};

export const deleteApplication = async (id) => {
  const saveLocalDelete = () => {
    const local = getLocalData(STORAGE_KEYS.APPLICATIONS, INITIAL_APPLICATIONS);
    const updated = local.filter((item) => item.id !== id);
    saveLocalData(STORAGE_KEYS.APPLICATIONS, updated);
    window.dispatchEvent(new Event('radar_app_update'));
  };

  saveLocalDelete();

  if (isDemoMode || !supabase) {
    return;
  }

  try {
    const { error } = await supabase.from('applications').delete().eq('id', id);
    if (error) {
      console.warn('Supabase delete error. Retaining local deletion:', error);
    }
  } catch (err) {
    console.warn('Connection reset during deleteApplication:', err);
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
      const localComp = getLocalData(STORAGE_KEYS.COMPANIES, INITIAL_COMPANIES);
      try {
        const { data, error } = await supabase
          .from('companies')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) {
          console.warn('Error fetching companies from Supabase. Using local cache:', error);
          callback(localComp);
        } else {
          const parsedFromSupabase = (data || []).map((row) => {
            const mapped = mapCompanyFromSupabase(row);
            const localMatch = localComp.find(
              (l) =>
                l.id === mapped.id ||
                (l.companyName && mapped.companyName && l.companyName.trim().toLowerCase() === mapped.companyName.trim().toLowerCase())
            );
            if (localMatch) {
              return {
                ...mapped,
                ...localMatch,
                id: mapped.id || localMatch.id,
                companyName: mapped.companyName || localMatch.companyName,
                sector: mapped.sector || localMatch.sector,
                location: mapped.location || localMatch.location,
                hrEmail: mapped.hrEmail || localMatch.hrEmail,
                phone: localMatch.phone || mapped.phone || '',
                website: mapped.website || localMatch.website,
                contactStatus: localMatch.contactStatus || mapped.contactStatus || 'Not Contacted',
                emailSubject: localMatch.emailSubject || mapped.emailSubject || "Application: Full-Stack Developer Position",
                emailBody: localMatch.emailBody !== undefined ? localMatch.emailBody : (mapped.emailBody || ""),
                scheduledFor: mapped.scheduledFor || localMatch.scheduledFor || null,
                relanceSent: localMatch.relanceSent !== undefined ? localMatch.relanceSent : (mapped.relanceSent ?? false),
              };
            }
            return mapped;
          });

          const localOnly = localComp.filter(
            (localItem) =>
              !parsedFromSupabase.some(
                (p) =>
                  p.id === localItem.id ||
                  (p.companyName && localItem.companyName && p.companyName.trim().toLowerCase() === localItem.companyName.trim().toLowerCase())
              )
          );

          const parsed = [...localOnly, ...parsedFromSupabase];
          saveLocalData(STORAGE_KEYS.COMPANIES, parsed);
          callback(parsed);
        }
      } catch (err) {
        console.warn('Connection reset fetching companies. Using local cache:', err);
        callback(localComp);
      }
    };

    fetchCompanies();

    const handleImmediateUpdate = () => {
      fetchCompanies();
    };
    window.addEventListener('radar_company_update', handleImmediateUpdate);

    let channel;
    try {
      channel = supabase
        .channel('public:companies')
        .on('postgres_changes', { event: '*', schema: 'public', table: 'companies' }, () => {
          fetchCompanies();
        })
        .subscribe();
    } catch (e) {
      console.warn('Realtime channel subscription unavailable');
    }

    return () => {
      window.removeEventListener('radar_company_update', handleImmediateUpdate);
      if (channel) supabase.removeChannel(channel);
    };
  }
};

export const addCompany = async (companyData) => {
  const newItem = {
    ...companyData,
    phone: companyData.phone || '',
    emailSubject: companyData.emailSubject || "Application: Full-Stack Developer Position",
    emailBody: companyData.emailBody || "",
    scheduledFor: companyData.scheduledFor || null,
    relanceSent: companyData.relanceSent ?? false,
  };

  const saveLocalCompany = (assignedId) => {
    const local = getLocalData(STORAGE_KEYS.COMPANIES, INITIAL_COMPANIES);
    const id = assignedId || companyData.id || 'comp-' + Date.now();
    const itemToSave = { id, ...newItem, createdAt: Date.now() };
    const updated = [
      itemToSave,
      ...local.filter(
        (c) =>
          c.id !== id &&
          c.companyName?.trim().toLowerCase() !== newItem.companyName?.trim().toLowerCase()
      ),
    ];
    saveLocalData(STORAGE_KEYS.COMPANIES, updated);
    window.dispatchEvent(new Event('radar_company_update'));
    return itemToSave;
  };

  if (isDemoMode || !supabase) {
    return saveLocalCompany();
  }

  try {
    const payload = mapCompanyToSupabase(newItem);
    let { data, error } = await supabase.from('companies').insert([payload]).select();

    if (error && (error.code === 'PGRST204' || error.status === 400)) {
      delete payload.email_subject;
      delete payload.email_body;
      delete payload.phone;
      delete payload.scheduled_for;
      delete payload.relance_sent;
      const retry = await supabase.from('companies').insert([payload]).select();
      data = retry.data;
      error = retry.error;
    }

    if (error) {
      console.warn('Error adding company to Supabase. Saving locally:', error);
      return saveLocalCompany();
    }
    const createdCompany = mapCompanyFromSupabase(data[0]);
    saveLocalCompany(createdCompany.id);
    return createdCompany;
  } catch (err) {
    console.warn('Connection reset during addCompany. Saving locally:', err);
    return saveLocalCompany();
  }
};

export const updateCompany = async (id, companyData) => {
  const saveLocalCompanyUpdate = () => {
    const local = getLocalData(STORAGE_KEYS.COMPANIES, INITIAL_COMPANIES);
    const updated = local.map((item) => (item.id === id ? { ...item, ...companyData } : item));
    saveLocalData(STORAGE_KEYS.COMPANIES, updated);
    window.dispatchEvent(new Event('radar_company_update'));
  };

  saveLocalCompanyUpdate();

  if (isDemoMode || !supabase) {
    return;
  }

  try {
    const payload = {};
    if (companyData.companyName !== undefined) payload.company_name = companyData.companyName;
    if (companyData.sector !== undefined) payload.sector = companyData.sector || null;
    if (companyData.location !== undefined) payload.location = companyData.location || null;
    if (companyData.hrEmail !== undefined) payload.hr_email = companyData.hrEmail || null;
    if (companyData.phone !== undefined) payload.phone = companyData.phone || null;
    if (companyData.website !== undefined) payload.website = companyData.website || null;
    if (companyData.contactStatus !== undefined) payload.contact_status = companyData.contactStatus;
    if (companyData.emailSubject !== undefined) payload.email_subject = companyData.emailSubject;
    if (companyData.emailBody !== undefined) payload.email_body = companyData.emailBody || null;
    if (companyData.scheduledFor !== undefined) payload.scheduled_for = companyData.scheduledFor || null;
    if (companyData.relanceSent !== undefined) payload.relance_sent = companyData.relanceSent;

    let { error } = await supabase.from('companies').update(payload).eq('id', id);

    if (error && (error.code === 'PGRST204' || error.status === 400)) {
      delete payload.email_subject;
      delete payload.email_body;
      delete payload.phone;
      delete payload.scheduled_for;
      delete payload.relance_sent;
      const retry = await supabase.from('companies').update(payload).eq('id', id);
      error = retry.error;
    }

    if (error) {
      console.warn('Error updating company in Supabase. Saving locally:', error);
    }
  } catch (err) {
    console.warn('Connection reset during updateCompany. Saving locally:', err);
  }
};

export const deleteCompany = async (id) => {
  const saveLocalCompanyDelete = () => {
    const local = getLocalData(STORAGE_KEYS.COMPANIES, INITIAL_COMPANIES);
    const updated = local.filter((item) => item.id !== id);
    saveLocalData(STORAGE_KEYS.COMPANIES, updated);
    window.dispatchEvent(new Event('radar_company_update'));
  };

  saveLocalCompanyDelete();

  if (isDemoMode || !supabase) {
    return;
  }

  try {
    const { error } = await supabase.from('companies').delete().eq('id', id);
    if (error) {
      console.warn('Error deleting company from Supabase. Deleting locally:', error);
    }
  } catch (err) {
    console.warn('Connection reset during deleteCompany:', err);
  }
};
