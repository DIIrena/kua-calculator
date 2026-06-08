# My Feng Shui Home - Platform Strategy

A payment-neutral master plan for the next stage of myfengshuihome.com. The website strategy, content architecture, product line, and funnels are designed so the work can ship before live payments are wired and so either Stripe (the default intended path) or Lemon Squeezy (the backup) plug in cleanly later.

---

## Platform relationship (consolidation, 2026-06-07)

My Feng Shui Home is one brand running across three sibling projects in this workspace, each with a non-overlapping role. The chapter library is the source. The deployed site is the truth.

| Project | Role |
|---|---|
| `projects/kua-calculator/` | **Canonical public site.** Everything visitors see at myfengshuihome.com ships from here: routes, products, blocks, analytics, account, and (next) the new `/guide` tree. |
| `projects/feng-shui/` | **Content source library.** The 22 audited paraphrased chapters, ATTRIBUTION, source-map, and research resources. Has a Flask "dashboard" but that is an internal browsing tool only; it never deploys. |
| `projects/annual-feng-shui-planner/` | **Per-edition build project.** Produces the 2026 Planner PDF/EPUB/ICS. Future paid printables follow the same shape: one build folder per product per edition. |

Two pipelines move content from source to truth.

**Content pipeline (web pages):**

```
feng-shui/content/NN-*.md          (source, paraphrased, AUDIT-001 passed)
        │ adapt to web voice, scope to one cluster page
        ▼
kua-calculator/content/guide/<cluster>/<slug>.md
        │
        ▼
served at /guide/<cluster>/<slug>
```

**Build-artifact pipeline (paid printables):**

```
annual-feng-shui-planner/build/2026/planner.pdf
        │ manual sync at launch
        ▼
kua-calculator/public/downloads/...   (gated download)
```

This addendum supersedes nothing in the rest of the doc. Section 4 (sitemap) and Section 5 (ultimate-guide article plan) describe the `/guide` tree this pipeline feeds.

---

## Latest pointers

- Anchor-page promotion list lives at `spec/anchor-pages-2026-06-08.md`. The 5 anchors (4 Kua calculator + 1 Planner waitlist) selected from the 38 published guide pages, with per-page CTAs and content angles. Use as the ground truth for the channels and content-calendar phases that follow.
- Channel selection for the 5 anchors lives at `spec/channels-2026-06-08.md`. Pinterest-first launch on find-your-kua-number, with a 30-day mix of Pinterest 45 / SEO 30 / asset production 15 / Reddit 10 / email 0. Owner-realistic week 1 of 6 to 8 hours. Use as the ground truth for the content-calendar phase that follows.

---

## 0. One-page summary

| Question | Answer |
|---|---|
| What is this? | The master plan for myfengshuihome.com as a free guide + free tools + paid digital shop. Digital products only - no consultations, no service delivery. |
| What is locked in? | Brand, voice, the free Kua calculator, the 22-chapter source library, the Personal Feng Shui Compass as the foundation paid product, the 2026 Annual Planner as the second paid product. |
| What is deferred? | Live payments. The Stripe live key, bank account, tax setup, and automated file delivery wait on the US business bank account being open. |
| What is the default payment path? | **Stripe custom checkout on myfengshuihome.com.** Lemon Squeezy is a backup if Stripe approval, tax, or delivery becomes inconvenient. |
| What do we build now? | Strategy doc + sitemap + article plan + product roadmap + product page outlines + website copy cleanup. No live payment work. |
| What do we build next, after the bank account opens? | Stripe live wiring, the post-checkout form (with full birth date + CNY), email delivery, "My Compasses" account dashboard. |

---

## 1. Platform vision

My Feng Shui Home is built to be all four of these at once:

1. **The ultimate free feng shui guide.** A reader can land on the site with no money and walk away with a calm, honest, deeply useful understanding of feng shui that is rare on the open web.
2. **A home for free tools.** Free Kua calculator first; later, a free annual-sector lookup, a free room-checklist, a free move-in date checker. Free tools are the top of the funnel and the brand's reputation engine.
3. **A shop for paid digital products.** Personalised PDFs that read the customer's Kua, the year, the room, or the relationship. Priced to be impulse-buyable ($9-$49), automated, refundable.
4. **A scalable shelf of personalised digital tools and reports.** Once the foundation catalogue is stable, the next tier is *more* personalised digital products - reports keyed to the customer's data, paid email courses, interactive tools, printable workbook bundles. The platform is digital-only; we do not sell one-on-one time.

The throughline: **honest framing every line**. The brand competes by *not* doing the things every other feng shui site does (mysticism, outcome promises, fortune-telling, padded-up paid products, vague free content). The free guide is genuinely excellent. The paid products are genuinely focused. Customers come back because nobody else on the open web sounds like this.

---

## 2. Current assets inventory

