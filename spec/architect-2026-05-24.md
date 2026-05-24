# Architect Spec - kua-calculator Stages 2-5

Date: 2026-05-24
Phase: 3 (continuing) - the staged roadmap from architect-2026-05-22
Status: APPROVED 2026-05-24 - execution begins in a future session at the owner's request

---

## Context

Phase 3 Stage 1 shipped (2026-05-22): Next.js on Vercel + Supabase, calculator
migrated, magic-link + Google accounts, email capture, live at
https://myfengshuihome.com. The NextAuth migration shipped (2026-05-24)
swapping Supabase Auth for Auth.js v5 + Resend so sign-in lives on the brand
domain. Both Stage 1 deferred follow-ups (Google OAuth config, branded auth
email) are now complete.

The owner wants the remaining four stages from the 2026-05-22 roadmap planned
in full today, with execution deferred to later sessions. Stages are executed
in order; each stage is approved before the next begins.

---

## PROJECT BRIEF

```
Name:          kua-calculator Stages 2-5 (continuing Phase 3)
Type:          product build - staged feature additions on the live app
Client:        Internal (My Feng Shui Home)
Deliverables:  Stage 2: 2-color chart (table + bagua diagram) for signed-in users
               Stage 3: auto + on-demand emailed chart via Resend
               Stage 4: main My Feng Shui Home page at / (scope TBD)
               Stage 5: Stripe payments + server-side gating (model TBD)
Deadline feel: normal; one stage per working session at the owner's pace
Dependencies:  Sequential. Stage 2 -> 3 -> 4 -> 5. Owner approves each stage
               before the next begins. Stages 4 and 5 each get their own
               mini-architect pass before execution.
Tech stack:    Next.js (App Router, TypeScript) on Vercel, Supabase Postgres,
               Auth.js v5 (NextAuth) with Resend + Google, Resend transactional
               email (already wired for auth), Stripe for Stage 5.
Assets:        Live Stage 1 + NextAuth foundation, brand book at
               brand/BRAND_BOOK.md v2 (warm naturals, Hanken Grotesk + Bilbo
               Swash Caps), calculator JS, content/methodology.md, saved_charts
               schema with result jsonb future-proofed in 0002_nextauth.sql.
```

---

## ARCHITECTURE DECISION

Single-agent signals scored (6):
- Completable in one continuous flow? NO
- Touches only one domain? NO
- Under ~2 hours? NO
- Sequential, each step dependent on the last? YES
- Context critical from one step to the next? YES
- Iteration on something already built? YES
Score: 3 YES

Multi-agent signals scored (6):
- 3+ distinct skill domains? YES (UI/UX, backend, marketing, payments, content)
- Workstreams parallel without blocking? NO (stages are sequential)
- Would one agent lose context? Possibly across sessions
- Writer + editor loop needed? NO
- Cross-layer output? YES (frontend + backend + email + infra + payments)
- More than one Claude Code session? YES
Score: 4 YES

**EXECUTION MODEL: HYBRID** - single agent per stage with the Ralph pattern,
spawning sub-agents only when work inside a stage truly splits (e.g., chart
visual design in parallel with backend save-chart wiring). Stages themselves
run sequentially because each is a deployable increment owned end to end.

---

## DECISIONS CONFIRMED WITH THE OWNER (2026-05-24)

1. Stage 2 chart format: **both** - a clean color-coded table for reading and
   a bagua / compass diagram for saving and printing.
2. Stage 3 email trigger: **both** - automatic once when a chart is saved and
   marketing_opt_in is true, plus an on-demand "Email me this chart" button on
   each chart page.
3. Stage 4 scope: **deferred** - kept high-level in this spec. A separate
   mini-architect pass scopes it before execution.
4. Stage 5 business model: **deferred** - kept high-level in this spec. A
   separate mini-architect pass scopes it before execution.
5. Key rotation cadence: weekly, starting once the full app is live. Out of
   scope for this build spec; tracked separately in memory.

---

## SKILLS AUDIT

Skills to load (per stage):

Stage 2 (chart):
- skills/shared/SKILL_RALPH_LOOP.md          -> drives the build
- skills/shared/SKILL_UI_UX_PRO_MAX.md       -> chart UI + dashboard polish
- skills/shared/SKILL_FRONTEND_DESIGN.md     -> brand-consistent chart styling

