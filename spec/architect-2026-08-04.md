# Architect spec - BaZi Calculator (Phase 1) + BaZi guide rewrite (Phase 2)

Date: 2026-08-04 · Project: kua-calculator (My Feng Shui Home) · Status: awaiting approval

## Recovery notes (existing project)

- Stack: Next.js App Router + TypeScript on Vercel; Supabase = database only.
- **The pattern to mirror is the Kua calculator**: the calculation runs entirely
  in the browser as a vanilla-JS island (`public/calculator/*.js`), with TS ports
  in `lib/` for server use. It is **privacy-pure**: no birth data leaves the
  browser, no third-party deps in the calc core (`kua-calculator/CLAUDE.md` hard
  rule). The page is `app/(site)/kua-calculator/page.tsx` + `CalculatorIsland` +
  `CalculatorScripts`.
- We already have the BaZi visual language built (the pillar grid, element tally,
  Ten Gods wheel, stem emblems) in the BaZi PDF - the calculator's results card
  reuses it.

## PROJECT BRIEF

```
Name:          BaZi (Four Pillars) Calculator + BaZi guide rewrite
Type:          tool (calculator) + content (guide)
Client:        Internal - My Feng Shui Home
Deliverables:  Phase 1 - BaZi calculator at /bazi-calculator (a public SEO page,
               but running it requires a signed-in account) that computes the 4
               pillars, the Day Master, element balance, and Ten Gods labels,
               and saves the chart to the user's account; results card in our
               visual language; CTA to the BaZi Basics guide.
               Phase 2 - rewrite the BaZi Basics PDF: friend tone, Day-Master-
               first, machinery moved to a back appendix, a plain-language
               glossary of terms, and every "calculate" step pointing at OUR
               calculator.
Deadline feel: normal
Dependencies:  Phase 1 before Phase 2 (the guide's new structure depends on the
               calculator existing). Within Phase 1: engine -> UI -> page.
Tech stack:    Next.js App Router + TS; the engine is a server-side TS module
               (lib/bazi.ts) run through an Auth.js v5 session-gated server
               action; Supabase stores the saved chart; Vercel.
Assets:        BaZi visual language (pillar grid, element bars, Ten Gods wheel,
               emblems) already built; brand palette; voice skills; the
               affirmative-copy rule (voice-storytelling-copy v1.2.0).
```

Owner decisions (2026-08-04): calculator depth = **chart + reading labels**
(pillars + Day Master + element balance + Ten Gods); name = **one page targeting
both terms** (/bazi-calculator, title "Free BaZi Calculator (Four Pillars)");
sequence = **calculator first**; the PDF must include a **glossary in simple language**. Access (2026-08-04): the calculator is **account-gated** - only signed-in users can run it, and the chart saves to their account.

## Access model - public + email-gate (REVISED 2026-08-06, owner feedback)

The v1 account-gate (deployed 2026-08-05) proved too much friction on the first
touch - you had to sign in before you could even try it, and nothing on the site
linked to it. Revised to a lower-friction lead magnet.

**Public calculator, email-gate the reading.** Anyone opens `/bazi-calculator`
(no login) and enters their birth data, exactly like the Kua calculator. To
reveal the reading they enter their **email** - captured as a lead, and we email
them a copy. After the result, offer "create a free account to save it and
compare charts" (converts the keen ones to full accounts). Signed-in users skip
the email step; their chart still saves to their account.

This maximises email capture (the goal) at minimum friction, keeping the account
path as an upsell. Birth data + email leave the browser deliberately - this is a
lead-capture tool, like the 14-point checklist lead magnet, not the privacy-pure
Kua core. Consent: the reading email is the transactional value exchange; a
separate opt-in checkbox covers ongoing guidance.

**The free reading = the chart + a light teaser, not the full reading.** Show the
four pillars grid (Day Master marked), the element balance, and the Ten Gods
labels, PLUS a short brain-tickler: the Day Master name + one line, the strongest
element, and the dominant Ten Gods lean in a phrase. The full personal reading is
held back for the paid Personal BaZi Reading.

