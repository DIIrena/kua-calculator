import type { Metadata } from "next";
import Link from "next/link";
import { auth } from "@/auth";
import BaziCalculatorForm from "@/components/BaziCalculatorForm";

export const metadata: Metadata = {
  title: "Free BaZi Calculator (Four Pillars) | My Feng Shui Home",
  description:
    "A free BaZi calculator and Four Pillars calculator: get your Day Master, your four pillars, your five-element balance, and your Ten Gods in seconds. No sign-up to try.",
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
          Tell me when and where you were born, and I will show you your chart: the eight characters the
          tradition treats as a little portrait of how you are built. At the heart of it is your{" "}
          <strong>Day Master</strong> - the one character that is really you. It takes a few seconds, and it is free.
        </p>
      </section>

      <section className="product-section">
        <h2>Get your chart</h2>
        <BaziCalculatorForm signedIn={signedIn} />
      </section>

      <section className="product-section">
        <h2>What you will see</h2>
        <ul>
          <li>Your <strong>Day Master</strong>, and a friendly line on what a person like you tends to be.</li>
          <li>Your full <strong>four pillars</strong>, colour-coded, with the Day Master marked.</li>
          <li>Your <strong>five-element balance</strong> - where you run strong, and where you run quiet.</li>
          <li>Your <strong>Ten Gods</strong>, and the pattern your chart leans toward.</li>
        </ul>
        <p>
          Want to learn to read the whole thing yourself, kindly and in plain words?{" "}
          <Link href="/products/bazi-basics">BaZi Basics</Link> is the friendly guide that teaches you how.
        </p>
      </section>
    </div>
  );
}
