// Loader + window filter for the verified 2026 solar-year day calendar.
// The data is ported from the annual-feng-shui-planner research CSV by
// scripts/build-day-calendar-json.mjs and committed as JSON so it ships
// in the serverless bundle (no runtime file read needed).
//
// Used by the Move-In Date Report (app/actions/fulfill-movein.ts) to
// read a buyer's chosen move-in window against the calendar.

import calendar from "@/lib/day-calendar-2026.json";

export type Verdict = "Favourable" | "Settling" | "Neutral" | "Caution";

export type CalDay = {
  /** ISO date, e.g. "2026-08-01". */
  date: string;
  /** Human label, e.g. "1 August 2026". */
  label: string;
  /** The day officer, e.g. "Kai (Open)". */
  officer: string;
  /** The raw calendar category. */
  category: string;
  /** The single move-facing verdict. */
  verdict: Verdict;
  /** One-line note for the day. */
  note: string;
};

const DAYS: CalDay[] = calendar.days as CalDay[];

/** The inclusive ISO date bounds the calendar covers. */
export const DAY_CALENDAR_RANGE = {
  start: DAYS[0]?.date ?? "2026-07-01",
  end: DAYS[DAYS.length - 1]?.date ?? "2027-02-28",
};

/** True if an ISO date string falls inside the calendar's coverage. */
export function isWithinCalendar(iso: string): boolean {
  return iso >= DAY_CALENDAR_RANGE.start && iso <= DAY_CALENDAR_RANGE.end;
}

/**
 * Return every calendar day whose date is within [startIso, endIso]
 * inclusive. ISO date strings sort lexicographically, so a string
 * comparison is correct. The window is clamped to the calendar's range
 * by the caller; this just filters.
 */
export function daysInWindow(startIso: string, endIso: string): CalDay[] {
  const lo = startIso <= endIso ? startIso : endIso;
  const hi = startIso <= endIso ? endIso : startIso;
  return DAYS.filter((d) => d.date >= lo && d.date <= hi);
}
