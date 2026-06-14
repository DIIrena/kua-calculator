import Link from "next/link";

// Small reusable byline rendered at the foot of every article and
// every guide page. Server Component. No client JS, no analytics
// import, no event handlers.
//
// The public author is shown as the initials "I.D." No full name, no
// location. The credential (M.Sc.Arch.) appears on /about only;
// this byline deliberately does not repeat it.
//
// If the public author name ever changes, the visible span here AND
// every reference on /about AND the Person and Organization JSON-LD
// must be updated together.

export default function AuthorByline() {
  return (
    <p className="author-byline" aria-label="About the author">
      <span className="author-byline-name">
        Written by I.D., the architect behind My Feng Shui Home
      </span>
      <span className="author-byline-sep" aria-hidden="true">
        &middot;
      </span>
      <Link href="/about" className="author-byline-link">
        About the author
      </Link>
    </p>
  );
}
