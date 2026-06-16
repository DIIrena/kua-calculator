import Link from "next/link";

// A calm three-way decision aid shown on the three flagship product pages
// (Personal Compass, Complete Home Compass, 2026 Planner). It clarifies
// which one does which job and highlights the one you are currently
// reading about. Presentation only: no pricing logic, no checkout. The
// prices shown are display copy matching the registry.

export type Flagship = "compass" | "complete" | "planner";

const ITEMS: {
  key: Flagship;
  title: string;
  price: string;
  href: string;
  best: string;
}[] = [
  {
    key: "compass",
    title: "Personal Feng Shui Compass",
    price: "$14",
    href: "/products/personal-feng-shui-compass",
    best: "Your Kua and your eight directions, read in depth, with a seven-day experiment. The foundation: just you, in one focused book.",
  },
  {
    key: "complete",
    title: "Complete Home Compass",
    price: "$49",
    href: "/products/complete-home-compass",
    best: "Everything read for your Kua: all twelve rooms, all nine life areas, compatibility, and a 2026 overlay. The whole map in one volume.",
  },
  {
    key: "planner",
    title: "2026 Annual Planner",
    price: "$19",
    href: "/products/annual-feng-shui-planner-2026",
    best: "The feng shui year for your home, sector by sector, with a 243-day calendar. It reads the year, not your personal directions.",
  },
];

export default function FlagshipChooser({ current }: { current: Flagship }) {
  return (
    <section className="product-section flagship-chooser" aria-labelledby="flagship-h">
      <h2 id="flagship-h">Compass, Complete Home, or Planner?</h2>
      <p className="flagship-chooser-lede">
        Three ways in, three different jobs. They sit together neatly, and
        you do not need all three.
      </p>
      <ul className="flagship-list">
        {ITEMS.map((it) => {
          const isCurrent = it.key === current;
          return (
            <li
              key={it.key}
              className={`flagship-item${isCurrent ? " is-current" : ""}`}
            >
              <p className="flagship-item-head">
                <span className="flagship-item-title">{it.title}</span>
                <span className="flagship-item-price">{it.price}</span>
              </p>
              <p className="flagship-item-best">{it.best}</p>
              {isCurrent ? (
                <p className="flagship-item-here">You are reading about this one.</p>
              ) : (
                <p className="flagship-item-link">
                  <Link href={it.href}>View the {it.title} &rarr;</Link>
                </p>
              )}
            </li>
          );
        })}
      </ul>
    </section>
  );
}
