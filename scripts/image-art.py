"""
Generates the site's illustrative imagery as high-resolution WebP.

Artwork is authored as inline SVG and rendered with headless Chrome, then
converted to WebP with Pillow. Everything is drawn in the Alec Visuals
palette (deep navy surfaces, #FF7A18 orange, #2E6BFF azure) so the
generated images sit inside the existing design system rather than looking
like stock photography dropped on top of it.

Outputs (all into public/img/):
  tools.webp            hero strip  - the videography kit
  service-*.webp        one per service card
  services-hero.webp    services page art, faded on its left edge
"""

from __future__ import annotations

import subprocess
import tempfile
from pathlib import Path

from PIL import Image, ImageChops

OUT = Path("public/img")
TMP = Path(tempfile.gettempdir()) / "alec-img"
CHROME = "/usr/bin/google-chrome"

NAVY_0 = "#05080F"
NAVY_1 = "#0B1220"
NAVY_2 = "#111C30"
BLUE = "#2E6BFF"
BLUE_L = "#6FA0FF"
ORANGE = "#FF7A18"
ORANGE_L = "#FFA45C"
WHITE = "#FFFFFF"


def svg_defs(glow_id: str = "glow") -> str:
    """Shared gradients, glow filters and the grid texture."""
    return f"""
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="{NAVY_1}"/>
      <stop offset="55%" stop-color="{NAVY_0}"/>
      <stop offset="100%" stop-color="{NAVY_2}"/>
    </linearGradient>
    <linearGradient id="accent" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="{ORANGE}"/>
      <stop offset="55%" stop-color="{ORANGE_L}"/>
      <stop offset="100%" stop-color="{BLUE}"/>
    </linearGradient>
    <linearGradient id="cool" x1="0" y1="1" x2="1" y2="0">
      <stop offset="0%" stop-color="{BLUE}"/>
      <stop offset="100%" stop-color="{BLUE_L}"/>
    </linearGradient>
    <radialGradient id="pool" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="{ORANGE}" stop-opacity="0.5"/>
      <stop offset="60%" stop-color="{ORANGE}" stop-opacity="0.12"/>
      <stop offset="100%" stop-color="{ORANGE}" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="poolBlue" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="{BLUE}" stop-opacity="0.55"/>
      <stop offset="60%" stop-color="{BLUE}" stop-opacity="0.14"/>
      <stop offset="100%" stop-color="{BLUE}" stop-opacity="0"/>
    </radialGradient>
    <filter id="{glow_id}" x="-60%" y="-60%" width="220%" height="220%">
      <feGaussianBlur stdDeviation="14" result="b"/>
      <feMerge>
        <feMergeNode in="b"/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>
    <filter id="soft" x="-40%" y="-40%" width="180%" height="180%">
      <feGaussianBlur stdDeviation="26"/>
    </filter>
    <pattern id="grid" width="72" height="72" patternUnits="userSpaceOnUse">
      <path d="M72 0H0V72" fill="none" stroke="{BLUE_L}" stroke-opacity="0.09" stroke-width="1"/>
    </pattern>
  </defs>
  <rect width="100%" height="100%" fill="url(#bg)"/>
  <rect width="100%" height="100%" fill="url(#grid)"/>"""


def frame(design_w: int, design_h: int, body: str, out_w: int, out_h: int,
          glow_id: str = "glow", background: bool = True) -> str:
    base = svg_defs(glow_id) if background else f"""
  <defs>
    <linearGradient id="accent" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="{ORANGE}"/><stop offset="55%" stop-color="{ORANGE_L}"/>
      <stop offset="100%" stop-color="{BLUE}"/>
    </linearGradient>
    <linearGradient id="cool" x1="0" y1="1" x2="1" y2="0">
      <stop offset="0%" stop-color="{BLUE}"/><stop offset="100%" stop-color="{BLUE_L}"/>
    </linearGradient>
    <filter id="{glow_id}" x="-60%" y="-60%" width="220%" height="220%">
      <feGaussianBlur stdDeviation="12" result="b"/>
      <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
  </defs>"""
    # Artwork is authored in the design space; width/height only set the
    # rasterised output size, so the viewBox must stay in design units.
    return (
        f'<svg xmlns="http://www.w3.org/2000/svg" width="{out_w}" height="{out_h}" '
        f'viewBox="0 0 {design_w} {design_h}">{base}{body}</svg>'
    )