Stage 3 (emailed chart):
- skills/shared/SKILL_RALPH_LOOP.md
- skills/shared/marketing/copywriting.md     -> email body copy
- skills/shared/marketing/email-sequence.md  -> framing the email moment

Stage 4 (main page) - skills are scoped during the Stage 4 mini-architect pass:
- candidates: copywriting, page-cro, content-strategy, ai-seo, frontend-design

Stage 5 (Stripe) - skills are scoped during the Stage 5 mini-architect pass:
- candidates: launch-strategy, marketing-psychology, page-cro

Skills gap: **NONE**. Stripe + Resend integrations are standard patterns
covered by Next.js + Anthropic docs; the existing Resend wiring for auth is a
direct template for transactional email.

---

## STAGE 2 - 2-color chart (detailed)

Goal: a signed-in user can save a Kua chart and view it on a dedicated chart
page. The page shows both a readable color-coded direction table and a
printable bagua diagram. The chart is persisted in Supabase
(saved_charts.result jsonb) so it can be re-rendered later and emailed in
Stage 3.

Acceptance bar (the whole stage):
- A signed-in user clicking "Save my chart" on the calculator persists the
  chart to saved_charts and lands them on the new chart view page.
- The chart page renders the table AND the diagram, both styled with the
  brand-book tokens.
- The diagram is an inline SVG octagon with 8 directional panels filled green
  (favourable) or terra-cotta (avoid), labeled with compass + pinyin + quality.
- Print stylesheet prints the chart page on one A4/Letter page.
- /account lists every saved chart with a link to its chart page; user can
  delete a saved chart.
- Anonymous users still get the result card on the calculator unchanged.

Stage 2 tasks (a mini-prd to be expanded when execution begins):
- CHART-VISUAL-001: Design and inline-SVG-implement the bagua diagram
  (8 segments, brand palette, accessible labels).
- CHART-TABLE-001: Color-coded direction table component (favourable/avoid
  rows with icon + label + meaning, 4.5:1 contrast, kept in the brand).
- CHART-SAVE-001: "Save my chart" CTA on the calculator (visible only when
  signed in); persists to saved_charts via server action.
- CHART-VIEW-001: New route /account/chart/[id]; reads the chart from
  saved_charts; renders table + diagram; owner-only.
- CHART-LIST-001: Update /account dashboard to list saved charts with title,
  date, link to view, delete action.
- CHART-PRINT-001: Print stylesheet for the chart page; one A4/Letter page;
  greyscale-safe (icon + pattern, not color alone).
- CHART-A11Y-001: Accessibility audit of new views (contrast, focus,
  keyboard, labels, landmarks).

Honest framing throughout: "supports the conditions for" language only; no
outcome promises. Two-color split is the honest Eight Mansions deliverable
(no fake neutral tier).

---

## STAGE 3 - emailed chart (detailed)

Goal: when a chart is saved AND marketing_opt_in is true, the chart is emailed
automatically once. Every chart page also has an "Email me this chart" button
that sends the email on demand. Email is brand-styled and inlines the chart so
it renders in every email client.

Acceptance bar (the whole stage):
- Saving a chart with opt-in true triggers exactly one email; opt-in false
  triggers none.
- "Email me this chart" on /account/chart/[id] sends on demand; rate-limited.
- Email body shows the brand wordmark, an inline rendering of the bagua
  diagram (PNG or inline SVG with safe CSS), the color-coded table, and a
  short honest-framing explainer.
- Email is delivered from hello@myfengshuihome.com via Resend (no new infra).
- Send failures don't crash the chart-save flow; they are logged and surfaced
  to the user as "we will retry shortly" in the dashboard.

Stage 3 tasks (a mini-prd to be expanded when execution begins):
- EMAIL-TEMPLATE-001: HTML email template (inline-styled, table-layout for
  email-client compatibility, brand palette, optional dark-mode resilient).
- EMAIL-CHART-RENDER-001: Server-side renderer for the chart diagram inside
  the email (probably inline SVG with conservative CSS; raster fallback only
  if a real client breaks).
- EMAIL-CHART-AUTO-001: Wire the auto-send into the CHART-SAVE-001 server
  action; fires exactly once per saved chart per opt-in user.
- EMAIL-CHART-BUTTON-001: "Email me this chart" button + server action on the
  chart view page.
