// =====================================
// SUPABASE CONNECTION LAYER
// Tender Control System
// =====================================

import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm'

// Supabase Project Credentials
const SUPABASE_URL = 'https://ayjkahscwaorjbyxhfqh.supabase.co'
const SUPABASE_ANON_KEY = 'sb_publishable_FjKCFi0I1x6zZro-0R-57Q_RtyeMgGI'

// Create client
export const supabase = createClient(
  SUPABASE_URL,
  SUPABASE_ANON_KEY
);


// ---------- PROJECT FUNCTIONS ----------

// Load all projects
export async function loadProjects() {

  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Load error:', error);
    return [];
  }

  return data || [];
}


// Save or update project
export async function saveProject(project) {

  // Only send fields that exist in database
  const dbProject = {
    id: project.id,
    name: project.name,
    alias: project.alias,
    customer: project.customer,
    announceDate: project.announceDate,
    submissionDate: project.submissionDate,
    projectValue: project.projectValue,
    sellingValue: project.sellingValue,
    status: project.status,
    contract: project.contract
  };

  const { error } = await supabase
    .from('projects')
    .upsert(dbProject);

  if (error) {
    console.error('Save error:', error);
    alert('Save failed');
  }
}
export async function deleteProjectDB(id) {

  const { error } = await supabase
    .from('projects')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Delete error:', error);
    alert('Delete failed');
  }
}