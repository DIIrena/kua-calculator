import type { Metadata } from "next";
import ProductLanding, { type LandingConfig } from "@/components/ProductLanding";

// Twelve Spaces Compass on the long-form landing template (B2). The
// middle rung of the ladder: every room read for one person's Kua.

export const metadata: Metadata = {
  title: "Twelve Spaces Compass | My Feng Shui Home",
  description:
    "Every room of your home read for your Kua in one PDF: bedroom, office, dining, kitchen, living room, bathroom, entrance, hallway, storage, laundry, balcony, garage. $29.",
  alternates: {
    canonical: "https://myfengshuihome.com/products/all-twelve-spaces-compass",
  },
  openGraph: {
    type: "website",
    title: "Twelve Spaces Compass",
    description: "Every room of your home read for your Kua, in one PDF. $29.",
    url: "https://myfengshuihome.com/products/all-twelve-spaces-compass",
    images: [
      {
        url: "https://myfengshuihome.com/api/og/product/all-twelve-spaces-compass",
        width: 1200,
        height: 630,
      },
    ],
  },
};

const CONFIG: LandingConfig = {
  slug: "all-twelve-spaces-compass",
  title: "The Twelve Spaces Compass",
  eyebrow: "The middle depth",
  headline: "Walk your whole home with one book in hand.",
  subhead:
    "Twelve rooms, read one at a time for your Kua: bedroom, office, dining, kitchen, living room, bathroom, entrance, hallway, storage, laundry, balcony, garage. Each chapter gives the traditional placements for that room keyed to your number. One personalised PDF, emailed within about a minute.",
  priceLabel: "$29",
  priceCents: 2900,
  cover: "/products/all-twelve-spaces-compass/cover-portrait.png",
  seoDescription:
    "A personalised feng shui reading of all twelve rooms of the home, chapter by chapter, keyed to your Kua number.",
  promise: [
    "Room advice is where feng shui gets practical, and where it usually falls apart: the bedroom tip from one site quietly contradicts the kitchen rule from another, and neither knows anything about you. A room reading without your directions is half a reading.",
    "The Twelve Spaces Compass reads every room against your Kua number, one chapter per room, so the same thread runs from the bedroom to the garage: which supportive directions each room should use for your profile, which cautious ones to keep for other jobs, and the command position where it applies. Where the reasoning is design evidence rather than tradition, the chapter says so.",
    "It is the twelve single-room readings together in one coherent volume, at a bundle price: walk the home once over a weekend, book in hand, one small move per room.",
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
    "One chapter for each of the twelve rooms, read for your Kua number and your East or West group.",
    "For every room: which supportive directions to use, which cautious ones to keep for other jobs, and the command position where it applies.",
    "One small move per room: concrete, reversible, testable.",
    "A whole-home walkthrough you can follow room by room over a weekend.",
  ],
  forWho: [
    "You want the whole home settled, room by room, in one pass.",
    "You know your directions (or will in ten seconds, free) and want them applied where you live.",
    "You want the twelve single-room readings without buying twelve books.",
  ],
  notForWho: [
    "You also want the nine life areas, compatibility, and the 2026 year: the Complete Home Compass contains this entire book and the rest.",
    "You want a prediction. It reads your direction profile; it promises no outcomes.",
    "You want floor-plan-specific consulting. It reads your directions per room, not your blueprints.",
  ],
  faq: [
    {
      q: "Is this included in the Complete Home Compass?",
      a: "Yes, in full. The Complete Home Compass ($49) contains all twelve room chapters plus the nine life areas, the eight direction chapters, compatibility, and the 2026 overlay. Buy this one when the rooms are what you need; buy the flagship when you want everything.",
    },
    {
      q: "How is each room personalised?",
      a: "Every chapter is keyed to your Kua number: which wall the tradition gives your bed, which way your desk faces, which corners suit storage for your profile. Two readers with different numbers get different placements in the same rooms.",
    },
    {
      q: "My home does not have all twelve spaces.",
      a: "Almost nobody's does. The chapters are self-contained, so you read the rooms you have and keep the rest for the next home. A balcony chapter you do not need today costs you nothing.",
    },
    {
      q: "Do I need to know feng shui first?",
      a: "No. The welcome chapter sets up your profile and the handful of terms, and each room chapter explains what it needs as it goes.",
    },
    {
      q: "What format does it arrive in?",
      a: "A typeset PDF, emailed within about a minute of the short form. It prints cleanly at home if you prefer paper for the walkthrough.",
    },
  ],
  buyLine:
    "Secure checkout. After paying you fill in three fields and the personalised PDF is generated and emailed to you within about a minute.",
  finalNote:
    "A personalised PDF, one chapter per room, yours to keep. One-time, no subscription.",
  ladder: "twelve",
};

type SearchParams = Promise<{ waitlist?: string }>;

export default async function AllTwelveSpacesCompassPage(props: {
  searchParams: SearchParams;
}) {
  const { waitlist } = await props.searchParams;
  const status =
    waitlist === "sent" || waitlist === "invalid" || waitlist === "error"
      ? (waitlist as "sent" | "invalid" | "error")
      : null;

  return <ProductLanding config={CONFIG} waitlistStatus={status} />;
}
