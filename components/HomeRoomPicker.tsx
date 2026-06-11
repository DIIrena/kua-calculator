"use client";

import { useState } from "react";
import Link from "next/link";

// Four rooms from the feng-shui project chapter 10. Each "tip" is one
// short, concrete, do-it-tonight move - the kind of guidance the
// Personal Feng Shui Compass expands into a full page per room. The
// picker is a soft product demo: feel the voice, then choose to go
// further.

type Room = {
  id: string;
  label: string;
  emoji: string; // decorative only, aria-hidden
  tip: string;
};

const ROOMS: Room[] = [
  {
    id: "entrance",
    label: "Entrance",
    emoji: "?",
    tip:
      "The one move: clear the line between your front door and the first wall you see. If the door opens into a wall, hang one thing at eye height that you actually like looking at. The first six feet sets the tone of the whole home.",
  },
  {
    id: "kitchen",
    label: "Kitchen",
    emoji: "?",
    tip:
      "The one move: clean the stove. Every burner. Tonight. In the Compass School, the stove is the wealth gateway; in plain design terms, a clean stove makes you cook more, and people who cook more eat better. Both readings agree.",
  },
  {
    id: "bedroom",
    label: "Bedroom",
    emoji: "?",
    tip:
      "The one move: from your bed, can you see the door without turning your head? If not, rotate the bed ninety degrees. The command position is the tradition's way of lowering nervous-system load at night. Leave it for a week and notice whether the room feels easier to settle into.",
  },
  {
    id: "workspace",
    label: "Workspace",
    emoji: "?",
    tip:
      "The one move: do not sit with your back to the door. If you must, hang one mirror so the door is in your peripheral view. This is the same command-position rule as the bedroom, and it cuts the low-grade alertness that drains a workday.",
  },
];

export default function HomeRoomPicker() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const selected = ROOMS.find((r) => r.id === selectedId) ?? null;

  return (
    <div className="room-picker">
      <div className="room-picker-tabs" role="tablist" aria-label="Pick a room">
        {ROOMS.map((room) => {
          const active = selected?.id === room.id;
          return (
            <button
              key={room.id}
              type="button"
              role="tab"
              aria-selected={active}
              className={
                active ? "room-picker-tab room-picker-tab-active" : "room-picker-tab"
              }
              onClick={() => setSelectedId(room.id)}
            >
              <span aria-hidden="true">{room.emoji}</span> {room.label}
            </button>
          );
        })}
      </div>

      <div
        className="room-picker-panel"
        role="region"
        aria-live="polite"
        aria-label="Selected room"
      >
        {selected ? (
          <>
            <h3 className="room-picker-room">{selected.label}</h3>
            <p className="room-picker-tip">{selected.tip}</p>
            <p className="room-picker-cta">
              The Personal Feng Shui Compass covers{" "}
              <strong>all nine sectors</strong> this way, one page per
              room.{" "}
              <Link
                href="/products/personal-feng-shui-compass"
                className="room-picker-link"
              >
                See the Personal Feng Shui Compass &rarr;
              </Link>
            </p>
          </>
        ) : (
          <p className="room-picker-prompt">
            Tap a room above to see the one move that matters most.
          </p>
        )}
      </div>
    </div>
  );
}
