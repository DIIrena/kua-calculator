import type { Direction } from "@/lib/directions";

// Inline-SVG bagua / octagon chart. 8 pie-slice segments centered on North,
// going clockwise (N, NE, E, SE, S, SW, W, NW). Each segment is filled
// olive when favourable, clay when avoid; both with cream text and a
// redundant icon (star or cross) so the chart reads in greyscale print.

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

// Geometry: viewBox 480x480, center at 240,240. Outer radius 200, inner
// radius 70 (so segments are donuts, not pure wedges - leaves room for
// the center "Kua N" disc).
const CENTER = 240;
const R_OUTER = 200;
const R_INNER = 70;
const R_LABEL_TOP = 165; // compass abbreviation
const R_LABEL_MID = 130; // pinyin
const R_ICON = 95; // star or cross

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

// Outer ring labels (N, NE, ...) drawn outside the octagon as reference.
function ringLabelPos(angleDeg: number, r: number): { x: number; y: number } {
  const rad = (angleDeg * Math.PI) / 180;
  return {
    x: CENTER + r * Math.sin(rad),
    y: CENTER - r * Math.cos(rad),
  };
}

const SEG = segmentPath();

export default function BaguaDiagram({ kua, directionsByCompass }: Props) {
  const titleId = `bagua-title-kua-${kua}`;
  const descId = `bagua-desc-kua-${kua}`;
  return (
    <figure className="bagua-figure">
      <svg
        viewBox="0 0 480 480"
        role="img"
        aria-labelledby={`${titleId} ${descId}`}
        className="bagua-svg"
      >
        <title id={titleId}>Bagua chart for Kua {kua}</title>
        <desc id={descId}>
          Eight-direction chart. Olive panels mark your four favourable
          directions; clay panels mark the four to avoid. Centre shows your
          Kua number.
        </desc>

        {/* Cream background disc for the octagon footprint */}
        <circle cx={CENTER} cy={CENTER} r={R_OUTER + 8} className="bagua-bg" />

        {/* 8 segments */}
        <g transform={`translate(${CENTER} ${CENTER})`}>
          {ORDER.map((compass) => {
            const angle = ANGLES[compass];
            const dir = directionsByCompass[compass];
            if (!dir) return null;
            const fillClass = dir.favourable
              ? "bagua-seg bagua-seg-favourable"
              : "bagua-seg bagua-seg-avoid";
            const icon = dir.favourable ? "★" : "✕";

            // Inside a rotated <g>, "up" is the segment's center axis.
            // Positive y in the local frame goes down, so labels at
            // negative y sit toward the outer edge along that axis.
            return (
              <g
                key={compass}
                transform={`rotate(${angle})`}
                className="bagua-segment-group"
              >
                <path d={SEG} className={fillClass} />
                {/* compass abbreviation */}
                <text
                  x={0}
                  y={-R_LABEL_TOP}
                  className="bagua-compass-label"
                  textAnchor="middle"
                  dominantBaseline="central"
                >
                  {compass}
                </text>
                {/* pinyin */}
                <text
                  x={0}
                  y={-R_LABEL_MID}
                  className="bagua-quality-label"
                  textAnchor="middle"
                  dominantBaseline="central"
                >
                  {dir.pinyin}
                </text>
                {/* favourable/avoid icon */}
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
        <circle cx={CENTER} cy={CENTER} r={R_INNER - 4} className="bagua-centre" />
        <text
          x={CENTER}
          y={CENTER - 14}
          className="bagua-centre-eyebrow"
          textAnchor="middle"
        >
          Your Kua
        </text>
        <text
          x={CENTER}
          y={CENTER + 18}
          className="bagua-centre-kua"
          textAnchor="middle"
          dominantBaseline="central"
        >
          {kua}
        </text>

        {/* Compass-direction reference labels just outside the octagon */}
        {ORDER.map((compass) => {
          const pos = ringLabelPos(ANGLES[compass], R_OUTER + 28);
          return (
            <text
              key={"ring-" + compass}
              x={pos.x}
              y={pos.y}
              className="bagua-ring-label"
              textAnchor="middle"
              dominantBaseline="central"
              aria-hidden="true"
            >
              {directionsByCompass[compass]?.compassLabel ?? compass}
            </text>
          );
        })}
      </svg>
      <figcaption className="bagua-caption">
        Olive panels are your four favourable directions; clay panels are the
        four to avoid. The same information appears as a table below for
        screen readers and quick reference.
      </figcaption>
    </figure>
  );
}
