import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import VercelAnalytics from "@/components/VercelAnalytics";

// Layout for the main site: adds the SiteHeader, the <main> landmark, and
// the SiteFooter. The /embed route lives outside this group, so it renders
// without any chrome.
//
// VercelAnalytics is mounted here. The wrapper self-excludes
// /kua-calculator, /embed, /account, /sign-in, and /privacy so those
// surfaces stay free of any third-party JS (see VercelAnalytics).
// Custom funnel events are intentionally deferred: lib/analytics.ts is a
// no-op until a paid Plausible or Vercel Pro plan justifies turning
// events back on.
export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <SiteHeader />
      <main id="main">{children}</main>
      <SiteFooter />
      <VercelAnalytics />
    </>
  );
}
