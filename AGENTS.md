# Codex Instructions For kua-calculator

Follow the project brief in [CLAUDE.md](CLAUDE.md). This file exists so Codex and Claude Code can work in the same folder with the same assumptions.

## Project Role

`kua-calculator` is the live My Feng Shui Home funnel and product site. It is a Next.js App Router app that provides the free Kua calculator, email capture/account features, methodology content, and paid-product pages.

## Commands

- Install dependencies: `npm install`
- Development server: `npm run dev`
- Production check: `npm run build`
- Production server after build: `npm run start`

Use the existing package scripts. Do not introduce a new framework, bundler, auth system, database client, analytics stack, or styling system unless the user explicitly requests it.

## Hard Rules

- Keep the Kua calculator core and `/embed` privacy-pure: no third-party analytics, tracking, or server submission of anonymous birth data.
- Keep account behavior distinct from anonymous calculator behavior. Signed-in users may save charts and email data by design; anonymous calculator and embed use stay local/private.
- Do not commit or print secrets from `.env.local`.
- Preserve the existing Next.js, Auth.js v5, Supabase-as-database architecture.
- Use inline SVG only for diagrams and product visuals unless the user explicitly approves another asset type.
- Maintain accessibility on every UI change: labels, keyboard access, visible focus rings, semantic structure, and sufficient contrast.
- Do not use em dashes in copy or docs. Rephrase or use ` - `.
- Do not promise Feng Shui outcomes. Use honest framing such as `traditional guidance`, `decision tool`, `supports the conditions for`, `try`, `observe`, and `may`.

## Copy And Product Rules

- Brand voice: calm, practical, clear, warm, and authoritative without sounding mystical or pushy.
- Explain Kua as a structured decision tool, not a fortune or guarantee.
- Verify any product catalogue, price, page count, upsell, or paid-offer claim against current site copy before changing related text.
- For personalized PDFs, do not infer memories, health, relationships, personality, floor plan, or life outcomes from birth data alone.
- Before changing Kua formulas, gender handling, Chinese New Year cutoff logic, or direction mappings, inspect `public/calculator/`, `lib/kua.ts`, `lib/cny.ts`, `lib/directions.ts`, and the methodology content.

## Coordination With Claude Code

- Treat `CLAUDE.md` as the detailed source of truth for project history, file map, and task protocol.
- Keep edits scoped to the requested task. Do not reformat unrelated files.
- If Claude Code has uncommitted changes, work around them and do not revert them.
- For Ralph tasks, follow the `prd.json` and `progress.txt` protocol described in `CLAUDE.md`.
