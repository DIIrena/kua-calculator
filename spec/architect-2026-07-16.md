# Architect spec - Personal Feng Shui Compass v2 (2026-07-16) - APPROVED

Owner approved this spec via plan review on 2026-07-16. Full plan:
`~/.claude/plans/hi-fable-i-want-adaptive-wozniak.md`.

## Brief

```
PROJECT BRIEF
Name:          Personal Feng Shui Compass v2 (kua-calculator)
Type:          content + product (personalized PDF upgrade)
Client:        Internal (My Feng Shui Home)
Deliverables:  Rewritten direction chapters, find-your-directions chapter,
               hard-cases FAQ chapter, 3 printable worksheets, per-chapter
               SVG diagrams, updated recipes/page bands for 3 products,
               updated sales pages, attribution ledger, passing smoke tests
Deadline feel: normal
Dependencies:  SVG tokens -> chapter rewrites -> recipes/bands -> sales copy
Tech stack:    Existing block engine (markdown + tokens + inline SVG +
               Puppeteer PDF). No new dependencies.
Assets:        22-chapter audited library, 30+ books in feng-shui/resources,
               practitioner-voice skill, UI/UX Pro Max skill, brand book
```

## Execution model

EXECUTION MODEL: SINGLE AGENT (Ralph) - sequential content work on an
existing build; one voice must stay consistent across every chapter;
shared block files forbid parallel agents.

## Why (the five gaps found in analysis)

1. No "find your directions" chapter in the flagship (the phone-compass
   walkthrough exists only in pillar blocks).
2. Zero real home examples; blocks predate the practitioner-voice skill.
3. Zero worksheets/templates.
4. Almost no visuals; direction chapters are unbroken text.
5. Sales page promises 25-30 pages; recipe targets 20-26.

## Decisions taken with the owner

- Quality bar: best personal feng shui guide on the market; a one-sitting
  read; buyers finish satisfied and empowered.
- New chapters + worksheets flow to all three tiers (Personal $14,
  Extended $39, Complete Home $49). Direction-chapter upgrades flow
  automatically because blocks are shared.
- Price decision deferred until v2 is reviewed.

## Skills audit (no gaps)

- skills/shared/feng-shui-practitioner-voice/SKILL_FENG_SHUI_PRACTITIONER_VOICE.md -> chapter rewrites
- skills/shared/marketing/voice-storytelling-copy.md -> vignettes, welcome/closing
- skills/shared/SKILL_UI_UX_PRO_MAX.md -> PDF typography, worksheet layout
- skills/shared/SKILL_FRONTEND_DESIGN.md + marketing/page-cro.md -> sales pages

## Task list

CV2-001 .. CV2-014 appended to prd.json (see there for acceptance criteria).
Scope guard: no room-by-room content beyond the existing bed/desk/dining
applications - that territory belongs to the Twelve Spaces Compass.

## Hard rules carried through

No em dashes. No outcome promises. Inline SVG only. Paraphrase-only from
resource books with ATTRIBUTION_BLOCKS.md updated. Six-section practitioner
template for practical chapters. Max two technical terms per paragraph.
4.5:1 contrast. Brand palette per brand/BRAND_BOOK.md.
