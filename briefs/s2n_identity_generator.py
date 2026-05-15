#!/usr/bin/env python3
"""
signal2noise Visual Identity System — Thermal Frequency
REFINED PASS — polished, pristine, museum-quality.
"""

import math, os, random
from reportlab.lib.pagesizes import landscape
from reportlab.lib.units import inch, mm
from reportlab.lib.colors import Color, HexColor
from reportlab.pdfgen import canvas
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont

# ── Fonts ──
FONT_DIR = "/sessions/peaceful-sleepy-bardeen/mnt/.claude/skills/canvas-design/canvas-fonts"
pdfmetrics.registerFont(TTFont("JBMono", f"{FONT_DIR}/JetBrainsMono-Regular.ttf"))
pdfmetrics.registerFont(TTFont("JBMono-Bold", f"{FONT_DIR}/JetBrainsMono-Bold.ttf"))
pdfmetrics.registerFont(TTFont("InstrumentSans", f"{FONT_DIR}/InstrumentSans-Regular.ttf"))
pdfmetrics.registerFont(TTFont("InstrumentSans-Bold", f"{FONT_DIR}/InstrumentSans-Bold.ttf"))
pdfmetrics.registerFont(TTFont("InstrumentSans-Italic", f"{FONT_DIR}/InstrumentSans-Italic.ttf"))
pdfmetrics.registerFont(TTFont("WorkSans", f"{FONT_DIR}/WorkSans-Regular.ttf"))
pdfmetrics.registerFont(TTFont("WorkSans-Bold", f"{FONT_DIR}/WorkSans-Bold.ttf"))
pdfmetrics.registerFont(TTFont("GeistMono", f"{FONT_DIR}/GeistMono-Regular.ttf"))
pdfmetrics.registerFont(TTFont("GeistMono-Bold", f"{FONT_DIR}/GeistMono-Bold.ttf"))

# ── Colors ──
CREAM      = HexColor("#FAF6F0")
CREAM_DEEP = HexColor("#F1EDE2")
CREAM_WARM = HexColor("#E8DFD0")
AMBER      = HexColor("#D4944C")
AMBER_DEEP = HexColor("#B87A3A")
AMBER_GLOW = HexColor("#E8B06A")
CHARCOAL   = HexColor("#1A1A1A")
WARM_GRAY  = HexColor("#8A8278")
MID_GRAY   = HexColor("#B5AEA4")
LIGHT_LINE = HexColor("#DDD8CE")
NAVY       = HexColor("#0D1321")
TEAL       = HexColor("#5CE0D2")
OFF_WHITE  = HexColor("#F2EFE8")
CONSULT_C  = HexColor("#D4944C")
BUILD_C    = HexColor("#5CE0D2")
SHIP_C     = HexColor("#8C78C8")

W = 1200; H = 630
PDF_PATH = "/sessions/peaceful-sleepy-bardeen/mnt/ensolabs-site/briefs/signal2noise-identity.pdf"

def alpha(color, a):
    return Color(color.red, color.green, color.blue, alpha=a)

def grain_field(c, density=0.6):
    """Subtle thermal grain overlay — the 'labored over' texture."""
    random.seed(99)
    for _ in range(int(W * H * density / 800)):
        x = random.uniform(0, W)
        y = random.uniform(0, H)
        o = random.uniform(0.01, 0.04)
        r = random.uniform(0.3, 0.8)
        c.setFillColor(alpha(CHARCOAL, o))
        c.circle(x, y, r, fill=1, stroke=0)

def footer_bar(c, left_text, right_text, dark=False):
    """Consistent footer across all pages."""
    fg = OFF_WHITE if dark else CHARCOAL
    c.setStrokeColor(alpha(fg, 0.06))
    c.setLineWidth(0.5)
    c.line(60, 44, W - 60, 44)
    c.setFillColor(alpha(fg, 0.3))
    c.setFont("GeistMono", 7.5)
    c.drawString(60, 22, left_text)
    c.drawRightString(W - 60, 22, right_text)

