-- ============================================================
-- kua-calculator - 0008 course_enrollments
--
-- The 7-Day Home Reset is an email course: a buyer is enrolled on
-- purchase and receives one email a day for seven days, driven by a
-- daily Vercel cron (app/api/cron/drip). One row per enrolment.
--
--   day_sent: 0 once the welcome email has gone out (at enrolment);
--             1..7 as each daily email is sent. The cron sends
--             day_sent + 1 each run until 7.
--   last_sent_at: gates daily spacing so a cron that fires more than
--                 once a day cannot double-send.
--   unsubscribed: set by the signed one-click unsubscribe link.
--
-- RLS off: only the Next.js server (service-role) writes here, via the
-- Stripe webhook (enrol), the cron route (send), and the unsubscribe
-- route (opt out).
-- ============================================================

create table if not exists public.course_enrollments (
  id              uuid primary key default gen_random_uuid(),

  email           text not null,
  course_slug     text not null,

  -- The order this enrolment came from. Null-safe if an order is ever
  -- deleted; the enrolment stands on its own.
  order_id        uuid references public.product_orders (id)
                  on delete set null,

  day_sent        integer not null default 0
                  check (day_sent between 0 and 7),

  enrolled_at     timestamptz not null default now(),
  last_sent_at    timestamptz,
  unsubscribed    boolean not null default false,

  -- One enrolment per address per course. A re-purchase is a no-op.
  unique (email, course_slug)
);

-- The cron's working query: active enrolments in a course not yet at
-- day 7.
create index if not exists course_enrollments_due_idx
  on public.course_enrollments (course_slug, unsubscribed, day_sent);

create index if not exists course_enrollments_email_idx
  on public.course_enrollments (email);

comment on table public.course_enrollments is
  'One row per email-course enrolment. Created by the stripe-webhook on purchase; advanced by the daily drip cron.';

alter table public.course_enrollments disable row level security;
