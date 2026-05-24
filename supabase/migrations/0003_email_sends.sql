-- ============================================================
-- kua-calculator - 0003 email_sends rate-limit table
--
-- Stage 3 (emailed chart). Tracks per-user per-day chart-email send
-- counts so the chart-email server action can enforce a simple
-- cap (5 per user per day) without keeping a row per individual send.
--
-- One row per (user_id, day). UPSERT increments count.
-- Rows older than ~7 days are useless; a future cleanup job can
-- prune them (not implemented in this migration).
-- ============================================================

create table if not exists public.email_sends (
  user_id  uuid not null references next_auth.users (id) on delete cascade,
  day      date not null,
  count    integer not null default 0,
  primary key (user_id, day)
);

comment on table public.email_sends is
  'Rate-limit counter for the chart-email server action. One row per user per day.';

-- RLS disabled: only the Next.js server (service-role) writes here,
-- always scoped by NextAuth session user id.
alter table public.email_sends disable row level security;
