import type { Metadata } from "next";
import ProductLanding, { type LandingConfig } from "@/components/ProductLanding";

// Nine Life Areas Compass on the long-form landing template (B3).

export const metadata: Metadata = {
  title: "Nine Life Areas Compass | My Feng Shui Home",
  description:
    "All nine life-area corners of your home read for your Kua in one PDF: wealth, recognition, relationships, creativity, helpful people, career, knowledge, family, and the health centre. $29.",
  alternates: {
    canonical: "https://myfengshuihome.com/products/all-nine-pillars-compass",
  },
  openGraph: {
    type: "website",
    title: "Nine Life Areas Compass",
    description:
      "All nine bagua life-area corners read for your Kua, in one PDF. $29.",
    url: "https://myfengshuihome.com/products/all-nine-pillars-compass",
    images: [
      {
        url: "https://myfengshuihome.com/api/og/product/all-nine-pillars-compass",
        width: 1200,
        height: 630,
      },
    ],
  },
};

const CONFIG: LandingConfig = {
  slug: "all-nine-pillars-compass",
  title: "The Nine Life Areas Compass",
  eyebrow: "The bagua, read for you",
  headline: "Nine corners of your home, each with a job.",
  subhead:
    "The bagua splits a home into nine life areas, each in a fixed compass corner: wealth, recognition, relationships, creativity, helpful people, career, knowledge, family, and the health centre. This reading takes all nine at once and reads each corner against your Kua. One personalised PDF, emailed within about a minute.",
  heroPromise:
    "By the end you will know which corner of your home holds each of the nine life areas, and the one thing each corner is asking you to clear, light, or tend first.",
  priceLabel: "$29",
  priceCents: 2900,
  cover: "/products/all-nine-pillars-compass/cover-portrait.png",
  seoDescription:
    "A personalised feng shui reading of all nine bagua life areas, corner by corner, keyed to your Kua number.",
  promise: [
    "The money corner is the piece of feng shui everyone has heard of, usually as a single tip floating free of everything else. But the tradition never read one corner alone: the bagua is a map of nine, each with a fixed compass position and a domain, and they only make sense read together.",
    "The Nine Life Areas Compass reads all nine corners of your home against your Kua number. That crossing is the point: where a life area's fixed corner overlaps one of your supportive directions, the tradition treats that part of your home as doubly strong for you; where it overlaps a cautious one, it asks you to tend the corner more gently. Which corners are which depends entirely on your number.",
    "One chapter per area, one small move per area, and the usual honesty: what is tradition is labelled tradition, what has a design reason gets the reason, and nothing promises an outcome.",
  ],
  steps: [
    {
      title: "Pay once",
      body: "$29, one-time. No subscription.",
    },
    {
      title: "Fill in three fields",
      body: "First name, birth date, gender. Your Kua is computed server-side.",
    },
    {
      title: "Your book arrives",
      body: "Within about a minute the personalised PDF is generated and emailed to you, your name on the cover.",
    },
  ],
  inside: [
    "One chapter for each of the nine life areas, read for your Kua number and your East or West group.",
    "For every area: the fixed compass corner it sits in, what the tradition associates with it, and how to find and tend yours.",
    "The crossing that matters: each corner checked against your own eight directions, so you know where your home is naturally strong for you.",
    "One small move per area: concrete, reversible, testable.",
  ],
  forWho: [
    "You keep meeting single-corner tips and want the whole map instead.",
    "You want to know which corners of your home are doubly strong for your profile.",
    "You want the nine single-area readings without buying nine books.",
  ],
  notForWho: [
    "You also want the twelve rooms, compatibility, and the 2026 year: the Complete Home Compass contains this entire book and the rest.",
    "You want a prediction about wealth or relationships. It reads corners of a home; it promises nothing about life.",
    "You only care about one area: a single-area Compass still exists at its own address.",
  ],
  faq: [
    {
      q: "Is this included in the Complete Home Compass?",
      a: "Yes, in full. The Complete Home Compass ($49) contains all nine life-area chapters plus the twelve rooms, the eight directions, compatibility, and the 2026 overlay. Buy this one when the life areas are what you need.",
    },
    {
      q: "How can a life area be personalised if the corners are fixed?",
      a: "The corners are fixed; you are not. The reading crosses each fixed corner with your own eight directions, and that crossing changes with your Kua number: your wealth corner might sit in one of your supportive directions, your neighbour's in a cautious one. Same map, different reading.",
    },
    {
      q: "Is this the same as the money-corner advice everywhere online?",
      a: "It contains the south-east wealth corner, read properly, alongside the other eight. The difference is the method: fixed corner crossed with your directions, tradition labelled as tradition, and no promise that a plant makes you rich.",
    },
    {
      q: "Do I need to know feng shui first?",
      a: "No. The welcome chapter sets up your profile and the bagua map, and each area chapter explains what it needs as it goes.",
    },
    {
      q: "What format does it arrive in?",
      a: "A typeset PDF, emailed within about a minute of the short form. It prints cleanly at home.",
    },
  ],
  buyLine:
    "Secure checkout. After paying you fill in three fields and the personalised PDF is generated and emailed to you within about a minute.",
  finalNote:
    "A personalised PDF, one chapter per life area, yours to keep. One-time, no subscription.",
};

type SearchParams = Promise<{ waitlist?: string }>;

export default async function AllNinePillarsCompassPage(props: {
  searchParams: SearchParams;
}) {
  const { waitlist } = await props.searchParams;
  const status =
    waitlist === "sent" || waitlist === "invalid" || waitlist === "error"
      ? (waitlist as "sent" | "invalid" | "error")
      : null;

  return <ProductLanding config={CONFIG} waitlistStatus={status} />;
}
