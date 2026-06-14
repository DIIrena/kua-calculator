import Link from "next/link";

// Site footer: the deep-ink counterweight, centred. Carries the brand
// mark, the calm trust line that links to /about, the secondary public
// navigation (Life areas, Articles, Methodology, Refunds, Privacy), the
// free-tool one-liner, the framing reminder, and the company and
// copyright block.
//
// Server Component. No client JS, no analytics import.
export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-ornament" aria-hidden="true">
        <svg
          viewBox="0 0 709 709"
          xmlns="http://www.w3.org/2000/svg"
          focusable="false"
          aria-hidden="true"
        >
          <g
            transform="translate(0,709) scale(0.1,-0.1)"
            fill="currentColor"
            stroke="none"
          >
            <path d="M2099 6066 c-360 -52 -679 -212 -929 -466 -423 -429 -566 -1046 -376 -1615 47 -140 104 -256 188 -381 62 -93 172 -206 1314 -1343 l1247 -1241 516 509 c284 280 852 846 1262 1258 794 797 793 795 890 993 439 885 -19 1938 -969 2230 -171 52 -259 64 -462 64 -151 0 -205 -4 -296 -22 -225 -45 -416 -124 -599 -247 -100 -68 -182 -146 -915 -874 l-805 -800 250 0 250 -1 690 683 c750 741 732 725 936 814 357 154 811 121 1138 -85 317 -199 517 -494 576 -852 25 -147 17 -368 -19 -503 -29 -111 -74 -221 -137 -335 -39 -70 -109 -143 -749 -785 -388 -390 -897 -897 -1131 -1128 l-426 -419 -1107 1102 c-616 612 -1126 1128 -1150 1162 -247 348 -286 836 -99 1234 115 243 323 454 571 577 387 191 853 168 1217 -60 l83 -52 126 126 125 126 -42 30 c-199 143 -418 239 -653 285 -140 28 -380 35 -515 16z" />
            <path d="M3904 4889 l-121 -121 321 -319 321 -318 250 -1 250 0 -440 440 c-242 242 -444 440 -450 440 -6 0 -65 -54 -131 -121z" />
            <path d="M3486 4326 c-57 -21 -88 -47 -116 -97 -51 -92 -18 -210 74 -264 92 -54 218 -22 270 68 32 56 40 97 27 145 -32 116 -152 186 -255 148z" />
            <path d="M2660 3330 l0 -470 885 0 885 0 0 470 0 470 -175 0 -175 0 0 -290 0 -290 -535 0 -535 0 0 290 0 290 -175 0 -175 0 0 -470z" />
          </g>
        </svg>
      </div>
      <p className="footer-tag">
        Architecture-led feng shui for real homes.{" "}
        <Link href="/about">Read who runs the site</Link>.
      </p>
      <nav className="footer-links" aria-label="Site sections">
        <Link href="/life">Life areas</Link>
        <Link href="/articles">Articles</Link>
        <Link href="/methodology">Methodology</Link>
        <Link href="/refunds">Refunds</Link>
        <Link href="/privacy">Privacy</Link>
      </nav>
      <p className="footer-tag">
        The Kua Calculator is a free tool from My Feng Shui Home.
      </p>
      <p className="footer-honest">
        The Kua system is a structured tool for design decisions. It is not a
        prediction.
      </p>
      <p className="footer-legal">
        MyFengShuiHome.com is operated by <strong>Mens Sana LLC</strong>.
        Powered by{" "}
        <a href="https://menssana.art" rel="noopener">
          menssana.art
        </a>
        .
      </p>
      <p className="footer-copyright">
        &copy; 2026 Mens Sana LLC. All rights reserved. All content on this
        site is protected by copyright.
      </p>
    </footer>
  );
}
