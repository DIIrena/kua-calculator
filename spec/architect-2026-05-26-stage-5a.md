# Stage 5a - Personal Feng Shui Compass (engine + first product)

Architect pass for the first paid product in the My Feng Shui Home catalogue. Replaces the Stage 4 "Home Harmony Map" $29 placeholder with a modular product engine and ships the first product on top of it: the **Personal Feng Shui Compass** ($14, identity + four good + four bad directions).

The downstream products (single-room, single-life-area, the year ahead, bundles, the flagship) all run on the same engine. Stage 5a builds the engine deliberately so every later product is mostly content writing, not engineering.

---

## Context

Stage 4 shipped the homepage, articles system, 14-point checklist lead magnet, and a `/home-harmony-map` sales page with a deferred Stripe button (currently "Join the early list"). The owner has now decided the product shape:

- The product line is a catalogue of small modular PDFs. The flagship ($49) is the bundle of everything. Smaller products ($5-$19) sell slices of the same content.
- The first product to ship is **the Personal Compass**: a 20-page personalised PDF reading the customer's Kua number, East/West group, four good directions and four bad directions, in real depth.
- No floor plans. No home questionnaire. Personalisation flows from three inputs: birth date, gender, first name.
- Title pattern: *[Name]'s Personal Feng Shui Compass*. Same word ("Compass") substitutes into every other product (*[Name]'s Money Compass*, *[Name]'s Kitchen Compass*, etc.).
- Storytelling voice combining `SKILL_WRITING_VOICE_HP` (sentence-level prose, sensory specificity, varied rhythm) with `marketing/copywriting` (clarity, benefit-led structure). No outcome promises.
- Build sequence: ship one content block first, hand it to the owner for review, then proceed.

---

## Decisions confirmed with the owner (2026-05-26)

1. **Personalisation input**: three fields - birth date, gender, first name. No rooms, no compass directions of the home, no partner section.
2. **First product**: Personal Compass at $14, ~20 pages. Sections: cover, who you are (3-4 pages), four good directions (4-5 pages each), four bad directions (2-3 pages each), closing with a catalogue of other products.
3. **Page depth**: each block targets 4-5 pages of substantive writing. No padding. Total flagship lands around 110 pages once every block is written.
4. **PDF engine**: server-side HTML to PDF using `@sparticuz/chromium` + `puppeteer-core` on Vercel functions. Real book-style typography, columns, inline SVG illustrations. (Resvg stays for the email-PNG flow it already powers.)
5. **Delivery**: instant. PDF generated in seconds after checkout. Customer sees it on-screen and receives a copy by email. Stored in their account for later download.
6. **Voice combination**: every content block is written by combining `SKILL_WRITING_VOICE_HP` (prose-level voice) and `skills/shared/marketing/copywriting.md` (structure, CTAs, clarity).
7. **Review gate**: the Identity block is written first and shown to the owner before any other block is written. Owner-approval gates further content work.
8. **Catalogue position**: this stage ships only the Personal Compass. The other seven products in the catalogue are deferred to Stages 5b-5h.

---

## PROJECT BRIEF

```
Name:          kua-calculator Stage 5a - Personal Feng Shui Compass
Type:          paid product build - first sellable product + engine for the catalogue
Client:        Internal (My Feng Shui Home)
Deliverables:  - Modular product engine: Stripe checkout + webhook + Supabase
                 product_orders/product_responses/product_deliveries tables +
                 content block library + recipe-based PDF assembler.
               - First product: Personal Compass ($14, ~20 pages).
               - Content blocks: 1 identity block + 8 direction-quality blocks
                 (Sheng Chi, Tien Yi, Nien Yen, Fu Wei, Ho Hai, Wu Kuei,
                 Lui Sha, Chueh Ming).
               - Personalised cover with customer first name.
               - Three-field purchase form (birth date, gender, first name).
               - HTML-to-PDF render pipeline (Puppeteer + Chromium on Vercel).
               - Email delivery via Resend with PDF attachment.
               - "My Compasses" account dashboard listing past purchases.
               - Reframed /home-harmony-map sales page.
Deadline feel: normal; aim to ship in one focused multi-session build.
Dependencies:  Stages 1-4 are live. Stripe account needed (test mode first).
               Each content block requires the relevant feng-shui/content/
               chapter to mine for paraphrase material (firewall-compliant).
Tech stack:    Existing kua-calculator stack:
               - Next.js 16 App Router + TypeScript on Vercel
               - Supabase Postgres (data layer)
               - Auth.js v5 (sign-in)
               - Resend (email)
               Stage 5a additions:
               - Stripe + @stripe/stripe-js
               - puppeteer-core + @sparticuz/chromium (Vercel-compatible)
               - markdown rendering for content blocks (lib/markdown.ts reused)
Assets:        - The Kua + Eight Mansions math already lives in lib/kua.ts,
                 lib/directions.ts, lib/cny.ts. We reuse it byte-for-byte.
               - The 22 audited chapters in projects/feng-shui/content/ are
                 the content library for paraphrase. Chapters 01, 02, 04, 06
                 are primary for the Personal Compass content blocks.
               - SKILL_WRITING_VOICE_HP and marketing/copywriting drive prose.
               - Brand book v2 + globals.css tokens drive the PDF design.
               - lib/bagua-svg.ts powers the inline SVG diagrams in the PDF.
               - lib/fonts/Hanken*.ttf bundled for Resvg are reusable as
                 @font-face declarations in the Puppeteer HTML template.
```

