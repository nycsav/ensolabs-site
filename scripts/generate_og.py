#!/usr/bin/env python3
"""Generate all 11 OG images for ensolabs.ai insights articles.
Uses SVG + CairoSVG for high-fidelity rendering with filters, grain, glow."""

import cairosvg, os, math, random

OUT = "/sessions/peaceful-sleepy-bardeen/mnt/ensolabs-site/public/og"
W, H = 1200, 630

# Brand colors
NAVY = "#0d1321"
TEAL = "#5ce0d2"
OFF_WHITE = "#f2efe8"
CORAL = "#e85d4a"
AMBER = "#d4944c"
CREAM = "#faf6f0"
PURPLE = "#8c78c8"
SAGE = "#2d5a4a"
DEEP_GREEN = "#0a1f1a"

PILLAR_COLORS = {"Consult": AMBER, "Build": TEAL, "Ship": PURPLE}

def grain_defs():
    return '''<filter id="grain" x="0" y="0" width="100%" height="100%">
      <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" result="noise"/>
      <feColorMatrix type="saturate" values="0" in="noise" result="gray"/>
      <feBlend in="SourceGraphic" in2="gray" mode="overlay" result="blend"/>
      <feComponentTransfer in="blend"><feFuncA type="linear" slope="1"/></feComponentTransfer>
    </filter>
    <filter id="glow"><feGaussianBlur stdDeviation="8" result="blur"/>
      <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
    <filter id="softglow"><feGaussianBlur stdDeviation="15" result="blur"/>
      <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>'''

def brand_bar(bg_dark=True):
    fg = OFF_WHITE if bg_dark else NAVY
    teal = TEAL
    return f'''<line x1="48" y1="590" x2="1152" y2="590" stroke="{fg}" stroke-opacity="0.12" stroke-width="1"/>
    <text x="48" y="614" font-family="monospace" font-size="10" fill="{fg}" opacity="0.5" letter-spacing="0.08em">ENSO LABS</text>
    <circle cx="112" cy="611" r="2.5" fill="{teal}"/>
    <text x="122" y="614" font-family="monospace" font-size="10" fill="{fg}" opacity="0.4" letter-spacing="0.06em">INSIGHTS</text>'''

def pillar_badge(pillar, x=48, y=42, bg_dark=True):
    color = PILLAR_COLORS.get(pillar, TEAL)
    fg = OFF_WHITE if bg_dark else NAVY
    return f'''<rect x="{x}" y="{y-14}" width="{len(pillar)*9+16}" height="22" rx="4" fill="{color}" opacity="0.9"/>
    <text x="{x+8}" y="{y+1}" font-family="monospace" font-size="10" fill="{NAVY}" font-weight="700" letter-spacing="0.1em">{pillar.upper()}</text>'''

def title_text(title, x, y, size, fill, max_width=700, bg_dark=True):
    """Break title into lines that fit within max_width (rough estimate)."""
    words = title.split()
    lines = []
    current = ""
    chars_per_line = int(max_width / (size * 0.52))
    for w in words:
        test = current + " " + w if current else w
        if len(test) > chars_per_line:
            lines.append(current)
            current = w
        else:
            current = test
    if current:
        lines.append(current)
    
    result = []
    for i, line in enumerate(lines[:4]):
        ly = y + i * (size * 1.18)
        result.append(f'<text x="{x}" y="{ly}" font-family="Inter Tight, sans-serif" font-size="{size}" fill="{fill}" font-weight="700">{line}</text>')
    return "\n    ".join(result)


def svg_to_png(svg_str, filename):
    path = os.path.join(OUT, filename)
    cairosvg.svg2png(bytestring=svg_str.encode(), write_to=path, output_width=W, output_height=H)
    print(f"  ✓ {filename} ({os.path.getsize(path)//1024}KB)")


