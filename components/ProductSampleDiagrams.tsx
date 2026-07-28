// Sample line-art diagrams for product sales pages. Each previews the exact
// map a product ships, drawn in the book's olive / clay / sand palette so a
// shopper can see the deliverable is a precise tool, not a bullet list. Inline
// SVG only (site rule); server components, no interactivity. Text inherits the
// page font via the svg root style.

const INK = "#0e3b2c";
const INK2 = "#4f5b53";
const CLAY = "#d9531a";
const CLAY_SOFT = "#f8d8c5";
const SAND = "#f2f2ee";
const GREEN_SOFT = "#dde6e0";
const HAIR = "#e2dac5";
const PAPER = "#ffffff";

const svgStyle = { fontFamily: "inherit" as const, display: "block", margin: "0 auto", width: "100%", height: "auto" };

// ---------------------------------------------------------------------------
// 1. Bagua 3x3 grid: the nine life areas with the front-door wall marked.
//    Used on the starter-deck and home-diagnostic-workbook sample sections.
// ---------------------------------------------------------------------------

const BAGUA_CELLS: { r: number; c: number; label: string; sub: string }[] = [
  { r: 0, c: 0, label: "Wealth", sub: "abundance" },
  { r: 0, c: 1, label: "Fame", sub: "reputation" },
  { r: 0, c: 2, label: "Relationships", sub: "love" },
  { r: 1, c: 0, label: "Family", sub: "roots" },
  { r: 1, c: 1, label: "Health", sub: "the centre" },
  { r: 1, c: 2, label: "Creativity", sub: "children" },
  { r: 2, c: 0, label: "Knowledge", sub: "study" },
  { r: 2, c: 1, label: "Career", sub: "path" },
  { r: 2, c: 2, label: "Helpful People", sub: "travel" },
];

export function BaguaGridSample() {
  const S = 118; // cell size
  const OX = 20;
  const OY = 20;
  const W = OX * 2 + S * 3;
  const H = OY + S * 3 + 46; // extra room for the front-door wall label
  return (
    <figure className="product-sample-figure">
      <svg
        viewBox={`0 0 ${W} ${H}`}
        role="img"
        aria-label="The bagua as a three by three grid of nine life areas, with the front-door wall along the bottom edge."
        style={svgStyle}
      >
        {BAGUA_CELLS.map((cell) => {
          const x = OX + cell.c * S;
          const y = OY + cell.r * S;
          const centre = cell.r === 1 && cell.c === 1;
          return (
            <g key={`${cell.r}-${cell.c}`}>
              <rect
                x={x}
                y={y}
                width={S}
                height={S}
                fill={centre ? GREEN_SOFT : PAPER}
                stroke={HAIR}
                strokeWidth={1.4}
              />
              <text
                x={x + S / 2}
                y={y + S / 2 - 6}
                textAnchor="middle"
                fontSize="14.5"
                fontWeight="700"
                fill={INK}
              >
                {cell.label}
              </text>
              <text
                x={x + S / 2}
                y={y + S / 2 + 14}
                textAnchor="middle"
                fontSize="11"
                fill={INK2}
              >
                {cell.sub}
              </text>
            </g>
          );
        })}

        {/* The front-door wall: the bottom edge, drawn thick, with a door
            notch and a label. The tradition aligns this edge to the wall
            that holds the home's main entrance. */}
        <line
          x1={OX}
          y1={OY + S * 3}
          x2={OX + S * 3}
          y2={OY + S * 3}
          stroke={CLAY}
          strokeWidth={3.2}
        />
        <rect
          x={OX + S * 1.5 - 22}
          y={OY + S * 3 - 3}
          width={44}
          height={6}
          fill={CLAY_SOFT}
          stroke={CLAY}
          strokeWidth={1.2}
        />
        <text
          x={W / 2}
          y={OY + S * 3 + 26}
          textAnchor="middle"
          fontSize="12"
          fontWeight="700"
          fill={CLAY}
        >
          Front-door wall
        </text>
      </svg>
      <figcaption className="product-sample-caption">
        The nine life areas as a grid you lay over your floor plan, lining the
        bottom edge up with the wall that holds your front door. Health sits at
        the centre.
      </figcaption>
    </figure>
  );
}

