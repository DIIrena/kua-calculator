# Phase G: launch operations and first traffic

**Date:** 2026-06-16
**Status:** Operating spec. Prepared for review. No publishing has started. No code changed.

## What this phase is

The platform is commercially presentable (Phases 0, C, D, E, F shipped). This phase does three things and nothing else:

1. Verify the live launch surfaces after the latest deploy.
2. Publish the first three traffic assets, spaced out, not all at once.
3. Watch what happens for seven days and log it.

It is deliberately not build-heavy. Code changes only if the post-deploy checklist finds a real issue (see "Allowed to fix immediately"). Everything else is frozen (see "Frozen").

This builds on the existing promotion system: `spec/channels-2026-06-08.md`, `spec/promotion-calendar-2026-06-08.md`, `spec/phase-f-promotion-2026-06-16.md` (asset prompts + the 5-pick), and `spec/pinterest-analytics-baseline.md` (the tracking sheet).

---

## 1. Post-deploy checklist

Run this once, right after confirming the latest Vercel deploy is live (commit `74e3219` or later). Check each surface on **desktop** and on a **real phone** (or DevTools device mode at 390px). Mark PASS / FAIL. A FAIL goes to the "Allowed to fix immediately" list only if it matches one of those categories.

### How to check an OG/share preview

For any page: open the live URL, View Source, find `<meta property="og:image" content="...">`, open that image URL in a new tab. It should render a calm branded card (or, for the Planner, the real cover). Optionally paste the page URL into the Facebook Sharing Debugger (`developers.facebook.com/tools/debug`) and click `Scrape Again` to confirm the card.

Expected `og:image` per surface:
- Homepage: `https://myfengshuihome.com/api/og/product/kua-calculator`
- `/products`: `https://myfengshuihome.com/api/og/product/shop`
- `/products/annual-feng-shui-planner-2026`: `.../annual-feng-shui-planner-2026/cover-thumb.png` (real cover)
- `/products/personal-feng-shui-compass`: `https://myfengshuihome.com/api/og/product/personal-feng-shui-compass`

### Surface checks

| # | Surface | Check | Pass criteria |
|--|--|--|--|
| 1 | Homepage `/` | Loads; calculator runs (enter a birthday, get a Kua + directions); "Start here" tools + the "see what to use" bridge present; footer correct | Calculator returns a result; no broken images; no console errors; OG = calculator card |
| 2 | `/guide` | Loads; the four-label legend shows; the library grid + topic rail render; "Search the whole site" + "browse the shop" line present | Grid loads; legend visible; links resolve; OG renders |
| 3 | `/products` | Loads; "What should I use?" chooser at the top (pick an option, see a recommendation); Featured row; Choose-by-room / by-life chips; named groups; the 11 real cover thumbnails show, others text-first | Chooser works; no broken cover images; cards link; OG = shop card |
| 4 | `/products/annual-feng-shui-planner-2026` | Loads; cover + "Look inside" or its own cover; FulfillmentBlock; FlagshipChooser; Buy button shows `$19` and is live | Price `$19`; buy button present; images load; OG = real cover |
| 5 | `/products/personal-feng-shui-compass` | Loads; ProductPreview (sample cover); FulfillmentBlock; FlagshipChooser; Buy button shows `$14` and is live | Price `$14`; buy button present; OG = generated card |
| 6 | `/kua-calculator` | Loads; calculator runs; no analytics/third-party scripts in Network tab; no birth data leaves the browser | Result renders; Network shows no third-party/analytics calls (tracker-free) |
| 7 | `/search` | Loads; type "wealth" and "bedroom"; grouped results (Start here first); empty state shows the hint + Start-here group | Results group correctly; no errors |
| 8 | Mobile (390px) | Header menu (hamburger) opens; "Search" link present; chooser chips wrap; fulfillment rows stack; cards single-column | No horizontal scroll; tap targets usable; nothing clipped |
| 9 | OG/share previews | Check the four `og:image` URLs above render | Each returns a 200 image (branded card or real cover) |
| 10 | One live test purchase (optional but recommended) | Buy the cheapest static item (`good-days-calendar-2026`, $9) on the live site with a real card; confirm the email arrives with working download links; refund yourself within the window | Payment succeeds; delivery email arrives in under ~2 min; links download; refund processes |

Checklist evidence: take one screenshot per surface (desktop + mobile) and drop them in `spec/evidence/` with the date in the filename.

---

## 2. First publishing sequence

Spaced out, not all at once. The point is to see which pin shape moves before flooding the boards. One pin every 2 to 3 days. Use the prompts, boards, and descriptions already written in `spec/phase-f-promotion-2026-06-16.md`.

