import type { Metadata } from "next";
import Link from "next/link";
import { sendChecklist } from "@/app/actions/lead-magnet";

// Stage 4 stub of the paid product. The actual Stripe checkout + the
// personalised PDF generation are Stage 5 work. This page captures
// "early list" emails using the same lead-magnet action so we can
// announce the launch.

export const metadata: Metadata = {
  title: "The Home Harmony Map - personalised feng shui PDF | My Feng Shui Home",
  description:
    "An eighteen-page personalised PDF keyed to your Kua number: bagua of your home, room-by-room walkthrough, money corner page, bedroom page, diagnostic worksheet. One-time $29. Coming soon.",
  alternates: { canonical: "https://myfengshuihome.com/home-harmony-map" },
};

const productJsonLd = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: "The Home Harmony Map",
  description:
    "A personalised eighteen-page feng shui PDF keyed to your Kua number. Bagua of your home, room-by-room walkthrough, money corner page, bedroom page, diagnostic worksheet.",
  brand: { "@type": "Brand", name: "My Feng Shui Home" },
  category: "Digital Download",
  offers: {
    "@type": "Offer",
    price: "29",
    priceCurrency: "USD",
    availability: "https://schema.org/PreOrder",
    url: "https://myfengshuihome.com/home-harmony-map",
  },
};

export default async function HomeHarmonyMapPage(props: {
  searchParams: Promise<{ checklist?: string }>;
}) {
  // Reusing the lead-magnet action for the early-list capture. The user
  // gets the checklist email immediately (real value) and lands here
  // with ?checklist=sent so we can confirm we have them on the list.
  const { checklist: status } = await props.searchParams;

  return (
    <div className="page-narrow map-page">
      <p className="eyebrow">A paid product. One product, not a catalogue.</p>
      <h1 className="map-page-heading">The Home Harmony Map.</h1>
      <p className="map-page-lede">
        An <strong>eighteen-page personalised PDF</strong> keyed to your Kua
        number. The bagua of your home. A one-page walkthrough for every room.
        A money-corner page. A bedroom page. A printable diagnostic worksheet
        you can take with you.
      </p>

      <div className="map-page-price">
        <span className="map-page-price-number">$29</span>
        <span className="map-page-price-suffix">one-time, no subscription</span>
      </div>

      <section className="map-page-section" aria-labelledby="what-you-get">
        <h2 id="what-you-get">What you get.</h2>
        <ul className="map-page-bullets">
          <li>
            <strong>A printed bagua of your home</strong>, keyed to your Kua
            number and your front-door facing. One sheet you can put on the
            fridge.
          </li>
          <li>
            <strong>A nine-sector room walkthrough</strong>, one page per room,
            naming the <em>one</em> change that matters most in each space.
          </li>
          <li>
            <strong>Your four favourable directions</strong> marked for sleep,
            work, study, and meditation. So you stop guessing which way to face
            the bed.
          </li>
          <li>
            <strong>A money-corner activation page</strong>: the wealth corner,
            the wallet check, the dirty-stove sweep. From chapter eighteen of
            the source material, translated into a one-page action list.
          </li>
          <li>
            <strong>A bedroom-and-relationships page</strong>: bed position,
            mirror check, headboard rule, what to do if you share the room
            with someone whose Kua is different from yours.
          </li>
        </ul>
      </section>

      <section className="map-page-section" aria-labelledby="what-it-is-not">
        <h2 id="what-it-is-not">What it is not.</h2>
        <ul className="map-page-bullets">
          <li>
            It is <strong>not</strong> a subscription. You pay once. You own
            the file.
          </li>
          <li>
            It is <strong>not</strong> a fortune-telling reading. We do not
            tell you what is going to happen. We tell you which directions
            traditionally support your kind of activity, and you decide what
            to do with that.
          </li>
          <li>
            It is <strong>not</strong> a hundred-page ebook. It is a working
            map. You print it, walk your home with it, mark it up, and put
            it on the fridge.
          </li>
        </ul>
      </section>

      <section className="map-page-section map-page-early" aria-labelledby="early-list">
        <h2 id="early-list">It launches soon. Join the early list.</h2>
        <p>
          The Map is in production. While we finish it, we are sending the
          <strong> 14-point room harmony checklist</strong> to everyone on
          the early list. One email, the checklist, then a heads-up when the
          Map goes live. No marketing list, no upsells.
        </p>

        {status === "sent" ? (
          <p
            className="lead-magnet-status lead-magnet-status-ok"
            role="status"
          >
            You are on the list. We sent the checklist; check your inbox in a
            minute.
          </p>
        ) : status === "invalid" ? (
          <p
            className="lead-magnet-status lead-magnet-status-err"
            role="alert"
          >
            That does not look like a valid email. Try again?
          </p>
        ) : status === "error" ? (
          <p
            className="lead-magnet-status lead-magnet-status-err"
            role="alert"
          >
            We could not send the email right now. Please try again in a
            minute.
          </p>
        ) : null}

        <form action={sendChecklist} className="lead-magnet-form">
          <label className="lead-magnet-label" htmlFor="early-list-email">
            Your email
          </label>
          <div className="lead-magnet-row">
            <input
              id="early-list-email"
              name="email"
              type="email"
              required
              autoComplete="email"
              placeholder="you@example.com"
              className="lead-magnet-input"
            />
            <button type="submit" className="cta-primary lead-magnet-submit">
              Join the early list
            </button>
          </div>
        </form>

        <p className="map-page-back">
          <Link href="/" className="article-back-link">
            &larr; Back to the homepage
          </Link>
        </p>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />
    </div>
  );
}
