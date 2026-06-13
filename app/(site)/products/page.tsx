import type { Metadata } from "next";
import Link from "next/link";
import { COMPASS_CATALOGUE } from "@/lib/compass-catalogue";

export const metadata: Metadata = {
  title: "Paid guides and tools | My Feng Shui Home",
  description:
    "Personalised feng shui PDFs and tools. The Personal Feng Shui Compass, the 2026 Feng Shui Planner, and focused readings for the bedroom, the kitchen, and your move-in date. One-time prices, 7-day refunds.",
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
    title: "2026 Feng Shui Planner: Mid-Year Edition",
    oneLiner:
      "More than 80 pages, the 2026 chart, sector treatments, and a 243-day calendar. The rest of the year in one printable book.",
    status: "live",
    priceLabel: "$19",
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
    slug: "extended-personal-kua-report",
    href: "/products/extended-personal-kua-report",
    title: "Extended Personal Kua Report",
    oneLiner:
      "The deep reading: your eight directions plus your bedroom, desk, and dining seat read for your Kua, a compatibility chapter, and a 2026 overlay.",
    status: "waitlist",
    priceLabel: "$39",
  },
  {
    slug: "complete-home-compass",
    href: "/products/complete-home-compass",
    title: "Complete Home Compass",
    oneLiner:
      "The flagship: your eight directions, compatibility, all twelve rooms, all nine life areas, and the 2026 overlay, read for your Kua in one volume.",
    status: "waitlist",
    priceLabel: "$49",
  },
  {
    slug: "all-twelve-spaces-compass",
    href: "/products/all-twelve-spaces-compass",
    title: "Twelve Spaces Compass",
    oneLiner:
      "Every room read for your Kua in one PDF: bedroom, office, dining, kitchen, living room, bathroom, entrance, hallway, storage, laundry, balcony, garage.",
    status: "waitlist",
    priceLabel: "$29",
  },
  {
    slug: "all-nine-pillars-compass",
    href: "/products/all-nine-pillars-compass",
    title: "Nine Life Areas Compass",
    oneLiner:
      "All nine bagua life-area corners read for your Kua: wealth, recognition, relationships, creativity, helpful people, career, knowledge, family, health.",
    status: "waitlist",
    priceLabel: "$29",
  },
  {
    slug: "couple-compatibility-compass",
    href: "/products/couple-compatibility-compass",
    title: "Couple Compatibility Compass",
    oneLiner:
      "Two people, one home: both Kua maps read together. Where you agree, where to take turns, and how to settle the shared bed and table.",
    status: "waitlist",
    priceLabel: "$19",
  },
  {
    slug: "pick-three-pillars",
    href: "/products/pick-three-pillars",
    title: "Three Life Areas Compass",
    oneLiner:
      "Build your own bundle: choose any three of the nine life areas and get each read for your Kua, in one PDF.",
    status: "waitlist",
    priceLabel: "$17",
  },
  {
    slug: "pick-three-spaces",
    href: "/products/pick-three-spaces",
    title: "Three Spaces Compass",
    oneLiner:
      "Build your own bundle: choose any three rooms and get each read for your Kua, in one PDF.",
    status: "waitlist",
    priceLabel: "$17",
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
    title: "Move-In Date Report",
    oneLiner:
      "Your move-in window read day by day against the 2026 calendar, your Kua directions for the new home, and a first-week checklist.",
    status: "waitlist",
    priceLabel: "$29",
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
    slug: "seven-day-home-reset",
    href: "/products/seven-day-home-reset",
    title: "7-Day Home Reset",
    oneLiner:
      "A seven-day email course: one short email a day, one small task each, room by room. Nothing to buy, nothing to redecorate.",
    status: "waitlist",
    priceLabel: "$19",
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
    slug: "healthy-home-audit",
    href: "/products/healthy-home-audit",
    title: "Healthy Home Audit",
    oneLiner:
      "Nine conditions a home can support - air, light, damp, sound, more - audited with worksheets. No medical claims.",
    status: "waitlist",
    priceLabel: "$19",
  },
  {
    slug: "five-elements-workbook",
    href: "/products/five-elements-workbook",
    title: "Five Elements Home Styling Workbook",
    oneLiner:
      "Read any room in five words - Wood, Fire, Earth, Metal, Water - and learn the two rules of what belongs next to what.",
    status: "waitlist",
    priceLabel: "$12",
  },
  {
    slug: "starter-deck",
    href: "/products/starter-deck",
    title: "Learn Feng Shui Starter Deck",
    oneLiner:
      "Twenty-four printable flashcards of the working vocabulary, a bagua grid, and the first five moves a beginner makes.",
    status: "waitlist",
    priceLabel: "$9",
  },
  {
    slug: "bazi-basics",
    href: "/products/bazi-basics",
    title: "BaZi Basics: Read Your Own Chart",
    oneLiner:
      "An educational primer on the four pillars and the Ten Gods: read your own birth chart, and know where the reading stops.",
    status: "waitlist",
    priceLabel: "$14",
  },
  {
    slug: "whole-home-starter-bundle",
    href: "/products/whole-home-starter-bundle",
    title: "Whole-Home Starter Bundle",
    oneLiner:
      "The Diagnostic Workbook, the Ritual Pack, and the Cures Catalogue together: audit, rhythm, cures. Three PDFs, one price.",
    status: "waitlist",
    priceLabel: "$29",
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

      <section
        className="products-shelf"
        aria-label="The Compass collection"
      >
        <h2 className="products-heading" style={{ fontSize: "1.6rem" }}>
          The Compass collection.
        </h2>
        <p className="products-lede">
          Short, focused readings keyed to your Kua, one room or one life
          area at a time. $7 each, or $9 for the Year Ahead. Each is the
          same three-field reading as the Personal Compass, scoped to a
          single part of your home. All on the waitlist for now.
        </p>
        <ul className="products-grid">
          {COMPASS_CATALOGUE.map((e) => (
            <li key={e.slug} className="product-shelf-card">
              <Link
                href={`/products/${e.slug}`}
                className="product-shelf-link"
                aria-labelledby={`compass-${e.slug}-title`}
              >
                <p className="product-shelf-status-row">
                  <span className="product-shelf-status product-shelf-status-waitlist">
                    Waitlist
                  </span>
                  <span className="product-shelf-price">
                    ${e.priceCents / 100}
                  </span>
                </p>
                <h3
                  id={`compass-${e.slug}-title`}
                  className="product-shelf-title"
                >
                  {e.topicLabel} Compass
                </h3>
                <p className="product-shelf-oneliner">{e.oneLiner}</p>
                <p className="product-shelf-cta">
                  Read more + join the waitlist →
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
