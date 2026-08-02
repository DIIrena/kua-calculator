import puppeteer from "puppeteer-core";
import { readFileSync, existsSync } from "fs";

// Batch premium-cover renderer: the magazine cover system (hero photo +
// orange logo + one-word Didone masthead + full title) extended to the
// printable products. Overwrites each product's cover-portrait.png; the
// shop mockup is then built by scripts/build-mockup-cover.mjs.

const PRODUCTS = [
  { slug: "business-money-feng-shui", masthead: "MONEY", title: "The Business &amp; <em>Money</em> Kit", sub: "The money-channel reading for your home" },
  { slug: "annual-feng-shui-planner-2026", masthead: "PLANNER", title: "2026 Feng Shui <em>Planner</em>", sub: "The rest of the year, in one book" },
  { slug: "cures-catalog", masthead: "CURES", title: "<em>Cures</em> &amp; Crystals Catalogue", sub: "The honest reference" },
  { slug: "five-elements-workbook", masthead: "ELEMENTS", title: "Five <em>Elements</em> Workbook", sub: "Read any room in five words" },
  { slug: "healthy-home-audit", masthead: "HEALTHY", title: "Healthy Home <em>Audit</em>", sub: "Nine conditions a home can support" },
  { slug: "bazi-basics", masthead: "BAZI", title: "<em>BaZi</em> Basics", sub: "Read your own chart" },
  { slug: "home-diagnostic-workbook", masthead: "AUDIT", title: "10-Step Home <em>Diagnostic</em>", sub: "Audit your home like a practitioner" },
  { slug: "bedroom-reset", masthead: "RESET", title: "Bedroom &amp; Relationship <em>Reset</em>", sub: "The bedroom, walked from the door inward" },
  { slug: "daily-ritual-pack", masthead: "RITUAL", title: "Daily <em>Ritual</em> &amp; Twenty Laws", sub: "A calm daily rhythm" },
  { slug: "starter-deck", masthead: "STARTER", title: "Learn Feng Shui <em>Starter</em> Deck", sub: "The working vocabulary, twenty-four cards" },
  { slug: "good-days-calendar-2026", masthead: "GOOD DAYS", title: "2026 <em>Good-Days</em> Calendar", sub: "Plan around the favourable days" },
  { slug: "seven-day-home-reset", masthead: "SEVEN DAYS", title: "7-Day Home <em>Reset</em>", sub: "One calm task a day, room by room" },
];

// The personalised Compass line (teal spine). Photos are each product's
// existing cover plate; move-in borrows the shop threshold shot.
const COMPASS_PRODUCTS = [
  { slug: "personal-feng-shui-compass", masthead: "PERSONAL", title: "Personal Feng Shui <em>Compass</em>", sub: "Your Kua and your eight directions, in depth", photo: "content/photos/cover-personal-compass.jpg" },
  { slug: "all-twelve-spaces-compass", masthead: "SPACES", title: "Twelve <em>Spaces</em> Compass", sub: "Every room of your home, read for your Kua", photo: "content/photos/cover-all-twelve-spaces-compass.jpg" },
  { slug: "complete-home-compass", masthead: "COMPLETE", title: "Complete <em>Home</em> Compass", sub: "Rooms, life areas, compatibility and the 2026 year", photo: "content/photos/cover-complete-home-compass.jpg" },
  { slug: "extended-personal-kua-report", masthead: "EXTENDED", title: "Extended Personal <em>Kua</em> Report", sub: "Directions, three rooms, compatibility and 2026", photo: "content/photos/cover-extended-personal-kua.jpg" },
  { slug: "all-nine-pillars-compass", masthead: "LIFE AREAS", title: "Nine <em>Life Areas</em> Compass", sub: "All nine bagua areas, read for your Kua", photo: "content/photos/cover.jpg" },
  { slug: "move-in-kit", masthead: "MOVE-IN", title: "Move-In <em>Date</em> Report", sub: "Choose your moving day with reasons in hand", photo: "public/shop-hero.jpg" },
  { slug: "couple-compatibility-compass", masthead: "COUPLE", title: "Couple <em>Compatibility</em> Compass", sub: "Two people, one home, read together", photo: "content/photos/cover.jpg" },
];

// Page geometry. Defaults are the A4-proportioned shop cover (210 x 296.5mm
// at 794 x 1121 CSS px). The planner PDF build overrides these to US Letter
// (215.9 x 279.4mm at 816 x 1056) so the cover art is composed for the trim
// size it will actually print at, rather than cropped to fit.
const PAGE_W_MM = process.env.PAGE_W_MM || "210";
const PAGE_H_MM = process.env.PAGE_H_MM || "296.5";
const VIEW_W = Number(process.env.VIEW_W || 794);
const VIEW_H = Number(process.env.VIEW_H || 1121);
const SCALE = Number(process.env.SCALE || 2);
const FORMAT = process.env.FORMAT || "png";
const QUALITY = Number(process.env.QUALITY || 90);

