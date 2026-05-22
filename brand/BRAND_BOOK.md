# My Feng Shui Home - Brand Book

Version 2.0 - 2026-05-22
Owner: kua-calculator project (first product of My Feng Shui Home)
Status: active. This document is the single source of truth for the brand.
The site implements it; later work conforms to it.

---

## 1. Brand overview

### The brand
My Feng Shui Home is the brand. The heart-and-house logo, the colours, the
type, the texture, and the voice in this book all belong to it. The Kua
Calculator is its first product; later tools live under the same brand and
the same book.

### The concept - unity and attraction of opposites
The brand's spine is the oldest idea in feng shui: yin and yang, the unity of
opposites. The design expresses it directly. A calm, light, natural canvas,
grounded by one deep, dark counterweight. Energy comes from the meeting of
opposites - light against dark, cool sage against warm clay, soft against
structured - not from loudness.

The working phrase is **eclectic minimalism**: a quiet, spacious canvas with a
few rich, intentional details. Calm, natural, intelligent. Quiet luxury, not
performance.

### What the Kua Calculator is
A free, single-page web tool. A reader enters a birth date and gender and
receives their Kua number, their East or West group, and their eight personal
compass directions with plain-English meanings. It is the top-of-funnel
acquisition channel for the wider My Feng Shui Home property.

### Brand personality
- Calm, not breathless.
- Natural, not synthetic.
- Intelligent, not academic.
- Honest, never woo.

### The one memorable thing
A warm, light page - cream and sand, a soft natural light wash, a fine
botanical line - calm and uncrowded, grounded by the deep ink footer. The
page feels composed and considered, like a well-kept room.

---

## 2. Logo

### The mark
A heart drawn as a single ribbon outline, with a house built inside it: a
pitched roof, a chimney, a small dot, an open base. Heart plus home. The
source file is `assets/logo.svg`.

### Colour
The logo mark, the wordmark, and the signature are all reproduced in the brand
green `#4f5a36` - the header lockup is a single colour. Two other treatments
of the mark are allowed and nothing else:
- Deep olive green `#4f5a36` on light surfaces (cream, sand, paper).
- Cream `#f1e9d8` or white on the deep ink surface.
- Deep ink `#2a271e` where a single-colour dark mark is needed.

### Clear space and size
Keep clear space around the mark equal to the height of its chimney. Minimum
24px tall for the mark alone. The SVG is resolution-independent.

### Wordmark lockup
The logo mark, then "Kua Calculator" set in Hanken Grotesk 600, with "My Feng
Shui Home" beneath it in the signature script (see section 4). The product
name leads; the brand signs underneath it.

### Logo don't
- Do not stretch, skew, rotate, or add effects.
- Do not recolour outside the three options above.
- Do not redraw the mark or replace it with an icon or emoji.

---

## 3. Colour palette

Warm naturals. A light canvas, a deep counterweight, and two accents - one
cool, one warm - that are opposites of each other.

### Tokens

| Token | Hex | Role |
|---|---|---|
| `--cream` | `#f1e9d8` | Canvas. The body background. |
| `--sand` | `#e0d3b8` | Textured panels - the hero, quiet strips. |
| `--sand-deep` | `#d2c3a1` | Deeper sand for texture shadow and hover. |
| `--paper` | `#fbf7ee` | Cards - the form, the result card. |
| `--green` | `#4f5a36` | Deep olive. The brand green - logo, wordmark, signature, CTA, favourable state. |
| `--green-deep` | `#3c4429` | Darker olive. Links, hover. |
| `--clay` | `#be6b43` | Warm clay. The kinetic pop - rules, the botanical, small accents. |
| `--clay-deep` | `#9c5331` | Darker clay. Clay text and links on light surfaces. |
| `--ink` | `#2a271e` | Deep near-black. Primary text, and the dark counterweight (CTA, footer). |
| `--ink-2` | `#5f5848` | Soft brown-grey. Secondary text. |
| `--hairline` | `#cfc4ab` | Soft borders and rules. |
| `--on-dark` | `#ffffff` | Text on ink and green surfaces. |

### Usage
The page is mostly light (cream, sand, paper) - that is the yin. The deep ink
appears rarely and deliberately: the primary call to action, the footer. That
is the yang. Sage green is the calm accent that carries the brand; clay is the
warm pop, used sparingly. One or two considered moments, never scattered.

### Contrast pairs (WCAG)

| Foreground | Background | Ratio | Verdict |
|---|---|---|---|
| `--ink` | `--cream` / `--paper` | ~12:1 | AAA |
| `--ink` | `--sand` | ~10:1 | AAA |
| `--ink-2` | `--cream` | 5.8:1 | AA - secondary text |
| `--green-deep` | `--paper` / `--cream` | ~10:1 | AAA - links |
| `--clay-deep` | `--cream` | 4.6:1 | AA - accents, links |
| `#ffffff` white | `--green` | ~7.4:1 | AAA - text on green (CTA, panels) |
| `--green` | `--cream` | ~6:1 | AA - the green wordmark and signature |
| `#ffffff` white | `--ink` | ~15:1 | AAA - text on the CTA, footer |

