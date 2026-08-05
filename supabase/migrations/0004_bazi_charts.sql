-- ============================================================
-- BaZi (Four Pillars) charts, saved by signed-in account holders.
--
-- Same access model as public.saved_charts: NO Row-Level Security.
-- The BaZi calculator is account-gated; the Next.js server always
-- knows the NextAuth user and writes through the service-role
-- client, scoping every query by user_id. The anonymous Kua
-- calculator is unaffected by this table.
-- ============================================================

create table public.bazi_charts (
  id            uuid        primary key default gen_random_uuid(),
  user_id       uuid        not null references next_auth.users (id) on delete cascade,
  birth_year    integer     not null,
  birth_month   integer     not null,
  birth_day     integer     not null,
  birth_hour    integer,
  birth_minute  integer,
  tz_offset     numeric,
  longitude     numeric,
  city          text,
  time_known    boolean     not null default true,
  day_master    text,
  result        jsonb       not null,
  label         text,
  created_at    timestamptz not null default now()
);

comment on table public.bazi_charts is
  'BaZi (Four Pillars) charts an account holder generated. result jsonb holds the full computed chart (pillars, Day Master, Ten Gods, element balance). Access control is in Next.js server code; RLS disabled like saved_charts.';

create index bazi_charts_user_id_idx on public.bazi_charts (user_id);

-- RLS deliberately disabled: the Next.js server already knows the session
-- user and writes through the service-role client, scoping every query by
-- user id (matches public.saved_charts).
alter table public.bazi_charts disable row level security;