| Asset | Where it lives | State |
|---|---|---|
| **22-chapter feng-shui source library** | `projects/feng-shui/content/00-21*.md` | Complete, audited, copyright-firewalled. Covers foundations, elements, bagua, four schools, room-by-room, money, bedroom, healthy home, rituals, BaZi + QMDJ + crystals as sister disciplines, glossary, diagnostic walkthrough. |
| **The kua-calculator website** | `projects/kua-calculator/` (live at myfengshuihome.com) | Live. Free Kua calculator + 11 articles + life-area pages + room pages + lead-magnet checklist + account system + saved-chart view + Stripe sandbox keys saved (not live). |
| **2026 Annual Feng Shui Planner** | `projects/annual-feng-shui-planner/` | In progress. Has product blueprint, content (14 sections), 2026 chart research, design system, build artifacts, website sales strategy. Next: final PDF + website integration. |
| **Personal Feng Shui Compass** | `projects/kua-calculator/content/blocks/`, recipe in `lib/products.ts` | Foundation paid product, $14. Content rewritten, scrubbed, voiced, polished. Sample PDF renders at `/api/dev/sample-compass`. Stripe wiring + post-checkout form + email delivery wait on live payments. |
| **Brand book and voice skills** | `skills/shared/marketing/voice-storytelling-copy.md`, `skills/shared/feng-shui-practitioner-voice/SKILL_FENG_SHUI_PRACTITIONER_VOICE.md` | Two complementary voices. Storytelling-copy = warm sensory marketing prose. Practitioner-voice = "I am walking through your home with you" - confident, calm, action-led. Each has its zone. |
| **Lead magnet** | 14-point Room Harmony Checklist (printable page + Resend email) | Live. Captures email, sends PDF, kicks off relationship. Currently the only opt-in. |
| **Account / data layer** | Supabase (next_auth + profiles + saved_charts + product_orders + product_responses + product_deliveries + email_sends), Auth.js v5 (Google + magic link), Resend for transactional email | Live. Migrations applied. The data model already supports paid orders even though payments are not yet live. |

---

## 3. Payment architecture (payment-neutral by design)

### Decision

**Stripe custom checkout is the default intended path.** Lemon Squeezy is a backup for the case where Stripe approval, US digital-goods tax, or automated file delivery become an unhelpful drag. Stripe and Lemon Squeezy are roughly equivalent on customer-side experience; the difference is on the merchant side (Stripe = more control, slightly more work; Lemon Squeezy = simpler, takes a higher merchant fee, handles VAT/MOSS as merchant of record).

### Current state of Stripe

- Stripe sandbox account exists; test keys are saved in the owner's notes.
- Test Product + Price for "Personal Feng Shui Compass" at $14 exist in the sandbox.
- The data layer (`product_orders`, `product_responses`, `product_deliveries`) already exists in Supabase and is ready for the webhook.
- The architect spec for Stage 5a (`spec/architect-2026-05-26-stage-5a.md`) defines the route shapes (`/api/checkout`, `/api/stripe-webhook`) and the success-page flow.
- The PDF render pipeline + email + storage bucket are all in place.
- **What is missing**: the US business bank account (in progress), then the live Stripe activation that depends on it.

### Payment-neutral build pattern

Until live payments switch on, every product CTA on the site uses a **provider-agnostic Buy Button component** with a defined contract:

```
<BuyButton
  productSlug="personal-feng-shui-compass"
  priceLabel="$14"
  state="waitlist"   // or: "stripe-test" | "stripe-live" | "lemon-squeezy"
/>
```

The component decides what to render based on `state`:

- `state="waitlist"` → renders "Join the early list" + email capture (free, builds the list, no money flows)
- `state="stripe-test"` → renders "Buy now ($14)" + POSTs to `/api/checkout` with the test Stripe key (sandbox)
- `state="stripe-live"` → same path, live keys (once activated)
- `state="lemon-squeezy"` → renders a Lemon Squeezy hosted checkout link

The product registry in `lib/products.ts` carries the state per product. Flipping from waitlist to live is one line in the registry per product, plus an environment-variable swap.

**Why this matters**: every product landing page can ship now with a working CTA (`waitlist` mode collects emails for the launch). The day Stripe is live, we flip one flag per product and the same landing pages become real purchase pages. Nothing about the page design or copy changes.

### Backup path (Lemon Squeezy)

If Stripe approval drags, or US digital-goods sales tax across 30+ states becomes intolerable to manage, the backup is Lemon Squeezy. They are merchant of record - they handle the global VAT and US state tax on our behalf. The trade is roughly 5% + $0.50 vs Stripe's 2.9% + $0.30, plus less customisation of the checkout. We keep this as a real option, not a fantasy one, by making sure every landing page has its CTA behind the BuyButton component.

### Tax + file delivery

Both are deferred. Stripe Tax + Supabase Storage signed URLs are the planned path. Lemon Squeezy handles both natively if the backup is taken. Either way the customer experience is the same: pay → form (birth date, gender, first name) → PDF emailed + downloadable from their account dashboard.

---

## 4. Website sitemap

### Top navigation

```
[Logo]   Start Here   Kua Calculator   Guide   Rooms   Life Areas   Products   Articles   Account
```

The current nav has "Life pillars" and "Space" - those are *Life Areas* and *Rooms* in the public-facing wording. The dropdown structures stay.

