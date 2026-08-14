"use client";

import { useEffect, useState } from "react";

// Invisible anti-bot fields for the public email-capture forms. Renders
// the honeypot input ("website") and the mount timestamp ("fgt") that
// lib/form-guard.ts botCheck() validates server-side. Drop one instance
// inside each guarded <form>. The wrapper is aria-hidden and moved off
// screen; keyboard and screen-reader users never meet it.
export default function FormGuardFields() {
  const [mountedAt, setMountedAt] = useState("");
  useEffect(() => {
    setMountedAt(String(Date.now()));
  }, []);

  return (
    <div
      aria-hidden="true"
      style={{
        position: "absolute",
        left: "-9999px",
        width: "1px",
        height: "1px",
        overflow: "hidden",
      }}
    >
      <label>
        Leave this field empty
        <input
          type="text"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          defaultValue=""
        />
      </label>
      <input type="hidden" name="fgt" value={mountedAt} />
    </div>
  );
}
