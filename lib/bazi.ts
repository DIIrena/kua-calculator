// BaZi (Four Pillars of Destiny) engine. Server-side, zero third-party deps.
//
// Given a birth date, optional time, and timezone (with optional longitude for
// true solar time), returns the four pillars, the Day Master, the Ten Gods, and
// the five-element balance.
//
// The hard part is astronomy: the BaZi year turns at Li Chun (the solar term at
// ecliptic longitude 315 degrees, ~Feb 4), and the month is fixed by the solar
// term the birth falls in - not by the civil calendar. We compute the Sun's
// apparent longitude (Meeus, low precision) and locate Li Chun by root-finding.
//
// Conventions chosen for v1 (documented so they can be revisited against
// reference charts):
//  - Day pillar uses the civil date (day changes at local midnight). The
//    late-Zi convention (23:00+ rolling to the next day) is NOT applied.
//  - Branch Ten Gods use the branch's MAIN hidden stem (本气) element+polarity,
//    the common software convention. TEN_GOD_BRANCH_MODE can flip to positional.
//  - Local solar time for the hour pillar is applied only when a longitude is
//    given; the equation of time is omitted in v1 (sub-degree effect).

export type Element = "Wood" | "Fire" | "Earth" | "Metal" | "Water";
export type Polarity = "Yang" | "Yin";

export interface Stem {
  pinyin: string;
  element: Element;
  polarity: Polarity;
  image: string;
}
export interface Branch {
  pinyin: string;
  animal: string;
  element: Element; // primary (main-qi) element
  polarity: Polarity; // main-qi polarity, used for Ten Gods
  mainQi: number; // index into STEMS of the main hidden stem (本气)
  hours: string; // double-hour range, local solar time
}

// 0 = Jia ... 9 = Gui
export const STEMS: readonly Stem[] = [
  { pinyin: "Jia", element: "Wood", polarity: "Yang", image: "a tall tree" },
  { pinyin: "Yi", element: "Wood", polarity: "Yin", image: "a vine" },
  { pinyin: "Bing", element: "Fire", polarity: "Yang", image: "the sun" },
  { pinyin: "Ding", element: "Fire", polarity: "Yin", image: "a lamp" },
  { pinyin: "Wu", element: "Earth", polarity: "Yang", image: "a mountain" },
  { pinyin: "Ji", element: "Earth", polarity: "Yin", image: "garden soil" },
  { pinyin: "Geng", element: "Metal", polarity: "Yang", image: "an axe" },
  { pinyin: "Xin", element: "Metal", polarity: "Yin", image: "a jewel" },
  { pinyin: "Ren", element: "Water", polarity: "Yang", image: "the river" },
  { pinyin: "Gui", element: "Water", polarity: "Yin", image: "the rain" },
];

// 0 = Zi ... 11 = Hai. element/polarity are the main-qi hidden stem's.
export const BRANCHES: readonly Branch[] = [
  { pinyin: "Zi", animal: "Rat", element: "Water", polarity: "Yin", mainQi: 9, hours: "23:00-01:00" },
  { pinyin: "Chou", animal: "Ox", element: "Earth", polarity: "Yin", mainQi: 5, hours: "01:00-03:00" },
  { pinyin: "Yin", animal: "Tiger", element: "Wood", polarity: "Yang", mainQi: 0, hours: "03:00-05:00" },
  { pinyin: "Mao", animal: "Rabbit", element: "Wood", polarity: "Yin", mainQi: 1, hours: "05:00-07:00" },
  { pinyin: "Chen", animal: "Dragon", element: "Earth", polarity: "Yang", mainQi: 4, hours: "07:00-09:00" },
  { pinyin: "Si", animal: "Snake", element: "Fire", polarity: "Yang", mainQi: 2, hours: "09:00-11:00" },
  { pinyin: "Wu", animal: "Horse", element: "Fire", polarity: "Yin", mainQi: 3, hours: "11:00-13:00" },
  { pinyin: "Wei", animal: "Goat", element: "Earth", polarity: "Yin", mainQi: 5, hours: "13:00-15:00" },
  { pinyin: "Shen", animal: "Monkey", element: "Metal", polarity: "Yang", mainQi: 6, hours: "15:00-17:00" },
  { pinyin: "You", animal: "Rooster", element: "Metal", polarity: "Yin", mainQi: 7, hours: "17:00-19:00" },
  { pinyin: "Xu", animal: "Dog", element: "Earth", polarity: "Yang", mainQi: 4, hours: "19:00-21:00" },
  { pinyin: "Hai", animal: "Pig", element: "Water", polarity: "Yang", mainQi: 8, hours: "21:00-23:00" },
];

// Brand-palette colour per element. ELEMENT_COLORS is the bright fill for bars
// and swatches (no text on top). ELEMENT_INK is the deeper shade used wherever
// white text sits on the colour, so every chip clears WCAG 4.5:1 contrast.
export const ELEMENT_COLORS: Record<Element, string> = {
  Wood: "#3f7d54",
  Fire: "#d9531a",
  Earth: "#b9932f",
  Metal: "#7f857c",
  Water: "#2f5d62",
};

