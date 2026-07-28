import Link from "next/link";

// The reading-depth comparison matrix shown at the top of the shop shelf.
// It surfaces the three-tier ladder (Personal $19 / Twelve Spaces $29 /
// Complete Home $49) at the point of choice, so a shopper can see what each
// depth adds before scrolling the grid. Presentation only: prices and page
// bands are display copy matching lib/products.ts. Built in the olive / clay /
// sand line-art palette to read as part of the book, not a spreadsheet.

type Cell = "yes" | "no" | string;

const TIERS: { key: string; title: string; price: string; href: string; flag?: boolean }[] = [
  {
    key: "compass",
    title: "Personal Compass",
    price: "$19",
    href: "/products/personal-feng-shui-compass",
  },
  {
    key: "twelve",
    title: "Twelve Spaces",
    price: "$29",
    href: "/products/all-twelve-spaces-compass",
  },
  {
    key: "complete",
    title: "Complete Home",
    price: "$49",
    href: "/products/complete-home-compass",
    flag: true,
  },
];

// Row order runs shallow to deep, so the ticks visibly accumulate toward the
// flagship column. [compass, twelve, complete].
const ROWS: { label: string; cells: [Cell, Cell, Cell] }[] = [
  { label: "Your Kua and eight personal directions, read in depth", cells: ["yes", "no", "yes"] },
  { label: "Every room of your home read for you, all twelve", cells: ["no", "yes", "yes"] },
  { label: "Nine life areas: wealth, relationships, career and the rest", cells: ["no", "no", "yes"] },
  { label: "Compatibility reading for two people", cells: ["no", "no", "yes"] },
  { label: "2026 year overlay for the twelve months ahead", cells: ["no", "no", "yes"] },
  { label: "A seven-day experiment to try it in your own home", cells: ["yes", "no", "yes"] },
  { label: "Typical length", cells: ["48-64 pages", "40-54 pages", "160-200 pages"] },
];

function Tick() {
  return (
    <span className="matrix-mark matrix-mark-yes">
      <svg viewBox="0 0 20 20" width="20" height="20" aria-hidden="true" focusable="false">
        <path
          d="M4 10.5l4 4 8-9"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <span className="visually-hidden">Included</span>
    </span>
  );
}

function Dash() {
  return (
    <span className="matrix-mark matrix-mark-no">
      <svg viewBox="0 0 20 20" width="20" height="20" aria-hidden="true" focusable="false">
        <line x1="6" y1="10" x2="14" y2="10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
      <span className="visually-hidden">Not included</span>
    </span>
  );
}

function CellContent({ value }: { value: Cell }) {
  if (value === "yes") return <Tick />;
  if (value === "no") return <Dash />;
  return <span className="matrix-note">{value}</span>;
}

export default function ReadingDepthMatrix() {
  return (
    <section className="reading-depth-matrix" aria-labelledby="depth-matrix-h">
      <h2 id="depth-matrix-h" className="matrix-heading">
        One book, three depths: which Compass?
      </h2>
      <p className="matrix-lede">
        The three personalised readings sit on a ladder. Each one adds to the
        depth below it. You do not need all three, and this shows exactly what
        each one covers.
      </p>
      <p className="matrix-hint" aria-hidden="true">
        Swipe the table sideways to compare all three &rarr;
      </p>

      <div className="matrix-scroll">
        <table className="matrix-table">
          <caption className="visually-hidden">
            A comparison of the three personalised Compass readings by depth and
            price.
          </caption>
          <thead>
            <tr>
              <th scope="col" className="matrix-corner">
                <span className="visually-hidden">What each reading covers</span>
              </th>
              {TIERS.map((t) => (
                <th
                  key={t.key}
                  scope="col"
                  className={`matrix-tier${t.flag ? " is-flag" : ""}`}
                >
                  {t.flag ? <span className="matrix-flag-tag">Most complete</span> : null}
                  <span className="matrix-tier-title">{t.title}</span>
                  <span className="matrix-tier-price">{t.price}</span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {ROWS.map((row) => (
              <tr key={row.label}>
                <th scope="row" className="matrix-rowlabel">
                  {row.label}
                </th>
                {row.cells.map((c, i) => (
                  <td
                    key={TIERS[i].key}
                    className={`matrix-cell${TIERS[i].flag ? " is-flag" : ""}`}
                  >
                    <CellContent value={c} />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td className="matrix-corner" aria-hidden="true" />
              {TIERS.map((t) => (
                <td key={t.key} className={`matrix-cta${t.flag ? " is-flag" : ""}`}>
                  <Link href={t.href} className="matrix-view">
                    View {t.title}
                    <span aria-hidden="true"> &rarr;</span>
                  </Link>
                </td>
              ))}
            </tr>
          </tfoot>
        </table>
      </div>
    </section>
  );
}
