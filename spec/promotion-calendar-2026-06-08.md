# 30-day promotion calendar

**Date:** 2026-06-08
**Scope:** myfengshuihome.com, days 1 to 30 of promotion, part-time solo owner
**Status:** Approved by owner. Use as the execution guide. Month 2 work is captured in the deferral list at the bottom.

---

## What this document does

Translates the locked anchor selection (`spec/anchor-pages-2026-06-08.md`) and the locked channel plan (`spec/channels-2026-06-08.md`) into a week-by-week 30-day execution schedule for one part-time owner.

Out of scope, deliberately:

- Payment work (Stripe, Lemon Squeezy)
- Consultations or service offers of any kind
- Rewriting any guide page content (SEO work is title tag + meta + FAQ block + anchor IDs + internal-linking only)
- Building the actual Pinterest pins (the calendar names when each pin is designed; pin production is left for the execution session, not done here)
- Paid advertising on any channel
- The content calendar beyond day 30 (month 2 work lives in the deferral list)
- Adding analytics or trackers to `/kua-calculator` or `/embed` (both stay tracker-free)

Plan was produced by a workflow (run id `wgvwjfb5d`): loader, drafter, 3 parallel critics (capacity realism, dependency ordering, scope-and-voice compliance), adversarial reviewer. Reviewer returned `revise` for capacity and dependency issues. Those fixes are folded into the calendar below: session highs capped, week 2's bundled asset session split, the cluster internal-linking pass descoped in week 3 with a follow-up in week 4 so anchor 5 inbound links land on a tweaked target, weekly hour success checks now include recurring task minutes, and week 4's optional fifth pin is made truly conditional.

---

## Constraints recap

- Week 1 stays inside 6 to 8 hours total.
- Weeks 2 to 4 sit around 6 to 8 hours each (week 2 may tip to 9 if both asset-prep blocks run long).
- Pinterest first. Lead anchor week 1 is find-your-kua-number.
- Pin budget for the month: 8 to 10 fresh pins is the policy ceiling. The planned floor is 4 to 5 main pins, one per anchor (except anchor 4). Crops and color variants are deferred to month 2.
- Anchor 4 (annual cures vs permanent fixes) gets internal-linking only in this window. No pin, no SEO promotion. Its split-panel pin and the email send wait for the Li Chun 2027 window.
- SEO at this stage is on-page tweaks plus internal-linking only. No outreach. Domain too young to land backlinks cleanly.
- Reddit is comment-first. Zero calculator links until week 3 at earliest, and only if an OP explicitly invites a deeper read.
- Email stays deferred for the full 30 days.

---

## Week 1

**Theme:** Pinterest foundation, the lead pin on find-your-kua-number, on-page SEO tweaks for anchor 1, Reddit lurking starts.

**Hours band:** 6 to 8 hours total (sessions plus recurring tasks).

### Sessions

**Session 1: Pinterest account and three boards (60 to 90 min, channel: setup)**

Claim a Pinterest Business account using the `diirena@gmail.com` address. Verify ownership of `myfengshuihome.com` via DNS TXT in the domain dashboard (preferred) or via HTML / meta verification on the Next.js site if DNS verification stalls. Create the three week 1 boards with calm descriptions, no fortune-telling language: `Compass School Basics`, `Reading Your Home Corner by Corner`, `Feng Shui Walkthroughs`. Set the profile bio to a one-line description that names the site, no outcome promises. Save the verification confirmation screenshot to spec evidence.

DNS fallback note: if the registrar takes 1 to 24 hours to propagate, the 60 to 90 min only covers active work. Capture the verification confirmation asynchronously when it lands. If verification stalls past Wednesday, Session 2 may slip to week 2 without breaking the plan.

Deliverable: verified Pinterest Business profile and three live boards.

Depends on: none.

**Session 2: Master pin template (90 to 130 min, channel: asset_production)**

