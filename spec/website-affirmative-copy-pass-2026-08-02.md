# Website affirmative-copy pass - plan (2026-08-02)

## Why

The new "benefit-led, never defensive" rule (now in
`skills/shared/marketing/voice-storytelling-copy.md` v1.1.0 and the practitioner-
voice skill) should be true of the **live site**, not just future writing. An
audit of every reader-facing surface in kua-calculator found **~62 prominent
defensive disclaimers across ~55 surfaces**.

Two pieces of good news shrink the job:

1. **Outcome-promise discipline is already solid.** The audit found zero
   reader-facing over-promises. Nothing says "this will make you rich." We are
   only removing *negations*, not policing hype.
2. **The homepage hero was already cleaned** (the "and what it isn't" opener is
   gone). The heroPromise lines, the compass-catalogue one-liners, and the
   ReadingDepthMatrix are already model-compliant - they show the target voice.

And one pattern dominates the count: **34 of the ~62 are the identical
`<h2>What it is not</h2>` section on hand-built product sales pages.** So the
real edit count is closer to ~30 distinct changes, several of them one-edit-many-
surfaces (shared components and repeated content blocks). This is a half-day copy
pass, mostly mechanical.

## The rule, and the one distinction that governs this pass

Benefit-led, positive, never disclaim in a prominent spot. Keep the honest
"the tradition reads / associates / supports the conditions for" hedges - those
are attribution, not disclaimers. Every instance sorts into one of three bins:

