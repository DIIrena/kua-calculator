// Generate the product page files for the downstream Compass catalogue.
// Idempotent: overwrites each page from the template, so re-running after a
// template tweak is safe. Pages are text-only (waitlist) and follow the
// established product-page structure.
//
// Usage: node scripts/gen-compass-pages.mjs

import { writeFileSync, mkdirSync } from "node:fs";

const ROOT =
  "c:/Users/User/Documents/IRENA/AI AUTOMATION/my-claude-workspace/projects/kua-calculator/app/(site)/products";

// Mirror of lib/compass-catalogue.ts (slug, topicLabel, priceCents, oneLiner).
const CATALOGUE = [
  ["bedroom-compass", "Bedroom", 700, "Your bedroom read for your Kua: the headboard wall in an ordinary season and a season of push, and the corners to keep for storage."],
  ["office-compass", "Office", 700, "Your desk and work seat read for your Kua: which direction to face for ambitious work, which for steady focus, and the command position."],
  ["dining-room-compass", "Dining Room", 700, "Your table read for your Kua: where the head of the household sits, the seat for connection, and the seat with momentum."],
  ["kitchen-compass", "Kitchen", 700, "Your kitchen read for your Kua: the stove, the cook's position, and the supportive direction to face while you work."],
  ["living-room-compass", "Living Room", 700, "Your living room read for your Kua: the main seat in command position, the conversation circle, and the corner to keep clear."],
  ["bathroom-compass", "Bathroom", 700, "Your bathroom read for your Kua: why a draining room suits a cautious direction, and how to keep it dry, closed, and in order."],
  ["entrance-compass", "Entrance", 700, "Your front door and entrance read for your Kua: the approach, the threshold, and the first few steps in."],
  ["hallway-compass", "Hallway", 700, "Your hallways read for your Kua: keeping pass-through space clear, lit, and unpinched, and slowing a long straight run."],
  ["storage-compass", "Storage", 700, "Your storage and closets read for your Kua: giving the cautious directions a quiet, contained job so the good walls stay free."],
  ["laundry-compass", "Laundry", 700, "Your laundry read for your Kua: why utility space suits a cautious direction, kept dry, tidy, and in working order."],
  ["balcony-compass", "Balcony", 700, "Your balcony or terrace read for your Kua: the home's breathing edge, a calm sitting corner, light, air, and a little green."],
  ["garage-compass", "Garage", 700, "Your garage or utility space read for your Kua: a heavy room suited to a cautious direction, kept ordered with a clean threshold."],
  ["wealth-compass", "Wealth", 700, "Your wealth corner (the Southeast) read for your Kua: what the tradition gives this sector and how to find and tend yours."],
  ["recognition-compass", "Recognition", 700, "Your recognition corner (the South) read for your Kua: the sector the tradition ties to reputation, kept bright and clear."],
  ["relationship-compass", "Relationship", 700, "Your relationship corner (the Southwest) read for your Kua: the sector the tradition ties to partnership, and how to tend it."],
  ["creativity-compass", "Creativity", 700, "Your creativity corner (the West) read for your Kua: the sector the tradition ties to projects, children, and play."],
  ["helpful-people-compass", "Helpful People", 700, "Your helpful-people corner (the Northwest) read for your Kua: the sector the tradition ties to mentors, support, and travel."],
  ["career-compass", "Career", 700, "Your career corner (the North) read for your Kua: the sector the tradition ties to your path and work, kept clear and moving."],
  ["knowledge-compass", "Knowledge", 700, "Your knowledge corner (the Northeast) read for your Kua: the sector the tradition ties to study, stillness, and self-knowledge."],
  ["family-compass", "Family", 700, "Your family corner (the East) read for your Kua: the sector the tradition ties to roots, household, and new growth."],
  ["health-compass", "Health", 700, "Your health centre (the middle of the home) read for your Kua: the heart that touches every area, kept open and clear."],
  ["year-ahead-compass", "Year Ahead", 900, "The 2026 solar year read against your Kua: how the year's cautious and supportive corners fall on your own directions."],
];

function componentName(slug) {
  return (
    slug
      .split("-")
      .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
      .join("") + "Page"
  );
}

function page({ slug, label, priceCents, oneLiner }) {
  const title = `${label} Compass`;
  const priceLabel = `$${priceCents / 100}`;
  const comp = componentName(slug);
  return `import type { Metadata } from "next";
import Link from "next/link";
import BuyButton from "@/components/BuyButton";

export const metadata: Metadata = {
  title: "${title} | My Feng Shui Home",
  description:
    "${oneLiner} A short personalised PDF, ${priceLabel}.",
  alternates: {
    canonical: "https://myfengshuihome.com/products/${slug}",
  },
  openGraph: {
    type: "website",
    title: "${title}",
    description: "${oneLiner}",
    url: "https://myfengshuihome.com/products/${slug}",
  },
};

type SearchParams = Promise<{ waitlist?: string }>;

export default async function ${comp}(props: {
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
          The <em>${title}</em>.
        </h1>
        <p className="product-lede">${oneLiner}</p>
        <p className="product-hero-launch-state">
          Available now. After you pay, you fill in a short form and the
          personalised PDF is generated and emailed to you within about a
          minute.
        </p>
        <p className="product-hero-anchor">
          <a href="#waitlist">Skip to checkout →</a>
        </p>
      </section>

      <section className="product-section">
        <h2>What is inside</h2>
        <ul>
          <li>
            A short reading keyed to your Kua number and your East or West
            group.
          </li>
          <li>
            The traditional placements for this part of your home: the
            supportive directions to use, and the cautious ones to keep for
            other jobs.
          </li>
          <li>One small move to try, with a seven-day way to test it.</li>
          <li>
            A few typeset pages, in our brand, with your name on the cover.
          </li>
        </ul>
      </section>

      <section className="product-section">
        <h2>How it works</h2>
        <ol>
          <li>You pay once. ${priceLabel}, no subscription.</li>
          <li>
            You fill in three fields: first name, birth date, gender. We
            compute your Kua server-side, applying the Chinese New Year
            cutoff if you were born in January or early February.
          </li>
          <li>
            Within about a minute, the PDF is generated and emailed to you
            with a download link.
          </li>
        </ol>
      </section>

      <section className="product-section">
        <h2>What it is not</h2>
        <p>
          It reads your direction profile, the eight directions that follow
          from your Kua, not your floor plan. It does not promise outcomes.
          It is a structured way to choose between arrangements that
          otherwise look equivalent, not a fortune.
        </p>
      </section>

      <section className="product-buy-section">
        <h2>Buy now.</h2>
        <p>
          Secure checkout. 7-day refund. You fill in a
          short form after paying and the PDF is emailed to you.
        </p>
        <BuyButton
          productSlug="${slug}"
          priceLabel="${priceLabel}"
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
`;
}

let n = 0;
for (const [slug, label, priceCents, oneLiner] of CATALOGUE) {
  const dir = `${ROOT}/${slug}`;
  mkdirSync(dir, { recursive: true });
  writeFileSync(`${dir}/page.tsx`, page({ slug, label, priceCents, oneLiner }));
  n++;
  console.log(`generated ${slug}/page.tsx`);
}
console.log(`\n${n} pages generated.`);
