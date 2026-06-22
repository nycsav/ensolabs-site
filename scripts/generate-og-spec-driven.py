#!/usr/bin/env python3
"""Generate the OG image for the spec-driven-multi-agent-trading-ibm-watsonx-data
insight article. Brand language: dark navy, teal, terminal/agent-flow aesthetic,
HEX COLORS ONLY (Satori/OG safe). Matches scripts/generate_og.py system."""

import cairosvg, os

OUT = os.path.join(os.path.dirname(__file__), "..", "public", "og")
W, H = 1200, 630

NAVY = "#0d1321"
TEAL = "#5ce0d2"
OFF_WHITE = "#f2efe8"
AMBER = "#d4944c"
CORAL = "#e85d4a"

def grain_defs():
    return '''<filter id="grain" x="0" y="0" width="100%" height="100%">
      <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" result="noise"/>
      <feColorMatrix type="saturate" values="0" in="noise" result="gray"/>
      <feBlend in="SourceGraphic" in2="gray" mode="overlay" result="blend"/>
    </filter>
    <filter id="glow"><feGaussianBlur stdDeviation="6" result="blur"/>
      <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>'''

def pillar_badge(pillar, x=48, y=42):
    return f'''<rect x="{x}" y="{y-14}" width="{len(pillar)*9+16}" height="22" rx="4" fill="{TEAL}" opacity="0.9"/>
    <text x="{x+8}" y="{y+1}" font-family="monospace" font-size="10" fill="{NAVY}" font-weight="700" letter-spacing="0.1em">{pillar.upper()}</text>'''

def brand_bar():
    return f'''<line x1="48" y1="590" x2="1152" y2="590" stroke="{OFF_WHITE}" stroke-opacity="0.12" stroke-width="1"/>
    <text x="48" y="614" font-family="monospace" font-size="10" fill="{OFF_WHITE}" opacity="0.5" letter-spacing="0.08em">ENSO LABS</text>
    <circle cx="112" cy="611" r="2.5" fill="{TEAL}"/>
    <text x="122" y="614" font-family="monospace" font-size="10" fill="{OFF_WHITE}" opacity="0.4" letter-spacing="0.06em">INSIGHTS</text>'''

def title_text(title, x, y, size, fill, max_width=560):
    words = title.split()
    lines, current = [], ""
    cpl = int(max_width / (size * 0.52))
    for w in words:
        test = current + " " + w if current else w
        if len(test) > cpl:
            lines.append(current); current = w
        else:
            current = test
    if current: lines.append(current)
    out = []
    for i, line in enumerate(lines[:4]):
        ly = y + i * (size * 1.18)
        out.append(f'<text x="{x}" y="{ly}" font-family="Inter Tight, sans-serif" font-size="{size}" fill="{fill}" font-weight="700">{line}</text>')
    return "\n    ".join(out)

# Four-agent vertical pipeline on the right: Researcher -> Trader -> Executor -> Monitor
agents = [
    ("01", "RESEARCHER", "scores 23 instruments"),
    ("02", "TRADER", "sizes setups, risk ≤ 1%"),
    ("03", "EXECUTOR", "next-bar open only"),
    ("04", "MONITOR", "owns every exit"),
]
nodes = []
bx, bw, bh, gap = 700, 400, 88, 22
top = 120
for i, (num, name, sub) in enumerate(agents):
    y = top + i * (bh + gap)
    nodes.append(f'<rect x="{bx}" y="{y}" width="{bw}" height="{bh}" rx="10" fill="{TEAL}" opacity="0.06"/>')
    nodes.append(f'<rect x="{bx}" y="{y}" width="{bw}" height="{bh}" rx="10" fill="none" stroke="{TEAL}" stroke-width="1.5" opacity="0.35"/>')
    nodes.append(f'<text x="{bx+24}" y="{y+38}" font-family="monospace" font-size="13" fill="{TEAL}" opacity="0.6">{num}</text>')
    nodes.append(f'<text x="{bx+62}" y="{y+38}" font-family="monospace" font-size="20" fill="{OFF_WHITE}" font-weight="700" letter-spacing="0.08em">{name}</text>')
    nodes.append(f'<text x="{bx+62}" y="{y+62}" font-family="monospace" font-size="12" fill="{OFF_WHITE}" opacity="0.45">{sub}</text>')
    if i < len(agents) - 1:
        ay = y + bh
        nodes.append(f'<line x1="{bx+bw//2}" y1="{ay}" x2="{bx+bw//2}" y2="{ay+gap}" stroke="{TEAL}" stroke-width="1.5" opacity="0.4"/>')
        nodes.append(f'<polygon points="{bx+bw//2-5},{ay+gap-6} {bx+bw//2+5},{ay+gap-6} {bx+bw//2},{ay+gap}" fill="{TEAL}" opacity="0.5"/>')
nodes_str = "\n    ".join(nodes)

svg = f'''<svg viewBox="0 0 {W} {H}" xmlns="http://www.w3.org/2000/svg">
<defs>{grain_defs()}</defs>
<rect width="{W}" height="{H}" fill="{NAVY}"/>
<rect width="{W}" height="{H}" fill="url(#grain)" opacity="0.04"/>
<line x1="660" y1="0" x2="660" y2="{H}" stroke="{TEAL}" stroke-width="1" opacity="0.12"/>
{nodes_str}
{pillar_badge("Build")}
{title_text("Four agents. One afternoon. Spec-first.", 48, 150, 56, OFF_WHITE, 540)}
<text x="48" y="430" font-family="monospace" font-size="13" fill="{TEAL}" opacity="0.7" letter-spacing="0.04em">TRADECREW · IBM watsonx.data</text>
<text x="48" y="460" font-family="monospace" font-size="12" fill="{OFF_WHITE}" opacity="0.45">Cassandra + Iceberg · Presto federation</text>
<text x="48" y="500" font-family="monospace" font-size="12" fill="{AMBER}" opacity="0.7">24 REQS · 33 TESTS · EVERY BEHAVIOR TRACED</text>
{brand_bar()}
</svg>'''

os.makedirs(OUT, exist_ok=True)
path = os.path.join(OUT, "og-spec-driven-multi-agent-trading-ibm-watsonx-data.png")
cairosvg.svg2png(bytestring=svg.encode(), write_to=path, output_width=W, output_height=H)
print(f"OK {path} ({os.path.getsize(path)//1024}KB)")
