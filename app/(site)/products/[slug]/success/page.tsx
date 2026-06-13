import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getStripe } from "@/lib/stripe";
import {
  findCommerceProduct,
  DOWNLOAD_URL_TTL_SECONDS,
} from "@/lib/commerce";
import { createAdminClient } from "@/lib/supabase/server";
import { fulfillCompass } from "@/app/actions/fulfill-compass";

// Post-checkout success page for every buyable product.
//
//   - static products: verifies the paid session, mints signed
//     download links right on the page (the webhook also emailed
//     them), so the buyer gets the files even if email is slow.
//   - personalized products: renders the three-field personalisation
//     form that posts to the fulfillCompass server action.
//
// The session_id in the URL is the proof of purchase; we verify it
// against Stripe server-side on every render. No payment data is
// handled here.

export const metadata: Metadata = {
  title: "Thank you | My Feng Shui Home",
  robots: { index: false, follow: false },
};

type Params = Promise<{ slug: string }>;
type SearchParams = Promise<{ session_id?: string; form?: string }>;

export default async function SuccessPage(props: {
  params: Params;
  searchParams: SearchParams;
}) {
  const { slug } = await props.params;
  const { session_id: sessionId, form: formStatus } =
    await props.searchParams;

  const product = findCommerceProduct(slug);
  if (!product) notFound();

  const stripe = getStripe();
  if (!stripe || !sessionId) {
    return (
      <div className="page-content product-page">
        <section className="product-hero">
          <h1 className="product-heading">Something is missing.</h1>
          <p className="product-lede">
            We could not find your checkout session. If you just paid,
            check your email for the delivery message, or write to
            hello@myfengshuihome.com and we sort it out.
          </p>
          <p>
            <Link href={product.productPath} className="article-back-link">
              &larr; Back to the product page
            </Link>
          </p>
        </section>
      </div>
    );
  }

  let paid = false;
  let email = "";
  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    paid =
      session.payment_status === "paid" &&
      session.metadata?.productSlug === product.slug;
    email =
      session.customer_details?.email ?? session.customer_email ?? "";
  } catch {
    paid = false;
  }

  if (!paid) {
    return (
      <div className="page-content product-page">
        <section className="product-hero">
          <h1 className="product-heading">Payment not confirmed yet.</h1>
          <p className="product-lede">
            Stripe has not confirmed this payment. If you just paid,
            wait a minute and refresh this page. If the problem stays,
            email hello@myfengshuihome.com with the time of your
            purchase and we sort it out.
          </p>
        </section>
      </div>
    );
  }

  if (product.fulfillment === "static" && product.files?.length) {
    // Mint fresh signed links on every render of the success page.
    const admin = createAdminClient();
    const links: Array<{ url: string; label: string }> = [];
    for (const file of product.files) {
      const { data: signed } = await admin.storage
        .from("product-files")
        .createSignedUrl(file.path, DOWNLOAD_URL_TTL_SECONDS);
      if (signed?.signedUrl) {
        links.push({ url: signed.signedUrl, label: file.label });
      }
    }

    return (
      <div className="page-content product-page">
        <section className="product-hero">
          <p className="success-thankyou">Thank you.</p>
          <h1 className="product-heading">
            Your {product.shortTitle} is ready.
          </h1>
          <p className="product-lede">
            The files are below, and a copy of these links is on its way
            to {email || "your inbox"}. Links stay valid for 7 days;
            reply to the delivery email any time for a fresh one.
          </p>
          <ul className="success-download-list">
            {links.map((l) => (
              <li key={l.url}>
                <a href={l.url} className="cta-primary" download>
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          {links.length === 0 ? (
            <p className="product-lede">
              The download links are being prepared. Check your email in
              a minute, or write to hello@myfengshuihome.com.
            </p>
          ) : null}
          <p className="success-refund-note">
            7-day refund, no questions asked. The{" "}
            <Link href="/refunds">refund policy</Link> is one page.
          </p>
        </section>
      </div>
    );
  }

  // Personalized product: the three-field form.
  const delivered = formStatus === "delivered";
  const invalid = formStatus === "invalid";
  const errored = formStatus === "error";

  return (
    <div className="page-content product-page">
      <section className="product-hero">
        <p className="success-thankyou">Thank you.</p>
        <h1 className="product-heading">
          One step left: personalise your {product.shortTitle}.
        </h1>
        {delivered ? (
          <>
            <p className="product-lede" role="status">
              Done. Your PDF is rendered and the download link is in
              your inbox at {email || "your email address"}. The link
              works for 7 days; reply to that email any time for a
              fresh one.
            </p>
            <p>
              <Link href="/guide" className="article-back-link">
                Read the guide while it lands &rarr;
              </Link>
            </p>
          </>
        ) : (
          <>
            <p className="product-lede">
              Three fields. We compute your Kua server-side (the
              Chinese New Year boundary is handled automatically),
              render your PDF, and email it to {email || "you"} within
              about a minute.
            </p>
            {invalid ? (
              <p className="lead-magnet-status lead-magnet-status-err" role="alert">
                Please check the fields: a first name, a full birth
                date, and a selection for the formula variant.
              </p>
            ) : null}
            {errored ? (
              <p className="lead-magnet-status lead-magnet-status-err" role="alert">
                Something went wrong on our end. Try once more in a
                minute, or email hello@myfengshuihome.com and we render
                it by hand.
              </p>
            ) : null}
            <form action={fulfillCompass} className="success-personalize-form">
              <input type="hidden" name="sessionId" value={sessionId} />
              <input type="hidden" name="productSlug" value={product.slug} />
              <div className="field">
                <label className="field-label" htmlFor="compass-first-name">
                  First name (appears on the cover)
                </label>
                <input
                  id="compass-first-name"
                  name="firstName"
                  type="text"
                  required
                  maxLength={60}
                  autoComplete="given-name"
                />
              </div>
              <div className="field field-date">
                <span className="field-label" id="compass-dob-label">
                  Birth date
                </span>
                <div
                  className="date-row"
                  role="group"
                  aria-labelledby="compass-dob-label"
                >
                  <label className="date-sub">
                    <span className="date-sub-label">Year</span>
                    <input
                      name="year"
                      type="number"
                      inputMode="numeric"
                      min="1900"
                      max="2050"
                      step="1"
                      required
                    />
                  </label>
                  <label className="date-sub">
                    <span className="date-sub-label">Month</span>
                    <input
                      name="month"
                      type="number"
                      inputMode="numeric"
                      min="1"
                      max="12"
                      step="1"
                      required
                    />
                  </label>
                  <label className="date-sub">
                    <span className="date-sub-label">Day</span>
                    <input
                      name="day"
                      type="number"
                      inputMode="numeric"
                      min="1"
                      max="31"
                      step="1"
                      required
                    />
                  </label>
                </div>
              </div>
              <div className="field field-gender">
                <span className="field-label" id="compass-gender-label">
                  Formula variant
                </span>
                <div
                  className="radio-row"
                  role="radiogroup"
                  aria-labelledby="compass-gender-label"
                >
                  <label className="radio">
                    <input type="radio" name="gender" value="male" required />
                    <span>Male</span>
                  </label>
                  <label className="radio">
                    <input type="radio" name="gender" value="female" />
                    <span>Female</span>
                  </label>
                </div>
                <p className="field-help">
                  The classical formula uses a male and a female
                  variant. Pick the one you want your reading computed
                  with.
                </p>
              </div>
              <button type="submit" className="cta-primary">
                Render my reading
              </button>
            </form>
          </>
        )}
      </section>
    </div>
  );
}