Build the reusable 1000x1500 master pin template in Canva (faster than Figma at this stage). Paper `#fbf7ee` background, deep ink `#2a271e` lines, single accent clay `#be6b43`, serif title block, small URL strip at bottom. Export the blank master plus one variant frame for chart-shaped pins.

Deliverable: master pin template file in Canva, ready for variants.

Depends on: Session 1.

**Session 2b: Brand palette stub (15 to 20 min, channel: setup)**

Codify the locked hex tokens in `projects/kua-calculator/spec/brand-pin-palette.md` as ASCII-only markdown. Include the single-accent rule and the banned-imagery list.

Deliverable: `brand-pin-palette.md` committed.

Depends on: Session 2.

**Session 3: Compass chart pin and anchor 1 on-page SEO (120 to 150 min, channel: pinterest)**

Two-part block. Part A: design the East Group vs West Group compass chart pin using the master template. Compass rose split down the center, Kua numbers 1, 3, 4, 9 on the East side, 2, 5, 6, 7, 8 on the West side, calculator icon and `myfengshuihome.com` in the bottom strip. Overlay text: `Your Kua Number and Your Four Directions`. Publish to `Compass School Basics` with the description from the template stub. Part B: ship on-page SEO tweaks on `/guide/compass-school/find-your-kua-number`. Title tag set to `Kua Number Calculator and Your Four Directions | My Feng Shui Home`. Meta description rewritten. FAQ block added with "What is a Kua number" and "East group or West group, which am I". Above-the-fold internal link to `/kua-calculator` with anchor text `find your Kua number`. The link is a plain anchor, no UTM parameters, no click handlers, so the calculator surface stays tracker-free at the referrer boundary. Do not rewrite body content.

Deliverable: pin 1 live on `Compass School Basics`. Git commit on the find-your-kua-number MDX file covering title tag, meta, FAQ block, and the above-the-fold internal link.

Depends on: Session 2 (master template) and Session 2b (palette stub).

### Recurring tasks

- r/fengshui lurking and substantive comments. Zero links. Identify 2 to 3 Kua-number or East vs West group threads to answer per session. After each session log the thread URL, comment URL, OP question shape, and whether the OP asked for a deeper read in `reddit-cadence-tracker.md` (the tracker update is folded into the Reddit session itself, single 25-min block). Cadence: 3 to 4 days this week, 25 min each. Total: 75 to 100 min.
- Purpose: account warm-up. Build comment history before any link is allowed in week 3 at earliest.

### Deliverables by end of week 1

- Pinterest Business profile verified, three live boards
- Master 1000x1500 pin template in Canva
- `brand-pin-palette.md` committed at `projects/kua-calculator/spec/`
- Compass chart pin (anchor 1) live on `Compass School Basics`
- Git commit on find-your-kua-number MDX: title tag, meta, FAQ, internal link
- `reddit-cadence-tracker.md` initialized at `projects/kua-calculator/spec/` with the week 1 row
- `pinterest-analytics-baseline.md` stub at `projects/kua-calculator/spec/` with day-0 zeros and weekly tracking columns

### Success checks (verified at end of week 1)

| Check | How to verify | Minimum signal |
|---|---|---|
| Pinterest profile shows verified domain badge | Profile settings page on Pinterest | Verified badge visible |
| Compass chart pin live and reachable | Open the pin URL in a logged-out browser | Pin loads with title, image, and link to `/guide/compass-school/find-your-kua-number` |
| Anchor 1 title tag and FAQ visible in production | View page source on the live URL after Vercel deploy | New title tag string and at least one FAQ Q+A render in HTML |
| Reddit comment count for the week | `reddit-cadence-tracker.md` row count | At least 6 substantive comments logged, zero links |
| Total focused hours stayed inside band | Owner time log per session, including Reddit and analytics recurring | Sum of session minutes PLUS recurring task minutes between 360 and 480 |

### Notes

Week 1 is intentionally heavy on one-time setup. The compass pin doubles as the master template proof, so weeks 2 to 4 ship faster. SEO tweaks for anchor 1 piggyback on Session 3 because both touch the same page concept and switching context is the slow part. The floor-plan component and six-lever icon set are deferred to week 2 to keep this week inside the 6 to 8 hour band.

