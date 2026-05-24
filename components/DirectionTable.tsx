import type { Direction } from "@/lib/directions";

// Color-coded direction table. Favourable rows have an olive accent and a
// star icon; avoid rows have a clay accent and a cross. The label text
// reinforces the status so colour is never the only cue (greyscale-safe).

type Props = {
  rows: Direction[]; // already ordered favourable-first
};

export default function DirectionTable({ rows }: Props) {
  return (
    <ol className="chart-direction-list" role="list">
      {rows.map((row) => (
        <li
          key={row.compass}
          className="chart-direction-row"
          data-favourable={row.favourable ? "true" : "false"}
        >
          <div className="chart-direction-compass">
            <span className="chart-compass-abbrev" aria-hidden="true">
              {row.compass}
            </span>
            <span className="chart-compass-label">{row.compassLabel}</span>
          </div>

          <div className="chart-direction-quality">
            <p className="chart-quality-pinyin">
              {row.pinyin}{" "}
              <span className="chart-quality-hanzi" aria-hidden="true">
                {row.hanzi}
              </span>
            </p>
            <p className="chart-quality-gloss">{row.gloss}</p>
          </div>

          <p className="chart-direction-meaning">{row.meaning}</p>

          <p className="chart-direction-badge">
            <span aria-hidden="true">{row.favourable ? "★" : "✕"}</span>{" "}
            {row.favourable ? "Favourable" : "Avoid"}
          </p>
        </li>
      ))}
    </ol>
  );
}
