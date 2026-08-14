# Architect spec - Revenue Launch Sprint (recheck-gated)

Date: 2026-08-05 · Projects: kua-calculator (lead), annual-feng-shui-planner (PDF rebuilds), myfengshuilove (Wave 3) · Status: awaiting approval

## Recovery notes (what is actually true on disk today)

- The shop is FULLY purchasable. `lib/commerce.ts` has `launched: true` on every
  product, and 30+ product pages carry `BuyButton state="stripe-live"`, including
  the planner, all static Kits & Guides, the personalized compass ladder
  (9 pillars + 12 spaces + pick-3s + complete home), the couple compass, the
  Move-In Kit, and the 7-Day Reset course. The old "only the Planner is live"
  state is history.
- Owner confirmed fulfilment tested and working (2026-07-20, truth matrix
  addendum). Baseline revenue is still ~zero: 3 test orders, $3.61.
- Therefore the launch is not blocked by code or Stripe. It is blocked by two
  things: (1) the owner is not satisfied with most products, so the promotion
  push keeps being postponed; (2) no traffic actions are running.
- Owner-gated items already sitting ready, each with a runbook:
  - Newsletter/waitlist send: ~20 subscribers, never emailed.
    `spec/waitlist-send-walkthrough-2026-07-20.md` (EARLYLIST coupon optional).
  - Welcome sequence: built, flag-gated. `spec/welcome-sequence-runbook.md`
    (migration 0010 + `WELCOME_SEQUENCE_ENABLED=true`).
  - Preview imagery review: `spec/preview-production-walkthrough-2026-07-20.md`.
  - BaZi Basics PDF: rewritten 2026-08-02 (26pp, premium cover), verified,
    waiting for owner upload to the Supabase `product-files` bucket.
  - myfengshuilove.com: Phase C code complete; blocked on two walkthroughs,
    `myfengshuilove/spec/love-bundle-stripe-test-2026-07-18.md` and
    `myfengshuilove/spec/deploy-runbook-2026-07-18.md`.
  - Branch `premium-product-covers` (italic-Didone magazine covers for the 12
    Kits & Guides + collection-spine rule): unmerged.
  - 14 product photos: prompts delivered, owner still to generate.
- Parked sibling initiative: `spec/architect-2026-08-04.md` (BaZi calculator +
  guide restructure) is a separate spec, still awaiting its own approval. It is
  a traffic asset, not a launch blocker; it slots in after Wave 2 if approved.

## PROJECT BRIEF

```
Name:          Revenue Launch Sprint (recheck-gated)
Type:          launch ops + content QA + promotion
Client:        Internal - My Feng Shui Home (+ My Feng Shui Love in Wave 3)
Deliverables:  1. Product recheck scorecard filled by the owner (SHIP/FIX/PULL
                  per product) - the gate for everything else.
               2. Fix pass: rebuilt PDFs for every FIX verdict, each re-approved
                  by the owner, then uploaded to Supabase by the owner.
               3. Doors-open actions: newsletter send to the existing list,
                  welcome sequence enabled, preview imagery approved,
                  premium-covers branch decision (merge or drop).
               4. myfengshuilove.com deployed (two owner walkthroughs).
               5. Traffic engine running: weekly Pinterest video-pin cadence +
                  weekly funnel readout ritual.
Deadline feel: urgent (owner wants revenue; every quiet week is $0)
Dependencies:  Wave 0 (recheck) gates Wave 1 (fixes) for flagged products only.
               Wave 2 sends need nothing from Waves 0-1 except owner comfort;
               the BaZi upload precedes any promotion of that product.
               Wave 3 (MFSL) is independent and can run parallel to Waves 1-2.
               Wave 4 (traffic) starts as soon as the owner is willing to point
               people at the shop, and never stops.
Tech stack:    Existing only. Next.js/Vercel (kua-calculator, myfengshuilove),
               Python+Pandoc product pipeline (annual-feng-shui-planner,
               build_product_pdf.py via uv), Supabase storage, Stripe, Resend,
               Pinterest pin pipeline in-repo. No new tools.
Assets:        All 14+ products built and live; brand book + palette; premium
               cover system (unmerged branch); voice skills (storytelling +
               practitioner); runbooks listed above; ~20-subscriber list;
               welcome sequence; pin pipeline; funnel readout script.
```

## Wave 0 - the product recheck scorecard (owner, this week)