New items vs current:
- **Start Here** (new) - a single-page reader on-ramp
- **Guide** (new) - the structured 22-chapter ultimate guide, replaces the current single `/methodology` page
- **Products** (new) - the paid product shelf
- **Articles** moves from a top-level item to live alongside the Guide; both link from the same nav slot or are merged. Decision below.

There is **no "Consultations" nav item**. The platform is digital-product-only - no service delivery, no one-on-one bookings.

### Route structure

| Route | Purpose | Status |
|---|---|---|
| `/` | Homepage. Hero, "what feng shui is", free tools, products section, FAQ, footer. | Exists. Needs updates per §9. |
| `/start-here` | New. One-page on-ramp for a first-time visitor. "If you have 30 seconds / 5 minutes / an hour / a Saturday afternoon..." Each tier links to the right next step. | **NEW** |
| `/kua-calculator` | Free Kua calculator. | Exists, no change. |
| `/guide` | Index of the 22-chapter ultimate guide, organised by cluster (see §5). | **NEW** |
| `/guide/[topic]` | A single guide article (a chapter or a focused excerpt). | **NEW** |
| `/articles` | Index of shorter articles + lead magnets. Keep distinct from `/guide` to separate "structured guide" from "topical articles". | Exists. Add organising. |
| `/articles/[slug]` | A single article. | Exists. |
| `/life` | Nine life-area index. | Exists. |
| `/life/[area]` | One life area + relevant articles + relevant product CTA. | Exists. Update CTAs per §9. |
| `/space` | Twelve rooms index. | Exists. |
| `/space/[room]` | One room + relevant articles + relevant product CTA. | Exists. Update CTAs. |
| `/products` | The shop. Grid of product cards with prices, short descriptions, "Buy" CTAs (via BuyButton component). | **NEW** |
| `/products/personal-feng-shui-compass` | Foundation product landing page. | Exists at `/home-harmony-map`, will move/redirect. |
| `/products/annual-feng-shui-planner-2026` | 2026 planner landing page. | **NEW** (the planner project has a sales-strategy doc to draw from). |
| `/products/move-in-kit` | Move-In Date Selection + Activation Kit landing. | **NEW** stub. |
| `/products/bedroom-reset` | Bedroom & Relationship Reset landing. | **NEW** stub. |
| `/products/business-money-feng-shui` | Business & Money landing. | **NEW** stub. |
| `/products/healthy-home-audit` | Healthy Home Audit landing. | **NEW** stub. |
| `/products/email-course` | Future. A paid 7-day email course on a focused topic (a personalised reset, an annual deep-dive, etc.). Placeholder for scalable course-style digital products. | **NEW** stub (future). |
| `/account` | User dashboard (sign-in gated). Saved charts, My Compasses, downloads. | Exists. Add product-deliveries list. |
| `/methodology` | The current Compass School deep-dive page. **Decision**: redirect to `/guide/compass-school` once the Guide ships, so there is one canonical location. | Exists, redirect later. |
| `/home-harmony-map` | Legacy sales route. Redirect 301 to `/products/personal-feng-shui-compass` when the new product page ships. | Exists, redirect later. |
| `/checklist` | Lead magnet printable. | Exists, no change. |

### Articles vs Guide - the distinction

`/guide` is **structured, evergreen, definitional** content (the 22 chapters, organised in clusters). It is the encyclopedia.

`/articles` is **topical, searchable, sometimes time-sensitive** content (the existing twelve myths, the five-minute weekend changes, etc.). It is the magazine.

Both feed the same paid product funnel. They live under different routes because they answer different reader needs: "explain feng shui" vs "tell me about X".

---

## 5. Ultimate guide article plan

The 22 source chapters map into 14 clusters on `/guide`. Each cluster has 1-4 web articles. Cluster pages live at `/guide/[cluster-slug]`; individual articles can live at `/guide/[cluster-slug]/[article-slug]` or, for the simpler clusters, the cluster page IS the article.

Format per article: **title** | source chapter | free or gated | linked CTA.

### Cluster 1 - Foundations
Source: `01-foundations.md`.

| Article | Source | Access | CTA |
|---|---|---|---|
| What feng shui actually is (and is not) | 01 | Free | Calculator |
| Yin, yang, and qi - the three ideas under everything | 01 | Free | Calculator |
| The honest history of feng shui in 1,000 years | 01 | Free | Compass |

### Cluster 2 - Five Elements
Source: `02-five-elements.md`.

| Article | Source | Access | CTA |
|---|---|---|---|
| The five elements, defined | 02 | Free | Calculator |
| The productive and destructive cycles | 02 | Free | Calculator |
| Colour, shape, season - the element families in your home | 02 | Free | Compass |

### Cluster 3 - The Bagua
Source: `03-bagua.md`.

| Article | Source | Access | CTA |
|---|---|---|---|
| The bagua map: nine sectors, nine life areas | 03 | Free | Calculator |
| How to overlay the bagua on your floor plan | 03 | Free | Compass |
| What each bagua sector traditionally governs | 03 | Free | Life-area pages |

### Cluster 4 - The Four Schools
Source: `04-schools-overview.md`, `05-form-school.md`, `08-btb-western.md`.

