# Stage 4.5 - Content expansion + landing-page redesign

Date: 2026-05-25
Status: APPROVED 2026-05-25 - execute in one Ralph batch.

## Context

Stage 4 shipped: homepage, article system (3 articles), lead magnet, sales page stub. Owner feedback:
1. Quantity of content is too low - we have 22 audited chapters in `projects/feng-shui/` (~75,000 words) sitting unused.
2. Every page should "look like a landing page" - designed for conversion, not just informing.
3. The sales page's price-at-the-top is wrong - the owner's instinct was right, the marketing-psychology Anchoring Effect confirms it.

The plan below acts on all three.

## Decisions confirmed with the owner (2026-05-25)

1. **Batch size**: 8 articles - the 5 SEO leads + 3 skeptic-killers.
2. **Sales page**: lead with value, price after social proof.
3. **Article system upgrade**: categories + related-articles widget + per-article OG images.
4. **Homepage**: bigger rework - replace the diagnostic teaser section with a category-card grid.

## The 8 articles

All free, all public, all designed as SEO entry points or objection-killers.

**The 5 SEO lead articles** (search-intent driven):
1. **"What Is Feng Shui, Really? A Skeptic-Friendly Primer"** - ch00, ch01, ch11 - ~2000 words - category: foundations
2. **"26 Feng Shui Changes You Can Make This Weekend"** - ch11 - ~2000 words - category: room-by-room
3. **"The Bagua Map: Where Is Your Wealth Corner?"** - ch03 - ~1400 words - category: bagua
4. **"Why Your Kitchen Stove Matters for Money"** - ch10, ch18 - ~1500 words - category: room-by-room
5. **"12 Feng Shui Myths Holding You Back"** - ch11 - ~1800 words - category: methodology

**The 3 skeptic-killers** (trust-building, objection-handling):
6. **"What's the Evidence Behind Feng Shui? An Honest Look"** - ch11, ch20 - ~2200 words - category: methodology
7. **"Feng Shui or Just Good Design? Why Both Are True"** - ch10, ch11, ch20 - ~1600 words - category: methodology
8. **"If You're Skeptical: Five Tests Anyone Can Run This Week"** - ch18, ch19, ch20 - ~1500 words - category: methodology

All free public articles. Voice: short sentences, bold the shift word, italic for emphasis, no em dashes, no outcome promises, Flesch-Kincaid grade 6-7.

## Categories shipped in this batch

- `foundations` - what feng shui actually is, the basics
- `bagua` - the map, the nine sectors, the wealth corner
- `room-by-room` - the practical room guides (kitchen, bedroom, entrance, ...)
- `methodology` - how the practice actually works, what the evidence supports, myths debunked

Future batches will add: `bedroom-and-relationships`, `money-and-wealth`, `compass-school`, `flying-stars`, `sister-disciplines` (BaZi, QMDJ, crystals).

## Sales page redesign (value-first)

Source: `skills/shared/marketing/page-cro.md`, `skills/shared/marketing/marketing-psychology.md`. Canonical sequence for a digital product:

1. **Hero** - headline of transformation + primary CTA (NO price visible)
2. **Trust signals** - process credentials, source citations, the "ten-year-old curriculum" framing
3. **Problem recognition** - 2-3 sentences naming the reader's pain
4. **Core benefits** - 5 bullets in benefit language (not feature language)
5. **How it works** - 3-4 steps reducing perceived complexity
6. **What it is NOT** - honest framing (no subscription, no fortune-telling, no 100-page ebook)
7. **Objection FAQ** - 5-6 questions answering "will it work for me?", "what if I don't like it?", etc.
8. **Price + final CTA** - $29 anchored AFTER all the value
9. **Risk reversal** - "If you don't find it useful, email us and we delete you from the list"
10. **Closing assurance** - one-line "what happens after you join the list"

The price card stays as a sticky element on desktop ONLY from section 8 onward (when the visitor scrolls past the value sections, the price card appears in the right rail).

## Article system upgrades

**Article type extensions** (lib/articles.ts):
- `category: string` - one of the four canonical categories
- `relatedSlugs?: string[]` - manually-curated related articles (defaults to "other articles in the same category" if absent)
- `tags?: string[]` - optional, for future filtering / search

**New routes**:
- `/articles/category/[slug]` - category landing page with header, intro, and list of all articles in that category
- `/api/og/[slug]` - dynamic OG image generator (PNG, 1200x630, branded; reuses the existing Resvg setup)

**New components**:
- `components/RelatedArticles.tsx` - footer widget on `/articles/[slug]` showing 2-3 related articles (computed from `relatedSlugs` if present, else same-category articles)
- `components/InArticleCta.tsx` - inline soft CTA at the foot of every article. Default: "Run the calculator" -> /kua-calculator. Per-article override possible via metadata.