# ════════════════════════════════════════
# PAGE 1 — Brand Plate
# ════════════════════════════════════════
def page_brand_plate(c):
    # Ground
    c.setFillColor(CREAM)
    c.rect(0, 0, W, H, fill=1, stroke=0)

    # Warm gradient at bottom — thicker, more presence
    for i in range(120):
        y = i * 1.8
        opacity = 0.04 * (1 - i/120)
        c.setFillColor(alpha(AMBER, opacity))
        c.rect(0, y, W, 2, fill=1, stroke=0)

    # ─── Propagation rings (upper right) — denser, more rings ───
    cx, cy = 860, 370
    for r in range(30, 340, 18):
        opacity = 0.03 + (r / 340) * 0.10
        c.setStrokeColor(alpha(AMBER, opacity))
        c.setLineWidth(0.6 if r < 180 else 0.35)
        c.circle(cx, cy, r, fill=0, stroke=1)

    # Signal source dot
    c.setFillColor(alpha(AMBER, 0.9))
    c.circle(cx, cy, 5, fill=1, stroke=0)
    c.setFillColor(alpha(AMBER, 0.12))
    c.circle(cx, cy, 20, fill=1, stroke=0)
    c.setFillColor(alpha(AMBER, 0.05))
    c.circle(cx, cy, 40, fill=1, stroke=0)

    # ─── Dot field — denser, more atmospheric ───
    random.seed(42)
    for dx in range(35):
        for dy in range(22):
            x = 600 + dx * 17
            y = 55 + dy * 25
            if x > W - 15 or y > H - 15:
                continue
            dist = math.sqrt((x - cx)**2 + (y - cy)**2)
            if dist < 45:
                continue
            opacity = max(0.015, 0.09 - dist/3500)
            c.setFillColor(alpha(AMBER, opacity))
            c.circle(x, y, 1.0, fill=1, stroke=0)

    # ─── Contour lines (lower-left topography) ───
    c.saveState()
    c.setStrokeColor(alpha(AMBER_DEEP, 0.055))
    c.setLineWidth(0.35)
    for i in range(15):
        p = c.beginPath()
        y_base = 55 + i * 15
        for x in range(0, 560, 3):
            y = y_base + 7 * math.sin(x * 0.013 + i * 0.65) + 3.5 * math.sin(x * 0.027 + i * 1.1)
            if x == 0:
                p.moveTo(x, y)
            else:
                p.lineTo(x, y)
        c.drawPath(p, fill=0, stroke=1)
    c.restoreState()

    # ─── Axis references ───
    c.setStrokeColor(alpha(MID_GRAY, 0.10))
    c.setLineWidth(0.3)
    c.line(60, 290, 520, 290)
    for x in range(60, 521, 48):
        c.line(x, 288, x, 292)
    c.line(60, 60, 60, 530)
    for y in range(60, 531, 48):
        c.line(58, y, 62, y)

    # ─── signal2noise wordmark ───
    c.setFillColor(CHARCOAL)
    c.setFont("InstrumentSans-Bold", 56)

    x0 = 80
    c.drawString(x0, 492, "signal")
    sw = c.stringWidth("signal", "InstrumentSans-Bold", 56)
    c.setFillColor(alpha(AMBER, 0.9))
    c.drawString(x0 + sw, 492, "2")
    tw = c.stringWidth("2", "InstrumentSans-Bold", 56)
    c.setFillColor(CHARCOAL)
    c.drawString(x0 + sw + tw, 492, "noise")

    # Subtitle
    c.setFillColor(WARM_GRAY)
    c.setFont("GeistMono", 9)
    c.drawString(82, 470, "INTELLIGENCE ENGINE  ·  ENSO LABS")

    # ─── Color specimens — larger, with hex labels ───
    spec_y = 352
    specimens = [
        (CREAM_DEEP, "CREAM", "#FAF6F0"),
        (AMBER, "AMBER", "#D4944C"),
        (AMBER_GLOW, "GLOW", "#E8B06A"),
        (CHARCOAL, "CHAR", "#1A1A1A"),
        (TEAL, "TEAL", "#5CE0D2"),
    ]
    for i, (col, name, hex_val) in enumerate(specimens):
        sx = 82 + i * 96
        # Swatch
        c.setFillColor(col)
        c.roundRect(sx, spec_y, 72, 32, 4, fill=1, stroke=0)
        # Label
        c.setFillColor(alpha(CHARCOAL, 0.50))
        c.setFont("GeistMono", 7.5)
        c.drawString(sx, spec_y - 14, name)
        c.setFillColor(alpha(CHARCOAL, 0.28))
        c.setFont("GeistMono", 6.5)
        c.drawString(sx, spec_y - 24, hex_val)

    # Footnote
    c.setFillColor(alpha(CHARCOAL, 0.22))
    c.setFont("GeistMono", 6.5)
    c.drawString(82, spec_y - 42, "* TEAL APPEARS AS TRACE ELEMENT — CROSS-BRAND SIGNIFIER FOR ENSO LABS")

    # ─── Typography specimen ───
    ty = 280
    c.setStrokeColor(alpha(CHARCOAL, 0.06))
    c.setLineWidth(0.5)
    c.line(80, ty + 44, 520, ty + 44)

    c.setFillColor(alpha(CHARCOAL, 0.4))
    c.setFont("GeistMono", 7.5)
    c.drawString(80, ty + 52, "TYPOGRAPHY")

    c.setFillColor(CHARCOAL)
    c.setFont("InstrumentSans", 28)
    c.drawString(80, ty + 8, "Instrument Sans")

    c.setFillColor(alpha(CHARCOAL, 0.4))
    c.setFont("GeistMono", 8)
    c.drawString(340, ty + 16, "DISPLAY  ·  TITLES  ·  BODY")

    c.setStrokeColor(alpha(CHARCOAL, 0.06))
    c.line(80, ty, 520, ty)

    c.setFillColor(CHARCOAL)
    c.setFont("GeistMono", 22)
    c.drawString(80, ty - 32, "Geist Mono")

    c.setFillColor(alpha(CHARCOAL, 0.4))
    c.setFont("GeistMono", 8)
    c.drawString(340, ty - 24, "LABELS  ·  METADATA  ·  REFERENCE MARKS")

    # Grain
    grain_field(c, density=0.5)

    # Footer
    footer_bar(c, "THERMAL FREQUENCY  ·  VISUAL IDENTITY SYSTEM  ·  2026", "ENSO LABS  ·  SIGNAL2NOISE")


