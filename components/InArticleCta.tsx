import Link from "next/link";
import type { Article } from "@/lib/articles";

// Soft conversion-CTA placed at the foot of every article body, before
// the related-articles widget. Default is "run the Kua calculator".
// Each article can override via the `cta` field in lib/articles.ts.

const DEFAULT_CTA = {
  label: "Find my Kua number",
  href: "/kua-calculator",
  rationale:
    "If you've read this far, the next ten seconds give you your personal Kua number and your four favourable directions. Free, no account needed.",
};

export default function InArticleCta({ article }: { article: Article }) {
  const cta = article.cta ?? DEFAULT_CTA;
  return (
    <aside className="in-article-cta" aria-label="What to do next">
      {cta.rationale ? (
        <p className="in-article-cta-text">{cta.rationale}</p>
      ) : null}
      <p className="in-article-cta-actions">
        <Link href={cta.href} className="cta-primary">
          {cta.label}
        </Link>
      </p>
    </aside>
  );
}