---

## Week 2

**Theme:** Southeast wealth pin, the reusable floor-plan component and six-lever icon set (split across two sessions), on-page SEO for anchor 2, native scheduler set up.

**Hours band:** 6.5 to 9 hours total.

### Sessions

**Session 1a: Floor-plan component (90 to 120 min, channel: asset_production)**

Build the reusable top-down line-art floor-plan component in Canva. Two-color, no people, no incense, no symbols on the wall. Save as a named component in the `MFSH Pins` folder so it drops into future pins without rework.

Deliverable: floor-plan component file, saved as a named component.

Depends on: week 1 Session 2 (master template).

**Session 1b: Six-lever icon set (60 to 90 min, channel: asset_production)**

Build the six-lever icon set: element, placement, visibility, proportion, timing, room use. Tiny line icons, consistent stroke weight, single accent only on the active state. Save as named components alongside the floor plan.

Deliverable: six-lever icon set file, six named line icons.

Depends on: week 1 Session 2 (master template). Independent of Session 1a (can be done on a different day this week).

**Session 2: Southeast wealth pin and anchor 2 on-page SEO (100 to 150 min, channel: pinterest)**

Design and publish the southeast wealth area pin. Top-down floor plan with the southeast corner tinted clay. Six small labelled icons in a grid around it: element, placement, visibility, proportion, timing, room use. Overlay text: `The Southeast Corner, Read in Six Steps`. Publish to `Reading Your Home Corner by Corner` with the per-anchor description from the template. Then ship on-page SEO tweaks on `/guide/money/the-southeast-wealth-area-and-how-to-read-it`. Title tag: `The Southeast Wealth Area: How to Read It | My Feng Shui Home`. Meta description. FAQ block with "Where is the wealth corner" and "What goes in the southeast". Do not rewrite body content. Do not include the words `activate` or `manifest` anywhere.

Deliverable: pin 2 live on `Reading Your Home Corner by Corner`. Git commit on the southeast wealth area MDX file covering title tag, meta, FAQ block.

Depends on: Session 1a (floor-plan component) and Session 1b (six-lever icon set).

**Session 3: Native scheduler and pin description template (60 to 90 min, channel: pinterest)**

Turn on the Pinterest native scheduler. Schedule the next two planned pins (anchor 3 and anchor 5) as draft placeholders so the cadence is visible. Then fill `projects/kua-calculator/spec/pin-description-template.md` with the per-anchor body copy for anchors 3 and 5 (anchor 4 block marked deferred to month 2). Each description uses the calm voice, includes the anchor route, and avoids the banned terms. If anchor 5 description copy overruns 60 min in this block, defer the anchor 5 copy to week 4 rather than push the weekly band.

Deliverable: native scheduler enabled with 2 placeholder drafts. `pin-description-template.md` filled for anchors 3 and 5 (or 3 only with anchor 5 marked deferred to week 4).

Depends on: Session 2 (anchor 2 pin live).

### Recurring tasks

- r/fengshui lurking and substantive comments, still zero links. Tracker update folded into the session. Cadence: 3 to 4 days, 25 min each. Total: 75 to 100 min.
- Pinterest analytics check, log saves, impressions, and outbound clicks for pin 1 to the baseline file. Cadence: twice this week, 10 min each. Total: 20 min.

### Deliverables by end of week 2

- Floor-plan component, named reusable component in Canva
- Six-lever icon set, six named line icons in Canva
- Southeast wealth pin (anchor 2) live on `Reading Your Home Corner by Corner`
- Git commit on the anchor 2 MDX file: title tag, meta, FAQ block
- Native scheduler turned on with 2 placeholder drafts
- `pin-description-template.md` filled for anchors 3 and 5 (or 3 only with anchor 5 deferred to week 4)
- Pin 1 analytics logged twice in `pinterest-analytics-baseline.md`

### Success checks

