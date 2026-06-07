import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import PlausibleScript from "@/components/PlausibleScript";

// Layout for the main site: adds the SiteHeader, the <main> landmark, and
// the SiteFooter. The /embed route lives outside this group, so it renders
// without any chrome.
//
// PlausibleScript is mounted here, but it self-excludes /kua-calculator
// and /embed so those surfaces stay tracker-free (see PlausibleScript).
export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <PlausibleScript />
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <SiteHeader />
      <main id="main">{children}</main>
      <SiteFooter />
    </>
  );
}
