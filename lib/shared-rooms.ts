// Server-side port of the shared-rooms grouping logic from public/calculator/ui.js.
// Given two charts' direction lookups, bins each compass direction into one
// of three groups: favourable for both, unfavourable for both, mixed
// (favourable for one but not the other).

import type { Compass, Direction } from "@/lib/directions";
import { DIRECTION_ORDER } from "@/lib/directions";

export type SharedEntry = {
  compass: Compass;
  compassLabel: string;
  a: Direction;
  b: Direction;
};

export type SharedRoomsGroups = {
  both: SharedEntry[];
  avoid: SharedEntry[];
  mixed: SharedEntry[];
};

export function buildSharedRooms(
  dirsA: Record<Compass, Direction>,
  dirsB: Record<Compass, Direction>,
): SharedRoomsGroups {
  const both: SharedEntry[] = [];
  const avoid: SharedEntry[] = [];
  const mixed: SharedEntry[] = [];
  DIRECTION_ORDER.forEach((compass) => {
    const a = dirsA[compass];
    const b = dirsB[compass];
    if (!a || !b) return;
    const entry: SharedEntry = { compass, compassLabel: a.compassLabel, a, b };
    if (a.favourable && b.favourable) both.push(entry);
    else if (!a.favourable && !b.favourable) avoid.push(entry);
    else mixed.push(entry);
  });
  return { both, avoid, mixed };
}
