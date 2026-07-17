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
- [x] A3. Covers for all-twelve-spaces (ladder card) + all-nine-pillars: factory
      render -> owner review -> wire.
- [x] A4. Shop curation: LADDER/MOMENT/KIT slug lists, Storefront rows + decoy notes,
      chooser update, search index + sitemap prune.
- [x] A5. Homepage spotlight swap to flagship + MFSH favicon (green circle, orange
      logo, app/icon.svg + apple-icon.png).
- [x] A6. Measurement baseline note + 3 welcome-email drafts (approve-only, nothing
      wired to send).

## Phase B - Landing pages (MFSH)

- [x] B1. Landing template components + Complete Home pilot page; owner reviews live.
- [x] B2. Rollout: personal-feng-shui-compass, all-twelve-spaces-compass.
- [x] B3. Rollout: move-in-kit, seven-day-home-reset, all-nine-pillars-compass.
- [x] B4. Rollout: business-money-feng-shui, whole-home-starter-bundle, cures-catalog.

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
- A3 (2026-07-18): Twelve Spaces (3x4 room grid) + Nine Life Areas (nine-pillar
  colonnade) covers rendered, owner-approved with one change (orange logo, the
  pin treatment), wired via product-assets.ts. Learning: the cover factory now
  takes a logoColor param; orange logo is the owner's preference going forward.
- A4 (2026-07-18): the curated shelf ships - 9 products in 4 sections (readings
  ladder $19/$29/$49, moments, kits, free strip), chooser trimmed to 6 answers
  ("Plan the year" repoints to Complete Home), search + sitemap allowlisted to
  VISIBLE_SLUGS. Verified locally: 9 cards, zero hidden-slug leaks, sitemap
  exactly 9 product URLs, /search?q=kitchen surfaces no product. Learning: all
  shop visibility now flows from one place (VISIBLE_SLUGS in lib/storefront.ts);
  re-listing a product later is a one-line change.
- A5 (2026-07-18): homepage spotlight now sells the $49 flagship (was the
  Planner); shelf teaser updated (Twelve Spaces in, Bedroom Reset out - it is
  MFSL-bound); favicon rebuilt to the owner spec: green circle + orange
  heart-house (icon.svg), apple-icon.png rendered opaque green via Resvg so
  iOS masking never shows a white tile. Follow-up in the same task: the
  calculator post-result card and FlagshipChooser still sold the delisted
  Planner, and FlagshipChooser + /life + /space CTAs still said $14 - all
  retargeted to the ladder and $19. Learning: price/product references hide in
  display-copy components; sweep components/ and app/ for the product name AND
  the old price string whenever a product is delisted or repriced.
- A6 (2026-07-18): spec/measurement-baseline-2026-07-18.md (THE metric: Stripe
  checkout sessions created vs completed - zero new analytics needed, since
  every Buy click already creates a session) + spec/welcome-emails-2026-07-18.md
  (3 drafts, consented lists only, nothing wired). PHASE A COMPLETE. Learning:
  Stripe's own session log doubles as the shop-to-checkout click metric, which
  keeps the no-trackers rule intact for free.
- B1-B4 (2026-07-18, autonomous session): components/ProductLanding.tsx (config-driven
  9-section direct-response template, FAQ+Product JSON-LD, one buy form + three
  anchor CTAs) + all 8 visible MFSH product pages rebuilt as LandingConfigs.
  Copy scaled to price; honest for/not-for on every page; included-in-flagship
  answered on both part-bundles; Move-In answers the free Good Days page
  honestly. PHASE B COMPLETE on MFSH. Owner review pending on the live pages;
  template revisions propagate to all pages at once. Learning: preserving each
  page/s best existing copy (the kettle lede) inside the new framework beats
  rewriting from zero.
