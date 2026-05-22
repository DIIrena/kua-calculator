# Architect Spec - kua-calculator Phase 3

Date: 2026-05-22
Phase: 3 (Accounts, email capture, and the Vercel + Supabase migration)
Status: APPROVED - Stage 1 in build

---

## Context

The Kua Calculator (brand: My Feng Shui Home) is built and branded (Phases 1-2).
The owner now wants it to grow into a product: a free calculator that captures
emails via accounts, gives account holders a chart, emails that chart, and later
supports paid tiers. Hosting moves off Render to Vercel + Supabase. The calculator
becomes the first subpage of a larger My Feng Shui Home knowledge site built later,
while still standing alone as a complete landing page.

The full approved plan (file tree, schema, task detail) lives in the approved plan
document; the executable task list is in prd.json (tasks NEXT-SCAFFOLD-001 through
DEPLOY-001).

---

## PROJECT BRIEF

```
Name:          kua-calculator - Phase 3
Type:          product build - hosting migration + accounts feature
Client:        Internal (My Feng Shui Home)
Deliverables:  Stage 1: Next.js app on Vercel + Supabase, calculator migrated and
               reused as-is at /kua-calculator, user accounts (magic link +
               Google), email capture, first live deploy.
               Stages 2-5: 2-color chart, emailed chart, the main site page,
               Stripe payments.
Deadline feel: normal; deploy Stage 1 as early as possible (owner's first deploy)
Dependencies:  Stage 1 first and approved before Stage 2. External account setup
               (Supabase, Google OAuth, Vercel) is required and is the owner's to do.
Tech stack:    Next.js (App Router, TypeScript) on Vercel; Supabase for auth +
               Postgres + (Stage 3) email; existing vanilla calculator JS reused.
Assets:        Existing calculator (kua.js, directions.js, cny.js, ui.js), brand
               (brand/BRAND_BOOK.md), content/methodology.md.
```

---

## ARCHITECTURE DECISION

**EXECUTION MODEL: HYBRID, multi-session, staged.** Stage 1 is a substantial
single-domain build (frontend + backend + infra) best done as a focused build with
the Ralph pattern; later stages are separate phases.

**Stack: Next.js (App Router, TypeScript) on Vercel + Supabase.** Reasoning: the
product will have paid, gated features (Stage 5). A static site can only gate
content client-side, which is bypassable. Next.js gates on the server, so paid
tiers are genuinely protected. The thin Flask server is dropped; the 100%
client-side calculator JS is reused unchanged as a vanilla island inside Next.js,
so there is no risky rewrite of the calculation code.

**Staged roadmap:**
- Stage 1: Migrate to Next.js/Vercel/Supabase + accounts + email capture. Calculator
  at /kua-calculator; / redirects to it. Ends with the first live deploy.
- Stage 2: 2-color chart (favourable / non-favourable - the honest Eight Mansions
  split; no neutral tier) for logged-in users.
- Stage 3: automatically emailed chart (Resend + a Supabase Edge Function).
- Stage 4: the My Feng Shui Home main page at / (the knowledge hub).
- Stage 5: Stripe payments, server-side gated.

---

## DECISIONS CONFIRMED WITH THE OWNER (2026-05-22)

1. Stack: Next.js on Vercel + Supabase (over a static site), because of future
   paid features.
2. Auth: Supabase Auth, magic link as the core method plus Google OAuth.
3. Stored data: for logged-in users, email + birth data + computed chart go in
   Supabase. Anonymous calculator use stays 100% client-side and private.
4. The chart is 2-color (favourable / non-favourable), not 3.
5. The calculator is a subpage (/kua-calculator) of a larger site; it also stands
   alone as a landing page. The main site page is a later stage.
6. Deploy early: Stage 1 goes live as soon as it works.

---

## SKILLS AUDIT

Skills to load during the build:
- skills/shared/SKILL_RALPH_LOOP.md       -> drives the staged Stage 1 build
- skills/shared/SKILL_UI_UX_PRO_MAX.md    -> the new sign-in / account / dashboard UI
- skills/shared/SKILL_FRONTEND_DESIGN.md  -> keeping new pages in the My Feng Shui
                                             Home brand
- skills/shared/marketing/copywriting.md  -> privacy page and account-page copy
- claude-code-guide / claude-api          -> reference for Next.js, Supabase auth,
                                             @supabase/ssr patterns

Skills gap: NONE. The Next.js + Supabase patterns are standard; no project-specific
skill needs creating.

---

## CLAUDE.md amendments required (Stage 1, PRIVACY-CLEANUP-001)

The hard rules written for the privacy-pure, dependency-free calculator era are
amended to record that:
- The account layer (sign-in, account, dashboard) deliberately uses Supabase and
  stores account-holder data. The calculator core and the /embed widget stay
  dependency-free and never send birth data anywhere.
- The stack is Next.js on Vercel + Supabase; Flask and Render are retired.

---

## Per-stage protocol

Ralph: implement each prd.json task to its acceptance criteria, self-review, set
passes:true, append a learning paragraph to progress.txt dated 2026-05-22. Stage 1
tasks: NEXT-SCAFFOLD-001, CALC-MIGRATE-001, SUPABASE-SCHEMA-001, AUTH-001,
ACCOUNT-001, PRIVACY-CLEANUP-001, DEPLOY-001. The owner approves Stage 1 (the live
deploy) before Stage 2 begins.