## Product ladder (BaZi) - owner direction 2026-08-06

- **Free BaZi Calculator** (public + email-gate) - the chart + the teaser. Captures email + discoverable from the nav/homepage/Kua page/guide.
- **Personal BaZi Reading** (NEW paid product, price TBD ~$14-19) - a full
  personalized reading of the buyer's own chart: their Day Master portrait, their
  Ten Gods read in plain words, their element balance interpreted. The done-for-you
  version, mirroring the Compass line. Generated from their computed chart. Needs
  its own scoping before build.
- **BaZi Basics** ($14) - stays the educational primer: learn to read ANY chart
  yourself. Already built (Phase 2 in progress).
- **Bundle**: Personal Reading + BaZi Basics at a small discount - the done-for-you
  and the teach-yourself together (covers "separate product" and "add-on, either
  direction").

## Architecture decision

Single-agent signals: one domain (mostly code) YES · sequential YES · context
critical step-to-step YES · iteration on an existing pattern (Kua calc) YES ·
one continuous flow NO (the engine is multi-part) · under ~2h NO. = 4 YES.

Multi-agent signals: build+verify loop needed YES (engine correctness is the
crux) · 3+ independent domains NO · parallelisable NO · would lose context NO ·
cross-layer NO · multi-session MAYBE. = ~1-2 YES.

`EXECUTION MODEL: HYBRID` - a single agent builds the calculator mirroring the
Kua calculator, and spawns **one verification subagent** to validate the
four-pillars engine against known reference charts before it ships. Correctness,
not parallelism, is the reason for the second agent.

## The engine - the crux of Phase 1

A BaZi chart is four stem+branch pairs. The maths:

- **Year pillar** - sexagenary (60-cycle) from the year, with the boundary at
  **Li Chun** (the solar term ~4 Feb), not 1 Jan and not lunar New Year. Someone
  born in late Jan / early Feb belongs to the previous BaZi year.
- **Month pillar** - the branch is fixed by which **solar term** the birth falls
  in; the stem comes from the year stem via the Five Tigers rule.
- **Day pillar** - the reliable part: Julian Day Number mod 60 against a verified
  anchor date.
- **Hour pillar** - branch from the birth double-hour; stem from the day stem via
  the Five Rats rule. **Local solar time** (birth-city longitude) matters near
  the two-hour boundaries; v1 corrects with the city's timezone/longitude.
- **Solar terms** - THE task. Two viable routes, decided and tested in the build:
  (a) a compact sun-longitude algorithm (Meeus low-precision) computing the 24
  terms, or (b) an embedded solar-terms table for a supported range (e.g.
  1900-2100). Either way it is verified against references.
- **Ten Gods** - label each of the 7 non-day-master characters by its element
  relationship to the Day Master + polarity (exactly the logic the guide teaches).
- **Element balance** - count the five elements across the eight characters.
- **Time unknown** - supported: read six characters, skip the hour pillar; the
  Day Master (the headline) is unaffected.

## Files (account-gated; auth + saved-chart pattern reused)

- `lib/bazi.ts` - the engine (solar terms, pillars, Day Master, Ten Gods,
  elements), server-side TS. The single source of truth for the maths.
- `app/actions/bazi.ts` - session-gated server action: reads the Auth.js session,
  computes the chart for the signed-in user, saves it, returns it. Rejects if the
  caller is not signed in.
- `app/(site)/bazi-calculator/page.tsx` - public page (ranks for SEO), benefit-led
  hero with the Day Master as the promise. Signed-out visitors see the pitch + a
  "Sign in free to get your BaZi chart" CTA (existing Auth.js: Google + magic
  link). Signed-in visitors see the form + result.
- `components/BaziCalculatorForm.tsx` - the client form (date, optional time,
  city) that calls the server action and renders the results card.
- `app/(site)/account/...` - the user's saved BaZi chart (a card in the existing
  account page, or its own route), mirroring the saved-Kua-chart view.
