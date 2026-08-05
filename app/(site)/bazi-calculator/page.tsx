import type { Metadata } from "next";
import Link from "next/link";
import { auth } from "@/auth";
import BaziCalculatorForm from "@/components/BaziCalculatorForm";

export const metadata: Metadata = {
  title: "Free BaZi Calculator (Four Pillars) | My Feng Shui Home",
  description:
    "A free BaZi calculator and Four Pillars calculator: get your Day Master, your four pillars, your five-element balance, and your Ten Gods. Sign in free to read your own chart.",
  alternates: { canonical: "https://myfengshuihome.com/bazi-calculator" },
  openGraph: {
    type: "website",
    title: "Free BaZi Calculator (Four Pillars)",
    description:
      "Get your Day Master and your full four pillars in seconds - a portrait of how you are built, read the way the tradition reads it.",
    url: "https://myfengshuihome.com/bazi-calculator",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "BaZi Calculator (Four Pillars)",
  applicationCategory: "LifestyleApplication",
  operatingSystem: "Web",
  url: "https://myfengshuihome.com/bazi-calculator",
  description:
    "Free BaZi / Four Pillars calculator. Computes your Day Master, four pillars, five-element balance, and Ten Gods from your birth date, time, and birthplace.",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
};

export default async function BaziCalculatorPage() {
  const session = await auth();
  const signedIn = Boolean(session?.user?.id);

  return (
    <div className="page-content">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <section className="product-hero">
        <p className="eyebrow">My Feng Shui Home</p>
        <h1 className="product-heading">
          Free BaZi Calculator <em>(Four Pillars)</em>
        </h1>
        <p className="product-lede">
          Your birth moment holds eight characters that the tradition reads as a portrait of how you
          are built. In seconds, meet your <strong>Day Master</strong> - the one character that stands
          for you - alongside your full four pillars, your five-element balance, and your Ten Gods.
        </p>
      </section>

      {signedIn ? (
        <section className="product-section">
          <h2>Get your chart</h2>
          <BaziCalculatorForm />
        </section>
      ) : (
        <section className="product-section">
          <h2>Sign in free to get your chart</h2>
          <p>
            Your BaZi chart is part of your free My Feng Shui Home account, so it is saved and waiting
            whenever you come back. Sign in with Google or a one-time email link - it takes a few
            seconds, and there is nothing to pay.
          </p>
          <ul>
            <li>Your <strong>Day Master</strong> and what element you are built from.</li>
            <li>Your full <strong>four pillars</strong>, colour-coded, with the Day Master marked.</li>
            <li>Your <strong>five-element balance</strong> at a glance.</li>
            <li>Your <strong>Ten Gods</strong> - the people and forces around you.</li>
          </ul>
          <p style={{ marginTop: "1.25rem" }}>
            <Link href="/sign-in" className="cta-primary">Sign in free to get your BaZi chart</Link>
          </p>
          <p style={{ marginTop: "1rem", fontSize: "0.9rem", color: "#4f5b53" }}>
            New here? The same link creates your account. Once you have your chart,{" "}
            <Link href="/products/bazi-basics">BaZi Basics</Link> teaches you to read what it means.
          </p>
        </section>
      )}
    </div>
  );
}
