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
- [ ] PRM-003 Design system: template.ts components + opener injection in
      assembleProductHtml + named-page footers (verify, degrade gracefully).
- [ ] PRM-004 Photo pipeline: content/photos/ + lib/pdf/photos.ts fixed-height
      fallback + next.config tracing + folder-budget smoke; prompts file saved.
- [ ] PRM-005 welcome-pillars ({{nineAreasMap}} at-a-glance) + closing-pillars +
      BlockId union + recipe swap; keepsake grid fix + gloss.
- [ ] PRM-006 Chapters 1-3 (wealth, fame, relationships): verdict panel + branch
      markers + enrichment + tips page + recap + attribution.
- [ ] PRM-007 Chapters 4-6 (creativity, helpful-people, career): same; delete the
      false "cannot assume" sentence.
- [ ] PRM-008 Chapters 7-9 (knowledge, family, health): same; health neutral
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
