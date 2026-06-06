import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Paid guides and tools | My Feng Shui Home",
  description:
    "Personalised feng shui PDFs and tools, honestly framed. The Personal Feng Shui Compass, the Annual Planner, and focused readings for the bedroom, the kitchen, and your move-in date.",
  alternates: { canonical: "https://myfengshuihome.com/products" },
  openGraph: {
    type: "website",
    title: "Paid guides and tools - My Feng Shui Home",
    description:
      "Personalised feng shui PDFs and tools, honestly framed.",
    url: "https://myfengshuihome.com/products",
  },
};

type ShelfItem = {
  slug: string;
  href: string;
  title: string;
  oneLiner: string;
  status: "live" | "waitlist" | "coming-soon" | "free";
  priceLabel: string;
};

const SHELF: ReadonlyArray<ShelfItem> = [
  {
    slug: "kua-calculator",
    href: "/kua-calculator",
    title: "Kua Number Calculator",
    oneLiner:
      "Your Kua number and your eight personal directions, in ten seconds. Always free.",
    status: "free",
    priceLabel: "Free",
  },
  {
    slug: "personal-feng-shui-compass",
    href: "/products/personal-feng-shui-compass",
    title: "Personal Feng Shui Compass",
    oneLiner:
      "Your Kua read in depth: four supportive directions, four to handle with care, and a seven-day experiment to test it.",
    status: "waitlist",
    priceLabel: "$14",
  },
  {
    slug: "annual-feng-shui-planner-2026",
    href: "/products/annual-feng-shui-planner-2026",
    title: "2026 Annual Feng Shui Planner",
    oneLiner:
      "The 2026 annual chart, monthly stars, daily calendar, and sector treatments. The whole year in one printable book.",
    status: "waitlist",
    priceLabel: "$29 to $39",
  },
  {
    slug: "move-in-kit",
    href: "/products/move-in-kit",
    title: "Move-In Date Selection + Activation Kit",
    oneLiner:
      "The traditional way to choose a move-in date, plus a home-blessing checklist to settle the energy on day one.",
    status: "waitlist",
    priceLabel: "$19 to $29",
  },
  {
    slug: "bedroom-reset",
    href: "/products/bedroom-reset",
    title: "Bedroom and Relationship Reset",
    oneLiner:
      "A focused PDF reading the bedroom for your Kua, with the full headboard, mirror, and shared-furniture checklist.",
    status: "waitlist",
    priceLabel: "$14 to $19",
  },
  {
    slug: "business-money-feng-shui",
    href: "/products/business-money-feng-shui",
    title: "Business and Money Feng Shui Kit",
    oneLiner:
      "The office, the desk, the wealth corner, the kitchen stove. The practical money-channel reading for your home and business.",
    status: "waitlist",
    priceLabel: "$19 to $29",
  },
];

function statusBadge(item: ShelfItem): React.ReactNode {
  if (item.status === "free") {
    return (
      <span className="product-shelf-status product-shelf-status-free">
        Free
      </span>
    );
  }
  if (item.status === "live") {
    return (
      <span className="product-shelf-status product-shelf-status-live">
        Available now
      </span>
    );
  }
  if (item.status === "waitlist") {
    return (
      <span className="product-shelf-status product-shelf-status-waitlist">
        Waitlist
      </span>
    );
  }
  return (
    <span className="product-shelf-status product-shelf-status-coming">
      Coming soon
    </span>
  );
}

export default function ProductsPage() {
  return (
    <div className="page-content products-page">
      <section className="products-hero">
        <p className="eyebrow">My Feng Shui Home</p>
        <h1 className="products-heading">Paid guides and tools.</h1>
        <p className="products-lede">
          Personalised PDFs and focused tools, written in the same calm
          voice as the free guide. None promise outcomes. All give you
          a structured way to decide what to do in the room you are
          standing in.
        </p>
      </section>

      <section className="products-shelf" aria-label="Product list">
        <ul className="products-grid">
          {SHELF.map((item) => (
            <li key={item.slug} className="product-shelf-card">
              <Link
                href={item.href}
                className="product-shelf-link"
                aria-labelledby={`product-${item.slug}-title`}
              >
                <p className="product-shelf-status-row">
                  {statusBadge(item)}
                  <span className="product-shelf-price">
                    {item.priceLabel}
                  </span>
                </p>
                <h2
                  id={`product-${item.slug}-title`}
                  className="product-shelf-title"
                >
                  {item.title}
                </h2>
                <p className="product-shelf-oneliner">{item.oneLiner}</p>
                <p className="product-shelf-cta">
                  {item.status === "free"
                    ? "Open the tool →"
                    : item.status === "live"
                      ? "See the product →"
                      : "Read more + join the waitlist →"}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="products-honest-footer">
        <h2>What this shelf is, and what it is not.</h2>
        <p>
          Every product here is a printable PDF or a free tool. There
          are no consultations, no subscriptions, no recurring fees.
          You pay once and you keep what you bought. Each product is
          self-contained: you can buy one without buying any of the
          others.
        </p>
        <p>
          Most of the catalogue is on a waitlist while we finish the
          checkout system. When a product ships, you get one email
          with the launch price and the download link. That is the
          whole promise. We will not put you on a marketing funnel.
        </p>
      </section>
    </div>
  );
}