---

## ARCHITECTURE DECISION

Scoring the 12 signals:

**Single-agent signals (6):**
1. Completable in one continuous flow? NO (multi-session, ~12 tasks)
2. Touches only one domain? NO (Stripe + Supabase + content writing + PDF + UI)
3. Under ~2 hours of work? NO
4. Sequential, each step dependent on the last? YES (mostly)
5. Context from prior step critical? YES
6. Iteration on existing app? YES

**Single YES count: 3**

**Multi-agent signals (6):**
1. 3+ distinct skill domains? YES (payment infra, data layer, content writing, PDF design, UI)
2. Workstreams parallelisable without blocking? PARTIAL (content writing can run in parallel with engine wiring once the block contract is defined)
3. Single agent loses context? YES (engine code + 9 prose blocks + sales copy is a lot to hold)
4. Writer + review loop needed? YES (owner-approval gate on the Identity block, then on each subsequent block)
5. Cross-layer? YES (backend + frontend + content + infra)
6. More than one session? YES (multiple)

**Multi YES count: 5**

**EXECUTION MODEL: HYBRID** - single agent drives the Ralph batch task-by-task; spawns Sonnet content-writer subagents in parallel for the 9 content blocks once the Identity block is owner-approved. Engine tasks stay on the main thread. The owner-approval gate on the Identity block is the synchronisation point between engine and content streams.

---

## AGENT ROSTER

```
AGENT ROSTER (HYBRID)
Lead Agent - Opus | main thread
  Owns: task queue, engine code, schema, Stripe, PDF assembler, deployment,
        prd.json + progress.txt, final review of every content block.

Content Writer subagents - Sonnet | spawned 1 per block AFTER MAP-CONTENT-001
  Skill load: SKILL_WRITING_VOICE_HP + marketing/copywriting +
              the relevant feng-shui/content/NN-*.md chapter for paraphrase.
  Owns: one content block (markdown file in content/blocks/).
  Hand-off: completed markdown + an attribution note (which feng-shui chapter
            sections informed it) appended to ATTRIBUTION_BLOCKS.md.
  Constraint: never edits engine code, schema, or another writer's block.

Parallel pairs: writer subagents for blocks 2-9 run in parallel after
                MAP-CONTENT-001 is owner-approved.
Sequential:     MAP-CONTENT-001 (Identity block) gates all other writers.
                Engine tasks (MAP-DB-001 through MAP-ENGINE-001) run before
                the first writer is spawned so the block contract is settled.
```

Hard rules:
- Lead never spawns a writer before the Identity block has been owner-approved.
- Each writer touches exactly one file in `content/blocks/`.
- Engine tasks and content tasks must not touch the same files in the same Ralph turn.

---

## SHARED AGENT CONTEXT (additions to projects/kua-calculator/CLAUDE.md)

The existing block stays. Append a Stage 5a section:

