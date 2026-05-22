import type { Metadata } from "next";

// Minimal layout for the embeddable widget: no SiteHeader, no SiteFooter.
// This route is meant to be iframed by arbitrary parent sites and is kept
// free of Supabase and accounts - a clean, dependency-light widget.
// next.config.ts sets Content-Security-Policy: frame-ancestors * for /embed.
export const metadata: Metadata = {
  robots: { index: false, follow: true },
};

export default function EmbedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <main id="main">{children}</main>;
}
