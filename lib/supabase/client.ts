import { createBrowserClient } from "@supabase/ssr";

// Browser Supabase client. Uses the anon key, which is RLS-protected and
// safe to ship to the browser. Used by client components (the sign-in form).
export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );
}
