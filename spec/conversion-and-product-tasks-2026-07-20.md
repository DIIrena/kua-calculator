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

- [ ] W1. Sitewide 7-day money-back guarantee. Add a guarantee line to the ProductLanding
      buy sections + a reassurance row; add a `/refund-policy` route (7 days, reply-to-
      email, plain English) linked from footer, cart, and each product FAQ. Acceptance:
      guarantee visible on every product page + cart; /refund-policy renders; footer link
      present; build green.
- [ ] W2. Trust/reassurance row under every hero CTA and in cart: "Pay once · Emailed in
      ~1 min · 7-day refund · A person answers." Pure reassurance, no fabrication.
      Acceptance: row renders on all product pages + cart; 4.5:1 contrast; build green.
- [ ] W3. Real-only social-proof scaffold. lib/testimonials.ts (empty-safe) + a
      Testimonials component on product pages + homepage that renders nothing (or a
      founder/credibility note) when no real quotes exist; plus a one-screen owner
      walkthrough for collecting the first quotes (free upgrade for an honest review).
      NO invented quotes. Acceptance: component ships, renders safely empty, owner doc
      written, build green.
- [ ] W4. Buy-zone desire rewrite (template + configs). In ProductLanding, move the
      "promises nothing"/not-for lines out of the top third; add one felt-outcome line to
      the hero/promise. Rewrite the hero + first promise paragraph of all visible product
      configs to lead with the "after." Honesty stays lower as a trust note. Acceptance:
      no "promises nothing"/negative framing above the fold on any product page; each
      hero states a concrete felt deliverable; zero outcome-promises; build green.
- [ ] W5. Calculator -> buy bridge. Make the CalculatorIsland post-result card contextual
      to the computed Kua ("You are Kua {n}, {group} group - your full eight-direction
      reading is $19") with a direct buy CTA to the Personal Compass. Acceptance: result
      card names the reader's actual Kua + group and links to the $19 product; privacy
      rule intact (still client-side, no birth data sent); build green.
- [ ] W6. On-site cross-sell + success-page upsell. Add a single low-friction add-on
      offer to the buy section (next ladder rung or Good Days/Year Overlay) and a
      post-purchase upsell on the cart/success page. No dark patterns. Acceptance: one
      relevant cross-sell on product pages, one upsell on success; build green.
- [ ] W7. Welcome-email wiring (owner-gated send). Turn the 3 approved drafts into a
      4-5 email sequence in code, triggered on consented capture (checklist/good-days),
      sent via Resend, gated behind an env flag so nothing sends until the owner enables
      it. Consented lists only. Acceptance: sequence + send mechanism built, flag-gated
      OFF by default, owner runbook written, build green.
- [ ] W8. Pin-to-landing match. Ensure /life and /space (and top pin themes) open
      topic-first and funnel to the matching product with a matched CTA. Acceptance: each
      teaser leads with its topic and links to the right product at the right price;
      build green.
- [ ] W9. Mobile buy-zone + post-payment clarity. Verify price + buy CTA are above the
      fold on mobile; add a "you enter your details after payment, about 20 seconds" note
      to the buy section. Acceptance: buy CTA reachable without scroll on a 390px viewport
      per CSS; note present; build green.

## Plan 2 - Products (make them perfect)

- [ ] P1. Visible personalization. Add a personalized front "Your reading at a glance"
      page (their Kua, group, four supportive + four cautious directions in a table) to
      the PDF, and audit/strengthen Kua-aware callouts in the blocks so the reader feels
      it was assembled for them. Acceptance: every personalized product opens with a
      per-reader summary table; page-count bands still pass smoke tests; build green.
- [ ] P2. "What to do tonight" box. A short, boxed first-move list on the summary/first
      page, pulled from the strongest single action in the product. Acceptance: box
      renders in the PDF for personalized products; build green.
- [ ] P3. Honest-voice rebalance inside the product. Reduce repeated "promises nothing"
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