The owner reviews and returns a verdict per row. SHIP = good enough to promote
now. FIX = flag it, one line on what bothers you. PULL = hide from the shelf
until further notice. One line per FIX is enough; the fix pass turns each line
into a work order.

Static PDFs (open each from `annual-feng-shui-planner/build/products/`):

| Product | Price | Verdict (SHIP / FIX / PULL) | What bothers you (one line) |
|---|---|---|---|
| 2026 Annual Planner (live flagship) | $29 | | |
| Bedroom Reset | $14 | | |
| Business & Money Feng Shui (Money Kit) | $19 | | |
| Home Diagnostic Workbook | $14 | | |
| Cures Catalogue | $9 | | |
| Daily Ritual Pack | $9 | | |
| Healthy Home Audit | $19 | | |
| Five Elements Workbook | $12 | | |
| Starter Deck | $9 | | |
| BaZi Basics (2026-08-02 rebuild, pre-upload) | $14 | | |

Personalized + composite (review the sample renders, not every SKU; samples via
`render-sample-previews.mjs` per the preview walkthrough):

| Product family | Verdict | What bothers you |
|---|---|---|
| Personal Compass + compass ladder (samples) | | |
| Extended Personal Kua Report (sample) | | |
| Move-In Kit (sample) | | |
| Couple Compatibility Compass (sample) | | |
| Whole-Home Starter Bundle (composition) | | |
| 7-Day Home Reset course (email bodies) | | |
| Good-Days Calendar (free catcher PDF) | | |

Also in Wave 0, two owner decisions that shape the fix pass:

1. `premium-product-covers` branch: merge the premium covers now (recommended;
   likely raises satisfaction across all 12 Kits & Guides at once) or drop it.
2. The 14 missing product photos: generate now from the delivered prompts, or
   ship the fix pass without them.

## Wave 1 - the fix pass (Claude, gated per product by Wave 0)

- One work order per FIX verdict: rebuild that PDF through
  `annual-feng-shui-planner/source/build_product_pdf.py`, applying the owner's
  one-line complaint + the house quality bar (voice-storytelling-copy for prose,
  practitioner voice for action sections, premium cover, diagram language,
  no em dashes, no outcome promises).
- Each rebuilt PDF goes back to the owner for a YES before upload. No bulk
  approval.
- Owner uploads approved PDFs to the Supabase `product-files` bucket (stepwise
  walkthrough provided per upload, same style as previous ops walkthroughs).
- PULL verdicts: I flip the product off the shelf (`lib/storefront.ts`
  visibility, sitemap, search) the same day, so the shop only shows what the
  owner stands behind.
- BaZi Basics: the 2026-08-02 rebuild is upload-ready now unless the owner FIXes
  it again in Wave 0.

## Wave 2 - doors open (owner walkthroughs, Claude guiding stepwise)

1. Newsletter send to the ~20 subscribers per
   `spec/waitlist-send-walkthrough-2026-07-20.md`. First warm-audience revenue
   attempt. EARLYLIST coupon optional, owner's call at send time.
2. Welcome sequence on: migration 0010 + `WELCOME_SEQUENCE_ENABLED=true` per
   `spec/welcome-sequence-runbook.md`.
3. Preview imagery review per `spec/preview-production-walkthrough-2026-07-20.md`
   so product pages show approved look-inside previews.
4. One live checkout spot-check on a fixed product (small coupon order, refunded)
   to re-verify the full buy path after uploads, mirroring the June proof.

## Wave 3 - second storefront (owner walkthroughs, parallel to Waves 1-2)

1. `myfengshuilove/spec/love-bundle-stripe-test-2026-07-18.md` (Stripe TEST).
2. `myfengshuilove/spec/deploy-runbook-2026-07-18.md` (Supabase, Resend, OAuth,
   live prices + webhook, 13 env vars, DNS, $7 live canary).
3. Flip `NEXT_PUBLIC_MFSL_LIVE=1` on the Home site so the cross-pointer band
   shows.

## Wave 4 - the traffic engine (recurring, starts as soon as owner says go)

- Weekly Pinterest cadence with the in-repo video pin pipeline, pointed at the
  free Good-Days catcher (`/good-days`) and the flagship planner page.
  Owner capacity assumption: ~6-8.5 hrs/week total on promotion.
- Weekly scoreboard ritual: `node scripts/funnel-readout.mjs` + Vercel Analytics
  + Stripe sessions per `spec/funnel-readout-guide.md`. Decisions come from the
  readout.
- Review engine: stays empty until real reviews arrive via the delivery-email
  request (seeding remains ON HOLD by owner decision).

