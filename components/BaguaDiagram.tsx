import type { Direction } from "@/lib/directions";

// Inline-SVG bagua / octagon chart. 8 pie-slice segments centered on North,
// going clockwise (N, NE, E, SE, S, SW, W, NW). Favourable segments fill
// olive; avoid segments fill clay-deep; both with paper text and a
// redundant icon (star or cross) so the chart reads in greyscale print.
//
// Cardinal direction labels (N, E, S, W) are emphasised larger than
// intercardinal labels (NE, SE, SW, NW). A small north arrow sits above
// the diagram so the orientation is unambiguous.

type Props = {
  kua: number;
  directionsByCompass: Record<string, Direction>;
};

const ORDER = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"] as const;
const ANGLES: Record<string, number> = {
  N: 0,
  NE: 45,
  E: 90,
  SE: 135,
  S: 180,
  SW: 225,
  W: 270,
  NW: 315,
};
const CARDINAL = new Set(["N", "E", "S", "W"]);

// Geometry: viewBox 560x600 (extra vertical room for the north arrow
// above the octagon). Octagon centered at 280,310. Outer radius 220.
const CENTER_X = 280;
const CENTER_Y = 310;
const R_OUTER = 220;
const R_INNER = 76;
const R_LABEL_TOP = 178;   // compass abbreviation inside the segment
const R_LABEL_MID = 138;   // pinyin
const R_ICON = 100;        // star or cross
const R_RING_LABEL = 260;  // full direction name outside the octagon

const HALF_ANGLE_DEG = 22.5;
const HALF_ANGLE_RAD = (HALF_ANGLE_DEG * Math.PI) / 180;

function segmentPath(): string {
  const x = R_OUTER * Math.sin(HALF_ANGLE_RAD);
  const y = -R_OUTER * Math.cos(HALF_ANGLE_RAD);
  const xi = R_INNER * Math.sin(HALF_ANGLE_RAD);
  const yi = -R_INNER * Math.cos(HALF_ANGLE_RAD);
  return [
    `M ${-xi} ${yi}`,
    `L ${-x} ${y}`,
    `A ${R_OUTER} ${R_OUTER} 0 0 1 ${x} ${y}`,
    `L ${xi} ${yi}`,
    `A ${R_INNER} ${R_INNER} 0 0 0 ${-xi} ${yi}`,
    "Z",
  ].join(" ");
}

function ringLabelPos(angleDeg: number, r: number): { x: number; y: number } {
  const rad = (angleDeg * Math.PI) / 180;
  return {
    x: CENTER_X + r * Math.sin(rad),
    y: CENTER_Y - r * Math.cos(rad),
  };
}

const SEG = segmentPath();

export default function BaguaDiagram({ kua, directionsByCompass }: Props) {
  const titleId = `bagua-title-kua-${kua}`;
  const descId = `bagua-desc-kua-${kua}`;
  return (
    <figure className="bagua-figure">
      <svg
        viewBox="0 0 560 600"
        role="img"
        aria-labelledby={`${titleId} ${descId}`}
        className="bagua-svg"
      >
        <title id={titleId}>Bagua chart for Kua {kua}</title>
        <desc id={descId}>
          Eight-direction chart with North at the top. Olive panels mark
          your four favourable directions; clay panels mark the four to
          avoid. Centre shows your Kua number.
        </desc>

        {/* North arrow above the octagon */}
        <g className="bagua-north">
          <polygon
            points={`${CENTER_X},32 ${CENTER_X - 14},58 ${CENTER_X + 14},58`}
            className="bagua-north-arrow"
          />
          <text
            x={CENTER_X}
            y={20}
            textAnchor="middle"
            className="bagua-north-label"
          >
            N
          </text>
        </g>

        {/* Soft background disc behind the octagon */}
        <circle
          cx={CENTER_X}
          cy={CENTER_Y}
          r={R_OUTER + 10}
          className="bagua-bg"
        />

        {/* 8 segments */}
        <g transform={`translate(${CENTER_X} ${CENTER_Y})`}>
          {ORDER.map((compass) => {
            const angle = ANGLES[compass];
            const dir = directionsByCompass[compass];
            if (!dir) return null;
            const fillClass = dir.favourable
              ? "bagua-seg bagua-seg-favourable"
              : "bagua-seg bagua-seg-avoid";
            const icon = dir.favourable ? "★" : "✕";

            return (
              <g
                key={compass}
                transform={`rotate(${angle})`}
                className="bagua-segment-group"
              >
                <path d={SEG} className={fillClass} />
                <text
                  x={0}
                  y={-R_LABEL_TOP}
                  className="bagua-compass-label"
                  textAnchor="middle"
                  dominantBaseline="central"
                >
                  {compass}
                </text>
                <text
                  x={0}
                  y={-R_LABEL_MID}
                  className="bagua-quality-label"
                  textAnchor="middle"
                  dominantBaseline="central"
                >
                  {dir.pinyin}
                </text>
                <text
                  x={0}
                  y={-R_ICON}
                  className="bagua-icon"
                  textAnchor="middle"
                  dominantBaseline="central"
                  aria-hidden="true"
                >
                  {icon}
                </text>
              </g>
            );
          })}
        </g>

        {/* Centre disc with the Kua number */}
        <circle
          cx={CENTER_X}
          cy={CENTER_Y}
          r={R_INNER - 4}
          className="bagua-centre"
        />
        <text
          x={CENTER_X}
          y={CENTER_Y - 28}
          className="bagua-centre-eyebrow"
          textAnchor="middle"
        >
          Your Kua
        </text>
        <text
          x={CENTER_X}
          y={CENTER_Y + 16}
          className="bagua-centre-kua"
          textAnchor="middle"
          dominantBaseline="central"
        >
          {kua}
        </text>

        {/* Full direction names outside the octagon. Cardinal direction
            labels (North, East, South, West) are emphasised larger than
            the intercardinals (Northeast etc.) so the compass reading is
            unambiguous. */}
        {ORDER.map((compass) => {
          const pos = ringLabelPos(ANGLES[compass], R_RING_LABEL);
          const isCardinal = CARDINAL.has(compass);
          return (
            <text
              key={"ring-" + compass}
              x={pos.x}
              y={pos.y}
              className={
                isCardinal
                  ? "bagua-ring-label bagua-ring-label-cardinal"
                  : "bagua-ring-label"
              }
              textAnchor="middle"
              dominantBaseline="central"
            >
              {directionsByCompass[compass]?.compassLabel ?? compass}
            </text>
          );
        })}
      </svg>
      <figcaption className="bagua-caption">
        Pale green panels are your four favourable directions; pale clay
        panels are the four to avoid. North is at the top. The cards above
        and below explain each one with practical suggestions.
      </figcaption>
    </figure>
  );
}
