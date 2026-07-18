'use strict';

/*
 * Complete Home Compass cover - second visual direction (restrained surrealism).
 *
 * Deterministic SVG -> PNG via @resvg/resvg-js (reused from the project, no new deps).
 * No AI, no network, no randomness. Three diagram variants of the same premium cover:
 *   A - floating grid       (nine sectors drift apart by hairline gaps)
 *   B - impossible doorway   (a door at the centre opens out into blank ivory)
 *   C - shifted plane        (one corner sector slips quietly out of alignment)
 *
 * Output: visual-production/drafts/2026-06-16-h1/H1-01/direction-2-surreal/ (git-ignored).
 * Never writes public/. Never edits app code. Run: node visual-production/tools/render-surreal-covers.js
 */

const fs = require('node:fs');
const path = require('node:path');

const PROJECT_ROOT = path.resolve(__dirname, '..', '..');           // projects/kua-calculator
const VP_ROOT = path.resolve(__dirname, '..');                       // visual-production
const OUT_DIR = path.join(VP_ROOT, 'drafts', '2026-06-16-h1', 'H1-01', 'direction-2-surreal');
const FONT_DIR = path.join(PROJECT_ROOT, 'lib', 'fonts');
const LOGO_PATH = path.join(PROJECT_ROOT, 'assets', 'logo.svg');

const { Resvg } = require(path.join(PROJECT_ROOT, 'node_modules', '@resvg', 'resvg-js'));

const FONT_FILES = [
  path.join(FONT_DIR, 'HankenGrotesk-Regular.ttf'),
  path.join(FONT_DIR, 'HankenGrotesk-Bold.ttf'),
  path.join(FONT_DIR, 'HankenGrotesk-ExtraBold.ttf'),
];

// --- brand palette (the only three colours used) ---
const GREEN = '#0e3b2c';
const IVORY = '#fcfcf8';
const ORANGE = '#d9531a';

const TITLE = 'Complete Home Compass';
const SUBTITLE = 'Every room and life area, read for your Kua';
const FOOTER = 'myfengshuihome.com';

// extract the inner drawing of the heart-house logo (already green) for nesting
const LOGO_RAW = fs.readFileSync(LOGO_PATH, 'utf8');
const LOGO_INNER = LOGO_RAW.slice(LOGO_RAW.indexOf('<g'), LOGO_RAW.lastIndexOf('</g>') + 4);

const r = (n) => Math.round(n * 1000) / 1000;

function rect(x, y, w, h, opts = {}) {
  const stroke = opts.stroke === undefined ? GREEN : opts.stroke;
  const fill = opts.fill || 'none';
  const strokeAttr = stroke ? ` stroke="${stroke}" stroke-width="${r(opts.sw)}" stroke-linejoin="miter"` : '';
  return `<rect x="${r(x)}" y="${r(y)}" width="${r(w)}" height="${r(h)}" fill="${fill}"${strokeAttr}/>`;
}
function line(x1, y1, x2, y2, sw) {
  return `<line x1="${r(x1)}" y1="${r(y1)}" x2="${r(x2)}" y2="${r(y2)}" stroke="${GREEN}" stroke-width="${r(sw)}" stroke-linecap="square"/>`;
}

// a double-lined cell (outer + inner square), optionally rotated about its own centre
function cellDouble(ox, oy, c, inset, sw, color, angle) {
  const inn = c - 2 * inset;
  const outer = rect(ox - c / 2, oy - c / 2, c, c, { sw, stroke: color });
  const inner = rect(ox - inn / 2, oy - inn / 2, inn, inn, { sw, stroke: color });
  const t = angle ? ` transform="rotate(${r(angle)} ${r(ox)} ${r(oy)})"` : '';
  return `<g${t}>${outer}${inner}</g>`;
}

// diagonal "/" hatch (slope -1) filling a centred square, clipped to it (architectural poche)
function hatch(cxs, cys, side, step, sw, clipId) {
  const x0 = cxs - side / 2, y0 = cys - side / 2, x1 = x0 + side, y1 = y0 + side;
  let lines = '';
  for (let b = x0 + y0; b <= x1 + y1; b += step) {
    const xa = x0 - side, ya = -xa + b;
    const xb = x1 + side, yb = -xb + b;
    lines += `<line x1="${r(xa)}" y1="${r(ya)}" x2="${r(xb)}" y2="${r(yb)}" stroke="${ORANGE}" stroke-width="${r(sw)}"/>`;
  }
  return `<defs><clipPath id="${clipId}"><rect x="${r(x0)}" y="${r(y0)}" width="${r(side)}" height="${r(side)}"/></clipPath></defs><g clip-path="url(#${clipId})">${lines}</g>`;
}

