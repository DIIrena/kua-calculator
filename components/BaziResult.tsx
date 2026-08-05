import type { CSSProperties } from "react";
import { ELEMENT_COLORS, ELEMENT_INK, type BaziChart, type Element } from "@/lib/bazi";

// Presentational results card for a computed BaZi chart. Leads with the Day
// Master (the headline), then the coloured pillar grid, the element balance,
// and the Ten Gods. Brand palette; no external deps.

const ELEMENTS: Element[] = ["Wood", "Fire", "Earth", "Metal", "Water"];

function chip(bg: string): CSSProperties {
  return {
    display: "inline-block",
    background: bg,
    color: "#fff",
    borderRadius: 6,
    padding: "2px 9px",
    fontWeight: 600,
    lineHeight: 1.4,
  };
}

export default function BaziResult({
  chart,
  bornLine,
}: {
  chart: BaziChart;
  bornLine?: string | null;
}) {
  const dm = chart.dayMaster.stem;
  const dmColor = ELEMENT_INK[dm.element];
  const maxCount = Math.max(1, ...ELEMENTS.map((e) => chart.elementCounts[e]));

  return (
    <div className="bazi-result" style={{ marginTop: "1.5rem" }}>
      {/* Day Master hero */}
      <div
        style={{
          background: dmColor,
          color: "#fff",
          borderRadius: 12,
          padding: "1.25rem 1.4rem",
          textAlign: "center",
        }}
      >
        <p style={{ margin: 0, textTransform: "uppercase", letterSpacing: "0.12em", fontSize: "0.72rem", opacity: 0.9 }}>
          Your Day Master
        </p>
        <p style={{ margin: "0.35rem 0 0", fontSize: "2rem", fontWeight: 700, lineHeight: 1.1 }}>
          {dm.pinyin} <span style={{ opacity: 0.85, fontWeight: 400 }}>&mdash; {dm.image}</span>
        </p>
        <p style={{ margin: "0.3rem 0 0", fontSize: "1rem", opacity: 0.92 }}>
          {dm.polarity} {dm.element}
        </p>
        {bornLine ? (
          <p style={{ margin: "0.5rem 0 0", fontSize: "0.82rem", opacity: 0.85 }}>{bornLine}</p>
        ) : null}
      </div>

      {/* Four pillars */}
      <h3 style={{ margin: "1.5rem 0 0.5rem" }}>Your four pillars</h3>
      <div
        role="table"
        aria-label="Your four pillars"
        style={{ display: "grid", gridTemplateColumns: `repeat(${chart.pillars.length}, 1fr)`, gap: 8 }}
      >
        {chart.pillars.map((p) => {
          const isDay = p.label === "Day";
          return (
            <div
              key={p.label}
              role="cell"
              style={{
                border: isDay ? "2px solid #d9531a" : "1px solid #e3dcca",
                borderRadius: 8,
                overflow: "hidden",
                textAlign: "center",
                background: "#fff",
              }}
            >
              <div
                style={{
                  fontSize: "0.68rem",
                  textTransform: "uppercase",
                  letterSpacing: "0.06em",
                  color: isDay ? "#d9531a" : "#4f5b53",
                  fontWeight: isDay ? 700 : 500,
                  padding: "5px 2px",
                  background: "#f7f2e9",
                }}
              >
                {p.label}
                {isDay ? " · you" : ""}
              </div>
              <div style={{ padding: "9px 4px 10px" }}>
                <div style={{ ...chip(ELEMENT_INK[p.stem.element]), fontSize: "1rem" }}>{p.stem.pinyin}</div>
                <div style={{ fontSize: "0.66rem", color: "#4f5b53", margin: "3px 0 8px" }}>
                  {p.stemGod === "Day Master" ? "Day Master" : p.stemGod}
                </div>
                <div style={{ ...chip(ELEMENT_INK[p.branch.element]), fontSize: "0.92rem" }}>
                  {p.branch.pinyin}
                </div>
                <div style={{ fontSize: "0.66rem", color: "#4f5b53", marginTop: 3 }}>{p.branch.animal}</div>
                <div style={{ fontSize: "0.66rem", color: "#4f5b53", marginTop: 2 }}>{p.branchGod}</div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Element balance */}
      <h3 style={{ margin: "1.5rem 0 0.5rem" }}>Your element balance</h3>
      <div>
        {ELEMENTS.map((e) => {
          const n = chart.elementCounts[e];
          return (
            <div key={e} style={{ display: "grid", gridTemplateColumns: "88px 1fr 28px", alignItems: "center", gap: 10, marginBottom: 6 }}>
              <span style={{ color: "#0e3b2c", fontWeight: 600, fontSize: "0.9rem" }}>{e}</span>
              <span style={{ background: "#efe7d6", borderRadius: 4, height: 16, display: "block" }}>
                <span
                  style={{
                    display: "block",
                    height: "100%",
                    width: `${(n / maxCount) * 100}%`,
                    background: ELEMENT_COLORS[e],
                    borderRadius: 4,
                  }}
                />
              </span>
              <span style={{ color: "#4f5b53", fontSize: "0.85rem", textAlign: "right" }}>{n}</span>
            </div>
          );
        })}
      </div>
      {!chart.timeKnown ? (
        <p style={{ marginTop: "1rem", fontSize: "0.85rem", color: "#4f5b53" }}>
          Read as six characters: without a birth time, the hour pillar is left off. Your Day
          Master and the rest of the chart are unaffected.
        </p>
      ) : null}
    </div>
  );
}
