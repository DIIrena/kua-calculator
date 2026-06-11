# About + Author Credibility Plan

**Date:** 2026-06-11
**Status:** PLANNING ONLY. No implementation yet. No fabricated person.

---

## Why this spec exists

The site reads as careful and honest, but a first-time visitor has no
way to answer the question "who is teaching me this?". That gap costs
trust on every product page, especially the waitlist conversions on
the Annual Planner and the Personal Feng Shui Compass.

This spec describes what an `/about` page and supporting credibility
signals should contain once the real author identity, training, and
public history are decided. It does NOT invent any person, any
credential, any student count, any testimonial, any media mention.
The implementer must not ship any line of this until the owner has
provided the underlying facts.

---

## Hard rules

- No fabricated person.
- No fabricated credentials, schools, or lineages.
- No fabricated student counts, client counts, or revenue numbers.
- No fabricated quotes or testimonials.
- No fabricated press mentions.
- No outcome promises in the author voice (the rest of the site rule
  applies here too).
- No consultation language. The author is not for hire on this site.
- No em dashes. ASCII only in this spec file.

---

## Scope

In scope:

- A single `/about` page route at `app/(site)/about/page.tsx`.
- A small `AuthorByline` component reusable in article + guide footers.
- Trust microcopy in the site footer that links to `/about`.
- Structured data (Person + Organization JSON-LD) once the facts
  exist.

Out of scope:

- Inventing the author. The owner provides every fact in the
  questionnaire below.
- Press kit, media coverage, or any external link, until those exist.
- Photo, signature, or video, until the owner approves an asset.

---

## Page sections to plan

The `/about` page should answer five reader questions in order. Each
section below describes what the section is FOR; the implementer fills
copy only after the owner answers the questionnaire.

1. **Who runs the site.**
   - One short paragraph. Name, location, the calm one-liner about
     why this site exists. No biography theatre.

2. **Where the method comes from.**
   - The Compass School framing already on the methodology page,
     attributed in plain language to traditional Classical sources.
     Name the books, teachers, or training the owner actually used.
     No invented lineage.

3. **What the site is and is not.**
   - "Educational. Not a consultation. Not a fortune. Not medical or
     financial advice." Mirror the existing honest-framing block on
     the homepage. One paragraph.

4. **How the content is produced.**
   - The 22 audited paraphrased chapters in `projects/feng-shui/`, the
     ATTRIBUTION file, and the source-map. Name the audit process at
     a high level. No invented review board.

5. **How to get in touch.**
   - The `hello@myfengshuihome.com` address only. No phone, no
     booking link, no calendar. One line saying what kinds of email
     get a reply.

---

## Trust signals (separate from the /about body)

- Footer microcopy on every page: "Calm, honest feng shui for real
  homes. Read who runs the site." linking to `/about`. No fake
  reviews, no fake star ratings, no fake "as seen in".
- `AuthorByline` component reused at the foot of guide and article
  pages: name + a one-line role + link to `/about`. Server
  component, no client JS, no trackers.
- Privacy page already exists at `/privacy`. `/about` should link to
  it inline when discussing the account layer.
- Methodology page already exists at `/methodology`. `/about` should
  link to it as the source of the actual method.

---

## Questionnaire the owner must answer before writing copy

Until these are answered with real information, the page must not
ship. The implementer should NOT guess any of them.

1. Author name and any preferred public title.
2. Location (city or region) the author writes from.
3. Training: which books, teachers, schools, or self-study materials
   form the basis of the method on this site. No invented schools.
4. How long the author has practiced and taught feng shui, in years.
   "Less than a year" is an acceptable answer; the page just states
   it honestly.
5. Any public history: published articles, podcasts, talks, or
   community work. If none, the page states that the site is the
   author's first public work and that is fine.
6. Any certifications the author actually holds. If none, the page
   says so plainly.
7. A short paragraph in the author's own voice answering "why this
   site". The owner writes this; the implementer copies it verbatim
   into the page.
8. The single email address that should receive reader mail.

---

## Voice constraints

- Calm, present-tense, plain English.
- No marketing adjectives ("renowned", "expert", "master", "leading",
  "trusted by thousands").
- No outcome promises.
- No "as featured in" line unless the feature actually exists and the
  outlet is named.
- No photo until the owner approves an asset; a hand-drawn signature
  or a small ivory monogram is the fallback.

---

## Structured data (only once facts exist)

When the page ships, add a Person JSON-LD block and an Organization
JSON-LD block to `app/(site)/about/page.tsx` with these fields only:

- `name`
- `url`
- `sameAs` (only if real public profiles exist)
- `description` (one sentence)
- `publisher` (Organization)

No fake awards or qualifications.

---

## Implementation steps once the facts arrive

1. Owner fills the questionnaire above and pastes the answers into
   this spec.
2. Implementer drafts `/about` copy from those answers, no inventions.
3. Implementer adds the `AuthorByline` component and the footer
   trust-line link.
4. Implementer adds Person + Organization JSON-LD.
5. Site copy review: zero em dashes, zero outcome promises, zero
   fabricated facts.
6. Ship.

---

## Acceptance criteria

- Every paragraph on `/about` traces to a real fact the owner
  provided.
- Zero invented credentials.
- Zero invented testimonials.
- Zero outcome promises.
- ASCII only in source.
- Page renders without errors via `npm run build` + `npm run start`.
- 4.5:1 contrast everywhere; visible focus rings; semantic landmarks.

---

## Open questions for the owner

- Is the author comfortable being named publicly on the site?
- If not, does the site use a brand voice ("the My Feng Shui Home
  editors") instead? That is a valid path; this spec just needs to
  know which path the owner chooses before `/about` can be written.
- Should the byline link to `/about` on every article, or only on
  the foundational ones?

---

End of spec.
