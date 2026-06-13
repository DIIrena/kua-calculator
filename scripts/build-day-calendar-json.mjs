// Port the verified 2026 day-calendar CSV into a compact JSON the
// Move-In Date Report action reads at render time. The CSV is the
// research source of truth in the annual-feng-shui-planner project;
// this script is the one-way bridge into the kua-calculator app.
//
// Usage: node scripts/build-day-calendar-json.mjs

import { readFileSync, writeFileSync } from "node:fs";

const CSV =
  "c:/Users/User/Documents/IRENA/AI AUTOMATION/my-claude-workspace/projects/annual-feng-shui-planner/research/2026-day-calendar.csv";
const OUT =
  "c:/Users/User/Documents/IRENA/AI AUTOMATION/my-claude-workspace/projects/kua-calculator/lib/day-calendar-2026.json";

// Minimal RFC-4180-ish CSV line splitter: handles double-quoted fields
// that contain commas. No embedded newlines in fields (the source has
// none).
function splitCsvLine(line) {
  const out = [];
  let cur = "";
  let inQuotes = false;
  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (inQuotes) {
      if (ch === '"') {
        if (line[i + 1] === '"') {
          cur += '"';
          i++;
        } else {
          inQuotes = false;
        }
      } else {
        cur += ch;
      }
    } else if (ch === '"') {
      inQuotes = true;
    } else if (ch === ",") {
      out.push(cur);
      cur = "";
    } else {
      cur += ch;
    }
  }
  out.push(cur);
  return out;
}

// Map the calendar's category into a single move-facing verdict.
//   Favourable - a traditional day for action, starts, openings (best
//                for a move and for settling in).
//   Settling   - good for consolidating and tidying, not new starts.
//   Neutral    - an ordinary operating day, no signal either way.
//   Caution    - the tradition flags it; avoid a major move if you can.
function verdictFor(category) {
  const c = category.toLowerCase();
  if (c.includes("action")) return "Favourable";
  if (c.includes("rest") || c.includes("planning")) return "Settling";
  if (c.includes("caution")) return "Caution";
  return "Neutral";
}

const raw = readFileSync(CSV, "utf-8").replace(/^﻿/, "");
const lines = raw.split(/\r?\n/).filter((l) => l.trim().length > 0);
const header = splitCsvLine(lines[0]);
const idx = (name) => header.indexOf(name);

const iDate = idx("date_iso");
const iGreg = idx("gregorian_date");
const iOfficer = idx("day_officer");
const iCat = idx("category");
const iNote = idx("one_line_note");

const days = [];
for (let i = 1; i < lines.length; i++) {
  const cols = splitCsvLine(lines[i]);
  if (!cols[iDate]) continue;
  days.push({
    date: cols[iDate].trim(),
    label: cols[iGreg].trim(),
    officer: cols[iOfficer].trim(),
    category: cols[iCat].trim(),
    verdict: verdictFor(cols[iCat].trim()),
    note: cols[iNote].trim(),
  });
}

const data = {
  meta: {
    source: "2026 solar year day calendar (verified)",
    range: days.length ? `${days[0].date} to ${days[days.length - 1].date}` : "",
    count: days.length,
  },
  days,
};

writeFileSync(OUT, JSON.stringify(data, null, 2) + "\n");
console.log(`Wrote ${OUT}`);
console.log(`Days: ${days.length}, range ${data.meta.range}`);
const counts = days.reduce((m, d) => ((m[d.verdict] = (m[d.verdict] || 0) + 1), m), {});
console.log("Verdict counts:", JSON.stringify(counts));
