"use client";

import Script from "next/script";
import { usePathname } from "next/navigation";

// Plausible Analytics loader. Mounted once in the (site) layout. Three
// hard constraints:
//
//   1. No-op when NEXT_PUBLIC_PLAUSIBLE_DOMAIN is not set. Local dev and
//      previews stay tracker-free unless explicitly opted in.
//   2. The script never loads on /kua-calculator or /embed. Those
//      surfaces must stay free of any third-party JS so the calculator
//      can be embedded by other sites and so the calculator core has
//      no privacy surface.
//   3. Cookie-free script. No consent banner needed.

const EXCLUDED_PREFIXES = ["/kua-calculator", "/embed"];

export default function PlausibleScript() {
  const pathname = usePathname() ?? "/";
  const domain = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN;

  if (!domain) return null;
  if (EXCLUDED_PREFIXES.some((p) => pathname === p || pathname.startsWith(`${p}/`))) {
    return null;
  }

  return (
    <Script
      defer
      data-domain={domain}
      src="https://plausible.io/js/script.js"
      strategy="afterInteractive"
    />
  );
}
