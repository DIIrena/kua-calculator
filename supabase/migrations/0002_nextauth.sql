-- ============================================================
-- kua-calculator - 0002 NextAuth migration
--
-- Replaces the Supabase Auth layer with Auth.js v5 (NextAuth). Supabase
-- stays as the database. The four Auth.js tables live in the next_auth
-- schema, per the @auth/supabase-adapter canonical schema:
--   https://authjs.dev/getting-started/adapters/supabase
--
-- The public.profiles and public.saved_charts tables are recreated with
-- FKs to next_auth.users(id). Row-Level Security is dropped because
-- access control now happens in Next.js server code, which always knows
-- the NextAuth user and writes through the service-role client.
--
-- A trigger on next_auth.users insert creates the matching
-- public.profiles row, copying the email across.
--
-- Apply order: drop the old wiring -> create next_auth -> recreate the
-- public tables -> add the new trigger.
-- ============================================================

-- ------------------------------------------------------------
-- 1. Drop the old wiring (handle_new_user trigger + function +
--    the existing public tables that point at auth.users).
-- ------------------------------------------------------------
drop trigger if exists on_auth_user_created on auth.users;
drop function if exists public.handle_new_user();

drop table if exists public.saved_charts;
drop table if exists public.profiles;

-- ------------------------------------------------------------
-- 2. next_auth schema and four Auth.js tables. Canonical SQL
--    from the @auth/supabase-adapter docs.
-- ------------------------------------------------------------
create schema if not exists next_auth;

grant usage on schema next_auth to service_role;
grant all on schema next_auth to postgres;

-- users
create table if not exists next_auth.users (
  id uuid not null default uuid_generate_v4(),
  name text,
  email text,
  "emailVerified" timestamp with time zone,
  image text,
  constraint users_pkey primary key (id),
  constraint email_unique unique (email)
);

grant all on table next_auth.users to postgres;
grant all on table next_auth.users to service_role;

-- uid() helper for RLS, kept for compatibility with adapter docs.
create or replace function next_auth.uid() returns uuid
  language sql stable
  as $$
  select
    coalesce(
      nullif(current_setting('request.jwt.claim.sub', true), ''),
      (nullif(current_setting('request.jwt.claims', true), '')::jsonb ->> 'sub')
    )::uuid
$$;

-- sessions
create table if not exists next_auth.sessions (
  id uuid not null default uuid_generate_v4(),
  expires timestamp with time zone not null,
  "sessionToken" text not null,
  "userId" uuid,
  constraint sessions_pkey primary key (id),
  constraint "sessionToken_unique" unique ("sessionToken"),
  constraint "sessions_userId_fkey" foreign key ("userId")
    references next_auth.users (id) match simple
    on update no action
    on delete cascade
);

grant all on table next_auth.sessions to postgres;
grant all on table next_auth.sessions to service_role;

-- accounts
create table if not exists next_auth.accounts (
  id uuid not null default uuid_generate_v4(),
  type text not null,
  provider text not null,
  "providerAccountId" text not null,
  refresh_token text,
  access_token text,
  expires_at bigint,
  token_type text,
  scope text,
  id_token text,
  session_state text,
  oauth_token_secret text,
  oauth_token text,
  "userId" uuid,
  constraint accounts_pkey primary key (id),
  constraint provider_unique unique (provider, "providerAccountId"),
  constraint "accounts_userId_fkey" foreign key ("userId")
    references next_auth.users (id) match simple
    on update no action
    on delete cascade
);

grant all on table next_auth.accounts to postgres;
grant all on table next_auth.accounts to service_role;

-- verification_tokens
create table if not exists next_auth.verification_tokens (
  identifier text,
  token text,
  expires timestamp with time zone not null,
  constraint verification_tokens_pkey primary key (token),
  constraint token_unique unique (token),
  constraint token_identifier_unique unique (token, identifier)
);

grant all on table next_auth.verification_tokens to postgres;
grant all on table next_auth.verification_tokens to service_role;

-- ------------------------------------------------------------
-- 3. Recreate public.profiles and public.saved_charts. Same
--    columns as before, but FK to next_auth.users(id). No RLS;
--    access control is in Next.js server code (which always
--    knows the NextAuth user) writing through service-role.
-- ------------------------------------------------------------
create table public.profiles (
  id                uuid        primary key references next_auth.users (id) on delete cascade,
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
  'One row per account holder. The lead record. Auto-created on signup via the next_auth.users trigger.';

create table public.saved_charts (
  id           uuid        primary key default gen_random_uuid(),
  user_id      uuid        not null references next_auth.users (id) on delete cascade,
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

-- RLS deliberately disabled: the Next.js server already knows the
-- session user and writes through the service-role client, scoping
-- every query by user id.
alter table public.profiles      disable row level security;
alter table public.saved_charts  disable row level security;

-- ------------------------------------------------------------
-- 4. Trigger: when a NextAuth user is inserted, create the
--    matching public.profiles row, copying the email so it can
--    be queried without joining next_auth.users.
-- ------------------------------------------------------------
create or replace function public.handle_new_nextauth_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, email)
  values (new.id, new.email)
  on conflict (id) do nothing;
  return new;
end;
$$;

create trigger on_nextauth_user_created
  after insert on next_auth.users
  for each row execute function public.handle_new_nextauth_user();
