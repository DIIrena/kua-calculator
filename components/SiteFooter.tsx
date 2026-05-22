import Link from "next/link";

// Site footer: the deep-ink counterweight, with the bamboo ornament.
export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-ornament" aria-hidden="true">
        <svg
          viewBox="0 0 120 170"
          xmlns="http://www.w3.org/2000/svg"
          focusable="false"
        >
          <path
            d="M61 168 C57 132 64 100 60 64 C57 38 63 20 60 6"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.4"
            strokeLinecap="round"
          />
          <g fill="currentColor">
            <path d="M60 120 C41 119 27 125 15 139 C33 135 49 129 60 120 Z" />
            <path d="M61 120 C80 117 95 121 108 133 C89 132 73 128 61 120 Z" />
            <path d="M60 82 C43 81 31 87 21 99 C37 95 51 90 60 82 Z" />
            <path d="M61 82 C78 79 91 83 102 94 C85 93 71 89 61 82 Z" />
            <path d="M60 46 C46 45 36 50 28 60 C41 57 53 53 60 46 Z" />
            <path d="M61 46 C75 43 86 47 95 56 C81 56 69 52 61 46 Z" />
          </g>
        </svg>
      </div>
      <p className="footer-tag">
        The Kua Calculator is a free tool from My Feng Shui Home.{" "}
        <Link href="/privacy">Privacy</Link>
      </p>
      <p className="footer-honest">
        The Kua system is a structured tool for design decisions. It is not a
        prediction.
      </p>
    </footer>
  );
}
