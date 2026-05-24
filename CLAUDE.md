# kua-calculator

Workspace brief: see [../../CLAUDE.md](../../CLAUDE.md).
Architect spec: see [spec/architect-2026-05-24.md](spec/architect-2026-05-24.md) (Stages 2-5 plan, DRAFT). Earlier: [spec/architect-2026-05-22.md](spec/architect-2026-05-22.md) (Phase 3 Stage 1), [spec/architect-2026-05-13.md](spec/architect-2026-05-13.md).

A free web tool that returns a reader's Kua number, East/West group, and the eight personal directions (four favourable, four unfavourable) with plain-English meanings. The first product of My Feng Shui Home. Top-of-funnel acquisition channel. As of Phase 3 it also offers an optional free account (email capture) for saving and emailing a chart.

## Stack (Phase 3 onward)

Next.js (App Router, TypeScript) on Vercel. **Auth.js v5 (NextAuth)** runs on the Next.js server for sign-in (Google OAuth + Resend magic-link email). **Supabase is the database only** (Postgres + the `@auth/supabase-adapter` tables in the `next_auth` schema). Flask and Render are retired. The calculation is unchanged vanilla JS reused as a static island. No build step beyond `next build`.

## Files in this project

| File / folder | Purpose |
|---|---|
| `prd.json` | Ralph task list. |
| `progress.txt` | Append-only learnings log. One paragraph per finished task. |
| `spec/` | Architect specs. |
| `content/methodology.md` | Self-contained Compass School deep-dive. Rendered at `/methodology` at build time. |
| `app/layout.tsx` | Root layout: `<html>`, fonts (`next/font`), `globals.css`. |
| `app/(site)/` | Route group with the SiteHeader / SiteFooter chrome: calculator, methodology, sign-in, account, privacy. |
| `app/embed/` | Chrome-free iframe-embeddable calculator. |
| `app/api/auth/[...nextauth]/route.ts` | Auth.js v5 catch-all GET/POST handler. |
| `app/actions/sign-out.ts` | Server action that clears the NextAuth session. |
| `app/globals.css` | Screen styles (migrated from the old `main.css`). |
| `app/robots.ts` | AI-bot policy. |
| `auth.ts` | Auth.js v5 config: Google + Resend providers, Supabase adapter, branded magic-link email. Exports `auth`, `signIn`, `signOut`, `handlers`. |
| `components/` | `SiteHeader`, `SiteFooter`, `CalculatorIsland`, `CalculatorScripts`, `AuthForm`, `SignOutButton`. |
| `lib/supabase/server.ts` | Service-role Supabase DB client. No auth wiring. |
| `lib/markdown.ts` | Build-time markdown rendering (remark + remark-gfm + rehype-slug). |
| `lib/kua.ts` | Server-side port of the Kua calculation (Stage 2). |
| `lib/directions.ts` | Server-side port of the Eight Mansions lookup (Stage 2). |
| `lib/cny.ts` | Server-side port of the Chinese New Year adjustment (Stage 2). |
| `components/BaguaDiagram.tsx` | Inline-SVG bagua chart (Stage 2). |
| `components/DirectionTable.tsx` | Color-coded direction table (Stage 2). |
| `components/ChartPrintButton.tsx` | Tiny client component triggering window.print() (Stage 2). |
| `app/actions/save-chart.ts` | Server actions: saveChart, deleteChart (Stage 2). Auto-sends chart email on save when opt-in is true. |
| `app/actions/email-chart.ts` | Server actions: sendChartEmail (button), sendChartEmailInternal (auto-send). (Stage 3). |
| `app/(site)/account/chart/[id]/page.tsx` | Auth-gated chart view: bagua + cards + Email + Print + Delete. (Stages 2, 3). |
| `lib/email-chart.ts` | HTML + text email renderer for the chart email (Stage 3). |
| `lib/rate-limit.ts` | Per-user-per-day chart-email rate limiter (Stage 3). |
| `lib/resend.ts` | Minimal Resend HTTP helper used by chart email (Stage 3). |
| `supabase/migrations/0003_email_sends.sql` | Rate-limit counter table for the chart email (Stage 3). |
| `public/calculator/` | The four calculator JS files (`cny`, `directions`, `kua`, `ui`), reused byte-for-byte. |
| `public/print.css` | Print-friendly result card. |
| `supabase/migrations/0001_init.sql` | Original schema (superseded by 0002). |
| `supabase/migrations/0002_nextauth.sql` | Current schema: `next_auth` adapter tables, recreated `profiles` + `saved_charts` (FK to `next_auth.users`, RLS off), new-user trigger. |
| `.env.example` | Documents the seven environment variables. |
| `README.md` | Run + deploy instructions. |