Every text colour on its surface meets WCAG AA. There is no contrast override
in this brand; the natural palette is accessible by design. Text on the green
and ink surfaces is white.

Never convey meaning by colour alone. The favourable and unfavourable result
states each carry an icon and a text label as well as colour.

---

## 4. Typography

Two typefaces from Google Fonts: one calm humanist sans used throughout, and
a script reserved for the brand signature.

### Interface - Hanken Grotesk
Everything visible except the signature: headings, the wordmark, the big Kua
number, body text, UI labels, form fields, the methodology page. A calm,
humanist sans-serif - warm enough to feel natural, clean enough to feel
intelligent and unhurried. Headings use weight 600; body uses 400, with 500
to 600 for labels and emphasis. Hierarchy comes from size and weight, not
from a second display face.

### Signature - Bilbo Swash Caps
The brand signature only. "My Feng Shui Home" is set in Bilbo Swash Caps, a
flowing handwritten script, beneath the Kua Calculator wordmark. It reads like
a personal signature - the one eclectic, human detail. Open-source (SIL Open
Font License), free for commercial use. Do not use it anywhere else.

### Load
```
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Hanken+Grotesk:ital,wght@0,400;0,500;0,600;0,700;0,800;1,400;1,500&family=Bilbo+Swash+Caps&display=swap" rel="stylesheet">
```
Fallback: `"Hanken Grotesk", system-ui, -apple-system, sans-serif`.

### Type scale
Body is 18px. Headings use the same family at larger sizes, weight 600.

| Token | Size | Typeface / weight | Use |
|---|---|---|---|
| display | 67px (45 mobile) | Hanken Grotesk 600 | Hero headline |
| h1 | 58px (42) | Hanken Grotesk 600 | Methodology title |
| h2 | 34px (28) | Hanken Grotesk 600 | Section headings |
| h3 | 24px | Hanken Grotesk 600 | Sub-sections |
| body-lg | 21px | Hanken Grotesk 400 | Lead paragraph |
| body | 18px | Hanken Grotesk 400 | Default running text |
| small | 15px | Hanken Grotesk 400 | Helper text, meta |
| caption | 13px | Hanken Grotesk 600 | Eyebrows, labels |

### Rules
- Line length 60 to 75 characters; body line-height 1.6 to 1.75.
- Eyebrow labels: caption size, weight 600, uppercase, `letter-spacing: 0.18em`,
  in `--clay-deep`, preceded by a thin clay rule.
- Lining numerals for the Kua number and aligned numeric columns.
- Never default to Inter, Roboto, Arial, or system fonts as the brand face.

---

## 5. Surface light wash

Large light surfaces (the hero) carry a soft natural light wash: a few large,
very low-opacity radial glows in warm cream, sage, and faint clay, layered
over the sand base. Built from CSS radial gradients. No image files, no
repeating pattern.

It gives the surface gentle, organic depth - like daylight across a wall -
with nothing that competes with the text. An earlier striped bamboo texture
was dropped because a repeating pattern read as confusing stripes rather than
calm. Keep the wash subtle; it should be felt, not noticed.

---

## 6. Botanical motif

A fine line-drawn bamboo sprig - a stem with paired slender leaves - drawn as
an inline SVG. It is the brand's natural signature flourish: a quiet nod to
plants, growth, and "beautiful smell."

Usage:
- A soft, low-opacity accent in the hero (upper corner).
- A small centred ornament above the footer text.
Drawn with `currentColor` so it recolours by context (sage green on light,
clay on the dark footer). Use it sparingly - one per view. Never as a busy
repeating pattern.

---

## 7. Writing voice and tone

### The voice in one line
Explain it the way a knowledgeable, calm friend would: clear, specific, and
honest about what is and is not known.

### Four principles
1. **Honest framing, every line.** The Kua system is a structured decision
   tool, not a prediction. Never promise an outcome. Hard rule.
2. **Plain English.** Short sentences, one idea each.
3. **Specific beats vague.** Name the concrete use, not the abstract benefit.
4. **Calm authority.** State things plainly. No exclamation marks, no urgency
   tricks. Confidence is quiet.

### Use
"supports the conditions for", "traditionally", "is associated with",
"a structured way to choose between", direct verbs for actions.