| Article | Source | Access | CTA |
|---|---|---|---|
| The four schools of feng shui, explained | 04 | Free | Calculator |
| Form School - reading land, water, and your front door | 05 | Free | Compass |
| Western (BTB) feng shui vs Classical - what we teach and why | 08 | Free | Calculator |

### Cluster 5 - Compass School and Your Kua
Source: `06-compass-school.md`. This is the most-trafficked cluster (the calculator funnels here).

| Article | Source | Access | CTA |
|---|---|---|---|
| The Compass School and the luopan | 06 | Free | Calculator |
| How to find your Kua number | 06 | Free | Calculator |
| East group, West group - what each really means | 06 | Free | Compass |
| Your eight personal directions, traditionally | 06 | Free | Compass |
| The Eight Mansions system in everyday use | 06 | Free | Compass |

### Cluster 6 - Flying Stars and Annual Energy
Source: `07-flying-stars.md`. The product gateway to the **Annual Planner**.

| Article | Source | Access | CTA |
|---|---|---|---|
| Flying Stars, defined | 07 | Free | Annual Planner |
| Period 9 (2024-2043) and what it means for your home | 07 | Free | Annual Planner |
| Annual Stars - why every year reshapes your home | 07 | Free | Annual Planner |
| The 5 Yellow and 2 Black: the two stars worth knowing | 07 | Free | Annual Planner |
| Tai Sui and the Three Killings - the directions to leave undisturbed | 07 | Free | Annual Planner |

### Cluster 7 - Room by Room
Source: `10-room-by-room.md`. Crosses with `/space/[room]`.

| Article | Source | Access | CTA |
|---|---|---|---|
| Room-by-room feng shui: the principles that travel | 10 | Free | Compass |
| The bedroom, in feng shui terms | 10 | Free | Bedroom Reset (when ready) |
| The kitchen, in feng shui terms | 10 | Free | Money Kit |
| The living room, dining room, bathroom | 10 | Free | Compass |
| The office and work-from-home setup | 10 | Free | Compass |
| The entrance - your home's first six metres | 10 | Free | Compass |

### Cluster 8 - Cures, Symbols, Crystals
Source: `09-cures-and-symbols.md`, `16-crystals.md`. Keep gentle - this is the cluster most prone to magazine-mysticism, so honest framing is doubly important.

| Article | Source | Access | CTA |
|---|---|---|---|
| Feng shui cures, defined honestly | 09 | Free | Calculator |
| Mirrors, plants, water features, wind chimes - what each actually does | 09 | Free | Compass |
| Crystals in feng shui - tradition vs evidence | 16 | Free | Compass |
| The cures we recommend, the cures we do not | 09, 16 | Free | Compass |

### Cluster 9 - Money and Wealth
Source: `18-money-and-wealth.md`. The gateway to the **Business and Money Feng Shui Kit** product.

| Article | Source | Access | CTA |
|---|---|---|---|
| Feng shui for money - the honest version | 18 | Free | Money Kit |
| Your wealth corner: how to find it | 18 | Free | Compass |
| The kitchen stove and the money channel | 18 | Free | Money Kit |
| The wallet, the wealth altar, the daily money practice | 18 | Gated (free account) | Money Kit |

### Cluster 10 - Bedroom and Relationships
Source: `19-bedroom-and-relationships.md`. Gateway to the **Bedroom & Relationship Reset** product.

| Article | Source | Access | CTA |
|---|---|---|---|
| The bedroom is the most important room in feng shui | 19 | Free | Bedroom Reset |
| The command position, the bed, the headboard | 19 | Free | Bedroom Reset |
| Mirrors in the bedroom - the rule and the exception | 19 | Free | Bedroom Reset |
| Feng shui for couples - the East/West conversation | 19 | Free | Compass |
| Single readers - how to prepare a room for someone who has not arrived | 19 | Free | Compass |

### Cluster 11 - Healthy Home
Source: `20-healthy-home.md`. Gateway to the **Healthy Home Audit** product.

| Article | Source | Access | CTA |
|---|---|---|---|
| The healthy home - what feng shui and modern design science agree on | 20 | Free | Healthy Home Audit |
| Air, light, clutter, sleep - the four levers | 20 | Free | Healthy Home Audit |
| EMF, geopathic stress, radiesthesia - what to take seriously | 20 | Free | Healthy Home Audit |

### Cluster 12 - Rituals and Space Clearing
Source: `17-laws-and-ritual.md`.

| Article | Source | Access | CTA |
|---|---|---|---|
| The daily ritual practice - morning, day, evening | 17 | Free | Compass |
| Space clearing - salt water, sound, scent | 17 | Free | Compass |
| The 20 Universal Laws (a structural reading) | 17 | Free | Compass |

### Cluster 13 - BaZi and Sister Disciplines
Source: `13-bazi-intro.md`, `14-bazi-ten-gods.md`, `15-qi-men-dun-jia.md`. **Framed explicitly as "not feng shui"** - sister disciplines. Possible future product line.

| Article | Source | Access | CTA |
|---|---|---|---|
| BaZi - the Four Pillars of Destiny in one page | 13 | Free | (future BaZi product) |
| The Ten Gods, in everyday English | 14 | Free | (future) |
| What Qi Men Dun Jia is, and why it is not feng shui | 15 | Free | (future) |

