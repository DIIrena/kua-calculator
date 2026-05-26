import type { Metadata } from "next";
import Link from "next/link";
import { SPACES } from "@/lib/spaces";
import { articlesForSpace } from "@/lib/articles";

export const metadata: Metadata = {
  title: "Feng shui by room | My Feng Shui Home",
  description:
    "Browse feng shui guidance room by room. Bedroom, kitchen, living room, dining room, bathroom, terrace. Six rooms, free reading.",
  alternates: { canonical: "https://myfengshuihome.com/space" },
  openGraph: {
    type: "website",
    title: "Feng shui by room",
    description:
      "Bedroom, kitchen, living room, dining room, bathroom, terrace. Six rooms, free reading.",
    url: "https://myfengshuihome.com/space",
  },
};

export default function SpaceIndexPage() {
  return (
    <div className="page-content life-index">
      <p className="eyebrow">By room</p>
      <h1 className="life-index-heading">
        Which room do you want to start with?
      </h1>
      <p className="life-index-lede">
        Six rooms, the ones that carry the most weight in a home. Each page
        has <strong>three moves you can make tonight</strong> for free, plus
        every article on the site relevant to that room.
      </p>

      <ul className="life-grid">
        {SPACES.map((space) => {
          const articleCount = articlesForSpace(space.slug).length;
          return (
            <li key={space.slug}>
              <Link href={`/space/${space.slug}`} className="life-card">
                <p className="life-card-eyebrow">Room</p>
                <h2 className="life-card-title">{space.label}</h2>
                <p className="life-card-tagline">{space.tagline}</p>
                <p className="life-card-meta">
                  {articleCount}{" "}
                  {articleCount === 1 ? "article" : "articles"} &rarr;
                </p>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
