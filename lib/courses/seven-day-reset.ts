// The 7-Day Home Reset email course. Eight emails: a welcome sent on
// purchase (day 0) and one task email a day for seven days. The drip
// engine (app/api/cron/drip) sends day N = enrollment.day_sent + 1 each
// run, up to day 7.
//
// Bodies are markdown (## headings, paragraphs, - and 1. lists, **bold**)
// rendered to inline-styled email HTML by lib/email-course.ts. Drafted
// from the source library and adversarially voice-checked: no em dashes,
// no outcome promises, no source mentions.

export type CourseEmail = {
  /** 0 = welcome (sent on enrolment); 1..7 = the daily task emails. */
  day: number;
  subject: string;
  preheader: string;
  body: string;
};

export type Course = {
  slug: string;
  title: string;
  emails: CourseEmail[];
};

export const SEVEN_DAY_RESET: Course = {
  slug: "seven-day-home-reset",
  title: "7-Day Home Reset",
  emails: [
    {
      day: 0,
      subject: "Welcome: your 7-Day Home Reset starts now",
      preheader:
        "One short email a day, one small task, nothing to buy or redecorate.",
      body: `Welcome aboard. You have just started the 7-Day Home Reset, and the whole thing is built to feel light.

Here is how it works. For the next seven days, you will get one short email like this one. Each will give you a single small task. Nothing to shop for, nothing to redecorate, no big weekend project. The tasks use things you already own and usually take ten to twenty minutes.

## How to think about this week

The reset is really one simple habit: noticing how your rooms support you, and making one quiet adjustment at a time. Some days you will move a piece of furniture a few inches. Some days you will just clear a surface or open a window. Small, doable, calm.

This is a practical home routine. Think of it as a way to read a home as something you can pay attention to and gently adjust, room by room. It is a decision tool for arranging the spaces you live in, not a prediction or a promise. You are simply learning to notice what a room is doing and to respond.

A few things to keep in mind:

- One email a day, one small task. You can do them in the morning or evening, whatever fits.
- Nothing to buy. If a task ever seems to need something you do not have, skip it or improvise.
- No pressure to be perfect. If you miss a day, just pick up the next one.

## Today's one task

Take a slow two-minute walk through your home. Move through the rooms you use most, at an unhurried pace, the way a visitor might.

As you go, notice how each space feels. Which rooms feel easy and settled? Which ones feel slightly off, a little tight, or somehow unfinished? You do not need words for it. A quiet sense is enough.

Do not fix anything today. Do not move a single object. The whole task is just to notice, so that the small adjustments later in the week land where they will actually help.

That is it. See you tomorrow.`,
    },
    {
      day: 1,
      subject: "Day 1: start at the front door",
      preheader:
        "Clear the entrance, inside and out, so the door opens fully and the first steps in are open.",
      body: `Welcome to your first day.

We begin where a home begins: the front door. It is sometimes called the mouth of the house, the spot where a home draws its energy in and where the whole place forms its first impression. Whatever else happens over the next seven days, this is the one spot that touches every coming and going, so it makes sense to start here.

You do not need to buy anything or measure anything. You only need to look at your entrance the way a first-time visitor would, and clear what gets in the way.

## What to look at here

A few simple things, none of them mysterious:

- **The approach.** A clear path to the door, easy to find, with nothing blocking the last few steps up to it.
- **The door itself.** Clean, with hardware that works and a bell or knocker that actually rings. A door that scrapes or sticks is a small daily friction most people stop noticing.
- **The threshold.** The door should be able to swing fully open. Shoes, bags, and a growing pile of post in the swing arc are the most common thing in the way.
- **The first three steps inside.** Where you land when you walk in should be open space, not a wall of coats or a cluttered console. This opening room is the place energy settles before it spreads through the home.
- **Light.** A working light at the entry, inside and out, so the way in is welcoming after dark.

None of this is about luck. It is about an entrance that opens easily, looks cared for, and lets you walk in without stepping around things. That is the whole idea.

## Today's one task

Clear and wipe your entrance, inside and out, so the door opens fully and the first few steps in are open. Give it ten to twenty minutes with what you already have.

A simple order to work through:

- Step outside and look at the door the way a guest would. Sweep or clear the step and path so the approach is tidy.
- Wipe the door down and give the handle a quick clean. Try the bell or knocker, and note anything that needs a real fix later.
- Open the door fully. Move any shoes, bags, or post out of its swing so it reaches all the way.
- Clear the first stretch of floor inside so your first few steps land in open space.
- Turn on the entry light, inside and out, and replace any bulb that has gone.

That is the day. When you walk back in this evening, notice how easily the door opens and how the entrance greets you. Tomorrow we move a little further in.`,
    },
    {
      day: 2,
      subject: "Day 2: light and air",
      preheader:
        "Let the home breathe for ten minutes, and notice how the room feels afterward.",
      body: `A home holds whatever it is given, and that includes the air it sits in and the light it lets through. After a closed-up night, the air inside has gone still and a little tired. Daylight, meanwhile, often gets stopped at the glass by a film of dust we stopped noticing months ago.

The older idea is that a dwelling needs to breathe, and that still, shut-in air is air with nowhere to go. You do not have to take that on faith to feel the difference. Open a window for a few minutes and the room simply feels different to stand in.

## A few minutes of fresh air

Cracking the windows for even ten minutes lets the stale air move out and fresh air settle in. If you can open two windows on opposite sides of a room, the exchange happens faster, since the air has somewhere to travel from and to.

This is the kind of small reset that costs nothing and asks for nothing you do not already have. Morning is a natural time for it, but any quiet moment in your day will do.

## Letting in more daylight

Light is the other half of today. A bright spot feels warm and open, while a dim, neglected corner can feel like a part of the room you have quietly stopped using. You can feel that without needing any special language for it.

A stale or shadowed corner is rarely a big problem. It is usually just a window that needs wiping or a bulb that quietly went out and was never swapped. Worth noticing now, so you know which small fix the room is asking for.

## Today's one task

Open your home to fresh air for ten minutes. Pick a window, or two on opposite walls if you can, and let the air move through while you do something else nearby.

That is the whole task. A few quiet minutes of moving air, nothing more. Tomorrow we will keep going.`,
    },
    {
      day: 3,
      subject: "Day 3: the bed, where you go still",
      preheader:
        "Find the calm spot for the bed, clear what's underneath, settle the surfaces.",
      body: `Today we move to the room where you spend the most still hours of your life. You lie down there with your guard fully lowered, again and again, so it is worth a little attention.

The good news is that the bedroom asks for less doing, not more. The work here is mostly about taking things away and letting the room go quiet.

One rule before any furniture moves, today and every day after: physical problems outrank symbolic refinements. A sharp corner at the head of the bed, a door that cannot open fully, a blocked path: fix those first, always. If a "better" position would trade a real, felt problem for a theoretical gain, decline the trade.

## Where the bed sits

There is one idea that does most of the work, and it is about the bed.

The calmest placement is one where you can see the bedroom door from your pillow without having to sit up, while the bed is not directly in line with that door. Visible, but a little off to the side. The thinking is simple: the body settles more easily when it knows nothing can surprise it, yet you also do not want to lie squarely in the path of the door.

Notice where your bed is now. Can you see the door while your head is on the pillow? If you can, and you are not lying directly across from it, you are already in a good spot.

## What sits behind your head

A solid wall behind the headboard tends to feel steadier than a window. A wall behind you gives a sense of backing, something firm at your back while you rest, where open space behind the head can keep sleep a little shallower.

You do not have to move furniture tonight. Just notice what is behind your head when you lie down.

## Calming the room

A bedroom does its quietest work when there is less competing for your attention.

- Screens and a television facing the bed pull a wide-awake, watchful feeling into a room meant for rest. If a screen lives in here, see if it can face away or be covered at night.
- A phone charging on the nightstand keeps a small thread of alertness alive all night. If it can charge across the room, or in another room, the bedside gets quieter.
- The surfaces beside the bed tend to echo the mood of the room. A clear, simple nightstand feels settled; a crowded one feels busy.

## What's under there

The space under the bed matters too. Whatever you store under the bed sits directly beneath you all night. Best is empty, or at most a single flat box of spare bedding. It is also where dust quietly gathers, so clearing it is practical as much as anything.

## Today's one task

Take ten to twenty minutes and do three small things:

1. Clear out everything stored under the bed. If you must keep something there, narrow it down to one flat box of linens.
2. Clear the top of one nightstand. Leave only what genuinely belongs by the bed at night: a lamp, a glass of water, one book.
3. Lie down, put your head on the pillow, and check whether you can see the bedroom door. Just notice it. You do not need to move anything yet.

That is the whole task. A clearer floor beneath you and one calm surface beside you is plenty for today.

See you tomorrow.`,
    },
    {
      day: 4,
      subject: "Day 4: the desk you sit at",
      preheader:
        "Set your chair so you can see the door, then clear the surface to daily-use only.",
      body: `Today we move to the place you probably spend more waking hours than almost anywhere else in the home: the desk.

You may not think of it as a feng shui spot. It often gets shoved wherever the room left a gap, with the chair facing a wall and the cables pooling underneath. It helps to give the desk the same care you would give a bed or a stove. The position matters, and small corrections here get repeated every single working hour.

## See the door, hold a wall

This is the command position again, a version of which came up earlier in the week. At the desk it comes down to two things.

First, you want to see the door without turning your head. When your back is to the entrance, some quiet part of you can stay half-alert, listening for who might walk in. Turning the chair so the door sits in your field of view lets that part settle.

Second, where you can, keep a solid wall behind you. A wall at your back reads as support, the way a high chair back feels steadier than a stool. A window directly behind you is the opposite, so if that is your only option, a high chair back or a tall plant behind you stands in for the wall.

If the room simply will not let the desk face the door, a small mirror beside your screen that shows the entrance is the usual workaround.

## Less on the surface

A crowded desktop tends to feel like a crowded mind. A clear work surface tends to feel like clearer attention, and the practical version is the same: you reach for what you use, not past three things you do not.

The test is simple. Keep only what earns its place by daily use. Everything else has a drawer, a shelf, or a different room.

## The wire nest and one small green thing

Cables tend to breed under a desk into a tangle nobody wants to touch. Gathering them with a tie or tucking them out of the foot space is a small act, and the surface above tends to follow.

If you have a plant already, a small round-leaved one on the desk brings a little living green into the spot. No plant is fine too. A clear, warm light you can actually see by does the same gentle job.

## Today's one task

Spend ten to twenty minutes on the desk you use most.

- Reposition the chair so you can see the door from where you sit. If a wall can sit behind you, even better.
- Clear the surface down to only the things you reach for every day. The rest goes to a drawer or shelf.

That is the whole task. For now, sit down in the repositioned chair and notice how the cleared surface feels under your hands.`,
    },
    {
      day: 5,
      subject: "The kitchen and the stove",
      preheader: "A clean stove, a clear stretch of counter, and one repair to note.",
      body: `Today we move into the kitchen, the room where the household is fed.

In the older tradition, the stove sits near the top of the things worth looking at in a home. It is read as the heart of daily care, the small steady fire the day is built around. You do not need to take that literally to feel the truth underneath it: a kitchen that works well is a quiet relief, and one that does not is a low, constant friction.

So today is simple. We are not chasing anything. We are just putting the kitchen in good working order.

## Start with the stove

Look at your stove honestly.

Is every burner lighting and holding a flame, or running a clean steady heat? A stove with one dead burner is a stove half working, and most of us have learned to cook around the gap without noticing it anymore.

Then look at the surface itself. Months of cooked-on splatter make the stove feel tired before you have even started. A clean stovetop is a different object from a neglected one, and it costs nothing but a little effort and what you already have under the sink.

So give it a proper wipe. The burners, the grates or rings, the knobs, the surround. Take your time with one stretch of it rather than rushing the whole thing.

Then adopt the tradition's smallest kitchen habit: use the stove daily, even briefly, and rotate which burners you use so all of them work and all of them see use. The tradition reads the stove as the home's prosperity engine, and an engine that runs daily reads as wealth in motion; the mundane half is that a stove used daily stays clean, functional, and noticed. And if your stove and sink face each other directly across the kitchen, the old fire-and-water standoff, the renter-safe buffer is a visually distinct mat on the floor between them, or a small faceted crystal hung midway.

## Clear one stretch of counter

Kitchen counters collect things. Mail, a charger, the appliance you used last week, a few jars that never went back. A buried working surface is a kitchen that has gone a little stagnant, and the practical version is just as real: you have nowhere to actually cook.

Pick one stretch of counter, ideally near the stove, and clear it down to the surface. Wipe it. Leave it empty, or leave only what truly earns its place there.

You are not reorganising the whole kitchen tonight. One clear, usable stretch is enough.

## Note what needs a repair

While you are in there, notice the small broken things:

- A burner that will not light or runs uneven
- A tap that drips, or one that is slow to shut off fully
- A cabinet door hanging loose, or a handle coming away

You do not have to fix these tonight. Just write them down. A dripping tap is the easiest thing in a home to stop hearing, and the easiest to keep meaning to deal with. Naming it on paper is the first real step toward it actually getting done.

## Today's one task

Set aside ten to twenty minutes in the kitchen and do three things:

1. Clean the stove, paying attention to every burner so you know each one works.
2. Clear and wipe one stretch of counter, ideally beside the stove, down to the bare surface.
3. Write down any burner, tap, or fitting that needs a repair, so it is on a list instead of in the back of your mind.

That is the whole of today. A stove you trust and one clear surface to work on is a kitchen that is ready for you. We will keep going tomorrow.`,
    },
    {
      day: 6,
      subject: "Day 6: clutter, flow, and the path of least friction",
      preheader:
        "One real clearance beats a whole-house purge. Clear one surface, free one path.",
      body: `Today is about movement: how easily you move through your home, and how easily air and light move with you.

This is not about owning less. A spare room can still feel stuck, and a full one can still feel alive. What matters is flow, the sense that you and the air can travel through a space without snagging. So put the word "minimalism" aside for a day. We are looking for friction, not for things to throw away.

## The catch-all

Most homes have one surface or one drawer that quietly became a holding pen. The hallway table buried under mail. The kitchen drawer of batteries, takeaway menus, and a charger for a device you no longer own. The dresser top you stopped seeing months ago.

These spots are not a character flaw. They form because a surface is convenient and no decision has been made yet. A permanent catch-all is a small place where things stop moving, and where your attention quietly stops too.

## The "everything" chair

You may know the one. The chair, or the corner, or the end of the bed that holds clothes that are neither clean-and-away nor dirty-and-washed. It lives in between, and so does the pile.

Naming it is half the work. Once you see it as a stalled spot rather than just "where things go," it is easier to give those things a real home.

## A path that does not open

Now walk your most-used route through the home, slowly. Notice where you turn sideways, step over something, or nudge a box with your foot without thinking. A door that only opens partway, a bag parked at the bottom of the stairs, a basket narrowing a hallway: these are the places where movement gets pinched, and a door that cannot swing fully is one of the clearest examples.

You stop noticing these snags. The point of today is to notice one of them again.

Here is the one-minute tool for that, worth keeping long after this course: stand in a room's doorway and answer four questions. What blocks the path? What does the seat or bed look at? What has not moved in a year? Which corner does the eye avoid? The room's answers are your to-do list, and the audit costs sixty seconds.

## Why a small clearance, not a purge

A purge is exciting for an afternoon and abandoned by evening. A single real clearance is small enough to actually finish, and finishing is what changes how a room feels. One cleared surface you can keep clear teaches the room a new habit. That is worth more than ten started and unfinished.

## Today's one task

Clear one catch-all completely, in 10 to 20 minutes. Choose a single surface or one drawer, not a whole room. Empty it. Put back only what truly belongs there. Everything else gets a real home, the bin, or a give-away pile. The goal is one surface that is genuinely clear, not a half-sorted heap.

One finished clearance beats a house half-turned-out. Stop there for today, and notice tomorrow how that one cleared spot feels.`,
    },
    {
      day: 7,
      subject: "Day 7: keep one thing",
      preheader:
        "A reset is a rhythm, not a finish line. Pick one change worth keeping.",
      body: `You made it to the end of the week. Take a breath and look back at what you touched: the entrance, the bedroom, the kitchen, the air and light, a corner or two that had quietly drifted. None of it was dramatic. That is the point. Small, steady attention does more for a home than one big overhaul ever could.

Here is the thing worth carrying forward. A reset is not an event you finish. It is a rhythm you return to. Rooms gather clutter, stale air, and friction again, the way they always have. The skill you have been practising this week is simply noticing, then making one small adjustment in response. That habit is yours now, and it travels with you into every room and every season.

So I am not going to ask you to keep all of it. That is how good intentions quietly collapse. Instead, pick the one change that felt best. The window you started opening each morning. The cleared spot by the door. The made bed. Whatever gave you the small lift you noticed without trying. Keep that one. Let the rest be optional.

## A gentle way to test it

If you want to see what a kept change does, leave it in place for a full week, untouched. Do not measure it, grade it, or interrogate it. Just live alongside it. Treat a room as something you are in relationship with, not a machine to optimise. So instead of asking "is this working," let the week pass and simply notice, in an offhand way, whether the room feels a little easier to be in. The plain version is this: where you put your attention shapes what you see, and a small change held steady gives your attention somewhere good to land. That is enough.

## Today's one task

Choose the single change from this week that felt best, and commit to keeping it. Say it out loud, or write it down in one line on whatever is nearest. Naming it is what makes it stick. Ten minutes is plenty.

That is the whole reset: notice, adjust, return. When you are ready for the next round, pick a room or a corner you did not get to this week, and let it be the place you tend when the rhythm comes back around.

If you ever want to go a layer deeper, the free Kua calculator on the site offers a direction-based reading personal to you, for whenever you feel like exploring further.

Thank you for spending the week with me. Your home is not a project to complete. It is a place that holds you, and now you know how to keep meeting it well.`,
    },
  ],
};

/** Look up a course by slug. */
export function findCourse(slug: string): Course | null {
  if (slug === SEVEN_DAY_RESET.slug) return SEVEN_DAY_RESET;
  return null;
}

/** The email for a given day of a course, or null. */
export function courseEmailForDay(course: Course, day: number): CourseEmail | null {
  return course.emails.find((e) => e.day === day) ?? null;
}
