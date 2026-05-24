import type { Direction, QualityCode } from "@/lib/directions";
import { QUALITY_DETAILS } from "@/lib/directions";

// Eight rich cards, one per direction. Each card shows compass, full
// compass name, the quality's pinyin + hanzi + English gloss, a
// Favourable / Avoid badge, a short WHY paragraph, and 2-3 actionable
// bullets. Greyscale-safe: badge + dashed border + icon all repeat the
// status so colour is never the only cue.
//
// For charts saved before the why/bullets fields existed in the stored
// snapshot, both are looked up from QUALITY_DETAILS by qualityCode so
// old saves still display the full detail without a migration.

type Props = {
  rows: Direction[]; // ordered favourable-first
};

const COMPASS_ARROW: Record<string, string> = {
  N: "↑",
  NE: "↗",
  E: "→",
  SE: "↘",
  S: "↓",
  SW: "↙",
  W: "←",
  NW: "↖",
};

export default function DirectionDetailCards({ rows }: Props) {
  return (
    <div className="direction-cards-grid" role="list">
      {rows.map((row) => {
        const fallback = QUALITY_DETAILS[row.qualityCode as QualityCode];
        const why = row.why ?? fallback?.why ?? "";
        const bullets = row.bullets?.length ? row.bullets : (fallback?.bullets ?? []);
        return (
          <article
            key={row.compass}
            className="direction-card"
            data-favourable={row.favourable ? "true" : "false"}
            role="listitem"
            aria-label={`${row.compassLabel}: ${row.favourable ? "Favourable" : "Avoid"}`}
          >
            <header className="direction-card-header">
              <div className="direction-card-compass">
                <span className="direction-card-arrow" aria-hidden="true">
                  {COMPASS_ARROW[row.compass] ?? ""}
                </span>
                <div className="direction-card-name">
                  <p className="direction-card-name-full">
                    {row.compassLabel}
                  </p>
                  <p className="direction-card-name-abbrev" aria-hidden="true">
                    {row.compass}
                  </p>
                </div>
              </div>
              <p className="direction-card-badge">
                <span aria-hidden="true">{row.favourable ? "★" : "✕"}</span>{" "}
                {row.favourable ? "Favourable" : "Avoid"}
              </p>
            </header>

            <div className="direction-card-quality">
              <p className="direction-card-quality-pinyin">
                {row.pinyin}{" "}
                <span className="direction-card-quality-hanzi" aria-hidden="true">
                  {row.hanzi}
                </span>
              </p>
              <p className="direction-card-quality-gloss">{row.gloss}</p>
            </div>

            {why ? (
              <p className="direction-card-why">
                <span className="direction-card-why-label">
                  {row.favourable ? "Why it helps:" : "Why to avoid:"}
                </span>{" "}
                {why}
              </p>
            ) : null}

            {bullets.length > 0 ? (
              <ul className="direction-card-bullets">
                {bullets.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
            ) : null}
          </article>
        );
      })}
    </div>
  );
}