# ════════════════════════════════════════
# PAGE 2 — OG Essay Template
# ════════════════════════════════════════
def page_og_essay(c):
    # ─── Left gradient band (amber → cream) ───
    for x in range(0, 280, 2):
        t = x / 280
        r = AMBER_DEEP.red * (1 - t) + CREAM.red * t
        g = AMBER_DEEP.green * (1 - t) + CREAM.green * t
        b = AMBER_DEEP.blue * (1 - t) + CREAM.blue * t
        c.setFillColor(Color(r, g, b))
        c.rect(x, 0, 2, H, fill=1, stroke=0)

    # Cream ground for rest
    c.setFillColor(CREAM)
    c.rect(280, 0, W - 280, H, fill=1, stroke=0)

    # ─── Propagation rings (right side) ───
    rcx, rcy = 820, 340
    for r in range(25, 280, 20):
        opacity = 0.025 + (r / 280) * 0.065
        c.setStrokeColor(alpha(AMBER, opacity))
        c.setLineWidth(0.45)
        c.circle(rcx, rcy, r, fill=0, stroke=1)

    # Signal dot
    c.setFillColor(alpha(AMBER, 0.85))
    c.circle(rcx, rcy, 4, fill=1, stroke=0)
    c.setFillColor(alpha(AMBER, 0.10))
    c.circle(rcx, rcy, 18, fill=1, stroke=0)

    # ─── Dot density field ───
    random.seed(77)
    for _ in range(300):
        x = random.uniform(500, W - 30)
        y = random.uniform(60, H - 60)
        dist = math.sqrt((x - rcx)**2 + (y - rcy)**2)
        if dist < 40:
            continue
        o = max(0.01, 0.06 - dist/4500)
        c.setFillColor(alpha(AMBER, o))
        c.circle(x, y, 0.9, fill=1, stroke=0)

    # ─── Pillar badge ───
    c.setFillColor(alpha(AMBER, 0.08))
    c.roundRect(40, H - 90, 70, 22, 3, fill=1, stroke=0)
    c.setFillColor(AMBER_DEEP)
    c.setFont("GeistMono", 8)
    c.drawString(50, H - 84, "CONSULT")

    # ─── Title ───
    c.setFillColor(CHARCOAL)
    c.setFont("InstrumentSans-Bold", 42)
    lines = ["Why deck-only AI", "consulting dies on", "contact with production."]
    for i, line in enumerate(lines):
        c.drawString(40, H - 140 - i * 52, line)

    # ─── Dek (subtitle) ───
    c.setFillColor(alpha(CHARCOAL, 0.5))
    c.setFont("InstrumentSans", 12)
    c.drawString(40, 130, "THE AUTOPSY: FROM FIFTEEN VENDOR DECKS THE FLOOR")

    # ─── Meta ───
    c.setFont("GeistMono", 8.5)
    c.setFillColor(alpha(CHARCOAL, 0.35))
    c.drawString(40, 108, "7 MIN READ    SAV BANERJEE    JUN 22 2025")

    # Grain
    grain_field(c, density=0.4)

    # Footer
    c.setFillColor(alpha(CHARCOAL, 0.25))
    c.setFont("GeistMono", 8)
    c.drawString(40, 22, "signal2noise  ·  ENSO LABS INSIGHTS")


