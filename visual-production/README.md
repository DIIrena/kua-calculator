# visual-production (staging wall)

This folder is the protected staging area for the **Visual Production Agent**. Full spec: `../spec/phase-h2-visual-production-agent-plan.md`.

Everything here is **draft and review material only**. Nothing in this folder is ever served by the website. Next.js serves `public/` only. Approved files reach `public/` through a separate, owner-triggered wiring task, never from here directly.

## The hard wall

- The agent's write scope is fenced to `visual-production/` only.
- It never writes `public/`. It never edits a code file (`app/`, `components/`, `lib/`, including `lib/product-assets.ts`), checkout, Stripe, cart, the calculator, the guide, editorial, search, or the chooser.
- It never publishes, wires, or overwrites an approved asset.
- Crossing into `public/` plus code is always a separate task the owner triggers.

## Folder map

| Folder | Holds | Git |
|---|---|---|
| `prompts/<batch>/` | Owner-approved prompt files, one `.md` per asset | tracked |
| `drafts/<batch>/<asset-id>/` | Raw generated variations (3 to 6 image, 2 to 3 video) | ignored |
| `contact-sheets/<batch>/` | One labelled grid per asset (binaries) + the `<batch>.md` index | binaries ignored, `.md` tracked |
| `approved/<mirror-of-public-path>/` | Owner-selected finals staged in their final `public/` path shape | ignored |
| `manifests/manifest.json` | Machine-readable source of truth | tracked |
| `manifests/<batch>.md` | Human review sheet | tracked |

Only this `README.md` exists at scaffold time. The subfolders above are created by the first production run, each behind its own reviewed step. No draft image or video folders exist yet.

## Review workflow

draft -> contact sheet -> owner selects -> owner approves -> (separate) wiring task installs into `public/`.

The agent stops at `approved/`. The owner does the Illustrator layout for covers and pins, and triggers wiring.

## Generation and brand rules (canonical list in the spec)

- 3 to 6 variations per image, 2 to 3 per video, always a contact sheet.
- never overwrite an approved asset or anything in `public/`; never publish.
- Palette: ivory `#fcfcf8`, deep green `#0e3b2c`, true orange `#d9531a` as the single accent only (never a background or text colour).
- Architecture-led identity: diagrams, floor plans, calm editorial-atelier. No faces (the author is "I.D."), no generic stock, no dark or cluttered interiors.
- No fake testimonials. No fortune-telling language (no "activate", "manifest", "charge"), no outcome promises, no consultation language, no urgency.
- Banned objects: Buddha statues, incense, red envelopes, coins, money trees, dragons, Chinese-character overlays, lucky bamboo, oranges the fruit, bagua mirrors, glowing or energy effects.
- Generated diagrams and pins carry no baked-in title text; the owner sets type and final layout in Illustrator.