// ----- the three central diagrams. each returns SVG drawn around centre (cx, cy) -----
// c = one cell side; the grid is 3x3 (side 3c); centre cell is the fixed orange square.

function diagramA(cx, cy, c, sw) {
  const g = c * 0.05; // tiny impossible gap
  let s = '';
  for (let i = -1; i <= 1; i++) {
    for (let j = -1; j <= 1; j++) {
      const ox = cx + i * c + i * g;
      const oy = cy + j * c + j * g;
      const x = ox - c / 2, y = oy - c / 2;
      if (i === 0 && j === 0) s += rect(x, y, c, c, { fill: ORANGE, stroke: null });
      else s += rect(x, y, c, c, { sw });
    }
  }
  return s;
}

function diagramC(cx, cy, c, sw) {
  const dx = c * 0.09, dy = -c * 0.09; // top-right sector slips up and across
  let s = '';
  for (let i = -1; i <= 1; i++) {
    for (let j = -1; j <= 1; j++) {
      const shift = (i === 1 && j === -1);
      const ox = cx + i * c + (shift ? dx : 0);
      const oy = cy + j * c + (shift ? dy : 0);
      const x = ox - c / 2, y = oy - c / 2;
      if (i === 0 && j === 0) s += rect(x, y, c, c, { fill: ORANGE, stroke: null });
      else s += rect(x, y, c, c, { sw });
    }
  }
  return s;
}

function diagramB(cx, cy, c, sw) {
  const xs = [cx - 1.5 * c, cx - 0.5 * c, cx + 0.5 * c, cx + 1.5 * c];
  const ys = [cy - 1.5 * c, cy - 0.5 * c, cy + 0.5 * c, cy + 1.5 * c];
  const hw = c * 0.18;                 // corridor half-width (opening ~ 0.36c)
  const ext = c * 0.45;                // how far the corridor reaches into the ivory
  const cy0 = cy - hw, cy1 = cy + hw;
  const xStart = cx + 0.5 * c;         // centre sector right wall
  const xEnd = cx + 1.5 * c + ext;     // corridor mouth out in the ivory
  let s = '';
  // fixed orange centre square
  s += rect(cx - 0.5 * c, cy - 0.5 * c, c, c, { fill: ORANGE, stroke: null });
  // horizontal grid lines (full width)
  for (const y of ys) s += line(xs[0], y, xs[3], y, sw);
  // vertical grid lines; break x=cx+0.5c (doorway from centre) and x=cx+1.5c (out through outer wall)
  xs.forEach((x, idx) => {
    if (idx === 2 || idx === 3) {
      s += line(x, ys[0], x, cy0, sw);
      s += line(x, cy1, x, ys[3], sw);
    } else {
      s += line(x, ys[0], x, ys[3], sw);
    }
  });
  // corridor walls running out into empty ivory
  s += line(xStart, cy0, xEnd, cy0, sw);
  s += line(xStart, cy1, xEnd, cy1, sw);
  // door leaf swung open into the ivory + quarter-circle swing arc
  const rr = 2 * hw;
  s += line(xEnd, cy1, xEnd + rr, cy1, sw);
  s += `<path d="M ${r(xEnd + rr)} ${r(cy1)} A ${r(rr)} ${r(rr)} 0 0 0 ${r(xEnd)} ${r(cy1 - rr)}" fill="none" stroke="${GREEN}" stroke-width="${r(sw)}"/>`;
  return s;
}

// Refined C: the stable home map, one corner sector lifted (offset + slight tilt) to feel
// dreamlike, centre accent fixed. centreStyle: 'solid' (filled square) or 'inset' (hollow square).
function diagramCRefined(cx, cy, c, sw, centreStyle) {
  const dx = c * 0.17, dy = -c * 0.17, ang = 5; // top-right sector drifts up-and-across, lifted
  let s = '';
  for (let i = -1; i <= 1; i++) {
    for (let j = -1; j <= 1; j++) {
      if (i === 0 && j === 0) continue; // centre handled below (fixed)
      if (i === 1 && j === -1) {
        const ox = cx + i * c + dx, oy = cy + j * c + dy;
        s += `<g transform="rotate(${ang} ${r(ox)} ${r(oy)})">${rect(ox - c / 2, oy - c / 2, c, c, { sw })}</g>`;
      } else {
        s += rect(cx + i * c - c / 2, cy + j * c - c / 2, c, c, { sw });
      }
    }
  }
  if (centreStyle === 'inset') {
    s += rect(cx - c / 2, cy - c / 2, c, c, { sw });                       // centre reads as a normal room
    const d = c * 0.42;
    s += rect(cx - d / 2, cy - d / 2, d, d, { sw, stroke: ORANGE });       // small hollow orange square accent
  } else {
    s += rect(cx - c / 2, cy - c / 2, c, c, { fill: ORANGE, stroke: null }); // solid orange square
  }
  return s;
}

