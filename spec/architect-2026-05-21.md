# Architect Spec - kua-calculator Phase 2

Date: 2026-05-21
Phase: 2 (Content rewrite + full rebrand)
Status: AWAITING APPROVAL

---

## Context

Phase 1 (the 9-task build) shipped a working calculator. Deploy prep is done
(git repo, GitHub at github.com/DIIrena/kua-calculator, requirements.txt,
render.yaml). Before deploying, the user wants the methodology page content
rewritten and the whole site rebranded around a new logo and color. A separate
accounts + email capture feature is deferred to Phase 3.

---

## PROJECT BRIEF

```
Name:          kua-calculator - Phase 2
Type:          tool (existing) - content rewrite + full rebrand
Client:        Internal
Deliverables:  1. methodology.md rewritten (sources paragraph removed,
                  text restructured for clarity/flow using marketing skills)
               2. Full rebrand applied via ui-ux-pro-max across all views
               3. QA pass: accessibility, honest-framing, route check
Deadline feel: normal
Dependencies:  - Logo vector file (user to provide) blocks the rebrand task.
               - Content rewrite (Task 1) finishes before rebrand (Task 2),
                 so the rebrand styles the final content.
               - QA (Task 3) runs last.
Tech stack:    Unchanged - Python 3 + Flask, vanilla HTML/CSS/JS, uv,
               markdown rendered server-side. No build step.
Assets:        New: logo (heart-and-house, user-provided vector), brand color
               #FF6200. 5 templates, main.css (1172 lines), print.css (165),
               methodology.md (338 lines, 9 sections).
```

---

## EXECUTION MODEL

Single-agent scoring:
- Completable in one continuous flow: YES
- Touches only one domain: NO (content + frontend)
- Under ~2 hours: NO
- Tasks sequential, each dependent on the last: YES
- Context from one step critical to the next: YES
- Iteration on something already built: YES
Single-agent YES: 4

Multi-agent scoring: 0 (2 domains, sequential, single session, no backend).

**EXECUTION MODEL: SINGLE AGENT** - two related tasks on a small existing app,
done sequentially by one agent holding the whole picture.

---

## Decisions confirmed with the user (2026-05-21)

1. Methodology page stays an educational reference. Rewrite uses the marketing
   skills for **structure, clarity, and flow only** - not for hype. Honest
   framing and the limitations section are preserved.
2. The "copy chapter 6 verbatim" hard rule is **overridden for kua-calculator
   only**. The feng-shui dashboard's chapter 6 is left untouched.
3. Accounts + email capture is **deferred** to Phase 3 (separate spec).
4. This is a **full rebrand**, not a redesign (supersedes the earlier A1):
   - Brand color: **#FF6200** (rgb 255, 98, 0), a vivid orange.
   - Palette direction: **bold orange-forward** - orange hero panels and
     blocks, white text on orange, near-black text on white.
   - Typography: **modern geometric/grotesk sans** (not Inter/Roboto/Arial).
     The old Fraunces + Spectral serifs are retired.
   - Logo: the user-provided heart-and-house mark, used as-is, recolored to
     #FF6200. Applied across all views.
5. Rebrand applies to **all three views** - calculator, methodology, embed.

---

## NEW BRAND SYSTEM (proposal - confirm or correct on approval)

```
COLOR
  Primary       #ff6200  orange   (hero panels, CTAs, blocks, logo)
  Primary deep  #d94f00  orange-dark (hover/active states, on-orange borders)
  Ink           #1a1a1a  near-black text on light surfaces
  Surface       #ffffff  white base
  Surface alt   #f5f3f0  light warm-grey section background
  On-orange     #ffffff  white text/icons on orange panels
  Hairline      #e4e0da  light borders / rules

RESULT CARD CODING (favourable vs unfavourable directions)
  Favourable    orange accent + filled star icon + solid left border
  Unfavourable  neutral dark grey + cross icon + dashed left border
  3 redundant cues (icon, border style, label text) keep it readable in
  greyscale and for colourblind users - existing print.css requirement holds.

TYPOGRAPHY  (Google Fonts, geometric grotesk, all distinctive)
  Display/headings   Space Grotesk
  Body/UI            Hanken Grotesk
  Both retired:      Fraunces, Spectral
```

If you want different fonts or neutral tones, say so on approval and I will
adjust before building.

---

## Assumptions to confirm

- A2 (confirmed YES): rebrand covers all three views. Embed stays structurally
  minimal (no header/footer) but inherits the new component styling and logo.
- A3: no new pages, routes, or calculator-page copy. Phase 2 is rewrite +
  rebrand of what exists.

---

## SKILLS AUDIT

