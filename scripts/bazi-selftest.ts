// Self-test for the BaZi engine. Run: node scripts/bazi-selftest.ts
import { computeBazi, solarLongitude, STEMS, BRANCHES } from "../lib/bazi.ts";
import type { BaziChart, PillarCol, BaziInput } from "../lib/bazi.ts";

const P = (p: PillarCol) => `${p.stem.pinyin}-${p.branch.pinyin}`;
function show(label: string, c: BaziChart) {
  const cols = c.pillars.map((p) => `${p.label}:${P(p)}`).join("  ");
  const gods = c.pillars.map((p) => `${p.label}[${p.stemGod}/${p.branchGod}]`).join("  ");
  const el = Object.entries(c.elementCounts).map(([k, v]) => `${k}:${v}`).join(" ");
  console.log(`\n${label}`);
  console.log(`  baziYear=${c.baziYear}  DayMaster=${c.dayMaster.stem.pinyin} (${c.dayMaster.stem.element} ${c.dayMaster.stem.polarity})`);
  console.log(`  ${cols}`);
  console.log(`  ${gods}`);
  console.log(`  elements: ${el}`);
}

let fails = 0;
function check(name: string, cond: boolean, detail = "") {
  console.log(`${cond ? "PASS" : "FAIL"}  ${name}${detail ? "  " + detail : ""}`);
  if (!cond) fails++;
}

console.log("=== solar longitude sanity ===");
// 2000-02-04 12:00 UT = JD 2451579.0 -> Li Chun ~315 deg
const sl1 = solarLongitude(2451579.0);
check("Li Chun 2000-02-04 ~315deg", Math.abs(sl1 - 315) < 1.5, `got ${sl1.toFixed(3)}`);
// 2020-03-20 00:00 UT = JD 2458928.5 -> spring equinox ~0/360 deg
const sl2 = solarLongitude(2458928.5);
check("Equinox 2020-03-20 ~0/360deg", sl2 < 1.5 || sl2 > 358.5, `got ${sl2.toFixed(3)}`);

console.log("\n=== day-pillar anchor + continuity ===");
const d0 = computeBazi({ year: 2000, month: 1, day: 7, tzOffsetHours: 8 });
check("2000-01-07 day pillar = Jia-Zi", P(d0.pillars[2]) === "Jia-Zi", `got ${P(d0.pillars[2])}`);
const d1 = computeBazi({ year: 2000, month: 1, day: 8, tzOffsetHours: 8 });
check("2000-01-08 day pillar = Yi-Chou", P(d1.pillars[2]) === "Yi-Chou", `got ${P(d1.pillars[2])}`);

console.log("\n=== year-pillar formula + Li Chun boundary ===");
const y84 = computeBazi({ year: 1984, month: 6, day: 1, tzOffsetHours: 8 });
check("1984-06-01 year pillar = Jia-Zi", P(y84.pillars[0]) === "Jia-Zi", `got ${P(y84.pillars[0])}`);
const before = computeBazi({ year: 2000, month: 1, day: 20, hour: 10, tzOffsetHours: 8 });
check("2000-01-20 is BEFORE Li Chun -> baziYear 1999", before.baziYear === 1999, `got ${before.baziYear}`);
const after = computeBazi({ year: 2000, month: 2, day: 10, hour: 10, tzOffsetHours: 8 });
check("2000-02-10 is AFTER Li Chun -> baziYear 2000", after.baziYear === 2000, `got ${after.baziYear}`);

console.log("\n=== day-pillar anchor dates vs references ===");
const anchors: [number, number, number, string][] = [
  [2000, 1, 1, "Wu-Wu"], [2000, 1, 7, "Jia-Zi"], [2024, 2, 4, "Wu-Xu"], [1984, 2, 2, "Bing-Yin"],
];
for (const [y, m, d, exp] of anchors) {
  const c = computeBazi({ year: y, month: m, day: d, tzOffsetHours: 8 });
  check(`${y}-${m}-${d} day = ${exp}`, P(c.pillars[2]) === exp, `got ${P(c.pillars[2])}`);
}

console.log("\n=== 8 reference charts (cantian.ai, cross-checked, clock time / midnight / Li Chun) ===");
const refs: { name: string; in: BaziInput; pillars: string[] }[] = [
  { name: "1990-05-15 14:30 Beijing", in: { year: 1990, month: 5, day: 15, hour: 14, minute: 30, tzOffsetHours: 8 }, pillars: ["Geng-Wu", "Xin-Si", "Geng-Chen", "Gui-Wei"] },
  { name: "2000-01-20 10:00 Beijing (pre-Li-Chun)", in: { year: 2000, month: 1, day: 20, hour: 10, tzOffsetHours: 8 }, pillars: ["Ji-Mao", "Ding-Chou", "Ding-Chou", "Yi-Si"] },
  { name: "2000-02-10 10:00 Beijing (post-Li-Chun)", in: { year: 2000, month: 2, day: 10, hour: 10, tzOffsetHours: 8 }, pillars: ["Geng-Chen", "Wu-Yin", "Wu-Xu", "Ding-Si"] },
  { name: "1985-07-10 23:40 Shanghai", in: { year: 1985, month: 7, day: 10, hour: 23, minute: 40, tzOffsetHours: 8 }, pillars: ["Yi-Chou", "Gui-Wei", "Geng-Xu", "Bing-Zi"] },
  { name: "1976-11-02 time-unknown London", in: { year: 1976, month: 11, day: 2, tzOffsetHours: 0 }, pillars: ["Bing-Chen", "Wu-Xu", "Wu-Wu"] },
  { name: "2010-08-08 08:08 Shanghai", in: { year: 2010, month: 8, day: 8, hour: 8, minute: 8, tzOffsetHours: 8 }, pillars: ["Geng-Yin", "Jia-Shen", "Geng-Yin", "Geng-Chen"] },
  { name: "1965-03-05 06:00 Hong Kong", in: { year: 1965, month: 3, day: 5, hour: 6, tzOffsetHours: 8 }, pillars: ["Yi-Si", "Wu-Yin", "Wu-Wu", "Yi-Mao"] },
  { name: "1999-12-25 12:00 New York (tz-5, no Beijing convert)", in: { year: 1999, month: 12, day: 25, hour: 12, tzOffsetHours: -5 }, pillars: ["Ji-Mao", "Bing-Zi", "Xin-Hai", "Jia-Wu"] },
];
for (const r of refs) {
  const got = computeBazi(r.in).pillars.map(P);
  const ok = got.length === r.pillars.length && got.every((g, i) => g === r.pillars[i]);
  check(r.name, ok, ok ? "" : `expected [${r.pillars.join(" ")}] got [${got.join(" ")}]`);
}

console.log(`\n${fails === 0 ? "ALL ASSERTIONS PASSED" : fails + " ASSERTION(S) FAILED"}`);
