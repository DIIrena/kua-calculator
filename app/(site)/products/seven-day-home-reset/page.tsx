import type { Metadata } from "next";
import ProductLanding, { type LandingConfig } from "@/components/ProductLanding";

// 7-Day Home Reset on the long-form landing template (B3). The course:
// one short email a day, one small task each.

export const metadata: Metadata = {
  title: "7-Day Home Reset | My Feng Shui Home",
  description:
    "A seven-day email course. One short email a day, one small task, nothing to buy or redecorate. Reset your home room by room. No outcome promises.",
  alternates: {
    canonical: "https://myfengshuihome.com/products/seven-day-home-reset",
  },
  openGraph: {
    type: "website",
    title: "7-Day Home Reset",
    description:
      "One short email a day for a week, one small task each, room by room. $19.",
    url: "https://myfengshuihome.com/products/seven-day-home-reset",
    images: [
      {
        url: "https://myfengshuihome.com/api/og/product/seven-day-home-reset",
        width: 1200,
        height: 630,
      },
    ],
  },
};

const CONFIG: LandingConfig = {
  slug: "seven-day-home-reset",
  title: "The 7-Day Home Reset",
  eyebrow: "The guided week",
  headline: "One small task a day. A calmer home by Sunday.",
  subhead:
    "A seven-day email course: one short email each morning, one small task each day, each doable in ten to twenty minutes with things you already own. No shopping, no redecorating, no app, nothing to log in to.",
  priceLabel: "$19",
  priceCents: 1900,
  cover: "/products/seven-day-home-reset/cover-portrait.png",
  seoDescription:
    "A seven-day feng shui email course: one small task per day, room by room, with nothing to buy and no outcome promises.",
  promise: [
    "Most of what helps a home is small and quiet, and most of us never get to it because it never becomes a plan. The list of little fixes lives in the back of your head, gets longer, and turns into dread. A free weekend never rescues it.",
    "The 7-Day Home Reset is the plan. For seven days you get one short email a day, each with a single small task in a deliberate order: a slow look around, the front door, light and air, the bedroom, the desk, the kitchen, the clutter that has stopped moving, and a final day on keeping the one change that helped most.",
    "The voice is calm and practical throughout: a way to read and adjust your rooms, not a fortune. Do the task, or skip it; the next email comes either way, and the series simply ends after day seven.",
  ],
  steps: [
    {
      title: "Pay once",
      body: "$19, one-time. No subscription, no recurring fee.",
    },
    {
      title: "The welcome email arrives",
      body: "Right away, so you know the shape of the week. Day one lands the next morning.",
    },
    {
      title: "One task a day, seven days",
      body: "Ten to twenty minutes each, with things you already own. Then it ends; nothing keeps sending.",
    },
  ],
  inside: [
    "A welcome email the moment you join, then one email a day for seven days.",
    "One small task per day, each doable in ten to twenty minutes with things you already own.",
    "The week in order: a slow look around, the front door, light and air, the bedroom, the desk, the kitchen, clutter and flow, and keeping what helped.",
    "One-click unsubscribe on every email; the series stops the moment you use it.",
  ],
  forWho: [
    "You want a calmer home but the big overhaul never happens.",
    "You would rather be handed one doable thing a day than a long list to dread.",
    "You like gentle structure that fits an ordinary working week.",
  ],
  notForWho: [
    "You want a personalised reading of your directions: that is what the Compasses are for (and this course pairs well after one).",
    "You want a decluttering bootcamp or a renovation plan. The tasks are small on purpose.",
    "You expect promised outcomes. The course adjusts rooms; it makes no predictions.",
  ],
  faq: [
    {
      q: "Is this personalised to my Kua?",
      a: "No, and honestly: it does not need to be. The seven tasks are the moves that help almost any home: light, air, the door, the bed, the desk, the kitchen, the clutter. If you want your directions read, the Personal Compass does that; the two pair well.",
    },
    {
      q: "What if I miss a day?",
      a: "Nothing bad happens. The emails stay in your inbox, the tasks have no deadline, and the order still works a day or a week later. It is a calm week, not a challenge.",
    },
    {
      q: "Is it really not a subscription?",
      a: "Really. One payment, eight emails total (welcome plus seven days), then it ends. Every email carries a one-click unsubscribe that stops the series instantly.",
    },
    {
      q: "Do I need to buy anything for the tasks?",
      a: "No. Every task uses what you already own. The course never asks you to shop, and there are no product links inside the emails.",
    },
    {
      q: "When does day one arrive?",
      a: "The welcome email arrives right away; day one lands the next morning, and the rest follow daily. Starting on any weekday works.",
    },
  ],
  buyLine:
    "Secure checkout. The welcome email arrives right away and day one lands the next morning.",
  finalNote:
    "Eight emails in total, then it ends. One-time, no subscription.",
};

type SearchParams = Promise<{ waitlist?: string }>;

export default async function SevenDayHomeResetPage(props: {
  searchParams: SearchParams;
}) {
  const { waitlist } = await props.searchParams;
  const status =
    waitlist === "sent" || waitlist === "invalid" || waitlist === "error"
      ? (waitlist as "sent" | "invalid" | "error")
      : null;

  return <ProductLanding config={CONFIG} waitlistStatus={status} />;
}