| Check | How to verify | Minimum signal |
|---|---|---|
| Pin 2 live and reachable | Logged-out browser open of the pin URL | Pin loads with link to the anchor page |
| Anchor 2 SEO tweaks live in production | View page source after Vercel deploy | New title tag and FAQ block in HTML |
| Pin 1 has at least one engagement signal | Pinterest analytics for pin 1 | At least 1 save OR 25 impressions logged by end of week |
| Reddit comment count and ratio safe | `reddit-cadence-tracker.md` totals | At least 6 substantive comments logged, zero links, running ratio still 9 to 1 or better |
| Total focused hours stayed inside band | Owner time log (sessions plus recurring) | Sum between 390 and 540 |

### Notes

Two anchor pieces of work pair this week so the floor-plan component pays off the same week it is built. Sessions 1a and 1b are independent and can be done on different days. The native scheduler is enabled now rather than week 1 because there is nothing real to schedule until pin 2 exists. Tailwind paid scheduler is intentionally not introduced; native is sufficient at this volume.

---

## Week 3

**Theme:** Bedroom-kitchen-front-door pin, on-page SEO for anchor 3, descoped cluster internal-linking pass (anchors 1 to 3 plus anchor 4 wiring), conditional first Reddit link.

**Hours band:** 6 to 8 hours total.

### Sessions

**Session 1: Bed-stove-door pin and anchor 3 on-page SEO (120 to 150 min, channel: pinterest)**

Design and publish the bedroom-kitchen-front-door main pin using the floor-plan component. Overhead plan with bed in command position, stove with cook facing the room, foyer that does not point straight through. Numbered callouts 1, 2, 3 tie to the three rooms. Overlay text: `Bed, Stove, Door: The Three Rooms That Set the Tone`. Publish to `Feng Shui Walkthroughs`. Crop variants are explicitly deferred to month 2, do not build them now. Then ship on-page SEO tweaks on `/guide/rooms/bedroom-kitchen-front-door`. Title tag: `Bedroom, Kitchen, and Front Door: Feng Shui Layout Basics`. Meta description.

Deliverable: pin 3 (main only) live on `Feng Shui Walkthroughs`. Git commit on the anchor 3 MDX file covering title tag and meta.

Depends on: week 2 Session 1a (floor-plan component).

**Session 1b: Anchor 3 jump-link anchor IDs (30 to 45 min, channel: seo)**

Standalone short commit. Add three anchor IDs on the bedroom, kitchen, and front-door sections of the anchor 3 page so other pages can deep-link. Pure markup change, no body content rewrites.

Deliverable: git commit with three anchor IDs on the anchor 3 page.

Depends on: Session 1.

**Session 2: Descoped cluster internal-linking pass (90 to 120 min, channel: seo)**

The single mid-month internal-linking pass, descoped so weeks 3 and 4 do not collapse. This pass covers anchors 1, 2, 3, and anchor 4 wiring only. Anchor 5 inbound links are deferred to week 4 Session 2 after anchor 5 ships its on-page SEO tweaks.

From each of anchors 1, 2, 3, add 1 to 2 contextual links to other anchors and to the relevant secondary pages where the link makes sense in surrounding sentences. Do not rewrite paragraphs, only adjust link text. Anchor 4 (annual cures vs permanent fixes) gets bi-directional cluster wiring to and from anchors 1, 2, and the five-element-cures-room-by-room secondary page, plus the relevant cures-cluster pages. No promotional copy added. No CTA changes. Log every edit in `spec/internal-linking-pass-2026-06.md`. The log stub itself includes a one-line guardrail: `no body sentence rewrites, link-text-only edits`.

Deliverable: git commit touching link contexts only on anchors 1, 2, 3, anchor 4, and 3 to 5 secondary pages. `internal-linking-pass-2026-06.md` log created.

Depends on: week 1 Session 3 (anchor 1 SEO), week 2 Session 2 (anchor 2 SEO), week 3 Session 1 (anchor 3 SEO).

