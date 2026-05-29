// The rooms-and-spaces taxonomy. Same shape as life-areas.ts but
// indexed by physical room of the home (where am I?) rather than by
// life concern (what do I want to improve?). Each /space/[slug] page
// surfaces room-specific articles and funnels into the Personal Feng
// Shui Compass (the foundation product, keyed to the reader's Kua and
// eight directions).

export type Space =
  | "living-room"
  | "bedroom"
  | "dining-room"
  | "bathroom"
  | "kitchen"
  | "terrace";

export type SpaceMeta = {
  slug: Space;
  label: string;
  tagline: string;
  /** Up to 60 chars - meta description + hero subhead. */
  shortDescription: string;
  /** Full intro paragraph for the landing page. */
  longDescription: string;
  /** Three "do this tonight" starter moves. Always free. */
  starters: ReadonlyArray<{ title: string; body: string }>;
  /** Map CTA copy customised to the room. */
  mapPitch: string;
};

// Order chosen by frequency of use - the rooms people search for
// most-often first (bedroom + kitchen high, terrace low).
export const SPACES: ReadonlyArray<SpaceMeta> = [
  {
    slug: "bedroom",
    label: "Bedroom",
    tagline: "The room you spend a third of your life in.",
    shortDescription:
      "Bedroom feng shui: command position, mirror rules, headboard, and the three moves that change sleep within a week.",
    longDescription:
      "The bedroom carries more weight than any other room. You spend a third of your life in it, with your guard down. The good news: this is the room where feng shui overlaps most cleanly with sleep science. The moves that work are usually evidence-supported and free.",
    starters: [
      {
        title: "Move the bed so you can see the door from where you sleep.",
        body: "The command position. The traditional reason is energetic; the modern reason is autonomic. Most people sleep noticeably better within a week of moving the bed.",
      },
      {
        title: "Cover any mirror that reflects you while you sleep.",
        body: "A throw or a curtain over the wardrobe mirror at night is enough. Movement in your peripheral vision while half-asleep keeps the nervous system alert.",
      },
      {
        title: "Push the bed against a wall and add a real headboard.",
        body: "A floating bed in the middle of the room feels unmoored. A solid headboard against a solid wall gives the nervous system something steady at your back.",
      },
    ],
    mapPitch:
      "The Personal Feng Shui Compass reads your Kua and your eight directions, so you can tell which of your supportive directions to face the bed toward in your own bedroom, with the traditional placement to test for a week.",
  },
  {
    slug: "kitchen",
    label: "Kitchen",
    tagline: "The stove, the sink, the wealth chain.",
    shortDescription:
      "Kitchen feng shui: the stove as the wealth gateway, the sink-stove fire-and-water question, and three moves you can do tonight.",
    longDescription:
      "The kitchen contains two of the most consequential objects in the home: the stove and the sink. The stove is the traditional wealth gateway. The sink is its elemental opposite. How you handle the pair shapes how the room feels every time you walk into it.",
    starters: [
      {
        title: "Clean every burner on the stove. Tonight.",
        body: "Even the back ones. Especially the back ones. The traditional reading puts the stove at the centre of the wealth chain; the modern reading is simpler - a clean stove makes you cook more.",
      },
      {
        title: "Clear the sink before bed every night this week.",
        body: "Try it for seven days. The morning starts differently when the kitchen does. Standing water in a dirty sink is wealth-corner trouble in the tradition and quiet domestic stress in the modern reading.",
      },
      {
        title: "Stand at the cook's position and check the sightline.",
        body: "Can the cook see the kitchen door without turning? If not, hang one small mirror so the door is in their peripheral view. Cooking with your back to the door drains low-grade attention all day.",
      },
    ],
    mapPitch:
      "The Personal Feng Shui Compass reads your Kua and your eight directions, so you can tell which of your supportive directions sits in the kitchen of your own home, and where the wealth corner falls if the kitchen takes the south-east.",
  },
  {
    slug: "living-room",
    label: "Living room",
    tagline: "Where the home meets itself.",
    shortDescription:
      "Living room feng shui: the seating arrangement, the conversation circle, light, and the three moves to make a calmer shared space.",
    longDescription:
      "The living room is the most shared room in most homes, and the one that sets the social tone. The feng shui questions here are about flow, light, and sightlines. Most of the moves are about subtraction: less furniture, more breathing room, warmer light.",
    starters: [
      {
        title: "Pull the heaviest piece of furniture six inches away from the wall.",
        body: "Let air circulate behind it. The room reads as more spacious within an hour. The traditional vocabulary is qi flow; the modern vocabulary is airflow plus visual perception.",
      },
      {
        title: "Add one warm light source below eye height in the evening.",
        body: "A table lamp, a floor lamp, three candles. Turn the overhead light off for one evening. The chronobiology literature agrees with the tradition that warm low light supports the wind-down.",
      },
      {
        title: "Arrange the seating so people face each other, not the TV.",
        body: "If you must keep the TV as the focal point, add one chair that faces away from it toward the conversation circle. The room reads as both modern and welcoming.",
      },
    ],
    mapPitch:
      "The Personal Feng Shui Compass reads your Kua and your eight directions, so you can tell which of your supportive directions sits in the living room of your own home, and which way to face the seat where you settle most.",
  },
  {
    slug: "dining-room",
    label: "Dining room",
    tagline: "The table, the seat, the shared meal.",
    shortDescription:
      "Dining room feng shui: the table shape, where the head of household sits, and how to set the room for the meals that actually happen there.",
    longDescription:
      "The dining room is one of the most under-attended rooms in modern homes. People moved their dinners to the sofa or the kitchen island, and the dining room sits empty most of the week. The feng shui move is usually to bring it back to life with a few small choices.",
    starters: [
      {
        title: "Seat the most senior person facing the door.",
        body: "Command position at the dining table. The traditional reading is about respect for the elder; the modern reading is the same one we use for the bed and the desk. People who sit facing the door eat more relaxed meals.",
      },
      {
        title: "Hang a mirror that reflects the table.",
        body: "The traditional reading is that mirrors double the food (abundance). The modern reading is that a mirror makes a small dining room read as larger and the meal as longer. Either way it is one of the most consistent dining-room cures.",
      },
      {
        title: "Eat one meal a week in the dining room. On purpose.",
        body: "The room cannot do its work if it is never used. Pick one weekly meal. The slow accumulation of small rituals is the actual feng shui mechanism.",
      },
    ],
    mapPitch:
      "The Personal Feng Shui Compass reads your Kua and your eight directions, so you can tell which of your supportive directions to take as your seat at the dining table in your own home.",
  },
  {
    slug: "bathroom",
    label: "Bathroom",
    tagline: "The most-feared room in feng shui. Calmer than people think.",
    shortDescription:
      "Bathroom feng shui: why the door matters, what to do about the toilet seat, and the three moves that handle the most common bathroom problems.",
    longDescription:
      "The bathroom is the room most popular advice gets wrong. A common claim is that any bathroom in the wealth corner is a feng shui crisis. It is not. It just needs containment. Below are the moves that actually matter.",
    starters: [
      {
        title: "Keep the door closed.",
        body: "All the time. The traditional reading is that an open bathroom door lets qi drain. The modern reading is humidity, smell, and sightline. Both readings agree.",
      },
      {
        title: "Put the toilet seat down. Every time.",
        body: "Same reason as the door. Tradition calls it wealth drain. Hygiene calls it aerosolisation. Whichever vocabulary you prefer, the rule is the same.",
      },
      {
        title: "Add one living plant the bathroom can support.",
        body: "A pothos, a peace lily, or a small fern. Living wood balances the bathroom's heavy water element. The plant also signals to you that the room is cared for, which it usually needs.",
      },
    ],
    mapPitch:
      "The Personal Feng Shui Compass reads your Kua and your eight directions, so you can tell which of your cautious directions the bathroom sits in, where the tradition is happy to let it take a lower-priority corner of your own home.",
  },
  {
    slug: "terrace",
    label: "Terrace and surrounding area",
    tagline: "Where your home meets the outside world.",
    shortDescription:
      "Feng shui for the terrace, garden, balcony, and the outside of your home: how the surroundings shape what the home receives.",
    longDescription:
      "Feng shui literally means wind and water - the practice started outdoors. Before the inside of the home, the practitioner reads the land: the shape of the plot, the way the wind moves, what sits in front and what sits behind. Modern terraces, balconies, and small gardens are a compressed version of that same reading.",
    starters: [
      {
        title: "Stand at your front door and look outward. Name what you see.",
        body: "A long straight road pointing at the door is a traditional sha (cutting energy). A tree directly in line with the door is the same. Most fixes are gentle - a planted shrub, a small fence, a curtain in the window in the line of sight.",
      },
      {
        title: "Keep the path to the door swept and lit.",
        body: "Same logic as the inside of the entrance. The first six metres outside the home set the tone of what arrives. A clear, well-lit path is the single highest-leverage outdoor cure.",
      },
      {
        title: "Add one piece of running water if you have outdoor space.",
        body: "A small fountain, a bird-bath that drips, a wind-spinner that catches the breeze. Gentle motion at the boundary is one of the most consistent traditional cures, and the design literature agrees that water sounds reduce indoor stress.",
      },
    ],
    mapPitch:
      "The Personal Feng Shui Compass reads your Kua and your eight directions, so you can tell which of your supportive directions the terrace and the approach to your own home sit in.",
  },
];

export function findSpace(slug: string): SpaceMeta | null {
  return SPACES.find((s) => s.slug === slug) ?? null;
}