# ─────────────────────────────────────────────
# 1. Why deck-only AI consulting fails production
# ─────────────────────────────────────────────
def og_deck_only():
    # Warm coral background, broken gear icon, scattered slide shapes falling
    slides = []
    random.seed(42)
    for i in range(12):
        x = 700 + random.randint(-80, 380)
        y = 120 + random.randint(0, 400)
        rot = random.randint(-45, 45)
        opacity = 0.08 + random.random() * 0.12
        slides.append(f'<rect x="{x}" y="{y}" width="60" height="40" rx="3" fill="{OFF_WHITE}" opacity="{opacity:.2f}" transform="rotate({rot} {x+30} {y+20})"/>')
    slides_str = "\n    ".join(slides)
    
    # Gear teeth
    gear_paths = []
    cx, cy, r = 900, 300, 120
    for i in range(12):
        a1 = math.radians(i * 30 - 8)
        a2 = math.radians(i * 30 + 8)
        ir, otr = r - 15, r + 25
        x1, y1 = cx + ir * math.cos(a1), cy + ir * math.sin(a1)
        x2, y2 = cx + otr * math.cos(a1), cy + otr * math.sin(a1)
        x3, y3 = cx + otr * math.cos(a2), cy + otr * math.sin(a2)
        x4, y4 = cx + ir * math.cos(a2), cy + ir * math.sin(a2)
        gear_paths.append(f'<polygon points="{x1:.0f},{y1:.0f} {x2:.0f},{y2:.0f} {x3:.0f},{y3:.0f} {x4:.0f},{y4:.0f}" fill="none" stroke="{OFF_WHITE}" stroke-width="2" opacity="0.25"/>')
    gear_str = "\n    ".join(gear_paths)
    
    # Crack line through gear
    crack = f'<line x1="{cx-60}" y1="{cy-80}" x2="{cx+70}" y2="{cy+90}" stroke="{OFF_WHITE}" stroke-width="3" opacity="0.6" stroke-dasharray="8 4"/>'

    svg = f'''<svg viewBox="0 0 {W} {H}" xmlns="http://www.w3.org/2000/svg">
    <defs>{grain_defs()}</defs>
    <rect width="{W}" height="{H}" fill="{CORAL}"/>
    <rect width="{W}" height="{H}" fill="url(#grain)" opacity="0.03"/>
    {slides_str}
    <circle cx="{cx}" cy="{cy}" r="{r}" fill="none" stroke="{OFF_WHITE}" stroke-width="2.5" opacity="0.3"/>
    <circle cx="{cx}" cy="{cy}" r="{r-40}" fill="none" stroke="{OFF_WHITE}" stroke-width="1.5" opacity="0.2"/>
    {gear_str}
    {crack}
    {pillar_badge("Consult", bg_dark=False)}
    {title_text("Why deck-only AI consulting dies on contact with production.", 48, 120, 44, NAVY, 580)}
    <text x="48" y="540" font-family="monospace" font-size="12" fill="{NAVY}" opacity="0.5">THE AUTOPSY FROM FIFTEEN YEARS INSIDE THE ROOM</text>
    {brand_bar(bg_dark=False)}
    </svg>'''
    svg_to_png(svg, "og-why-deck-only-ai-consulting-fails-production.png")


# ─────────────────────────────────────────────
# 2. The Gore Lens
# ─────────────────────────────────────────────
def og_gore_lens():
    # Dark navy, large lens circle with 9 rule dots
    rule_dots = []
    rules = ["TEMP", "MATL", "CHEM", "PFAS", "MRKT", "LIAB", "RCNT", "NOVL", "200°C"]
    for i, rule in enumerate(rules):
        angle = math.radians(i * 40 - 90)
        rx, ry = 640 + 180 * math.cos(angle), 315 + 180 * math.sin(angle)
        color = TEAL if i % 2 == 0 else AMBER
        rule_dots.append(f'<circle cx="{rx:.0f}" cy="{ry:.0f}" r="8" fill="{color}" filter="url(#glow)"/>')
        rule_dots.append(f'<text x="{rx:.0f}" y="{ry + 24:.0f}" font-family="monospace" font-size="9" fill="{OFF_WHITE}" opacity="0.6" text-anchor="middle">{rule}</text>')
        # Connecting line to center
        rule_dots.append(f'<line x1="{rx:.0f}" y1="{ry:.0f}" x2="640" y2="315" stroke="{color}" stroke-width="0.5" opacity="0.3"/>')
    dots_str = "\n    ".join(rule_dots)
    
    # Concentric rings
    rings = []
    for r in [60, 100, 140, 180, 220]:
        rings.append(f'<circle cx="640" cy="315" r="{r}" fill="none" stroke="{TEAL}" stroke-width="0.5" opacity="{0.08 + r*0.001}"/>')
    rings_str = "\n    ".join(rings)

    svg = f'''<svg viewBox="0 0 {W} {H}" xmlns="http://www.w3.org/2000/svg">
    <defs>{grain_defs()}</defs>
    <rect width="{W}" height="{H}" fill="{NAVY}"/>
    <rect width="{W}" height="{H}" fill="url(#grain)" opacity="0.04"/>
    {rings_str}
    {dots_str}
    <circle cx="640" cy="315" r="28" fill="{TEAL}" opacity="0.15"/>
    <circle cx="640" cy="315" r="6" fill="{TEAL}"/>
    {pillar_badge("Build")}
    {title_text("The Gore Lens: encoding expert knowledge as toggleable rules.", 48, 100, 38, OFF_WHITE, 500)}
    <text x="48" y="560" font-family="monospace" font-size="11" fill="{OFF_WHITE}" opacity="0.4">9 RULES · INDEPENDENTLY TOGGLEABLE · TRUST THROUGH TRANSPARENCY</text>
    {brand_bar()}
    </svg>'''
    svg_to_png(svg, "og-gore-lens-expert-knowledge-encoding.png")


