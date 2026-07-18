import Link from "next/link";

type Topic = { slug: string; label: string };

// The Guide primary-nav item. The "Guide" label is a real link to the
// full library at /guide; on hover (or keyboard focus) a panel of the
// eleven topics drops down. Pure CSS (no JS): the panel shows on
// .nav-dropdown:hover / :focus-within and closes when the pointer or
// focus leaves. On mobile the panel is hidden and "Guide" simply links
// to /guide (topics live in the page's left rail).
export default function GuideNavDropdown({ topics }: { topics: Topic[] }) {
  return (
    <div className="nav-dropdown">
      <Link
        href="/guide"
        className="nav-dropdown-summary nav-dropdown-summary-feature"
      >
        Guide
        <span className="nav-dropdown-caret" aria-hidden="true">
          &#9662;
        </span>
      </Link>
      <div className="nav-dropdown-panel" role="menu">
        {topics.map((t) => (
          <Link
            key={t.slug}
            href={`/guide?view=${t.slug}`}
            role="menuitem"
            className="nav-dropdown-link"
          >
            {t.label}
          </Link>
        ))}
        <Link
          href="/good-days"
          role="menuitem"
          className="nav-dropdown-link nav-dropdown-see-all"
        >
          Good days in 2026 and 2027 (free)
        </Link>
        <Link
          href="/guide"
          role="menuitem"
          className="nav-dropdown-link nav-dropdown-see-all"
        >
          All of the guide &rarr;
        </Link>
      </div>
    </div>
  );
}