export const ELEMENT_INK: Record<Element, string> = {
  Wood: "#34694a",
  Fire: "#b8410f",
  Earth: "#7a6220",
  Metal: "#5c625a",
  Water: "#2f5d62",
};

// Production and control cycles.
const PRODUCES: Record<Element, Element> = { Wood: "Fire", Fire: "Earth", Earth: "Metal", Metal: "Water", Water: "Wood" };
const CONTROLS: Record<Element, Element> = { Wood: "Earth", Fire: "Metal", Earth: "Water", Metal: "Wood", Water: "Fire" };

export type TenGod =
  | "Companion" | "Rob Wealth"
  | "Eating God" | "Hurting Officer"
  | "Indirect Wealth" | "Direct Wealth"
  | "Seven Killings" | "Direct Officer"
  | "Indirect Resource" | "Direct Resource"
  | "Day Master";

// The Ten God of a character (element c, polarity cp) against a Day Master
// (element dm, polarity dmp).
export function tenGod(dm: Element, dmp: Polarity, c: Element, cp: Polarity): TenGod {
  const same = cp === dmp;
  if (c === dm) return same ? "Companion" : "Rob Wealth";
  if (PRODUCES[dm] === c) return same ? "Eating God" : "Hurting Officer";
  if (CONTROLS[dm] === c) return same ? "Indirect Wealth" : "Direct Wealth";
  if (CONTROLS[c] === dm) return same ? "Seven Killings" : "Direct Officer";
  // remaining case: c produces dm (resource)
  return same ? "Indirect Resource" : "Direct Resource";
}

// ---------- Astronomy ----------

// Julian Day Number at noon for a Gregorian calendar date.
function gregorianToJDN(y: number, m: number, d: number): number {
  const a = Math.floor((14 - m) / 12);
  const yy = y + 4800 - a;
  const mm = m + 12 * a - 3;
  return d + Math.floor((153 * mm + 2) / 5) + 365 * yy + Math.floor(yy / 4) - Math.floor(yy / 100) + Math.floor(yy / 400) - 32045;
}

// Full Julian Date for a UT instant (calendar date + fractional day from 0h UT).
function jdFromUT(y: number, m: number, d: number, dayFraction: number): number {
  return gregorianToJDN(y, m, d) - 0.5 + dayFraction;
}

// Approx ΔT (TT − UT) in seconds. Espenak-Meeus, adequate for 1900-2100.
function deltaTSeconds(year: number): number {
  const t = year - 2000;
  return 63.87 + 0.1 * t + 0.005589 * t * t;
}

const DEG = Math.PI / 180;
function norm360(x: number): number {
  return ((x % 360) + 360) % 360;
}

// Sun's apparent ecliptic longitude in degrees, for a Julian Ephemeris Day (TT).
// Meeus, Astronomical Algorithms, ch. 25 (low precision).
export function solarLongitude(jde: number): number {
  const T = (jde - 2451545.0) / 36525.0;
  const L0 = 280.46646 + 36000.76983 * T + 0.0003032 * T * T;
  const M = 357.52911 + 35999.05029 * T - 0.0001537 * T * T;
  const Mr = M * DEG;
  const C =
    (1.914602 - 0.004817 * T - 0.000014 * T * T) * Math.sin(Mr) +
    (0.019993 - 0.000101 * T) * Math.sin(2 * Mr) +
    0.000289 * Math.sin(3 * Mr);
  const trueLong = L0 + C;
  const omega = 125.04 - 1934.136 * T;
  const apparent = trueLong - 0.00569 - 0.00478 * Math.sin(omega * DEG);
  return norm360(apparent);
}

// Find the JDE (TT) when the Sun reaches targetDeg, searching within [jdLo, jdHi].
// Assumes solarLongitude is continuous and monotonic across the window (true for
// each ~30-day solar-term window). Returns the crossing by bisection.
function solveSolarTerm(targetDeg: number, jdLo: number, jdHi: number): number {
  const f = (jd: number) => {
    // Difference wrapped to [-180, 180] so a crossing is a clean sign change.
    let diff = solarLongitude(jd) - targetDeg;
    diff = ((diff % 360) + 540) % 360 - 180;
    return diff;
  };
  let lo = jdLo, hi = jdHi;
  let flo = f(lo);
  for (let i = 0; i < 60; i++) {
    const mid = (lo + hi) / 2;
    const fmid = f(mid);
    if (flo * fmid <= 0) { hi = mid; } else { lo = mid; flo = fmid; }
  }
  return (lo + hi) / 2;
}

// JDE (TT) of Li Chun (ecliptic longitude 315) for a given Gregorian year.
// Li Chun falls ~Feb 3-5; search a wide, safe window.
function liChunJDE(year: number): number {
  const lo = jdFromUT(year, 1, 28, 0) + deltaTSeconds(year) / 86400;
  const hi = jdFromUT(year, 2, 10, 0) + deltaTSeconds(year) / 86400;
  return solveSolarTerm(315, lo, hi);
}

