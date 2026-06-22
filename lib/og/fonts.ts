/**
 * Embedded brand fonts for OG / social image rendering (next/og `ImageResponse`).
 *
 * The .ttf binaries in ./fonts are bundled and read at render time with
 * `fs.readFileSync(new URL(..., import.meta.url))` — so OG images render in the
 * real brand faces (Lora · Inter Tight · JetBrains Mono) with **no system fallback**
 * and **no runtime network fetch**. The `new URL(..., import.meta.url)` reference lets
 * Next file-trace the .ttf into the serverless bundle. Requires the `nodejs` runtime
 * (the routes declare it). Colors come from the single source: brand/strategy-to-ship/tokens.ts.
 */
import { readFileSync } from 'node:fs';
import { STS } from '@/brand/strategy-to-ship/tokens';

export { STS };

export type OgFont = {
  name: string;
  data: Buffer;
  weight: 400 | 500 | 600;
  style: 'normal';
};

function load(file: string): Buffer {
  return readFileSync(new URL(`./fonts/${file}`, import.meta.url));
}

/** Full Strategy to Ship publication set — Lora headlines + Inter Tight body + JetBrains Mono meta. */
export async function stsOgFonts(): Promise<OgFont[]> {
  return [
    { name: 'Inter Tight', data: load('InterTight-400.ttf'), weight: 400, style: 'normal' },
    { name: 'Inter Tight', data: load('InterTight-500.ttf'), weight: 500, style: 'normal' },
    { name: 'Inter Tight', data: load('InterTight-600.ttf'), weight: 600, style: 'normal' },
    { name: 'Lora', data: load('Lora-600.ttf'), weight: 600, style: 'normal' },
    { name: 'JetBrains Mono', data: load('JetBrainsMono-400.ttf'), weight: 400, style: 'normal' },
    { name: 'JetBrains Mono', data: load('JetBrainsMono-500.ttf'), weight: 500, style: 'normal' },
  ];
}

/** Enso studio set (no Lora) — for the navy studio OG cards. */
export async function ensoOgFonts(): Promise<OgFont[]> {
  return [
    { name: 'Inter Tight', data: load('InterTight-400.ttf'), weight: 400, style: 'normal' },
    { name: 'Inter Tight', data: load('InterTight-500.ttf'), weight: 500, style: 'normal' },
    { name: 'Inter Tight', data: load('InterTight-600.ttf'), weight: 600, style: 'normal' },
    { name: 'JetBrains Mono', data: load('JetBrainsMono-400.ttf'), weight: 400, style: 'normal' },
    { name: 'JetBrains Mono', data: load('JetBrainsMono-500.ttf'), weight: 500, style: 'normal' },
  ];
}