Skills to load:
- skills/shared/marketing/copywriting.md        -> Task 1 (headlines, structure)
- skills/shared/marketing/content-strategy.md   -> Task 1 (hierarchy, scannability)
- skills/shared/marketing/marketing-psychology.md -> Task 1 (clarity/flow, NOT hype)
- skills/shared/SKILL_UI_UX_PRO_MAX.md          -> Task 2 (rebrand)
- skills/shared/SKILL_FRONTEND_DESIGN.md        -> Task 2 (avoid generic AI look)
- skills/shared/SKILL_RALPH_LOOP.md             -> drives the 3-task build

Notes:
- social-content.md: built for social-media posts, not page content. Not loaded.
- page-cro.md: light reference only; Phase 2 adds no new conversion elements.

Skills gap: NONE. Landing-page copywriting is covered by copywriting +
page-cro; no new skill needed.

---

## TASK BREAKDOWN (written into prd.json on approval)

Order of execution: CONTENT-002 and BRAND-BOOK-001 first (independent),
then REBRAND-001 (implements the brand book), then REBRAND-QA-001.

**CONTENT-002 - Rewrite the methodology page**
- Delete the final "## Sources informing this chapter" paragraph entirely.
- Rewrite all 9 sections of methodology.md for structure, clarity, and flow:
  tighter sentences, stronger hierarchy, better scannability, clear topic
  sentences, smoother transitions. Apply copywriting + content-strategy.
- Preserve: all factual content, the worked examples, section 8 "Limitations
  and honesty", and honest framing in every line.
- No outcome promises. No em dashes. No hype.
- Acceptance: /methodology renders with no console errors; sources paragraph
  gone; zero em dashes; zero outcome promises; all 9 topics still covered;
  headings still produce stable slugs.

**BRAND-BOOK-001 - Create the brand book**
- Write a complete brand book to projects/kua-calculator/brand/BRAND_BOOK.md.
- Sections: brand overview/positioning, logo (mark, clear space, sizing,
  do/don't), color palette (primary/neutral/semantic, hex+rgb, usage ratios,
  contrast pairs), typography (Space Grotesk + Hanken Grotesk, scale, weights,
  usage), writing voice and tone (principles, honest-framing rules, do/don't
  word lists), UI design tokens (buttons, cards, spacing, radius, shadows),
  accessibility standards, iconography (inline SVG), application examples.
- The brand book is the single source of truth REBRAND-001 implements.
- Acceptance: file exists and is complete; zero em dashes; every color pair
  documented with its contrast ratio; consistent with the confirmed decisions.

**REBRAND-001 - Rebrand the site (ui-ux-pro-max)**
- Implements BRAND-BOOK-001. Logo vector received (dependency resolved).
- Replace the palette with the orange-forward system; swap fonts to the
  geometric grotesk pair; inline the recolored logo SVG into base.html / a
  shared partial; restyle base.html, index.html, _calculator.html,
  methodology.html, embed.html, main.css, print.css.
- Apply SKILL_UI_UX_PRO_MAX to layout, hierarchy, components, spacing,
  interaction states, and polish.
- Acceptance: all routes load without console errors; 4.5:1 contrast on all
  text (including white-on-orange); visible focus rings; keyboard-operable;
  labels on every input; reduced motion respected; print stylesheet correct;
  embed view still minimal; logo renders crisp at all sizes.

**REBRAND-QA-001 - QA and verification pass**
- Accessibility audit (contrast, focus, keyboard, labels, landmarks).
- Honest-framing audit across all visible copy.
- Verify /, /methodology, /embed render correctly; verify the calculation
  (calculateKua(1978,'male')=>4, calculateKua(1985,'female')=>9).
- Acceptance: all pass; progress.txt updated.

---

## CLAUDE.md changes required on approval

1. Amend the "copy chapter 6 verbatim" hard rule to record the override:
   methodology.md is now independently authored for kua-calculator.
2. Update the "Shared agent context" block: new palette (#FF6200 orange-forward,
   white/near-black neutrals), new fonts (Space Grotesk + Hanken Grotesk),
   new logo. The old parchment/terracotta/sage + Fraunces/Spectral lines are
   replaced.

---

## Dependency - RESOLVED

The logo vector file is received (Myfengshui SVG, a clean 4-path mark: heart
outline, roof, dot, base). Saved to projects/kua-calculator/assets/logo.svg,
recolored from #000000 to #ff6200. REBRAND-001 is unblocked. The logo will be
inlined into base.html / a shared partial during that task.

---

## Per-task protocol

Standard Ralph: implement to acceptance criteria, self-review, set passes:true
in prd.json, append a learning paragraph to progress.txt dated 2026-05-21.
Per the user's standing preference, once this spec is approved all three tasks
run autonomously without waiting for "next" between them.