// ---------- Chart ----------

export interface BaziInput {
  year: number;
  month: number; // 1-12
  day: number; // 1-31
  hour?: number; // 0-23, local clock; omit for time-unknown
  minute?: number; // 0-59
  tzOffsetHours: number; // birth timezone offset from UTC, e.g. Beijing = 8
  longitude?: number; // birth longitude in degrees (E positive) for true solar time
}

export interface PillarCol {
  label: "Year" | "Month" | "Day" | "Hour";
  stemIndex: number;
  branchIndex: number;
  stem: Stem;
  branch: Branch;
  stemGod: TenGod;
  branchGod: TenGod;
}

export interface BaziChart {
  pillars: PillarCol[]; // Year, Month, Day, [Hour]
  dayMaster: { stem: Stem; index: number };
  elementCounts: Record<Element, number>;
  timeKnown: boolean;
  baziYear: number; // the solar year after the Li Chun boundary
}

function fiveTigersMonthStem(yearStem: number, monthOffset: number): number {
  // Month stem of the first month (Yin) = (yearStem*2 + 2) mod 10; then +1 per month.
  return ((yearStem * 2 + 2 + monthOffset) % 10 + 10) % 10;
}

export function computeBazi(input: BaziInput): BaziChart {
  const { year, month, day, tzOffsetHours } = input;
  const timeKnown = typeof input.hour === "number";
  const clockHour = timeKnown ? (input.hour as number) : 12;
  const clockMin = input.minute ?? 0;

  // ---- Day pillar: civil date, JDN mod 60 ----
  const jdn = gregorianToJDN(year, month, day);
  // Anchor: 2000-01-07 (JDN 2451551) = Jia-Zi (cycle index 0). index = (JDN - 11) mod 60.
  const dayCycle = (((jdn - 11) % 60) + 60) % 60;
  const dayStemIndex = dayCycle % 10;
  const dayBranchIndex = dayCycle % 12;

  // ---- Birth instant in TT, for year/month (solar longitude) ----
  const utDayFraction = (clockHour + clockMin / 60 - tzOffsetHours) / 24;
  const birthJDE = jdFromUT(year, month, day, utDayFraction) + deltaTSeconds(year) / 86400;

  // ---- Year pillar: Li Chun boundary ----
  const liChun = liChunJDE(year);
  const baziYear = birthJDE < liChun ? year - 1 : year;
  const yearStemIndex = (((baziYear - 4) % 10) + 10) % 10;
  const yearBranchIndex = (((baziYear - 4) % 12) + 12) % 12;

  // ---- Month pillar: which solar-term sector (30 deg) from Li Chun (315) ----
  const L = solarLongitude(birthJDE);
  const sector = Math.floor(norm360(L - 315) / 30); // 0 at Li Chun -> Yin month
  const monthBranchIndex = (2 + sector) % 12; // Yin = index 2
  const monthStemIndex = fiveTigersMonthStem(yearStemIndex, sector);

  const pillars: PillarCol[] = [];
  const dm = STEMS[dayStemIndex];

  const pushPillar = (label: PillarCol["label"], si: number, bi: number) => {
    const stem = STEMS[si];
    const branch = BRANCHES[bi];
    const branchQi = STEMS[branch.mainQi];
    pillars.push({
      label,
      stemIndex: si,
      branchIndex: bi,
      stem,
      branch,
      stemGod: label === "Day" ? "Day Master" : tenGod(dm.element, dm.polarity, stem.element, stem.polarity),
      branchGod: tenGod(dm.element, dm.polarity, branchQi.element, branchQi.polarity),
    });
  };

  pushPillar("Year", yearStemIndex, yearBranchIndex);
  pushPillar("Month", monthStemIndex, monthBranchIndex);
  pushPillar("Day", dayStemIndex, dayBranchIndex);

  if (timeKnown) {
    // True solar time for the hour, if a longitude is supplied.
    let solarMinutes = clockHour * 60 + clockMin;
    if (typeof input.longitude === "number") {
      solarMinutes += (input.longitude - tzOffsetHours * 15) * 4;
    }
    solarMinutes = ((solarMinutes % 1440) + 1440) % 1440;
    const solarHour = solarMinutes / 60;
    const hourBranchIndex = Math.floor((solarHour + 1) / 2) % 12; // Zi = 23-01
    const hourStemIndex = ((dayStemIndex * 2 + hourBranchIndex) % 10 + 10) % 10;
    pushPillar("Hour", hourStemIndex, hourBranchIndex);
  }

  // ---- Element balance across all characters ----
  const elementCounts: Record<Element, number> = { Wood: 0, Fire: 0, Earth: 0, Metal: 0, Water: 0 };
  for (const p of pillars) {
    elementCounts[p.stem.element] += 1;
    elementCounts[p.branch.element] += 1;
  }

  return {
    pillars,
    dayMaster: { stem: dm, index: dayStemIndex },
    elementCounts,
    timeKnown,
    baziYear,
  };
}
