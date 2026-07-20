# Architect spec - Product enrichment from the Phase 9 library (REWRITE v2)

Date: 2026-07-20 (v2, owner-requested rewrite the same evening)
Status: APPROVED 2026-07-20. Owner decisions: (1) scope approved, autonomous;
(2) NO "Second Edition" label - no buyers yet, update silently; (3) cures stays
$9; (4) NO past-buyer update emails - no buyers exist; the free-update play is
parked as the standing policy for when buyers do exist (noted in
spec/annual-refresh-2027.md territory: any future edition ships free to prior
buyers of that product, announced with a review request). ENR-009 is therefore
DROPPED from this phase; ENR-010 renumbers to ENR-009.
Extends: spec/architect-2026-07-20-conversion-and-products.md (conversion track, shipped)
Upstream: projects/feng-shui/ Phase 9 (23 chapters incl. new ch22 business, 27 new sources, AUDIT-003 PASS; advice base at 355 entries)

## What changed in this rewrite

The v1 draft was a faithful library-coverage plan: it walked all 44 registry products
and mapped new material to each. This v2 keeps its per-product improvement map (the
research holds) but re-aims the whole phase at ONE goal the owner set: **a buyer who
opens any of the nine shelf products is delighted with what they paid for.** Three
consequences:

1. **Effort follows the shelf.** Nine paid products are visible; they get the depth.
   Work on delisted products is cut or deferred unless shared blocks upgrade them for
   free. (v1 spent 2 of 10 tasks on delisted PDFs.)
2. **Experience is designed, not just content added.** v1 grew word counts; v2 adds
   the satisfaction layer: voice, first-five-minutes orientation, peaks and endings,
   one interactive moment per product. More words alone can LOWER satisfaction.
3. **The enrichment becomes a marketing event.** Past buyers get the new editions
   free; the announcement is the most honest broad email this brand can send and the
   single best review generator available. (Endowment + reciprocity, and it is simply
   the right thing to do.)

## The satisfaction standard (governs every task)

A buyer judges the purchase by its best moment and its ending, not its average page
(peak-end rule). So every product must pass this five-point test before it ships:

1. **Orientation in 60 seconds.** Page 1 after the cover answers: what this is, what
   you will be able to do, where to start. (Personalised products already have the
   at-a-glance page; every static PDF gains an equivalent "Start here" page.)
2. **A first win tonight.** One concrete, zero-cost action reachable within five
   minutes of opening (the Start-tonight box exists in personalised products;
   static PDFs gain one on the Start-here page).
3. **A designed peak.** Each product names its one wow moment and the pass must
   strengthen it (see the map: house-match for the flagship, the wandering stars for
   the compasses, the storefront walkthroughs for the business kit).
4. **One interactive moment minimum.** A worksheet, checklist, or fill-in per
   product (IKEA effect: what the reader writes in, the reader values). The
   diagnostic workbook is the model; the others get at least one.
5. **A designed ending.** The last page is a gift, not an index: the keepsake card
   (personalised) or a one-page action-recap card (static), plus the single "if you
   only do one thing" line. The delivery email's where-to-start pointer then matches
   what the PDF actually opens with.

Voice: **SKILL_FENG_SHUI_PRACTITIONER_VOICE** governs all product copy in this pass
("I am walking through your home with you"; one idea per paragraph; every rule
followed by an action; no outcome promises). v1 omitted this; it is the cheapest
single upgrade to perceived quality. Paradox-of-choice rule rides with it: every
chapter closes on ONE recommended move, options live under it.

Print/PDF craft (adapted from SKILL_UI_UX_PRO_MAX): consistent spacing rhythm and
hierarchy tiers, no emoji as structural marks (the SVG mark set instead), labels
(Tested / Traditional / Preference) styled as one consistent token system, contrast
per WCAG on all colored panels, generous write-in space in worksheets.

## The nine shelf products, ranked by enrichment payoff

| # | Product | Price | Payoff from Phase 9 |
|---|---|---|---|
| 1 | Complete Home Compass | $49 | house-match block (the flagship differentiator), all block upgrades, year-overlay method |
| 2 | Personal Feng Shui Compass | $19 | direction octet + wandering-star identities, renter-inclusive framing, FAQ hard cases |
| 3 | Business and Money Kit | $19 | ch22 did not exist when it was written: THE headline static upgrade |
| 4 | Twelve Spaces Compass | $29 | all 8 room/space block upgrades at once |
| 5 | Nine Life Areas Compass | $29 | direction + overlay upgrades, sheng-qi wealth micro-applications |
| 6 | Move-In Date Report | $29 | its own premise now has lineage backing + Tai Sui/renovation cautions |
| 7 | Whole-Home Starter Bundle | $29 | inherits diagnostic-workbook + cures upgrades (both components visible via the bundle) |
| 8 | Cures and Crystals Catalogue | $9 | six new symbols, money-frog ritual, Pa Kua logic reconciled |
| 9 | 7-Day Home Reset | $19 | day-fitting insertions (forms-first, stove-daily, doorway audit) |

