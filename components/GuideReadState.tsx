"use client";

import { useEffect, useState } from "react";

// Local-only reading progress for the guide. Stores read slugs in
// localStorage under one key. Nothing leaves the browser: no network,
// no analytics, no cookies. Two modes:
//
//   <GuideReadState mode="track" slug="cluster/slug" />
//     Mounted on a guide leaf; marks the page read after a short
//     dwell (8s) so a misclick does not count.
//
//   <GuideReadState mode="summary" total={38} />
//     Mounted on the guide hub; renders "N of 38 read" once mounted
//     (renders nothing server-side, so no hydration mismatch).

const KEY = "mfsh_guide_read";

function readSet(): Set<string> {
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return new Set();
    const arr = JSON.parse(raw);
    return new Set(Array.isArray(arr) ? arr.filter((x) => typeof x === "string") : []);
  } catch {
    return new Set();
  }
}

function writeSet(set: Set<string>) {
  try {
    window.localStorage.setItem(KEY, JSON.stringify([...set]));
  } catch {
    // Private mode / storage disabled: progress simply does not persist.
  }
}

type Props =
  | { mode: "track"; slug: string; total?: never }
  | { mode: "summary"; total: number; slug?: never };

export default function GuideReadState(props: Props) {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    if (props.mode === "track") {
      const t = window.setTimeout(() => {
        const set = readSet();
        if (!set.has(props.slug)) {
          set.add(props.slug);
          writeSet(set);
        }
      }, 8000);
      return () => window.clearTimeout(t);
    }
    setCount(readSet().size);
    return undefined;
  }, [props.mode, props.mode === "track" ? props.slug : ""]);

  if (props.mode === "track") return null;
  if (count === null || count === 0) return null;

  return (
    <p className="guide-read-progress" role="status">
      You have read {Math.min(count, props.total)} of {props.total} pages.
    </p>
  );
}