**Session 3: Conditional Reddit link and day-15 measurement (45 to 75 min, channel: reddit and measurement)**

Two-part block. Part A: review `reddit-cadence-tracker.md` for any thread where the OP explicitly asked for a deeper read on Kua number or East vs West group (the only invitation type allowed this window). If and only if such a thread exists, post one comment that answers the question substantively and ends with one link to `/guide/compass-school/find-your-kua-number` (not the calculator root, the anchor page). If no qualifying thread exists, do not force one. Log the skip in the tracker. Part B: log the day-15 Pinterest snapshot (impressions, saves, outbound clicks per pin) to `pinterest-analytics-baseline.md`. Write a 5-line readout in `progress.txt` covering signal so far.

Deliverable: either one tracked Reddit comment with a link OR a logged skip. Day-15 measurement readout in the baseline file plus a 5-line note in `progress.txt`.

Depends on: week 1 Session 1 (Pinterest setup).

### Recurring tasks

- r/fengshui lurking and substantive comments. Watch specifically for invitation-shaped questions on Kua and wealth corner. Tracker update folded into the session. Cadence: 3 to 4 days, 25 min each. Total: 75 to 100 min.
- Pinterest analytics quick check and log to baseline file. Cadence: twice this week, 10 min each. Total: 20 min.

### Deliverables by end of week 3

- Bed-stove-door pin (main, no crops) live on `Feng Shui Walkthroughs`
- Git commit on anchor 3 MDX file: title tag and meta
- Separate commit with 3 anchor IDs on anchor 3
- Cluster internal-linking commit covering anchors 1, 2, 3, anchor 4 wiring, and 3 to 5 secondary pages
- `internal-linking-pass-2026-06.md` log at `projects/kua-calculator/spec/` with the body-rewrite guardrail line at the top
- Reddit cadence tracker row for the conditional link decision (fired or skipped)
- Day-15 Pinterest measurement readout in `pinterest-analytics-baseline.md`

### Success checks

| Check | How to verify | Minimum signal |
|---|---|---|
| Pin 3 main shipped without crop variants | Canva file list and Pinterest board | Exactly one pin 3 file, exactly one pin live |
| Anchor 3 jump links reachable via deep link | Open the page with `#bedroom` in the URL after deploy | Browser scrolls to the bedroom section |
| Linking pass touched anchors 1 to 3 and anchor 4 | Git diff scope of the linking commit | Diff includes anchors 1, 2, 3 MDX plus anchor 4 wiring plus at least 3 secondary pages, NOT anchor 5 |
| Reddit ratio still safe | `reddit-cadence-tracker.md` totals | Comments-with-link count is 0 or 1, total comments at least 18 across weeks 1 to 3 |
| Pinterest engagement trend | Pinterest analytics snapshot | At least 2 saves OR 100 impressions across the 3 pins by day 15 |
| Total focused hours stayed inside band | Owner time log (sessions plus recurring) | Sum between 360 and 480 |

### Notes

Week 3 is descoped from the original draft to avoid the weeks 3-4 collapse the prior plan warned about. Anchor 4 finally gets attention this week as cluster-wiring only, not active promotion. Anchor 5 inbound links wait for week 4 so they land on anchor 5 AFTER its on-page SEO ships. The Reddit link is gated behind an organic invitation; do not manufacture one. If no qualifying thread appears, the link stays parked.

---

## Week 4

**Theme:** Walkthrough checklist pin, on-page SEO for anchor 5, anchor 5 inbound link wiring follow-up, day-30 measurement readout. Optional fifth pin is conditional, not a baseline plan item.

**Hours band:** 6 to 7.5 hours total in the baseline plan. Up to 8.5 hours if the optional fifth pin runs.

### Sessions

**Session 1: Walkthrough checklist pin and anchor 5 on-page SEO (120 to 150 min, channel: pinterest)**