# ─────────────────────────────────────────────
# 3. MCP servers are the new SaaS integration
# ─────────────────────────────────────────────
def og_mcp_servers():
    # Bold split: coral left / dark sage right, large plug icon
    # Grid of dots on right side
    dots = []
    for gx in range(20):
        for gy in range(25):
            x = 640 + gx * 28
            y = 20 + gy * 25
            opacity = 0.06 + (gx * 0.008)
            dots.append(f'<circle cx="{x}" cy="{y}" r="1.5" fill="{TEAL}" opacity="{opacity:.2f}"/>')
    dots_str = "\n    ".join(dots)
    
    # Flow lines on right
    lines = []
    for i in range(6):
        y = 160 + i * 70
        lines.append(f'<line x1="680" y1="{y}" x2="1100" y2="{y}" stroke="{TEAL}" stroke-width="1" opacity="0.15" stroke-dasharray="4 8"/>')
        lines.append(f'<circle cx="680" cy="{y}" r="4" fill="{TEAL}" opacity="0.4"/>')
        lines.append(f'<circle cx="1100" cy="{y}" r="4" fill="{TEAL}" opacity="0.2"/>')
    lines_str = "\n    ".join(lines)

    # Plug icon (simplified)
    plug = f'''<rect x="420" y="220" width="160" height="180" rx="20" fill="none" stroke="{NAVY}" stroke-width="4" opacity="0.8"/>
    <rect x="460" y="260" width="30" height="60" rx="6" fill="{NAVY}" opacity="0.6"/>
    <rect x="510" y="260" width="30" height="60" rx="6" fill="{NAVY}" opacity="0.6"/>
    <line x1="475" y1="400" x2="475" y2="460" stroke="{NAVY}" stroke-width="4" opacity="0.5"/>
    <line x1="525" y1="400" x2="525" y2="460" stroke="{NAVY}" stroke-width="4" opacity="0.5"/>
    <line x1="460" y1="460" x2="540" y2="460" stroke="{NAVY}" stroke-width="4" opacity="0.5"/>'''

    svg = f'''<svg viewBox="0 0 {W} {H}" xmlns="http://www.w3.org/2000/svg">
    <defs>{grain_defs()}</defs>
    <rect width="620" height="{H}" fill="{CORAL}"/>
    <rect x="620" width="580" height="{H}" fill="{SAGE}"/>
    <rect width="{W}" height="{H}" fill="url(#grain)" opacity="0.03"/>
    {dots_str}
    {lines_str}
    {plug}
    {pillar_badge("Build", bg_dark=False)}
    {title_text("MCP servers are the new SaaS integration layer.", 48, 100, 40, NAVY, 540)}
    <text x="660" y="560" font-family="monospace" font-size="11" fill="{TEAL}" opacity="0.7" letter-spacing="0.06em">TOOL CALL → TYPED SURFACE → AGENT-NATIVE</text>
    {brand_bar(bg_dark=False)}
    </svg>'''
    svg_to_png(svg, "og-mcp-servers-new-saas-integration.png")