// Every outer room slips out from the fixed centre (radial shift + small tilt), double-lined,
// with a hatched orange centre. Matches the uploaded sample. centreStyle: 'hatch' or 'solid'.
const SHIFT_TABLE = {
  '-1,-1': -3.5, '0,-1': 2.5, '1,-1': -2.0,
  '-1,0': 3.0, '1,0': -3.0,
  '-1,1': 2.0, '0,1': -2.5, '1,1': 3.5,
};
function diagramShiftedAll(cx, cy, c, sw, centreStyle) {
  const g = c * 0.12, inset = c * 0.06;
  let s = '';
  for (let i = -1; i <= 1; i++) {
    for (let j = -1; j <= 1; j++) {
      if (i === 0 && j === 0) continue;
      const ox = cx + i * c + i * g, oy = cy + j * c + j * g; // shifted radially out from centre
      s += cellDouble(ox, oy, c, inset, sw, GREEN, SHIFT_TABLE[`${i},${j}`]);
    }
  }
  // fixed centre, on its spot
  if (centreStyle === 'solid') {
    s += rect(cx - c / 2, cy - c / 2, c, c, { fill: ORANGE, stroke: null });
  } else { // hatch (the uploaded sample)
    s += cellDouble(cx, cy, c, inset, sw, ORANGE, 0);
    s += hatch(cx, cy, c - 2 * inset, c * 0.15, sw * 0.6, 'centreHatch');
  }
  return s;
}

// ----- diagrams for the other featured covers (same cover system, distinct motif) -----

function circle(ccx, ccy, rad, opts = {}) {
  const stroke = opts.stroke === undefined ? GREEN : opts.stroke;
  const fill = opts.fill || 'none';
  const sa = stroke ? ` stroke="${stroke}" stroke-width="${r(opts.sw)}"` : '';
  return `<circle cx="${r(ccx)}" cy="${r(ccy)}" r="${r(rad)}" fill="${fill}"${sa}/>`;
}

function polygon(pcx, pcy, rad, sides, rot, sw) {
  const pts = [];
  for (let k = 0; k < sides; k++) {
    const a = rot + k * (2 * Math.PI / sides);
    pts.push(`${r(pcx + rad * Math.cos(a))},${r(pcy + rad * Math.sin(a))}`);
  }
  return `<polygon points="${pts.join(' ')}" fill="none" stroke="${GREEN}" stroke-width="${r(sw)}" stroke-linejoin="miter"/>`;
}

// Personal Compass: an eight-direction rose in an octagon ring, one arm orange
function diagramCompassRose(cx, cy, c, sw) {
  const R = 1.4 * c, hub = 0.16 * c;
  const rot = -Math.PI / 2 + Math.PI / 8; // flat top edge
  let s = polygon(cx, cy, R, 8, rot, sw);
  for (let k = 0; k < 8; k++) {
    const a = -Math.PI / 2 + k * (Math.PI / 4); // spokes to the 8 directions
    const accent = k === 2; // one direction in orange
    const vx = cx + R * Math.cos(a), vy = cy + R * Math.sin(a);
    const ix = cx + hub * Math.cos(a), iy = cy + hub * Math.sin(a);
    s += `<line x1="${r(ix)}" y1="${r(iy)}" x2="${r(vx)}" y2="${r(vy)}" stroke="${accent ? ORANGE : GREEN}" stroke-width="${r(accent ? sw * 1.5 : sw)}"/>`;
    s += circle(vx, vy, accent ? 0.07 * c : 0.045 * c, accent ? { fill: ORANGE, stroke: null } : { fill: GREEN, stroke: null });
  }
  s += circle(cx, cy, hub, { sw });
  return s;
}