- `supabase/migrations/000X_bazi_charts.sql` - a saved-BaZi-charts table
  (FK to `next_auth.users`), mirroring `saved_charts`.
- Results-card styles in `globals.css`, reusing the pillar-grid + element-bar
  visual language from the PDF.
- `app/sitemap.ts` - add the public route.

## Results card (what the user sees)

1. **Your Day Master**, large: "Yang Water (Ren), the river" + one-line teaser.
2. The **four pillars** as the coloured grid (Day Master highlighted).
3. **Element balance** as bars.
4. **Ten Gods** labelled on each character (toggle/expand).
5. CTA: "Now read what your chart means -> BaZi Basics."
6. The chart is saved to the user's account, so they can return to it any time.

## Verification plan (why HYBRID)

A verification subagent assembles ~8-10 reference charts (birth date/time/place ->
known four pillars) from established calculators, deliberately spanning the hard
cases: just before/after Li Chun, a month-boundary solar term, near-midnight and
late-night hours, a time-unknown chart, and a couple of ordinary ones. Our
engine ships only when every reference matches. This is the single biggest risk
and gets adversarial checking.

## Brand + platform rules (non-negotiable)

- **This is the account layer, not the anonymous core.** Unlike the Kua
  calculator (which stays privacy-pure and anonymous), the BaZi calculator is
  deliberately account-gated and stores the signed-in user's birth data + chart -
  the same intentional, approved data handling the account / saved-charts layer
  already uses. Privacy copy must keep the distinction clear, and the anonymous
  Kua calculator + `/embed` stay untouched.
- **Affirmative, benefit-led** page copy (voice-storytelling-copy v1.2.0). The
  Day Master is the hero; no defensive disclaimers up top.
- **Accessibility**: labels on every input, visible focus, 4.5:1 contrast,
  keyboard-operable (kua-calculator acceptance bar).
- No em dashes; `npm run build` + `npm run start` clean.

## Phase 2 - guide rewrite (executed after Phase 1 ships)

- **Friend tone** - a knowledgeable friend at the kitchen table, not a textbook:
  shorter sentences, one new term at a time, always glossed.
- **Day-Master-first** - lead with "here's your Day Master and what it says about
  you" (via our calculator), then the people around you (Ten Gods), gently.
- **Machinery to the back** - the stems/branches tables, solar terms, hidden
  stems become a short "How it's worked out" appendix for the curious.
- **Glossary** - a plain-language glossary of every term (BaZi, pillar, stem,
  branch, Day Master, Ten Gods, element, polarity...), one simple sentence each.
- **Wire to our calculator** - every "get your chart" step links to
  /bazi-calculator; the "go to some online calculator" instructions are removed.
- Rebuild the PDF.

## Skills audit

Skills to load:
- `skills/shared/marketing/voice-storytelling-copy.md` (v1.2.0) -> page + guide copy
- `skills/shared/feng-shui-practitioner-voice/...` -> guide friend-tone sections
- `skills/shared/marketing/ai-seo.md` -> the calculator page's meta/schema

Skills gap: none that is a workspace playbook. The one specialised piece is the
**BaZi calculation algorithm** - that is implementation knowledge, verified
against reference charts, not a playbook. No new skill needed unless you want one
that documents the final algorithm for future editions (I can add it after).

## Execution (created on approval, per Ralph)

`prd.json` Phase 1 tasks: (1) engine - solar terms; (2) engine - four pillars +
day master; (3) engine - Ten Gods + element balance + time-unknown; (4)
reference-chart verification (subagent); (5) DB migration + gated server action
(auth check + save chart); (6) form + results card; (7) page + sign-in gate + SEO
+ sitemap; (8) saved-chart account view; (9) accessibility + build gate. Phase 2
tasks: (10) friend-tone Day-Master-first rewrite + glossary; (11) wire to
calculator + rebuild PDF.

---

**Approval gate.** Nothing is built. Approve this and I will create
`prd.json` + `progress.txt` and start Phase 1 with the engine (task 1: solar terms).