### Cluster 14 - Diagnostic Walkthrough + Myths + Glossary
Source: `21-diagnostic-walkthrough.md`, `11-myths-and-quick-wins.md`, `12-glossary.md`. The structural backbone of the site.

| Article | Source | Access | CTA |
|---|---|---|---|
| The seven-step home walkthrough (practitioner method) | 21 | Gated (free account) | Compass |
| Twelve feng shui myths and what is actually true | 11 | Free | Compass |
| Twenty-six free changes you can make this weekend | 11 | Free | Calculator |
| Glossary of feng shui terms | 12 | Free | Calculator |

### Article-plan summary

- **~50 articles** across 14 clusters.
- ~85% free, ~15% gated behind a free account (to capture email).
- Every cluster has a single dominant product CTA, so a reader who finishes the cluster has a natural next step.
- Source attribution is preserved in each article footer (cross-referencing the chapter and the source ledger), but the body uses the **practitioner voice** (see §8). The reader feels guided, not lectured.

### Launch order for the guide
1. Cluster 5 (Compass School and Your Kua) - the calculator funnels here, biggest immediate win.
2. Cluster 6 (Flying Stars and Annual Energy) - opens the 2026 Planner funnel.
3. Cluster 10 (Bedroom and Relationships) - biggest organic search volume.
4. Cluster 9 (Money and Wealth) - second-biggest search volume.
5. Cluster 7 (Room by Room) - feeds `/space/[room]` pages.
6. Cluster 2 (Five Elements) - cross-references everything else.
7. Cluster 3 (Bagua), Cluster 1 (Foundations), Cluster 4 (Schools) - the structural triplet.
8. Clusters 8, 11, 12, 14 (cures, healthy home, rituals, glossary).
9. Cluster 13 (BaZi sister disciplines) - last, optional, future revenue.

---

## 6. Product roadmap

| # | Product | Buyer | Promise | Deliverable | Price band | Inputs | Landing page | Status |
|---|---|---|---|---|---|---|---|---|
| 1 | **Free Kua Calculator** | Curious reader | Free, accurate Kua + 8 directions in 10 seconds | Live calculator result + saveable chart | Free | Birth year + gender | `/kua-calculator` | **LIVE** |
| 2 | **Personal Feng Shui Compass** | Reader who liked the calculator | Personalised 25-30 page PDF reading their Kua + 8 directions in depth | PDF + email + account download | $14 | Birth date + gender + first name (CNY-aware) | `/products/personal-feng-shui-compass` (move from `/home-harmony-map`) | **Built, awaiting Stripe** |
| 3 | **2026 Annual Feng Shui Planner** | Reader who wants the year ahead | A printable annual planner with the 2026 chart, monthly stars, daily calendar, sector treatments | PDF + email | $29-39 | None (everyone uses the same 2026 chart) | `/products/annual-feng-shui-planner-2026` | **In progress** (separate project) |
| 4 | **Move-In Date Selection + Activation Kit** | Someone about to move house or renovate | The traditional way to pick a move-in date for the year + a home-blessing/activation checklist | PDF + maybe a small per-date table | $19-29 | Move-in window + customer's Kua | `/products/move-in-kit` | **Stub** - design after #2/#3 ship |
| 5 | **Bedroom & Relationship Reset** | Couple or single reader focused on the bedroom | A focused PDF reading the bedroom for their Kua (or for a couple), with the full bedroom checklist | PDF | $14-19 | Kua(s) | `/products/bedroom-reset` | **Stub** |
| 6 | **Business & Money Feng Shui Kit** | Small-business owner / freelancer | Reading the office, the stove (if home-based), the wealth corner, the desk position | PDF | $19-29 | Kua + room context | `/products/business-money-feng-shui` | **Stub** |
| 7 | **Healthy Home Audit** | Reader focused on wellness / sleep / EMF | A practitioner-voice walkthrough mapping the home for healthy-home factors keyed to their Kua | PDF | $19-29 | Kua + brief questionnaire | `/products/healthy-home-audit` | **Stub** |
| 8 | **2027 Annual Planner** | Renewing planner buyer | Next year's planner | PDF | $29-39 | None | `/products/annual-feng-shui-planner-2027` | **Future** (autumn 2026 launch) |
| 9 | **Personalised Kua Report (deeper / longer)** | Buyer who already owns the Compass and wants more | A second-tier personalised PDF reading the Kua against more inputs (full floor-plan questionnaire, partner Kua, current room layouts) | PDF | $39-59 | Extended questionnaire + Kua(s) | `/products/personal-kua-report` | **Future** scalable digital |
| 10 | **Paid email course** (7-day reset, 30-day deep dive) | Buyer who wants structured guidance over time | A drip-delivered email course on a focused topic. Fully automated via Resend. | Email sequence + printables | $19-29 | None / opt-in | `/products/email-course` | **Future** scalable digital |
| 11 | **Printable workbook bundles** | Reader who wants something to write in | A pack of printable PDF worksheets for an annual reset, a moving-house process, a relationship review | PDF | $9-19 | None | `/products/workbook-bundle` | **Future** scalable digital |
| 12 | **Interactive tools** (free or low-priced) | Casual visitor | Free or near-free in-browser tools: a year-against-your-Kua quick lookup, a Three Killings sector finder, a Tai Sui locator | Web tool | Free / $3-9 | Kua or year | `/tools/...` | **Future** scalable digital |