## Architecture decision

Single-agent signals: one continuous flow NO · one domain NO · under ~2h NO ·
strictly sequential NO (waves interleave) · context critical step-to-step YES
(owner verdicts drive work orders) · iteration on something built YES. = 2 YES.

Multi-agent signals: 3+ skill domains YES (PDF content, ops guidance, promotion)
· parallelizable workstreams YES (fix pass ∥ MFSL ∥ sends) · one agent loses
context NO · build+review loop YES (every fixed PDF passes an owner gate; a QA
check precedes it) · cross-layer YES (content + code flags + infra walkthroughs)
· multi-session YES. = 5 YES.

`EXECUTION MODEL: HYBRID` - one lead session drives the sprint and the owner
walkthroughs; short-lived subagents are spawned per FIX work order in Wave 1
(one product folder each, never sharing files) plus one QA reviewer per rebuilt
PDF before it goes to the owner. No standing agent team; the owner gates
everything that ships.

## AGENT ROSTER (spawned as needed, never standing)

```
Lead (this session) - coordinator + ops walkthrough guide; does not rebuild PDFs
  Owns: prd.json, progress.txt, storefront flags, walkthrough guidance

Fix agent (one per FIX verdict, sequential or small parallel batches)
  Skill domain: product content
  Owns: annual-feng-shui-planner/build/products/<slug>/ + its source only
  Inputs: owner's one-line complaint + house voice skills + premium cover system
  Outputs: rebuilt PDF -> QA agent
  Blocks: owner upload waits on owner YES

QA agent (one per rebuilt PDF)
  Skill domain: review only
  Owns: nothing (read-only) - checks voice, cover, diagrams, no em dashes,
  no outcome promises, page count sanity, then hands to the owner gate
```

Parallel pairs: fix agents on different product folders may run together.
Sequential: QA always after fix; owner gate always after QA.

## Shared context block

`projects/kua-calculator/CLAUDE.md` already carries the shared agent context
(voice, palette, hard rules) and stays the source of truth; MFSL has its own
CLAUDE.md. No changes needed for this sprint.

## Skills audit

Skills to load:
- skills/shared/marketing/voice-storytelling-copy.md -> Fix agents (prose)
- skills/shared/feng-shui-practitioner-voice/SKILL_FENG_SHUI_PRACTITIONER_VOICE.md -> Fix agents (action sections)
- skills/shared/marketing/launch-strategy.md -> Lead (Wave 2 sends framing)
- skills/shared/marketing/email-sequence.md -> Lead (send + welcome sequence copy checks)
- skills/shared/marketing/social-content.md -> Lead (Wave 4 pin cadence)
- skills/shared/SKILL_IMAGE_PROMPT_ARCHITECT.md -> only if new photo plates are commissioned in Wave 1
- skills/shared/SKILL_RALPH_LOOP.md -> Lead (task protocol)

Skills gap: none blocking. Optional after the sprint: a one-page
"product quality bar" checklist skill distilled from the owner's Wave 0
complaints, so every future product is checked against her own standards before
she ever sees it. Can be created via SKILL_CREATOR.md later; not needed to start.

## Execution (created on approval, per Ralph)

On approval I append these tasks to `projects/kua-calculator/prd.json` (new IDs,
`passes: false`) and log to `progress.txt`:

1. Wave 0 processed: scorecard verdicts recorded, PULLs hidden from the shelf,
   covers-branch + photos decisions logged.