Delisted products (bedroom-reset, healthy-home-audit, five-elements-workbook,
starter-deck, bazi-basics): **deferred** to a parking-lot task list, except where a
shared block upgrades them for free. If the owner ever re-lists one, its v1 map row
still applies. The 22 single-topic Compasses inherit block work automatically.

## The per-product improvement map (v1 research, kept)

### Family A - Personalised block products (shared blocks multiply across tiers)

| Block(s) | Current | Improvement from the library |
|---|---|---|
| 8 direction blocks (`sheng-qi`...`jue-ming`) | 719-1091 w, solid | Each gains its wandering-star identity (Tan Lang for Sheng Qi, Po Jun for Jue Ming, etc.) [ch06]: a memorable character per direction and a bridge to annual products. `sheng-qi` gains the wealth-direction micro-applications (enter through the quadrant, desk IN the quadrant, room-as-microcosm) [ch06]: the best renter-usable upgrade in the library. `fu-wei` gains the sitting-quadrant anchor rule. `wu-gui` names Five Ghosts Transport Fortune (named-not-taught) as a depth signal. |
| `find-your-directions`, `how-to-use` | framing | Three-reading measurement protocol + room-as-microcosm rule (your directions exist inside any single room you control) [ch06]: converts every compass product from homeowner-shaped to renter-inclusive. |
| `faq-hard-cases` | framing | Three answers buyers actually hit: January/early-February birthdays (Li Chun boundary, why calculators disagree); southern-hemisphere buyers; "my calculator says a different Kua" (formula variants) [ch06]. |
| NEW block `house-match` | does not exist | THE flagship peak: determine the home's sitting/facing (ranked cues, view-house exception), derive its House Trigram, check the East/West person-house match, what to do on a mismatch [ch06]. Personalisable with existing tokens. Slots into `extended-personal-kua` and `complete-home` recipes; one recipe edit each, no assembler change. |
| `year-overlay` | 560 w, thin | Triple with method (2026 data stays in the Planner): life-domain star labels, active/passive amplification, star-to-goal overlay, afflictions at concept level [ch07]. |
| `room-bedroom` (787 w) | lightest premium room | Room-shape verdicts + door-axis qi-lane reframing + nightstand-height rule + foot-of-bed anchor [ch19]. |
| `room-desk` (698 w) | light | Desk diagnostics from ch22 (back-to-window/mirror, overhead-light pressure, open-plan screening) + positive template. |
| `room-dining` (557 w) | thinnest | Dining small-bagua worked example in second person + window-leak fix + contrary-shape honesty note [ch10]. |
| `space-kitchen` / `space-entrance` / `space-bathroom` / `space-hallway` / `space-balcony` | good | Heaven's Gate NW-stove note + stove-in-daily-use; approach-reads-first + Ming Tang at threshold scale; colour-containment + red-bathroom divergence; staircase rules + gapped-tread reading; garden-recipe miniaturisation [ch05, ch10, ch11, ch18]. |
| `compatibility` (686 w) | light | SE couple pocket, dragon-phoenix formal pair, East-earth vs West-fire romance correction [ch19, ch09, ch11]. |

Every changed recipe: `targetPages` band re-measured from a test render.

### Family B - Bespoke templates

| Product | Improvement |
|---|---|
| `move-in-kit` | The move-in-date school convention (new occupants = new chart) [ch07] stated with lineage backing; Tai Sui / Sui Po / San Sha renovation cautions with the before-Li-Chun workaround; personal-timing counsel [ch22]. Copy in `lib/pdf/movein-template.ts`. |
| `couple-compatibility-compass` (delisted but feeds the Love site) | Inherits the `compatibility` block free; template SE-pocket line only if trivial. |

### Family C - Static PDFs (authored in annual-feng-shui-planner, rebuilt + re-uploaded)

| Product | Improvement |
|---|---|
| `business-money-feng-shui` | Second Edition: site selection + negative neighbours, storefront Ming Tang inside and out, serpentine customer flow, register placement, office/reception/conference diagnostics, five home-vs-business reversals, two worked walkthroughs, four-gates water section [ch22, ch18]. |
| `cures-catalog` | Six new symbols (Qilin, dragon-headed turtle, money cat, dragon-phoenix, prosperity bowl, doubling mirrors), money-frog daily ritual, two Pa Kua logics reconciled, candle number/colour coding, numbers-and-shapes reference [ch09]. |
| `home-diagnostic-workbook` (in the bundle) | Forms-first governing rule, sixty-second doorway audit, missing-corner decision kit, sha distance heuristic [ch10, ch03, ch05, ch20]. |
| `daily-ritual-pack` (in the bundle) | Clean-then-intention sequencing note [ch20]; skip if it reads as padding. |
| `good-days` + Planner | Defer to the 2027 editions (spec/annual-refresh-2027.md). |