### Product line design rules

- Every product is **self-contained**. A customer buying product 5 (Bedroom Reset) is not penalised for not buying product 2 (Compass). Each lands on its own.
- Every product **honestly framed**. No outcome promises. No "this will bring you wealth." The product gives the customer a structured way to decide what to do in their room.
- **Reuse the engine**. The block-library + recipe pattern in `lib/products.ts` + `lib/blocks.ts` already supports modular composition. New products are mostly new content blocks + a new recipe entry. The render pipeline does not change.
- **One product, one focused promise**. We do not ship a "everything" $99 bundle until 3-4 individual products are stable.

---

## 7. Funnel architecture

```
                  [Organic search / referral / homepage]
                                 │
        ┌────────────────────────┼────────────────────────┐
        ▼                        ▼                        ▼
   /articles               /kua-calculator           /guide
   /life/[area]                  │                  /life
   /space/[room]                 │                  /space
        │                        │                        │
        │                        ▼                        │
        │             [Save chart - free account]         │
        │                        │                        │
        ▼                        ▼                        ▼
   [Lead magnet:               [Email opt-in]      [Product CTA in
   14-point checklist          on save              cluster page]
   email capture]
        │                        │                        │
        └────────┬───────────────┴────────────────┬───────┘
                 ▼                                ▼
        [Welcome email                  [Product page]
         sequence: 3-5 emails           /products/[slug]
         delivers value, ends           │
         on a soft product CTA]         ▼
                 │                  [Buy / Waitlist via BuyButton]
                 │                        │
                 └────────┬───────────────┘
                          ▼
                   [Post-purchase form:
                    name + birth date +
                    gender; CNY applied]
                          ▼
                   [PDF generated, emailed,
                    stored in account]
                          ▼
                   [Customer dashboard:
                    My Compasses,
                    redownload, re-send]
                          ▼
                   [Renewal / cross-sell:
                    Annual Planner buyer →
                    2027; Kua user → another
                    Compass module]
```

### The five core funnels

1. **Article → Calculator → Compass.** The 80% case. Reader lands on a free article about (say) the wealth corner, hits the Kua calculator, saves the chart, sees the Compass CTA, buys.
2. **Article → Annual Planner.** A reader on a Flying Stars article hits the planner CTA. Independent of the Kua flow (Annual Planner does not need their birth data).
3. **Life-area page → Relevant product.** `/life/love` → Bedroom Reset. `/life/money` → Money Kit.
4. **Room page → Relevant product.** `/space/bedroom` → Bedroom Reset. `/space/kitchen` → Money Kit (the kitchen-as-wealth-channel reading).
5. **Email list → Email sequence → Product.** The lead magnet captures the email; a 5-email welcome sequence delivers value (a free chapter, a free worksheet, a free week of moves), ending with a soft CTA to the most appropriate product.

### Renewal and cross-sell

- **Annual Planner buyer** → emailed in October 2026 for the 2027 planner. Repeat yearly.
- **Compass buyer** → emailed when a relevant module ships (Bedroom Reset / Money Kit / Healthy Home).
- **Save-chart user** (free account, no purchase yet) → drip campaign with the lead magnet → Compass.

---

## 8. Content and voice strategy

### Two voices, used together on landing pages and split everywhere else

**Voice A: `voice-storytelling-copy`** (warm sensory narrative).
- Gets the reader inside a scene. Opens with a kettle, a chair, a window. Earns trust through sensory specificity.
- Best for: the *opening* of any landing page, homepage hero copy, the Welcome block of a paid PDF, lead-magnet emails, the emotional pull at the top of a sales page.

**Voice B: `feng-shui-practitioner-voice`** (calm expert action-led).
- Turns reading into action. Six-section template (What this means / Do this / Avoid this / Practitioner tip / Real home example / If you only do one thing). Easy enough for a 15-year-old to read aloud.
- Best for: telling the reader exactly what to do in their actual home. Practical bullets, room walkthroughs, monthly notes, sector treatments.

### Landing pages: use BOTH

Every product landing page (homepage included, where applicable) is structured as:

1. **Opening (storytelling-copy).** A sensory, narrative opener that pulls the reader in. The kettle, the chair, the morning, the room. One or two paragraphs.
2. **What you get (practitioner-voice).** A clean, concrete list of what is inside the product. Bullets in practitioner-voice register: "You get X. You learn Y. You will be told exactly Z."
3. **How it works (practitioner-voice).** The step-by-step the reader experiences. "First we ask your birth date. Then we generate. Then we deliver." Numbered or bulleted.
4. **What to do with it (practitioner-voice).** A short "if you only do one thing" section pointing at the highest-leverage action.
5. **Honest framing (storytelling-copy).** A short calm paragraph closing the loop on what the product does not promise. Returns the reader to the warmer register before the CTA.
6. **Price + CTA.** Plain.