Design and publish the how-to-read-any-room main pin. Top third: stylised top-down line drawing of a small home floor plan. Middle two-thirds: four numbered checklist rows reading like a walk (notes first, lenses after). Bottom strip: `myfengshuihome.com` in small caps. Overlay text: `How to read any room: a 4-step walk`. Publish to `Feng Shui Walkthroughs`. Color variants are deferred to month 2. Then ship on-page SEO tweaks on `/guide/rooms/how-to-read-any-room`. Title tag: `How to read any room (a feng shui walkthrough) | My Feng Shui Home`. Meta description.

Deliverable: pin 4 (main only) live on `Feng Shui Walkthroughs`. Git commit on anchor 5 MDX covering title tag and meta.

Depends on: week 2 Session 1a (floor-plan component).

**Session 1b: Anchor 5 four-step anchor IDs (30 to 45 min, channel: seo)**

Standalone short commit. Add the four descriptive anchor IDs on each of the four reading steps so other pages can deep-link. Pure markup change.

Deliverable: git commit with 4 anchor IDs on the anchor 5 page.

Depends on: Session 1.

**Session 2: Anchor 5 inbound link follow-up pass (30 to 45 min, channel: seo)**

Short follow-up to week 3 Session 2's linking pass. Now that anchor 5 has its title tag, meta, and four anchor IDs live, wire inbound links from anchors 1, 2, 3, and from the relevant secondary pages (kitchen-stove-and-money-flow, the-nine-life-areas, five-element-cures-room-by-room) into anchor 5 and into specific step IDs where the link target makes sense. Append entries to `internal-linking-pass-2026-06.md`.

Deliverable: git commit with anchor 5 inbound links from anchors 1 to 3 plus 2 to 3 secondaries. Updated log file.

Depends on: Session 1b (anchor 5 IDs live in production).

**Session 3: Day-30 measurement readout (75 to 105 min, channel: measurement)**

Pull the day-30 Pinterest analytics snapshot, the Vercel pageviews delta for each anchor route since week 1, the Reddit cadence tracker totals, and (if Google Search Console is set up) the impressions and average position for the 5 anchor URLs. Write the day-30 readout in `spec/30-day-channel-mix-readout.md` covering total pins shipped, saves and impressions per pin, anchor pageview deltas, Reddit comment-to-link ratio, optional Search Console signal, and a one-paragraph recommendation on whether to keep or shift the 45 / 30 / 15 / 10 / 0 channel mix going into month 2. List the explicit deferrals to month 2.

Deliverable: `30-day-channel-mix-readout.md` with measurement table, recommendation, and deferral list.

Depends on: Session 1.

**Session 4 (conditional): Optional fifth pin (60 to 90 min, channel: pinterest)**

Conditional. Only run this session if, by Wednesday of week 4, the actual logged hours for Sessions 1, 1b, 2, 3 plus recurring tasks land under 6 hours and the day-15 measurement showed a clear best performer among the first 4 pins. If those conditions hold, design and publish one fresh variant pin for the best-performing anchor with a distinct overlay text (not a rerun). Publish to the matching board. If the conditions do not hold, skip and log the skip in `pinterest-analytics-baseline.md`. Hard cap: this session ships at most one additional pin so the month total stays at or under 10.

Deliverable: either pin 5 published OR a logged skip with reason. Not counted in the baseline weekly hour band.

Depends on: Session 3 (measurement readout informs the choice).

### Recurring tasks

- r/fengshui lurking and substantive comments. Continue watching for walkthrough or read-the-room invitations. Tracker update folded into the session. Cadence: 3 to 4 days, 25 min each. Total: 75 to 100 min.
- Pinterest analytics quick check. Cadence: twice this week, 10 min each. Total: 20 min.

### Deliverables by end of week 4

- Walkthrough checklist pin (main, no color variants) live on `Feng Shui Walkthroughs`
- Git commit on anchor 5 MDX file: title tag and meta
- Separate commit with 4 anchor IDs on anchor 5
- Anchor 5 inbound linking commit and updated `internal-linking-pass-2026-06.md`
- Optional pin 5 published OR logged skip
- `30-day-channel-mix-readout.md` at `projects/kua-calculator/spec/` with measurement, recommendation, and month-2 deferral list

