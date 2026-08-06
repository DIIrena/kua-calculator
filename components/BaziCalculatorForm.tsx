"use client";

import { useActionState, useState, type CSSProperties } from "react";
import Link from "next/link";
import { computeBaziAction, type BaziActionState } from "@/app/actions/bazi";
import BaziResult from "@/components/BaziResult";

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

// Birthplace timezone offsets (standard time). BaZi keeps birthplace-local time;
// we never convert to Beijing. The offset is what the engine needs to place the
// birth instant for the solar-term (year/month) boundaries.
const TZ_OPTIONS: { v: string; label: string }[] = [
  { v: "-8", label: "UTC-8 · Los Angeles, Vancouver" },
  { v: "-7", label: "UTC-7 · Denver, Phoenix" },
  { v: "-6", label: "UTC-6 · Chicago, Mexico City" },
  { v: "-5", label: "UTC-5 · New York, Toronto, Lima" },
  { v: "-4", label: "UTC-4 · Santiago, Caracas" },
  { v: "-3", label: "UTC-3 · Sao Paulo, Buenos Aires" },
  { v: "0", label: "UTC+0 · London, Lisbon, Accra" },
  { v: "1", label: "UTC+1 · Paris, Berlin, Madrid, Lagos" },
  { v: "2", label: "UTC+2 · Cairo, Athens, Johannesburg" },
  { v: "3", label: "UTC+3 · Moscow, Istanbul, Nairobi" },
  { v: "3.5", label: "UTC+3:30 · Tehran" },
  { v: "4", label: "UTC+4 · Dubai, Baku" },
  { v: "5", label: "UTC+5 · Karachi, Tashkent" },
  { v: "5.5", label: "UTC+5:30 · Delhi, Mumbai, Colombo" },
  { v: "6", label: "UTC+6 · Dhaka, Almaty" },
  { v: "7", label: "UTC+7 · Bangkok, Jakarta, Hanoi" },
  { v: "8", label: "UTC+8 · Beijing, Hong Kong, Singapore, Taipei" },
  { v: "9", label: "UTC+9 · Tokyo, Seoul" },
  { v: "9.5", label: "UTC+9:30 · Adelaide" },
  { v: "10", label: "UTC+10 · Sydney, Melbourne" },
  { v: "12", label: "UTC+12 · Auckland" },
];

const initial: BaziActionState = { status: "idle" };
const labelStyle: CSSProperties = { display: "block", fontWeight: 600, color: "#0e3b2c", marginBottom: 4 };
const fieldStyle: CSSProperties = { width: "100%", padding: "9px 10px", border: "1px solid #cbbfa9", borderRadius: 8, fontSize: "1rem" };
const rowStyle: CSSProperties = { marginBottom: "1rem" };

export default function BaziCalculatorForm({ signedIn }: { signedIn: boolean }) {
  const [state, formAction, pending] = useActionState(computeBaziAction, initial);
  const [timeKnown, setTimeKnown] = useState(true);

  const bornLine =
    state.status === "ok"
      ? `Born ${MONTHS[state.input.month - 1]} ${state.input.day}, ${state.input.year}` +
        (state.input.timeKnown && state.input.hour !== null
          ? ` at ${String(state.input.hour).padStart(2, "0")}:${String(state.input.minute ?? 0).padStart(2, "0")}`
          : " (time unknown)") +
        (state.input.city ? ` · ${state.input.city}` : "")
      : null;

  return (
    <div>
      <form action={formAction} style={{ maxWidth: 460 }}>
        <div style={rowStyle}>
          <label htmlFor="birthdate" style={labelStyle}>Birth date</label>
          <input id="birthdate" name="birthdate" type="date" required min="1900-01-01" max="2100-12-31" style={fieldStyle} />
        </div>

        <div style={rowStyle}>
          <label style={{ display: "flex", alignItems: "center", gap: 8, fontWeight: 600, color: "#0e3b2c" }}>
            <input type="checkbox" name="timeKnown" checked={timeKnown} onChange={(e) => setTimeKnown(e.target.checked)} />
            I know my birth time
          </label>
          {timeKnown ? (
            <div style={{ marginTop: 8 }}>
              <label htmlFor="birthtime" style={labelStyle}>Birth time</label>
              <input id="birthtime" name="birthtime" type="time" required style={fieldStyle} />
            </div>
          ) : (
            <p style={{ margin: "6px 0 0", fontSize: "0.85rem", color: "#4f5b53" }}>
              No problem at all. You will still get your Day Master and six of your characters; only the hour is left off.
            </p>
          )}
        </div>

        <div style={rowStyle}>
          <label htmlFor="tz" style={labelStyle}>Where you were born (timezone)</label>
          <select id="tz" name="tz" required defaultValue="" style={fieldStyle}>
            <option value="" disabled>Pick the timezone of your birthplace</option>
            {TZ_OPTIONS.map((o) => (
              <option key={o.v} value={o.v}>{o.label}</option>
            ))}
          </select>
        </div>

        <div style={rowStyle}>
          <label htmlFor="city" style={labelStyle}>Town or city <span style={{ fontWeight: 400, color: "#4f5b53" }}>(optional, just for your records)</span></label>
          <input id="city" name="city" type="text" maxLength={80} placeholder="e.g. London" style={fieldStyle} />
        </div>

        {!signedIn ? (
          <>
            <div style={rowStyle}>
              <label htmlFor="email" style={labelStyle}>Your email <span style={{ fontWeight: 400, color: "#4f5b53" }}>(so you can see your reading)</span></label>
              <input id="email" name="email" type="email" required placeholder="you@example.com" style={fieldStyle} />
            </div>
            <label style={{ display: "flex", gap: 8, alignItems: "flex-start", fontSize: "0.85rem", color: "#4f5b53", marginBottom: "1rem" }}>
              <input type="checkbox" name="optIn" style={{ marginTop: 3 }} />
              <span>Send me the occasional friendly feng shui note as well. You can stop any time.</span>
            </label>
          </>
        ) : null}

        <button type="submit" className="cta-primary" disabled={pending}>
          {pending ? "Reading your chart..." : "Show me my chart"}
        </button>
      </form>

      {state.status === "error" ? (
        <p role="alert" style={{ marginTop: "1rem", color: "#a3341a", fontWeight: 500 }}>{state.message}</p>
      ) : null}

      {state.status === "ok" ? (
        <>
          <BaziResult chart={state.chart} bornLine={bornLine} />
          <div style={{ marginTop: "1.5rem", padding: "1.1rem 1.3rem", background: "#f7f2e9", borderRadius: 10 }}>
            <p style={{ marginTop: 0 }}>
              That is the outline of you. If you want to understand the rest of your chart - your full Day Master
              portrait, the people and forces around you, what your elements really mean - {" "}
              <Link href="/products/bazi-basics">BaZi Basics</Link> walks you through reading the whole thing yourself, kindly and in plain words.
            </p>
            {!signedIn ? (
              <p style={{ marginBottom: 0 }}>
                Want to keep this chart? <Link href="/sign-in">Create a free account</Link> and it is saved for you, ready to open any time.
              </p>
            ) : (
              <p style={{ marginBottom: 0 }}>Your chart is saved to your <Link href="/account">account</Link>.</p>
            )}
          </div>
        </>
      ) : null}
    </div>
  );
}
