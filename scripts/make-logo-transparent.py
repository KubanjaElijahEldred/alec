"""
Background removal for Alec's logo.

The supplied logo.png is a fully opaque, square image on a very light
blue-white gradient background. This script builds a dark-mode variant
whose background is genuinely transparent (alpha = 0), so the mark sits
cleanly on the dark navy background instead of showing a pale box.

Method
------
1. Estimate the smooth background by repeatedly blurring the image and
   re-injecting only the background-ish (very light) pixels. A few passes
   converge on the underlying gradient, even though the artwork is large
   and centred.
2. Derive a per-pixel alpha from how far each pixel deviates from that
   estimated background, taken as the max deviation across R/G/B. This
   keeps anti-aliased edges as partial alpha instead of hard-cutting
   them, and stops genuinely dark artwork from being eaten.
3. Keep the original RGB and only vary alpha. The background is nearly
   neutral (within ~15 levels of white), so the residual tint error is
   imperceptible and avoids colour fringing on the edges.

The source file is never modified.
"""

from PIL import Image, ImageChops, ImageFilter

SRC = "logo.png"
DST = "public/logo-dark.png"
LIGHT_DST = "public/logo.png"
OUT_SIZE = 320

# Pixels brighter than this (0-255 luminance) are treated as background
# when estimating the gradient.
BG_CUTOFF = 200


def estimate_background(img: Image.Image, cutoff: int, passes: int = 10) -> Image.Image:
    """Recover the smooth light gradient sitting behind the artwork."""
    lum = img.convert("L")
    # Pixels that are definitely background.
    mask = lum.point(lambda v: 255 if v > cutoff else 0)

    radius = max(3, min(img.size) // 11)

    # Seed with a wide blur so the opaque artwork does not poison the very
    # first estimate. Seeding with the original image would leave dark
    # artwork baked into the "background" forever.
    bg = img.filter(ImageFilter.GaussianBlur(radius * 3))

    for _ in range(passes):
        blurred = bg.filter(ImageFilter.GaussianBlur(radius))
        # Known-background pixels follow the blur; the rest keep their
        # current estimate so the artwork is never smeared into the result.
        bg = Image.composite(blurred, bg, mask)
    return bg


def build_alpha(img: Image.Image, bg: Image.Image) -> Image.Image:
    """Alpha = largest per-channel gap between pixel and estimated bg."""
    # Channel-wise absolute deviation, then take the max across channels.
    bands = []
    for band in range(3):
        i = img.split()[band]
        b = bg.split()[band]
        # Absolute difference either way, so no artwork is lost if it is
        # ever brighter than the background it sits on.
        bands.append(ImageChops.difference(i, b))
    deviation = ImageChops.lighter(ImageChops.lighter(bands[0], bands[1]), bands[2])

    # Normalise by local background brightness so a bright edge on a
    # lighter part of the gradient is treated the same as a dark edge.
    # Built as an explicit LUT rather than a per-value division.
    scale_lut = [0] * 256
    for v in range(256):
        denom = v if v > 48 else 48
        scale_lut[v] = min(255, 65025 // denom)  # 255 * 255 / v
    scale = bg.convert("L").point(scale_lut)
    alpha = ImageChops.multiply(deviation.convert("L"), scale)

    # Firm up the matte. A floor of ~30 removes the residual halo left by
    # the background's radial glow while still keeping the artwork's own
    # anti-aliased edges as a soft gradient rather than a hard cut.
    return alpha.point(
        lambda v: 0 if v < 30 else min(255, int((v - 30) * 1.20))
    )


def main() -> None:
    img = Image.open(SRC).convert("RGB")
    bg = estimate_background(img, BG_CUTOFF)
    alpha = build_alpha(img, bg)

    matted = img.copy()
    matted.putalpha(alpha)

    # Crop both variants to the SAME box, derived from the artwork itself,
    # so the mark is framed identically in either theme and the header does
    # not resize when the toggle flips.
    bbox = matted.getbbox() or (0, 0, img.width, img.height)
    dark = matted.crop(bbox)
    light = img.crop(bbox)

    # The mark is displayed at most ~96px wide; 512 keeps it crisp on
    # high-DPI screens at a fraction of the weight.
    if max(dark.size) > OUT_SIZE:
        dark = dark.resize((OUT_SIZE, OUT_SIZE), Image.LANCZOS)
        light = light.resize((OUT_SIZE, OUT_SIZE), Image.LANCZOS)

    dark.save(DST, optimize=True)
    light.save(LIGHT_DST, optimize=True)

    a = dark.split()[3]
    hist = a.histogram()
    total = dark.width * dark.height
    transparent = hist[0]
    opaque = hist[255]
    print(f"wrote {DST}  {dark.size[0]}x{dark.size[1]} RGBA  (transparent background)")
    print(f"wrote {LIGHT_DST}  {light.size[0]}x{light.size[1]} RGB  (background kept)")
    print(f"  fully transparent : {transparent / total * 100:5.1f}%")
    print(f"  fully opaque       : {opaque / total * 100:5.1f}%")
    print(f"  partial (antialias): {(total - transparent - opaque) / total * 100:5.1f}%")


if __name__ == "__main__":
    main()