- EMAIL-CHART-RATE-LIMIT-001: Per-user per-day cap (e.g., 5/day) using a
  small row in Supabase (email_sends count + day key).
- EMAIL-CHART-COPY-001: Final email body copy pass with the copywriting and
  email-sequence skills. Honest framing, single CTA back to /account/chart/[id].

Implementation note: Resend is already wired in auth.ts via fetch. Stage 3
reuses the same pattern; no Supabase Edge Function is needed (the original
Phase 3 spec assumed Edge Function, but with NextAuth + Resend already on the
Next.js server, a server action is simpler and equally robust).

---

## STAGE 4 - main My Feng Shui Home page (high-level, deferred)

Goal: build a real main page at / that introduces My Feng Shui Home as a brand
and routes visitors into the calculator and future tools. Today the / path
redirects to /kua-calculator; Stage 4 changes that.

Scope to decide in the Stage 4 mini-architect pass:
- Landing-only vs full knowledge hub with articles (the 2026-05-22 spec used
  "knowledge hub", but a focused landing page is the smaller, shippable
  option). The hub option may need a markdown-based article system.
- Whether /kua-calculator stays at its current path or moves to
  /tools/kua-calculator. Either way preserve external links and SEO
  (canonical redirects required).
- What tools and content beyond the Kua calculator + methodology page need
  links (Five Elements? Bagua? Room-by-room guides?).
- Whether the brand wordmark and footer in SiteHeader/SiteFooter need any
  rework to host a real / page (the current chrome was designed for the
  calculator as the landing surface).

Mini-architect pass produces architect-YYYY-MM-DD.md when Stage 4 starts.

---

## STAGE 5 - Stripe (high-level, deferred)

Goal: real money, server-side gated. Free tier stays generous; paid features
unlock with a Stripe subscription or purchase.

Scope to decide in the Stage 5 mini-architect pass:
- Business model: tiered subscription vs one-time deeper report vs hybrid.
- What's gated: chart history depth, additional tools, room-by-room guides,
  PDFs? The free tier definitely keeps the calculator and one current chart.
- Pricing.
- Stripe integration shape: Stripe Checkout (hosted) vs Stripe Elements
  (embedded). Hosted is simpler, embedded is more on-brand.
- Webhook strategy (Stripe -> Vercel server -> Supabase) for subscription
  state changes.
- Cancellation, refund, dunning policy.
- Compliance: terms, billing email, VAT/tax handling.

Mini-architect pass produces architect-YYYY-MM-DD.md when Stage 5 starts.
Stage 5 must not begin before Stage 4 is live, because the paid tier UI lives
on the main site, not on the calculator subpage.

---

## CLAUDE.md amendments

When Stage 2 begins, append to the "Files in this project" table:
- `app/(site)/account/chart/[id]/page.tsx` - signed-in chart view (Stage 2)
- `components/BaguaDiagram.tsx` - inline SVG octagon (Stage 2)
- `components/DirectionTable.tsx` - color-coded table (Stage 2)
- `app/actions/save-chart.ts` - server action persisting to saved_charts
- `app/actions/email-chart.ts` - server action sending the chart email
  (Stage 3)
- `public/chart-print.css` - print stylesheet for the chart page (Stage 2)

The hard rules in CLAUDE.md already cover the account layer's deliberate
data storage; no further amendments needed.

---

## Per-stage protocol (Ralph)

For each stage:
1. Owner says "let's start Stage N" or equivalent.
2. Architect mini-pass for Stages 4 and 5 (not needed for 2 and 3, which are
   detailed above). Owner approves the mini-spec.
3. Expand the task list above into a fresh prd.json mini-batch.
4. Implement each task to its acceptance criteria, self-review, set
   passes:true, append a learning paragraph to progress.txt dated YYYY-MM-DD.
5. End-of-stage: smoke-test on the live site, then owner approves before the
   next stage starts.

Honest framing applies at every line of new copy. Zero em dashes anywhere.

---

## Approval

**APPROVED 2026-05-24** by the owner with two confirmed decisions:
1. Stage 3 uses a Next.js server action for email-sending (not a Supabase
   Edge Function). Simpler; reuses the Resend wiring already in auth.ts.
2. Stage 5 begins only after Stage 4 is live. Order: 2 -> 3 -> 4 -> 5.

Execution begins in a future session when the owner says "let's start
Stage 2" (or similar). Stages 4 and 5 each get their own mini-architect pass
when they start.
