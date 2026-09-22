import { createClient } from '@supabase/supabase-js';

const rawUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseUrl = rawUrl.replace(/\/rest\/v1\/?$/, '').replace(/\/$/, '');
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const isDemoMode = !supabaseUrl || !supabaseAnonKey || supabaseUrl.includes('your_project_id');

let supabase = null;

if (!isDemoMode) {
  try {
    supabase = createClient(supabaseUrl, supabaseAnonKey);
    console.log("⚡ Supabase database connected successfully:", supabaseUrl);
  } catch (error) {
    console.warn("⚠️ Supabase init failed, falling back to local demo mode:", error.message);
  }
} else {
  console.log("ℹ️ Running Radar in Demo Mode (Local Storage persistence). Add VITE_SUPABASE_URL & VITE_SUPABASE_ANON_KEY in .env for live DB sync.");
}

export { supabase };
