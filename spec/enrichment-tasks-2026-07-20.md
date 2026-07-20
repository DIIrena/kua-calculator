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