// Couple: two intersecting direction rings, the shared overlap accented orange
function diagramTwoRings(cx, cy, c, sw) {
  const R = 0.96 * c, d = 0.5 * c;
  const yi = Math.sqrt(Math.max(0, R * R - d * d));
  let s = `<path d="M ${r(cx)} ${r(cy - yi)} A ${r(R)} ${r(R)} 0 0 1 ${r(cx)} ${r(cy + yi)} A ${r(R)} ${r(R)} 0 0 1 ${r(cx)} ${r(cy - yi)} Z" fill="${ORANGE}" stroke="none"/>`;
  s += circle(cx - d, cy, R, { sw });
  s += circle(cx + d, cy, R, { sw });
  return s;
}

// Move-In: an open doorway beside a month calendar, one day accented orange
function diagramDoorCalendar(cx, cy, c, sw) {
  let s = '';
  const dw = 0.9 * c, dh = 1.4 * c, dx = cx - 1.5 * c, dy = cy - dh / 2;
  const hx = dx, hy = dy + dh, leaf = dh * 0.66;                       // hinge at bottom-left
  s += rect(dx, dy, dw, dh, { sw });                                   // door opening / frame
  s += `<line x1="${r(hx)}" y1="${r(hy)}" x2="${r(hx)}" y2="${r(hy - leaf)}" stroke="${GREEN}" stroke-width="${r(sw)}"/>`; // open leaf
  s += `<path d="M ${r(hx)} ${r(hy - leaf)} A ${r(leaf)} ${r(leaf)} 0 0 1 ${r(hx + leaf)} ${r(hy)}" fill="none" stroke="${GREEN}" stroke-width="${r(sw)}"/>`; // swing arc
  const cell = 0.32 * c, cols = 4, rows = 4;
  const gx = cx + 0.08 * c, gy = cy - (rows * cell) / 2;
  for (let i = 0; i < cols; i++) for (let j = 0; j < rows; j++) {
    const accent = i === 2 && j === 1;
    s += rect(gx + i * cell, gy + j * cell, cell, cell, accent ? { fill: ORANGE, stroke: null } : { sw: sw * 0.85 });
  }
  return s;
}

// 7-Day Reset: seven rooms on a winding path, the first node accented orange
function diagramSevenStep(cx, cy, c, sw) {
  const g = 0.92 * c, s7 = 0.5 * c;
  const pos = [
    [cx - g, cy - g], [cx, cy - g], [cx + g, cy - g],
    [cx + g, cy],
    [cx + g, cy + g], [cx, cy + g], [cx - g, cy + g],
  ];
  let s = `<path d="M ${pos.map((p) => `${r(p[0])} ${r(p[1])}`).join(' L ')}" fill="none" stroke="${GREEN}" stroke-width="${r(sw)}"/>`;
  for (const p of pos) s += rect(p[0] - s7 / 2, p[1] - s7 / 2, s7, s7, { sw, fill: IVORY });
  pos.forEach((p, i) => { s += circle(p[0], p[1], 0.1 * c, i === 0 ? { fill: ORANGE, stroke: null } : { fill: GREEN, stroke: null }); });
  return s;
}

// Twelve Spaces: a tight 3-wide x 4-tall grid of twelve rooms, one softly orange.
// (The tight grid is free for this product; the flagship owns the floating grid.)
function diagramTwelveGrid(cx, cy, c, sw) {
  const cell = 0.72 * c;
  const W = 3 * cell, H = 4 * cell;
  const x0 = cx - W / 2, y0 = cy - H / 2;
  let s = '';
  // one room accented (row 2, col 1)
  s += rect(x0 + 1 * cell, y0 + 1 * cell, cell, cell, { fill: ORANGE, stroke: null });
  s += rect(x0, y0, W, H, { sw });
  for (let i = 1; i < 3; i++) s += line(x0 + i * cell, y0, x0 + i * cell, y0 + H, sw);
  for (let j = 1; j < 4; j++) s += line(x0, y0 + j * cell, x0 + W, y0 + j * cell, sw);
  return s;
}

// Nine Life Areas: a colonnade of nine pillars under one beam, centre pillar orange.
function diagramNinePillars(cx, cy, c, sw) {
  const span = 2.9 * c, pw = 0.14 * c, ph = 2.0 * c;
  const beamY = cy - ph / 2 - 0.18 * c, baseY = cy + ph / 2 + 0.18 * c;
  let s = '';
  s += line(cx - span / 2 - 0.1 * c, beamY, cx + span / 2 + 0.1 * c, beamY, sw * 1.4);
  s += line(cx - span / 2 - 0.1 * c, baseY, cx + span / 2 + 0.1 * c, baseY, sw * 1.4);
  for (let i = 0; i < 9; i++) {
    const px = cx - span / 2 + (i * span) / 8;
    if (i === 4) s += rect(px - pw / 2, cy - ph / 2, pw, ph, { fill: ORANGE, stroke: null });
    else s += rect(px - pw / 2, cy - ph / 2, pw, ph, { sw });
  }
  return s;
}