```
Stage 5a additions to shared context:

Product naming:    [Name]'s Personal Feng Shui Compass (flagship pattern).
                   Same Compass suffix for all smaller products
                   ([Name]'s Kitchen Compass, [Name]'s Year Ahead Compass).
                   Never use "Reading", "Experience", or outcome words.

Content engine:    The product PDFs are assembled from modular content blocks
                   in content/blocks/*.md. A product recipe (lib/products.ts)
                   maps a product slug to the list of blocks + the order of
                   assembly. Adding a new product is mostly adding a recipe
                   + writing the missing blocks. NEVER hard-code a PDF
                   layout per product; that breaks the engine.

Content paraphrase rules (carried over from projects/feng-shui):
                   - No verbatim text from any source. Paraphrase + synthesise
                     in original English.
                   - No quotes longer than 15 words; cultural-commons only.
                   - The 22 feng-shui/content chapters are already paraphrased
                     from sources and copyright-firewalled. Pulling from
                     those chapters is safe; do not bypass them to read raw
                     PDFs in resources/.
                   - Append a row to content/blocks/ATTRIBUTION_BLOCKS.md
                     for every block: which feng-shui/content chapters
                     informed it.

PDF rendering:     puppeteer-core + @sparticuz/chromium running in a Vercel
                   Node function. HTML template + brand CSS + inline SVG.
                   Customer first name appears in the cover and the running
                   header. Page count target: ~20 for Personal Compass.

Voice rules for content blocks:
                   - Combine SKILL_WRITING_VOICE_HP (prose, rhythm, sensory
                     specificity) + marketing/copywriting (structure,
                     benefit-led, no jargon).
                   - Honest framing every line. "Traditionally", "supports
                     the conditions for", "is associated with". Never "will".
                   - Bold the shift word. Italic for emphasis. No em dashes.
                   - Each block is 4-5 substantive pages. No padding.
                   - Storytelling sections welcome: one short anecdotal or
                     evocative passage per block, in the HP voice register,
                     dropped into the otherwise practical prose.

PDF design:        Cream paper background, dark ink. Hanken Grotesk body.
                   Bilbo Swash Caps reserved for the brand wordmark only
                   (workspace rule). Inline SVG diagrams (no raster).
                   Cover layout: brand mark + customer name in Compass
                   serif treatment + Kua number + date.

Refund policy:     30-day no-questions-asked. Stripe refund + Supabase
                   row marked refunded. No content gating after refund -
                   the PDF stays accessible to avoid drama.
```

---

## SKILLS AUDIT

**Skills to load:**

| Skill | Used by |
|---|---|
| `skills/shared/SKILL_RALPH_LOOP.md` | Lead - drives the build |
| `skills/shared/SKILL_PROJECT_ARCHITECT.md` | this spec (already loaded) |
| `skills/writing-skill-hp/SKILL_WRITING_VOICE_HP.md` | Content Writer subagents |
| `skills/shared/marketing/copywriting.md` | Content Writer subagents + Lead for sales-page rewrite |
| `skills/shared/marketing/page-cro.md` | Lead - re-ordering the /home-harmony-map page if needed |
| `skills/shared/marketing/marketing-psychology.md` | Lead - pricing anchor + sales-page CTA |
| `skills/shared/marketing/ai-seo.md` | Lead - JSON-LD Product schema on the sales page |
| `skills/shared/SKILL_FRONTEND_DESIGN.md` | Lead - PDF layout + purchase form UI |
| `skills/shared/SKILL_UI_UX_PRO_MAX.md` | Lead - purchase form a11y |

**Skills gap (do not exist yet):**

| Proposed skill | Why | Decision |
|---|---|---|
| `skills/shared/SKILL_STRIPE_INTEGRATION.md` | Stage 5a is the first Stripe integration in the workspace. Future paid-product builds will benefit from a reusable playbook (test keys, webhooks, idempotency, refund flow). | Defer to write **after** Stage 5a ships, when we know what actually mattered. |
| `skills/shared/SKILL_PDF_FROM_HTML.md` | First Puppeteer-on-Vercel pipeline in the workspace. The setup is fiddly (chromium binary, function size limits, font loading). | Defer to write **after** the PDF pipeline is proven on Stage 5a. |
| `skills/shared/SKILL_PRODUCT_CATALOGUE.md` | The recipe-based product engine is reusable for any future product line (digital products, courses, etc.). | Defer to write **after** the second product (Stage 5b) ships - the pattern only crystallises with two data points. |

No blocking gaps. We proceed and harvest skills out of the build retroactively.

---

## REUSE MAP