// ---------------------------------------------------------------------------
// 2. Four-pillars chart skeleton: Year / Month / Day / Hour, each a Heavenly
//    Stem over an Earthly Branch, with the Day Master stem highlighted.
//    Used on the bazi-basics sample section.
// ---------------------------------------------------------------------------

const PILLARS = ["Year", "Month", "Day", "Hour"];

export function FourPillarsSample() {
  const colW = 96;
  const cellH = 84;
  const labelW = 96; // left row-label gutter
  const OX = 12;
  const OY = 34; // room for the column headers
  const W = OX + labelW + colW * 4 + 12;
  const H = OY + cellH * 2 + 40;
  return (
    <figure className="product-sample-figure">
      <svg
        viewBox={`0 0 ${W} ${H}`}
        role="img"
        aria-label="A four-pillars chart skeleton: four columns for Year, Month, Day and Hour, each with a Heavenly Stem cell above an Earthly Branch cell, with the Day Master stem highlighted."
        style={svgStyle}
      >
        {/* Row labels down the left gutter */}
        <text x={OX + labelW - 12} y={OY + cellH / 2} textAnchor="end" fontSize="12.5" fontWeight="700" fill={INK}>
          Heavenly Stem
        </text>
        <text x={OX + labelW - 12} y={OY + cellH * 1.5} textAnchor="end" fontSize="12.5" fontWeight="700" fill={INK}>
          Earthly Branch
        </text>

        {PILLARS.map((name, i) => {
          const x = OX + labelW + i * colW;
          const isDay = name === "Day";
          return (
            <g key={name}>
              {/* Column header */}
              <text
                x={x + colW / 2}
                y={OY - 12}
                textAnchor="middle"
                fontSize="14"
                fontWeight="800"
                fill={isDay ? CLAY : INK}
              >
                {name}
              </text>
              {/* Stem cell (the Day column's stem is the Day Master) */}
              <rect
                x={x}
                y={OY}
                width={colW}
                height={cellH}
                fill={isDay ? CLAY_SOFT : PAPER}
                stroke={isDay ? CLAY : HAIR}
                strokeWidth={isDay ? 2 : 1.4}
              />
              {isDay ? (
                <text x={x + colW / 2} y={OY + cellH / 2 + 4} textAnchor="middle" fontSize="12.5" fontWeight="800" fill={CLAY}>
                  Day Master
                </text>
              ) : (
                <text x={x + colW / 2} y={OY + cellH / 2 + 4} textAnchor="middle" fontSize="24" fill={HAIR}>
                  &#8226;
                </text>
              )}
              {/* Branch cell */}
              <rect
                x={x}
                y={OY + cellH}
                width={colW}
                height={cellH}
                fill={PAPER}
                stroke={isDay ? CLAY : HAIR}
                strokeWidth={isDay ? 2 : 1.4}
              />
              <text x={x + colW / 2} y={OY + cellH * 1.5 + 6} textAnchor="middle" fontSize="24" fill={HAIR}>
                &#8226;
              </text>
            </g>
          );
        })}
      </svg>
      <figcaption className="product-sample-caption">
        Four pillars, one for each part of your birth moment. The primer teaches
        you to fill each cell and read the Day Master, the stem that stands for
        you.
      </figcaption>
    </figure>
  );
}

// ---------------------------------------------------------------------------
// 3. Money channel plan: a top-down office on a nine-square overlay marking
//    the command-position desk, the door, the stove, and the Southeast wealth
//    corner. Shares the desk command plan's visual language. Used on the
//    business-money-feng-shui sample section.
// ---------------------------------------------------------------------------

