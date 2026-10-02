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
OUT_SIZE = 512

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


def normalize_alpha(alpha: Image.Image, lo: int = 24, percentile: float = 0.995) -> Image.Image:
    """
    Stretch the matte so the solid core of the artwork reaches full opacity.

    The deviation-based alpha is relative, so the darkest ink only ever lands
    around 70-75% opacity. Left alone, a white mark knocked out through that
    matte looks washed out and slightly transparent on the page. Stretching
    against a high percentile keeps the anti-aliased edge falloff while
    pinning the interior to 255.
    """
    hist = alpha.histogram()
    total = sum(hist)
    target = total * percentile
    running = 0
    peak = 255
    for value, count in enumerate(hist):
        running += count
        if running >= target:
            peak = max(value, 1)
            break

    # Ignore the faint halo when deciding the floor, so a low-alpha ring does
    # not drag the visible edge down.
    solid = alpha.point(lambda v: 255 if v >= max(lo, peak // 3) else 0)
    solid_px = solid.histogram()[255]
    if solid_px < 64:
        return alpha

    gain = 255.0 / max(peak - lo, 1)
    return alpha.point(lambda v: 0 if v < lo else min(255, int((v - lo) * gain)))


def tight_bbox(alpha: Image.Image, threshold: int = 128, pad_ratio: float = 0.04):
    """
    Bounding box of the actual artwork.

    `alpha.getbbox()` is useless here: the background removal always leaves a
    faint halo, so the box covers the whole canvas and the mark ends up tiny
    inside a mostly-empty image. Thresholding first finds the real ink.
    """
    solid = alpha.point(lambda v: 255 if v >= threshold else 0)
    box = solid.getbbox()
    if box is None:
        return (0, 0, alpha.width, alpha.height)

    x0, y0, x1, y1 = box
    pad = int(max(x1 - x0, y1 - y0) * pad_ratio)
    return (
        max(0, x0 - pad),
        max(0, y0 - pad),
        min(alpha.width, x1 + pad),
        min(alpha.height, y1 + pad),
    )


def main() -> None:
    img = Image.open(SRC).convert("RGB")
    bg = estimate_background(img, BG_CUTOFF)
    alpha = normalize_alpha(build_alpha(img, bg))

    # Crop both variants to the SAME box so the mark is framed identically in
    # either theme and the header does not resize when the toggle flips.
    box = tight_bbox(alpha)
    alpha_c = alpha.crop(box)
    light = img.crop(box)

    # The source mark is near-black (mean luminance ~54/255), so simply
    # removing the background leaves artwork that disappears into the #05080F
    # dark surface. For dark mode the mark is knocked out to solid white,
    # which is the standard reversed-out variant and keeps every internal
    # detail of the drawing intact.
    white = Image.new("RGB", alpha_c.size, (255, 255, 255))
    dark = white.convert("RGBA")
    dark.putalpha(alpha_c)

    # The mark is displayed up to ~160px wide; 512 stays crisp on high-DPI
    # screens at a fraction of the weight.
    if max(dark.size) > OUT_SIZE:
        scale = OUT_SIZE / max(dark.size)
        size = (max(1, round(dark.width * scale)), max(1, round(dark.height * scale)))
        dark = dark.resize(size, Image.LANCZOS)
        light = light.resize(size, Image.LANCZOS)

    dark.save(DST, optimize=True)
    light.save(LIGHT_DST, optimize=True)

    a = dark.split()[3]
    hist = a.histogram()
    total = dark.width * dark.height
    transparent, opaque = hist[0], hist[255]
    print(f"wrote {DST}  {dark.size[0]}x{dark.size[1]} RGBA  (white mark, transparent bg)")
    print(f"wrote {LIGHT_DST}  {light.size[0]}x{light.size[1]} RGB  (background kept)")
    print(f"  crop box          : {box}  (source {img.width}x{img.height})")
    print(f"  fully transparent : {transparent / total * 100:5.1f}%")
    print(f"  fully opaque       : {opaque / total * 100:5.1f}%")
    print(f"  partial (antialias): {(total - transparent - opaque) / total * 100:5.1f}%")


if __name__ == "__main__":
    main()
