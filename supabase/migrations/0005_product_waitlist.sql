-- ============================================================
-- kua-calculator - 0005 product_waitlist
--
-- Captures email signups against a specific product slug, while
-- live payments are not yet wired. When a customer clicks "Join
-- the waitlist" on a product page, we insert a row here and send
-- a confirmation email via Resend.
--
-- When the product goes live (Stripe activation per the
-- platform-strategy doc), we email the relevant waitlist segment
-- by product_slug.
--
-- (email, product_slug) is unique - a customer cannot accidentally
-- sign up twice for the same product. They can be on multiple
-- product waitlists.
-- ============================================================

create table if not exists public.product_waitlist (
  id              uuid primary key default gen_random_uuid(),
  email           text not null,
  product_slug    text not null,
  created_at      timestamptz not null default now()
);

create unique index if not exists product_waitlist_email_product_uidx
  on public.product_waitlist (email, product_slug);

create index if not exists product_waitlist_product_idx
  on public.product_waitlist (product_slug);

comment on table public.product_waitlist is
  'Product-page waitlist signups while live payments are not yet wired.';

-- RLS disabled: only the Next.js server (service-role) writes here,
-- always via the joinProductWaitlist server action.
alter table public.product_waitlist disable row level security;
