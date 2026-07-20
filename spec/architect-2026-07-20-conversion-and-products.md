# Architect spec - Conversion + Product Quality (2026-07-20)

Scope request (owner, 2026-07-20): a top-tier marketing review of myfengshuihome.com
found that external traffic arrives but does not buy. Owner approved acting on the full
review. Two plans: (1) make the website convert, (2) make the products "perfect." One
change from the review: the refund window is **7 days**, not 30.

This spec follows SKILL_PROJECT_ARCHITECT. Execution follows SKILL_RALPH_LOOP.

## 0. Recovery (what already exists, so we do not redo it)

Read before scoping: kua-calculator/CLAUDE.md, prd.json (8 of 84 tasks still open -
leave it alone), and the recent specs. Key findings that reshape the review:

- **The catalogue was already cut.** shop-redesign-tasks-2026-07-17.md shipped a curated
  9-product shelf with a clean ladder ($19 personal / $29 twelve-spaces / $49 complete),
  moments, kits, and a free strip. `VISIBLE_SLUGS` in lib/storefront.ts is the single
  source of shop visibility. **So "cut the catalogue to a tier ladder" from the review is
  DONE.** We do not touch it.
- **All product pages already share one template:** components/ProductLanding.tsx, driven
  by one LandingConfig per product page. Its header comment currently mandates: "no
  urgency, no testimonials, no refund pointers." Editing this ONE component propagates a
  guarantee, a trust row, and social proof to every product page at once. This is the
  highest-leverage file in the build.
- **Product PDFs are assembled from content/blocks/*.md** via lib/products.ts recipes and
  lib/pdf/. Personalization today is real but shallow: shared blocks with {{firstName}},
  {{kuaNumber}}, {{shengQiDir}} etc. merged in. Writing quality is high; perceived
  personalization and visual richness are the weak points.
- **Welcome-email drafts exist** (welcome-emails-2026-07-18.md, 3 drafts, nothing wired).
- **Measurement baseline exists:** Stripe checkout sessions created vs completed is THE
  metric; no trackers. The under-10%-completion trigger points at checkout/price, the
  no-sessions trigger points at the shelf. Our job is to lift both.

Net: the review's "cut products" item is already handled. The live gaps are exactly the
conversion levers (risk reversal, social proof, desire at the buy button, the free-tool
-> buy bridge, checkout cross-sell, email nurture) and the product-quality levers
(visible personalization, premium design, honest-voice rebalance, previews).

## 1. PROJECT BRIEF

```
Name:          MFSH Conversion + Product Quality pass
Type:          website (conversion) + content/product (quality)
Client:        Internal (My Feng Shui Home)
Deliverables:  Plan 1 (Website/Conversion): sitewide 7-day guarantee, trust row,
               real-only social-proof scaffold, buy-zone desire rewrite, calculator
               ->buy bridge, on-site cross-sell + success-page upsell, welcome-email
               wiring (owner-gated send), pin-to-landing match, mobile buy-zone.
               Plan 2 (Products): visible personalization (front summary + Kua-aware
               callouts + "tonight" box), premium PDF design pass, honest-voice
               rebalance inside the product, generous previews on every page,
               flagship elevation.
Deadline feel: normal, but revenue-urgent (traffic is live and not converting)
Dependencies:  W1/W2/W4 (ProductLanding template) unlock the whole product-page set at
               once and come first. Social proof (W3) renders real quotes only, so it
               ships empty-safe + a collection mechanism; owner supplies real quotes.
               Email send (W7) and Stripe/refund-policy legal wording are owner-gated.
Tech stack:    Next.js App Router + TypeScript on Vercel; Supabase DB; Auth.js v5;
               Resend for email; Stripe Checkout; PDF via lib/pdf + Resvg. No em dashes.
Assets:        Brand book (brand/BRAND_BOOK.md), palette (ivory/green/orange), cover
               factory (product-assets.ts), 22 audited content chapters, ProductLanding
               template, welcome-email drafts, measurement baseline.
```

## 2. Architecture decision (scored)

Single-agent signals: one-flow NO; one-domain ~YES (all in the kua-calculator repo);
under-2h NO; strictly-sequential NO; context-carry NO; iteration-on-existing YES. => ~3.
Multi-agent signals: 3+ domains (code+copy+design+email) YES; parallel-without-blocking
NO (shared template + globals.css + configs); context-loss-across-sessions YES; strict
writer/editor loop NO; cross-layer YES; multi-session YES. => ~4.

Mixed. But the parallelizable-without-shared-files test FAILS (every workstream edits the
same template, CSS, and product configs), so this is not a true agent team.

`EXECUTION MODEL: HYBRID - single-agent staged Ralph build; spawn a subagent only if a
truly independent parallel batch appears (e.g. bulk product-content rewrites), which the
shared-file reality makes unlikely.`

## 3. Team assembly

No standing team. Single agent executes the tracker top-to-bottom. Subagents are not
spawned unless the owner asks or a clean file-disjoint batch emerges.

## 4. Shared context

Unchanged from kua-calculator/CLAUDE.md "Shared agent context" (brand voice, palette,
do-nots). Two review-driven additions for THIS build, folded into every task:
- Honest framing stays, but it moves OUT of the top third of a sales page and DOWN to a
  trust note. Lead with the outcome the reader can feel; reassure underneath.
- Never fabricate testimonials, reviews, ratings, or counts. Social proof renders real,
  owner-supplied quotes only; until they exist it renders a founder/credibility note.

## 5. Skills audit

```
Skills to load:
- skills/shared/SKILL_RALPH_LOOP.md          -> build loop (loaded)
- skills/shared/SKILL_IMAGE_PROMPT_ARCHITECT.md -> Plan 2 preview/cover imagery tasks
- skills/shared/SKILL_PROJECT_ARCHITECT.md   -> this scoping (loaded)

Skills gap: none blocking. Brand voice + honest framing live in CLAUDE.md; no copywriting
skill needed. Diagrams already exist as inline SVG, so drafting-os is not required here.
```

## 6. Ralph tracking decision

prd.json/progress.txt have 8 open tasks (Compass work) and must not be clobbered. Follow
the shop-redesign precedent: a dedicated tracker + append-only log in one file,
`spec/conversion-and-product-tasks-2026-07-20.md`, driven autonomously (owner's standing
preference: once a plan is approved, execute all tasks without waiting for "next").
Per task: implement to acceptance, `npm run build` green, scoped commit; append one
learning line to the tracker Log. Owner-gated steps (Stripe, Resend send, refund-policy
legal text, real testimonials, rendered-image review) get a stepwise walkthrough instead
of a guess.

APPROVED IN ADVANCE by owner ("do everything"). Execution begins immediately.
```
```
