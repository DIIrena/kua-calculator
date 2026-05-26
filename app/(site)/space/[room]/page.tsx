import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SPACES, findSpace, type Space } from "@/lib/spaces";
import { articlesForSpace, CATEGORIES } from "@/lib/articles";

type Params = Promise<{ room: string }>;

export async function generateStaticParams() {
  return SPACES.map((s) => ({ room: s.slug }));
}

export async function generateMetadata(props: { params: Params }): Promise<Metadata> {
  const { room } = await props.params;
  const meta = findSpace(room);
  if (!meta) return { title: "Not found" };
  return {
    title: `Feng shui for the ${meta.label.toLowerCase()} | My Feng Shui Home`,
    description: meta.shortDescription,
    alternates: { canonical: `https://myfengshuihome.com/space/${room}` },
    openGraph: {
      type: "website",
      title: `Feng shui for the ${meta.label.toLowerCase()}`,
      description: meta.shortDescription,
      url: `https://myfengshuihome.com/space/${room}`,
    },
  };
}

export default async function SpaceRoomPage(props: { params: Params }) {
  const { room } = await props.params;
  const meta = findSpace(room);
  if (!meta) notFound();

  const articles = articlesForSpace(room as Space);

  return (
    <div className="life-area-page">
      {/* Hero */}
      <section className="life-area-hero">
        <div className="page-content">
          <p className="eyebrow">Feng shui · by room</p>
          <h1 className="life-area-heading">
            Feng shui for the <em>{meta.label.toLowerCase()}</em>.
          </h1>
          <p className="life-area-lede">{meta.longDescription}</p>
        </div>
      </section>

      {/* Three starter moves */}
      <section className="home-section home-section-paper life-area-starters">
        <div className="page-content">
          <h2>Three moves you can make tonight. Free.</h2>
          <p className="home-section-lede">
            None of these need a compass, a Kua number, new furniture, or
            money. Pick one. Do it before bed.
          </p>
          <ol className="life-area-starter-list">
            {meta.starters.map((s) => (
              <li key={s.title}>
                <h3>{s.title}</h3>
                <p>{s.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Articles tagged with this room */}
      <section
        className="home-section home-section-cream life-area-articles"
        aria-labelledby="space-articles-heading"
      >
        <div className="page-content">
          <h2 id="space-articles-heading">
            Read deeper. Every article on the {meta.label.toLowerCase()}.
          </h2>
          {articles.length === 0 ? (
            <p className="home-section-lede">
              We are still writing for this room. Until then, the{" "}
              <Link href="/articles" className="article-back-link">
                full article index
              </Link>{" "}
              has plenty to read.
            </p>
          ) : (
            <ul className="articles-list">
              {articles.map((a) => (
                <li key={a.slug} className="article-list-item">
                  <Link
                    href={`/articles/${a.slug}`}
                    className="article-list-link"
                  >
                    <p className="article-list-category">
                      {CATEGORIES[a.category].title}
                    </p>
                    <h3 className="article-list-title">{a.title}</h3>
                    <p className="article-list-teaser">{a.teaser}</p>
                    <p className="article-list-meta">
                      {a.readingTime}
                      {a.gated ? (
                        <>
                          {" · "}
                          <span className="article-gated-pill">
                            Free account
                          </span>
                        </>
                      ) : null}
                    </p>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>

      {/* Funnel to the paid Home Harmony Map */}
      <section
        className="home-section home-section-paper life-area-map-cta"
        aria-labelledby="map-cta-heading"
      >
        <div className="page-content">
          <div className="life-area-map-cta-inner">
            <div>
              <p className="eyebrow">For the full personalised version</p>
              <h2 id="map-cta-heading">
                Get the {meta.label.toLowerCase()} keyed to <em>your</em> home.
              </h2>
              <p className="home-section-lede">{meta.mapPitch}</p>
            </div>
            <div className="life-area-map-cta-card">
              <p className="map-page-price-eyebrow">The Home Harmony Map</p>
              <p className="map-page-price-amount">$29</p>
              <p className="map-page-price-suffix">
                one-time, personalised
              </p>
              <Link href="/home-harmony-map" className="cta-primary">
                See the Map
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Back link */}
      <section className="home-section home-section-cream life-area-back-section">
        <div className="page-content">
          <p>
            <Link href="/space" className="article-back-link">
              &larr; All six rooms
            </Link>
          </p>
        </div>
      </section>
    </div>
  );
}
