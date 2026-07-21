# Premium Nine Areas - magazine-grade redesign (2026-07-21, APPROVED)

Full plan (design vision, graphics table, 12 Nano Banana Pro prompts, content map,
implementation architecture): the approved plan file of 2026-07-21. Key artefacts
land in-repo as they are built; the prompts file lives at
spec/image-prompts-nine-areas-2026-07-21.md.

Owner decisions: pilot on the Nine Life Areas Compass first (system built to roll
out); photoreal interior imagery; owner generates the 12 images from the prompts
file and reviews each; "tips and tricks for every room" additionally means the
advice base on the feng-shui dashboard, improved from the Phase 9 content.

Scoped brand amendment (this phase): generated-photo plates are allowed inside
PDF products and product marketing only; the site UI stays SVG-only.

Five-lens review findings this fixes: broken page 2 (cover overflow), single-area
intro/closing in a nine-area product, zero graphics, unresolved both-branch Kua
overlays in all nine chapters (the $29 personalisation left as homework).

## Tracker

Per task: implement -> build/render verify -> scoped commit -> one Log line.
Zero em dashes, zero outcome promises, practitioner voice, paraphrase-only with
ATTRIBUTION_BLOCKS.md rows.

- [x] PRM-001 Mechanics: lib/pillar-sectors.ts (PILLAR_TO_SECTOR, PILLAR_META,
      WANDERING_STAR, CHAPTER_PLAN stub), resolveSectorBranches + sector tokens
      in lib/blocks.ts, .cover box-sizing fix, smoke scripts taught markers +
      token stubs.
- [x] PRM-002 SVG: nineAreasMapSvg, sectorMiniMapSvg, sector compass extension.
- [x] PRM-003 Design system: template.ts components + opener injection in
      assembleProductHtml + named-page footers (verify, degrade gracefully).
- [x] PRM-004 Photo pipeline: content/photos/ + lib/pdf/photos.ts fixed-height
      fallback + next.config tracing + folder-budget smoke; prompts file saved.
- [x] PRM-005 welcome-pillars ({{nineAreasMap}} at-a-glance) + closing-pillars +
      BlockId union + recipe swap; keepsake grid fix + gloss.
- [x] PRM-006 Chapters 1-3 (wealth, fame, relationships): verdict panel + branch
      markers + enrichment + tips page + recap + attribution.
- [x] PRM-007 Chapters 4-6 (creativity, helpful-people, career): same; delete the
      false "cannot assume" sentence.
- [x] PRM-008 Chapters 7-9 (knowledge, family, health): same; health neutral
      centre panel, no markers.
- [ ] PRM-009 scripts/smoke-pillars.mjs (8-Kua assertions) + CHAPTER_PLAN fill.
- [ ] PRM-010 Render QA: bands (per-kind mini bands), photos-empty pagination
      check, page-by-page review, brand amendments, push.
- [ ] PRM-011 Advice base (feng-shui project): ADB-1 sweep (+80-120 entries,
      helpful-people category added), ADB-2 by-room views, ADB-3 dashboard tab.

Owner gates: 12 images generated from the prompts file into content/photos/
(product paginates identically without them); sample-PDF review before the
preview-imagery pass.

## Log
- PRM-001+002 (2026-07-21): mechanics + generators landed together (the token
  wiring imports the generators, so separate commits could not both build).
  lib/pillar-sectors.ts carries the sector map, chapter meta, wandering stars
  (verified against ENR-001 block prose), the branch preprocessor, and the
  verdict-panel builder; blocks.ts resolves branches before token substitution
  and exposes 12 sector tokens reading the previously-unsurfaced byCompass.
  nineAreasMapSvg + sectorMiniMapSvg drawn N-up for consistency with every
  existing compass visual. Cover box-sizing fix kills the broken page 2 at the
  root. Both smoke suites now resolve markers both ways and fail loudly on
  unbalanced or unmapped markers; 47 blocks + 23 blocks green, build green.
  Learning: the token regex rejecting # and / means an unresolved marker can
  never be half-substituted - the failure mode is visible text, which smoke
  catches, so the preprocessor needs no defensive parser.
- PRM-004 (2026-07-21): photo pipeline before the design system because the
  opener injection imports it. lib/pdf/photos.ts mirrors the font loader
  (readFileSync -> data URI, warm cache, null on absence); tracing config
  bundles content/photos/*.jpg on all three PDF routes; folder README carries
  the manifest + export settings; smoke-blocks enforces the 2.5MB budget
  (Vercel 4.5MB response ceiling minus the ~1MB text PDF). The 12 prompts
  shipped to spec/image-prompts-nine-areas-2026-07-21.md for the owner.
  Learning: caching null (missing file stays missing per instance) is what
  makes the fallback contract cheap - no per-render fs probing.
- PRM-003 (2026-07-21): the magazine layer landed in template.ts, scoped by
  attribute selector to pillar + pillar-framing blocks so every other product
  keeps its exact look. Components: cover photo plate (fixed height either
  way), chapter-opener band + kicker + mini-map + verdict chip (injected by
  assembleProductHtml from PILLAR_META, zero markdown churn; numbered kicker
  only in 2+ pillar recipes so single minis stay coherent), verdict panel
  variants, tips grid (CSS grid, not columns), room-in-sector box, renter
  chip, chapter recap card (suppresses the generic end-hairline), standfirst
  via h1+p, ragged-right 152mm measure, pull-quote hairlines, keepsake fixed
  table grid, and nine named-page footers generated from PILLAR_META.
  Typecheck + build green. Footer support verified at first render (PRM-010).
  Learning: injecting the opener in the assembler instead of markdown means
  the nine mini compasses inherit the whole design with no per-file edits.
- PRM-005 (2026-07-21): welcome-pillars opens with the personalised nine-cell
  verdict map as page 2 (the at-a-glance page and the product's designed peak)
  followed by the nine-area welcome with the chapter-rhythm guide;
  closing-pillars is the designed ending: clear-the-Centre-first as rule one,
  then the area that stung, then lean-green/tend-orange, honest close, and the
  Complete Home Compass bridge replacing the old free-calculator downsell.
  BlockId union + recipe swapped for the bundle only; the 22 single-topic
  products keep the correct minis. Keepsake gained the classical-names gloss.
  Smoke 49 blocks green, typecheck + build green. Learning: the map page
  doubles as the reading-order aid, so the welcome prose never has to explain
  navigation - the picture already did.
- PRM-006..008 (2026-07-21): all nine chapters rewritten in one three-writer
  pass (chapters 1268-1607 words -> 2014-2559 words each). Every chapter now
  opens its personal section with the resolved verdict panel and carries only
  the buyer's branch (other branch = one italic footnote); the career
  chapter's false "cannot assume" sentence is gone; the family chapter's
  muddled health-direction paragraph became the clean fixed-sector vs Tian Yi
  two-layer distinction; health keeps the neutral Centre panel with no
  markers. Each chapter gained its fact-package depth (four gates, Period 9
  South era, pair grading, Heaven's Gate, Wenchang, active/passive) plus a
  tips page (5-7 cards, 2-3 renter-safe each) with room-in-sector cases and
  a recap card with a Tonight checkbox. The workflow's verify agents hit the
  session limit, so verification ran in the main loop instead: the 8-Kua
  structural gate (smoke-pillars) green, both block smokes green (49 + 23),
  zero dashes and zero promises by scan, spot-read of pillar-wealth confirmed
  voice and structure. Eleven attribution rows appended. Learning: the
  structural gate written BEFORE the writers ran is what made the lost verify
  stage a non-event - acceptance criteria in code beat acceptance criteria in
  agents.
