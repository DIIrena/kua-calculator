# Photo plates for the premium PDF design

Drop the approved Nano Banana Pro images here, JPEG only, named EXACTLY:

```
cover.jpg                    portrait 4:5
intro.jpg                    landscape 3:2
closing.jpg                  landscape 3:2
pillar-wealth.jpg            landscape 3:2
pillar-fame.jpg              landscape 3:2
pillar-relationships.jpg     landscape 3:2
pillar-creativity.jpg        landscape 3:2
pillar-helpful-people.jpg    landscape 3:2
pillar-career.jpg            landscape 3:2
pillar-knowledge.jpg         landscape 3:2
pillar-family.jpg            landscape 3:2
pillar-health.jpg            landscape 3:2
```

Prompts:
- Nine Life Areas plates + shared cover: `spec/image-prompts-nine-areas-v2-2026-07-22.md`
  (current, knowledge-base grounded + owner art direction). Earlier version
  kept for comparison: `spec/image-prompts-nine-areas-2026-07-21.md`.
- Per-product covers: `spec/image-prompts-product-covers-2026-07-24.md`.
  Drop as `cover-<product-slug>.jpg`; the template prefers it over the
  shared `cover.jpg`. Slugs: personal-compass, extended-personal-kua,
  all-twelve-spaces-compass, complete-home-compass.
- Twelve Spaces room plates: `spec/image-prompts-twelve-spaces-2026-07-24.md`.
  Filenames match the room block IDs (room-bedroom, space-kitchen, ...).
  Keep these lean (~130KB each): the Complete Home Compass renders them
  plus the nine area plates and is close to Vercel's 4.5MB limit, and the
  2.5MB folder cap counts every JPEG here.

Export: quality ~70-80, longest edge ~1600px, target 250KB or less per
file, 2.5MB or less for the whole folder (smoke-enforced). The PDF
renders with identical page counts whether these files exist or not;
missing plates fall back to a calm sand band with the sector's element
icon, so partial delivery is fine.
