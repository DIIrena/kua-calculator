import type { Metadata } from "next";
import Link from "next/link";
import BuyButton from "@/components/BuyButton";
import ProductCoverPreview from "@/components/ProductCoverPreview";
import FloatingWaitlistCTA from "@/components/FloatingWaitlistCTA";

export const metadata: Metadata = {
  title: "Move-In Date Report | My Feng Shui Home",
  description:
    "A personalised PDF that reads your move-in window against the verified 2026 day calendar, with your Kua directions for the new home and a first-week activation checklist. July 2026 to February 2027.",
  alternates: {
    canonical: "https://myfengshuihome.com/products/move-in-kit",
  },
  openGraph: {
    type: "website",
    title: "Move-In Date Report",
    description:
      "Your move-in window read day by day, your Kua directions for the new home, and a first-week checklist. $29.",
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
          The <em>Move-In Date Report</em>.
        </h1>
        <p className="product-lede">
          The box is taped, the keys are in your hand, and the only
          thing left is choosing the day you walk in. The tradition has
          a method for that. You give us the window you might move
          within, and we read every day in it against the verified 2026
          calendar: the days it treats as favourable for a move, the
          ones good for settling, and the ones to handle with care. The
          report adds your own Kua directions for setting up the new
          home, and a short sequence for the first week inside.
        </p>
        <p className="product-hero-launch-state">
          The Move-In Date Report is in development and checkout is not
          live yet. Join the waitlist and you are the first to hear when
          it ships.
        </p>
        <p className="product-hero-anchor">
          <a href="#waitlist">Skip to the waitlist →</a>
        </p>
      </section>

      <ProductCoverPreview slug="move-in-kit" title="Move-In Date Report" />

      <section className="product-section">
        <h2>Who it is for</h2>
        <p>
          You are about to move house between now and early 2027, and
          you want to use the traditional calendar to choose the day,
          plus a clear checklist for settling in once you are inside.
        </p>
      </section>

      <section className="product-section">
        <h2>What is inside</h2>
        <ul>
          <li>
            A day-by-day reading of your move-in window: each date
            marked favourable, settling, neutral, or one to handle with
            care, with a one-line note.
          </li>
          <li>
            Your best move days inside the window pulled out as a short
            list, and the days to handle with care listed separately.
          </li>
          <li>
            Your four supportive directions for the new home, read from
            your Kua, for placing the bed and the main work seat as you
            set up.
          </li>
          <li>
            A first-week activation sequence: the threshold, light and
            air, the kitchen, the bed, and the work seat, in order.
          </li>
        </ul>
      </section>

      <section className="product-section">
        <h2>How it works</h2>
        <ol>
          <li>You pay once. There is no subscription, no recurring fee.</li>
          <li>
            You fill in a short form: first name, birth date, gender,
            and the move-in window you are considering. We compute your
            Kua server-side and read the window against the calendar.
          </li>
          <li>
            Within about a minute, the PDF is emailed to you with a
            download link. Reply to the delivery email any time for a
            fresh one.
          </li>
        </ol>
      </section>

      <section className="product-section">
        <h2>What it is not</h2>
        <p>
          The day calendar covers the 2026 solar year, July 2026 through
          February 2027. If your move falls outside that span, this
          edition will not cover it; a later edition will pick up 2027.
        </p>
        <p>
          It is not a guarantee that the move goes well. It shapes the
          conditions; movers, weather, and life still happen. It is also
          not a substitute for an in-person consultation. It is a
          printable report you use yourself.
        </p>
      </section>

      <section className="product-buy-section">
        <h2>Join the waitlist.</h2>
        <p>
          The Move-In Date Report is in development. When checkout goes
          live, we email you the launch page and the early price. You
          can unsubscribe any time.
        </p>
        <BuyButton
          productSlug="move-in-kit"
          priceLabel="$29"
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

      <FloatingWaitlistCTA />
    </div>
  );
}
