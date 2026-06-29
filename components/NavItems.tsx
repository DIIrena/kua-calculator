import Link from "next/link";
import SignOutButton from "@/components/SignOutButton";
import GuideNavDropdown from "@/components/GuideNavDropdown";
import CartButton from "@/components/CartButton";
import { GUIDE_CLUSTERS } from "@/lib/guide";

// Shared primary-nav item list. Used by both the desktop nav surface
// and the mobile <details> hamburger surface in SiteHeader so the two
// surfaces never drift out of sync.
//
// Server Component only. No client JS, no analytics import.
//
// Primary nav (both surfaces): Guide / Shop / Account or Sign in / Cart.
//   - The Guide is the umbrella: its dropdown lists the eleven guide
//     topics (the same eleven clusters the /guide library uses), so
//     Rooms now lives inside the Guide rather than as its own item.
//   - The free Kua calculator is NOT in the primary nav. It is the
//     homepage, and it is also listed in the Shop as a free item.
//
// Items kept reachable via the footer: Life areas, Articles, Methodology,
// Refunds, Privacy.

// The eleven guide topics, in reading order. Source of truth is
// GUIDE_CLUSTERS in lib/guide.ts; the /guide library uses the same set.
const guideTopics = [...GUIDE_CLUSTERS].sort((a, b) => a.order - b.order);

export default function NavItems({
  signedIn,
}: {
  signedIn: boolean;
}) {
  return (
    <>
      {/* 1. Guide - the full library. The dropdown lists the eleven
          topics; Rooms is one of them. Opens on hover and closes when the
          pointer leaves (or focus moves out). */}
      <GuideNavDropdown
        topics={guideTopics.map((c) => ({ slug: c.slug, label: c.label }))}
      />

      {/* 2. Shop - the paid shop (and the free calculator lives here too) */}
      <Link href="/products" className="site-nav-link site-nav-link-feature">
        Shop
      </Link>

      {/* 3. Account or Sign in - visually quieter than the public actions
            above. SignOutButton renders next to Account when signed-in. */}
      {signedIn ? (
        <>
          <Link
            href="/account"
            className="site-nav-link site-nav-link-quiet"
          >
            Account
          </Link>
          <SignOutButton />
        </>
      ) : (
        <Link
          href="/sign-in"
          className="site-nav-link site-nav-link-quiet"
        >
          Sign in
        </Link>
      )}

      {/* 4. Cart - the shopping bag, with a live item count. */}
      <CartButton />
    </>
  );
}