The opening and the closing use the warmer storytelling voice; the practical middle uses the practitioner voice. The reader feels invited at the top, told the truth in the middle, invited again at the bottom.

### Guide articles and product content: practitioner-voice as primary

All `/guide` articles, all product *content* (Compass chapters from the directions onward, Planner sections, future product PDFs), `/life/[area]`, `/space/[room]` use **practitioner-voice as the primary skill**. The reader should feel guided by a warm expert walking through their home with them, not by a research summary.

A short sensory opener using storytelling-copy is acceptable at the top of a long article (one paragraph, one scene). Everything practical that follows is practitioner-voice.

### The hard rules across both voices

- No em dashes.
- No outcome promises.
- No "in plain English" or "plainly" (the brand-wide ban already in `voice-storytelling-copy.md`).
- Honest framing every line: "traditionally associated with," "the tradition treats this as," "supports the conditions for."
- The brand competes on being the *least* mystical feng shui site on the open web that still respects the tradition.

---

## 9. What to change now (concrete website fixes)

These are scoped, code-light edits we can ship before live payments switch on. Each is a small commit.

### 9.1 Copy cleanup (mostly done, finish the long tail)

- ✅ Remove "Home Harmony Map" and "$29" from visible copy (already done across most files in the safety pass).
- 🟡 Sweep the homepage for any remaining "our one paid product" / "only paid item" phrasing - the homepage FAQ already reads "the Personal Feng Shui Compass, our personalised guide" but verify the line above ("If the calculator and the methodology page are free...") still reads correctly.
- 🟡 Drop the existing homepage "It costs nothing to start." line if it slightly oversells the calculator vs the paid path.

### 9.2 Add `/products` shelf (NEW, no live payments)

- New route `app/(site)/products/page.tsx`. Grid of product cards (Free Calculator, Compass, 2026 Planner, Move-In Kit, Bedroom Reset, Business & Money Kit, Healthy Home Audit, 2027 Planner placeholder, Personalised Kua Report placeholder, Paid email course placeholder).
- Each card shows: product name, one-sentence promise, price (or "Free" / "Waitlist"), and a CTA via the BuyButton component (`state="waitlist"` for all paid items until Stripe is live).
- Include "Coming soon" badge for products in stub state.

### 9.3 Build the BuyButton component (NEW)

- `components/BuyButton.tsx` with the contract in §3.
- Initial implementation supports `state="waitlist"` (renders the existing lead-magnet email-capture form, points it at the product slug so we know which product a captured email is interested in) and `state="stripe-test"` (renders "Buy now" + POSTs to `/api/checkout`).
- Each product in `lib/products.ts` gets a `paymentState` field. All paid products start at `"waitlist"`.

### 9.4 Move the foundation product page (NEW)

- Build `app/(site)/products/personal-feng-shui-compass/page.tsx` using the content from the current `/home-harmony-map` page.
- Add a 301 redirect from `/home-harmony-map` to `/products/personal-feng-shui-compass` in `next.config.ts`.
- Update internal links (life-area pages, space-room pages, articles) to the new route.

### 9.5 Add the 2026 Planner product page (NEW)

- Build `app/(site)/products/annual-feng-shui-planner-2026/page.tsx` drawing on the planner project's `website-sales-strategy.md`.
- Include the BuyButton component in `state="waitlist"` initially.
- Add to `/products` shelf.

### 9.6 Add the 4 stub product pages (NEW)

- `app/(site)/products/move-in-kit/page.tsx`
- `app/(site)/products/bedroom-reset/page.tsx`
- `app/(site)/products/business-money-feng-shui/page.tsx`
- `app/(site)/products/healthy-home-audit/page.tsx`
- Each is a short "coming soon" page with the promise, the buyer, and a waitlist BuyButton.
- All four go on the `/products` shelf.

### 9.7 Build `/start-here` page (NEW)

- A single page that branches the reader by available time / appetite. "I have 30 seconds" → calculator. "I have 5 minutes" → the 14-point checklist. "I have an hour" → diagnostic walkthrough. "I have a Saturday" → ultimate guide.

### 9.8 Build `/guide` index page (NEW)

- Cluster grid. Each cluster card → one cluster page.
- Cluster pages render the article list for that cluster.
- Individual `/guide/[topic]` articles use `lib/markdown.ts` like the existing article system.

### 9.9 Strengthen post-calculator CTAs

- After a user calculates their Kua (signed-in or not), show the Compass CTA more prominently below the result card.
- For signed-in users who have saved a chart, add a "Get my Personal Feng Shui Compass for this chart" CTA in the chart-view page.

### 9.10 Update the homepage

- The hero stays.
- The "What feng shui actually is" section stays.
- The "By room" and "By life area" sections stay (they are working funnels).
- The product offer section gets retitled to "Our paid products" (plural) with a shelf-style grid linking to `/products`.
- The single product spotlight (currently Personal Feng Shui Compass) stays at the top of that shelf.
- The FAQ keeps the Personal Feng Shui Compass Q&A and gains one Q about the Annual Planner.

### 9.11 Update top navigation

- Add **Products** to the top nav between **Space** (rooms) and **Calculator**.
- Add **Start Here** as the leftmost nav item.
- Add **Guide** between **Articles** and the rooms/life-areas dropdowns once `/guide` exists; until then, keep the current nav.