# ─────────────────────────────────────────────
# 4. RAG eval harness
# ─────────────────────────────────────────────
def og_rag_eval():
    # Deep green-black background, large checkmark, crossed-out DB icons
    # Scattered x-marks and check marks
    marks = []
    random.seed(99)
    for i in range(8):
        x = 700 + random.randint(0, 400)
        y = 80 + random.randint(0, 420)
        if i < 5:
            # X marks (bad: no eval)
            marks.append(f'<text x="{x}" y="{y}" font-family="sans-serif" font-size="32" fill="{CORAL}" opacity="0.2">✕</text>')
        else:
            marks.append(f'<text x="{x}" y="{y}" font-family="sans-serif" font-size="32" fill="{TEAL}" opacity="0.3">✓</text>')
    marks_str = "\n    ".join(marks)

    # Big checkmark
    check = f'''<path d="M 850 200 L 920 340 L 1060 120" fill="none" stroke="{TEAL}" stroke-width="8" stroke-linecap="round" stroke-linejoin="round" filter="url(#glow)"/>'''
    
    # Strikethrough bars (representing crossed-out vector stores)
    bars = []
    for i in range(3):
        y = 370 + i * 50
        bars.append(f'<rect x="780" y="{y}" width="280" height="30" rx="4" fill="{OFF_WHITE}" opacity="0.06"/>')
        bars.append(f'<line x1="780" y1="{y+15}" x2="1060" y2="{y+15}" stroke="{CORAL}" stroke-width="2" opacity="0.4"/>')
    bars_str = "\n    ".join(bars)

    svg = f'''<svg viewBox="0 0 {W} {H}" xmlns="http://www.w3.org/2000/svg">
    <defs>{grain_defs()}</defs>
    <rect width="{W}" height="{H}" fill="{DEEP_GREEN}"/>
    <rect width="{W}" height="{H}" fill="url(#grain)" opacity="0.04"/>
    {marks_str}
    {check}
    {bars_str}
    {pillar_badge("Build")}
    {title_text("Your RAG problem is an eval problem, not a vector-store problem.", 48, 100, 38, OFF_WHITE, 580)}
    <text x="48" y="540" font-family="monospace" font-size="12" fill="{TEAL}" opacity="0.5">BUILD THE EVAL FIRST · HAND-GRADE 50 QUERIES · SCORE EVERY CHANGE</text>
    {brand_bar()}
    </svg>'''
    svg_to_png(svg, "og-rag-eval-harness-not-vector-store.png")


# ─────────────────────────────────────────────
# 5. Kill switch / autonomous trading risk
# ─────────────────────────────────────────────
def og_kill_switch():
    # Black background, cream bar chart with one red "kill" bar, dramatic glow
    bars_svg = []
    bar_heights = [180, 240, 200, 310, 260, 280, 340, 150]
    bar_colors = [CREAM] * 7 + [CORAL]  # last bar is the kill bar
    for i, (h, c) in enumerate(zip(bar_heights, bar_colors)):
        x = 600 + i * 65
        y = 500 - h
        opacity = 0.85 if c == CORAL else 0.15
        filt = ' filter="url(#glow)"' if c == CORAL else ''
        bars_svg.append(f'<rect x="{x}" y="{y}" width="48" height="{h}" rx="4" fill="{c}" opacity="{opacity}"{filt}/>')
    bars_str = "\n    ".join(bars_svg)
    
    # Kill label
    kill_label = f'''<text x="{600 + 7*65 + 24}" y="{500 - 150 - 16}" font-family="monospace" font-size="14" fill="{CORAL}" text-anchor="middle" font-weight="700" filter="url(#glow)">KILL</text>'''

    svg = f'''<svg viewBox="0 0 {W} {H}" xmlns="http://www.w3.org/2000/svg">
    <defs>{grain_defs()}</defs>
    <rect width="{W}" height="{H}" fill="#0a0a0a"/>
    <rect width="{W}" height="{H}" fill="url(#grain)" opacity="0.04"/>
    <line x1="580" y1="500" x2="1140" y2="500" stroke="{CREAM}" stroke-width="1" opacity="0.15"/>
    {bars_str}
    {kill_label}
    {pillar_badge("Ship")}
    {title_text("In autonomous trading, the kill-switch is the architecture.", 48, 100, 40, OFF_WHITE, 500)}
    <text x="48" y="480" font-family="monospace" font-size="12" fill="{CORAL}" opacity="0.5">RISK CAPS → SCHEMAS · POSITION SIZING → TYPED FUNCTIONS · KILL SWITCH → FIRST</text>
    {brand_bar()}
    </svg>'''
    svg_to_png(svg, "og-autonomous-trading-risk-as-architecture.png")


