# Enrichment tracker (2026-07-20, spec v2 APPROVED)

Ralph tracker for the product-enrichment phase. Spec:
architect-2026-07-20-product-enrichment.md (v2). Owner decisions: silent updates
(no Second Edition label), cures stays $9, no buyer emails (none exist yet),
free-update-to-buyers is standing policy for the future. prd.json OFF LIMITS
(8 open MAP tasks). Per task: implement -> render/build verification -> scoped
commit -> one Log line. Practitioner voice + five-point satisfaction standard
govern every task. Zero em dashes, zero outcome promises.

- [x] ENR-001 Ladder core: 8 direction blocks (wandering-star identities, sheng-qi
      micro-applications, fu-wei anchor, wu-gui depth signal), find-your-directions +
      how-to-use (3-reading protocol, room-as-microcosm), faq-hard-cases (+3 answers),
      year-overlay tripled. Test renders: personal + nine-pillars; bands updated.
- [x] ENR-002 house-match NEW block + extended-personal-kua + complete-home recipes +
      flagship comparison row + renders + bands.
- [x] ENR-003 Rooms pass: room-bedroom/desk/dining, space-kitchen/entrance/bathroom/
      hallway/balcony, compatibility. Twelve-spaces render + bands.
- [x] ENR-004 Move-in template: premise lineage, Tai Sui cautions, personal timing.
- [x] ENR-005 Business Kit silent second edition in annual-feng-shui-planner +
      Start-here page + storefront scorecard worksheet + ending card + rebuild.
- [x] ENR-006 home-diagnostic-workbook + (ritual pack if non-padding) + cures
      expanded at $9, each with Start-here + ending card; rebuilds.
- [x] ENR-007 Course day-fit insertions (forms-first, stove/fire-water, doorway audit).
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
- ENR-006 (2026-07-21): all three bundle components deepened at $9, planner
  pipeline rebuilds green. Cures Catalogue 8,230 words / 25 pages: candle
  number-and-colour code, Pa Kua two-logics reconciliation (mechanism vs source
  reading, gentlest-option tiebreak), six new symbol cards (Qilin, dragon-headed
  turtle, money cat honesty card, dragon-phoenix pair rule, prosperity bowl incl.
  the bathroom-in-wealth-sector counterweight, doubling mirrors), the money
  frog's morning/evening working day, numbers-and-shapes reference card,
  catalogue-on-one-card ending. Diagnostic Workbook 6,775 words / 28 pages:
  forms-first governing law up front, sixty-second doorway audit as the first
  win, missing-corner decision kit (proportional test, longer-segment rule,
  additions convention), sha distance heuristic (close-and-straight-on rule).
  Ritual Pack 3,638 words / 13 pages: staged whole-home method (surfaces first,
  one room per session) + clean-then-intention sequencing law. Learning: the
  ritual pack took only what was non-padding; its small size is honest, the
  staging method was the one genuinely missing piece. Owner uploads all three
  rebuilt PDFs at the gate; no kua-calculator code changed in this task.
- ENR-007 (2026-07-21): three day-fit insertions into the Seven-Day Reset course
  (lib/courses/seven-day-reset.ts). Day 3 bed day: the forms-first rule stated
  as a standing law before any furniture advice. Day 5 kitchen day: stove-daily
  habit with burner rotation ("wealth in motion" reading + the mundane half) and
  the renter-safe fire-water buffer for stove-sink standoffs. Day 6 clutter day:
  the sixty-second doorway audit as a keep-forever tool. Build green. Learning:
  the course bodies already carried the mundane-first voice, so each insertion
  needed the tradition's reading AND the practical half in one breath to fit;
  single-paragraph insertions at existing anchors kept every day's one-task
  shape intact.

## ENR-008 experience gate results (2026-07-21)

Five-point standard: orient in 60s / first win tonight / designed peak / one
interactive moment / designed ending. All nine shelf products PASS:

| Product | Orient | First win | Peak | Interactive | Ending |
|---|---|---|---|---|---|
| Personal Compass | at-a-glance page + Start tonight box | Start tonight box | star identities + wealth extension | three-reading protocol + 7-day experiment | closing + keepsake card |
| Twelve Spaces | welcome-mini, per-space one-move shape | bedroom height rules | entrance approach reading | bedroom scorecard + dining doorway method | closing-mini |
| Complete Home | as Personal | Start tonight box | house-match + year method | house-reading worksheet | closing-extended |
| Move-in Kit | Reading your window | pick the window | renovation section | date-window reading | personal-timing close |
| Seven-Day Reset | day 1 orients | day 1 task tonight | day 6 doorway audit | one task per day | day 7 close |
| Nine Pillars | welcome-mini | per-pillar one-moves | wealth pillar | per-pillar moves | closing-mini |
| Business Kit | How to Use + the one line | Start tonight, 5 min | two worked walkthroughs | storefront scorecard | kit on one card |
| Starter Bundle | each component opens with a start card | doorway audit tonight | frog working day + missing-corner kit | worksheets throughout | three designed closings |
| Cures Catalogue | How to read a card | Start tonight corner move | money frog working day | pull-the-card + quick-table | catalogue on one card |

Before/after (words where tracked, measured pages after):

| Product | Words before -> after | Pages after (old band) |
|---|---|---|
| Personal Compass | blocks corpus now 50,282 w | 56 (band was 44-56) |
| Extended Kua Report | +house-match, +year method | 75 (band was 56-70) |
| Nine Pillars | unchanged this phase | 38 (band was 40-66, est.) |
| Twelve Spaces | +9 deepening sections | 47 (band was 50-78, est.) |
| Complete Home | superset of all above | 142 (band was 115-165) |
| Year-Ahead / enriched minis | year-overlay 560 -> ~1,100 w | 9 (band was 4-8) |
| Business Kit | 8,400 -> 10,712 | 42 |
| Cures Catalogue | -> 8,292 | 25 |
| Diagnostic Workbook | -> 6,774 | 28 |
| Ritual Pack | -> 3,684 | 13 |

- ENR-008 (2026-07-21): experience gate passed. Hygiene scans green across every
  touched file (0 em/en dashes by codepoint scan with positive control; 0
  outcome promises, one benign hit). Gap found and closed: cures catalogue and
  ritual pack lacked the up-front first-win card the other statics have; both
  gained a Start tonight card and were rebuilt (25pp / 13pp, counts unchanged).
  Static delivery email's Where-to-start pointer rewritten to match what every
  static PDF now opens with (softened to "first move" because the Planner's is
  "Your first move this week", not tonight). Personalised pointer already
  matched. CLAUDE.md stale Phase-3/home-harmony-map row replaced with a
  Products-layer section pointing at the registries + truth matrix. Page bands
  measured in one dev session (Ana/Kua 8 samples) and recentred in
  lib/products.ts: personal 48-64, extended 64-86, pillars 32-44, spaces 40-54,
  complete 120-164, minis 4-10 (enriched space minis and year-ahead render at
  9pp). Smoke suites + build green. Learning: three of the five old bands were
  estimates that had never seen a measured render; the nine-pillars "regression"
  to 38pp was the estimate being wrong, not content shrinking.
- ENR-009 (2026-07-21): five sample previews re-rendered from enriched content
  into scripts/out/previews (Ana, Kua 8): personal 56pp, extended 75pp, pillars
  38pp, spaces 47pp, complete 142pp, plus a year-ahead sample as band evidence.
  Owner review of imagery stays gated per P5; nothing installed into public/.
