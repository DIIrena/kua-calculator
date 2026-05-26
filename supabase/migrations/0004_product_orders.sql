-- ============================================================
-- kua-calculator - 0004 product_orders, product_responses, product_deliveries
--
-- Stage 5a (the Personal Feng Shui Compass + the modular product
-- engine). Three tables and a private Storage bucket.
--
-- One row per Stripe checkout session in product_orders.
-- One row per filled-in purchase form in product_responses.
-- One row per rendered PDF in product_deliveries.
--
-- The trio is one-to-one in the happy path (one order has one
-- response has one delivery), but the schema keeps them split
-- so refunds / re-renders / multiple deliveries to the same order
-- (e.g. annual refresh of the Year Ahead Compass) work cleanly
-- without rewriting history.
--
-- RLS is OFF on all three: only the Next.js server (service-role)
-- writes here, always scoped by NextAuth session user id or by
-- Stripe webhook signature.
-- ============================================================

-- ------------------------------------------------------------
-- product_orders
-- ------------------------------------------------------------
create table if not exists public.product_orders (
  id              uuid primary key default gen_random_uuid(),

  -- May be null if the buyer paid as a guest before signing in.
  -- The post-checkout success page asks for an email and we link
  -- the order to the matching next_auth.users row on signup.
  user_id         uuid references next_auth.users (id) on delete set null,

  -- Always populated. The Stripe Customer email or the email entered
  -- on the purchase form. Used for delivery if user_id is null.
  email           text not null,

  -- The product slug (e.g. 'personal-compass'). One row per product
  -- in the catalogue lives in lib/products.ts; we do not have a
  -- products table because the catalogue is a code asset.
  product_slug    text not null,

  -- Stripe identifiers. session unique for idempotent webhook.
  stripe_session  text not null unique,
  stripe_payment  text,

  amount_cents    integer not null,
  currency        text not null default 'usd',

  -- 'paid' | 'refunded'. Set on webhook. Refund flips it in a later
  -- webhook handler. We never delete an order row.
  status          text not null default 'paid'
                  check (status in ('paid', 'refunded')),

  created_at      timestamptz not null default now()
);

create index if not exists product_orders_email_idx
  on public.product_orders (email);

create index if not exists product_orders_user_idx
  on public.product_orders (user_id);

comment on table public.product_orders is
  'One row per paid Stripe checkout. Created by the stripe-webhook route on checkout.session.completed.';

alter table public.product_orders disable row level security;


-- ------------------------------------------------------------
-- product_responses
-- ------------------------------------------------------------
create table if not exists public.product_responses (
  id              uuid primary key default gen_random_uuid(),

  order_id        uuid not null references public.product_orders (id)
                  on delete cascade,

  -- The three personalisation inputs the customer fills in after
  -- payment. first_name is what appears on the cover.
  first_name      text not null,
  birth_year      integer not null check (birth_year between 1900 and 2100),
  birth_month     integer not null check (birth_month between 1 and 12),
  birth_day       integer not null check (birth_day between 1 and 31),
  gender          text    not null check (gender in ('male', 'female')),

  -- Computed server-side from the above using lib/kua.ts. Stored
  -- so we never recompute (and so a future change in the Kua
  -- formula does not silently retro-mutate someone's PDF).
  kua_number      integer not null check (kua_number between 1 and 9),
  kua_group       text    not null check (kua_group in ('east', 'west')),

  created_at      timestamptz not null default now()
);

create index if not exists product_responses_order_idx
  on public.product_responses (order_id);

comment on table public.product_responses is
  'The customer answers to the post-checkout personalisation form. One row per order in the happy path.';

alter table public.product_responses disable row level security;


-- ------------------------------------------------------------
-- product_deliveries
-- ------------------------------------------------------------
create table if not exists public.product_deliveries (
  id              uuid primary key default gen_random_uuid(),

  order_id        uuid not null references public.product_orders (id)
                  on delete cascade,
  response_id     uuid not null references public.product_responses (id)
                  on delete cascade,

  -- Path inside the Supabase Storage 'product-pdfs' bucket.
  -- e.g. 'personal-compass/2026/05/26/<order_id>.pdf'
  pdf_path        text not null,

  -- For the account page list view, so we do not need to download
  -- the PDF to display its length.
  page_count      integer not null check (page_count between 1 and 500),

  delivered_at    timestamptz not null default now()
);

create index if not exists product_deliveries_order_idx
  on public.product_deliveries (order_id);

comment on table public.product_deliveries is
  'One row per rendered PDF. Re-renders (refund + replay, annual refresh) append new rows rather than mutating.';

alter table public.product_deliveries disable row level security;


-- ============================================================
-- Storage bucket
--
-- The bucket itself cannot be created from a SQL migration; the
-- owner creates it through the Supabase dashboard:
--
--   Storage -> New bucket -> name: product-pdfs
--                            public: false
--                            file size limit: 25 MB
--                            allowed MIME types: application/pdf
--
-- Access from the Next.js server uses the service-role key.
-- The account page mints signed URLs on read (5-minute TTL) so
-- the PDF never goes public.
-- ============================================================