# ─────────────────────────────────────────────
# 6. Pharma MLR compliance
# ─────────────────────────────────────────────
def og_pharma_mlr():
    # Cream background with amber accents, shield icon, timeline compression
    # Shield
    shield = f'''<path d="M 900 120 L 1020 170 L 1020 330 Q 1020 420 900 460 Q 780 420 780 330 L 780 170 Z" fill="none" stroke="{AMBER}" stroke-width="3" opacity="0.6"/>
    <path d="M 900 160 L 980 195 L 980 310 Q 980 380 900 410 Q 820 380 820 310 L 820 195 Z" fill="{AMBER}" opacity="0.08"/>
    <text x="900" y="305" font-family="sans-serif" font-size="48" fill="{AMBER}" text-anchor="middle" opacity="0.7">✓</text>'''
    
    # Timeline: 3mo → 2wk
    timeline = f'''<line x1="700" y1="540" x2="1100" y2="540" stroke="{AMBER}" stroke-width="2" opacity="0.3"/>
    <rect x="700" y="525" width="120" height="30" rx="4" fill="{AMBER}" opacity="0.15"/>
    <text x="760" y="545" font-family="monospace" font-size="13" fill="{AMBER}" text-anchor="middle" font-weight="700">3 MONTHS</text>
    <text x="910" y="545" font-family="monospace" font-size="20" fill="{AMBER}" text-anchor="middle">→</text>
    <rect x="980" y="525" width="100" height="30" rx="4" fill="{AMBER}" opacity="0.3"/>
    <text x="1030" y="545" font-family="monospace" font-size="13" fill="{NAVY}" text-anchor="middle" font-weight="700">2 WEEKS</text>'''

    svg = f'''<svg viewBox="0 0 {W} {H}" xmlns="http://www.w3.org/2000/svg">
    <defs>{grain_defs()}</defs>
    <rect width="{W}" height="{H}" fill="{CREAM}"/>
    <rect width="{W}" height="{H}" fill="url(#grain)" opacity="0.02"/>
    {shield}
    {timeline}
    {pillar_badge("Consult", bg_dark=False)}
    {title_text("An AI Center of Excellence that ships MLR-compliant work.", 48, 100, 40, NAVY, 580)}
    <text x="48" y="480" font-family="monospace" font-size="12" fill="{AMBER}" opacity="0.6">COMPLIANCE IS THE SPEC · NOT THE OBSTACLE</text>
    {brand_bar(bg_dark=False)}
    </svg>'''
    svg_to_png(svg, "og-ai-coe-pharma-mlr-compliance.png")


# ─────────────────────────────────────────────
# 7. Options flow analytics
# ─────────────────────────────────────────────
def og_options_flow():
    # Purple-black gradient, IV surface contour lines, cursor icon
    contours = []
    random.seed(77)
    for i in range(15):
        y_base = 100 + i * 35
        points = []
        for x in range(0, 1200, 40):
            y = y_base + 20 * math.sin(x * 0.008 + i * 0.5) + random.randint(-5, 5)
            points.append(f"{x},{y:.0f}")
        pts = " ".join(points)
        opacity = 0.06 + (i * 0.015)
        contours.append(f'<polyline points="{pts}" fill="none" stroke="{PURPLE}" stroke-width="1" opacity="{opacity:.2f}"/>')
    contours_str = "\n    ".join(contours)
    
    # Cursor / pointer
    cursor = f'''<polygon points="950,280 950,340 970,325" fill="{OFF_WHITE}" opacity="0.7"/>
    <rect x="990" y="305" width="80" height="28" rx="4" fill="{CORAL}" opacity="0.85"/>
    <text x="1030" y="324" font-family="monospace" font-size="11" fill="{OFF_WHITE}" text-anchor="middle" font-weight="700">SEND</text>'''

    svg = f'''<svg viewBox="0 0 {W} {H}" xmlns="http://www.w3.org/2000/svg">
    <defs>{grain_defs()}
    <linearGradient id="purpgrad" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#1a1030"/>
      <stop offset="100%" stop-color="#0d0818"/>
    </linearGradient></defs>
    <rect width="{W}" height="{H}" fill="url(#purpgrad)"/>
    <rect width="{W}" height="{H}" fill="url(#grain)" opacity="0.04"/>
    {contours_str}
    {cursor}
    {pillar_badge("Ship")}
    {title_text("Options flow analytics: decision support, not black box.", 48, 100, 40, OFF_WHITE, 550)}
    <text x="48" y="560" font-family="monospace" font-size="11" fill="{PURPLE}" opacity="0.6">HYPOTHESIS → VET → EXECUTE · HUMAN IN THE LOOP ON PURPOSE</text>
    {brand_bar()}
    </svg>'''
    svg_to_png(svg, "og-options-flow-decision-support-not-black-box.png")


