import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Paid guides and tools | My Feng Shui Home",
  description:
    "Personalised feng shui PDFs and tools. The Personal Feng Shui Compass, the Annual Planner, and focused readings for the bedroom, the kitchen, and your move-in date. One-time prices, 7-day refunds.",
  alternates: { canonical: "https://myfengshuihome.com/products" },
  openGraph: {
    type: "website",
    title: "Paid guides and tools - My Feng Shui Home",
    description:
      "Personalised feng shui PDFs and tools. One-time prices, 7-day refunds, no outcome promises.",
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
    slug: "annual-feng-shui-planner-2026",
    href: "/products/annual-feng-shui-planner-2026",
    title: "2026 Annual Feng Shui Planner",
    oneLiner:
      "98 pages, the 2026 chart, sector treatments, and a 243-day calendar. The whole year in one printable book.",
    status: "live",
    priceLabel: "$29",
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
    slug: "good-days-calendar-2026",
    href: "/products/good-days-calendar-2026",
    title: "2026 Good-Days Calendar",
    oneLiner:
      "243 days marked Action, Rest, Neutral, or Caution, as a printable PDF and a phone calendar file.",
    status: "waitlist",
    priceLabel: "$9",
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
      "The bedroom walked from the door inward, with bed-direction readings for all nine Kua numbers and a couples section.",
    status: "waitlist",
    priceLabel: "$14",
  },
  {
    slug: "business-money-feng-shui",
    href: "/products/business-money-feng-shui",
    title: "Business and Money Feng Shui Kit",
    oneLiner:
      "The office, the desk, the wealth corner, the kitchen stove. The practical money-channel reading for your home and business.",
    status: "waitlist",
    priceLabel: "$19",
  },
  {
    slug: "home-diagnostic-workbook",
    href: "/products/home-diagnostic-workbook",
    title: "10-Step Home Diagnostic Workbook",
    oneLiner:
      "Audit your own home the way a practitioner would: ten steps, fill-in worksheets, and a 90-day re-evaluation.",
    status: "waitlist",
    priceLabel: "$14",
  },
  {
    slug: "daily-ritual-pack",
    href: "/products/daily-ritual-pack",
    title: "Daily Ritual and Twenty Laws Pack",
    oneLiner:
      "The twenty traditional laws as printable cards, plus morning and evening checklists for a calm daily rhythm.",
    status: "waitlist",
    priceLabel: "$9",
  },
  {
    slug: "cures-catalog",
    href: "/products/cures-catalog",
    title: "Cures and Crystals Catalogue",
    oneLiner:
      "Every cure and crystal as a compact reference card: what it is, where it goes, and what the tradition says.",
    status: "waitlist",
    priceLabel: "$9",
  },
  {
    slug: "kua-calculator",
    href: "/kua-calculator",
    title: "Kua Number Calculator",
    oneLiner:
      "Your Kua number and your eight personal directions, in ten seconds. Always free.",
    status: "free",
    priceLabel: "Free",
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

export default async function ProductsPage(props: {
  searchParams: Promise<{ checkout?: string }>;
}) {
  const { checkout } = await props.searchParams;
  const checkoutStatus =
    checkout === "error" || checkout === "cancelled"
      ? (checkout as "error" | "cancelled")
      : null;
  return (
    <div className="page-content products-page">
      <section className="products-hero">
        <p className="eyebrow">My Feng Shui Home</p>
        <h1 className="products-heading">Paid guides and tools.</h1>
        <p className="products-lede">
          Personalised PDFs and focused tools: a planner that reads
          the year, a compass that reads you, and focused readings for
          the bedroom, the move, and the money channel. Each one gives
          you a structured way to decide what to do in the room you
          are standing in.
        </p>
        <p className="products-lede">
          One-time prices. 7-day refunds. No outcome promises.
        </p>
      </section>

      <section className="products-shelf" aria-label="Product list">
        {checkoutStatus === "error" ? (
          <p
            className="buy-button-status buy-button-status-err"
            role="alert"
          >
            Something went wrong on our end. You were not charged. Try
            again in a minute, or email hello@myfengshuihome.com.
          </p>
        ) : checkoutStatus === "cancelled" ? (
          <p className="lead-magnet-status" role="status">
            Checkout cancelled. Nothing was charged.
          </p>
        ) : null}
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
          The 2026 Planner is available now. The rest of the shelf
          launches through 2026 - waitlist members get the early price
          and an email the day each checkout opens. You can
          unsubscribe any time.
        </p>
      </section>
    </div>
  );
}
