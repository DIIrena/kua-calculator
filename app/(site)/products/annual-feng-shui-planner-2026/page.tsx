import type { Metadata } from "next";
import Link from "next/link";
import BuyButton from "@/components/BuyButton";

export const metadata: Metadata = {
  title:
    "2026 Annual Feng Shui Planner | The year in one printable book",
  description:
    "The 2026 annual chart, the 5 Yellow and 2 Black, Tai Sui, the Three Killings, sector-by-sector treatments, monthly stars, and a daily calendar. One printable book for the year.",
  alternates: {
    canonical:
      "https://myfengshuihome.com/products/annual-feng-shui-planner-2026",
  },
  openGraph: {
    type: "website",
    title: "2026 Annual Feng Shui Planner",
    description:
      "The 2026 annual chart, sector treatments, monthly stars, and a daily calendar. One printable book for the year.",
    url: "https://myfengshuihome.com/products/annual-feng-shui-planner-2026",
  },
};

type SearchParams = Promise<{ waitlist?: string }>;

export default async function PlannerPage(props: {
  searchParams: SearchParams;
}) {
  const { waitlist } = await props.searchParams;
  const status =
    waitlist === "sent" || waitlist === "invalid" || waitlist === "error"
      ? (waitlist as "sent" | "invalid" | "error")
      : null;

  return (
    <div className="page-content product-page">
      <section className="product-hero">
        <p className="eyebrow">My Feng Shui Home</p>
        <h1 className="product-heading">
          The <em>2026 Annual Feng Shui Planner</em>.
        </h1>
        <p className="product-lede">
          Every year, the stars move. The home you woke up in on the
          first of January is not, in feng shui terms, the same home
          you will wake up in on the first of March. The 2026
          Annual Feng Shui Planner is a printable book that reads the
          year ahead for your home: the annual chart, the two stars
          worth knowing, the directions to leave undisturbed, and what
          to do in each sector month by month.
        </p>
      </section>

      <section className="product-section">
        <h2>Who it is for</h2>
        <p>
          You are someone who likes to plan a year on paper. You want
          to know which sector of your home the 2026 stars treat
          gently, which they ask you to be careful with, and where to
          place the small annual cures. You want it in a book you can
          print, mark up, and keep on a shelf.
        </p>
      </section>

      <section className="product-section">
        <h2>What it helps with</h2>
        <ul>
          <li>
            Reading the 2026 annual chart for your own home, without
            having to learn the Flying Stars system first.
          </li>
          <li>
            Knowing which two stars to pay attention to (the 5 Yellow
            and the 2 Black) and where they sit in 2026.
          </li>
          <li>
            Finding Tai Sui and the Three Killings - the directions to
            leave undisturbed for the year.
          </li>
          <li>
            A sector-by-sector treatment for the year, plus monthly
            star changes and a daily calendar.
          </li>
        </ul>
      </section>

      <section className="product-section">
        <h2>What is inside</h2>
        <ul>
          <li>The 2026 annual chart, plotted and explained.</li>
          <li>
            The two stars worth knowing this year, where they sit, and
            what to do about them.
          </li>
          <li>
            Tai Sui and the Three Killings for 2026, with the practical
            "what to leave alone" guidance.
          </li>
          <li>
            A walkthrough of all nine sectors of your home, in order,
            for the year ahead.
          </li>
          <li>Monthly star notes for each of the twelve months.</li>
          <li>
            A printable daily calendar marking the auspicious and
            inauspicious days for moves, signings, and starting
            something new.
          </li>
          <li>A short glossary and a cures quick-reference.</li>
        </ul>
      </section>

      <section className="product-section">
        <h2>How it works</h2>
        <ol>
          <li>You pay once. No subscription.</li>
          <li>
            The PDF is emailed to you and stored on your account
            dashboard. The Planner is the same for every customer (the
            2026 chart is the same chart), so there is no birth-data
            form for this one.
          </li>
          <li>
            Print it, read it, mark it up. Use it for the whole year.
            When 2027 ships, we will email you about the renewal.
          </li>
        </ol>
      </section>

      <section className="product-section">
        <h2>What it is not</h2>
        <p>
          It is not a horoscope. It does not predict your year. It
          does not tell you what will happen. What it gives you is the
          traditional reading of where the 2026 stars sit in any home,
          and the small annual moves the tradition has long associated
          with that placement.
        </p>
        <p>
          It is also not a Kua reading. If you want your personal
          directions, that is what the{" "}
          <Link href="/products/personal-feng-shui-compass">
            Personal Feng Shui Compass
          </Link>{" "}
          covers. The Planner reads the year. The Compass reads you.
          They are different jobs.
        </p>
      </section>

      <section className="product-buy-section">
        <h2>Join the waitlist.</h2>
        <p>
          The Planner is in the final stages of being put together.
          When it is ready, we will email you with the launch price
          and the download link. You can unsubscribe any time.
        </p>
        <BuyButton
          productSlug="annual-feng-shui-planner-2026"
          priceLabel="$29 to $39"
          state="waitlist"
          waitlistStatus={status}
        />
      </section>

      <section className="product-back-section">
        <p>
          <Link href="/products" className="article-back-link">
            ← Back to all products
          </Link>
        </p>
      </section>
    </div>
  );
}