# ─────────────────────────────────────────────
# 8. Principal-led vs 50-person consultancy
# ─────────────────────────────────────────────
def og_principal_led():
    # Warm cream background, bold "1" figure vs 50 small figures
    # 50 small person icons on right
    people = []
    for row in range(5):
        for col in range(10):
            x = 660 + col * 48
            y = 140 + row * 85
            people.append(f'<circle cx="{x}" cy="{y}" r="6" fill="{NAVY}" opacity="0.12"/>')
            people.append(f'<line x1="{x}" y1="{y+8}" x2="{x}" y2="{y+28}" stroke="{NAVY}" stroke-width="1.5" opacity="0.12"/>')
    people_str = "\n    ".join(people)
    
    # Big "1" figure
    big_person = f'''<circle cx="520" cy="240" r="35" fill="{TEAL}" opacity="0.8"/>
    <line x1="520" y1="278" x2="520" y2="380" stroke="{TEAL}" stroke-width="6" opacity="0.8"/>
    <text x="520" y="250" font-family="Inter Tight, sans-serif" font-size="28" fill="{NAVY}" text-anchor="middle" font-weight="700">1</text>'''
    
    # VS
    vs = f'<text x="590" y="310" font-family="monospace" font-size="16" fill="{NAVY}" opacity="0.3" text-anchor="middle">vs</text>'

    svg = f'''<svg viewBox="0 0 {W} {H}" xmlns="http://www.w3.org/2000/svg">
    <defs>{grain_defs()}</defs>
    <rect width="{W}" height="{H}" fill="{CREAM}"/>
    <rect width="{W}" height="{H}" fill="url(#grain)" opacity="0.02"/>
    {people_str}
    {big_person}
    {vs}
    {pillar_badge("Consult", bg_dark=False)}
    {title_text("A principal-led studio outperforms a 50-person consultancy.", 48, 90, 38, NAVY, 430)}
    <text x="48" y="540" font-family="monospace" font-size="12" fill="{AMBER}" opacity="0.5">DEPTH NOT PORTFOLIO · BUILDER CREDIBILITY · DIRECT SENIOR ACCESS</text>
    {brand_bar(bg_dark=False)}
    </svg>'''
    svg_to_png(svg, "og-principal-led-vs-50-person-consultancy.png")