**Reuse as-is:**
- `lib/kua.ts`, `lib/directions.ts`, `lib/cny.ts` - the Kua + Eight Mansions math.
- `lib/bagua-svg.ts` - inline SVG generator, embedded in the PDF template.
- `lib/fonts/HankenGrotesk-*.ttf` - bundled fonts, exposed to Puppeteer via `file://` URL.
- `lib/resend.ts` - delivery transport.
- `lib/rate-limit.ts` - abuse protection on the purchase form (anti-spam).
- `lib/markdown.ts` - renders content blocks to HTML for the PDF.
- `lib/supabase/server.ts` - service-role DB client.
- `auth.ts` - if the customer is signed in at purchase time, we link the order to them; if not, the magic-link email after purchase signs them in.
- `app/globals.css` - brand tokens cascade into the PDF stylesheet.
- `components/SiteHeader.tsx` / `SiteFooter.tsx` - chrome unchanged.
- The 22 chapters in `projects/feng-shui/content/` - **content library** for paraphrase. Primary chapters for the Personal Compass: `01-foundations.md`, `02-five-elements.md`, `04-schools-overview.md`, `06-compass-school.md`.

**Light edit:**
- `app/(site)/home-harmony-map/page.tsx` - reframe copy from "Home Harmony Map" to "Personal Feng Shui Compass". Insert real Stripe button. Update Product JSON-LD.
- `components/SiteHeader.tsx` - no change unless we add "My Compasses" to the account menu (probably yes).
- `app/sitemap.ts` - add the new sales page URL if it moves to `/compass`.
- `prd.json` - 12 new tasks for Stage 5a.

**Create new:**
- `supabase/migrations/0004_product_orders.sql` - the new schema.
- `lib/stripe.ts` - server-side Stripe client.
- `lib/products.ts` - product registry: slug, title pattern, price, list of block IDs, page count target.
- `lib/blocks.ts` - content-block loader.
- `lib/pdf/render.ts` - Puppeteer + Chromium server-side renderer.
- `lib/pdf/template.ts` - HTML + CSS template for the PDF.
- `lib/pdf/cover.tsx` - cover composition (server component rendered to HTML).
- `app/api/checkout/route.ts` - creates a Stripe Checkout session.
- `app/api/stripe-webhook/route.ts` - records paid orders on the webhook.
- `app/(site)/compass/page.tsx` - the new sales page (or stays at /home-harmony-map and is reframed).
- `app/(site)/compass/[slug]/page.tsx` - per-product sales page (Stage 5b+ uses this).
- `app/(site)/compass/checkout/success/page.tsx` - post-checkout form: birth date, gender, first name.
- `app/(site)/account/compass/[id]/page.tsx` - viewing a delivered compass.
- `app/(site)/account/compass/page.tsx` - "My Compasses" list.
- `app/actions/submit-compass-form.ts` - server action: take the three fields, compute Kua, assemble the PDF, store, email.
- `content/blocks/identity.md` - the Identity content block (first to write).
- `content/blocks/sheng-chi.md`, `tien-yi.md`, `nien-yen.md`, `fu-wei.md` - the four good direction blocks.
- `content/blocks/ho-hai.md`, `wu-kuei.md`, `lui-sha.md`, `chueh-ming.md` - the four bad direction blocks.
- `content/blocks/closing.md` - the closing block with the product catalogue (light, mostly product list).
- `content/blocks/ATTRIBUTION_BLOCKS.md` - per-block source-chapter mapping.

---

## SUPABASE SCHEMA (migration 0004)

```sql
-- One row per Stripe Checkout session, created on webhook receipt.
create table public.product_orders (
  id              uuid primary key default gen_random_uuid(),
  user_id         uuid references next_auth.users(id) on delete set null,
  email           text not null,
  product_slug    text not null,                  -- 'personal-compass', etc.
  stripe_session  text not null unique,
  stripe_payment  text,
  amount_cents    integer not null,
  currency        text not null default 'usd',
  status          text not null default 'paid',   -- paid | refunded
  created_at      timestamptz not null default now()
);

-- Customer responses to the 3-field form. Created on form submission.
create table public.product_responses (
  id              uuid primary key default gen_random_uuid(),
  order_id        uuid not null references public.product_orders(id) on delete cascade,
  first_name      text not null,
  birth_year      integer not null,
  birth_month     integer not null check (birth_month between 1 and 12),
  birth_day       integer not null check (birth_day between 1 and 31),
  gender          text not null check (gender in ('male', 'female')),
  kua_number      integer not null,               -- computed server-side
  kua_group       text not null check (kua_group in ('east', 'west')),
  created_at      timestamptz not null default now()
);

-- The rendered PDF for an order. One row per delivery.
create table public.product_deliveries (
  id              uuid primary key default gen_random_uuid(),
  order_id        uuid not null references public.product_orders(id) on delete cascade,
  response_id     uuid not null references public.product_responses(id) on delete cascade,
  pdf_path        text not null,                  -- Supabase Storage object path
  page_count      integer not null,
  delivered_at    timestamptz not null default now()
);
```