# --------------------------------------------------------------------------
# Shared drawing helpers (all coordinates in a 1000 x 1000 design space,
# scaled by the caller via the viewBox).
# --------------------------------------------------------------------------

def camera(cx: float, cy: float, s: float) -> str:
    """Cinema camera body with a lens, top handle and record light."""
    return f"""
  <g transform="translate({cx} {cy}) scale({s})" filter="url(#glow)">
    <rect x="-150" y="-62" width="300" height="150" rx="16" fill="{NAVY_2}" stroke="url(#accent)" stroke-width="5"/>
    <path d="M-150 -34h-40a10 10 0 0 0-10 10v50a10 10 0 0 0 10 10h40" fill="none" stroke="url(#accent)" stroke-width="5"/>
    <rect x="-62" y="-96" width="104" height="34" rx="8" fill="{NAVY_1}" stroke="{BLUE_L}" stroke-width="4"/>
    <circle cx="104" cy="-40" r="15" fill="{ORANGE}" filter="url(#glow)"/>
    <rect x="-140" y="-46" width="52" height="30" rx="6" fill="{NAVY_0}" stroke="{BLUE_L}" stroke-width="3"/>
    <g transform="translate(96 12)">
      <rect x="-6" y="-58" width="12" height="58" fill="{NAVY_1}" stroke="url(#cool)" stroke-width="4"/>
      <circle r="62" fill="{NAVY_0}" stroke="url(#cool)" stroke-width="7"/>
      <circle r="44" fill="none" stroke="{BLUE_L}" stroke-opacity="0.55" stroke-width="3"/>
      <circle r="24" fill="url(#cool)" fill-opacity="0.35" stroke="{BLUE_L}" stroke-width="3"/>
      <circle cx="-16" cy="-18" r="9" fill="{WHITE}" fill-opacity="0.35"/>
    </g>
  </g>"""


def tripod(cx: float, cy: float, s: float) -> str:
    return f"""
  <g transform="translate({cx} {cy}) scale({s})" stroke="url(#cool)" stroke-width="7"
     stroke-linecap="round" fill="none" filter="url(#glow)">
    <path d="M0 -70v58"/>
    <path d="M0 -12 -78 128M0 -12 78 128M0 -12 0 132"/>
    <path d="M-46 74h92"/>
    <rect x="-34" y="-96" width="68" height="30" rx="8" fill="{NAVY_2}"/>
    <circle cy="0" r="15" fill="{ORANGE}" stroke="none" filter="url(#glow)"/>
  </g>"""


def mic(cx: float, cy: float, s: float, rot: float = 0) -> str:
    return f"""
  <g transform="translate({cx} {cy}) rotate({rot}) scale({s})" filter="url(#glow)">
    <rect x="-30" y="-96" width="60" height="128" rx="30" fill="{NAVY_2}" stroke="url(#accent)" stroke-width="5"/>
    <g stroke="{BLUE_L}" stroke-width="3" stroke-opacity="0.75">
      <path d="M-30 -62h60M-30 -34h60M-30 -6h60M-30 22h60"/>
    </g>
    <path d="M-52 6v14a52 52 0 0 0 104 0V6" fill="none" stroke="url(#accent)" stroke-width="5" stroke-linecap="round"/>
    <path d="M0 72v42" stroke="url(#accent)" stroke-width="5" stroke-linecap="round"/>
  </g>"""


def light_panel(cx: float, cy: float, s: float, rot: float = 0) -> str:
    return f"""
  <g transform="translate({cx} {cy}) rotate({rot}) scale({s})" filter="url(#glow)">
    <circle r="104" fill="url(#pool)"/>
    <circle r="66" fill="{NAVY_2}" stroke="url(#accent)" stroke-width="5"/>
    <circle r="44" fill="{ORANGE_L}" fill-opacity="0.75"/>
    <circle r="44" fill="none" stroke="{WHITE}" stroke-opacity="0.5" stroke-width="2"/>
    <path d="M0 -78v-34M0 78v34M-78 0h-34M78 0h34" stroke="url(#accent)" stroke-width="5" stroke-linecap="round"/>
  </g>"""


