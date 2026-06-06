import type { Metadata } from "next";
import Link from "next/link";
import BuyButton from "@/components/BuyButton";

export const metadata: Metadata = {
  title:
    "Move-In Date Selection + Activation Kit | My Feng Shui Home",
  description:
    "The traditional way to choose a move-in date, plus a home-blessing checklist for the first week. Honest, practical, printable.",
  alternates: {
    canonical: "https://myfengshuihome.com/products/move-in-kit",
  },
  openGraph: {
    type: "website",
    title: "Move-In Date Selection + Activation Kit",
    description:
      "The traditional way to choose a move-in date, plus a home-blessing checklist.",
    url: "https://myfengshuihome.com/products/move-in-kit",
  },
};

type SearchParams = Promise<{ waitlist?: string }>;

export default async function MoveInKitPage(props: {
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
          The <em>Move-In Date Selection + Activation Kit</em>.
        </h1>
        <p className="product-lede">
          The box is taped, the keys are in your hand, and the only
          thing left is choosing the day you walk in. The tradition
          has a method for that. It also has a small set of moves for
          the first week in the new place that settle the energy
          before the laundry pile does. The Move-In Kit gathers both
          of those into one printable book.
        </p>
      </section>

      <section className="product-section">
        <h2>Who it is for</h2>
        <p>
          You are about to move house. Or you are renovating, finishing
          a build, or moving offices. You want to use the traditional
          calendar to pick the day, and you want a short, calm
          checklist to follow once you are inside.
        </p>
      </section>

      <section className="product-section">
        <h2>What it helps with</h2>
        <ul>
          <li>
            Reading the auspicious and inauspicious days in a window
            of your choice, against your Kua.
          </li>
          <li>
            Knowing which directions to avoid for moving heavy
            furniture or starting a renovation, based on the year.
          </li>
          <li>
            Activating the new home in the first week: the threshold,
            the front door, the bedroom, the kitchen, the wealth
            corner.
          </li>
          <li>
            A small home-blessing sequence drawn from the tradition,
            written in plain language with no rituals you do not
            understand.
          </li>
        </ul>
      </section>

      <section className="product-section">
        <h2>What is inside</h2>
        <ul>
          <li>
            A date-selection worksheet that maps your move-in window
            against the year's stars and your Kua.
          </li>
          <li>The list of days to prefer and days to avoid.</li>
          <li>
            A first-week activation checklist with the seven traditional
            steps, in order.
          </li>
          <li>
            A printable home-blessing card for the entrance, the
            bedroom, the kitchen, and the wealth corner.
          </li>
        </ul>
      </section>

      <section className="product-section">
        <h2>How it works</h2>
        <ol>
          <li>You pay once.</li>
          <li>
            You give us your move-in window (a range of dates) and
            your Kua details. We compute the day-by-day reading.
          </li>
          <li>
            The PDF is emailed to you and stored on your account
            dashboard. Print it, mark it up, use it.
          </li>
        </ol>
      </section>

      <section className="product-section">
        <h2>What it is not</h2>
        <p>
          It is not a guarantee that the move goes well. The Kit
          shapes the conditions; movers, weather, and life still
          happen. It is also not a substitute for an in-person
          consultation - it is a printable book you use yourself.
        </p>
      </section>

      <section className="product-buy-section">
        <h2>Join the waitlist.</h2>
        <p>
          The Move-In Kit is in development. When it ships, we will
          email you with the launch price and the download link.
        </p>
        <BuyButton
          productSlug="move-in-kit"
          priceLabel="$19 to $29"
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