### Avoid
Outcome promises ("will give you", "guarantees", "ensures"). Mystique selling
("unlock", "manifest", "destiny", "luck"). Hype ("amazing", "transform your
life"). Em dashes - use a spaced hyphen or rephrase. Workspace hard rule.

---

## 8. UI design tokens

### Spacing
4px base. Scale: 4, 8, 12, 16, 24, 32, 48, 64, 96. No off-scale values.

### Radius - soft
`--radius-sm` 8px (inputs, chips), `--radius-md` 14px (buttons), `--radius-lg`
24px (cards, hero), `--radius-pill` 999px.

### Shadow - soft and natural
The brand uses soft, diffuse shadows, never a hard offset.
```
--shadow-soft: 0 1px 3px rgba(42,39,30,0.06), 0 6px 18px rgba(42,39,30,0.07);
--shadow-lift: 0 2px 6px rgba(42,39,30,0.08), 0 16px 36px rgba(42,39,30,0.10);
```

### Buttons
**Primary** - one per screen.
- Background `--green`, text white (4.6:1, AA). Weight 600.
- `--radius-md`, `--shadow-soft`. Hover: `--green-deep`, lifts 2px.
- The deep ink is reserved for the footer, the page's grounding counterweight.

**Secondary** - background `--paper`, text `--ink`, `--hairline` border.

**Text link** - `--green-deep`, underlined; hover `--clay-deep`.

Touch targets 44px minimum; 8px minimum gap.

### Cards
Background `--paper`, `--hairline` border (1px), `--radius-lg`, `--shadow-lift`
for the form and result card. Quiet strips use `--sand` with no border.

### Inputs
Fill `--cream`, `--hairline` border, `--radius-sm`, 50px tall. Visible label
above every input in Hanken Grotesk 600. Focus: a 3px soft green ring. Error:
`--clay-deep` border and message, `role="alert"`.

### Result card direction states
Three redundant cues, readable in greyscale and for colourblind users:

| State | Colour | Icon | Border |
|---|---|---|---|
| Favourable | `--green` | flower glyph | solid left border |
| Unfavourable | `--ink-2` | cross | dashed left border |

Plus the label text "Favourable" / "Avoid" in every row.

### Focus ring
`outline: 2px solid var(--ink); outline-offset: 2px;` on every interactive
element. On ink and green surfaces the ring switches to white.

---

## 9. Accessibility standards

Non-negotiable, audited at every UI task.
- Text contrast 4.5:1 minimum (large text 3:1). See section 3 - the natural
  palette meets this with no exceptions.
- Visible focus ring on every interactive element.
- Full keyboard operability; tab order matches visual order.
- Every input has an associated label.
- Meaning never by colour alone - icon plus text always.
- Sequential heading hierarchy.
- `prefers-reduced-motion` respected.
- Touch targets 44px minimum.
- Semantic landmarks: header, main, footer, nav. Skip-to-content link.
- Decorative SVGs (the motif, the texture) are `aria-hidden`.

---

## 10. CSS token block

REBRAND work can lift this directly into `:root` in `main.css`.

```css
:root {
  --cream:       #f1e9d8;
  --sand:        #e0d3b8;
  --sand-deep:   #d2c3a1;
  --paper:       #fbf7ee;
  --green:       #4f5a36;
  --green-deep:  #3c4429;
  --clay:        #be6b43;
  --clay-deep:   #9c5331;
  --ink:         #2a271e;
  --ink-2:       #5f5848;
  --hairline:    #cfc4ab;
  --on-dark:     #ffffff;

  --font-display: "Hanken Grotesk", system-ui, -apple-system, sans-serif;
  --font-body:    "Hanken Grotesk", system-ui, -apple-system, sans-serif;
  --font-script:  "Bilbo Swash Caps", "Segoe Script", cursive;

  --space-1: 4px;  --space-2: 8px;  --space-3: 12px; --space-4: 16px;
  --space-5: 24px; --space-6: 32px; --space-7: 48px; --space-8: 64px;
  --space-9: 96px;

  --radius-sm: 8px; --radius-md: 14px; --radius-lg: 24px; --radius-pill: 999px;

  --shadow-soft: 0 1px 3px rgba(42,39,30,0.06), 0 6px 18px rgba(42,39,30,0.07);
  --shadow-lift: 0 2px 6px rgba(42,39,30,0.08), 0 16px 36px rgba(42,39,30,0.10);

  --border: 1px solid var(--hairline);
}
```

---

## 11. Quick do and don't

**Do**
- Keep the page calm and light. Let it breathe.
- Use the deep ink rarely and deliberately - it is the counterweight.
- Pair opposites: light with dark, sage with clay, soft with structured.
- Write plainly and honestly. Name concrete uses.

**Don't**
- Fill the page with colour. Restraint is the brand.
- Use hard offset shadows, bold blocks, or loud accents.
- Promise outcomes or sell mystique.
- Use em dashes, emoji icons, or raster images.
- Default to Inter, Roboto, Arial, or Space Grotesk.