# ════════════════════════════════════════
# PAGE 3 — Signal Card (Daily Intelligence)
# ════════════════════════════════════════
def page_signal_card(c):
    # Ground
    c.setFillColor(CREAM)
    c.rect(0, 0, W, H, fill=1, stroke=0)

    # Warm undertone gradient (upper right)
    for i in range(100):
        x = W - 350 + i * 3.5
        opacity = 0.025 * (1 - i/100)
        c.setFillColor(alpha(AMBER_GLOW, opacity))
        c.rect(x, H/2, 4, H/2, fill=1, stroke=0)

    # ─── Top meta bar ───
    c.setFillColor(AMBER_DEEP)
    c.setFont("GeistMono", 8.5)
    c.drawString(60, H - 52, "COMPETITIVE SIGNAL")

    c.setFillColor(alpha(CHARCOAL, 0.30))
    c.setFont("GeistMono", 8)
    c.drawString(60, H - 70, "MAY 14, 2026    GARTNER    AI INFRASTRUCTURE")

    # ─── Signal dot (top right) ───
    c.setFillColor(alpha(AMBER, 0.75))
    c.circle(W - 70, H - 55, 7, fill=1, stroke=0)
    c.setFillColor(alpha(AMBER, 0.12))
    c.circle(W - 70, H - 55, 18, fill=1, stroke=0)

    # ─── Title ───
    c.setFillColor(CHARCOAL)
    c.setFont("InstrumentSans-Bold", 36)
    lines = [
        "Enterprise AI buying committees",
        "consolidate around three vendors",
        "per portfolio.",
    ]
    for i, line in enumerate(lines):
        c.drawString(60, H - 120 - i * 44, line)

    # ─── Body ───
    c.setFillColor(alpha(CHARCOAL, 0.6))
    c.setFont("InstrumentSans", 13)
    body_lines = [
        "Non-finalists lose 70% of pipeline within 90 days of shortlist",
        "announcement. The implication: if you are not in the first conversation,",
        "you are not in the conversation at all.",
    ]
    for i, line in enumerate(body_lines):
        c.drawString(60, 260 - i * 20, line)

    # ─── Enso Labs perspective ───
    c.setFillColor(AMBER_DEEP)
    c.setFont("GeistMono", 8)
    c.drawString(60, 185, "ENSO LABS PERSPECTIVE")

    c.setFillColor(alpha(CHARCOAL, 0.55))
    c.setFont("InstrumentSans-Italic", 12.5)
    perspective = [
        "This is why speed-to-production matters. The studio model exists to get",
        "clients into the shortlist conversation before the window closes.",
    ]
    for i, line in enumerate(perspective):
        c.drawString(60, 164 - i * 18, line)

    # ─── Subtle contour lines (bottom area) ───
    c.saveState()
    c.setStrokeColor(alpha(AMBER, 0.035))
    c.setLineWidth(0.3)
    for i in range(8):
        p = c.beginPath()
        y_base = 60 + i * 10
        for x in range(0, W, 4):
            y = y_base + 5 * math.sin(x * 0.008 + i * 0.9)
            if x == 0:
                p.moveTo(x, y)
            else:
                p.lineTo(x, y)
        c.drawPath(p, fill=0, stroke=1)
    c.restoreState()

    # Grain
    grain_field(c, density=0.35)

    # Footer
    footer_bar(c, "signal2noise  ·  DAILY AI INTELLIGENCE", "signals.ensolabs.ai")