const exe = ["C:/Program Files/Google/Chrome/Application/chrome.exe"].find(existsSync);
const b64 = (p) => readFileSync(p).toString("base64");
const bodoni = b64("lib/fonts/BodoniModa-Variable.ttf");
const bodoniItalic = b64("lib/fonts/BodoniModa-Italic-Variable.ttf");
const hankenXB = b64("lib/fonts/HankenGrotesk-ExtraBold.ttf");
const hanken = b64("lib/fonts/HankenGrotesk-Regular.ttf");

const MARK = `<svg viewBox="0 0 709 709" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
  <g transform="translate(0,709) scale(0.1,-0.1)" fill="#d9531a" stroke="none">
    <path d="M2099 6066 c-360 -52 -679 -212 -929 -466 -423 -429 -566 -1046 -376 -1615 47 -140 104 -256 188 -381 62 -93 172 -206 1314 -1343 l1247 -1241 516 509 c284 280 852 846 1262 1258 794 797 793 795 890 993 439 885 -19 1938 -969 2230 -171 52 -259 64 -462 64 -151 0 -205 -4 -296 -22 -225 -45 -416 -124 -599 -247 -100 -68 -182 -146 -915 -874 l-805 -800 250 0 250 -1 690 683 c750 741 732 725 936 814 357 154 811 121 1138 -85 317 -199 517 -494 576 -852 25 -147 17 -368 -19 -503 -29 -111 -74 -221 -137 -335 -39 -70 -109 -143 -749 -785 -388 -390 -897 -897 -1131 -1128 l-426 -419 -1107 1102 c-616 612 -1126 1128 -1150 1162 -247 348 -286 836 -99 1234 115 243 323 454 571 577 387 191 853 168 1217 -60 l83 -52 126 126 125 126 -42 30 c-199 143 -418 239 -653 285 -140 28 -380 35 -515 16z"/>
    <path d="M3904 4889 l-121 -121 321 -319 321 -318 250 -1 250 0 -440 440 c-242 242 -444 440 -450 440 -6 0 -65 -54 -131 -121z"/>
    <path d="M3486 4326 c-57 -21 -88 -47 -116 -97 -51 -92 -18 -210 74 -264 92 -54 218 -22 270 68 32 56 40 97 27 145 -32 116 -152 186 -255 148z"/>
    <path d="M2660 3330 l0 -470 885 0 885 0 0 470 0 470 -175 0 -175 0 0 -290 0 -290 -535 0 -535 0 0 290 0 290 -175 0 -175 0 0 -470z"/>
  </g>
</svg>`;

