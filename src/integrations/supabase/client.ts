
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://hdcslouhnznwyzqgngyz.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhkY3Nsb3Vobnpud3l6cWduZ3l6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDUwOTU3NzEsImV4cCI6MjA2MDY3MTc3MX0.qL4DaH8Xi5A26jTaAlkHqrW3Y-NOLesEhacHz0tA9KM";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
  auth: {
    persistSession: true,
  },
});