### Family D - Course + surfaces

| Item | Improvement |
|---|---|
| `seven-day-home-reset` | Day-fitting insertions only: forms-first (furniture day), fire-water buffer + stove-daily (kitchen day), doorway audit (declutter day). |
| kua-calculator CLAUDE.md products section | Rewrite the stale Phase-3 description to point at the registries + truth matrix. |

## Task list v2 (appended to prd.json on approval; autonomous after approval)

1. **ENR-001 Ladder core.** Direction octet + framing blocks + FAQ + `year-overlay`.
   Practitioner voice applied as each block is touched. Test renders: personal
   compass + nine-pillars; bands updated. (Upgrades products 2, 5, and every tier.)
2. **ENR-002 The flagship peak.** NEW `house-match` block + recipe insertion into
   `extended-personal-kua` + `complete-home`; flagship comparison table on the $49
   page gains the "Home Trigram match" row; test renders + bands. (Product 1.)
3. **ENR-003 Rooms pass.** All 8 room/space blocks + `compatibility`; practitioner
   voice; twelve-spaces test render + bands. (Products 4, and 22 hidden compasses free.)
4. **ENR-004 Move-in.** Template copy upgrade (premise lineage, Tai Sui cautions,
   personal timing) + test render. (Product 6.)
5. **ENR-005 Business Second Edition.** The ch22 rebuild in annual-feng-shui-planner
   + Start-here page + one worksheet (storefront walk scorecard) + action-recap end
   card + rebuilt PDF. (Product 3.)
6. **ENR-006 Bundle + cures.** `home-diagnostic-workbook` (+ ritual pack only if
   non-padding) and `cures-catalog` expanded edition, each with Start-here + ending
   card; rebuilds. (Products 7, 8.)
7. **ENR-007 Course day-fits.** The three insertions in the drip emails. (Product 9.)
8. **ENR-008 Experience gate.** Run the five-point satisfaction test on all nine
   products; fix failures; align each delivery email's where-to-start line with what
   the PDF now opens with; zero em dashes / outcome promises scripted check;
   before/after word and page table; CLAUDE.md products-section fix.
9. **ENR-009 The free-update event (owner-gated send).** Draft the "your product
   grew" email to past buyers (fresh signed links, what is new per product, review
   request), plus a one-line newsletter mention. Send scripts dry-run by default;
   stepwise owner walkthrough. NOTE: run AFTER the owner uploads rebuilt PDFs.
10. **ENR-010 Preview refresh hook.** The P5 look-inside previews (still awaiting
    owner imagery review) must be produced from ENRICHED pages, not the old ones:
    re-render the five sample PDFs after ENR-001..006 land and refresh
    scripts/out/previews/ for the owner's review round.

Owner steps at the end (stepwise walkthroughs provided): upload the rebuilt static
PDFs to the Supabase product-files bucket (paths unchanged, no code edits), approve
the free-update email, review previews.

## Owner decisions requested at approval

1. **Approve the v2 scope** (10 tasks, autonomous after approval; delisted products
   parked).
2. **Business kit as "Second Edition" on the shelf card: RECOMMEND YES.** It is
   honest news, it justifies the free-update email, and "second edition" is the
   strongest low-cost trust signal a small catalogue can display.
3. **Cures catalogue price: RECOMMEND KEEP $9.** With Good-Days now free, this is
   the shelf's only sub-$10 paid rung; its job is first-purchase conversion, not
   margin. Ship the expanded edition at $9 and let it over-deliver (that surplus is
   what turns into reviews). Revisit price only after reviews exist.
4. **Free update to past buyers: RECOMMEND YES** (owner-gated send, ENR-009).

## Verification

- Personalised: test render per changed product; measured pages -> bands in
  lib/products.ts; smoke tests green; keepsake + at-a-glance render.
- Static: uv builds in annual-feng-shui-planner; PDFs opened; Start-here and ending
  card present; word/page deltas recorded.
- Experience: the five-point satisfaction test per product, recorded in the tracker.
- Copy: practitioner-voice spot check per product; zero em dashes; zero outcome
  promises (scripted).
- Nothing in checkout, Stripe wiring, or storefront visibility changes in this phase.