### Success checks

| Check | How to verify | Minimum signal |
|---|---|---|
| Total pins shipped this month | Count of live pins on the four boards | Between 4 and 5 pins live by end of week 4 (within the 8 to 10 policy ceiling) |
| All 5 anchor pages have on-page SEO tweaks live | View page source on each of the 5 anchor URLs | 5 of 5 anchors show updated title tag (anchor 4 has cluster-wired internal links only, not new title tag) |
| Reddit cadence held across the month | `reddit-cadence-tracker.md` totals | At least 24 substantive comments across the month, no more than 2 with links, no removals |
| Day-30 readout written | Open `30-day-channel-mix-readout.md` | All four sections present (pins, anchor pageviews, Reddit ratio, recommendation) |
| Total focused hours stayed inside band | Owner time log (sessions plus recurring) | Sum between 360 and 450 baseline, up to 510 with optional fifth pin |

### Notes

Week 4 deliberately ends light enough to write the readout properly. The optional fifth pin exists to use month budget slack, not to fill time. If the day-15 signal was thin or unclear, skip it and bank the hours for the readout. The reason crops and color variants are still deferred even though there is capacity: the goal here is to see which pin shape moves, not to flood the boards with the same idea.

---

## Month summary

| Metric | Low | High |
|---|---:|---:|
| Total focused hours | 24.5 | 33 |
| Fresh pins published | 4 | 5 |
| On-page SEO sessions (one per anchor 1, 2, 3, 5 plus the anchor 4 cluster wiring) | 5 | 5 |
| Reddit substantive comments | 24 | 32 |
| Reddit comments with links | 0 | 2 |

Pin policy ceiling for the month: 8 to 10. Planned floor: 4 to 5. The 4 to 5 is the schedule, not the cap.

---

## Measurement after 30 days

These are the signals to check at day 30 to decide whether the channel mix is working. Each has a minimum threshold and a decision rule if the signal falls below.

| Signal | Source | Minimum threshold | Decision if below |
|---|---|---|---|
| Total Pinterest impressions across all live pins | Pinterest analytics | 1,000 impressions across the month | Pin shapes are not getting distribution. Before adding pins in month 2, re-examine overlay text and board placement. Do not increase pin volume to compensate. |
| Total Pinterest saves across all live pins | Pinterest analytics | 5 saves across the month | Audience is seeing but not keeping. Treat as signal that the calm-voice differentiation may need a stronger hook in the first overlay line. Do not pivot to fortune-telling vocabulary. |
| Outbound clicks from Pinterest to anchor routes | Pinterest analytics + Vercel analytics referrer breakdown | 10 outbound clicks across the month | Pinterest is not yet a real acquisition channel for this domain. Keep month 2 pin output flat at 4 to 5 pins, do not scale. Continue SEO work as the slower compounding channel. |
| Anchor 1 (find-your-kua-number) pageview lift since week 1 | Vercel analytics | Week 4 pageviews at least 20 percent above week 1 baseline | On-page SEO tweaks have not landed yet, which is expected for a young domain. Hold the SEO mix at 30 percent, do not divert hours to outreach (out of scope) or paid ads (locked out). |
| Search Console impressions for the 5 anchor URLs (if Search Console is hooked up) | Google Search Console | At least 50 impressions across the 5 URLs in the last 7 days of the window | Either Search Console is too young to register (normal for new domains) or anchor pages have not been crawled. Submit the sitemap explicitly in month 2. Do not change content. |
| Reddit comment count and link ratio | `reddit-cadence-tracker.md` and Reddit account profile | At least 24 substantive comments, no more than 2 with links, no removals | Account is not yet trusted by the sub. Hold Reddit at 10 percent and continue comment-first into month 2. Do not attempt a submission post. |
| Calculator usage delta | Supabase saved_charts count (for signed-in users) plus Vercel calculator pageviews (for anonymous) | Calculator pageviews up at least 15 percent vs week 0 baseline | Funnel from anchor 1 to calculator is leaking. In month 2 review the above-the-fold internal link on the anchor page text and CTA placement. Do not modify calculator-page tracking (locked tracker-free). |

