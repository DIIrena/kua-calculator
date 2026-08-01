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
  const photo = b64(`public/products/${p.slug}/hero.jpg`);
  // Auto-size the masthead so long words stay within the page width.
  const mfs = Math.min(108, Math.round((108 * 7.2) / Math.max(7.2, p.masthead.length)));
  return `<!doctype html><html><head><meta charset="utf-8"><style>
@font-face{font-family:"Bodoni Moda";font-style:normal;src:url(data:font/ttf;base64,${bodoni}) format("truetype");}
@font-face{font-family:"Bodoni Moda";font-style:italic;src:url(data:font/ttf;base64,${bodoniItalic}) format("truetype");}
@font-face{font-family:"Hanken Grotesk";font-weight:800;src:url(data:font/ttf;base64,${hankenXB}) format("truetype");}
@font-face{font-family:"Hanken Grotesk";font-weight:400;src:url(data:font/ttf;base64,${hanken}) format("truetype");}
*{margin:0;padding:0;box-sizing:border-box}
html,body{font-family:"Hanken Grotesk",sans-serif}
.cover{width:210mm;height:296.5mm;position:relative;overflow:hidden;display:flex;flex-direction:column;justify-content:space-between;text-align:center}
.cover-bleed{position:absolute;inset:0;background-image:url(data:image/jpeg;base64,${photo});background-size:cover;background-position:center;background-color:#f2f2ee}
.cover-scrim{position:absolute;inset:0;background:linear-gradient(180deg,rgba(14,59,44,.52) 0%,rgba(14,59,44,.16) 26%,rgba(14,59,44,0) 44%),linear-gradient(0deg,rgba(14,59,44,.62) 0%,rgba(14,59,44,.22) 26%,rgba(14,59,44,0) 50%)}
.cover-top{position:relative;padding-top:12mm}
.cover-logo{width:21mm;height:21mm;margin:0 auto 3mm auto}
.cover-masthead{font-family:"Bodoni Moda","Didot",serif;font-size:${mfs}pt;line-height:1;font-weight:600;letter-spacing:.015em;text-indent:.015em;text-transform:uppercase;color:#fcfcf8;text-shadow:0 1px 6px rgba(14,59,44,.35);white-space:nowrap;${process.env.ITALIC === "1" ? "font-style:italic;" : ""}}
.cover-brand{font-size:10pt;letter-spacing:.42em;text-indent:.42em;text-transform:uppercase;color:#fcfcf8;margin-top:3mm}
.cover-bottom{position:relative;padding-bottom:15mm}
.cover-title{font-size:24pt;line-height:1.15;font-weight:800;margin:0 auto 4mm auto;max-width:168mm;color:#fcfcf8}
.cover-title em{font-style:italic;color:#d9531a;font-weight:800}
.cover-sub{font-size:11pt;color:rgba(252,252,248,.9);margin:0;letter-spacing:.01em}
</style></head><body>
<div class="cover">
  <div class="cover-bleed"></div>
  <div class="cover-scrim"></div>
  <div class="cover-top">
    <div class="cover-logo">${MARK}</div>
    <p class="cover-masthead">${p.masthead}</p>
    <p class="cover-brand">My Feng Shui Home</p>
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
await page.setViewport({ width: 794, height: 1121, deviceScaleFactor: 2 });
const list = process.env.ONLY ? PRODUCTS.filter((p) => p.slug === process.env.ONLY) : PRODUCTS;
for (const p of list) {
  await page.setContent(coverHtml(p), { waitUntil: "load", timeout: 120000 });
  await page.evaluate(async () => { await document.fonts.ready; });
  await new Promise((r) => setTimeout(r, 400));
  const out = process.env.OUTDIR
    ? `${process.env.OUTDIR}/${p.slug}.png`
    : process.env.OUT || `public/products/${p.slug}/cover-portrait.png`;
  await page.screenshot({ path: out, clip: { x: 0, y: 0, width: 794, height: 1121 } });
  console.log("cover:", p.slug, p.masthead, process.env.ITALIC === "1" ? "(italic)" : "", "->", out);
}
await br.close();
console.log("done", PRODUCTS.length, "covers");
