// Newsletter list scrub after the 2026-08-10..14 bot flood.
//
// SAFE BY DEFAULT: without --apply this is a dry run. It fetches the
// newsletter segment of product_waitlist, applies the heuristics below,
// and writes a review sheet (scripts/out/newsletter-scrub-<date>.md)
// plus the machine-readable removal list
// (scripts/out/newsletter-scrub-remove.json). It deletes NOTHING.
//
// After the owner reviews the sheet (moving any address between lists
// by editing the JSON), run with --apply to delete the REMOVE rows from
// Supabase. Only the "newsletter" slug is ever touched.
//
// Usage (from projects/kua-calculator):
//   node scripts/scrub-newsletter-list.mjs
//   node scripts/scrub-newsletter-list.mjs --apply
//
// Heuristics (each REMOVE carries its reason on the sheet):
//   R1 flood-window : created_at on/after 2026-08-10, the bot-flood
//                     start. The site had near-zero traffic; a real
//                     signup in this window is vanishingly unlikely.
//   R2 dotted-gmail : gmail/googlemail local part with consecutive
//                     dots or four+ dots, the classic list-bombing
//                     signature.
//   R3 role-inbox   : sales@ / support@ / info@ style role addresses,
//                     which people do not use to follow a feng shui
//                     newsletter.
//   Owner addresses are always kept.

import { readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const OUT_DIR = path.join(ROOT, "scripts", "out");
const TODAY = new Date().toISOString().slice(0, 10);
const SHEET_PATH = path.join(OUT_DIR, `newsletter-scrub-${TODAY}.md`);
const REMOVE_PATH = path.join(OUT_DIR, "newsletter-scrub-remove.json");

const FLOOD_START = "2026-08-10";
const OWNER_KEEP = new Set(["diirena@gmail.com", "superspecialsecretsquad@gmail.com"]);
const ROLE_PREFIXES = new Set([
  "info", "sales", "support", "questions", "admin", "office", "contact",
  "controller", "billing", "accounts", "marketing", "webmaster",
  "postmaster", "noreply", "no-reply", "enquiries", "orders",
]);

function loadEnv() {
  const p = path.join(ROOT, ".env.local");
  if (!existsSync(p)) return;
  for (const line of readFileSync(p, "utf8").split(/\r?\n/)) {
    const m = line.match(/^([A-Z0-9_]+)\s*=\s*(.*)$/);
    if (m && !process.env[m[1]]) {
      process.env[m[1]] = m[2].replace(/^["']|["']$/g, "");
    }
  }
}
loadEnv();

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!SUPABASE_URL || !SERVICE_KEY) {
  console.error("Missing NEXT_PUBLIC_SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY.");
  process.exit(1);
}

const HEADERS = { apikey: SERVICE_KEY, Authorization: `Bearer ${SERVICE_KEY}` };
const apply = process.argv.includes("--apply");

function classify(email, createdAt) {
  if (OWNER_KEEP.has(email)) return { verdict: "KEEP", reason: "owner address" };

  const [local, domain] = email.split("@");
  const day = createdAt.slice(0, 10);

  if (day >= FLOOD_START) {
    return { verdict: "REMOVE", reason: "R1 flood-window (Aug 10 onward)" };
  }
  if (
    (domain === "gmail.com" || domain === "googlemail.com") &&
    (local.includes("..") || (local.match(/\./g) || []).length >= 4)
  ) {
    return { verdict: "REMOVE", reason: "R2 dotted-gmail bot signature" };
  }
  if (ROLE_PREFIXES.has(local.toLowerCase())) {
    return { verdict: "REMOVE", reason: "R3 role/company inbox" };
  }
  return { verdict: "KEEP", reason: "" };
}

async function fetchRows() {
  const res = await fetch(
    `${SUPABASE_URL}/rest/v1/product_waitlist?product_slug=eq.newsletter&select=email,created_at&order=created_at.asc`,
    { headers: HEADERS },
  );
  if (!res.ok) {
    console.error(`Supabase query failed: ${res.status} ${await res.text()}`);
    process.exit(1);
  }
  const rows = await res.json();
  return rows.map((r) => ({
    email: String(r.email).toLowerCase(),
    createdAt: r.created_at,
  }));
}

async function applyRemovals() {
  if (!existsSync(REMOVE_PATH)) {
    console.error(`No removal list at ${REMOVE_PATH}. Run the dry run first.`);
    process.exit(1);
  }
  const removals = JSON.parse(readFileSync(REMOVE_PATH, "utf8"));
  if (!Array.isArray(removals) || removals.length === 0) {
    console.log("Removal list is empty. Nothing to do.");
    return;
  }
  console.log(`Deleting ${removals.length} newsletter row(s) from product_waitlist...`);
  const BATCH = 20;
  let deleted = 0;
  for (let i = 0; i < removals.length; i += BATCH) {
    const batch = removals.slice(i, i + BATCH);
    const list = batch.map((e) => `"${e}"`).join(",");
    const url =
      `${SUPABASE_URL}/rest/v1/product_waitlist` +
      `?product_slug=eq.newsletter&email=in.(${encodeURIComponent(list)})`;
    const res = await fetch(url, {
      method: "DELETE",
      headers: { ...HEADERS, Prefer: "count=exact" },
    });
    if (!res.ok) {
      console.error(`DELETE failed (${res.status}): ${await res.text()}`);
      process.exit(1);
    }
    const range = res.headers.get("content-range") || "";
    const n = Number(range.split("/")[1]);
    deleted += Number.isFinite(n) ? n : batch.length;
  }
  console.log(`Done. ${deleted} row(s) deleted.`);
}

const rows = await fetchRows();
const keep = [];
const remove = [];
for (const r of rows) {
  const c = classify(r.email, r.createdAt);
  (c.verdict === "KEEP" ? keep : remove).push({ ...r, reason: c.reason });
}

mkdirSync(OUT_DIR, { recursive: true });
writeFileSync(REMOVE_PATH, JSON.stringify(remove.map((r) => r.email), null, 2));

const line = (r) =>
  `| ${r.email} | ${r.createdAt.slice(0, 10)} |${r.reason ? ` ${r.reason} |` : " |"}`;
const sheet = `# Newsletter list scrub - review sheet (${TODAY})

Total rows: ${rows.length} · KEEP: ${keep.length} · REMOVE: ${remove.length}

The REMOVE list is also written to \`newsletter-scrub-remove.json\`.
To spare an address, delete its line from the JSON before running
\`node scripts/scrub-newsletter-list.mjs --apply\`. Only the newsletter
segment is touched; product waitlists are untouched.

## KEEP (${keep.length}) - these receive the welcome email

| Email | Signed up | |
|---|---|---|
${keep.map(line).join("\n")}

## REMOVE (${remove.length}) - proposed for deletion

| Email | Signed up | Reason |
|---|---|---|
${remove.map(line).join("\n")}
`;
writeFileSync(SHEET_PATH, sheet);

console.log(`Sheet written: ${SHEET_PATH}`);
console.log(`Removal list written: ${REMOVE_PATH}`);
console.log(`KEEP ${keep.length} / REMOVE ${remove.length} of ${rows.length}.`);

if (apply) {
  await applyRemovals();
} else {
  console.log("\nDRY RUN. Nothing deleted. Review the sheet, then re-run with --apply.");
}
