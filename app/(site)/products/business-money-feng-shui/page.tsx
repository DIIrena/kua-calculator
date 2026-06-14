import type { Metadata } from "next";
import Link from "next/link";
import BuyButton from "@/components/BuyButton";
import ProductGallery from "@/components/ProductGallery";

export const metadata: Metadata = {
  title:
    "Business and Money Feng Shui Kit | My Feng Shui Home",
  description:
    "The office, the desk, the wealth corner, the kitchen stove. The practical money-channel reading for your home and business, keyed to your Kua.",
  alternates: {
    canonical:
      "https://myfengshuihome.com/products/business-money-feng-shui",
  },
  openGraph: {
    type: "website",
    title: "Business and Money Feng Shui Kit",
    description:
      "The office, the desk, the wealth corner, the kitchen stove.",
    url: "https://myfengshuihome.com/products/business-money-feng-shui",
  },
};

type SearchParams = Promise<{ waitlist?: string }>;

export default async function MoneyKitPage(props: {
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
          The <em>Business and Money Feng Shui Kit</em>.
        </h1>
        <p className="product-lede">
          A kitchen with a clean stove. A desk you actually want to
          sit at. A wealth corner the household pays a little quiet
          attention to. The tradition reads each of these as part of
          one larger channel - the channel money runs through. This
          Kit is the focused printable book that reads that channel
          for your home and your work, keyed to your Kua.
        </p>
        <p className="product-hero-launch-state">
          Available now. The files arrive by email the moment you buy.
        </p>
        <p className="product-hero-anchor">
          <a href="#waitlist">Skip to checkout →</a>
        </p>
      </section>

      <ProductGallery slug="business-money-feng-shui" title="Business and Money Feng Shui Kit" />

      <section className="product-section">
        <h2>Who it is for</h2>
        <p>
          You are a freelancer, a small-business owner, a creative
          professional, or a household that wants the money side of
          the home read seriously. You work from home, or partly from
          home, or you have a small studio. You want the practical
          reading, not the magazine version.
        </p>
      </section>

      <section className="product-section">
        <h2>What it helps with</h2>
        <ul>
          <li>
            Picking the desk position and chair facing for your Kua.
          </li>
          <li>
            Finding the south-east wealth corner of your home, and
            knowing what to do in it.
          </li>
          <li>
            Reading the kitchen as the wealth-channel hinge - the
            stove, the sink, the wood that mediates between them.
          </li>
          <li>
            A short wallet, ledger, and daily-money practice section
            drawn from the tradition.
          </li>
        </ul>
      </section>

      <section className="product-section">
        <h2>What is inside</h2>
        <ul>
          <li>
            The desk reading: position, facing, the wall behind, the
            window.
          </li>
          <li>
            The wealth-corner walkthrough, with the small symbolic
            cures the tradition uses and the ones we leave out.
          </li>
          <li>
            The kitchen and stove section - the part most people skip
            and the part that quietly moves the needle.
          </li>
          <li>
            A daily money practice section drawn from the tradition,
            no mysticism, no promises.
          </li>
          <li>
            A short worked example of a freelancer's home office, to
            show how the moves combine.
          </li>
        </ul>
      </section>

      <section className="product-section">
        <h2>How it works</h2>
        <ol>
          <li>You pay once. $19, no subscription.</li>
          <li>
            The PDF arrives by email within a minute. The desk-facing
            table inside covers all nine Kua numbers, so you look up
            yours in the book. No forms to fill.
          </li>
          <li>
            7-day refund. Reply to the delivery
            email any time for a fresh download link.
          </li>
        </ol>
      </section>

      <section className="product-section">
        <h2>What it is not</h2>
        <p>
          It is not a wealth-attraction product. The tradition shapes
          the conditions a home offers; it does not promise money
          arrives. The framing here is the same as everywhere else on
          the site: a structured way to choose, not a fortune to
          expect.
        </p>
      </section>

      <section className="product-buy-section">
        <h2>Buy now.</h2>
        <p>
          Secure checkout. 7-day refund. Your files arrive by email the moment you buy.
        </p>
        <BuyButton
          productSlug="business-money-feng-shui"
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
