"use client";

import { useRef } from "react";
import Link from "next/link";

type Topic = { slug: string; label: string };

// The Guide primary-nav dropdown. A native <details> so it works with no
// JS (keyboard + touch toggle), enhanced on hover-capable devices so it
// opens on mouse-enter and closes on mouse-leave (the panel should
// disappear when the pointer moves away from the Guide item). Focus-out
// also closes it so keyboard users are not left with a stuck-open panel.
export default function GuideNavDropdown({ topics }: { topics: Topic[] }) {
  const ref = useRef<HTMLDetailsElement>(null);

  const openOnHover = () => {
    const el = ref.current;
    if (el && window.matchMedia("(hover: hover)").matches) el.open = true;
  };
  const close = () => {
    if (ref.current) ref.current.open = false;
  };

  return (
    <details
      ref={ref}
      className="nav-dropdown"
      onMouseEnter={openOnHover}
      onMouseLeave={close}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) close();
      }}
    >
      <summary className="nav-dropdown-summary nav-dropdown-summary-feature">
        Guide
        <span className="nav-dropdown-caret" aria-hidden="true">
          &#9662;
        </span>
      </summary>
      <div className="nav-dropdown-panel" role="menu">
        {topics.map((t) => (
          <Link
            key={t.slug}
            href={`/guide?view=${t.slug}`}
            role="menuitem"
            className="nav-dropdown-link"
            onClick={close}
          >
            {t.label}
          </Link>
        ))}
        <Link
          href="/guide"
          role="menuitem"
          className="nav-dropdown-link nav-dropdown-see-all"
          onClick={close}
        >
          All of the guide &rarr;
        </Link>
      </div>
    </details>
  );
}