# ════════════════════════════════════════
# PAGE 4 — Co-brand Composition (the atmospheric split)
# ════════════════════════════════════════
def page_cobrand(c):
    # ─── Navy left half ───
    for x in range(0, 640, 2):
        t = x / 640
        # Navy that gradually lightens
        r = NAVY.red * (1 - t * 0.3) + OFF_WHITE.red * (t * 0.15)
        g = NAVY.green * (1 - t * 0.3) + OFF_WHITE.green * (t * 0.15)
        b = NAVY.blue * (1 - t * 0.3) + OFF_WHITE.blue * (t * 0.15)
        c.setFillColor(Color(min(1, r), min(1, g), min(1, b)))
        c.rect(x, 0, 2, H, fill=1, stroke=0)

    # ─── Cream right half ───
    for x in range(560, W, 2):
        t = (x - 560) / (W - 560)
        r = OFF_WHITE.red * (1 - t) + CREAM.red * t
        g = OFF_WHITE.green * (1 - t) + CREAM.green * t
        b = OFF_WHITE.blue * (1 - t) + CREAM.blue * t
        c.setFillColor(Color(r, g, b))
        c.rect(x, 0, 2, H, fill=1, stroke=0)

    # ─── Left: Enso Labs rings (teal on navy) ───
    lcx, lcy = 300, 320
    for r in range(30, 280, 22):
        opacity = 0.04 + (r / 280) * 0.08
        c.setStrokeColor(alpha(TEAL, opacity))
        c.setLineWidth(0.5)
        c.circle(lcx, lcy, r, fill=0, stroke=1)

    # Teal dot
    c.setFillColor(alpha(TEAL, 0.8))
    c.circle(lcx, lcy, 4, fill=1, stroke=0)
    c.setFillColor(alpha(TEAL, 0.08))
    c.circle(lcx, lcy, 22, fill=1, stroke=0)

    # ─── Right: signal2noise rings (amber on cream) ───
    rcx, rcy = 900, 320
    for r in range(30, 280, 22):
        opacity = 0.035 + (r / 280) * 0.075
        c.setStrokeColor(alpha(AMBER, opacity))
        c.setLineWidth(0.5)
        c.circle(rcx, rcy, r, fill=0, stroke=1)

    # Amber dot
    c.setFillColor(alpha(AMBER, 0.8))
    c.circle(rcx, rcy, 4, fill=1, stroke=0)
    c.setFillColor(alpha(AMBER, 0.08))
    c.circle(rcx, rcy, 22, fill=1, stroke=0)

    # ─── Center: where both fields overlap — teal→amber dot ───
    mid_x = 600
    c.setFillColor(alpha(TEAL, 0.25))
    c.circle(mid_x, 320, 5, fill=1, stroke=0)

    # ─── Labels ───
    c.setFillColor(OFF_WHITE)
    c.setFont("GeistMono-Bold", 12)
    c.drawString(60, H - 50, "ENSO LABS")
    c.setFillColor(alpha(OFF_WHITE, 0.5))
    c.setFont("GeistMono", 9)
    c.drawString(60, H - 68, "AI TRANSFORMATION STUDIO")

    c.setFillColor(CHARCOAL)
    c.setFont("GeistMono-Bold", 12)
    c.drawString(700, H - 50, "SIGNAL2NOISE")
    c.setFillColor(alpha(CHARCOAL, 0.5))
    c.setFont("GeistMono", 9)
    c.drawString(700, H - 68, "INTELLIGENCE ENGINE")

    # ─── Bottom labels ───
    c.setFillColor(alpha(OFF_WHITE, 0.4))
    c.setFont("GeistMono", 8)
    c.drawString(60, 26, "THE SENSING LAYER")

    c.setFillColor(alpha(CHARCOAL, 0.35))
    c.setFont("GeistMono", 8)
    c.drawRightString(W - 60, 26, "THE EXECUTION LAYER")

    # Center footer
    c.setFillColor(alpha(TEAL, 0.5))
    c.setFont("GeistMono", 7.5)
    tw = c.stringWidth("THERMAL FREQUENCY  ·  2026", "GeistMono", 7.5)
    c.drawString(W/2 - tw/2, 26, "THERMAL FREQUENCY  ·  2026")

    # Subtle grain (less on dark side)
    random.seed(88)
    for _ in range(600):
        x = random.uniform(0, W)
        y = random.uniform(0, H)
        o = random.uniform(0.01, 0.025)
        if x < 400:
            col = OFF_WHITE
        elif x > 700:
            col = CHARCOAL
        else:
            col = WARM_GRAY
        c.setFillColor(alpha(col, o))
        c.circle(x, y, random.uniform(0.3, 0.7), fill=1, stroke=0)


