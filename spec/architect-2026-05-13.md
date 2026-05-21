# kua-calculator - Architect Spec

Date: 2026-05-13
Architect: Project Architect skill (skills/shared/SKILL_PROJECT_ARCHITECT.md)
Source brief: projects/feng-shui/spinoff-projects.md entry #1 (Kua Number Calculator Web App)
Status: DRAFT - awaiting user approval before Ralph loop starts.

---

## 1. Project brief

```
PROJECT BRIEF
Name:          kua-calculator
Type:          tool (single-page web app, optionally embeddable widget)
Client:        Internal (top-of-funnel acquisition channel for the feng-shui dashboard)
Deliverables:  Flask web app that takes birth year + gender (optional second occupant)
               and returns Kua number, East/West group, 4 favourable + 4 unfavourable
               directions with plain-English meanings, plus a print-friendly result card,
               a self-contained "methodology" page (copy of feng-shui chapter 6), and
               an iframe-embed variant.
Deadline feel: Normal - single weekend of focused work.
Dependencies:  Feng-shui chapter 6 content (already written) is the methodology source.
               Copied into this project as content/methodology.md to keep the calculator
               fully self-contained.
Tech stack:    Python 3, Flask, vanilla HTML/CSS/JS (no framework), uv for deps.
               Markdown rendered server-side at request time (same pattern as feng-shui).
               Calculation logic runs client-side in vanilla JS for instant results.
Assets:        - projects/feng-shui/content/06-compass-school.md  → copied as methodology.md
               - Brand voice already locked in feng-shui's content/00-scope.md (calm,
                 authoritative, practical, no fortune-cookie phrasing).
```

---

## 2. Architecture decision

### Single-agent signals (6)

- Completable in one continuous flow? **YES** - weekend build, fits one or two sessions.
- Touches only one domain? **YES** - frontend tool, all code, no separate copy/data/infra workstreams.
- Under ~2 hours of work? **NO** - closer to a weekend, but still small.
- Tasks sequential, each dependent on the last? **YES** - logic before UI before polish.
- Context from one step is critical to the next? **YES** - calculation rules drive UI.
- Iteration on something already built? **NO** - new project.

Single-agent YES count: **5**

### Multi-agent signals (6)

- 3+ distinct skill domains involved? **NO** - frontend + light SEO copy, two domains, not three.
- Workstreams can run in parallel without blocking each other? **NO** - UI depends on logic.
- One agent would lose context trying to hold all of this? **NO** - small surface area.
- Clear writer+editor or build+review loop needed? **NO**.
- Cross-layer output (frontend + backend + content + infra)? **NO** - primarily one layer.
- Will this take more than one Claude Code session? **PROBABLY NO** - one or two at most.

Multi-agent YES count: **0**

### Verdict

**EXECUTION MODEL: SINGLE AGENT** - small, single-domain, sequential build with a clean task chain.

(Single-agent count is 5, well above the 4 threshold. Multi-agent count is 0. No team needed.)

---

## 3. Team assembly

Not applicable. Single-agent build. The agent that executes Ralph is also the implementer.

If a sub-topic needs deeper sampling later (unlikely for this scope), the agent may spawn an Explore subagent for a tightly-scoped task, per the workspace convention.

---

## 4. Shared agent context

This block is written into `projects/kua-calculator/CLAUDE.md` after spec approval.

```
Project:        kua-calculator (top-of-funnel feng shui acquisition tool)
Client:         Internal
Brand voice:    Calm, authoritative, clear. Practical not woo. Plain English.
                Honest-framing: Kua is a structured decision tool, not a fortune.
                Inherits voice from projects/feng-shui/content/00-scope.md.
Tech stack:     Python 3 + Flask, vanilla HTML/CSS/JS, uv for deps,
                markdown rendered server-side, calculation logic client-side JS.
                No build step. No framework. No external image files.
Output targets: app/ (Flask app, templates, static), content/methodology.md
Do NOT:         - Use em dashes anywhere (workspace rule).
                - Promise outcomes (sleep + bed direction will not guarantee anything;
                  use "supports the conditions for" language, never "will give you").
                - Hardcode any Kua-direction table without consulting chapter 6 wording.
                - Translate or paraphrase chapter 6 - copy verbatim into methodology.md
                  since both projects are under the same internal authorship.
                - Add analytics, trackers, or third-party scripts. The page must be
                  embeddable in arbitrary parent sites without dragging in dependencies.
Conventions:    - File naming: lowercase-hyphens for templates and static files.
                - One module per concern in static/js (kua.js, directions.js, ui.js).
                - All accessibility-relevant attributes present (labels, aria, focus).
                - Print stylesheet via @media print, not separate template.
```

---

## 5. Skills audit

Reading `skills/SKILLS_INDEX.md`:

**Skills to load (existing, applicable):**

- `skills/shared/SKILL_FRONTEND_DESIGN.md`  →  the single agent, for distinctive, production-grade UI that avoids generic AI aesthetics. Required for the calculator landing page and the result card.
- `skills/shared/SKILL_UI_UX_PRO_MAX.md`    →  the single agent, for the UX polish step (accessibility, colour, typography, friction removal).
- `skills/shared/marketing/copywriting.md`  →  the single agent, for the SEO landing copy and the headline-and-CTA pass.
- `skills/shared/marketing/ai-seo.md`       →  the single agent, for the SEO-001 task (the brief explicitly names search-traffic as the primary audience).
- `skills/shared/SKILL_RALPH_LOOP.md`       →  drives the build itself.

**Skills gap (do not exist yet):** None.

All required skills exist. No skill creation needed before starting.

---

## 6. Project file structure

After spec approval, this is what gets created:

```
projects/kua-calculator/
├── CLAUDE.md                       project brief + shared agent context block
├── prd.json                        Ralph task list (9 tasks, defined below)
├── progress.txt                    append-only learnings log (empty at start)
├── spec/
│   └── architect-2026-05-13.md     this file
├── content/
│   └── methodology.md              copy of feng-shui chapter 06-compass-school.md
├── app/
│   ├── app.py                      Flask app entry
│   ├── templates/
│   │   ├── base.html
│   │   ├── index.html              calculator landing page
│   │   ├── result.html             result card
│   │   ├── methodology.html        renders content/methodology.md
│   │   └── embed.html              iframe-friendly slim variant
│   └── static/
│       ├── css/
│       │   ├── main.css            screen styles
│       │   └── print.css           print-friendly result card
│       └── js/
│           ├── kua.js              calculation logic (pre/post-2000, both genders)
│           ├── directions.js       8-Kua direction-quality mapping + plain-English text
│           └── ui.js               form handling, result rendering, couples overlap
├── pyproject.toml                  uv-managed Python deps (flask, markdown)
├── README.md                       run instructions + deploy notes
└── .gitignore                      .venv, __pycache__, *.pyc, .env
```

---

## 7. Ralph task list (preview of prd.json)

Nine tasks, each atomic and acceptance-testable. Full prd.json gets written after spec approval.

| ID | Title | Why |
|---|---|---|
| SCAFFOLD-001 | Flask skeleton + project files | Empty app boots, base template renders, deps installed. |
| METHODOLOGY-001 | Copy chapter 6 into content/methodology.md, render via /methodology route | The "learn the methodology" page that result links into. |
| KUA-LOGIC-001 | static/js/kua.js - calculation for pre-2000 and post-2000, both genders, Kua 5 handling | Unit-testable function `kua(year, gender)` returns 1-9 with documented Kua 5 reassignment. |
| DIRECTIONS-001 | static/js/directions.js - 8-Kua direction-quality table + plain-English meanings for all 8 names (Sheng Qi, Tian Yi, Yan Nian, Fu Wei, Huo Hai, Wu Gui, Liu Sha, Jue Ming) | The lookup that drives the result card. Tied to chapter 6 wording. |
| UI-001 | Input form + single-occupant result card with all 8 direction-quality rows | The primary tool flow works end-to-end for one person. |
| COUPLES-001 | Optional second-occupant field; show overlapping favourable directions for shared rooms | Couples use case from the brief. |
| PRINT-001 | @media print CSS so the result card prints clean on one page | Print-friendly card from the brief. |
| SEO-001 | Landing-page headline + intro copy + meta description + structured data; in-result links to /methodology | The search-traffic acquisition angle from the brief. |
| EMBED-001 | /embed route with slim layout (no nav, no footer) sized for iframe; CORS-safe | The "optionally embeddable widget" from the brief. |

Total: 9 tasks. Honest framing applied throughout (no outcome promises in copy or result text).

---

## 8. Open questions (resolved at intake)

- **How does the calculator link to chapter 6?** Resolved: chapter 6 is copied into `content/methodology.md` and rendered at `/methodology`. The calculator is fully self-contained; no cross-project URL dependency.
- **Tech stack?** Resolved: Flask + vanilla JS (consistent with workspace, instant client-side calculation, server-renders SEO content).

---

## 9. Approval

Once the user approves this spec, the architect's job is done. The build proceeds via the Ralph loop (memory note: user prefers autonomous execution once a plan is approved - run all tasks in sequence, stop only on a genuine blocker).

Next steps on approval:

1. Create `projects/kua-calculator/` directory.
2. Write `CLAUDE.md` (using the shared context block in section 4).
3. Write `prd.json` (using the task list in section 7).
4. Touch empty `progress.txt`.
5. Begin SCAFFOLD-001.
