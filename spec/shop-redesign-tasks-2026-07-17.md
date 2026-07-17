# Shop redesign tasks (2026-07-17)

Task tracker for the approved two-site shop redesign plan (owner-approved 2026-07-17).
Protocol: Ralph manual mode - one task per go, each ends with build passing + a scoped
commit pushed. The owner says "next" to continue. This file exists separately from
prd.json/progress.txt because those are occupied by the in-flight Compass v2 work.

Full plan reference: the approved plan of 2026-07-17 (two-site split, landing pages,
Love Bundle). Summary of the target state:

- MFSH shop: 9 paid products. Ladder: personal-feng-shui-compass $19 /
  all-twelve-spaces-compass $29 / complete-home-compass $49. Moments: move-in-kit,
  seven-day-home-reset. Kits row: all-nine-pillars-compass, business-money-feng-shui,
  whole-home-starter-bundle, cures-catalog. Free: calculator + the new Good Days page.
- Planner delisted entirely (URL live; 2027 decision in January). Couple + all
  love/relationship products live only on MFSL. All other products delisted, URLs live.
- MFSL: $29 Love Bundle (couple + bedroom-reset + relationship) + the 3 singles;
  bundle-led homepage with the free two-person calculator as section two; no guide.
- Every visible product page becomes a long-form landing page (template piloted on
  the flagship first).

## Phase A - MFSH

- [x] A1. Personal Compass $14 -> $19: code constants + copy; owner creates the $19
      Stripe Price and updates the Vercel env var (stepwise walkthrough provided).
- [x] A2. Good Days free page (traffic asset, ships early): /good-days route, 2026
      dates on-page, email-gated printable, Complete Home + Move-In upsells, $9
      product redirect. Owner pins on publish.
- [ ] A3. Covers for all-twelve-spaces (ladder card) + all-nine-pillars: factory
      render -> owner review -> wire.
- [ ] A4. Shop curation: LADDER/MOMENT/KIT slug lists, Storefront rows + decoy notes,
      chooser update, search index + sitemap prune.
- [ ] A5. Homepage spotlight swap to flagship + MFSH favicon (green circle, orange
      logo, app/icon.svg + apple-icon.png).
- [ ] A6. Measurement baseline note + 3 welcome-email drafts (approve-only, nothing
      wired to send).

## Phase B - Landing pages (MFSH)

- [ ] B1. Landing template components + Complete Home pilot page; owner reviews live.
- [ ] B2. Rollout: personal-feng-shui-compass, all-twelve-spaces-compass.
- [ ] B3. Rollout: move-in-kit, seven-day-home-reset, all-nine-pillars-compass.
- [ ] B4. Rollout: business-money-feng-shui, whole-home-starter-bundle, cures-catalog.

## Phase C - MFSL (sister repo; deploy stays owner-gated)

- [ ] C1. Love Bundle: commerce entry + fulfilment recipe + Stripe test-mode
      verification (delivers Couple PDF + Relationship PDF + static Bedroom Reset).
- [ ] C2. Bundle landing page + shop trim to 4 items.
- [ ] C3. MFSL homepage rebuild (bundle hero, calculator section two) + MFSL favicon
      (orange circle, white logo).
- [ ] C4. Guide/articles/methodology removal + nav/sitemap/search prune.
- [ ] C5. Landing template port to the 3 single-product pages.
- [ ] C6. (Owner-gated) deploy runbook + cross-pointer bands on both sites.

Follow-on content task: 2027 Good Days dates (day-calendar data generation).

## Log

(one line per completed task, newest last)

- A1 (2026-07-17, commit 663ca72): price shipped in code; owner created the $19
  Stripe Price + updated STRIPE_PRICE_COMPASS + redeployed; verified live - the
  Stripe session shows $19.00. Learning: env-var changes error briefly while the
  redeploy swaps; retry after ~60s before diagnosing.
- A2 (2026-07-18): /good-days ships - 77 favourable days (Jul 2026-Feb 2027) from
  day-calendar-2026.json, month sections + caution lists, honest-framing box,
  email capture (optional notes opt-in stored to product_waitlist "good-days"),
  Complete Home + Move-In upsells, print CSS, old $9 product URL 301s here.
  Learning: the existing JSON already covers early 2027, so the page honestly
  says "2026 and 2027" today; Mar-Dec 2027 remains a data task. Owner: pin it.
