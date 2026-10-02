#!/usr/bin/env python3
"""Generate the Alec Visuals favicon set: gradient AV monogram on dark."""
import os
from PIL import Image, ImageDraw, ImageFont

OUT = "public"
FONT = "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf"

ORANGE = (255, 122, 24)
ORANGE_LT = (255, 164, 92)
BLUE = (46, 107, 255)
BLUE_LT = (111, 160, 255)
DARK = (5, 8, 15)
CARD = (11, 18, 32)


def lerp(a, b, t):
    return tuple(round(a[i] + (b[i] - a[i]) * t) for i in range(3))


def gradient(size, c0, c1, c2):
    """Diagonal orange -> blue gradient (matching the site's .grad-text)."""
    g = Image.new("RGB", (size, size))
    px = g.load()
    span = 2.0 * (size - 1)
    for y in range(size):
        for x in range(size):
            t = (x + y) / span
            # 0 -> 0.5 : orange to light orange, 0.5 -> 1 : blue
            if t < 0.34:
                px[x, y] = lerp(c0, c1, t / 0.34)
            elif t < 0.72:
                px[x, y] = lerp(c1, c2, (t - 0.34) / 0.38)
            else:
                px[x, y] = lerp(c2, BLUE_LT, (t - 0.72) / 0.28)
    return g


def rounded_mask(size, radius):
    m = Image.new("L", (size, size), 0)
    ImageDraw.Draw(m).rounded_rectangle((0, 0, size - 1, size - 1), radius=radius, fill=255)
    return m


def make_icon(size, radius_ratio=0.22, text_ratio=0.70, border=True):
    S = size
    ss = 4  # supersample for smooth edges

    # --- background ---
    bg = Image.new("RGBA", (S * ss, S * ss), (0, 0, 0, 0))
    d = ImageDraw.Draw(bg)
    d.rounded_rectangle(
        (0, 0, S * ss - 1, S * ss - 1), radius=int(S * ss * radius_ratio), fill=CARD + (255,)
    )

    # --- gradient layer ---
    grad = gradient(S * ss, ORANGE, ORANGE_LT, BLUE).convert("RGBA")

    # --- monogram mask ---
    mask = Image.new("L", (S * ss, S * ss), 0)
    md = ImageDraw.Draw(mask)
    font_size = int(S * ss * text_ratio * 0.92)
    font = ImageFont.truetype(FONT, font_size)
    text = "AV"
    bbox = font.getbbox(text)
    tw, th = bbox[2] - bbox[0], bbox[3] - bbox[1]
    # Optically centre the glyphs
    cx = (S * ss - tw) / 2 - bbox[0]
    cy = (S * ss - th) / 2 - bbox[1]
    md.text((cx, cy), text, font=font, fill=255)

    # Tighten the glyphs so "AV" reads as one mark
    mask = mask.resize((S * ss, S * ss))
    comp = Image.composite(grad, bg, mask)
    out = Image.composite(comp, bg, mask) if False else comp

    # composite gradient glyph onto background
    base = bg.copy()
    base.paste(grad, (0, 0), mask)
    out = base

    # --- inner hairline for a bit of depth ---
    if border:
        ring = Image.new("L", (S * ss, S * ss), 0)
        ImageDraw.Draw(ring).rounded_rectangle(
            (0, 0, S * ss - 1, S * ss - 1),
            radius=int(S * ss * radius_ratio),
            outline=255,
            width=max(1, int(S * ss * 0.022)),
        )
        ring = Image.composite(ring, Image.new("L", ring.size, 0), mask.point(lambda v: 0 if v > 0 else 255))
        out.paste(grad, (0, 0), ring)

    out = out.resize((S, S), Image.LANCZOS)
    # Ensure rounded corners stay transparent
    out.putalpha(Image.composite(out.getchannel("A"), Image.new("L", (S, S), 0), rounded_mask(S, int(S * radius_ratio))))
    return out


os.makedirs(OUT, exist_ok=True)

sizes_png = [16, 32, 48, 64, 128, 180, 192, 512]
made = []
for s in sizes_png:
    img = make_icon(s)
    name = {
        180: "apple-touch-icon.png",
        192: "icon-192.png",
        512: "icon-512.png",
        48: "favicon-48x48.png",
    }.get(s, f"favicon-{s}x{s}.png")
    img.save(os.path.join(OUT, name))
    made.append((name, s))

# favicon.ico (multi-resolution)
ico = Image.open(os.path.join(OUT, "favicon-32x32.png"))
ico.save(
    os.path.join(OUT, "favicon.ico"),
    format="ICO",
    sizes=[(16, 16), (32, 32), (48, 48)],
)

# site favicon (used as the in-page logo mark)
make_icon(512).save(os.path.join(OUT, "logo.png"))

print("Generated:")
for n, s in made:
    p = os.path.join(OUT, n)
    print(f"  {n:26} {s}x{s}  {os.path.getsize(p)}b")
print(f"  {'favicon.ico':26} 16/32/48  {os.path.getsize(os.path.join(OUT,'favicon.ico'))}b")