PDFs stored in a new Supabase Storage bucket `product-pdfs/`, private; signed URLs minted on read by the account page.

---

## STAGE 5A TASK BREAKDOWN (Ralph batch)

| ID | Title | Acceptance criteria |
|---|---|---|
| MAP-DB-001 | Supabase migration 0004 + Storage bucket | Migration applied via Supabase SQL editor (owner does this step). `product_orders`, `product_responses`, `product_deliveries` tables exist. `product-pdfs` Storage bucket created (private). |
| MAP-STRIPE-001 | Stripe checkout + webhook for Personal Compass | `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`, `STRIPE_PRICE_ID_PERSONAL_COMPASS` env vars added. `POST /api/checkout` creates a session for the Personal Compass. `POST /api/stripe-webhook` verifies signature and writes a `product_orders` row on `checkout.session.completed`. Test card 4242 4242 4242 4242 produces a row. |
| MAP-ENGINE-001 | Content block library + product recipe | `lib/blocks.ts` loads a block by slug from `content/blocks/`. `lib/products.ts` defines the Personal Compass recipe (cover + identity + 4 good direction blocks selected by Kua + 4 bad direction blocks selected by Kua + closing). Unit test: passing a Kua=1 customer through the recipe returns the expected block sequence. |
| MAP-CONTENT-001 | Write Identity block (4-5 pages, owner-review gate) | `content/blocks/identity.md` written by combining SKILL_WRITING_VOICE_HP + copywriting + paraphrase of `feng-shui/content/01-foundations.md` + `06-compass-school.md`. Variants for East and West groups. Zero em dashes. Honest framing throughout. **Owner reads and approves before any other content task starts.** |
| MAP-CONTENT-002 | Write four good-direction blocks (parallel subagents) | One block per quality: Sheng Chi (wealth), Tien Yi (health), Nien Yen (love/longevity), Fu Wei (personal growth). Each ~4-5 pages. Paraphrase from `feng-shui/content/06-compass-school.md`. Spawned in parallel as Content Writer subagents after MAP-CONTENT-001 passes. Each appends to ATTRIBUTION_BLOCKS.md. |
| MAP-CONTENT-003 | Write four bad-direction blocks (parallel subagents) | Ho Hai (misfortune), Wu Kuei (five ghosts), Lui Sha (six killings), Chueh Ming (total loss). 2-3 pages each (shorter than the good directions but still substantive). Same paraphrase + voice rules. Spawned in parallel. |
| MAP-CONTENT-004 | Write closing block + catalogue | `content/blocks/closing.md`: a short send-off in voice, then a one-line description of every product in the eight-product catalogue, ordered by relevance to this customer. |
| MAP-PDF-001 | HTML-to-PDF render pipeline (Puppeteer + Chromium on Vercel) | `lib/pdf/render.ts` takes a product slug + customer response + assembled HTML, returns a PDF buffer. Uses `@sparticuz/chromium` + `puppeteer-core`. Vercel function under 50MB limit. PDF renders consistently across cold and warm starts. |
| MAP-PDF-002 | PDF template + cover composition | `lib/pdf/template.ts` builds the full HTML with: @font-face for Hanken Grotesk; brand CSS (cream paper, dark ink); cover with customer first name in display treatment; running header; page numbers. Inline SVG bagua and direction diagrams embedded. |
| MAP-FORM-001 | Post-checkout three-field form | After Stripe redirect to `/compass/checkout/success?session_id=...`: fetch the order, render a form for first name + birth date + gender. Server action computes Kua, calls the PDF render, writes `product_responses` + `product_deliveries`, uploads PDF to Storage, sends Resend email with the PDF attached, redirects to the new account page. |
| MAP-DELIVERY-001 | Email delivery + "My Compasses" account dashboard | Resend email with the PDF attached uses a clean HTML template (clone of `lib/email-chart.ts` shape). `app/(site)/account/compass/page.tsx` lists past compasses with download links (signed URLs from Storage). `app/(site)/account/compass/[id]/page.tsx` shows a single compass with re-download and re-send buttons. |
| MAP-SALES-001 | Reframe /home-harmony-map sales page | Rename internally to /compass (keep /home-harmony-map as a 301 redirect for any inbound links). Reframe copy from "Home Harmony Map" to "Personal Feng Shui Compass". Price $14. Real Stripe button replaces the early-list form. Product JSON-LD updated. |
| MAP-SMOKE-001 | End-to-end smoke + progress.txt entry | Stripe test purchase ($14 test card) → email arrives in ~60s with PDF attached → account page lists the compass → re-download works. No em dashes anywhere. `npm run build` succeeds. progress.txt entry appended. All 12 Stage 5a tasks `passes: true` in prd.json. |

