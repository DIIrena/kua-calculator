// The nine bagua sectors expressed as "life areas" - the way people
// actually search ("feng shui for money", "feng shui for love") rather
// than as compass directions. Each area has its own /life/[slug] landing
// page that surfaces relevant articles and funnels to the Home Harmony
// Map (which contains a dedicated page for every sector).

export type LifeArea =
  | "career"
  | "knowledge"
  | "health"
  | "money"
  | "fame"
  | "love"
  | "creativity"
  | "travel"
  | "centre";

export type LifeAreaMeta = {
  slug: LifeArea;
  label: string;
  tagline: string;
  bagua: string;
  /** Up to 60 chars - meta description + hero subhead. */
  shortDescription: string;
  /** Full intro paragraph for the landing page. */
  longDescription: string;
  /** Three "do this tonight" starter moves. Always free. */
  starters: ReadonlyArray<{ title: string; body: string }>;
  /** Map CTA copy customised to the area. */
  mapPitch: string;
};

// Order chosen to match how people actually search (Money / Love /
// Career / Health first), with the lower-volume areas after.
export const LIFE_AREAS: ReadonlyArray<LifeAreaMeta> = [
  {
    slug: "money",
    label: "Money",
    tagline: "The wealth corner, the wallet, the stove.",
    bagua: "South-east",
    shortDescription:
      "Feng shui for money: the wealth corner, the kitchen stove, the wallet check, and three moves you can make tonight.",
    longDescription:
      "Money is the area of feng shui that gets the most search traffic and the most magazine attention. It is also the one with the most recycled advice. Below is what the practice actually says about money, free, with no jargon.",
    starters: [
      {
        title: "Clean every burner on the stove. Tonight.",
        body: "Even the back ones. Especially the back ones. The traditional reading puts the stove at the centre of the wealth chain; the modern reading is simpler (a clean stove makes you cook more).",
      },
      {
        title: "Find the south-east of your home.",
        body: "Stand in the centre with a compass. Walk south-east until you hit a wall. That corner is your wealth sector. Clean it, light it, and put one living plant in it.",
      },
      {
        title: "Tidy your wallet.",
        body: "Throw out expired cards, crumpled receipts, currency you do not use. The wallet is the personal version of the wealth corner.",
      },
    ],
    mapPitch:
      "The Home Harmony Map has a full money-corner activation page keyed to your Kua number, plus the kitchen-stove walkthrough and the wallet check. The complete money chain on one printable PDF.",
  },
  {
    slug: "love",
    label: "Love",
    tagline: "The relationship corner, the bedroom, the bed.",
    bagua: "South-west",
    shortDescription:
      "Feng shui for love and relationships: the relationship corner, the bedroom layout, and three moves you can try this weekend.",
    longDescription:
      "Bedroom feng shui is the area that overlaps most cleanly with modern sleep science. Some of the rules (the command position, the mirror rule) have direct evidence behind them. Some are traditional. We separate them honestly.",
    starters: [
      {
        title: "Rotate the bed so you can see the door from where you sleep.",
        body: "The command position. The traditional reason is energetic; the modern reason is autonomic. Either way, most people sleep noticeably better within a week of moving the bed.",
      },
      {
        title: "Cover any mirror that reflects you while you sleep.",
        body: "Movement in your peripheral vision while half-asleep keeps the nervous system alert. A throw or a curtain over the wardrobe mirror at night is enough.",
      },
      {
        title: "Display things in pairs in the relationship corner.",
        body: "The south-west of the home (or the back-right corner from the front door). Two candles, two pillows, two photos. The traditional symbolism is paired-ness; the modern reading is intentionality.",
      },
    ],
    mapPitch:
      "The Home Harmony Map has a dedicated bedroom-and-relationships page: bed position, mirror check, headboard rule, and what to do if you share the room with someone whose Kua is different from yours.",
  },
  {
    slug: "career",
    label: "Career",
    tagline: "The career corner, the desk, the office layout.",
    bagua: "North",
    shortDescription:
      "Feng shui for career and work: the north sector, the desk in command position, and three moves for a workspace that supports you.",
    longDescription:
      "The career sector covers your relationship with work, professional reputation, and direction in life. The most consequential moves are about your physical workspace - whether at home or at an office.",
    starters: [
      {
        title: "Move the desk so you are not back-to-door.",
        body: "Same command-position rule as the bed. Sitting with your back to the door drains low-grade attention all day. If you cannot move the desk, hang a mirror so the door is in your peripheral view.",
      },
      {
        title: "Clear what is above the desk.",
        body: "A heavy beam, a shelf with sharp edges, a swing-arm lamp that hangs in the way. Anything overhead that the eye registers as a threat keeps you in low-grade alertness all day.",
      },
      {
        title: "Find the north sector of your home or office.",
        body: "Stand in the centre with a compass; walk north. Keep that area uncluttered. Add a small water feature or a black object (the career element). A simple bowl of water on the desk counts.",
      },
    ],
    mapPitch:
      "The Home Harmony Map marks your four favourable directions for work and study - so you stop guessing which way to face when you are concentrating. Plus the workspace section of the room walkthrough.",
  },
  {
    slug: "health",
    label: "Health",
    tagline: "Air, light, sleep, the family centre.",
    bagua: "East",
    shortDescription:
      "Feng shui for health: air, light, clutter, sleep, and the east sector that traditionally governs family wellness.",
    longDescription:
      "Health is the area where feng shui overlaps most with contemporary environmental design science. Most of the moves are evidence-supported in the modern literature: cross-ventilation, daylight, clutter reduction, sleep design.",
    starters: [
      {
        title: "Open every window in the home for ten minutes a day.",
        body: "Stale indoor air is the most under-rated feng shui problem and one of the most-measured environmental health problems. The improvement is rapid and free.",
      },
      {
        title: "Replace every dead bulb in the home this weekend.",
        body: "Especially overhead lights in the morning rooms. Light intensity in the morning regulates the circadian rhythm. The tradition has been recommending bright morning light for centuries.",
      },
      {
        title: "Walk the home with a notebook and list every broken thing.",
        body: "Then fix one this week. Broken means stuck in the tradition; in modern psychology, broken means cognitive load every time you see it. One repaired item compounds.",
      },
    ],
    mapPitch:
      "The Home Harmony Map covers sleep design, the family-centre east sector, and the room-by-room health audit. All keyed to your Kua number so the recommendations are personalised.",
  },
  {
    slug: "creativity",
    label: "Creativity",
    tagline: "The children-and-creativity corner.",
    bagua: "West",
    shortDescription:
      "Feng shui for creativity, projects, and children: the west sector, the metal element, and three moves for spaces that support making things.",
    longDescription:
      "The west sector traditionally governs creativity and children - both the literal kind and the metaphorical (any project that you bring into being). The element is metal, the colour is white, the shape is round.",
    starters: [
      {
        title: "Add one round metal object to the west of your home.",
        body: "A round brass clock, a circular metal bowl, a wind chime, a copper pot. The traditional cure for the creativity corner. Skip if it would feel forced; the point is intentional.",
      },
      {
        title: "Clear the corner of unfinished projects.",
        body: "Stacks of half-read books, abandoned crafts, the box you have been meaning to sort. Stuck projects in the creativity corner block new creative work in the tradition.",
      },
      {
        title: "Hang one piece of art made by a child you love.",
        body: "Or, if you have no children in your life, one piece you made yourself. The west sector responds to the energy of making things, not the polish of the result.",
      },
    ],
    mapPitch:
      "The Home Harmony Map's nine-sector walkthrough covers the creativity corner in detail, with the element analysis and the do-not-do list.",
  },
  {
    slug: "fame",
    label: "Fame and reputation",
    tagline: "The recognition corner.",
    bagua: "South",
    shortDescription:
      "Feng shui for reputation, visibility, and recognition: the south sector, the fire element, and how to activate it.",
    longDescription:
      "Fame in the traditional sense means recognition - how the world sees you. It applies to business owners, public-facing professionals, and anyone whose work depends on being known. The sector is south, the element is fire.",
    starters: [
      {
        title: "Clean the south wall of your home.",
        body: "Repaint it if it has been a while. Hang one statement piece you are proud of. The south sector responds to attention and intentional decoration.",
      },
      {
        title: "Add one warm light source to the south sector in the evening.",
        body: "A red-shaded lamp, candles, or a salt lamp. The fire element wants warm light; the traditional cure and the modern design instinct agree.",
      },
      {
        title: "Display awards, photos, or recognitions where the south wall meets the eye.",
        body: "Not buried in a drawer. Recognition in the home is one of the most consistent traditional fame cures.",
      },
    ],
    mapPitch:
      "The Home Harmony Map walks the south sector room by room, naming the one move that matters most for visibility and reputation in each space.",
  },
  {
    slug: "knowledge",
    label: "Knowledge and study",
    tagline: "The self-cultivation corner.",
    bagua: "North-east",
    shortDescription:
      "Feng shui for learning, studying, and inner cultivation: the north-east sector, the earth element, and how to design a study space.",
    longDescription:
      "Knowledge in the traditional sense includes both formal study and inner cultivation (meditation, journaling, reading). The sector is north-east; the element is earth; the cure is steadiness.",
    starters: [
      {
        title: "Make the north-east of your home the quiet corner.",
        body: "Whatever room it falls in, that area is where the study desk, the reading chair, or the meditation cushion belongs. Keep it uncluttered.",
      },
      {
        title: "Add an earth element to the corner.",
        body: "A clay pot. A ceramic bowl. A flat stone. The earth element is grounding; the traditional cure and the calming-design instinct agree.",
      },
      {
        title: "Put the books you actually want to read at eye level.",
        body: "The ones for show go up high. The ones for use go where you reach for them without thinking. A small change with outsized effect on actual reading.",
      },
    ],
    mapPitch:
      "The Home Harmony Map's walkthrough covers the study corner in detail and marks your favourable direction for sustained focus.",
  },
  {
    slug: "travel",
    label: "Travel and helpful people",
    tagline: "The helpful-people corner.",
    bagua: "North-west",
    shortDescription:
      "Feng shui for travel, networks, and helpful people: the north-west sector, the metal element, and how to keep it active.",
    longDescription:
      "The north-west sector traditionally governs both literal travel and the metaphor of helpful people coming and going from your life. The element is metal; the qualities are precision and movement.",
    starters: [
      {
        title: "Open the north-west wall.",
        body: "Even one window onto the north-west is a small ongoing cure for this sector. Air moves; people move; the metaphor and the practice agree.",
      },
      {
        title: "Add a round metal object to the north-west.",
        body: "A brass bell. A round clock. A small singing bowl. The metal element animates the sector. Skip if it would clutter; the point is intentional, not decorative.",
      },
      {
        title: "Display objects from places you have been.",
        body: "A photograph, a souvenir, a piece of stone from a beach. The travel sector responds to memory of movement. Stagnant in the north-west means stagnant in the network.",
      },
    ],
    mapPitch:
      "The Home Harmony Map covers the travel-and-helpful-people sector and marks the moves with the highest leverage for someone who travels often or works in a relationship-heavy field.",
  },
  {
    slug: "centre",
    label: "Centre and balance",
    tagline: "The tai chi, the still point.",
    bagua: "Centre",
    shortDescription:
      "The tai chi of your home: the geometric centre, the still point, and why it is the most overlooked feng shui sector.",
    longDescription:
      "The centre of the home is the still point from which all eight outer sectors are measured. It is sometimes called the tai chi. The tradition is clear: keep it open, uncluttered, and well-lit. Modern design agrees.",
    starters: [
      {
        title: "Find the geometric centre of your home and stand in it.",
        body: "Sketch a rough floor plan. Draw the diagonals. Where they cross is the centre. Stand there. Notice what is around you. That is the move.",
      },
      {
        title: "Clear the centre.",
        body: "If a heavy piece of furniture, a storage unit, or a cluttered cupboard is in the centre of the home, that is your highest-leverage feng shui task. The centre wants air.",
      },
      {
        title: "Add one earth element to the centre.",
        body: "A yellow or terracotta object. A flat stone. A ceramic bowl. The earth element is the natural element of the centre; the traditional cure stabilises the whole home.",
      },
    ],
    mapPitch:
      "The Home Harmony Map maps the tai chi of your home onto your specific floor plan, with the centre-clearing protocol on its own page.",
  },
];

export function findLifeArea(slug: string): LifeAreaMeta | null {
  return LIFE_AREAS.find((a) => a.slug === slug) ?? null;
}