# ════════════════════════════════════════
# PAGE 5 — LinkedIn Card (thought leadership format)
# ════════════════════════════════════════
def page_linkedin(c):
    # Ground
    c.setFillColor(CREAM)
    c.rect(0, 0, W, H, fill=1, stroke=0)

    # Top accent bar (amber, thin)
    c.setFillColor(AMBER_GLOW)
    c.rect(0, H - 6, W, 6, fill=1, stroke=0)

    # ─── Pillar badge ───
    c.setFillColor(alpha(BUILD_C, 0.10))
    c.roundRect(60, H - 78, 65, 22, 3, fill=1, stroke=0)
    c.setFillColor(alpha(BUILD_C, 0.8))
    c.setFont("GeistMono", 8)
    c.drawString(70, H - 72, "BUILD")

    # ─── Bold headline — the hook ───
    c.setFillColor(CHARCOAL)
    c.setFont("InstrumentSans-Bold", 64)
    c.drawString(60, H - 170, "9 rules.")

    c.setFillColor(alpha(CHARCOAL, 0.5))
    c.setFont("InstrumentSans", 26)
    c.drawString(60, H - 220, "Each independently toggleable.")
    c.drawString(60, H - 252, "That's where trust comes from.")

    # ─── Right side: propagation rings (VISIBLE this time) ───
    rcx, rcy = 940, 330
    for r in range(25, 260, 20):
        opacity = 0.04 + (r / 260) * 0.10
        c.setStrokeColor(alpha(AMBER, opacity))
        c.setLineWidth(0.5)
        c.circle(rcx, rcy, r, fill=0, stroke=1)

    # Signal source
    c.setFillColor(alpha(AMBER, 0.75))
    c.circle(rcx, rcy, 4, fill=1, stroke=0)
    c.setFillColor(alpha(AMBER, 0.10))
    c.circle(rcx, rcy, 18, fill=1, stroke=0)

    # ─── Nine rule dots arranged in arc around the rings ───
    for i in range(9):
        angle = math.radians(-80 + i * 20)
        dr = 150
        dx = rcx + dr * math.cos(angle)
        dy = rcy + dr * math.sin(angle)
        col = AMBER if i % 2 == 0 else BUILD_C
        c.setFillColor(alpha(col, 0.65))
        c.circle(dx, dy, 5, fill=1, stroke=0)
        c.setFillColor(alpha(col, 0.12))
        c.circle(dx, dy, 14, fill=1, stroke=0)

    # ─── Dot field around rings ───
    random.seed(55)
    for _ in range(200):
        x = random.uniform(680, W - 20)
        y = random.uniform(60, H - 60)
        dist = math.sqrt((x - rcx)**2 + (y - rcy)**2)
        if dist < 35 or dist > 300:
            continue
        o = max(0.01, 0.05 - dist/5000)
        c.setFillColor(alpha(AMBER, o))
        c.circle(x, y, 0.8, fill=1, stroke=0)

    # ─── Attribution ───
    c.setFillColor(alpha(CHARCOAL, 0.28))
    c.setFont("GeistMono", 9)
    c.drawString(60, 105, "From: AI Market Intelligence — encoding expert")
    c.drawString(60, 89, "knowledge as toggleable rules")

    # Grain
    grain_field(c, density=0.4)

    # Footer
    footer_bar(c, "signal2noise  ·  ENSO LABS INSIGHTS", "ensolabs.ai/insights")


# ════════════════════════════════════════
# BUILD
# ════════════════════════════════════════
def main():
    print("Building signal2noise Identity System PDF (refined pass)...")
    c = canvas.Canvas(PDF_PATH, pagesize=(W, H))

    pages = [
        ("Brand Plate", page_brand_plate),
        ("OG Essay Template", page_og_essay),
        ("Signal Card", page_signal_card),
        ("Co-brand Composition", page_cobrand),
        ("LinkedIn Card", page_linkedin),
    ]

    for i, (name, fn) in enumerate(pages):
        print(f"  Page {i+1}: {name}...")
        fn(c)
        c.showPage()

    c.save()
    size = os.path.getsize(PDF_PATH)
    print(f"\n  Done: {PDF_PATH} ({size//1024}KB, {len(pages)} pages)")

if __name__ == "__main__":
    main()
