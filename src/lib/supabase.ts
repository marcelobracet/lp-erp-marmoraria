import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// ─────────────────────────────────────────────────────────────
// Tipos da tabela waitlist
// ─────────────────────────────────────────────────────────────
export interface WaitlistEntry {
  id?: number;
  name: string;
  whatsapp: string;
  state: string;
  company_size: string;
  quotes_avg: string;
  created_at?: string;
}
