// Batch-render sample PDFs for the personalised products, for the
// owner's look-inside review (P5). Downloads each sample from the dev
// route into scripts/out/previews/. NOTHING is installed into public/;
// that happens only after the owner approves pages (see
// spec/preview-production-walkthrough-2026-07-20.md).
//
// Requires the dev server running in another terminal: npm run dev
//
// Usage: node scripts/render-sample-previews.mjs [--base=http://localhost:3000]

import { writeFileSync, mkdirSync } from "node:fs";
import path from "node:path";

const args = Object.fromEntries(
  process.argv.slice(2).map((a) => {
    const m = a.match(/^--([a-z-]+)(?:=(.*))?$/);
    return m ? [m[1], m[2] ?? true] : [a, true];
  }),
);
const BASE = typeof args.base === "string" ? args.base : "http://localhost:3000";
const OUT = path.join(process.cwd(), "scripts", "out", "previews");
mkdirSync(OUT, { recursive: true });

// Recipe slugs from lib/products.ts. The sample buyer is Ana, Kua 8
// (1985, female): a West-group reading, so the pages differ visibly
// from the Marco/East default the team has seen everywhere.
const RECIPES = [
  "personal-compass",
  "extended-personal-kua",
  "all-nine-pillars-compass",
  "all-twelve-spaces-compass",
  "complete-home-compass",
];
const QUERY = "name=Ana&year=1985&month=9&day=12&gender=female";

let failures = 0;
for (const slug of RECIPES) {
  const url = `${BASE}/api/dev/sample-compass?product=${slug}&${QUERY}`;
  process.stdout.write(`rendering ${slug} ... `);
  try {
    const res = await fetch(url);
    if (!res.ok) {
      console.log(`FAILED (${res.status}): ${(await res.text()).slice(0, 120)}`);
      failures += 1;
      continue;
    }
    const buf = Buffer.from(await res.arrayBuffer());
    const file = path.join(OUT, `${slug}-sample.pdf`);
    writeFileSync(file, buf);
    console.log(`ok (${Math.round(buf.length / 1024)} KB)`);
  } catch (err) {
    console.log(`FAILED: ${err.message}`);
    console.log(`Is the dev server running? Start it with: npm run dev`);
    failures += 1;
    break;
  }
}
console.log(
  failures
    ? `\nDone with ${failures} failure(s).`
    : `\nDone. Review the PDFs in scripts/out/previews/`,
);
