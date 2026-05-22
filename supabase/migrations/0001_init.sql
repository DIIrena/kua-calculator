-- ============================================================
-- kua-calculator - Phase 3, Stage 1
-- Initial schema: profiles + saved_charts, Row-Level Security,
-- and the handle_new_user trigger.
--
-- auth.users (managed by Supabase Auth) holds the canonical email.
-- The two public tables below hold the lead record and saved charts.
-- Every RLS policy is scoped so a user only ever sees their own rows.
-- ============================================================

-- ------------------------------------------------------------
-- profiles - one row per user, the lead record.
-- Auto-created on signup by the handle_new_user() trigger.
-- ------------------------------------------------------------
create table public.profiles (
  id                uuid        primary key references auth.users (id) on delete cascade,
  email             text,
  birth_year        integer,
  birth_month       integer,
  birth_day         integer,
  gender            text,
  marketing_opt_in  boolean     not null default false,
  created_at        timestamptz not null default now(),
  updated_at        timestamptz not null default now()
);

comment on table public.profiles is
  'One row per account holder. The lead record. Auto-created on signup.';

-- ------------------------------------------------------------
-- saved_charts - results a logged-in user chose to save.
-- result jsonb stores the full computed result so the Stage 2
-- chart needs no schema change.
-- ------------------------------------------------------------
create table public.saved_charts (
  id           uuid        primary key default gen_random_uuid(),
  user_id      uuid        not null references auth.users (id) on delete cascade,
  birth_year   integer,
  birth_month  integer,
  birth_day    integer,
  gender       text,
  kua_number   integer,
  kua_group    text,
  result       jsonb,
  label        text,
  created_at   timestamptz not null default now()
);

comment on table public.saved_charts is
  'Charts an account holder saved. result jsonb future-proofs the Stage 2 chart.';

create index saved_charts_user_id_idx on public.saved_charts (user_id);

-- ------------------------------------------------------------
-- Row-Level Security
-- Enabled on both tables. Every policy scoped to auth.uid() so a
-- user can only ever read or write their own rows. The service-role
-- key bypasses RLS and is server-only, never shipped to the browser.
-- ------------------------------------------------------------
alter table public.profiles      enable row level security;
alter table public.saved_charts  enable row level security;

-- profiles policies
create policy "Users can view their own profile"
  on public.profiles for select
  using (auth.uid() = id);

create policy "Users can update their own profile"
  on public.profiles for update
  using (auth.uid() = id)
  with check (auth.uid() = id);

create policy "Users can insert their own profile"
  on public.profiles for insert
  with check (auth.uid() = id);

create policy "Users can delete their own profile"
  on public.profiles for delete
  using (auth.uid() = id);

-- saved_charts policies
create policy "Users can view their own saved charts"
  on public.saved_charts for select
  using (auth.uid() = user_id);

create policy "Users can insert their own saved charts"
  on public.saved_charts for insert
  with check (auth.uid() = user_id);

create policy "Users can update their own saved charts"
  on public.saved_charts for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "Users can delete their own saved charts"
  on public.saved_charts for delete
  using (auth.uid() = user_id);

-- ------------------------------------------------------------
-- handle_new_user - security definer trigger.
-- Runs after a row is inserted into auth.users (a new signup) and
-- creates the matching profiles row, copying the email across so
-- it can be queried and exported without joining auth.users.
-- ------------------------------------------------------------
create function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, email)
  values (new.id, new.email);
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();
