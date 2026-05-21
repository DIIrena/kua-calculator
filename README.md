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

- Palette: parchment `#f4ede2`, ink `#2b261f`, terra-cotta `#b06a45`, sage `#5e7355`.
- Display font: Fraunces. Body font: Spectral. Both via Google Fonts.
- No tracking. No analytics. No external JS dependencies (calculation is client-side vanilla JS).

## Tests

Open the browser console on `/` and verify:

```js
calculateKua(1978, 'male')   // => 4
calculateKua(1985, 'female') // => 9
```

## Honest framing

The Kua system is a structured decision tool for spatial design choices. It is not a prediction. Copy on the site never promises outcomes.