2. Fix work orders written (one per FIX, from the owner's one-liners).
3. Fix pass executed: each flagged PDF rebuilt + QA'd + owner-approved.
4. Upload walkthroughs done: approved PDFs (incl. BaZi) in Supabase.
5. Wave 2 walkthroughs done: newsletter send, welcome sequence on, previews
   approved, checkout spot-check passed.
6. Wave 3 done: MFSL Stripe test + deploy + MFSL_LIVE flag.
7. Wave 4 running: first pin batch of the cadence published + first weekly
   funnel readout logged.

Per the standing preference, once this spec is approved the Claude-side tasks
run autonomously; owner-gated steps are prepared and queued so each walkthrough
is waiting, stepwise, whenever the owner sits down.

---

## Addendum A - Traffic and channel plan (2026-08-05, expands Wave 4)

The one strategic fact every choice below follows from: the real content asset
is the 22-chapter audited library (~84k words) plus the deterministic video pin
pipeline. That combination means we can batch-produce short vertical videos
cheaply. The scarce resource is the owner's ~6-8.5 hrs/week and platform trust.
So: produce once, publish everywhere, on as few accounts as possible.

### The spine: one video, four surfaces

Each weekly batch of vertical tip videos (from the library, via the pin
pipeline, owner-approved) is published to:

1. Pinterest video pin (the core channel: search intent, months-long content
   life, home/decor native audience)
2. Instagram Reel on ONE brand account (@myfengshuihome)
3. TikTok on one brand account (new accounts get real reach there)
4. YouTube Short (same file, zero extra work, slow compounding search moat)

Every caption and bio points at ONE destination: the free Good-Days catcher at
/good-days. Email is the only audience we own; every channel feeds it, the
welcome sequence converts it.

### Channel verdicts

| Channel | Verdict | Why |
|---|---|---|
| Pinterest | CORE, double down | Intent-driven, evergreen, pipeline already built |
| Instagram (1 brand acct) | YES | Reels reuse the same videos; link-in-bio to /good-days |
| TikTok (1 brand acct) | YES | Algorithmic reach for new accounts; same videos |
| YouTube Shorts | YES, passive | Same file re-uploaded; costs minutes |
| Facebook pages (Home + Love) | CLAIM ONLY | Create both pages to own the names + enable future Meta ads; auto-crosspost from Instagram via Meta Business Suite; expect near-zero organic; no extra time budgeted |
| Reddit | OPTIONAL, participation-only | Value-first comments in home/feng-shui subs; no link-dropping (fastest way to get banned); max 30 min/wk if enjoyable, else skip |
| Paid ads (any platform) | NOT YET | Only after organic shows which product converts |
| MFSL socials | CLAIM HANDLES NOW, post after Wave 3 | Do not market a site that is not deployed |

### The AI influencer fleet idea (owner proposal: 5-10 Instagram accounts)

Verdict: do not run 5-10. Four reasons, then what to keep from the idea.

1. Platform risk: Instagram's spam systems specifically detect networks of new
   accounts posting similar content with the same destination link. The likely
   outcome is mass suppression or bans, and the network can drag the main brand
   account down with it.
2. Disclosure rules: Meta and TikTok require AI-generated content labeling.
   Undisclosed AI personas that get flagged lose reach retroactively.
3. Trust economics: feng shui purchases run on calm authority. Ten thin
   anonymous accounts each with 40 followers convert worse than one account
   with 4,000, and followers do not transfer between accounts. Splitting effort
   ten ways resets compounding ten times.
4. Workload maths: 5-10 accounts at a credible cadence is 15-50 posts/week plus
   engagement. That is a full-time social media job; the budget is 6-8.5 hrs.

What survives from the idea (the good core is faceless AI-assisted video at
scale): ONE experiment. Either (a) one additional faceless persona account
("calm home" aesthetic, AI-disclosed where required) run for 30 days against
the brand account as an A/B test, or (b) simply make the brand account itself
the faceless AI-crafted aesthetic. Measure /good-days sessions per channel via
UTM links in the weekly funnel readout, then scale ONLY what moved. If more
accounts ever make sense, the natural cap is two: one per brand (Home + Love).

### Weekly operating rhythm (fits 6-8.5 hrs)

- Batch session, 2-3 hrs: owner reviews and approves the video batch Claude
  prepared (scripts + rendered videos from the library), schedules the week
  across the four surfaces.
- 3 x 30 min: publish day-of, reply to comments.
- 15 min: funnel readout ritual (`node scripts/funnel-readout.mjs` + Vercel
  Analytics + Stripe), one decision per week based on numbers.
- Monthly: 30-day channel review; double down on the best performer, cut the
  worst without sentiment.

### Build tasks this addendum adds (Claude-side, on approval)

8. Extend the pin pipeline to render a 9:16 variant with hook + caption per
   video, so one render feeds all four surfaces.
9. Content calendar v1: first 4 weeks of tip videos mapped from the chapter
   library (paraphrase rules + no source mentions on public surfaces hold).
10. UTM link scheme per channel + funnel readout extended to show
    sessions-by-channel, so the 30-day reviews are decided by data.
11. Handle-claim checklist for the owner: exact stepwise signup for Facebook
    (both pages), Instagram, TikTok, YouTube, plus parking the MFSL handles.

---

**Approval gate.** Nothing executes yet. The owner's next move is Wave 0: fill
the scorecard above (SHIP / FIX / PULL + one line per FIX). Approve this spec
(including Addendum A) and return verdicts in any order; each verdict unlocks
its work order.