# ─────────────────────────────────────────────
# 9. Anthropic Financial Services
# ─────────────────────────────────────────────
def og_anthropic_financial():
    # Dark split with teal accent line, partnership/co-brand feel
    # Timeline bar
    timeline = f'''<rect x="48" y="440" width="400" height="4" rx="2" fill="{TEAL}" opacity="0.6"/>
    <rect x="48" y="440" width="160" height="4" rx="2" fill="{TEAL}" opacity="1"/>
    <text x="48" y="470" font-family="monospace" font-size="10" fill="{TEAL}" opacity="0.7">2025 · ENSO LABS SHIPS</text>
    <text x="448" y="470" font-family="monospace" font-size="10" fill="{OFF_WHITE}" opacity="0.4">2026 · ANTHROPIC LAUNCHES</text>'''
    
    # Right side: abstract node grid (representing the 10 agents)
    nodes = []
    for i in range(10):
        row, col = divmod(i, 5)
        x = 720 + col * 80
        y = 200 + row * 120
        nodes.append(f'<rect x="{x}" y="{y}" width="56" height="56" rx="8" fill="{TEAL}" opacity="0.08"/>')
        nodes.append(f'<rect x="{x+4}" y="{y+4}" width="48" height="48" rx="6" fill="none" stroke="{TEAL}" stroke-width="1" opacity="0.25"/>')
        nodes.append(f'<text x="{x+28}" y="{y+34}" font-family="monospace" font-size="14" fill="{TEAL}" opacity="0.4" text-anchor="middle">{i+1:02d}</text>')
    nodes_str = "\n    ".join(nodes)

    svg = f'''<svg viewBox="0 0 {W} {H}" xmlns="http://www.w3.org/2000/svg">
    <defs>{grain_defs()}</defs>
    <rect width="{W}" height="{H}" fill="{NAVY}"/>
    <rect width="{W}" height="{H}" fill="url(#grain)" opacity="0.04"/>
    <line x1="660" y1="0" x2="660" y2="{H}" stroke="{TEAL}" stroke-width="1" opacity="0.15"/>
    {nodes_str}
    {timeline}
    {pillar_badge("Ship")}
    {title_text("Anthropic Just Launched 10 Financial AI Agents. We Built Ours Last Year.", 48, 100, 34, OFF_WHITE, 560)}
    <text x="48" y="560" font-family="monospace" font-size="11" fill="{TEAL}" opacity="0.5">EARLY MOVERS · STRUCTURAL ADVANTAGE · 12 MONTHS OF PRODUCTION DATA</text>
    {brand_bar()}
    </svg>'''
    svg_to_png(svg, "og-anthropic-financial-services-what-it-means.png")


# ─────────────────────────────────────────────
# 10. MCP for Brokerage
# ─────────────────────────────────────────────
def og_mcp_brokerage():
    # Navy background, Agent → MCP → Broker flow
    # Flow boxes
    boxes = [
        (120, 250, "AI AGENT", TEAL),
        (460, 250, "MCP SERVER", TEAL),
        (800, 250, "BROKERAGE", AMBER),
    ]
    flow_parts = []
    for x, y, label, color in boxes:
        flow_parts.append(f'<rect x="{x}" y="{y}" width="200" height="80" rx="8" fill="none" stroke="{color}" stroke-width="2" opacity="0.6"/>')
        flow_parts.append(f'<rect x="{x}" y="{y}" width="200" height="80" rx="8" fill="{color}" opacity="0.06"/>')
        flow_parts.append(f'<text x="{x+100}" y="{y+46}" font-family="monospace" font-size="13" fill="{color}" text-anchor="middle" font-weight="700">{label}</text>')
    
    # Arrows
    flow_parts.append(f'<line x1="320" y1="290" x2="455" y2="290" stroke="{TEAL}" stroke-width="2" opacity="0.5" marker-end="none"/>')
    flow_parts.append(f'<polygon points="450,285 460,290 450,295" fill="{TEAL}" opacity="0.5"/>')
    flow_parts.append(f'<line x1="660" y1="290" x2="795" y2="290" stroke="{AMBER}" stroke-width="2" opacity="0.5"/>')
    flow_parts.append(f'<polygon points="790,285 800,290 790,295" fill="{AMBER}" opacity="0.5"/>')
    
    # Sub-labels
    flow_parts.append(f'<text x="390" y="270" font-family="monospace" font-size="9" fill="{TEAL}" text-anchor="middle" opacity="0.5">TOOL CALL</text>')
    flow_parts.append(f'<text x="730" y="270" font-family="monospace" font-size="9" fill="{AMBER}" text-anchor="middle" opacity="0.5">REST API</text>')
    
    # Risk control box below MCP
    flow_parts.append(f'<rect x="420" y="370" width="280" height="50" rx="6" fill="none" stroke="{CORAL}" stroke-width="1.5" opacity="0.4"/>')
    flow_parts.append(f'<text x="560" y="400" font-family="monospace" font-size="10" fill="{CORAL}" text-anchor="middle" opacity="0.6">PRE-TRADE RISK CONTROLS · AUDIT TRAIL</text>')
    flow_parts.append(f'<line x1="560" y1="330" x2="560" y2="368" stroke="{CORAL}" stroke-width="1" opacity="0.3" stroke-dasharray="3 3"/>')
    
    flow_str = "\n    ".join(flow_parts)

    svg = f'''<svg viewBox="0 0 {W} {H}" xmlns="http://www.w3.org/2000/svg">
    <defs>{grain_defs()}</defs>
    <rect width="{W}" height="{H}" fill="{NAVY}"/>
    <rect width="{W}" height="{H}" fill="url(#grain)" opacity="0.04"/>
    {flow_str}
    {pillar_badge("Build")}
    {title_text("MCP for Brokerage: How Model Context Protocol Is Connecting AI to Trading.", 48, 80, 32, OFF_WHITE, 1060)}
    <text x="48" y="560" font-family="monospace" font-size="11" fill="{TEAL}" opacity="0.5">ALPACA · INTERACTIVE BROKERS · SCHWAB · TRADESTATION → TYPED TOOL SURFACE</text>
    {brand_bar()}
    </svg>'''
    svg_to_png(svg, "og-mcp-brokerage-trading-model-context-protocol.png")