def phone(cx: float, cy: float, s: float, rot: float = 0) -> str:
    return f"""
  <g transform="translate({cx} {cy}) rotate({rot}) scale({s})" filter="url(#glow)">
    <rect x="-72" y="-140" width="144" height="280" rx="26" fill="{NAVY_2}" stroke="url(#accent)" stroke-width="5"/>
    <rect x="-56" y="-120" width="112" height="240" rx="14" fill="{NAVY_0}"/>
    <rect x="-16" y="-132" width="32" height="8" rx="4" fill="{BLUE_L}"/>
    <g fill="url(#accent)">
      <rect x="-34" y="-92" width="68" height="86" rx="10"/>
    </g>
    <path d="M-12 -40 20 -49-12 -58Z" fill="{WHITE}"/>
    <g fill="{BLUE_L}" fill-opacity="0.75">
      <rect x="-42" y="8" width="84" height="9" rx="4"/>
      <rect x="-42" y="28" width="60" height="9" rx="4"/>
      <rect x="-42" y="48" width="72" height="9" rx="4"/>
    </g>
    <circle cy="94" r="16" fill="none" stroke="{ORANGE}" stroke-width="5"/>
  </g>"""


def clapper(cx: float, cy: float, s: float, rot: float = 0) -> str:
    return f"""
  <g transform="translate({cx} {cy}) rotate({rot}) scale({s})" filter="url(#glow)">
    <rect x="-124" y="-34" width="248" height="132" rx="14" fill="{NAVY_2}" stroke="url(#accent)" stroke-width="5"/>
    <path d="M-124 -74 116 -108l10 42-240 34Z" fill="{NAVY_1}" stroke="url(#accent)" stroke-width="5"/>
    <g stroke="{NAVY_0}" stroke-width="12">
      <path d="M-104 -80 -60 -88M-40 -93 4 -101M24 -106 68 -114M88 -119 112 -123"/>
    </g>
    <g fill="none" stroke="{BLUE_L}" stroke-opacity="0.8" stroke-width="5" stroke-linecap="round">
      <path d="M-92 8h60M-92 34h96M-92 60h48"/>
    </g>
  </g>"""


def drone(cx: float, cy: float, s: float) -> str:
    return f"""
  <g transform="translate({cx} {cy}) scale({s})" filter="url(#glow)">
    <g stroke="url(#cool)" stroke-width="5" fill="none">
      <path d="M-56 -26h112M-56 26h112M-56 -26-92 -62M56 -26 92 -62M-56 26-92 62M56 26 92 62"/>
      <ellipse cx="-92" cy="-62" rx="34" ry="8"/><ellipse cx="92" cy="-62" rx="34" ry="8"/>
      <ellipse cx="-92" cy="62" rx="34" ry="8"/><ellipse cx="92" cy="62" rx="34" ry="8"/>
    </g>
    <rect x="-40" y="-30" width="80" height="60" rx="14" fill="{NAVY_2}" stroke="url(#accent)" stroke-width="5"/>
    <circle cy="8" r="19" fill="{NAVY_0}" stroke="url(#accent)" stroke-width="5"/>
    <circle cy="8" r="8" fill="{ORANGE}"/>
  </g>"""


def timeline(cx: float, cy: float, s: float) -> str:
    return f"""
  <g transform="translate({cx} {cy}) scale({s})" filter="url(#glow)">
    <rect x="-200" y="-96" width="400" height="192" rx="14" fill="{NAVY_2}" stroke="{BLUE_L}" stroke-opacity="0.5" stroke-width="4"/>
    <g>
      <rect x="-176" y="-72" width="150" height="34" rx="6" fill="url(#accent)"/>
      <rect x="-14" y="-72" width="96" height="34" rx="6" fill="url(#cool)" fill-opacity="0.85"/>
      <rect x="-176" y="-24" width="94" height="34" rx="6" fill="url(#cool)" fill-opacity="0.6"/>
      <rect x="-64" y="-24" width="168" height="34" rx="6" fill="url(#accent)" fill-opacity="0.8"/>
      <rect x="120" y="-24" width="56" height="34" rx="6" fill="url(#cool)" fill-opacity="0.7"/>
      <rect x="-176" y="24" width="120" height="34" rx="6" fill="url(#cool)" fill-opacity="0.5"/>
      <rect x="-40" y="24" width="130" height="34" rx="6" fill="url(#accent)" fill-opacity="0.65"/>
    </g>
    <path d="M60 -96V96" stroke="{WHITE}" stroke-width="4"/>
    <path d="M50 -96h20l-10 18Z" fill="{WHITE}"/>
  </g>"""