| Order | Day | Asset | Board | Target URL | Description source |
|--|--|--|--|--|--|
| Pin 1 | Day 1 | Free Kua Calculator (East/West compass chart) | Compass School Basics | `https://myfengshuihome.com/` (locked: the homepage, the brand's best first landing for cold Pinterest traffic) | phase-f, item 1 |
| Pin 2 | Day 3 to 4 | Southeast Wealth Area (floor plan + six levers) | Reading Your Home Corner by Corner | `https://myfengshuihome.com/guide/money/the-southeast-wealth-area-and-how-to-read-it` | phase-f, item 4 |
| Pin 3 | Day 6 to 7 | 2026 Annual Feng Shui Planner (real-cover pin) | Feng Shui by the Calendar | `https://myfengshuihome.com/products/annual-feng-shui-planner-2026` | phase-f, item 2 |

Rules for this window:
- Pin 1 target is locked to the homepage `/`. The first pin introduces My Feng Shui Home as a whole brand: the homepage leads with the free Kua calculator, opens the guide path, and gives a quiet route into products. This is the chosen first landing for cold Pinterest traffic, and it overrides the phase-f guide-anchor target for Pin 1 only.
- Calculator and guide pins lead; the Planner (commercial) comes third so the authority-first posture sets the tone.
- One pin per slot. No crops, no color variants this window (deferred to month 2 per the calendar).
- Pins link to the page, never to a checkout. No price overlay on the pin.
- No paid promotion. No automation. Each pin is published by hand and then logged below.

---

## 3. Tracking log

Append one row each time an asset is published or a signal is observed. Keep it append-only.

| Date | Channel | Asset | Target URL | Live URL (pin/post) | Notes | Observed signal |
|--|--|--|--|--|--|--|
|  |  |  |  |  |  |  |

Column meaning:
- **Live URL** is the published pin or post URL (so it can be re-found and measured).
- **Observed signal** is the first numbers seen (impressions, saves, outbound clicks, pageviews, orders), with the date observed.

Pinterest per-pin numbers also go into the existing `spec/pinterest-analytics-baseline.md` so the two stay in sync.

---

## 4. First 7-day monitoring plan

A short daily glance plus one fuller readout at day 7. Everything here is read-only dashboards; nothing changes the tracker-free calculator or `/embed`.

| Signal | Where to look | Cadence | Healthy | Red flag |
|--|--|--|--|--|
| Vercel pageviews | Vercel dashboard, project, `Analytics` (Web Analytics, free tier) | Daily, 2 min | Any inbound traffic to the pinned pages; homepage and the southeast page lifting after pins go live | Zero pageviews on a page whose pin is live and getting impressions (pin-to-site funnel leak) |
| Search Console indexing | Google Search Console, `URL Inspection` on each key URL + `Pages` (Indexing) + submit `https://myfengshuihome.com/sitemap.xml` | Day 1 (submit sitemap), then day 7 | Key URLs "Crawled" or "Indexed"; sitemap accepted | Key URLs "Discovered, not indexed" past day 7 (normal early, just note it; do not change content) |
| Pinterest impressions | Pinterest Analytics, `Overview` (impressions, saves, outbound clicks per pin) | Day after each pin, then day 7 | Impressions climbing; at least 1 save or 25 impressions per pin in the first days | A pin flat at zero impressions for 48h (re-check board placement and the first overlay line, not the pin volume) |
| Product orders | Stripe Dashboard (live mode), `Payments`; cross-check Supabase `product_orders` | Daily, 1 min | Any order completes end to end; `product_orders` row created | A payment in Stripe with no matching `product_orders` row or no delivery (webhook/fulfillment gap) |
| Failed checkout or delivery errors | Stripe, `Developers` > `Webhooks` (delivery + failures); Resend dashboard (sends/bounces); Supabase `product_deliveries`; Vercel function logs for `/api/stripe-webhook` | Daily, 2 min | Webhook events 2xx; delivery emails sent; `product_deliveries` rows match orders | Any webhook 4xx/5xx, any Resend bounce/failure, or an order with no delivery row. This is the one category that justifies an immediate code fix. |

Day-7 readout: write 5 to 8 lines in `progress.txt` (pins shipped, impressions/saves per pin, pageview deltas, any orders, any errors) and decide whether to continue the calendar cadence or hold.

---

## 5. Allowed to fix immediately

A real issue surfaced by the checklist or monitoring may be fixed right away, in a small scoped commit, no further review needed:

- Broken images (a cover or sample that 404s, a wrong path).
- Mobile layout problems (overflow, clipped content, unusable tap targets).
- Broken links (a 404 route, a wrong href).
- Failed checkout or fulfillment (webhook error, missing delivery, signed-URL failure) — including the minimum payment-adjacent fix needed to make a purchase complete and deliver.
- Wrong OG image (a card that 404s or shows the wrong product).
- Confusing copy, only where it actively blocks a purchase or basic understanding (for example, a contradictory price or an unclear delivery line).

Each immediate fix is its own commit with a one-line reason, and a row in the tracking log noting what broke and what was changed.

---

## 6. Frozen for this phase

No work on any of these unless it falls under "Allowed to fix immediately":

- Search redesign or re-placement.
- Chooser redesign, re-ordering, or copy polishing.
- Guide rewrites or new guide pages.
- New products, new bundles, new price points.
- New funnels, new entry paths, new CTAs.
- New popups, banners, announcement bars, urgency, or countdowns.
- Payment or Stripe changes, unless checkout is actually broken.
- Promotion beyond the three sequenced pins (no extra pins, no email send, no Reddit links beyond the June 8 comment-first posture).

---

## Stop point

This spec is prepared for review. Nothing is published and no code is changed. On approval: run the post-deploy checklist, then publish Pin 1, then follow the sequence and the monitoring plan. Bring any checklist FAIL or monitoring red flag back as a scoped fix.