## Shared agent context

```
Project:        kua-calculator (first product of My Feng Shui Home)
Client:         Internal
Brand voice:    Calm, authoritative, clear. Practical not woo. Plain English.
                Honest framing: Kua is a structured decision tool, not a fortune.
Tech stack:     Next.js (App Router, TypeScript), Vercel, Auth.js v5
                on the Next.js server (Google + Resend magic link),
                Supabase as the Postgres database. Markdown rendered at
                build time. The Kua calculation is client-side vanilla
                JS, reused unchanged.
Output targets: app/, components/, lib/, public/, supabase/, content/
Do NOT:         - Use em dashes anywhere (workspace rule).
                - Promise outcomes. Use "supports the conditions for" language.
                - Add analytics or trackers to the calculator core or /embed.
                  Those must stay embeddable with no third-party dependencies.
Conventions:    - Accessibility-first: labels for all inputs, aria where needed,
                  visible focus rings, semantic landmarks, 4.5:1 min contrast.
                - Typography: Hanken Grotesk (interface) + Bilbo Swash Caps
                  (signature only). Loaded via next/font/google.
                - Palette: warm naturals. Cream #f1e9d8 canvas, sand #e0d3b8,
                  paper #fbf7ee cards, olive green #4f5a36, clay #be6b43,
                  deep ink #2a271e. Full system in brand/BRAND_BOOK.md.
```

## Hard rules

- No em dashes anywhere. Use " - " or rephrase.
- Honest framing in every line of copy. No outcome promises.
- The Kua **calculation** runs entirely client-side in vanilla JS. The
  calculator core and the `/embed` widget never send birth data anywhere and
  carry no third-party dependencies.
- **The account layer (sign-in, account, dashboard) deliberately stores
  account-holder data**: the email a user signs up with, and the birth
  data / charts they choose to save. Auth runs on the Next.js server
  via Auth.js v5 (Google + Resend magic link); Supabase stores the data.
  This is intentional and was approved in Phase 3. It does not apply to
  anonymous calculator use or to `/embed`, which remain privacy-pure.
  Privacy copy must keep this distinction clear (see
  `app/(site)/privacy/page.tsx` and the calculator FAQ).
- Inline SVG only, no raster images.
- Accessibility checks at every UI task: contrast, focus, keyboard, labels.

## Per-task protocol (Ralph)

For each task in `prd.json`: implement to the acceptance criteria, self-review,
set `passes: true`, append one paragraph to `progress.txt` leading with the
learning. (`prd.json` / `progress.txt` are owned by the parent session during
the Phase 3 staged build.)

## Acceptance bar (every task)

- All acceptance criteria in `prd.json` met. Zero em dashes. Zero outcome promises.
- For UI: 4.5:1 contrast, visible focus rings, keyboard-operable, labels on every input.
- For routes: `npm run build` succeeds and `npm run start` serves the page without errors.

## Env vars

Seven, documented in `.env.example`:

- Auth.js: `AUTH_SECRET`, `AUTH_GOOGLE_ID`, `AUTH_GOOGLE_SECRET`, `AUTH_RESEND_KEY`
- Supabase (database): `NEXT_PUBLIC_SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`
- Site: `NEXT_PUBLIC_SITE_URL`

The public pages build and run with placeholders; only live auth needs
real keys. Never commit `.env.local`.