def stage_lights(cx: float, cy: float, s: float) -> str:
    return f"""
  <g transform="translate({cx} {cy}) scale({s})" filter="url(#glow)">
    <path d="M-200 -150H200" stroke="{BLUE_L}" stroke-width="6" stroke-linecap="round"/>
    <path d="M-150 -150v34M0 -150v34M150 -150v34" stroke="{BLUE_L}" stroke-width="5"/>
    <g>
      <rect x="-186" y="-118" width="72" height="46" rx="8" fill="{NAVY_2}" stroke="url(#accent)" stroke-width="4" transform="rotate(-14 -150 -95)"/>
      <path d="M-186 -76 -236 60h100Z" fill="url(#pool)"/>
      <rect x="-36" y="-118" width="72" height="46" rx="8" fill="{NAVY_2}" stroke="url(#accent)" stroke-width="4" transform="rotate(6 0 -95)"/>
      <path d="M-36 -76 -66 60h104Z" fill="url(#poolBlue)"/>
      <rect x="114" y="-118" width="72" height="46" rx="8" fill="{NAVY_2}" stroke="url(#accent)" stroke-width="4" transform="rotate(14 150 -95)"/>
      <path d="M114 -76 84 60h100Z" fill="url(#pool)"/>
    </g>
    <g fill="{NAVY_2}" stroke="url(#cool)" stroke-width="4">
      <circle cx="-120" cy="128" r="26"/><circle cx="-40" cy="150" r="26"/>
      <circle cx="40" cy="150" r="26"/><circle cx="120" cy="128" r="26"/>
    </g>
    <g fill="{BLUE_L}" fill-opacity="0.5">
      <circle cx="-120" cy="120" r="9"/><circle cx="-40" cy="142" r="9"/>
      <circle cx="40" cy="142" r="9"/><circle cx="120" cy="120" r="9"/>
    </g>
  </g>"""


def gear_glyph(cx: float, cy: float, s: float) -> str:
    """Compact gear used as a background motif on service cards."""
    return f"""
  <g transform="translate({cx} {cy}) scale({s})" fill="none" stroke="url(#cool)"
     stroke-width="6" opacity="0.55">
    <circle r="54"/>
    <circle r="22"/>
    <g stroke-width="12">
      <path d="M0 -76v18M0 58v18M-76 0h18M58 0h18"/>
      <path d="M-54 -54l13 13M41 41l13 13M54 -54 41 -41M-41 41l-13 13"/>
    </g>
  </g>"""


def wave(cx: float, cy: float, s: float) -> str:
    bars = []
    heights = [22, 46, 70, 38, 88, 54, 30, 62, 44, 26, 52, 34]
    bw = 9 * s
    for i, h in enumerate(heights):
        x = cx + (i - len(heights) / 2) * 20 * s
        hh = h * s
        y = cy - hh / 2
        bars.append(
            f'<rect x="{x:.1f}" y="{y:.1f}" width="{bw:.1f}" '
            f'height="{hh:.1f}" rx="{bw / 2:.1f}" fill="url(#accent)"/>'
        )
    return "".join(bars)


# --------------------------------------------------------------------------
# Compositions. Each returns (svg_markup, width, height, has_background).
# Artwork is laid out in a 1000-unit-wide space and scaled to the output.
# --------------------------------------------------------------------------

def tools_art() -> tuple[str, int, int, bool]:
    """The hero strip: the kit Alec actually shoots with, laid out wide so it
    can sit as a full-width band beneath the intro."""
    body = f"""
  <circle cx="240" cy="170" r="230" fill="url(#pool)" opacity="0.5"/>
  <circle cx="990" cy="250" r="210" fill="url(#poolBlue)" opacity="0.5"/>
  <g stroke="{BLUE_L}" stroke-opacity="0.32" stroke-width="3" fill="none">
    <rect x="40" y="40" width="1120" height="340" rx="20" stroke-dasharray="14 12"/>
  </g>
  <g>
    {camera(190, 200, 0.62)}
    {tripod(190, 200, 0.5)}
    {light_panel(430, 170, 0.6, -8)}
    {mic(565, 175, 0.52, 10)}
    {drone(720, 190, 0.5)}
    {clapper(880, 212, 0.45, -5)}
    {phone(1050, 190, 0.42, 6)}
  </g>
  {wave(600, 350, 1.3)}"""
    return body, 1200, 420, True


