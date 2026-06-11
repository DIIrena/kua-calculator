import Link from "next/link";

// Small reusable byline rendered at the foot of every article and
// every guide page. Server Component. No client JS, no analytics
// import, no event handlers.
//
// Brand-as-author: the public author is "My Feng Shui Home". No
// personal name is claimed. The role line names the credential
// (licensed M.Sc.Arch. architect) that backs the writing on this
// site without naming a person.
//
// If the owner later chooses to publish a real name, the visible
// brand-author span here AND every reference on /about AND the
// Organization JSON-LD must be updated together.

export default function AuthorByline() {
  return (
    <p className="author-byline" aria-label="About the author">
      <span className="author-byline-name">
        Written by the architect behind My Feng Shui Home
      </span>
      <span className="author-byline-sep" aria-hidden="true">
        &middot;
      </span>
      <span className="author-byline-role">
        Licensed M.Sc.Arch. architect
      </span>
      <Link href="/about" className="author-byline-link">
        About the author
      </Link>
    </p>
  );
}