function coverHtml(p) {
  const photo = b64(p.photo || `public/products/${p.slug}/hero.jpg`);
  // One uniform masthead size across the whole line (MFS), so a short word
  // like CURES is not larger than ELEMENTS. Falls back to the old auto-fit
  // only if MFS is unset.
  const mfs = process.env.MFS ? Number(process.env.MFS) : 120; // uniform size; auto-fit only shrinks a word that would overflow the page
  // Pin the optical size low (opsz 20) so the Didone hairlines stay visible;
  // auto optical sizing at display sizes makes the thin strokes vanish.
  const opsz = process.env.OPSZ || "20";
  const wght = process.env.WGHT || "640";
  const vary = `font-optical-sizing:none;font-variation-settings:"opsz" ${opsz},"wght" ${wght};font-weight:${wght};`;
  // Collection spine defaults by line (Kits = pale turquoise, Compass = teal).
  const isCompass = process.env.LINE === "compass";
  const spineColor = process.env.SPINE_COLOR || (isCompass ? "#2f5d62" : "#a8d8d0");
  const spineTextColor = process.env.SPINE_TEXT_COLOR || (isCompass ? "#fcfcf8" : "#0e3b2c");
  const spineText = process.env.SPINE_TEXT || (isCompass ? "The Compass Collection" : "Kits & Guides Collection");
  return `<!doctype html><html><head><meta charset="utf-8"><style>
@font-face{font-family:"Bodoni Moda";font-style:normal;src:url(data:font/ttf;base64,${bodoni}) format("truetype");}
@font-face{font-family:"Bodoni Moda";font-style:italic;src:url(data:font/ttf;base64,${bodoniItalic}) format("truetype");}
@font-face{font-family:"Hanken Grotesk";font-weight:800;src:url(data:font/ttf;base64,${hankenXB}) format("truetype");}
@font-face{font-family:"Hanken Grotesk";font-weight:400;src:url(data:font/ttf;base64,${hanken}) format("truetype");}
*{margin:0;padding:0;box-sizing:border-box}
html,body{font-family:"Hanken Grotesk",sans-serif}
.cover{width:${PAGE_W_MM}mm;height:${PAGE_H_MM}mm;position:relative;overflow:hidden;display:flex;flex-direction:column;justify-content:space-between;text-align:center}
.cover-bleed{position:absolute;inset:0;background-image:url(data:image/jpeg;base64,${photo});background-size:cover;background-position:center;background-color:#f2f2ee}
.cover-spine{position:absolute;${process.env.SPINE_SIDE === "right" ? "right:0" : "left:0"};top:0;bottom:0;width:12mm;display:flex;align-items:center;justify-content:center;z-index:4}
.cover-spine span{writing-mode:vertical-rl;transform:rotate(180deg);text-transform:uppercase;letter-spacing:.26em;text-indent:.26em;font-size:8.5pt;font-weight:800;color:#fcfcf8;white-space:nowrap}
.cover-scrim{position:absolute;inset:0;background:linear-gradient(180deg,rgba(14,59,44,.52) 0%,rgba(14,59,44,.16) 26%,rgba(14,59,44,0) 44%),linear-gradient(0deg,rgba(14,59,44,.62) 0%,rgba(14,59,44,.22) 26%,rgba(14,59,44,0) 50%)}
.cover-top{position:relative;padding-top:12mm}
.cover-logo{width:21mm;height:21mm;margin:0 auto 3mm auto}
.cover-masthead{font-family:"Bodoni Moda","Didot",serif;font-size:${mfs}pt;line-height:1;font-weight:600;letter-spacing:.015em;text-indent:.015em;text-transform:uppercase;color:#fcfcf8;text-shadow:0 1px 8px rgba(14,59,44,.45);white-space:nowrap;font-style:italic;${vary}}
.cover-brand{font-size:10pt;letter-spacing:.42em;text-indent:.42em;text-transform:uppercase;color:#fcfcf8;margin-top:3mm}
.cover-series{display:flex;align-items:center;justify-content:center;gap:9px;margin:5mm auto 0}
.cover-series .r{height:1px;width:34px;background:rgba(252,252,248,.55)}
.cover-series .t{font-size:8.5pt;letter-spacing:.34em;text-indent:.34em;text-transform:uppercase;color:#fcfcf8;font-weight:700}
.cover-bottom{position:relative;padding-bottom:15mm}
.cover-title{font-size:24pt;line-height:1.15;font-weight:800;margin:0 auto 4mm auto;max-width:168mm;color:#fcfcf8}
.cover-title em{font-style:italic;color:#d9531a;font-weight:800}
.cover-sub{font-size:11pt;color:rgba(252,252,248,.9);margin:0;letter-spacing:.01em}
</style></head><body>
<div class="cover">
  <div class="cover-bleed"></div>
  <div class="cover-scrim"></div>
  <div class="cover-spine" style="background:${spineColor}"><span style="color:${spineTextColor}">${spineText}</span></div>
  <div class="cover-top">
    <div class="cover-logo">${MARK}</div>
    <p class="cover-masthead">${p.masthead}</p>
    <p class="cover-brand">My Feng Shui Home</p>
    ${process.env.SERIES ? `<div class="cover-series"><span class="r"></span><span class="t">${process.env.SERIES}</span><span class="r"></span></div>` : ""}
  </div>
  <div class="cover-bottom">
    <h1 class="cover-title">${p.title}</h1>
    <p class="cover-sub">${p.sub}</p>
  </div>
</div>
</body></html>`;
}

const br = await puppeteer.launch({ executablePath: exe, headless: true, args: ["--no-sandbox"] });
const page = await br.newPage();
page.setDefaultTimeout(120000);
page.setDefaultNavigationTimeout(120000);
await page.setViewport({ width: VIEW_W, height: VIEW_H, deviceScaleFactor: SCALE });
const LINE = process.env.LINE === "compass" ? COMPASS_PRODUCTS : PRODUCTS;
const list = process.env.ONLY ? LINE.filter((p) => p.slug === process.env.ONLY) : LINE;
for (const p of list) {
  await page.setContent(coverHtml(p), { waitUntil: "load", timeout: 120000 });
  await page.evaluate(async () => { await document.fonts.ready; });
  await new Promise((r) => setTimeout(r, 400));
  // Auto-fit: keep the masthead at its cap size unless it is wider than the
  // page, then shrink just enough to fit. So short words stay big and long
  // words settle at the largest size that fits.
  await page.evaluate(() => {
    const el = document.querySelector(".cover-masthead");
    const cover = document.querySelector(".cover");
    const spine = document.querySelector(".cover-spine");
    const spineW = spine ? spine.offsetWidth : 0;
    // Keep the centred masthead clear of the spine on either side.
    const avail = (cover.clientWidth - 2 * spineW) * 0.94;
    if (el.scrollWidth > avail) {
      const base = parseFloat(getComputedStyle(el).fontSize);
      el.style.fontSize = (base * avail) / el.scrollWidth + "px";
    }
  });
  await new Promise((r) => setTimeout(r, 120));
  const out = process.env.OUTDIR
    ? `${process.env.OUTDIR}/${p.slug}.${FORMAT}`
    : process.env.OUT || `public/products/${p.slug}/cover-portrait.${FORMAT}`;
  // JPEG is the format for covers bound into a PDF: a lossless PNG of a
  // full-bleed photo adds megabytes to a file readers download.
  const shot = { path: out, clip: { x: 0, y: 0, width: VIEW_W, height: VIEW_H } };
  if (FORMAT === "jpeg") { shot.type = "jpeg"; shot.quality = QUALITY; }
  await page.screenshot(shot);
  console.log("cover:", p.slug, p.masthead, "->", out);
}
await br.close();
console.log("done", list.length, "covers");