def service_art(kind: str) -> tuple[str, int, int, bool]:
    """One illustration per service card."""
    art = {
        "video": (
            f'<circle cx="500" cy="300" r="330" fill="url(#pool)"/>'
            f"{camera(500, 300, 1.25)}{gear_glyph(830, 150, 0.7)}"
            f'<g fill="{BLUE_L}" fill-opacity="0.5">'
            f'<rect x="120" y="470" width="200" height="12" rx="6"/>'
            f'<rect x="120" y="500" width="130" height="12" rx="6"/></g>',
            "01",
        ),
        "content": (
            f'<circle cx="420" cy="300" r="320" fill="url(#poolBlue)"/>'
            f"{phone(400, 300, 1.3, -7)}{clapper(760, 470, 0.6, 10)}"
            f"{gear_glyph(760, 150, 0.7)}",
            "02",
        ),
        "social": (
            f'<circle cx="500" cy="300" r="320" fill="url(#pool)"/>'
            f'<g filter="url(#glow)">'
            f'<rect x="220" y="140" width="560" height="400" rx="22" fill="{NAVY_2}" '
            f'stroke="url(#accent)" stroke-width="6"/>'
            f'<path d="M220 240h560" stroke="{BLUE_L}" stroke-width="5"/>'
            f'<g fill="{BLUE_L}" fill-opacity="0.55">'
            + "".join(
                f'<rect x="{x}" y="270" width="96" height="70" rx="10" fill-opacity="{0.18 + 0.5 * ((r + c) % 3) / 2:.2f}"/>'
                for r in range(3)
                for c, x in enumerate([244, 364, 484, 604])
            )
            + "</g>"
            f'<g fill="{ORANGE}"><rect x="244" y="382" width="96" height="70" rx="10" fill-opacity="0.9"/></g>'
            f'<circle cx="700" cy="417" r="26" fill="none" stroke="{WHITE}" stroke-width="6"/>'
            f'<circle cx="140" cy="200" r="40" fill="url(#cool)" filter="url(#glow)"/>'
            f"</g>"
            f'{wave(500, 590, 1.5)}',
            "03",
        ),
        "events": (
            f'<circle cx="500" cy="280" r="330" fill="url(#poolBlue)"/>'
            f"{stage_lights(500, 300, 1.15)}{gear_glyph(150, 140, 0.6)}"
            f"{gear_glyph(860, 140, 0.6)}",
            "04",
        ),
        "edit": (
            f'<circle cx="500" cy="300" r="330" fill="url(#pool)"/>'
            f"{timeline(500, 300, 1.1)}{gear_glyph(840, 150, 0.65)}"
            f'<g filter="url(#glow)">'
            f'<rect x="300" y="500" width="400" height="90" rx="16" fill="{NAVY_2}" '
            f'stroke="url(#accent)" stroke-width="5"/>'
            f'<path d="M336 545h44M392 545h44M448 545h44" stroke="{BLUE_L}" stroke-width="7" stroke-linecap="round"/>'
            f'<circle cx="652" cy="545" r="20" fill="{ORANGE}"/></g>',
            "05",
        ),
        "scripts": (
            f'<circle cx="500" cy="300" r="320" fill="url(#pool)"/>'
            f"{clapper(500, 260, 1.05, -5)}{wave(500, 470, 1.8)}"
            f'{clapper(830, 500, 0.45, 14)}',
            "06",
        ),
    }
    body, _num = art[kind]
    return body, 1000, 640, True


def services_hero_art() -> tuple[str, int, int, bool]:
    """
    Services page art. Rendered without a background so the left edge can be
    faded to full transparency, letting the image melt into the text column.
    """
    body = f"""
  <g>
    <circle cx="700" cy="300" r="420" fill="url(#pool)" opacity="0.55"/>
    <circle cx="980" cy="620" r="380" fill="url(#poolBlue)" opacity="0.5"/>
    {stage_lights(760, 300, 1.1)}
    {camera(700, 250, 0.8)}
    {tripod(700, 250, 0.55)}
    {mic(1000, 220, 0.6, 10)}
    {drone(560, 560, 0.55)}
    {wave(760, 720, 2.2)}
  </g>"""
    return body, 1300, 800, False


