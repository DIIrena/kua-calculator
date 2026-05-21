# kua-calculator

Workspace brief: see [../../CLAUDE.md](../../CLAUDE.md).
Architect spec: see [spec/architect-2026-05-13.md](spec/architect-2026-05-13.md).

A free single-page web tool that returns a reader's Kua number, East/West group, and the eight personal directions (four favourable, four unfavourable) with plain-English meanings. Top-of-funnel acquisition channel for the feng-shui dashboard. Inputs: birth year + gender, optional second occupant for couples.

## Files in this project

| File / folder | Purpose |
|---|---|
| `prd.json` | Ralph task list. 9 tasks. |
| `progress.txt` | Append-only learnings log. One paragraph per finished task. |
| `spec/architect-2026-05-13.md` | Architect spec. |
| `content/methodology.md` | Self-contained copy of feng-shui chapter 6 (compass school deep-dive). Rendered at `/methodology`. |
| `app/app.py` | Flask app entry. |
| `app/templates/` | base, index (calculator), result, methodology, embed. |
| `app/static/css/main.css` | Screen styles. |
| `app/static/css/print.css` | Print-friendly result card. |
| `app/static/js/kua.js` | Calculation logic, client-side. |
| `app/static/js/directions.js` | 8-Kua direction-quality table + plain-English text. |
| `app/static/js/ui.js` | Form handling, result rendering, couples overlap. |
| `pyproject.toml` | uv-managed Python deps (flask, markdown). |
| `README.md` | Run + deploy instructions. |
| `.gitignore` | Excludes `.venv/`, `__pycache__/`, `*.pyc`, `.env`. |

## Shared agent context

```
Project:        kua-calculator (top-of-funnel feng shui acquisition tool)
Client:         Internal
Brand voice:    Calm, authoritative, clear. Practical not woo. Plain English.
                Honest framing: Kua is a structured decision tool, not a fortune.
                Inherits voice from projects/feng-shui/content/00-scope.md.
Tech stack:     Python 3 + Flask, vanilla HTML/CSS/JS, uv for deps,
                markdown rendered server-side, calculation logic client-side JS.
                No build step. No framework. No external image files.
Output targets: app/ (Flask app, templates, static), content/methodology.md
Do NOT:         - Use em dashes anywhere (workspace rule).
                - Promise outcomes. Use "supports the conditions for" language,
                  never "will give you" or "guarantees."
                - Translate or paraphrase chapter 6. Copy verbatim into
                  methodology.md (internal authorship for both projects).
                - Add analytics, trackers, or third-party scripts. The page must
                  be embeddable in arbitrary parent sites with no dependencies.
Conventions:    - File naming: lowercase-hyphens for templates and static files.
                - One module per concern in static/js (kua.js, directions.js, ui.js).
                - Accessibility-first: labels for all inputs, aria where needed,
                  visible focus rings, semantic landmarks, 4.5:1 minimum contrast.
                - Print stylesheet via @media print, not separate template.
                - Distinctive typography (Fraunces display + Spectral body).
                  Never default to Inter/Roboto/Arial.
                - Palette inherits feng-shui dashboard: parchment background
                  (#f4ede2), ink (#2b261f), terra-cotta accent (#b06a45),
                  sage secondary (#5e7355).
```

## Hard rules

- No em dashes anywhere. Use " - " or rephrase.
- Honest framing in every line of copy. No outcome promises.
- Calculation runs entirely client-side in vanilla JS. Server does not see birth data.
- No external JS dependencies. No CDN scripts. No tracking pixels.
- Inline SVG only, no PNG/JPG files in static/.
- Accessibility checks at every UI task: contrast, focus, keyboard, labels.

## Per-task protocol (Ralph)

For each task in `prd.json`:

1. Implement to the acceptance criteria.
2. Self-review: read the changed files, verify acceptance criteria pass, run mental UX + accessibility check.
3. Edit `prd.json` and set `passes: true` on the task.
4. Append one paragraph to `progress.txt` in the format: `Task ID - 2026-05-13 - [what was learned or noticed].` Lead with the learning, not the action.

## Acceptance bar (every task)

- All acceptance criteria in `prd.json` met.
- Zero em dashes.
- Zero outcome promises in copy.
- For UI: 4.5:1 contrast on all text, visible focus rings, keyboard-operable, labels on every input.
- For routes: `uv run flask --app app.app run` loads the page without console errors.

## Env vars

None. The calculator is fully self-contained.
