-- ============================================================
-- kua-calculator - 0010 newsletter_sequence
--
-- Per-subscriber progress through the 3-step welcome sequence
-- (lib/welcome-sequence.ts). One row per email address. The cron at
-- /api/cron/welcome upserts a row when it first sees a subscriber on
-- the consented note lists (product_waitlist slugs "newsletter" and
-- "good-days") and advances last_step as emails go out.
--
-- Membership stays in product_waitlist: unsubscribing deletes the
-- waitlist row(s), and the cron skips any sequence row whose email no
-- longer appears on a note list. This table only remembers how far a
-- subscriber got, so a re-subscribe never restarts the sequence from
-- step 1 spam.
-- ============================================================

create table if not exists public.newsletter_sequence (
  email         text primary key,
  started_at    timestamptz not null default now(),
  last_step     integer not null default 0
                check (last_step between 0 and 3),
  last_sent_at  timestamptz
);

comment on table public.newsletter_sequence is
  'Welcome-sequence progress per subscriber. Sends are flag-gated OFF by default.';

-- RLS disabled: only the Next.js server (service role) touches this.
alter table public.newsletter_sequence disable row level security;
