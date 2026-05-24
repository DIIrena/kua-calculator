import { createClient as createSupabaseClient } from "@supabase/supabase-js";

// Service-role Supabase client. Bypasses RLS. SERVER ONLY - never
// shipped to the browser. With auth moved to Auth.js / NextAuth, the
// Next.js server is the only thing that talks to Supabase, and every
// query is scoped by the NextAuth session user before it runs. RLS
// is intentionally disabled on public tables (see 0002_nextauth.sql).
export function createAdminClient() {
  return createSupabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    },
  );
}
