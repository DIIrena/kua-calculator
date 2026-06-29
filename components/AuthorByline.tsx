// Small reusable byline rendered at the foot of every article and
// every guide page. Server Component. No client JS, no analytics
// import, no event handlers.
//
// The public author is shown as the initials "I.D." No full name, no
// location.

export default function AuthorByline() {
  return (
    <p className="author-byline" aria-label="About the author">
      <span className="author-byline-name">
        Written by I.D., the architect behind My Feng Shui Home
      </span>
    </p>
  );
}
