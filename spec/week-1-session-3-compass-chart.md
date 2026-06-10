# Week 1 Session 3: Compass chart refinement in Illustrator

**File:** `Desktop/MFSH Pins/01 Compass Chart/compass-chart.svg`
**Artboard:** 1000 x 1500 px
**Middle work area:** y=385 to y=1387.7 (1002.7 px tall, 1000 px wide)
**Palette:** ivory `#fcfcf8`, pool-table green `#0e3b2c`, true orange `#d9531a` (logo and y=385 divider only)
**Type:** EB Garamond Bold throughout
**Time budget:** Parts A through G = 55 to 70 minutes. Part H (Pinterest publish) = 5 to 10 minutes, separate.

The starter SVG is already populated with the brand layout (green top block + orange logo + ivory two-line title + orange divider at y=385 + ivory middle + green bottom block + ivory URL), plus the pre-positioned compass rose, East/West group labels and Kua numbers, and the vertical East/West divider through the rose. You refine, not rebuild.

---

## Part A. Open the starter and confirm the layout (5 min)

1. Open `Desktop/MFSH Pins/01 Compass Chart/compass-chart.svg` in Illustrator. Set view to `Fit Artboard in Window`.
2. Open the Layers panel. Confirm these layers exist (or organise into them): `Title`, `Compass Rose`, `Group Labels`, `Kua Numbers`, `Divider y385`, `Logo`, `URL`, `Background Blocks`. If the SVG comes in flat, group + name now; do not edit pixels yet.
3. Lock `Background Blocks`, `Divider y385`, `Logo`, `URL`. Leave the middle four layers unlocked.
4. Turn on Smart Guides (`Cmd/Ctrl+U`) and rulers (`Cmd/Ctrl+R`). Set units to pixels (right-click ruler).
5. Drop a guide at x=500 (vertical center) and at y=886.35 (the compass rose center).

How to know it worked: artboard fills the window; the orange divider sits crisply on y=385; the ivory band reads clean from y=385 to y=1387.7; the compass rose sits centred around (500, 886.35) with all 8 direction labels legible.

Gotchas: if the starter rose comes in as one grouped object, run `Object > Ungroup` once so circle, spokes, and labels are independently editable. Do not Ungroup twice or you will scatter the label group. If guides drift after zooming, `View > Lock Guides`.

---

## Part B. Confirm the title text (5 min)

The starter title already reads `Your Kua Number` on line 1 and `and Your Four Directions` on line 2. Verify the spec is correct, do not retype if the text imports clean.

1. Unlock the `Title` layer. Select the title text object(s).
2. Confirm string: line 1 `Your Kua Number`, line 2 `and Your Four Directions`.
3. Confirm spec: EB Garamond Bold, 48pt each line, fill ivory `#fcfcf8`, no stroke, tracking 0, leading approximately 65pt. Paragraph align center.
4. Centre the title block horizontally on x=500. Vertically, line 1 baseline ~y=270, line 2 baseline ~y=335. The bottom of line 2 sits roughly 50 px above the orange divider for breathing room.
5. If the title imports as one continuous string instead of two lines, insert a soft return between `Number` and `and`.

How to know it worked: both lines are fully visible inside the green top block, neither line touches the logo above nor the orange divider below.

Gotchas: if the second line feels cramped, bump leading to 70pt rather than shrinking the point size. Do not switch to Regular or SemiBold for fit; keep Bold. Watch for a stray space before or after the string; it throws center alignment off.

---

## Part C. Refine the compass rose geometry (15 to 25 min)

The starter has the circle, 8 spokes, the vertical East/West divider, and 8 direction labels already at their correct positions. Verify everything matches, adjust where needed.