# ─────────────────────────────────────────────
# 11. Claude Partner Network / Boutique
# ─────────────────────────────────────────────
def og_claude_partner():
    # Split: ochre/amber left, cream right, terminal window
    # Terminal window on right
    terminal = f'''<rect x="620" y="140" width="500" height="340" rx="10" fill="{NAVY}" opacity="0.95"/>
    <circle cx="645" cy="160" r="5" fill="{CORAL}" opacity="0.7"/>
    <circle cx="663" cy="160" r="5" fill="{AMBER}" opacity="0.7"/>
    <circle cx="681" cy="160" r="5" fill="{TEAL}" opacity="0.7"/>
    <line x1="620" y1="175" x2="1120" y2="175" stroke="{OFF_WHITE}" stroke-width="0.5" opacity="0.1"/>
    <text x="645" y="210" font-family="monospace" font-size="12" fill="{TEAL}" opacity="0.8">$ show-me-the-system-you-shipped</text>
    <text x="645" y="235" font-family="monospace" font-size="11" fill="{OFF_WHITE}" opacity="0.4">Loading production deployment...</text>
    <text x="645" y="265" font-family="monospace" font-size="11" fill="{TEAL}" opacity="0.5">✓ Trading Terminal — 12mo uptime</text>
    <text x="645" y="285" font-family="monospace" font-size="11" fill="{TEAL}" opacity="0.5">✓ signal2noise — daily since 2025</text>
    <text x="645" y="305" font-family="monospace" font-size="11" fill="{TEAL}" opacity="0.5">✓ MCP servers — 6 in production</text>
    <text x="645" y="335" font-family="monospace" font-size="11" fill="{AMBER}" opacity="0.6">The only credential that matters.</text>
    <rect x="645" y="350" width="8" height="16" fill="{TEAL}" opacity="0.6">
      <animate attributeName="opacity" values="0.6;0;0.6" dur="1.2s" repeatCount="indefinite"/>
    </rect>'''

    svg = f'''<svg viewBox="0 0 {W} {H}" xmlns="http://www.w3.org/2000/svg">
    <defs>{grain_defs()}</defs>
    <rect width="600" height="{H}" fill="{AMBER}" opacity="0.85"/>
    <rect x="600" width="600" height="{H}" fill="{CREAM}"/>
    <rect width="{W}" height="{H}" fill="url(#grain)" opacity="0.03"/>
    {terminal}
    {pillar_badge("Consult", bg_dark=False)}
    {title_text("Why Boutique Firms Are the Right Claude Implementation Partner.", 48, 100, 36, NAVY, 500)}
    <text x="48" y="520" font-family="monospace" font-size="12" fill="{NAVY}" opacity="0.4">$100M PARTNER NETWORK · ACCENTURE · DELOITTE · PWC</text>
    <text x="48" y="540" font-family="monospace" font-size="12" fill="{NAVY}" opacity="0.6">BUT ASK: SHOW ME THE SYSTEM YOU SHIPPED.</text>
    {brand_bar(bg_dark=False)}
    </svg>'''
    svg_to_png(svg, "og-claude-partner-network-boutique-implementation.png")


# ─────────────────────────────────────────────
# Run all
# ─────────────────────────────────────────────
if __name__ == "__main__":
    print("Generating 11 OG images...")
    print()
    og_deck_only()
    og_gore_lens()
    og_mcp_servers()
    og_rag_eval()
    og_kill_switch()
    og_pharma_mlr()
    og_options_flow()
    og_principal_led()
    og_anthropic_financial()
    og_mcp_brokerage()
    og_claude_partner()
    print()
    print("Done! All 11 OG images generated.")
