#!/usr/bin/env python
"""Build the Whole-Home Bundle shop card: the three real component covers
(Diagnostic / Ritual / Cures) fanned like a set on a soft sand background.
Run: uv run --no-project --with pillow python scripts/build_bundle_cover.py
Output: public/products/whole-home-starter-bundle/cover-mockup.png
"""
from PIL import Image, ImageFilter, ImageDraw
import os

SIZE = 1100
OUT = "public/products/whole-home-starter-bundle/cover-mockup.png"
COVERS = ["home-diagnostic-workbook", "daily-ritual-pack", "cures-catalog"]  # AUDIT, RITUAL (front), CURES

bg = Image.new("RGB", (SIZE, SIZE), "#efe8d8")
hi = Image.new("RGB", (SIZE, SIZE), "#f7f2e6")
m = Image.new("L", (SIZE, SIZE), 0)
ImageDraw.Draw(m).ellipse((SIZE * 0.1, SIZE * 0.08, SIZE * 0.9, SIZE * 0.92), fill=255)
bg = Image.composite(hi, bg, m.filter(ImageFilter.GaussianBlur(95)))

BH = int(SIZE * 0.52)

def book(slug):
    c = Image.open(f"public/products/{slug}/cover-portrait.png").convert("RGB")
    bw = int(BH * c.width / c.height)
    c = c.resize((bw, BH), Image.LANCZOS)
    fr = Image.new("RGB", (bw + 2, BH + 2), "#d8cdb4")
    fr.paste(c, (1, 1))
    return fr

def stamp(base, img, angle, cx, cy):
    r = img.rotate(angle, expand=True, resample=Image.BICUBIC)
    sil = Image.new("L", img.size, 255).rotate(angle, expand=True, resample=Image.BICUBIC)
    ox, oy = cx - r.width // 2, cy - r.height // 2
    sh = Image.new("RGBA", base.size, (0, 0, 0, 0))
    sh.paste(Image.new("RGBA", r.size, (25, 35, 28, 140)), (ox + 12, oy + 18), sil)
    sh = sh.filter(ImageFilter.GaussianBlur(17))
    base.paste(sh, (0, 0), sh)
    base.paste(r, (ox, oy), sil)

C = SIZE // 2
stamp(bg, book(COVERS[0]), 13, C - 138, C + 30)   # AUDIT, back-left
stamp(bg, book(COVERS[2]), -13, C + 138, C + 30)  # CURES, back-right
stamp(bg, book(COVERS[1]), 0, C, C - 10)          # RITUAL, front-centre

bg.save(OUT, "PNG", optimize=True)
print("wrote", OUT, round(os.path.getsize(OUT) / 1024), "KB")
