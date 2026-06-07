"use client";

import { useEffect, useState } from "react";

// Reappears at the bottom-right of the viewport once the main BuyButton
// has scrolled past. Clicking it smooth-scrolls back to the form. On
// short pages where the main button never leaves the viewport, this
// component renders nothing - the IntersectionObserver only flips its
// state when the main button has actually been seen and then lost.
//
// Mounted at the page level on every product page. Targets the element
// with id="waitlist" (BuyButton's outer container carries that id).

export default function FloatingWaitlistCTA() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const target = document.getElementById("waitlist");
    if (!target) return;

    let seen = false;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            seen = true;
            setShow(false);
          } else if (seen) {
            // Only show once the user has actually scrolled past the
            // main form. Prevents the pill flashing on first load when
            // the form happens to be below the fold.
            setShow(true);
          }
        }
      },
      { threshold: 0.1 },
    );
    observer.observe(target);
    return () => observer.disconnect();
  }, []);

  function handleClick() {
    const target = document.getElementById("waitlist");
    if (!target) return;
    target.scrollIntoView({ behavior: "smooth", block: "center" });
    const emailInput = target.querySelector<HTMLInputElement>("input[type='email']");
    setTimeout(() => emailInput?.focus(), 450);
  }

  if (!show) return null;
  return (
    <button
      type="button"
      className="floating-waitlist-cta"
      onClick={handleClick}
      aria-label="Save my spot on the waitlist"
    >
      Save my spot
      <span aria-hidden="true"> →</span>
    </button>
  );
}
