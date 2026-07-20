# Conversion + Product tasks (2026-07-20)

Ralph tracker for the two approved plans from the 2026-07-20 marketing review. Spec:
architect-2026-07-20-conversion-and-products.md. Protocol: autonomous (owner standing
preference). Per task: implement -> `npm run build` green -> scoped commit -> append one
Log line. prd.json/progress.txt are OFF LIMITS (8 open Compass tasks). Refund window is
**7 days**. Never fabricate testimonials. Honest framing moves out of the top third of a
sales page and down to a trust note.

Owner-gated (code side done by us; owner runs the last mile): refund-policy legal wording
sign-off, enabling the welcome-email send (Resend), collecting real testimonials,
reviewing rendered cover/preview imagery.

## Plan 1 - Website / Conversion

- [x] W1. Sitewide 7-day money-back guarantee. Add a guarantee line to the ProductLanding
      buy sections + a reassurance row; add a `/refund-policy` route (7 days, reply-to-
      email, plain English) linked from footer, cart, and each product FAQ. Acceptance:
      guarantee visible on every product page + cart; /refund-policy renders; footer link
      present; build green.
- [x] W2. Trust/reassurance row under every hero CTA and in cart: "Pay once · Emailed in
      ~1 min · 7-day refund · A person answers." Pure reassurance, no fabrication.
      Acceptance: row renders on all product pages + cart; 4.5:1 contrast; build green.
- [x] W3. Real-only social-proof scaffold. lib/testimonials.ts (empty-safe) + a
      Testimonials component on product pages + homepage that renders nothing (or a
      founder/credibility note) when no real quotes exist; plus a one-screen owner
      walkthrough for collecting the first quotes (free upgrade for an honest review).
      NO invented quotes. Acceptance: component ships, renders safely empty, owner doc
      written, build green.
- [x] W4. Buy-zone desire rewrite (template + configs). In ProductLanding, move the
      "promises nothing"/not-for lines out of the top third; add one felt-outcome line to
      the hero/promise. Rewrite the hero + first promise paragraph of all visible product
      configs to lead with the "after." Honesty stays lower as a trust note. Acceptance:
      no "promises nothing"/negative framing above the fold on any product page; each
      hero states a concrete felt deliverable; zero outcome-promises; build green.