# --------------------------------------------------------------------------
# Rendering
# --------------------------------------------------------------------------

HTML = """<!doctype html>
<html><head><meta charset="utf-8"><style>
  html,body{{margin:0;padding:0;background:transparent;}}
  svg{{display:block;}}
</style></head><body>{svg}</body></html>"""


def fade_left(im: "Image.Image", start: float = 0.04, full: float = 0.42) -> "Image.Image":
    """
    Ramp the alpha channel from fully transparent on the left edge to fully
    opaque further in, so the artwork dissolves into the text column instead
    of ending on a hard vertical cut.
    """
    w, h = im.size
    alpha = im.split()[3]
    ramp = []
    for x in range(w):
        t = (x / w - start) / max(full - start, 1e-6)
        t = 0.0 if t < 0 else (1.0 if t > 1 else t)
        # Smoothstep for a soft, natural falloff.
        ramp.append(int(255 * (t * t * (3 - 2 * t))))
    mask = Image.new("L", (w, 1))
    mask.putdata(ramp)
    mask = mask.resize((w, h))
    out = im.copy()
    # Multiply so genuinely transparent artwork stays transparent.
    out.putalpha(ImageChops.multiply(alpha, mask))
    return out


def render(name: str, svg_text: str, width: int, height: int,
           transparent: bool, target_w: int | None = None,
           left_fade: bool = False, quality: int = 82) -> None:
    """Rasterise one SVG with headless Chrome, then encode to WebP."""
    TMP.mkdir(parents=True, exist_ok=True)
    OUT.mkdir(parents=True, exist_ok=True)
    html_path = TMP / f"{name}.html"
    png_path = TMP / f"{name}.png"
    html_path.write_text(HTML.format(svg=svg_text), encoding="utf-8")

    cmd = [
        CHROME,
        "--headless",
        "--disable-gpu",
        "--no-sandbox",
        "--hide-scrollbars",
        f"--force-device-scale-factor={SCALE}",
        f"--window-size={width},{height}",
        # Keeps the alpha channel so the faded edges stay truly transparent.
        "--default-background-color=00000000" if transparent
        else f"--default-background-color={hex_to_argb(bg_hex())}",
        f"--screenshot={png_path}",
        html_path.as_uri(),
    ]
    subprocess.run(cmd, check=True, capture_output=True, timeout=120)

    im = Image.open(png_path)
    if im.mode != "RGBA":
        im = im.convert("RGBA")

    if target_w and im.width > target_w:
        im = im.resize(
            (target_w, round(im.height * target_w / im.width)), Image.LANCZOS
        )
    if left_fade:
        im = fade_left(im)

    target = OUT / f"{name}.webp"
    im.save(target, "WEBP", quality=quality, method=6)
    print(f"  {target}  {im.width}x{im.height}  {target.stat().st_size / 1024:.0f} KB")


# The artwork is already authored at 2x design coordinates, so Chrome only
# needs to rasterise 1:1; `target_w` then trims to a sensible delivery size.
SCALE = 1


def hex_to_argb(value: str) -> str:
    value = value.lstrip("#")
    r, g, b = (int(value[i:i + 2], 16) for i in (0, 2, 4))
    return f"{r:02x}{g:02x}{b:02x}ff"


def bg_hex() -> str:
    return NAVY_0


def main() -> None:
    print("rendering artwork...")

    body, w, h, has_bg = tools_art()
    render("tools", frame(w, h, body, w * 2, h * 2), w * 2, h * 2,
           transparent=not has_bg, target_w=2000)

    # These keys must mirror the `id` values in src/data.js: the component
    # builds the path as `/img/service-${s.id.replace('serv-', '')}.webp`.
    for kind in ("video", "content", "social", "events", "edit", "scripts"):
        body, w, h, has_bg = service_art(kind)
        render(
            f"service-{kind}",
            frame(w, h, body, w * 2, h * 2, glow_id=f"glow-{kind}"),
            w * 2, h * 2, transparent=not has_bg, target_w=1200,
        )

    body, w, h, has_bg = services_hero_art()
    render("services-hero",
           frame(w, h, body, w * 2, h * 2, glow_id="glow-hero"),
           w * 2, h * 2, transparent=not has_bg, target_w=1700, left_fade=True)

    print("done")


if __name__ == "__main__":
    main()