1. Main circle: centred on (500, 886.35), diameter 620 px (radius 310). Stroke `#0e3b2c`, weight 3 pt, no fill, stroke aligned to center, round caps, round joins.
2. Spokes: 8 line segments radiating from (500, 886.35) at 0, 45, 90, 135, 180, 225, 270, 315 degrees. Each spoke runs from the center out to the circle edge (length 310 px). Stroke `#0e3b2c`.
   - Cardinal spokes (N, E, S, W): 2 pt stroke, round caps and joins.
   - Ordinal spokes (NE, SE, SW, NW): 1 pt stroke, round caps and joins.
   - Snap endpoints exactly to the circle using Smart Guides; do not let them overshoot or undershoot.
3. East/West divider: vertical line from (500, 511.35) to (500, 1261.35). That extends 65 px above and 65 px below the circle so the East/West axis reads beyond just the rose. Stroke `#0e3b2c`, 2 pt, round caps. Place on the `Compass Rose` layer ABOVE the spokes so it visually merges with the N and S cardinal spokes inside the circle.
4. Direction labels: confirm each label is EB Garamond Bold 28pt, fill `#0e3b2c`, no stroke, tracking 25. Position each label just outside the circle along its spoke axis:
   - N: centred at (500, 540)
   - NE: centred at (745, 615)
   - E: centred at (845, 895)
   - SE: centred at (745, 1157)
   - S: centred at (500, 1232)
   - SW: centred at (255, 1157)
   - W: centred at (155, 895)
   - NW: centred at (255, 615)
   Baselines sit roughly 30 px from the circle edge along each axis.
5. Center dot: filled circle, diameter 10 px, fill `#0e3b2c`, no stroke, centred on (500, 886.35). Place on top of the spokes so the radiating lines visually originate from a single point.

How to know it worked: the circle reads as the calm container; the cardinal spokes (N/E/S/W) clearly dominate the ordinal spokes (NE/SE/SW/NW); the vertical East/West divider is visibly the strongest vertical element through the rose; all 8 labels sit at consistent distance from the circle; there is no orange anywhere in the rose.

Gotchas: stroke alignment defaults to center but check it; outside or inside alignment will throw the diameter off by 1.5 px and the spokes will not meet the edge cleanly. Round caps matter on the spokes; butt caps make the endpoints look chopped where they meet the circle. If a spoke looks visually shorter than its neighbors, it is probably 0.5 to 1 px off center; re-snap to (500, 886.35) numerically in the Transform panel rather than dragging.

---

## Part D. East Group label and Kua numbers 1, 3, 4, 9 (10 min)

The East Group lives on the LEFT half of the ivory band, above the rose.

1. East Group label: EB Garamond Bold 36pt, fill `#0e3b2c`, tracking 50, paragraph align center. String `East Group`. Centred at (250, 450). This sits in the ivory band above the rose, on the left half, comfortably below the orange divider (y=385) with about 35 px of breathing room above the cap height.
2. Kua numbers: each number is its own point-text object, EB Garamond Bold 48pt, fill `#0e3b2c`, paragraph align center. Arrange the four numbers in a single horizontal row underneath the East Group label, evenly spaced on the left half of the artboard.
   - `1` centred at (115, 520)
   - `3` centred at (205, 520)
   - `4` centred at (295, 520)
   - `9` centred at (385, 520)
   All four baselines align. Spacing is even (90 px on center). Average x = 250, matching the label.
3. Select all four numbers plus the label, group as `East Group Cluster` on the `Group Labels` layer (numbers can live on the `Kua Numbers` sublayer if you prefer, but keep them grouped for nudging).
4. The cluster sits ABOVE the compass rose in the upper-left quadrant of the ivory band. The rose top is at y=576.35, so the cluster occupies roughly the top 100 px of the 190 px of clean ivory between the orange divider and the rose top edge.

How to know it worked: `East Group` reads as the header; the four numbers read as a clean row beneath it; the whole cluster sits comfortably on the left half without crowding the title above or the rose below; nothing crosses the x=500 vertical centerline.