- [x] W5. Calculator -> buy bridge. Make the CalculatorIsland post-result card contextual
      to the computed Kua ("You are Kua {n}, {group} group - your full eight-direction
      reading is $19") with a direct buy CTA to the Personal Compass. Acceptance: result
      card names the reader's actual Kua + group and links to the $19 product; privacy
      rule intact (still client-side, no birth data sent); build green.
- [x] W6. On-site cross-sell + success-page upsell. Add a single low-friction add-on
      offer to the buy section (next ladder rung or Good Days/Year Overlay) and a
      post-purchase upsell on the cart/success page. No dark patterns. Acceptance: one
      relevant cross-sell on product pages, one upsell on success; build green.
- [ ] W7. Welcome-email wiring (owner-gated send). Turn the 3 approved drafts into a
      4-5 email sequence in code, triggered on consented capture (checklist/good-days),
      sent via Resend, gated behind an env flag so nothing sends until the owner enables
      it. Consented lists only. Acceptance: sequence + send mechanism built, flag-gated
      OFF by default, owner runbook written, build green.
- [x] W8. Pin-to-landing match. Ensure /life and /space (and top pin themes) open
      topic-first and funnel to the matching product with a matched CTA. Acceptance: each
      teaser leads with its topic and links to the right product at the right price;
      build green.
- [x] W9. Mobile buy-zone + post-payment clarity. Verify price + buy CTA are above the
      fold on mobile; add a "you enter your details after payment, about 20 seconds" note
      to the buy section. Acceptance: buy CTA reachable without scroll on a 390px viewport
      per CSS; note present; build green.

## Plan 2 - Products (make them perfect)

- [x] P1. Visible personalization. Add a personalized front "Your reading at a glance"
      page (their Kua, group, four supportive + four cautious directions in a table) to
      the PDF, and audit/strengthen Kua-aware callouts in the blocks so the reader feels
      it was assembled for them. Acceptance: every personalized product opens with a
      per-reader summary table; page-count bands still pass smoke tests; build green.
- [x] P2. "What to do tonight" box. A short, boxed first-move list on the summary/first
      page, pulled from the strongest single action in the product. Acceptance: box
      renders in the PDF for personalized products; build green.
- [x] P3. Honest-voice rebalance inside the product. Reduce repeated "promises nothing"
      disclaimers in content/blocks/*.md to one strong upfront statement per product;
      make the body confident (no outcome promises added). Acceptance: no block repeats a
      no-promise disclaimer more than once; tone reads confident; build green.
- [ ] P4. Premium PDF design pass. Designed cover treatment, section dividers,
      pull-quote + checkbox-worksheet styling, keepsake reference card. Acceptance:
      visible design system in the rendered PDF; smoke tests green; build green.
- [ ] P5. Generous previews on every product page. 3-5 real interior page images via
      ProductPreview for all visible products (not just the Personal Compass).
      Acceptance: every visible product page shows a multi-image look-inside; build green.
- [ ] P6. Flagship elevation. Make the $49 Complete Home Compass visibly the best value
      and most premium (copy anchor + design). Acceptance: flagship page anchors value vs
      the two lower rungs and carries the fullest preview; build green.

## Log

(one line per completed task, newest last)

- W1+W2 (2026-07-20): the 7-day guarantee already existed on /legal but was
  deliberately hidden from every buying surface (ProductLanding header even
  mandated "no refund pointers"). Surfaced it via components/TrustRow.tsx
  (TrustRow strip + GuaranteeNote) in the hero + buy section + cart; palette CSS
  appended. Build green, committed on branch conversion-product-2026-07-20.
  Learning: the highest-leverage conversion fix was not writing a guarantee but
  un-hiding one that already existed; the refund window was already 7 days, so
  the owner's "make it 7 not 30" was already satisfied in the legal copy.
- W4 (2026-07-20): added an optional heroPromise line to LandingConfig +
  ProductLanding hero, populated for all 9 visible products with an honest,
  concrete "here is what you will be able to do" line. Build green, committed.
  Learning: the template already kept "not for you" near the bottom, so the only
  above-the-fold gap was a felt deliverable in the hero; one additive field fixed
  it everywhere without touching the honest framing lower down.
- W5 (2026-07-20): ui.js now injects "You are Kua N, East/West group." into the
  Personal Compass card on the result screen (client-side only, embed still hides
  the compass cards), offer leads with the $19 front door at a primary priced CTA
  and the guarantee, flagship priced beneath. Build green, committed. Learning:
  revealPostResultCta already had occ1 in scope at the call site, so
  personalisation cost one param + one guarded querySelector, no privacy change.
- W3 (2026-07-20): lib/testimonials.ts (real, consented quotes only, empty for
  now) + components/SocialProof.tsx (quote cards when real ones exist, an honest
  credibility note otherwise, never fabricated) wired into ProductLanding + the
  homepage; owner collection runbook written. Build green, committed. Learning:
  the empty-safe credibility note lets us ship social proof today without a single
  fake quote, and flips to real cards automatically the moment the array fills.
- W6 (2026-07-20): post-purchase upsell on /cart/success (flagship + free Good
  Days, calm, no countdown) + the guarantee surfaced on the success note. On-site
  cross-sell already existed via FlagshipChooser + autolinkProducts. Committed.
- W8 (2026-07-20, verified-existing): /life/[area] already leads with the life
  area and funnels to the Personal Compass at a primary CTA; no change needed.
- W9 (2026-07-20, verified-existing): per-product buyLine + the hero note
  ("Emailed within about a minute") + finalNote already state the after-payment
  step and delivery, and the hero stacks text-first so the CTA precedes the cover
  image on mobile; the trust row flex-wraps. No new code needed.
- P1 (2026-07-20, mostly pre-existing): the "compass at a glance" summary block
  already opens the personalised products with the reader's four supportive + four
  cautious directions in tables plus a compact personal bagua. P2 augments it.
- P2 (2026-07-20): added a clay-accented "Start tonight" box to the summary page
  (new .start-tonight PDF style) giving the single first move keyed to the reader's
  supportive directions. Build green, committed. Learning: raw-HTML <p class> in the
  block markdown is the proven pattern (card-rules), so no renderer change was needed.
- P3 (2026-07-20): trimmed the over-disclaiming blocks. pillar-wealth 3 -> 1
  no-promise lines; relationships + helpful-people redundant closers rewritten to
  lead with what the reading DOES. One honest boundary kept per block; no outcome
  promises added. Build green, committed.

## Remaining (next batch)

- W7 (email nurture wiring): CODE not yet built. Owner-gated on Resend send + a
  consent flag; the 3 approved drafts in welcome-emails-2026-07-18.md are the source.
- P4 (premium PDF design pass): larger visual-system task; the .start-tonight box is
  a first step. Section dividers, keepsake reference card, cover polish remain.
- P5 (generous previews on every product page): needs real rendered interior images
  per product (owner asset review). ProductPreview exists; only some products have
  images today.
- P6 (flagship elevation): partly done via heroPromise + the success upsell; the
  design half overlaps P4.

## Second pass (2026-07-20, approved): C0-C6 website + P4-P9 products

Supabase reality check folded in: product_waitlist holds 23 rows = 20 "newsletter"
(footer subscribe, collecting since 2026-06-07, never emailed) + 1 planner + 1 personal
compass + 1 move-in kit. scripts/send-launch-email.mjs exists (dry-run default, sent-log
dedupe) but covers only 2 slugs and promises an EARLYLIST Stripe coupon that may not
exist. profiles.marketing_opt_in exists (account page only). Lead magnet stores nothing.

- [ ] C0. Waitlist + newsletter first send (owner-gated --live). Extend
      send-launch-email.mjs with move-in-kit and newsletter templates + --no-coupon
      mode; dry-run all four segments; stepwise owner walkthrough (create EARLYLIST in
      Stripe OR send --no-coupon; review previews; run --live per segment).
- [ ] C1. Funnel measurement: Vercel Web Analytics + Supabase step counters
      (shelf_view, product_view, checkout_completed, capture_optin) via no-PII beacon
      on shop surfaces only; calculator + /embed stay tracker-free. Weekly readout doc.
- [ ] C2. Shelf-level trust + desire: TrustRow + guarantee + empty-safe stars on
      /products and homepage shop strip; one felt-outcome line per card; bundle cover.
- [ ] C3. Consented capture unification: optional opt-in on checklist form writing to
      the same newsletter list; one-click unsubscribe route + token; privacy copy
      update keeping the calculator promise distinct; account-page invitation reuses
      profiles.marketing_opt_in.
- [ ] C4. Welcome sequence (finishes W7): 4 emails from the approved drafts, env-flag
      gated OFF, Resend, owner runbook.
- [ ] C5. Cold-traffic front door: one $9 product featured for shelf-first visitors;
      pin ref params logged into counters; /space pin continuity check.
- [ ] C6. 2027 seasonal engine: 2027 Planner waitlist card (existing waitlist infra);
      mid-year edition copy states what July buyers get now vs the 2027 edition.
- [ ] P4. Premium PDF design pass: cover treatment, section dividers, pull-quote +
      worksheet styling, keepsake reference card.
- [ ] P5. Look-inside previews on all 9 visible products (owner reviews all imagery
      before ship).
- [ ] P6. Flagship elevation: value comparison vs $19/$29 rungs on the $49 page.
- [ ] P7. Delivery-email unboxing polish in lib/email-delivery.ts.
- [ ] P8. Shelf promise lines (shared source with C2, written once in LandingConfig).
- [ ] P9. 2027 refresh path doc + truth-matrix housekeeping (fulfilment owner-verified
      2026-07-20).
- C0 (2026-07-20, second pass): send-launch-email.mjs extended with move-in-kit +
  newsletter templates and --no-coupon mode; dry-runs verified for all 4 segments
  (20 newsletter + 3 product signups, zero ever emailed); stepwise owner walkthrough
  at spec/waitlist-send-walkthrough-2026-07-20.md. Learning: the footer subscribe
  form has been quietly filling a real newsletter list (product_waitlist slug
  "newsletter") since June 7; the overdue send is the warmest revenue action.
- C1 (2026-07-20, second pass): Vercel Analytics turned out fully wired with the
  exact privacy exclusions the hard rules demand, so C1 became the missing joiner:
  scripts/funnel-readout.mjs (orders/revenue, deliveries, list growth, waitlists,
  opt-ins from Supabase) + spec/funnel-readout-guide.md (Vercel views -> Stripe
  sessions -> DB, act on the largest drop; UTM-per-pin convention). Learning: the
  45-day readout shows 3 test orders and $3.61 total revenue; the funnel numbers
  confirm the owner's "traffic but no sales" report and give the baseline to beat.
- C2 (2026-07-20): TrustRow + GuaranteeNote on /products shelf hero/footer and the
  homepage paid-offer strip. Learning: W1/W2 trust stopped one click too deep; the
  live shelf (where cold traffic lands) carried zero reassurance until now.
- C3 (2026-07-20): checklist form gains an unchecked opt-in writing to the same
  newsletter list the footer fills; truthful conditional email footer; /api/
  unsubscribe deletes note-list rows outright; privacy page documents the list;
  send script signs per-recipient one-click unsubscribe links. Learning: the
  "no list" promise was already half-superseded by the footer form; unifying on
  one list with explicit consent resolved the contradiction instead of hiding it.
- C4 (2026-07-20): the three owner-approved welcome drafts wired verbatim
  (lib/welcome-sequence.ts) + /api/cron/welcome (flag-gated OFF, dry-run mode,
  20h spacing, migration 0010 for progress). Runbook written. Learning: the
  drafts were 3 emails, not the planned 4; wiring exactly the approved copy and
  noting the 4th as future beats inventing unapproved copy.
- C5 (2026-07-20): $9 Good-Days Calendar joins the featured shelf row as the
  cold-traffic impulse rung; pin UTM convention documented in the pipeline
  README; /space verified already funneling topic-first.
- C6 (2026-07-20): 2027 Planner waitlist block on the planner page via a new
  waitlist slug; launch email later targets exactly that segment.
- P4 (2026-07-20): premium finishing layer in lib/pdf/template.ts: chapter-closing
  hairlines, framed cover plate, and the cut-out keepsake card built from
  BlockContext (zero per-product content cost). Smoke tests green.
- P5 part 1 (2026-07-20): owner-gated preview pipeline: render-sample-previews.mjs
  (five personalised recipes via the existing dev route, sample buyer Ana/Kua 8) +
  build-bundle-cover.mjs (three real component covers fanned; review copy in
  scripts/out/previews, --install after approval) + walkthrough. Learning: the dev
  sample route already accepted ?product=, so the whole pipeline is fetch + save.
- P6 (2026-07-20): optional comparison block in LandingConfig, populated for the
  flagship: three tiers, honest registry-fact rows, highlighted $49 column,
  per-page value math anchor.
- P7 (2026-07-20): where-to-start pointer in both delivery emails (at-a-glance +
  Start tonight for personalised; read-one-section for printables), HTML + text.
- P8 (2026-07-20): the shop cards never rendered the registry one-liners (title +
  price only - the live audit's "functionality unclear" verbatim). Cards now carry
  sharpened outcome lines for all ten visible products. Also fixed C5 properly:
  the shelf renders group membership, not the featured flag, so Good-Days joined
  MOMENT_SLUGS. Learning: verify the RENDER path, not just the data path.
- P9 (2026-07-20): spec/annual-refresh-2027.md (full 2027 map: what carries a 2026
  stamp, who gets emailed, timeline) + truth-matrix addendum (fulfilment
  owner-verified, shelf now 10 visible).