Twelve tasks. The Identity block (MAP-CONTENT-001) is the synchronisation point between engine and content streams - all four parallel-writer tasks above wait on its owner-approval.

---

## OPEN ISSUES (resolve before MAP-CONTENT-001 starts)

1. **Stripe account**: the owner needs to create a Stripe account (or confirm an existing one) and provide test-mode keys. We can write all the code first; the keys are only needed for MAP-STRIPE-001's smoke test.
2. **Brand approval on cover design**: the cover composition for "[Name]'s Personal Feng Shui Compass" needs a quick visual confirmation. We will mock the cover in MAP-PDF-002 and pause for owner approval before continuing.
3. **Price-point lock**: $14 is the spec'd price. Owner can change it before MAP-STRIPE-001 by saying so; after that, changing it means a Stripe Price update + a code redeploy.
4. **Tax / VAT handling**: deferred. For Stage 5a we sell at a flat $14 and add nothing. If revenue rises we revisit Stripe Tax automation in a later stage.
5. **Refund flow**: the schema supports it (status='refunded'). The actual button to refund lives in the Stripe dashboard, not in our app, for Stage 5a.

---

## VERIFICATION (how to test end-to-end)

Per task: standard Ralph protocol (build clean, zero em dashes, route returns 200, etc.).

End of Stage 5a smoke test:
1. Open `/compass` signed out. Click the buy button.
2. Pay $14 with the Stripe test card.
3. Land on the success page. Fill the three fields (Marco, 1990-04-15, male). Submit.
4. Within 60 seconds: receive an email with `Marcos-Personal-Feng-Shui-Compass.pdf` attached.
5. Click the magic-link in the email to sign in. Visit `/account/compass`. See the new compass listed.
6. Click into it. Download the PDF again. Verify it matches.
7. Open the PDF. Verify:
   - Cover reads *Marco's Personal Feng Shui Compass*.
   - Kua number is correct for 1990-04-15 male.
   - Identity block opens with the East/West-group variant matching his Kua.
   - The four good-direction blocks each declare *Marco's [Sheng Chi]* direction is [X].
   - Page count is in the 18-22 range.
   - Zero em dashes.
   - Brand cream paper, dark ink, Hanken Grotesk body.
8. From Stripe dashboard: refund the test charge. Verify `product_orders.status` flips to 'refunded'. The PDF should remain accessible (per the refund-policy decision).
9. Append a paragraph to progress.txt with the learning from this stage. The most likely lesson: which part of the pipeline (Chromium binary, Storage upload, Resend attachment) was the friction point.

---

## NEXT STAGES (out of scope for Stage 5a, planned for the catalogue)

| Stage | Ships | Notes |
|---|---|---|
| 5b | Year Ahead Compass ($9, 6 pages) | Add 1 new block (year-against-Kua); reuse the engine wholesale. |
| 5c | All twelve Single Space Compasses ($7 each, 6 pages each) | Big content sweep (12 blocks). One engine change: per-product recipes already supported. |
| 5d | All nine Single Life Pillar Compasses ($7 each) | Same shape as 5c. |
| 5e | Pick-Three bundles for Pillars and Spaces ($17 each) | UI: a "pick three" step before checkout. |
| 5f | All Nine Pillars + All Twelve Spaces bundles ($29 each) | Pure recipes. |
| 5g | The Flagship Personal Compass ($49, ~110 pages) | The bundle of bundles. Marketing event. |
| 6 | Couple Compatibility Compass ($19) | Separate input flow (two birth dates). Own product line. |

Total catalogue once 5a-5g ship: eight individual products + the flagship + compatibility = nine SKUs on the same engine. Most of the work in 5b-5f is content writing; each new product is a few hours of engineering and a few sessions of writing.

---

## END OF SPEC

Once the owner approves this spec, I will:
1. Create `projects/kua-calculator/prd.json` entries for the 12 Stage 5a tasks (extending the existing prd.json from Stages 2-4).
2. Begin MAP-DB-001. The owner runs the migration in Supabase.
3. Proceed through tasks in order, parallelising MAP-CONTENT-002 / 003 / 004 only after MAP-CONTENT-001 has been read and approved by the owner.