**Homepage rework** (replace section 4 diagnostic teaser):
- New section: "Read more, learn deeper" - 4 category cards (foundations / bagua / room-by-room / methodology), each with the category description and the count of articles. Each card links to its category page.
- The diagnostic walkthrough teaser content moves to its own article (`articles/diagnostic-walkthrough` already exists as the gated article; keep it there).

## Skills loaded

- `skills/shared/SKILL_RALPH_LOOP.md` - drives the build
- `skills/shared/marketing/copywriting.md` - article voice
- `skills/shared/marketing/page-cro.md` - sales page redesign
- `skills/shared/marketing/marketing-psychology.md` - section order on sales page (Anchoring, Reciprocity, Bandwagon, etc.)
- `skills/shared/marketing/ai-seo.md` - article headings + AI snippet extraction
- `skills/shared/marketing/lead-magnets.md` - inline soft CTA design
- `skills/shared/SKILL_UI_UX_PRO_MAX.md` - category card layout, sales page section order

## Per-stage protocol (Ralph)

For each task:
1. Implement to the acceptance criteria.
2. Build clean (`npm run build`).
3. Commit + push (Vercel auto-deploys).
4. Append a learning paragraph to progress.txt at the end of the batch.
5. Mark prd.json entries `passes: true`.

## Task breakdown (Ralph batch)

| ID | Title | Acceptance criteria |
|---|---|---|
| EXPAND-SYS-001 | Article system v2 (categories + related + OG) | lib/articles.ts has `category`, `relatedSlugs?`, `tags?` fields. `/articles/category/[slug]` route renders. RelatedArticles and InArticleCta components built and wired into /articles/[slug]. Existing 3 articles updated with category. |
| EXPAND-OG-001 | Per-article OG image route | `/api/og/[slug]` returns 1200x630 PNG via Resvg, with article title + brand mark + cream bg. Article metadata `openGraph.images` references it. Test on Google rich-results / Facebook debugger. |
| EXPAND-ART-001 | Write the 5 SEO lead articles | Five articles in content/articles/ + five entries in lib/articles.ts. Voice rules followed. Each ~target word count. JSON-LD valid. |
| EXPAND-ART-002 | Write the 3 skeptic-killer articles | Three articles in content/articles/ + three entries in lib/articles.ts. Same voice rules. Each focuses on a specific objection class. |
| EXPAND-HOME-001 | Homepage category-cards section | Replace `home-section diagnostic-teaser` with new `home-section categories-section`. Renders 4 category cards. Card style consistent with `.tool-card`. Each links to /articles/category/[slug]. |
| EXPAND-SALES-001 | Sales page rebuild (value-first) | /home-harmony-map sections in the canonical order: hero (no price) -> trust -> problem -> benefits -> how it works -> what it's not -> objection FAQ -> price + final CTA -> risk reversal -> closing assurance. Price card sticky on desktop only from section 8 onward. |
| EXPAND-SMOKE-001 | Build, prd, progress, commit | npm run build clean. prd.json updated. progress.txt has one paragraph leading with the learning. git commit + push triggers Vercel deploy. |

## Critical files

- `projects/kua-calculator/lib/articles.ts` - the article type + registry
- `projects/kua-calculator/app/(site)/articles/category/[slug]/page.tsx` - new
- `projects/kua-calculator/app/(site)/articles/[slug]/page.tsx` - add RelatedArticles + InArticleCta
- `projects/kua-calculator/app/api/og/[slug]/route.ts` - new
- `projects/kua-calculator/components/RelatedArticles.tsx` - new
- `projects/kua-calculator/components/InArticleCta.tsx` - new
- `projects/kua-calculator/content/articles/*.md` - 8 new articles
- `projects/kua-calculator/app/(site)/page.tsx` - category-cards section replaces diagnostic teaser
- `projects/kua-calculator/app/(site)/home-harmony-map/page.tsx` - full restructure
- `projects/kua-calculator/app/globals.css` - styles for category cards, related articles, in-article CTA, sales page sections

## Verification

End-of-batch smoke test:
1. /articles - shows 11 articles (3 existing + 8 new). Each has its category pill.
2. /articles/category/foundations - lists 1 article. Same for bagua, room-by-room, methodology.
3. Open any article. The footer shows 2-3 related articles. The footer shows the inline CTA.
4. View source on any article page - JSON-LD valid. openGraph.images points at /api/og/[slug].
5. Hit /api/og/[slug] directly - get a 1200x630 branded PNG.
6. / - the homepage's 4th section is now the category cards (not the diagnostic teaser). The diagnostic article is still accessible via /articles/diagnostic-walkthrough.
7. /home-harmony-map - sections in value-first order; price is NOT in the hero; price card appears sticky from the "Price + final CTA" section onward on desktop.
8. /kua-calculator and /account/chart/[id] still work (regression).
