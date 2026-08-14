# Marketing + UX plan: reach and paths (2026-08-14)

Written against the live code (not memory): nav = Guide dropdown / Shop /
Sign in / Cart; homepage = hero, "what feng shui is", free-tools cards,
guide categories, room picker, checklist capture, $49 Complete Home offer,
FAQ; Kua post-result stack = guide link + personalised $19 Compass card +
$49 anchor card; BaZi post-result = one prose link to BaZi Basics, nothing
else. List state: 14 real subscribers, forms bot-guarded, emails rewritten,
sending owner-gated. Companion docs: [funnel-plan-2026-08-14.md](funnel-plan-2026-08-14.md),
[all-products-tree-2026-08-14.md](all-products-tree-2026-08-14.md).

Skills applied: page-cro, marketing-psychology, voice-storytelling-copy,
launch-strategy thinking, UI/UX review practice.

---

# PART 1 - Reaching more customers: the exact sequence

The order matters: arm the funnel BEFORE pouring traffic, because every
visitor who arrives before the paths are wired is spent, not invested.

## Step 0 - Arm the funnel (this week, mostly Claude)

1. Finish the Personal BaZi Reading (owner: generate the two icon sheets
   from the visual plan; Claude: wire template, register product, $19
   Stripe price, product page).
2. Add the post-result offer stack to the BaZi calculator (mirror of the
   Kua stack that already works): locked-chapter tease + ONE primary CTA
   to the Reading + the quiet $49 anchor card. Detail in Part 2, Path C.
3. Add the missing free rung to the Kua post-result stack (the Good-Days
   card, Part 2 Path B) so non-buyers become subscribers instead of
   goodbyes.
4. Enable the welcome sequence (migration 0010 + flag, runbook exists).
5. Create the UTM scheme (one file, `spec/utm-scheme.md`): source =
   pinterest / instagram / tiktok / youtube, campaign = pin batch id.
   Extend `scripts/funnel-readout.mjs` to report sessions by source and
   the four funnel numbers (doors, captures, first purchases, second
   purchases).

## Step 1 - Claim and dress the channels (one sitting, ~2 hours, owner)

6. Create Pinterest business account @myfengshuihome (if not final),
   verify the domain, create 8 boards matching guide clusters (bedroom
   feng shui, wealth corner, five elements, good days, moving house,
   home office, BaZi basics, feng shui for beginners). Board names are
   search terms, not brand poetry.
7. Create Instagram (business; handle logged in the setup checklist),
   bio line = one benefit + one link to /bazi-calculator (with UTM;
   owner decision 2026-08-14: on the single-link platforms the bio
   matches the identity-led content mix). YouTube's channel link stays
   /good-days since its videos carry their own per-video links. Create
   TikTok and YouTube handles, same name, same bio pattern. Create the two Facebook pages (Home +
   Love), switch on Instagram-to-Facebook crossposting in Meta Business
   Suite, then never think about Facebook again.
8. Park the @myfengshuilove handles everywhere now (no posts until that
   site deploys).

## Step 2 - Start the content engine (weekly rhythm, 6-8.5 hrs)

9. Claude prepares each week's batch from the chapter library: 5 vertical
   videos (pin pipeline, 9:16 with hook + caption) + captions per
   platform + the UTM links. Owner approves in one 2-3 hr sitting.
10. Publish cadence: 5 Pinterest video pins/week (one per weekday, to the
    matching board), 3 of those same videos to Instagram Reels, TikTok,
    and YouTube Shorts (Tue/Thu/Sat). Every caption routes to ONE door:
    identity hooks → /bazi-calculator, home hooks → /good-days.
