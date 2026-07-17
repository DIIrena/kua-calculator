import type { Metadata } from "next";
import Link from "next/link";

// The consolidated legal page: company identity, terms of sale, delivery,
// the make-it-right promise (refunds live here and only here), the EU
// digital-content waiver, and the honest-framing disclaimer. Marketing
// surfaces do not point at the refund policy; this page holds it quietly.
// /refunds 301-redirects here (Stripe support URL + old links keep working).

export const metadata: Metadata = {
  title: "Legal | My Feng Shui Home",
  description:
    "Who operates My Feng Shui Home, the terms of sale, delivery, and how we make things right. Plain language, one page.",
  alternates: { canonical: "https://myfengshuihome.com/legal" },
  robots: { index: true, follow: true },
};

export default function LegalPage() {
  return (
    <div className="page-content">
      <article className="page-prose refunds-page">
        <p className="eyebrow">Legal</p>
        <h1>The legal page.</h1>

        <p className="refunds-flow">
          Everything about buying here, in plain language: who runs the
          shop, what you are buying, and what we stand behind.
        </p>

        <h2>The company</h2>
        <p>
          My Feng Shui Home is operated by <strong>Mens Sana LLC</strong>,
          a Wyoming limited liability company, registered at 30 N Gould St
          Ste N, Sheridan, WY 82801, United States. Card statements show
          the purchase as <strong>MYFENGSHUIHOME</strong>. You can reach a
          person at{" "}
          <a href="mailto:hello@myfengshuihome.com">
            hello@myfengshuihome.com
          </a>
          .
        </p>

        <h2>What you are buying</h2>
        <p>
          Everything sold here is digital: printable PDF guides,
          personalised readings generated for you, and an email course.
          Your purchase is a one-time payment for a personal-use licence:
          the files are yours to keep, read, and print for your own home.
          They are not for resale, redistribution, or reposting.
        </p>

        <h2>Delivery</h2>
        <p>
          Printable products arrive by email the moment you buy.
          Personalised readings are generated and emailed within about a
          minute of filling in the short form. The course begins right
          away. Download links stay valid for 7 days, and signed-in buyers
          can re-download from their account at any time; a fresh link is
          always one reply away.
        </p>

        <h2>If something is not right</h2>
        <p>
          If a purchase is not what you expected, email{" "}
          <a href="mailto:hello@myfengshuihome.com">
            hello@myfengshuihome.com
          </a>{" "}
          within 7 days of buying, with a line on what you were hoping
          for. We make it right: that can mean help using the product, a
          corrected file, or a full refund to the card you paid with.
          Refunds are processed within 2 business days and banks usually
          show the money within 5 to 10 business days after that. This
          promise covers honest cases; one refund per customer.
        </p>

        <h2>EU buyers</h2>
        <p>
          Digital content is delivered immediately. At checkout you agree
          to immediate delivery, which under EU consumer law waives the
          statutory 14-day withdrawal right for digital content. The
          make-it-right promise above applies to you all the same; the
          waiver changes the legal mechanism, not how we treat you when
          you email us.
        </p>

        <h2>What we promise, and what we do not</h2>
        <p>
          Every product reads your home through a structured tradition
          plus plain design reasoning, and labels which is which. We do
          not promise outcomes, and nothing here is medical, financial,
          legal, or construction advice. The Kua system is a structured
          tool for design decisions; it is not a prediction.
        </p>

        <h2>Copyright</h2>
        <p>
          All content on this site and in the products is &copy; Mens Sana
          LLC. The <Link href="/kua-calculator">free calculator</Link> and
          the <Link href="/guide">guide</Link> are free to read and link
          to; the paid files are licensed for personal use as described
          above.
        </p>

        <h2>Privacy</h2>
        <p>
          How we handle data has its own page:{" "}
          <Link href="/privacy">the privacy policy</Link>. The short
          version: the free calculator runs entirely in your browser and
          sends nothing anywhere; accounts and purchases store only what
          they need to work.
        </p>

        <p className="refunds-back">
          <Link href="/products" className="article-back-link">
            &larr; Back to the products
          </Link>
        </p>
      </article>
    </div>
  );
}