- **Pure doubt-planting negation** ("not a fortune", "not a prediction", "no
  outcome promises", a "What it is not" heading) sitting in a prominent spot
  (hero, opener, first section, card blurb, section heading, meta/OG) -> **FIX**:
  flip to the positive half, or delete the heading.
- **A genuine legal / health / money / consent boundary** -> **KEEP, but relocate
  it LOW** (a deep FAQ item, a footer note, an end-of-page line) and word it as a
  calm fact, not a headline. **Never delete a real boundary - move it.**
- **An audience-fit ("who it's for") qualifier** -> keep the self-selection
  function, but reword away from efficacy-doubt ("This is for people who want a
  structured read" rather than "You want a fortune; this isn't that").

### De-negating is only half the job - add the benefit

A removed disclaimer leaves a gap. Do not leave a hole where the negation was;
fill it with an affirmative benefit. This is the part that makes the pass a
*gain*, not just a subtraction. Use the tools now in the skill
(`voice-storytelling-copy.md` -> **The benefits engine**):

- **The benefit ladder** - climb each feature to its emotional or identity rung
  ("your eight directions" -> "so the room feels on your side").
- **The benefits library** - the brand's stock of feelings to reach for: calmer,
  in control, at home in your space, more yourself, clear, lighter, cared-for,
  confident. Pick the one that fits the surface; do not stack them.

Worked micro-example from Tier 3: `seven-day-home-reset:47` "a way to read and
adjust your rooms, not a fortune" -> "a calm, practical way to read your rooms and
feel more at home in them by the seventh day." The negation is gone *and* an
emotional benefit is now in its place.

## The worklist (tiered by reach / effort, grounded in the audit)

### Tier 1 - Systematic, highest reach (do first)

1. **The 34 `<h2>What it is not</h2>` product sales-page sections.** Same template
   across every hand-built product page. Remove the heading; fold the one honest
   attribution line ("a structured way to choose between arrangements that
   otherwise look equivalent") into the positive "What is inside" section, or drop
   it to a low FAQ item. Heading anchors from the audit: `:96` (the 22 compass/
   space pages), `:81`, `:101`, `:104`, `:108`, `:110`, `:111`, `:125`, `:149`,
   `:176`. Verify by grepping `products/**/page.tsx` for `What it is not` after.
2. **`lib/guide.ts:179` + `content/guide/foundations/what-feng-shui-is-plainly.md`**
   - the literal twin of the homepage line the owner already fixed, and it is
   linked straight from the homepage "free tools" block and the About page.
   Retitle to "What feng shui actually is"; lead the foundations page with its
   existing affirmative line ("Feng shui is a structured way of looking at a
   room"); drop the page's "## What it is not" heading. **Highest single-fix value.**
3. **`components/ProductLanding.tsx:318`** "Questions, answered plainly" ->
   "Common questions." One edit, renders on all 9 ProductLanding pages.
4. **Repeated personalised-PDF content blocks** (ship inside every buyer's PDF, so
   high per-fix leverage): `content/blocks/welcome.md:7`,
   `welcome-extended.md:16` (the pull-quote), `identity-east.md:11`,
   `identity-west.md:11`. Flip each to its positive ("What it gives you is a map
   of traditional placements to try, observe, and adapt in your own home").

### Tier 2 - Guide cluster headings + openers

- The ~9 `## What this cluster / page is not` headings across `content/guide/**`
  (foundations, the three sister-disciplines pages, the what-belongs cluster,
  healthy-home, money, cures) -> fold the content into affirmative intros; drop
  the negation heading. Also the "## QMDJ is not Flying Stars" heading ->
  "How QMDJ differs from Flying Stars".
- The two negation H1 titles + teasers in `lib/guide.ts`: `:462`/`:466`
  ("...without wishful thinking" / "handled, not summoned") and `:510`
  ("...without health promises"). Retitle to what the page actually teaches.
- Guide-index category blurbs with negations: `lib/guide.ts:79, 133, 142, 181`.
  Drop the "what it isn't" halves.

### Tier 3 - Per-page mid-body lines + meta/OG

- Scattered mid-body negations on individual product pages: `move-in-kit`
  (:34 hero "a method, not a guess", :47), `complete-home-compass` (:47, :48),
  `personal-feng-shui-compass` (:49), `business-money-feng-shui` (:46, :48, :68),
  `seven-day-home-reset` (:47). Reword each to keep only the positive half.
- Meta / OG descriptions carrying negations: `bazi-basics/page.tsx:12, 20`,
  `personal-feng-shui-compass:12`, `seven-day-home-reset:10, 43`,
  `products/page.tsx:9`, `about/page.tsx:19, 28`. Quick text swaps.
- The "who it is for, and who it is not" not-for-you bullets
  (`ProductLanding.tsx:288` heading + the "You want a fortune / a guarantee"
  bullets on move-in, complete-home, personal-compass). Reword to audience-fit,
  keep the self-selection function. (See open decision 2.)

### Tier 4 - Self-praise "plainly" habit (secondary, batch last)

~10 instances of "plainly / said plainly / plain frame" (highest reach:
already covered by ProductLanding:318 in Tier 1; the rest are per-page:
complete-home:47, personal-compass:49, move-in:47, business-money:80/93,
good-days:78, whole-home:90, pillar-wealth.md:9, space-kitchen.md:79). Replace
with the clear statement itself, or drop the adverb. Lowest urgency.

### Leave as-is (compliant low boundaries) - do NOT touch

- PDF closing blocks `content/blocks/closing*.md` (end position, sanctioned).
- The kua-calculator "Is this fortune-telling?" deep FAQ.
- `content/methodology.md` `## 8. Limitations` (second-to-last section).
- `about/page.tsx` "consult a qualified professional" line (deep in the page).
- The privacy pages (the sanctioned home for legal boundaries).
- Every surface the audit marked clean: homepage hero/framing/closing,
  ReadingDepthMatrix, compass-catalogue one-liners, the heroPromise lines. These
  are the model, not the target.

## Integrity guard - the boundaries that must SURVIVE (relocate + soften, never delete)

These are real boundaries, not doubt-planting. Keep the point, move it LOW, word
it calmly:

- **Medical:** `lib/storefront.ts:131` ("No medical claims"), the healthy-home
  guide cluster medical block, healthy-home product page. Move to a deep FAQ /
  end-note; open on air, light, damp, rest.
- **Money / financial:** `content/blocks/pillar-wealth.md:11` (drop the bold
  negation, keep a soft attribution), `business-money-feng-shui:48`.
- **Consent (BaZi):** the "read your own chart, not other people's" point ->
  positive invitation ("read others' charts *with* them, not about them"). This is
  the same point as decision (b) in `annual-feng-shui-planner/bazi-rewrite-plan-2026-08-02.md`.

## Method (how each fix is checked)

- Run **both** skill checklists on each edited surface: the diagnostic checklist
  (does it open on the benefit? zero prominent negations? hedges kept?) and the
  new **benefits checklist** (every feature ladders to a benefit; each section
  lands one emotional or identity benefit; a removed negation was replaced, not
  just deleted).
- After the pass, grep the repo for the banned patterns and confirm none survive
  in a prominent spot: `not a fortune`, `not a prediction`, `no outcome promises`,
  `What .* is not`, `answered plainly`, `promises nothing`, `no mysticism`.
- `npm run build` must pass (most edits are TSX on the shop pages) and
  `npm run start` serves the edited pages without error.

## Sequence

1. Tier 1 (systematic + highest reach).
2. Tier 2 (guide).
3. Tier 3 (per-page + meta/OG).
4. Tier 4 (self-praise).
5. Grep-verify; `npm run build`; owner reviews a sample of before/afters.
6. Merge to main and deploy (the site is live).

## Coordination

- The **bazi-basics sales page** disclaimers (`page.tsx:12, 20, 110`) are fixed in
  this pass with the **same** benefit-led subtitle as the BaZi PDF rewrite, so the
  shop card, the OG image, the PDF cover, and the sales page all read one line.
- This pass is **copy-only**: no layout, no product logic, no pricing, no new
  claims. Paraphrase-only stays in force for the guide + blocks.

## Open decisions for you

1. **Scope now:** (a) all four tiers in one pass, or (b) Tiers 1-2 now (the
   highest-reach fixes) and Tiers 3-4 as a quick follow-up? *Recommend (a)* - it is
   one coherent voice pass and the long tail is cheap once we are already in the files.
2. **The "who it is for, and who it is not" not-for-you sections:** keep them as
   audience-fit (reworded away from efficacy-doubt) or remove them? *Recommend keep
   + reword* - self-selection is useful and honest; only the "You want a fortune"
   phrasing needs to go.

---

**Nothing is edited yet.** This is the plan for your approval. Say go (and answer
the two decisions) and I will run the tiers, grep-verify, build, and bring you a
sample of before/afters before deploy.