### 9.12 First-pass content of the guide

- Write the **Cluster 5 (Compass School and Your Kua)** articles first. ~5 articles, all sourced from chapter 06. These deepen the post-calculator funnel and lift SEO.
- Schedule the rest by the launch order in §5.

### What we are NOT doing in this batch

- Not wiring live Stripe.
- Not building the post-checkout form yet.
- Not setting up email delivery for paid PDFs.
- Not setting up tax.
- Not building any service-delivery or booking system. (The platform is digital-product-only by design.)

---

## 10. What to defer (until live Stripe + bank account)

| Item | Why deferred | Unblocks when |
|---|---|---|
| Stripe live account activation | Needs the US business bank account | Bank account opens |
| Production `/api/checkout` + `/api/stripe-webhook` wiring | Needs live keys | Bank account opens |
| Post-checkout form (full birth date + CNY) | Wired to the checkout success page | Stripe live |
| Resend email delivery of paid PDFs | Wired to the webhook success | Stripe live |
| Supabase Storage signed-URL downloads | Wired to the post-checkout form | Stripe live |
| Stripe Tax (or Lemon Squeezy fallback) | Decision after first month of real sales | Stripe live (or 30 days in) |
| Final pricing | Lock with real data | First month of real visitor data on the products shelf |
| Automated file delivery / customer portal | Standard Stripe billing portal can be enough | Stripe live |
| Live payment testing | Real card flow on the live site | Stripe live |
| New scalable product types (paid email course infra, deeper personalised report, printable workbook bundles, interactive tools) | Future tier | After foundation products are stable and we have demand-signal data |

---

## 11. Build-now recommended order

If we are limited to one focused build session per week, this is the order that delivers the most reader and brand value before any payment is involved.

| Week | Build | Outcome |
|---|---|---|
| W1 | BuyButton component + `/products` shelf + stub product pages for items 3-7 (Annual Planner, Move-In Kit, Bedroom Reset, Money Kit, Healthy Home Audit) | Reader can see the whole catalogue; waitlist captures real demand signal per product. |
| W2 | `/products/personal-feng-shui-compass` page + 301 from `/home-harmony-map` + homepage product-section retitle | Foundation product properly housed; consistency. |
| W3 | `/products/annual-feng-shui-planner-2026` page (drawing on the planner project's sales strategy) + Annual Planner FAQ + homepage card | Planner has a real home and a real waitlist. |
| W4 | `/start-here` page + nav update | The single most important on-ramp for new visitors. |
| W5 | `/guide` index + Cluster 5 articles (Compass School + Your Kua, 5 articles) | The biggest SEO win and the strongest post-calculator funnel deepening. |
| W6 | `/guide` Cluster 6 articles (Flying Stars + Annual Energy, 5 articles) | Opens the planner funnel from the guide side. |
| W7 | `/guide` Cluster 10 articles (Bedroom + Relationships) | Highest organic search volume. |
| W8 | `/products/email-course` stub + a "Tell us what 7-day reset you would buy" form + `/products/personal-kua-report` stub | Capture demand signal for the next scalable digital product tier. No service delivery. |
| ... | Continue with Clusters 9, 7, 2, 3, 1, 4, 8, 11, 12, 14, 13 in launch order | Free content moat. |

**Parallel track (no week assigned)**: the bank account opens, Stripe goes live, and the deferred items in §10 kick in. The build pivots: the BuyButton state flips per product, the post-checkout form ships, email delivery wires up, the existing PDF render goes live. None of that requires the website strategy to change. The landing pages designed now are the landing pages that sell live products.

---

## 12. Decision triggers

These are the moments that change the plan:

- **Bank account opens** → start the deferred Stripe live wiring next session.
- **Stripe approval drags >60 days** after bank account opens → reconsider Lemon Squeezy seriously. Spec it in two days, ship in a week.
- **Stripe Tax / US digital-goods sales tax becomes a significant time sink** → reconsider Lemon Squeezy (merchant of record, handles all of this).
- **Waitlist sign-ups for product X cross 200** → that product gets prioritised next in the build queue.
- **Compass refund rate >10% in the first 60 days** → pause the build of new products and revise the Compass before continuing.
- **A reader emails asking for "a custom reading" or one-on-one help** → reply with the closest scalable digital product, or take the request as a brief for the next product on the roadmap. We do not pivot to service delivery.

---

## 13. What to share with the team / what to keep internal

**Public** (myfengshuihome.com):
- Everything in §4 (sitemap) once it ships.
- All content in §5 (the guide).
- All product pages in §6 (even the stubs; they capture demand).
- The voice in §8 is invisible to the reader by design.

**Internal** (this document + the project repos):
- §3 (payment architecture) - never on the website.
- §9.x detail per-task - work plan.
- §10 (deferred list) - work plan.
- §12 (decision triggers) - check monthly.

---

## End of document

The document defines what we are building, in what order, with what voice, on what architecture, regardless of which payment provider is live. The next step is owner approval. After approval, week 1 (BuyButton + `/products` shelf + 5 stub product pages) is the first build.
