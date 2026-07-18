'use strict';

/*
 * Deterministic Pinterest pin renderer for the locked MFSH pin template
 * (spec/brand-pin-palette.md + Desktop master reference):
 *   1000x1500; green top block (orange logo ~160px at y=50-210, ivory
 *   EB Garamond Bold title); orange 2pt divider at y=385; ivory middle
 *   for variant artwork; green bottom block with the lowercase URL strip
 *   (36pt, tracking 50 = 0.05em, baseline ~y=1457).
 * Single-accent rule: exactly ONE orange detail in the middle artwork.
 * Output: visual-production/drafts/pins/ (git-ignored review folder).
 * Fonts: EB Garamond Bold from the owner's installed user fonts.
 * Run: node visual-production/tools/render-pins.js
 */

const fs = require('node:fs');
const path = require('node:path');

const PROJECT_ROOT = path.resolve(__dirname, '..', '..');
const VP_ROOT = path.resolve(__dirname, '..');
const OUT_DIR = path.join(VP_ROOT, 'drafts', 'pins');
const LOGO_PATH = path.join(PROJECT_ROOT, 'assets', 'logo.svg');
const { Resvg } = require(path.join(PROJECT_ROOT, 'node_modules', '@resvg', 'resvg-js'));

const GREEN = '#0e3b2c';
const IVORY = '#fcfcf8';
const ORANGE = '#d9531a';

const FONT_FILES = [
  'c:/Users/User/AppData/Local/Microsoft/Windows/Fonts/EBGaramond-Bold.ttf',
];

const LOGO_RAW = fs.readFileSync(LOGO_PATH, 'utf8');
const LOGO_INNER = LOGO_RAW.slice(LOGO_RAW.indexOf('<g'), LOGO_RAW.lastIndexOf('</g>') + 4)
  .replace('#0e3b2c', ORANGE);

const r = (n) => Math.round(n * 1000) / 1000;

// ---- the locked template shell -------------------------------------------
// titleLines: 1-2 lines of ivory EB Garamond Bold on the green top block.
function pinShell(titleLines, middleArt) {
  const titleSize = 72; // pt per the locked spec (px here; RGB screen canvas)
  const baselines = titleLines.length === 1 ? [315] : [245, 330];
  const titles = titleLines
    .map(
      (t, i) =>
        `<text x="500" y="${baselines[i]}" text-anchor="middle" font-family="EB Garamond" font-weight="700" font-size="${titleSize}" fill="${IVORY}">${t}</text>`,
    )
    .join('\n  ');
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1000" height="1500" viewBox="0 0 1000 1500">
  <rect width="1000" height="1500" fill="${IVORY}"/>
  <rect x="0" y="0" width="1000" height="385" fill="${GREEN}"/>
  <rect x="0" y="1387.7" width="1000" height="112.3" fill="${GREEN}"/>
  <svg x="420" y="50" width="160" height="160" viewBox="0 0 709 709">${LOGO_INNER}</svg>
  ${titles}
  <line x1="0" y1="385" x2="1000" y2="385" stroke="${ORANGE}" stroke-width="2.7"/>
  ${middleArt}
  <text x="500" y="1457" text-anchor="middle" font-family="EB Garamond" font-weight="700" font-size="36" fill="${IVORY}" letter-spacing="1.8">myfengshuihome.com</text>
</svg>`;
}

// ---- Good Days middle artwork --------------------------------------------
// A calm month-grid calendar, single-weight green; day dots on the
// favourable days; exactly ONE orange accent: a circle around one chosen
// day. Centred in the ivory zone (y 385 - 1387.7).
function goodDaysArt() {
  const cx = 500;
  const zoneTop = 385, zoneBot = 1387.7;
  const cy = (zoneTop + zoneBot) / 2;
  const cols = 7, rows = 5, cell = 104;
  const W = cols * cell, H = rows * cell;
  const x0 = cx - W / 2, y0 = cy - H / 2 + 20;
  const sw = 3.2;
  let s = '';
  // header band line (the calendar's top rule, slightly heavier)
  s += `<line x1="${x0}" y1="${y0 - 26}" x2="${x0 + W}" y2="${y0 - 26}" stroke="${GREEN}" stroke-width="${sw * 1.6}"/>`;
  // grid
  s += `<rect x="${x0}" y="${y0}" width="${W}" height="${H}" fill="none" stroke="${GREEN}" stroke-width="${sw}"/>`;
  for (let i = 1; i < cols; i++)
    s += `<line x1="${r(x0 + i * cell)}" y1="${y0}" x2="${r(x0 + i * cell)}" y2="${r(y0 + H)}" stroke="${GREEN}" stroke-width="${sw}"/>`;
  for (let j = 1; j < rows; j++)
    s += `<line x1="${x0}" y1="${r(y0 + j * cell)}" x2="${r(x0 + W)}" y2="${r(y0 + j * cell)}" stroke="${GREEN}" stroke-width="${sw}"/>`;
  // green day dots (favourable days; deterministic pleasing spread)
  const dots = [
    [1, 0], [3, 0], [5, 1], [0, 1], [2, 2], [6, 2], [1, 3], [4, 3], [3, 4], [5, 4],
  ];
  for (const [c, rw] of dots) {
    s += `<circle cx="${r(x0 + c * cell + cell / 2)}" cy="${r(y0 + rw * cell + cell / 2)}" r="10" fill="${GREEN}"/>`;
  }
  // THE one orange accent: a ring around one chosen day (week 2, Thursday)
  const ox = x0 + 4 * cell + cell / 2, oy = y0 + 1 * cell + cell / 2;
  s += `<circle cx="${r(ox)}" cy="${r(oy)}" r="34" fill="none" stroke="${ORANGE}" stroke-width="5"/>`;
  s += `<circle cx="${r(ox)}" cy="${r(oy)}" r="10" fill="${GREEN}"/>`;
  return s;
}

function renderPng(svg, width) {
  const resvg = new Resvg(svg, {
    fitTo: { mode: 'width', value: width },
    background: IVORY,
    font: { loadSystemFonts: true, fontFiles: FONT_FILES, defaultFontFamily: 'EB Garamond' },
  });
  return resvg.render().asPng();
}

function main() {
  fs.mkdirSync(OUT_DIR, { recursive: true });
  const pins = [
    {
      key: 'good-days-2026',
      titleLines: ['Good Days to Move,', 'Sign, and Start in 2026'],
      art: goodDaysArt(),
    },
  ];
  for (const p of pins) {
    const svg = pinShell(p.titleLines, p.art);
    fs.writeFileSync(path.join(OUT_DIR, `${p.key}.svg`), svg);
    fs.writeFileSync(path.join(OUT_DIR, `${p.key}.png`), renderPng(svg, 1000));
    console.log(`rendered ${p.key}.png (1000x1500)`);
  }
  console.log('output dir:', OUT_DIR);
}

main();
