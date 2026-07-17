# Measurement baseline (shop redesign, task A6)

**Purpose:** one number a week, so the shelf decision in 60-90 days (keep 9
products vs cut further) is made on data, not vibes. No new analytics, no
trackers, no code: everything below is read from dashboards you already have.

## THE metric

**Checkout sessions created per week, and how many complete.**

Every "Add to cart / Buy" click on the site creates a Stripe Checkout session,
so Stripe's own session count IS the shop-to-checkout click metric. No
tracking pixel needed, and the calculator/embed privacy rule stays intact.

- Where: Stripe Dashboard -> `Payments` -> `Checkout sessions` (filter last 7
  days). Note `created` and `completed`.
- Sales truth: Supabase `product_orders` row count (or Stripe `Payments`,
  status `Succeeded`).
- Demand signals: Supabase `product_waitlist` rows (slugs `good-days` and
  `relationship-calculator` are the email-capture lists).

## The weekly ritual (2 minutes, same day each week)

Append one line to the table below:

| Week of | Checkout sessions created | Completed (sales) | Orders total to date | good-days emails | Notes |
|---|---|---|---|---|---|
| 2026-07-13 | (owner fills) | 0 | 0 | 0 | Baseline week: redesigned shelf shipped 2026-07-18 (A1-A5). |

## Decision triggers (set now, so future-us cannot rationalise)

- After 60-90 days: any visible product with **zero checkout sessions** in the
  whole period is a candidate to delist (one-line change to `VISIBLE_SLUGS`).
- If sessions are created but almost none complete (under ~10 percent),
  the problem is the checkout/price, not the shelf: revisit price or the
  landing page of the affected product before cutting it.
- If the good-days email list grows but sales do not, the welcome sequence
  (A6 drafts) is the next lever to enable.

## What we deliberately do NOT do

No paid analytics tier, no pixels on the calculator or /embed (hard rule),
no per-visitor tracking. Vercel's built-in pageviews are a nice-to-glance
extra, not the metric.