export function MoneyChannelSample() {
  const S = 108;
  const OX = 24;
  const OY = 34; // room for the SE-corner label at top
  const W = OX * 2 + S * 3;
  const H = OY + S * 3 + 30;
  const gx = (c: number) => OX + c * S; // grid x
  const gy = (r: number) => OY + r * S; // grid y
  return (
    <figure className="product-sample-figure">
      <svg
        viewBox={`0 0 ${W} ${H}`}
        role="img"
        aria-label="A top-down office plan on a nine-square grid marking the command-position desk, the door, the stove and the Southeast wealth corner."
        style={svgStyle}
      >
        {/* Room outline */}
        <rect x={OX} y={OY} width={S * 3} height={S * 3} fill={PAPER} stroke={INK} strokeWidth={2} />
        {/* Nine-square overlay */}
        {[1, 2].map((i) => (
          <g key={`grid-${i}`}>
            <line x1={gx(i)} y1={OY} x2={gx(i)} y2={OY + S * 3} stroke={HAIR} strokeWidth={1.2} />
            <line x1={OX} y1={gy(i)} x2={OX + S * 3} y2={gy(i)} stroke={HAIR} strokeWidth={1.2} />
          </g>
        ))}

        {/* Southeast wealth corner: far top-right cell, tinted. */}
        <rect x={gx(2)} y={gy(0)} width={S} height={S} fill={CLAY_SOFT} opacity={0.55} />
        <text x={gx(2) + S / 2} y={OY - 12} textAnchor="middle" fontSize="12" fontWeight="700" fill={CLAY}>
          Wealth corner (SE)
        </text>

        {/* Command-position desk: back to the solid top-left wall, facing the
            room, seeing the door without sitting in its line. */}
        <rect x={gx(0) + 16} y={gy(0) + 24} width={S - 32} height={26} rx={3} fill={SAND} stroke={INK} strokeWidth={1.6} />
        <circle cx={gx(0) + S / 2} cy={gy(0) + 66} r={11} fill={PAPER} stroke={INK} strokeWidth={1.6} />
        <text x={gx(0) + S / 2} y={gy(1) + 22} textAnchor="middle" fontSize="11" fontWeight="700" fill={INK}>
          Desk
        </text>
        <text x={gx(0) + S / 2} y={gy(1) + 37} textAnchor="middle" fontSize="9.5" fill={INK2}>
          command seat
        </text>

        {/* Stove / hob: the wealth-generating burner, on the middle-right wall. */}
        <rect x={gx(2) + 30} y={gy(1) + 30} width={S - 60} height={S - 60} rx={3} fill={PAPER} stroke={CLAY} strokeWidth={1.6} />
        <circle cx={gx(2) + S / 2} cy={gy(1) + S / 2} r={12} fill="none" stroke={CLAY} strokeWidth={1.6} />
        <text x={gx(2) + S / 2} y={gy(2) + 8} textAnchor="middle" fontSize="11" fontWeight="700" fill={CLAY}>
          Stove
        </text>

        {/* Door: an arc swing on the bottom wall, off the desk's direct line. */}
        <line x1={gx(1) + 20} y1={gy(3)} x2={gx(1) + 70} y2={gy(3)} stroke={PAPER} strokeWidth={4} />
        <path d={`M ${gx(1) + 20} ${gy(3)} A 50 50 0 0 1 ${gx(1) + 20} ${gy(3) - 50}`} fill="none" stroke={INK2} strokeWidth={1.4} />
        <text x={gx(1) + 20} y={gy(3) + 18} textAnchor="middle" fontSize="11" fontWeight="700" fill={INK}>
          Door
        </text>

        {/* Sightline from the command seat to the door. */}
        <line
          x1={gx(0) + S / 2}
          y1={gy(0) + 66}
          x2={gx(1) + 22}
          y2={gy(3) - 4}
          stroke={INK2}
          strokeWidth={1}
          strokeDasharray="4 4"
        />
      </svg>
      <figcaption className="product-sample-caption">
        The money channel drawn as a plan: the desk in the command position, the
        door in view but off its line, the stove, and the Southeast corner the
        tradition ties to wealth.
      </figcaption>
    </figure>
  );
}
