# Enrichment tracker (2026-07-20, spec v2 APPROVED)

Ralph tracker for the product-enrichment phase. Spec:
architect-2026-07-20-product-enrichment.md (v2). Owner decisions: silent updates
(no Second Edition label), cures stays $9, no buyer emails (none exist yet),
free-update-to-buyers is standing policy for the future. prd.json OFF LIMITS
(8 open MAP tasks). Per task: implement -> render/build verification -> scoped
commit -> one Log line. Practitioner voice + five-point satisfaction standard
govern every task. Zero em dashes, zero outcome promises.

- [ ] ENR-001 Ladder core: 8 direction blocks (wandering-star identities, sheng-qi
      micro-applications, fu-wei anchor, wu-gui depth signal), find-your-directions +
      how-to-use (3-reading protocol, room-as-microcosm), faq-hard-cases (+3 answers),
      year-overlay tripled. Test renders: personal + nine-pillars; bands updated.
- [ ] ENR-002 house-match NEW block + extended-personal-kua + complete-home recipes +
      flagship comparison row + renders + bands.
- [ ] ENR-003 Rooms pass: room-bedroom/desk/dining, space-kitchen/entrance/bathroom/
      hallway/balcony, compatibility. Twelve-spaces render + bands.
- [ ] ENR-004 Move-in template: premise lineage, Tai Sui cautions, personal timing.
- [ ] ENR-005 Business Kit silent second edition in annual-feng-shui-planner +
      Start-here page + storefront scorecard worksheet + ending card + rebuild.
- [ ] ENR-006 home-diagnostic-workbook + (ritual pack if non-padding) + cures
      expanded at $9, each with Start-here + ending card; rebuilds.
- [ ] ENR-007 Course day-fit insertions (forms-first, stove/fire-water, doorway audit).
- [ ] ENR-008 Experience gate: five-point test x9, delivery-email pointer alignment,
      hygiene scripts, before/after table, CLAUDE.md products fix.
- [ ] ENR-009 Preview refresh: re-render the five sample PDFs from enriched content
      into scripts/out/previews for the owner's imagery review.

## Log
- ENR-001 (2026-07-20): 8 direction blocks gained their wandering-star identities
  (script-inserted before the post-What-this-means heading, loud-fail anchors);
  sheng-qi gained The wealth extension section (quadrant entry, desk-in-quadrant,
  room-as-microcosm named); find-your-directions gained the three-reading field
  protocol; how-to-use's January wrinkle now states the CNY-vs-Li-Chun boundary
  honestly (this product computes by CNY, verified in lib/cny.ts); faq-hard-cases
  gained three cases (January births, southern hemisphere, calculator variants);
  year-overlay rewritten 560 -> ~1100 words as a method chapter (nine labels,
  amplification rule, follow-the-good-visitors, still points, February habit) and
  gained its missing one-thing closer. Smoke tests green. Bands measured at the
  ENR-008 gate with one dev-server session for all renders. Learning: the Li Chun
  fact-check against lib/cny.ts caught a would-be honesty bug: the library teaches
  the solar boundary but the product computes lunar CNY; the copy now states OUR
  convention instead of parroting the library's.
- ENR-002 (2026-07-20): NEW house-match block (~1000 words, practitioner voice,
  house-reading worksheet, one-thing closer) inserted after jue-ming in both the
  extended-personal-kua and complete-home recipes; flagship comparison table gains
  the House Trigram match row (flagship-only tick). Smoke tests + site build green.
  Learning: the loud-fail insertion script caught the CRLF anchor mismatch
  immediately; recipe edits went through the Edit tool instead, which is now the
  standing rule for TS files in this repo.
- ENR-004 part 1 (2026-07-21): move-in template gains its premise with lineage
  backing (move-in-date school, Yap Cheng Hai line: new occupants = new chart,
  making the founding-date framing the product's own reason to exist) and a new
  "If you are also renovating" section (Tai Sui / Sui Po / San Sha, the
  face-but-never-back rule, exposure-scales-with-activity, and the before-Li-Chun
  January workaround), pointing to the Planner for the year's positions. Build
  green. The ch22 personal-timing counsel waits for the rooms-pass fact sheet
  before the final line is written.
- ENR-003 (2026-07-21): nine blocks enriched as appended deepening sections (the
  older-generation room/space blocks carry no one-thing anchor, so end-append with
  written transitions was the safe insertion). Bedroom gained the room-shape
  scorecard + qi-lane; desk gained the four-fault clinic; dining gained the
  doorway small-bagua method; kitchen the Heaven's Gate + burner rotation;
  entrance the five approach cues + landing-as-Ming-Tang; bathroom the
  containment-vs-red divergence; hallway the staircase file + leaky-wallet
  treads; balcony the four-part garden recipe; compatibility three couple
  refinements. Both smoke suites green (a transient double-run crash earlier
  resolved on rerun). Twelve-spaces band measured at the gate.
- ENR-004 complete (2026-07-21): the ch22 personal-timing counsel landed as the
  closing paragraph of the renovation section (calendar is half the timing;
  disturbed-ground counsel). Build green. ENR-004 done.
- ENR-005 (2026-07-21): the Business Kit gained its true business half, ~2300 new
  words across ten sections (five reversals, site selection + negative neighbours,
  storefront Ming Tang, serpentine path + White-Tiger-in/Dragon-out, the register
  five rules, office floor incl. the reception back-to-door fault, four-gates
  water at owner level, both worked walkthroughs, timing counsel, storefront
  scorecard worksheet) plus the start-tonight card up front and the kit-on-one-
  card ending. 8.4k -> 10.7k words; PDF rebuilt 42 pages via the planner
  pipeline; page-30 render spot-checked (typography + brand rules clean). Silent
  update per owner decision. Owner uploads the rebuilt PDF at the gate.