Gotchas: 48pt single-digit numbers have visually different widths (`1` is narrow, `4` is wide). Centre-align each text object on its own coordinate; do not rely on equal bounding-box spacing or `1` will look adrift. If the cluster looks heavy compared to the rose, do not shrink the type; instead bump the label-to-numbers gap to 75 px so the group breathes.

---

## Part E. West Group label and Kua numbers 2, 5, 6, 7, 8 (10 min)

Mirror of Part D on the RIGHT half. West Group has five numbers instead of four, so spacing tightens slightly.

1. West Group label: EB Garamond Bold 36pt, fill `#0e3b2c`, tracking 50, paragraph align center. String `West Group`. Centred at (750, 450). Mirrors the East label across x=500.
2. Kua numbers in a horizontal row beneath, EB Garamond Bold 48pt, fill `#0e3b2c`, paragraph align center.
   - `2` centred at (620, 520)
   - `5` centred at (685, 520)
   - `6` centred at (750, 520)
   - `7` centred at (815, 520)
   - `8` centred at (880, 520)
   Five numbers, 65 px on center. Baselines align with the East row at y=520. Average x = 750, matching the label.
3. Group as `West Group Cluster`. Lives on the `Group Labels` layer (or `Kua Numbers` sublayer for the digits).
4. Quick symmetry check: select both clusters, open the Align panel, confirm vertical alignment of label baselines and number baselines across the two clusters. The East and West labels should sit at identical y. The numbers should sit at identical y.

How to know it worked: East and West clusters read as a matched pair across the vertical centerline; the five West numbers feel as composed as the four East numbers despite the tighter spacing; nothing crosses x=500.

Gotchas: with five numbers at 48pt and 65 px spacing, the West row spans 260 px versus the East row's 270 px. That is fine; do not stretch West to match East width or the spacing will look loose. If the West row feels visually denser, that is the truth of the content (five versus four) and is acceptable. Do not shrink 48pt to compensate.

---

## Part F. Final visual pass and balance check (5 to 10 min)

1. Zoom to `Fit Artboard`. Step back from the screen.
2. Read the page top to bottom: green top block with logo and two-line title, orange divider, East Group cluster on the left and West Group cluster on the right, compass rose with vertical East/West divider, green bottom block with URL.
3. Confirm colour discipline: only the logo and the y=385 divider use orange. The rose, all labels, the title, and all numbers are ivory on green or green on ivory. No orange leaks.
4. Confirm typography: every text element is EB Garamond Bold. No accidental Regular, no accidental Italic. Use `Type > Find Font` if you want to be sure.
5. Confirm no element crosses block boundaries: nothing in the ivory band crosses y=385 up or y=1387.7 down; nothing in the top or bottom green blocks bleeds into the ivory.
6. Pixel snap pass: select all (`Cmd/Ctrl+A`), then with the Selection tool, look at the Transform panel coordinates. Anything ending in .3 or .7 that should be on a whole pixel, nudge into place. The rose center stays at (500, 886.35) by design.
7. Save (`Cmd/Ctrl+S`) over the working `compass-chart.svg`. Optionally `File > Save a Copy` as `compass-chart-v1.ai` so you have an Illustrator-native editable archive.

How to know it worked: the page reads as one composition, not three stacked layers; the vertical East/West divider through the rose is the loudest organising element after the title; the page passes the squint test (recognisable hierarchy at 25 percent zoom).

Gotchas: if anything looks subtly off-center, it almost always is; trust Transform panel numbers over your eye. If the title and the East/West labels feel like they are competing, the label tracking is probably too tight; bump label tracking from 50 to 75. Do not reduce the title.

---

## Part G. Export 1000x1500 PNG (5 min)

