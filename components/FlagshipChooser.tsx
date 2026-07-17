import Link from "next/link";

// A calm three-way decision aid shown on the ladder product pages. It
// clarifies which depth does which job and highlights the one you are
// currently reading about. Presentation only: no pricing logic, no
// checkout. The prices shown are display copy matching the registry.
// ("planner" stays in the type so the delisted Planner page compiles;
// no item carries it, so that page simply shows all three as links.)

export type Flagship = "compass" | "twelve" | "complete" | "planner";

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
    price: "$19",
    href: "/products/personal-feng-shui-compass",
    best: "Your Kua and your eight directions, read in depth, with a seven-day experiment. The foundation: just you, in one focused book.",
  },
  {
    key: "twelve",
    title: "Twelve Spaces Compass",
    price: "$29",
    href: "/products/all-twelve-spaces-compass",
    best: "Every room of your home read for your Kua, one chapter per room. The middle depth: your rooms, without the life areas.",
  },
  {
    key: "complete",
    title: "Complete Home Compass",
    price: "$49",
    href: "/products/complete-home-compass",
    best: "Everything read for your Kua: all twelve rooms, all nine life areas, compatibility, and a 2026 overlay. The whole map in one volume.",
  },
];

export default function FlagshipChooser({ current }: { current: Flagship }) {
  return (
    <section className="product-section flagship-chooser" aria-labelledby="flagship-h">
      <h2 id="flagship-h">One book, three depths: which Compass?</h2>
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
