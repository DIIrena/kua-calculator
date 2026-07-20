# Walkthrough: look-inside previews for every product (P5)

You said you want to review all imagery before it ships. Everything below
renders into `scripts\out\previews` for your eyes only; nothing touches the
live site until the install steps at the end.

## Part A - The bundle cover (2 minutes, ready now)

1. Open `projects\kua-calculator\scripts\out\previews\` in File Explorer.
2. Double-click `whole-home-starter-bundle-cover-mockup.png`. It is the three
   real component covers fanned as a stack on the same background as the
   other shop cards.
3. Happy with it? Tell Claude "install the bundle cover" (or run
   `node scripts/build-bundle-cover.mjs --install` yourself). The bundle card
   stops being the one bare tile on the shelf.

## Part B - Sample books for the personalised products (10 minutes)

1. Open a terminal in VS Code and start the site locally:
   `cd "c:\Users\User\Documents\IRENA\AI AUTOMATION\my-claude-workspace\projects\kua-calculator"`
   then `npm run dev` and wait for `Ready`.
2. Open a SECOND terminal (keep the first one running) and run:
   `cd "c:\Users\User\Documents\IRENA\AI AUTOMATION\my-claude-workspace\projects\kua-calculator"`
   then `node scripts/render-sample-previews.mjs`
3. Five sample PDFs land in `scripts\out\previews\` (sample buyer "Ana",
   Kua 8, West group), each with the new premium finish: framed cover,
   chapter closers, and the cut-out keepsake card at the back.
4. Review each PDF. For every product, tell Claude which 3 pages should be
   the public look-inside (for example: "personal compass: cover, the
   at-a-glance page, the bed placement page").
5. Claude then produces the three page images per product, you approve them
   once more, and only then do they go into `public/products/` and appear
   on the product pages via the existing ProductPreview component.

## What this unlocks

Look-inside previews are the strongest single conversion asset a digital
product page can carry: the buyer sees exactly what arrives. Today only 4
of the visible products show real interiors; after this pass, all of them do.
