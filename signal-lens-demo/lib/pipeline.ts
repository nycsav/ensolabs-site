// SERVER-ONLY. Live signal pipeline: Perplexity sources recent developments,
// Claude scores each against the Signal Lens rules. Never import this from a
// client component — it reads API keys and pulls in the Anthropic SDK.

import Anthropic from '@anthropic-ai/sdk';
import { RULES } from './rules';
import type { RuleId } from './rules';
import type { Signal, SourceType } from './data';

// Scoring model. Defaults to the most capable model; override with
// SIGNAL_LENS_MODEL (e.g. claude-sonnet-4-6 / claude-haiku-4-5) for cheaper runs.
const CLAUDE_MODEL = process.env.SIGNAL_LENS_MODEL || 'claude-opus-4-8';
const PERPLEXITY_MODEL = process.env.PERPLEXITY_MODEL || 'sonar';
const PERPLEXITY_URL = 'https://api.perplexity.ai/chat/completions';

const VALID_SOURCES: SourceType[] = ['peer-reviewed', 'patent', 'commercial', 'preprint'];

export class PipelineError extends Error {
  code: 'missing_keys' | 'perplexity_failed' | 'claude_failed' | 'empty';
  constructor(code: PipelineError['code'], message: string) {
    super(message);
    this.code = code;
    this.name = 'PipelineError';
  }
}

export function missingKeys(): string[] {
  const missing: string[] = [];
  if (!process.env.PERPLEXITY_API_KEY) missing.push('PERPLEXITY_API_KEY');
  if (!process.env.ANTHROPIC_API_KEY) missing.push('ANTHROPIC_API_KEY');
  return missing;
}

interface RawSignal {
  title: string;
  source: SourceType;
  recencyDays: number;
  summary: string;
}

// Pull the first JSON array out of a model's text response, tolerating prose or
// markdown fences around it.
function extractJsonArray(text: string): unknown {
  const fenced = text.match(/```(?:json)?\s*([\s\S]*?)```/);
  const candidate = fenced ? fenced[1] : text;
  const start = candidate.indexOf('[');
  const end = candidate.lastIndexOf(']');
  if (start === -1 || end === -1 || end < start) {
    throw new PipelineError('perplexity_failed', 'No JSON array found in response.');
  }
  return JSON.parse(candidate.slice(start, end + 1));
}

function normalizeSource(s: unknown): SourceType {
  const v = String(s || '').toLowerCase().trim();
  return (VALID_SOURCES as string[]).includes(v) ? (v as SourceType) : 'commercial';
}

function clamp01(n: unknown): number {
  const x = typeof n === 'number' ? n : Number(n);
  if (Number.isNaN(x)) return 0.5;
  return Math.max(0, Math.min(1, x));
}

// ---- Step 1: Perplexity sources recent, web-grounded developments. ----
async function sourceSignals(topic: string, count: number): Promise<RawSignal[]> {
  const res = await fetch(PERPLEXITY_URL, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.PERPLEXITY_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: PERPLEXITY_MODEL,
      messages: [
        {
          role: 'system',
          content:
            'You are a market-intelligence sourcing agent. Return ONLY a JSON array, no prose. ' +
            'Each element: {"title": string, "source": one of ' +
            '"peer-reviewed"|"patent"|"commercial"|"preprint", "recencyDays": integer estimate of ' +
            'days since publication, "summary": one or two factual sentences}.',
        },
        {
          role: 'user',
          content: `Find ${count} recent, distinct, real developments about: ${topic}. Prioritize concrete, technical, recent items over generic overviews.`,
        },
      ],
      temperature: 0.2,
    }),
  });

  if (!res.ok) {
    const body = await res.text().catch(() => '');
    throw new PipelineError(
      'perplexity_failed',
      `Perplexity request failed (${res.status}). ${body.slice(0, 200)}`
    );
  }

  const data = await res.json();
  const content: string = data?.choices?.[0]?.message?.content ?? '';
  const parsed = extractJsonArray(content);
  if (!Array.isArray(parsed)) {
    throw new PipelineError('perplexity_failed', 'Perplexity did not return an array.');
  }

  const raw = parsed
    .filter((r): r is Record<string, unknown> => !!r && typeof r === 'object')
    .map((r) => ({
      title: String(r.title || '').trim(),
      source: normalizeSource(r.source),
      recencyDays: Math.max(0, Math.round(Number(r.recencyDays) || 30)),
      summary: String(r.summary || '').trim(),
    }))
    .filter((r) => r.title.length > 0);

  if (raw.length === 0) {
    throw new PipelineError('empty', `No signals found for "${topic}".`);
  }
  return raw;
}

