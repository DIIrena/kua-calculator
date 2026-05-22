# kua-calculator

Workspace brief: see [../../CLAUDE.md](../../CLAUDE.md).
Architect spec: see [spec/architect-2026-05-22.md](spec/architect-2026-05-22.md) (Phase 3). Earlier: [spec/architect-2026-05-13.md](spec/architect-2026-05-13.md).

A free web tool that returns a reader's Kua number, East/West group, and the eight personal directions (four favourable, four unfavourable) with plain-English meanings. The first product of My Feng Shui Home. Top-of-funnel acquisition channel. As of Phase 3 it also offers an optional free account (email capture) for saving and emailing a chart.

## Stack (Phase 3 onward)

Next.js (App Router, TypeScript) on Vercel + Supabase. Flask and Render are retired. The calculation is unchanged vanilla JS reused as a static island. No build step beyond `next build`.

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
| `app/auth/` | `callback` and `sign-out` route handlers. |
| `app/globals.css` | Screen styles (migrated from the old `main.css`). |
| `app/robots.ts` | AI-bot policy. |
| `components/` | `SiteHeader`, `SiteFooter`, `CalculatorIsland`, `CalculatorScripts`, `AuthForm`. |
| `lib/supabase/` | `client`, `server`, `middleware` Supabase clients. |
| `lib/markdown.ts` | Build-time markdown rendering (remark + remark-gfm + rehype-slug). |
| `proxy.ts` | Refreshes the Supabase session each request (Next 16 renamed `middleware` to `proxy`). |
| `public/calculator/` | The four calculator JS files (`cny`, `directions`, `kua`, `ui`), reused byte-for-byte. |
| `public/print.css` | Print-friendly result card. |
| `supabase/migrations/0001_init.sql` | Schema: `profiles`, `saved_charts`, RLS, `handle_new_user` trigger. |
| `.env.example` | Documents the four environment variables. |
| `README.md` | Run + deploy instructions. |

## Shared agent context

```
Project:        kua-calculator (first product of My Feng Shui Home)
Client:         Internal
Brand voice:    Calm, authoritative, clear. Practical not woo. Plain English.
                Honest framing: Kua is a structured decision tool, not a fortune.
Tech stack:     Next.js (App Router, TypeScript), Vercel, Supabase (auth +
                Postgres + RLS). Markdown rendered at build time. The Kua
                calculation is client-side vanilla JS, reused unchanged.
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
- **The account layer (sign-in, account, dashboard) deliberately uses Supabase
  and stores account-holder data**: the email a user signs up with, and the
  birth data / charts they choose to save. This is intentional and was
  approved in Phase 3. It does not apply to anonymous calculator use or to
  `/embed`, which remain privacy-pure. Privacy copy must keep this distinction
  clear (see `app/(site)/privacy/page.tsx` and the calculator FAQ).
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

Four, documented in `.env.example`: `NEXT_PUBLIC_SUPABASE_URL`,
`NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`,
`NEXT_PUBLIC_SITE_URL`. The public pages build and run with placeholders;
only live auth needs real keys. Never commit `.env.local`.
