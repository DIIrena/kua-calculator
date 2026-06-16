import type { Metadata } from "next";
import Link from "next/link";
import BuyButton from "@/components/BuyButton";
import FulfillmentBlock from "@/components/FulfillmentBlock";
import ProductPreview from "@/components/ProductPreview";

export const metadata: Metadata = {
  title: "7-Day Home Reset | My Feng Shui Home",
  description:
    "A seven-day email course. One short email a day, one small task, nothing to buy or redecorate. Reset your home room by room. No outcome promises.",
  alternates: {
    canonical: "https://myfengshuihome.com/products/seven-day-home-reset",
  },
  openGraph: {
    type: "website",
    title: "7-Day Home Reset",
    description:
      "One short email a day for a week, one small task each, room by room. $19.",
    url: "https://myfengshuihome.com/products/seven-day-home-reset",
  },
};

type SearchParams = Promise<{ waitlist?: string }>;

export default async function SevenDayHomeResetPage(props: {
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
          The <em>7-Day Home Reset</em>.
        </h1>
        <p className="product-lede">
          Most of what helps a home is small and quiet, and most of us
          never get to it because it never becomes a plan. This is the
          plan. For seven days you get one short email a day, each with a
          single small task: the front door, the air and light, the bed,
          the desk, the kitchen, the clutter that has stopped moving. No
          shopping, no redecorating, nothing that needs a free weekend.
          By the end of the week your home is reset, one calm step at a
          time.
        </p>
        <p className="product-hero-launch-state">
          Available now. The welcome email arrives the moment you buy, then one short task email a day for seven days.
        </p>
        <p className="product-hero-anchor">
          <a href="#waitlist">Skip to checkout →</a>
        </p>
      </section>

      <ProductPreview slug="seven-day-home-reset" title="7-Day Home Reset" />

      <section className="product-section">
        <h2>Who it is for</h2>
        <p>
          You want your home to feel calmer and more supportive, but a
          big overhaul never happens. You would rather be handed one
          small, doable thing a day than a long list to dread. You like
          the idea of a gentle structure that fits around an ordinary
          week.
        </p>
      </section>

      <section className="product-section">
        <h2>What you get</h2>
        <ul>
          <li>
            A welcome email the moment you join, then one email a day for
            seven days.
          </li>
          <li>
            One small task per day, each doable in ten to twenty minutes
            with things you already own.
          </li>
          <li>
            Seven rooms and themes in order: a slow look around, the
            front door, light and air, the bedroom, the desk, the
            kitchen, clutter and flow, and a final day on keeping the one
            change that helped.
          </li>
          <li>
            A calm, practical voice throughout. A way to read and adjust
            your rooms, not a fortune.
          </li>
        </ul>
      </section>

      <section className="product-section">
        <h2>How it works</h2>
        <ol>
          <li>You pay once. There is no subscription, no recurring fee.</li>
          <li>
            The welcome email arrives right away, and then one task email
            a day for the next seven days.
          </li>
          <li>
            Do the task, or do not. There is no app and nothing to log
            in to. Every email has a one-click unsubscribe, and the
            series stops the moment you use it.
          </li>
        </ol>
      </section>

      <section className="product-section">
        <h2>What it is not</h2>
        <p>
          It is not a subscription. You pay once for the seven days, and
          the emails stop on their own at the end. It is not a personal
          reading of your home or your Kua; for that, the free Kua
          calculator and the personalised readings on this site go
          deeper. And it does not promise outcomes. It is a structured,
          gentle way to give your home a week of steady attention.
        </p>
      </section>

      <FulfillmentBlock slug="seven-day-home-reset" />

      <section className="product-buy-section">
        <h2>Buy now.</h2>
        <p>
          Secure checkout. 7-day refund. The course begins the moment you buy.
        </p>
        <BuyButton
          productSlug="seven-day-home-reset"
          priceLabel="$19"
          state="stripe-live"
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
