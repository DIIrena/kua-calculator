# Phase H2: Visual Production Agent plan

**Date:** 2026-06-16
**Status:** Plan for review. No code, no images, no provider calls, no draft folders created. Nothing published. The staging wall (README + .gitignore) is scaffolded; no draft binaries exist yet.

## What this is

The operational layer under Phase H. `spec/phase-h-visual-media-system-2026-06-16.md` is the dashboard: it decides what to make, the brand rules, the prompts, the priority order, and the install map. This file defines the **Visual Production Agent** that does the mechanical production work behind those decisions: it turns an owner-approved prompt into organized draft variations, contact sheets, a manifest record, and review-ready files, with a hard wall between "draft" and "published."

Priority order, prompts, and identity rules are inherited from Phase H and its referenced specs (`featured-product-asset-system.md`, `phase-f-promotion-2026-06-16.md`, `brand-pin-palette.md`). When this file and one of those disagree on a brand or prompt detail, the referenced spec wins; this file owns only the production workflow, the folders, and the manifest.

## 1. Agent purpose

A production assistant, not an art director. It does not invent concepts, pick products, write prompts from scratch, or decide what ships. The owner and the Phase H specs decide what to make and the creative direction. The agent handles volume, naming, filing, and bookkeeping:

- takes an owner-provided or owner-approved prompt,
- generates the specified number of draft variations,
- names and files them by convention,
- builds a contact sheet per asset,
- records everything in the manifest,
- then stops for owner review.

It never publishes, wires, or overwrites an approved asset. Every creative and publishing decision stays with the owner.

## 2. Tool strategy

- **Nano Banana Pro (through the configured provider, such as Replicate if available)** - raster drafts: cover diagram motifs, guide diagrams, Pinterest pin middle-zone artwork, social visuals, the about-page image. Draft output only, never a final layout. The provider may change over time; the workflow stays the same, and the provider is recorded per asset in the manifest.
- **Seedance 2** - short videos, 4 to 15 seconds (the calculator walkthrough and similar). Draft motion only.
- **Illustrator / Photoshop** - the final layout tools wherever typography or vector precision matters. Per the established generated-vs-manual split: the agent generates the text-free motif, and the owner sets the real title type, the heart-house mark, the pin three-zone canvas, the alignment, and the export. The agent never bakes title text into a cover or a pin.
- **Recraft V3 (reconciliation note).** The Phase H specs name Recraft V3 for the strict flat-vector cover and pin diagrams. Nano Banana Pro is the raster generator named in this plan. The two are not in conflict here: `tool` is a per-asset field in the manifest, so a flat-vector diagram can be recorded as `recraft-v3` and a raster or photographic draft as `nano-banana-pro`. The owner chooses per asset; the agent records the choice and obeys it.

## 3. Folder structure

In-repo, git-ignored staging. New root: `projects/kua-calculator/visual-production/`. Nothing under it is ever served by Next.js (which only serves `public/`). Approved files reach `public/` only via a separate, owner-triggered wiring task.

```
projects/kua-calculator/visual-production/
  README.md                       (committed: what this is + the hard wall + brand rules)
  prompts/                        (committed: prompt source, one .md per asset)
    h1/
      H1-01-complete-home-compass.md
      ...
  drafts/                         (git-ignored: raw generated variations)
    2026-06-16-h1/
      H1-01/  var-1.png ... var-6.png
      ...
  contact-sheets/                 (binaries git-ignored; the .md index is committed)
    2026-06-16-h1/
      H1-01.png ...
  approved/                       (git-ignored: owner-selected finals, staged in
    products/complete-home-compass/cover-thumb.png   their final public/ path shape
    about/about-hero.png                             so wiring is a pure copy)
    ...
  manifests/
    manifest.json                 (committed: machine-readable source of truth)
    2026-06-16-h1.md              (committed: human review sheet for the batch)
```

The five required folder roles:

- **Prompt source folders:** `visual-production/prompts/<batch>/` - one markdown file per asset holding the exact prompt(s), the shared negative prompt, the tool, and the settings the owner approved. The agent reads these; it does not author them.
- **Draft output folders:** `visual-production/drafts/<batch>/<asset-id>/` - the 3 to 6 image variations (or 2 to 3 video variations) as raw files. Git-ignored.
- **Approved output folders:** `visual-production/approved/<mirror-of-public-path>/` - the single owner-selected file per asset, renamed to its final filename and placed in a tree that mirrors `public/` exactly, so the wiring step is a pure copy. Git-ignored (the committed copy lands in `public/` at wiring time).
- **Contact sheet folders:** `visual-production/contact-sheets/<batch>/` - one labelled contact-sheet image per asset (a grid of that asset's variations), plus the committed `<batch>.md` review index.
- **Manifest files:** `visual-production/manifests/manifest.json` (source of truth, committed) and one `<batch>.md` review sheet per batch (committed).

Note: only `README.md` is created at scaffold time. The `prompts/`, `drafts/`, `contact-sheets/`, `approved/`, and `manifests/` subfolders are created by the first production run, each behind its own reviewed step. No draft image or video folders exist yet.

**Git policy.** The `visual-production/` ignore block is added to `projects/kua-calculator/.gitignore`:

```
# Visual production - heavy binaries stay local (like the pin masters)
visual-production/drafts/
visual-production/approved/
visual-production/contact-sheets/**/*.png
visual-production/contact-sheets/**/*.jpg
visual-production/contact-sheets/**/*.mp4
visual-production/contact-sheets/**/*.webm
```

Kept tracked: `prompts/`, `manifests/*.json`, every `*.md` review sheet, and `README.md`. This matches the pin-masters-off-git habit (`brand-pin-palette.md`): design working binaries stay local; the manifest and prompts stay as the committed audit trail.

**Hard rule:** the agent's write scope is fenced to `visual-production/` only. It never writes `public/` and never edits a code file.

## 4. Asset manifest format

Two artifacts per batch, kept in sync. `manifest.json` is the source of truth; the `<batch>.md` sheet is generated from it for human review.

### manifest.json (machine-readable source of truth)

```json
{
  "batches": [
    {
      "batch_id": "2026-06-16-h1",
      "created": "2026-06-16",
      "description": "H1 pilot pack",
      "assets": [
        {
          "asset_id": "H1-01",
          "batch_id": "2026-06-16-h1",
          "title": "Complete Home Compass cover (nine-sector floor plan)",
          "kind": "image",
          "prompt_path": "prompts/h1/H1-01-complete-home-compass.md",
          "tool": "nano-banana-pro",
          "settings": { "aspect": "1:1", "size": "2000x2000", "n": 6, "seed": null },
          "output_filenames": [
            "drafts/2026-06-16-h1/H1-01/var-1.png",
            "drafts/2026-06-16-h1/H1-01/var-2.png"
          ],
          "contact_sheet_path": "contact-sheets/2026-06-16-h1/H1-01.png",
          "target_public_path": "public/products/complete-home-compass/cover-thumb.png",
          "approval_status": "pending",
          "selected_output": null,
          "rejected": false,
          "notes": ""
        }
      ]
    }
  ]
}
```

Each generated asset record carries: `asset_id`, `batch_id`, `title`, `kind` (image | video), `prompt_path` (the source prompt), `tool`, `settings` (generation settings), `output_filenames`, `contact_sheet_path`, `target_public_path` (the website path), `approval_status`, `selected_output`, a `rejected` boolean, and `notes`.

### <batch>.md (human review sheet, generated from the JSON)

| Asset | Contact sheet | Prompt summary | Status | Selected | Approval notes | Next action |
|---|---|---|---|---|---|---|
| H1-01 Complete Home cover | `contact-sheets/2026-06-16-h1/H1-01.png` | nine-sector floor plan, one orange cell, no text | pending | - | - | owner to review |

Columns: asset name, contact-sheet reference (relative link), prompt summary, status, selected file, approval notes, next action.

**Status lifecycle:** `pending` to (owner reviews the contact sheet) `approved` (with `selected_output` set), or `revise` (re-run with tweaks), or `rejected`. Only an asset that is `approved` with a non-null `selected_output` is eligible for the wiring step.

## 5. H1 pilot scope only

The first run produces drafts for exactly these nine assets and nothing else. There is no separate H1 spec file yet; this section is the H1 scope, drawn from the Phase H priority order. For each asset the prompt is inherited from the named spec; the agent does not author new prompts.

| id | Asset | Kind | Prompt source | Vars | Final target (post-wiring) |
|---|---|---|---|---|---|
| H1-01 | Complete Home Compass cover | image | featured-product-asset-system Brief 2 (nine-sector floor plan) | 6 | `public/products/complete-home-compass/cover-thumb.png` + `cover-portrait.png` |
| H1-02 | Personal Compass cover refresh | image | Brief 1 (compass rose) | 6 | `public/products/personal-feng-shui-compass/cover-thumb.png` (new) + `cover-portrait.png` (regenerate) |
| H1-03 | Couple Compatibility Compass cover | image | Brief 3 (two intersecting rings, vesica overlap) | 6 | `public/products/couple-compatibility-compass/cover-thumb.png` + `cover-portrait.png` |
| H1-04 | Move-In Date Report cover | image | Brief 4 (doorway + calendar grid) | 6 | `public/products/move-in-kit/cover-thumb.png` (new) + `cover-portrait.png` (regenerate) |
| H1-05 | 7-Day Home Reset cover | image | Brief 5 (seven-step spatial sequence) | 6 | `public/products/seven-day-home-reset/cover-thumb.png` + `cover-portrait.png` |
| H1-06 | Southeast Wealth pin (middle-zone art) | image | phase-f #4 / phase-h 3b (six-lever floor plan) | 4 | off-site (pin built in Illustrator from the master template; no `public/` path) |
| H1-07 | How to Read Any Room pin (middle-zone art) | image | phase-f #5 / phase-h 3b (4-step checklist over a floor plan) | 4 | off-site (pin; no `public/` path) |
| H1-08 | About-page image (architect's desk, no face) | image | phase-h 3d primary diagram | 4 | `public/about/about-hero.png` |
| H1-09 | Kua calculator 15s video | video | phase-h Video 1 (calm push across an ivory UI, b-roll) | 3 | `public/video/kua-calculator-walkthrough-15s.mp4` (wiring deferred) |

**Two production paths inside H1.** For the five covers (H1-01 through H1-05) and the two pins (H1-06, H1-07), the agent's deliverable is the text-free diagram motif; an owner Illustrator step then produces the actual `cover-thumb.png` / `cover-portrait.png` / pin file, and only then does wiring install it. `target_public_path` records the eventual installed file, not the raw draft. For the about image (H1-08) and the video (H1-09) the agent draft is closer to final, still owner-reviewed and exported. H1-09 is b-roll fill; the real walkthrough is screen-captured by the owner.

Nothing outside these nine is produced in the pilot.

## 6. Generation rules

Production constraints (hard):

- 3 to 6 variations per image (H1 uses 6 for covers, 4 for pins and the about image).
- 2 to 3 variations per video.
- always build a contact sheet per asset.
- never overwrite an existing approved asset, or anything in `public/`.
- never touch website code (`app/`, `components/`, `lib/`, including `lib/product-assets.ts`).
- never publish anything.

Brand and content constraints (inherited from the Phase H identity rules and the `brand-pin-palette.md` banned list):

- no fake testimonials.
- no mystical or fortune-telling stock imagery.
- banned objects: Buddha statues, incense, red envelopes, coins, money trees, dragons, Chinese-character overlays (also lucky bamboo, oranges the fruit, bagua mirrors, glowing or energy effects, faces).
- no fortune-telling language (no "activate", "manifest", "charge"), no outcome promises, no consultation or service language, no urgency, on any overlay or caption.
- keep the palette: ivory `#fcfcf8`, deep green `#0e3b2c`, true orange `#d9531a` as the single accent only (never a background fill, never a body or title text colour).
- keep the architecture-led identity: diagrams, floor plans, calm editorial-atelier; no faces (the author is "I.D."), no generic stock photography, no dark or cluttered interiors.
- every generated prompt carries the shared diagram negative prompt from the specs.

These rules live once in `visual-production/README.md`; each per-asset prompt file references them. The agent refuses to generate anything that violates them.

## 7. Review workflow

A strict gate between production and publication:

1. **Draft** - the agent generates N variations into `drafts/<batch>/<asset-id>/` and records them in `manifest.json` (status `pending`).
2. **Contact sheet** - the agent builds one labelled grid per asset into `contact-sheets/<batch>/` and regenerates the `<batch>.md` review sheet.
3. **Owner selects** - the owner reviews the contact sheet and sets `selected_output` on the asset (or marks it `revise` or `rejected`).
4. **Owner approves** - the owner sets `approval_status: approved`. For covers and pins, the owner also does the Illustrator layout that produces the real final file, staged into `approved/<mirror-of-public-path>/`.
5. **Separate wiring task** - a distinct, separately-approved step copies approved files into `public/` and makes the one-line change in `lib/product-assets.ts` (add the slug to `CARD_COVER_SLUGS`, or set `assetLevel`) where needed. The production agent never performs this step.

The wall: the production agent's authority ends at `approved/`. Crossing into `public/` and code is always a separate task the owner triggers.

## 8. Future automation (described only, not built)

A later VS Code / Visual Studio agent could call the configured provider's API directly (Replicate if available, for Nano Banana Pro and Seedance 2) to fill `drafts/` and write `manifest.json` automatically, instead of the owner running each generation by hand. Sketch only:

- a small local script or agent reads `prompts/<batch>/*.md` plus the manifest's `pending` assets, calls the provider with the recorded settings, writes variations to `drafts/`, assembles the contact sheets, and flips status to pending-review.
- the provider API token (for example `REPLICATE_API_TOKEN`) lives in `.env` (never committed; the project already gitignores `.env*`). The provider can be swapped without changing the workflow.
- the agent's write scope stays fenced to `visual-production/`; it has no permission to write `public/` or any code file. The review and wiring gate is unchanged.
- triggered manually by the owner per batch; no schedule, no autonomy across the publish wall.

This section is a description only. Building it is a separate, explicitly-approved phase. Do not implement now.

## Stop point

This plan is prepared for review. No code changed, no images generated, no provider calls, no draft folders created, nothing published. The staging wall is scaffolded (README plus the `.gitignore` block); the draft, prompt, contact-sheet, approved, and manifest folders are created later by the first production run, each as its own small reviewed step, behind the wall defined above.
