# kua-calculator

A free single-page web tool that returns a reader's Kua number, East/West group, and the eight personal directions (four favourable, four unfavourable) with plain-English meanings.

Spin-off project of the feng-shui dashboard. Top-of-funnel acquisition channel: someone searches "kua number calculator," lands here, gets the answer in one page, and is offered the deeper methodology.

## Run locally

```bash
uv sync
uv run flask --app app.app run
```

Default URL: http://localhost:5000

## Routes

| Path | Purpose |
|---|---|
| `/` | Calculator landing page with the form and inline result card. |
| `/methodology` | Full deep-dive on the Compass School, the Kua formula, and the Eight Mansions. Copy of feng-shui chapter 6. |
| `/embed` | Slim variant designed for iframe embedding in third-party pages. |
| `/robots.txt` | AI-bot policy. |

## Embed it

```html
<iframe
  src="https://your-host/embed"
  width="100%"
  height="900"
  style="border:0;max-width:720px;"
  loading="lazy"
  title="Kua number calculator"
></iframe>
```

## Design

- Palette: warm naturals - cream `#f1e9d8`, sand `#e0d3b8`, sage green `#6e7a4f`, clay `#be6b43`, deep ink `#2a271e`. Full system in `brand/BRAND_BOOK.md`.
- Typeface: Hanken Grotesk throughout, with Bilbo Swash Caps for the "My Feng Shui Home" signature. Via Google Fonts.
- No tracking. No analytics. No external JS dependencies (calculation is client-side vanilla JS).

## Tests

Open the browser console on `/` and verify:

```js
calculateKua(1978, 'male')   // => 4
calculateKua(1985, 'female') // => 9
```

## Honest framing

The Kua system is a structured decision tool for spatial design choices. It is not a prediction. Copy on the site never promises outcomes.
