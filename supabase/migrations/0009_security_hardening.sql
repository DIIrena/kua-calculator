-- ============================================================
-- kua-calculator - 0009 security hardening
--
-- Clears the Supabase Security Advisor findings without changing how the
-- app talks to the database. Every query in this app goes through the
-- service-role client (lib/supabase/server.ts), and service_role has
-- BYPASSRLS, so enabling RLS below does not affect the app at all.
--
--   1. Function Search Path Mutable (next_auth.uid): pin search_path.
--      The function references no schema objects, so an empty path is safe.
--   2/3. SECURITY DEFINER function callable by public / signed-in users
--      (handle_new_nextauth_user): revoke the default EXECUTE. It is a
--      trigger function; triggers fire regardless of EXECUTE grants, so
--      the signup trigger keeps working.
--   4. Enable Row-Level Security (deny-by-default, no policies) on every
--      public app table. With RLS on and no policies, the anon and
--      authenticated roles (the public PostgREST API + publishable key)
--      can no longer read customer data; service_role still has full
--      access because it bypasses RLS.
--
-- Not addressed here: "Leaked password protection disabled" is a Supabase
-- Auth (GoTrue) setting. This app authenticates with Auth.js (Google +
-- Resend magic link), not Supabase Auth, so there are no Supabase
-- passwords to protect. Toggle it on in the dashboard if desired; it is
-- a no-op for this app.
-- ============================================================

alter function next_auth.uid() set search_path = '';

revoke execute on function public.handle_new_nextauth_user()
  from public, anon, authenticated;

alter table public.profiles            enable row level security;
alter table public.saved_charts        enable row level security;
alter table public.email_sends         enable row level security;
alter table public.product_orders      enable row level security;
alter table public.product_responses   enable row level security;
alter table public.product_deliveries  enable row level security;
alter table public.product_waitlist    enable row level security;
alter table public.course_enrollments  enable row level security;
