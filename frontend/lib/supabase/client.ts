/**
 * Supabase client — placeholder.
 * Real client will be created here once auth is wired in.
 */

export interface SupabaseConfig {
  url?: string;
  anonKey?: string;
}

export const supabaseConfig: SupabaseConfig = {
  url: "",
  anonKey: "",
};

export const isSupabaseConfigured = (): boolean =>
  Boolean(supabaseConfig.url && supabaseConfig.anonKey);