---

## What pushes to month 2

Explicit deferrals from this 30-day window:

- Annual-cures-vs-permanent-fixes Pinterest split-panel pin. Anchor 4 active promotion stays parked until the planner Li Chun warm-up window opens in mid-January 2027.
- Bedroom-kitchen-front-door pin crop variants (bedroom-only crop, kitchen-only crop, front-door-only crop).
- How-to-read-any-room pin color variants.
- Any secondary-tier page promotion (kitchen-stove-and-money-flow, desk-door-and-business-money, the-nine-life-areas, feng-shui-money-without-wishful-thinking, five-element-cures-room-by-room).
- Tailwind paid scheduler evaluation. Only revisit if native cadence becomes insufficient, which it will not at month 1 volume.
- Any email send to the planner waitlist. Locked queued for mid-January 2027 once the list crosses roughly 150 subscribers.
- Backlink outreach. Domain too young, out of scope for this window.
- r/InteriorDesign, r/HomeDecorating, r/declutter active commenting. Surface only this month. Expand in month 2 only if the r/fengshui ratio held.

---

## Assets and specs to save in this window

These are stub files the calendar references. They are markdown specs, NOT built assets.

| File | Location | Status to aim for |
|---|---|---|
| `brand-pin-palette.md` | `projects/kua-calculator/spec/brand-pin-palette.md` | Stub created in week 1 with the locked hex tokens (`#fbf7ee` paper, `#2a271e` ink, `#be6b43` clay), the single-accent rule, and the banned-imagery list |
| `pin-description-template.md` | `projects/kua-calculator/spec/pin-description-template.md` | Spec written in week 2 with per-anchor description blocks for anchors 1, 2, 3, and 5. Anchor 4 block marked deferred to month 2. Banned terms listed at top. |
| `reddit-cadence-tracker.md` | `projects/kua-calculator/spec/reddit-cadence-tracker.md` | Stub created week 1 with a markdown table: date, subreddit, thread URL, OP question shape, comment URL, did OP invite a deeper read, did this comment include a link, running ratio. Filled across all 4 weeks. |
| `pinterest-analytics-baseline.md` | `projects/kua-calculator/spec/pinterest-analytics-baseline.md` | Stub created week 1 with day-0 zeros, weekly tracking columns for impressions, saves, outbound clicks per pin. Updated twice weekly. |
| `internal-linking-pass-2026-06.md` | `projects/kua-calculator/spec/internal-linking-pass-2026-06.md` | Spec written in week 3 with a one-line guardrail at the top: `no body sentence rewrites, link-text-only edits`. Logs every link edit (file, paragraph, link text, target). Appended in week 4 for the anchor 5 inbound pass. |
| `30-day-channel-mix-readout.md` | `projects/kua-calculator/spec/30-day-channel-mix-readout.md` | Written in week 4 Session 3. Contains the day-30 measurement table, the recommendation on the 45 / 30 / 15 / 10 / 0 channel mix, and the explicit deferral list for month 2. |

---

## Pointers

Locked inputs that drive this calendar:

- `spec/anchor-pages-2026-06-08.md` (the 5 anchor selection)
- `spec/channels-2026-06-08.md` (the per-anchor channel plan and the 30-day mix)

Workflow run id that produced this calendar: `wgvwjfb5d` (loader, drafter, 3 parallel critics for capacity / dependency / scope-and-voice, adversarial reviewer).

Related project memory:

- [[project-planner-phase4]] - planner phase status and what counts as next
- [[project-analytics-decision]] - how we measure success in this window (Vercel pageviews + Pinterest analytics + Supabase rows + Reddit account profile)
- [[feedback-stepwise-ops]] - the shape of operational walkthroughs the owner expects

The next phase begins when this calendar is approved and the owner kicks off week 1 Session 1.