const DIAGRAMS = {
  'variant-a-floating-grid': { fn: diagramA, kRight: 0.55, logoScale: 2.5, label: 'A  floating grid' },
  'variant-b-impossible-doorway': { fn: diagramB, kRight: 0.78, label: 'B  impossible doorway' },
  'variant-c-shifted-plane': { fn: diagramC, kRight: 0.56, label: 'C  shifted plane' },
};

// ----- the shared premium cover composition (identical for every variant) -----

function buildCoverSvg(W, H, diagramFn, kRight, scale = 0.98, logoScale = 1, title = TITLE, subtitle = SUBTITLE, logoColor = GREEN) {
  const marginX = 0.08 * W;
  // top block: logo, title, subtitle
  const logoH = 0.085 * W * logoScale;
  const logoTop = 0.072 * H;
  // auto-fit: shrink long titles so they never overflow the margins
  const titleF = Math.min(0.062 * W, (W - 2 * marginX) / (title.length * 0.55));
  const subF = 0.030 * W;
  const footerF = 0.026 * W;

  let y = logoTop + logoH + 0.05 * H;
  const titleBaseline = y;
  y += 0.028 * H;
  const subBaseline = y + subF;

  const footerBaseline = H - 0.072 * H;
  const footerTop = footerBaseline - footerF;

  // diagram band between the subtitle and the footer
  const bandTop = subBaseline + 0.045 * H;
  const bandBottom = footerTop - 0.05 * H;
  const cx = W / 2;
  const cy = (bandTop + bandBottom) / 2;

  const availV = (bandBottom - bandTop) / 2;
  const availRight = (W - marginX) - cx;
  const availLeft = cx - marginX;
  // D fits the grid vertically and horizontally, leaving room for each variant's reach
  const D = Math.min(2 * availV, 2 * availLeft / 1.05, availRight / kRight) * scale;
  const c = D / 3;
  const sw = Math.max(2.5, D * 0.0072);

  const logo = `<svg x="${r(cx - logoH / 2)}" y="${r(logoTop)}" width="${r(logoH)}" height="${r(logoH)}" viewBox="0 0 709 709">${LOGO_INNER.replace('#0e3b2c', logoColor)}</svg>`;

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <rect x="0" y="0" width="${W}" height="${H}" fill="${IVORY}"/>
  ${logo}
  <text x="${cx}" y="${r(titleBaseline)}" text-anchor="middle" font-family="Hanken Grotesk" font-weight="800" font-size="${r(titleF)}" fill="${GREEN}" letter-spacing="${r(titleF * -0.01)}">${title}</text>
  <text x="${cx}" y="${r(subBaseline)}" text-anchor="middle" font-family="Hanken Grotesk" font-weight="400" font-size="${r(subF)}" fill="${GREEN}">${subtitle}</text>
  ${diagramFn(cx, cy, c, sw)}
  <text x="${cx}" y="${r(footerBaseline)}" text-anchor="middle" font-family="Hanken Grotesk" font-weight="400" font-size="${r(footerF)}" fill="${GREEN}" letter-spacing="${r(footerF * 0.04)}">${FOOTER}</text>
</svg>`;
}

function renderPng(svg, width) {
  const resvg = new Resvg(svg, {
    fitTo: { mode: 'width', value: width },
    background: IVORY,
    font: { loadSystemFonts: false, fontFiles: FONT_FILES, defaultFontFamily: 'Hanken Grotesk' },
  });
  return resvg.render().asPng();
}

function main() {
  fs.mkdirSync(OUT_DIR, { recursive: true });
  const SIZES = [
    { name: 'cover-thumb', W: 1500, H: 1500 },
    { name: 'cover-portrait', W: 1024, H: 1536 },
  ];
  const thumbBuffers = {};

  for (const [key, def] of Object.entries(DIAGRAMS)) {
    for (const sz of SIZES) {
      const svg = buildCoverSvg(sz.W, sz.H, def.fn, def.kRight, 0.98, def.logoScale || 1);
      fs.writeFileSync(path.join(OUT_DIR, `${key}.${sz.name}.svg`), svg);
      const png = renderPng(svg, sz.W);
      fs.writeFileSync(path.join(OUT_DIR, `${key}.${sz.name}.png`), png);
      if (sz.name === 'cover-thumb') thumbBuffers[key] = png;
      console.log(`rendered ${key}.${sz.name}.png (${sz.W}x${sz.H})`);
    }
  }

  // contact sheet: the three thumbs side by side for quick comparison
  const cw = 760, pad = 50, labelH = 70;
  const keys = Object.keys(DIAGRAMS);
  const sheetW = keys.length * cw + (keys.length + 1) * pad;
  const sheetH = pad + cw + 14 + labelH + pad;
  let imgs = '';
  keys.forEach((key, i) => {
    const x = pad + i * (cw + pad);
    const b64 = thumbBuffers[key].toString('base64');
    imgs += `<image x="${x}" y="${pad}" width="${cw}" height="${cw}" href="data:image/png;base64,${b64}"/>`;
    imgs += `<rect x="${x}" y="${pad}" width="${cw}" height="${cw}" fill="none" stroke="${GREEN}" stroke-width="2"/>`;
    imgs += `<text x="${x + cw / 2}" y="${pad + cw + 50}" text-anchor="middle" font-family="Hanken Grotesk" font-weight="800" font-size="34" fill="${GREEN}">${DIAGRAMS[key].label}</text>`;
  });
  const sheetSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="${sheetW}" height="${sheetH}" viewBox="0 0 ${sheetW} ${sheetH}"><rect width="${sheetW}" height="${sheetH}" fill="${IVORY}"/>${imgs}</svg>`;
  fs.writeFileSync(path.join(OUT_DIR, 'contact-sheet.svg'), sheetSvg);
  fs.writeFileSync(path.join(OUT_DIR, 'contact-sheet.png'), renderPng(sheetSvg, sheetW));
  console.log(`rendered contact-sheet.png (${sheetW}x${sheetH})`);

  // --- chosen direction C (shifted plane), refined, with two orange accent options ---
  const cOptions = [
    { key: 'variant-c-refined-solid', style: 'solid', label: 'C - solid square accent' },
    { key: 'variant-c-refined-inset', style: 'inset', label: 'C - inset hollow square accent' },
  ];
  const cThumbs = {};
  for (const opt of cOptions) {
    for (const sz of SIZES) {
      const svg = buildCoverSvg(sz.W, sz.H, (cx, cy, c, sw) => diagramCRefined(cx, cy, c, sw, opt.style), 0.56, 0.9);
      fs.writeFileSync(path.join(OUT_DIR, `${opt.key}.${sz.name}.svg`), svg);
      const png = renderPng(svg, sz.W);
      fs.writeFileSync(path.join(OUT_DIR, `${opt.key}.${sz.name}.png`), png);
      if (sz.name === 'cover-thumb') cThumbs[opt.key] = png;
      console.log(`rendered ${opt.key}.${sz.name}.png (${sz.W}x${sz.H})`);
    }
  }
  // 2-up comparison of the two orange options
  const ckeys = cOptions.map((o) => o.key);
  const csW = ckeys.length * cw + (ckeys.length + 1) * pad;
  const csH = pad + cw + 14 + labelH + pad;
  let cImgs = '';
  ckeys.forEach((key, i) => {
    const x = pad + i * (cw + pad);
    const b64 = cThumbs[key].toString('base64');
    cImgs += `<image x="${x}" y="${pad}" width="${cw}" height="${cw}" href="data:image/png;base64,${b64}"/>`;
    cImgs += `<rect x="${x}" y="${pad}" width="${cw}" height="${cw}" fill="none" stroke="${GREEN}" stroke-width="2"/>`;
    cImgs += `<text x="${x + cw / 2}" y="${pad + cw + 50}" text-anchor="middle" font-family="Hanken Grotesk" font-weight="800" font-size="32" fill="${GREEN}">${cOptions[i].label}</text>`;
  });
  const cSheet = `<svg xmlns="http://www.w3.org/2000/svg" width="${csW}" height="${csH}" viewBox="0 0 ${csW} ${csH}"><rect width="${csW}" height="${csH}" fill="${IVORY}"/>${cImgs}</svg>`;
  fs.writeFileSync(path.join(OUT_DIR, 'contact-sheet-c-refined.svg'), cSheet);
  fs.writeFileSync(path.join(OUT_DIR, 'contact-sheet-c-refined.png'), renderPng(cSheet, csW));
  console.log('rendered contact-sheet-c-refined.png');

  // --- all-sectors-shifted (each outer room slips out from the fixed centre), bigger logo ---
  const asOptions = [
    { key: 'variant-c-allshift-hatch', style: 'hatch', label: 'all-shift - hatched centre (your sample)' },
    { key: 'variant-c-allshift-solid', style: 'solid', label: 'all-shift - solid centre' },
  ];
  const asThumbs = {};
  for (const opt of asOptions) {
    for (const sz of SIZES) {
      const svg = buildCoverSvg(sz.W, sz.H, (cx, cy, c, sw) => diagramShiftedAll(cx, cy, c, sw, opt.style), 0.58, 0.86, 2.5);
      fs.writeFileSync(path.join(OUT_DIR, `${opt.key}.${sz.name}.svg`), svg);
      const png = renderPng(svg, sz.W);
      fs.writeFileSync(path.join(OUT_DIR, `${opt.key}.${sz.name}.png`), png);
      if (sz.name === 'cover-thumb') asThumbs[opt.key] = png;
      console.log(`rendered ${opt.key}.${sz.name}.png (${sz.W}x${sz.H})`);
    }
  }
  const asKeys = asOptions.map((o) => o.key);
  const asW = asKeys.length * cw + (asKeys.length + 1) * pad;
  const asH = pad + cw + 14 + labelH + pad;
  let asImgs = '';
  asKeys.forEach((key, i) => {
    const x = pad + i * (cw + pad);
    const b64 = asThumbs[key].toString('base64');
    asImgs += `<image x="${x}" y="${pad}" width="${cw}" height="${cw}" href="data:image/png;base64,${b64}"/>`;
    asImgs += `<rect x="${x}" y="${pad}" width="${cw}" height="${cw}" fill="none" stroke="${GREEN}" stroke-width="2"/>`;
    asImgs += `<text x="${x + cw / 2}" y="${pad + cw + 50}" text-anchor="middle" font-family="Hanken Grotesk" font-weight="800" font-size="30" fill="${GREEN}">${asOptions[i].label}</text>`;
  });
  const asSheet = `<svg xmlns="http://www.w3.org/2000/svg" width="${asW}" height="${asH}" viewBox="0 0 ${asW} ${asH}"><rect width="${asW}" height="${asH}" fill="${IVORY}"/>${asImgs}</svg>`;
  fs.writeFileSync(path.join(OUT_DIR, 'contact-sheet-c-allshift.svg'), asSheet);
  fs.writeFileSync(path.join(OUT_DIR, 'contact-sheet-c-allshift.png'), renderPng(asSheet, asW));
  console.log('rendered contact-sheet-c-allshift.png');

  // --- covers for the other featured products, same cover system, to even out the shelf ---
  const FEATURED = [
    { key: 'variant-personal-compass', fn: diagramCompassRose, title: 'Personal Feng Shui Compass', sub: 'Your Kua number, your eight directions' },
    { key: 'variant-couple-compass', fn: diagramTwoRings, title: 'Couple Compatibility Compass', sub: 'Two people, one home' },
    { key: 'variant-move-in', fn: diagramDoorCalendar, title: 'Move-In Date Report', sub: 'Your move-in window, read day by day' },
    { key: 'variant-seven-day', fn: diagramSevenStep, title: '7-Day Home Reset', sub: 'One calm task a day, room by room' },
  ];
  const famThumbs = {};
  for (const f of FEATURED) {
    for (const sz of SIZES) {
      const svg = buildCoverSvg(sz.W, sz.H, f.fn, 0.56, 0.86, 2.5, f.title, f.sub);
      fs.writeFileSync(path.join(OUT_DIR, `${f.key}.${sz.name}.svg`), svg);
      const png = renderPng(svg, sz.W);
      fs.writeFileSync(path.join(OUT_DIR, `${f.key}.${sz.name}.png`), png);
      if (sz.name === 'cover-thumb') famThumbs[f.key] = png;
      console.log(`rendered ${f.key}.${sz.name}.png`);
    }
  }
  // family sheet: Complete Home (floating grid) + the four new covers
  const fam = [
    { buf: fs.readFileSync(path.join(OUT_DIR, 'variant-a-floating-grid.cover-thumb.png')), label: 'Complete Home' },
    { buf: famThumbs['variant-personal-compass'], label: 'Personal' },
    { buf: famThumbs['variant-couple-compass'], label: 'Couple' },
    { buf: famThumbs['variant-move-in'], label: 'Move-In' },
    { buf: famThumbs['variant-seven-day'], label: '7-Day Reset' },
  ];
  const fcw = 460, fpad = 36, flabel = 56;
  const fW = fam.length * fcw + (fam.length + 1) * fpad;
  const fH = fpad + fcw + 12 + flabel + fpad;
  let fImgs = '';
  fam.forEach((it, i) => {
    const x = fpad + i * (fcw + fpad);
    fImgs += `<image x="${x}" y="${fpad}" width="${fcw}" height="${fcw}" href="data:image/png;base64,${it.buf.toString('base64')}"/>`;
    fImgs += `<rect x="${x}" y="${fpad}" width="${fcw}" height="${fcw}" fill="none" stroke="${GREEN}" stroke-width="2"/>`;
    fImgs += `<text x="${x + fcw / 2}" y="${fpad + fcw + 42}" text-anchor="middle" font-family="Hanken Grotesk" font-weight="800" font-size="30" fill="${GREEN}">${it.label}</text>`;
  });
  const famSheet = `<svg xmlns="http://www.w3.org/2000/svg" width="${fW}" height="${fH}" viewBox="0 0 ${fW} ${fH}"><rect width="${fW}" height="${fH}" fill="${IVORY}"/>${fImgs}</svg>`;
  fs.writeFileSync(path.join(OUT_DIR, 'contact-sheet-featured-family.svg'), famSheet);
  fs.writeFileSync(path.join(OUT_DIR, 'contact-sheet-featured-family.png'), renderPng(famSheet, fW));
  console.log('rendered contact-sheet-featured-family.png');

  // --- A3 (shop redesign): covers for the two bundle compasses ---
  const A3_DIR = path.join(VP_ROOT, 'drafts', '2026-07-18-a3-bundle-covers');
  fs.mkdirSync(A3_DIR, { recursive: true });
  const A3 = [
    { key: 'twelve-spaces', fn: diagramTwelveGrid, title: 'Twelve Spaces Compass', sub: 'Every room of your home, read for your Kua', label: 'Twelve Spaces' },
    { key: 'nine-pillars', fn: diagramNinePillars, title: 'Nine Life Areas Compass', sub: 'All nine life areas, read for your Kua', label: 'Nine Life Areas' },
  ];
  const a3Thumbs = {};
  for (const p of A3) {
    for (const sz of SIZES) {
      const svg = buildCoverSvg(sz.W, sz.H, p.fn, 0.56, 0.9, 2.5, p.title, p.sub, ORANGE);
      fs.writeFileSync(path.join(A3_DIR, `${p.key}.${sz.name}.svg`), svg);
      const png = renderPng(svg, sz.W);
      fs.writeFileSync(path.join(A3_DIR, `${p.key}.${sz.name}.png`), png);
      if (sz.name === 'cover-thumb') a3Thumbs[p.key] = png;
      console.log(`rendered a3 ${p.key}.${sz.name}.png`);
    }
  }
  const a3W = 2 * cw + 3 * pad, a3H = pad + cw + 14 + labelH + pad;
  let a3Imgs = '';
  A3.forEach((p, i) => {
    const x = pad + i * (cw + pad);
    a3Imgs += `<image x="${x}" y="${pad}" width="${cw}" height="${cw}" href="data:image/png;base64,${a3Thumbs[p.key].toString('base64')}"/>`;
    a3Imgs += `<rect x="${x}" y="${pad}" width="${cw}" height="${cw}" fill="none" stroke="${GREEN}" stroke-width="2"/>`;
    a3Imgs += `<text x="${x + cw / 2}" y="${pad + cw + 50}" text-anchor="middle" font-family="Hanken Grotesk" font-weight="800" font-size="34" fill="${GREEN}">${p.label}</text>`;
  });
  const a3Sheet = `<svg xmlns="http://www.w3.org/2000/svg" width="${a3W}" height="${a3H}" viewBox="0 0 ${a3W} ${a3H}"><rect width="${a3W}" height="${a3H}" fill="${IVORY}"/>${a3Imgs}</svg>`;
  fs.writeFileSync(path.join(A3_DIR, 'contact-sheet.svg'), a3Sheet);
  fs.writeFileSync(path.join(A3_DIR, 'contact-sheet.png'), renderPng(a3Sheet, a3W));
  console.log('rendered a3 contact-sheet.png');

  console.log('output dir:', OUT_DIR);
}

main();