1. Create the folder `Desktop/MFSH Pins/01 Compass Chart/exports/` if it does not exist yet.
2. `File > Export > Export As`. Navigate to that exports folder.
3. Filename: `compass-chart-2026-06-10.png` (use the actual date). Format: PNG. Tick `Use Artboards`. Click `Export`.
4. PNG Options: Resolution 72 ppi (Screen), Background Color White (irrelevant since the design fills the artboard), Anti-aliasing Art Optimised, Interlaced off. Click `OK`.
5. Verify the file: open it in Preview/Photos. Confirm dimensions are exactly 1000 x 1500. Confirm the orange divider is sharp, the rose strokes are crisp, no transparency on the green blocks.
6. If anything looks soft, re-export at 144 ppi (Medium) and compare; pick the sharper file.

How to know it worked: the file exists at `01 Compass Chart/exports/compass-chart-2026-06-10.png`, dimensions read 1000 x 1500, file weight is in the 200 to 600 KB range, and zoomed to 100 percent in Preview the strokes are clean with no jaggies.

Gotchas: if you forget `Use Artboards`, Illustrator will export the bounding box of the artwork instead and you will get a non-1000x1500 file. If the exported PNG shows a hairline white edge on one side, the artboard is slightly larger than the background blocks; fix by extending the green and ivory rectangles a px or two past the artboard edge and re-exporting.

---

## Part H. Publish to Pinterest on the Compass School Basics board (5 to 10 min)

1. Open `pinterest.com`. Confirm you are logged into the `myfengshuihome` account.
2. Go to the `Compass School Basics` board (created in Session 1).
3. Click `Create Pin`. Upload `01 Compass Chart/exports/compass-chart-2026-06-10.png`.
4. Pin title: `Your Kua Number and Your Four Directions`.
5. Pin description (paste this verbatim, under 500 characters, calm voice, no manifestation language):

   ```
   A simple chart of the four supportive directions for each Kua number. East Group is 1, 3, 4, 9. West Group is 2, 6, 7, 8. Free calculator at myfengshuihome.com.
   ```

6. Destination link: `https://myfengshuihome.com/guide/compass-school/find-your-kua-number`.
7. Board: `Compass School Basics`. Click `Publish`.
8. Open the live pin in a private browser window. Confirm the image renders at full resolution, the title and description read correctly, and the destination link resolves to the live guide page (not a 404).
9. Log the pin URL in `pinterest-analytics-baseline.md` (or whichever tracker you keep) along with date and board.

How to know it worked: the pin appears on the `Compass School Basics` board, the image is sharp on both desktop and mobile preview, the destination link opens `/guide/compass-school/find-your-kua-number`, and the pin URL is saved.

Gotchas: Pinterest sometimes downscales the image but never upscales; always upload the full 1000x1500. If the destination URL 404s, do not publish; check the route first. Do not pin without a destination link; an orphan pin wastes the impression.

---

## Time totals

| Phase | Time |
|---|---|
| Parts A through G (Illustrator) | 55 to 70 min |
| Part H (Pinterest publish) | 5 to 10 min |
| Total session 3 | 60 to 80 min |

Calendar window for Session 3 (combined with Claude's Part B SEO on his side) is 120 to 150 min. Owner's hands-on time is ~70 min; Claude's SEO commit on the find-your-kua-number page is the other half (already shipped at `e9cd283`).

---

## When this session is done

Tell Claude `Session 3 done` when:

1. The compass-chart.svg has been refined per Parts A through G and re-saved.
2. The PNG export exists at `01 Compass Chart/exports/compass-chart-2026-06-10.png`.
3. The pin is live on the `Compass School Basics` Pinterest board.

Claude will:
- Log the pin into `pinterest-analytics-baseline.md` (or queue creating that tracker if it does not exist).
- Mark Session 3 complete in the promotion calendar.
- Queue Week 1 recurring tasks (Reddit lurking on r/fengshui, account warm-up).
- Surface what Week 2 starts with (the floor-plan component and the southeast wealth pin).

Out of scope this session: any other pin (Sessions in Weeks 2-4), guide page content rewrites, payment work, Stripe, Lemon Squeezy, consultations.
