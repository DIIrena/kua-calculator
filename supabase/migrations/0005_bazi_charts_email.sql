-- ============================================================
-- Revise bazi_charts for the public + email-gate model (2026-08-06).
--
-- The BaZi calculator is now public: anonymous visitors reveal their
-- reading by entering an email, captured as a lead. So user_id becomes
-- nullable and an email column is added. Signed-in users still get
-- user_id set (and their chart shows in their account).
-- ============================================================

alter table public.bazi_charts alter column user_id drop not null;
alter table public.bazi_charts add column if not exists email text;
alter table public.bazi_charts add column if not exists opt_in boolean not null default false;

create index if not exists bazi_charts_email_idx on public.bazi_charts (email);