11. Hook split for the first month: 60% identity ("your birth date has a
    code in it", "the 8 characters that describe how you are built"),
    40% home ("the direction your bed faces", "the wealth corner test").
    The split is a hypothesis; the readout corrects it in Step 4.
12. Send the welcome email to the 14 real subscribers when ready (Part C
    of the walkthrough; owner-gated).

## Step 3 - The search layer (runs alongside, mostly Claude)

13. Pick the 10 money keywords the guide already covers (kua number
    calculator, bazi calculator, feng shui bedroom layout, wealth corner,
    feng shui moving date, five elements test, good days calendar 2026,
    bed facing direction, feng shui for beginners, four pillars chart).
    Verify each maps to exactly one page; strengthen that page's title,
    description, and one internal link from the homepage or guide index.
14. Add FAQ schema to the two calculator pages and product schema to the
    ladder pages (ai-seo skill; factual voice).
15. Every new weekly video gets a matching guide cross-link so social,
    search, and email all land on pages that continue the same story.

## Step 4 - Measure and double down (every week, 15 minutes)

16. Weekly: `node scripts/funnel-readout.mjs` + Vercel Analytics + Stripe.
    Read the four numbers, change ONE thing (a hook style, a board, a
    posting day). Never redesign on a quiet week; traffic this small is
    noisy.
17. Day 30: kill the weakest platform, double the strongest. Revisit the
    identity/home hook split against door conversion, not raw views.
18. Only after a full month shows which door and which product convert:
    consider the first paid test ($5-10/day Pinterest ads on the single
    best-performing pin, pointed at its proven door).

## Step 5 - The second storefront (parallel, owner-gated)

19. Deploy myfengshuilove.com (two runbooks, ready since July). The Love
    Bundle then joins the weekly batch with its own pins and its own
    door, and the two brands cross-point in their footers.

---

# PART 2 - The visitor paths: what exists, what leaks, what to do

Every path is judged against the funnel:
attention → free value → capture → first purchase ($19) → ladder ($29-49)
→ return. The five entry doors, in likely traffic order once Step 2 runs:

## Path A - Homepage `/`

**Today:** hero → "What feng shui actually is" → free tools (Kua, BaZi,
guide) → categories → room picker → checklist capture → $49 Complete Home
offer → FAQ → expectations block. Nav: Guide / Shop / Sign in / Cart.

**Read:** structurally strong; free-first ordering matches the funnel and
the paradox-of-choice rule. Two leaks: the visitor meets *education*
("what feng shui is") before they meet *themselves* (the tools), and the
only paid offer on the page is the $49 top rung with no $19 stepping
stone.

**Do (P1, quick):**
1. Swap sections 2 and 3: free-tools rise to directly under the hero,
   the honest block follows. The 5-second rule: a cold visitor should
   meet "get your number free, ten seconds" in the first scroll.
2. Hero CTA check: exactly one primary button, "Get your free Kua
   reading", pointing at the calculator. Everything else in the hero is
   quiet.

**Do (P2):**
3. In the $49 offer section, add the one-line ladder ("Start with your
   Compass at $19; the Complete Home Compass is the whole map") so the
   homepage sells the decision, not only the summit. Good-better-best
   needs the rungs visible.

## Path B - Kua calculator (free, anonymous)

**Today:** the strongest junction on the site. After the result: guide
link + personalised $19 Compass card (their own Kua woven in) + $49
anchor card. This is exactly right and needs no redesign.

**The one leak:** a visitor who is not ready to buy has no email rung at
the moment of highest engagement; they read their result and leave, and
we own nothing of the relationship. The calculator stays privacy-pure
(no birth data captured), but a plain LINK breaks no rule.

**Do (P1, quick):**
4. Add a third, quiet card to the post-result stack: "Your directions
   are half the timing. The Good-Days calendar marks the season's
   favourable days, free" → /good-days. Non-buyers become subscribers;
   the welcome sequence does the rest of the work over days instead of
   this one page having to win in one visit.

## Path C - BaZi calculator (free, sign-in gated) - THE HOLE

**Today:** sign-in gate → full chart rendered (BaziResult) → one prose
sentence linking to the BaZi Basics static guide. No offer card, no
tease, no anchor. The funnel's designated acquisition engine currently
ends in a hallway.

**Do (P1, the single highest-value build on the site):**
5. Mirror the Kua pattern with the Reading as hero. After the chart:
   a) the free result stays generous (full pillars + Day Master, as now);
   b) a locked-chapters block: the Reading's actual section titles
      ("Your season", "How strong is your chart", "Your decades road",
      "Your helpful people"), each with one teasing line, visually
      present but closed - the Zeigarnik loop;
   c) ONE primary CTA: "Read the full story of your chart, $19" →
      /products/personal-bazi-reading;
   d) the quiet bridge card beneath: "BaZi reads the person. Feng shui
      reads the place the person lives." → Personal Compass $19;
   e) BaZi Basics moves to the Reading's delivery email (the
      learn-it-yourself cross-sell), OFF this page - two similar offers
      at one moment kill both.
6. Until the Reading ships, do not leave the hallway: temporarily make
   the BaZi Basics link a proper offer card. Delete the temporary card
   the day the Reading goes live.

## Path D - Good-Days page (the catcher)

**Today:** free calendar + email form (link email; optional notes opt-in).

**Do (P2):**
7. After the email form succeeds, the thank-you state should hand over
   the next step instead of ending: "While it lands: your Kua number
   takes ten seconds" → calculator. Capture moments are the best
   navigation moments; goal-gradient says momentum continues if a next
   step is visible.
8. The opt-in checkbox label should sell the notes affirmatively
   ("Occasional notes: a season turning, a good day coming") per the
   welcome-email voice.

## Path E - Guide and article pages (the search door)

**Today:** deep, well-organised library; the nav dropdown lists eleven
topics. Guide pages teach; the shop sells; the two barely touch.

**Do (P2):**
9. Each guide cluster gets ONE contextual CTA block (not a banner
   farm): bedroom cluster → Bedroom Compass or the ladder; BaZi cluster
   → the Reading; timing cluster → Good-Days. One block, end of page,
   voice-consistent, blog-post CRO rule: contextual beats generic.
10. Every article ends with the free-tool line for its topic (the
    reciprocity rung), never a raw product pitch to a cold reader.

## Path F - Product pages (the pin door)

Pins will land people directly on ladder and product pages.

**Do (P2/P3):**
11. Finish the preview/look-inside approvals (walkthrough exists,
    owner-gated): a pin-clicker who cannot see inside a $19-49 PDF
    bounces. This is the trust signal we control before reviews exist.
12. First real reviews: the delivery-email review request is already the
    mechanism; the star engine renders as soon as the first ones arrive.
    Until then product pages lean on the method + the credential
    (/about) - never seeded reviews (owner decision, and correct).

## The scoreboard for both parts

Weekly, from the extended readout: door sessions by source · capture
rate · first-purchase rate · 30-day second-purchase rate. One change per
week, chosen from whichever number is weakest. That is the whole
management system.

## Sequenced summary

| When | Steps | Owner or Claude |
|---|---|---|
| This week | 0.1-0.5 (arm funnel) + 5 (BaZi junction) + 4 (Kua free rung) | mostly Claude; owner: icon sheets, price, migration |
| Same sitting | 6-8 (handles + boards) | owner, ~2 hrs |
| Weekly from next week | 9-12 (content engine + welcome send) | batch: owner approves, Claude prepares |
| Alongside | 13-15 (search layer), 1-3 + 7-10 (path fixes) | Claude |
| Every week | 16-17 (readout, one change) | owner 15 min |
| Day 30+ | 18 (first paid test) | decision from data |
| Parallel | 19 (MFSL deploy) | owner runbooks |