// Static scoring rubric — marked for caching. (It's short, so on Opus it may sit
// below the cacheable minimum and simply not cache; that's harmless.)
function buildRubric(): string {
  const lines = RULES.map(
    (r) => `- ${r.id} ("${r.label}", dimension ${r.dimension}): ${r.blurb}`
  ).join('\n');
  return (
    'You are a lead materials scientist applying the "Signal Lens" — an expert-' +
    'knowledge relevance framework. For each signal, score how strongly it ' +
    'satisfies each rule from 0.0 (not at all) to 1.0 (perfectly), then give a ' +
    'single groundTruth value (0.0-1.0) for the signal\'s true overall relevance ' +
    'to a high-temperature advanced-materials R&D program. Be discerning: generic ' +
    'press releases, rebrands, and review articles with no new data should score ' +
    'low; novel, in-scope, high-temperature technical results should score high.\n\n' +
    'The rules:\n' +
    lines
  );
}

// Anthropic tool — forces schema-valid structured output for the scores.
// (Forced tool_choice is intentionally used instead of extended thinking, which
// is incompatible with forcing a specific tool.)
function buildScoringTool(): Anthropic.Tool {
  const attrProps: Record<string, unknown> = {};
  for (const r of RULES) {
    attrProps[r.id] = {
      type: 'number',
      minimum: 0,
      maximum: 1,
      description: r.label,
    };
  }
  return {
    name: 'record_scores',
    description: 'Record the Signal Lens scores for every signal, in input order.',
    input_schema: {
      type: 'object',
      properties: {
        scores: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              index: { type: 'integer', description: '0-based index of the signal' },
              attrs: {
                type: 'object',
                properties: attrProps,
                required: RULES.map((r) => r.id),
              },
              groundTruth: { type: 'number', minimum: 0, maximum: 1 },
            },
            required: ['index', 'attrs', 'groundTruth'],
          },
        },
      },
      required: ['scores'],
    },
  };
}

interface ScoreRow {
  index: number;
  attrs: Record<RuleId, number>;
  groundTruth: number;
}

// ---- Step 2: Claude scores the sourced signals against the lens. ----
async function scoreSignals(raw: RawSignal[]): Promise<Signal[]> {
  const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
  const tool = buildScoringTool();

  const list = raw
    .map(
      (r, i) =>
        `[${i}] ${r.title} (source: ${r.source}, recency: ${r.recencyDays}d)\n    ${r.summary}`
    )
    .join('\n');

  let message: Anthropic.Message;
  try {
    message = await client.messages.create({
      model: CLAUDE_MODEL,
      max_tokens: 8192,
      tools: [tool],
      tool_choice: { type: 'tool', name: 'record_scores' },
      system: [
        {
          type: 'text',
          text: buildRubric(),
          cache_control: { type: 'ephemeral' },
        },
      ],
      messages: [
        {
          role: 'user',
          content: `Score these ${raw.length} signals. Return one entry per signal, by index.\n\n${list}`,
        },
      ],
    });
  } catch (err) {
    throw new PipelineError(
      'claude_failed',
      `Claude scoring failed: ${err instanceof Error ? err.message : String(err)}`
    );
  }

  const toolUse = message.content.find(
    (b): b is Anthropic.ToolUseBlock => b.type === 'tool_use'
  );
  const rows = (toolUse?.input as { scores?: ScoreRow[] } | undefined)?.scores;
  if (!rows || rows.length === 0) {
    throw new PipelineError('claude_failed', 'Claude returned no scores.');
  }

  const byIndex = new Map<number, ScoreRow>();
  for (const row of rows) byIndex.set(row.index, row);

  return raw.map((r, i) => {
    const row = byIndex.get(i);
    const attrs = {} as Record<RuleId, number>;
    for (const rule of RULES) {
      attrs[rule.id] = clamp01(row?.attrs?.[rule.id]);
    }
    return {
      id: `live-${i + 1}`,
      title: r.title,
      source: r.source,
      recencyDays: r.recencyDays,
      attrs,
      groundTruth: clamp01(row?.groundTruth),
    } satisfies Signal;
  });
}

// Public entry point: topic in, scored live signals out.
export async function fetchLiveSignals(topic: string, count = 12): Promise<Signal[]> {
  const missing = missingKeys();
  if (missing.length > 0) {
    throw new PipelineError(
      'missing_keys',
      `Missing API key(s): ${missing.join(', ')}. Add them to signal-lens-demo/.env.local.`
    );
  }
  const raw = await sourceSignals(topic, count);
  return scoreSignals(raw);
}
