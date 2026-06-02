// SERVER-ONLY. Intent interpretation + recommended-action generation via Claude.
// Never import from a client component — it reads the Anthropic API key.

import Anthropic from '@anthropic-ai/sdk';
import { RULES } from './rules';
import type { RuleId } from './rules';
import { PipelineError } from './pipeline';

const CLAUDE_MODEL =
  process.env.SIGNAL_LENS_ADVISOR_MODEL || process.env.SIGNAL_LENS_MODEL || 'claude-opus-4-8';

function client(): Anthropic {
  if (!process.env.ANTHROPIC_API_KEY) {
    throw new PipelineError('missing_keys', 'Missing ANTHROPIC_API_KEY.');
  }
  return new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
}

function clampMult(n: unknown): number {
  const x = typeof n === 'number' ? n : Number(n);
  if (Number.isNaN(x)) return 1;
  return Math.max(0.25, Math.min(2.5, x));
}

// ---- Intent → rule-weight multipliers ----
export interface IntentResult {
  weights: Partial<Record<RuleId, number>>;
  summary: string; // one-line read-back of how the lens was retuned
}

export async function interpretIntent(intent: string): Promise<IntentResult> {
  const ruleLines = RULES.map(
    (r) => `- ${r.id} ("${r.label}", ${r.dimension}): ${r.blurb}`
  ).join('\n');

  const tool: Anthropic.Tool = {
    name: 'retune_lens',
    description:
      'Retune the Signal Lens for the user\'s stated intent by setting a weight ' +
      'multiplier for each rule and giving a one-line summary of the change.',
    input_schema: {
      type: 'object',
      properties: {
        weights: {
          type: 'object',
          description:
            'Multiplier per rule id. 1 = unchanged, >1 emphasize (up to 2.5), ' +
            '<1 de-emphasize (down to 0.25). Only include rules you are changing.',
          properties: RULES.reduce((acc, r) => {
            acc[r.id] = { type: 'number', minimum: 0.25, maximum: 2.5 };
            return acc;
          }, {} as Record<string, unknown>),
        },
        summary: {
          type: 'string',
          description: 'One sentence: which dimensions/rules you emphasized and why.',
        },
      },
      required: ['weights', 'summary'],
    },
  };

  let message: Anthropic.Message;
  try {
    message = await client().messages.create({
      model: CLAUDE_MODEL,
      max_tokens: 1024,
      tools: [tool],
      tool_choice: { type: 'tool', name: 'retune_lens' },
      system:
        'You retune a market-intelligence relevance lens to match an analyst\'s ' +
        'intent. The lens scores signals on three dimensions — Real (credible & ' +
        'in-scope), Win (commercially winnable), Worth (technically worth it) — via ' +
        'these rules:\n' +
        ruleLines +
        '\n\nGiven the intent, raise the multipliers on the rules that matter most ' +
        'to that goal and lower the ones that matter less. Be decisive but ' +
        'proportionate; most multipliers should stay near 1.',
      messages: [{ role: 'user', content: `Analyst intent: ${intent}` }],
    });
  } catch (err) {
    throw new PipelineError(
      'claude_failed',
      `Intent interpretation failed: ${err instanceof Error ? err.message : String(err)}`
    );
  }

  const toolUse = message.content.find(
    (b): b is Anthropic.ToolUseBlock => b.type === 'tool_use'
  );
  const input = toolUse?.input as { weights?: Record<string, unknown>; summary?: unknown } | undefined;
  if (!input) throw new PipelineError('claude_failed', 'No intent tuning returned.');

  const weights: Partial<Record<RuleId, number>> = {};
  for (const r of RULES) {
    const v = input.weights?.[r.id];
    if (v !== undefined && v !== null) weights[r.id] = clampMult(v);
  }
  return {
    weights,
    summary: String(input.summary || 'Lens retuned for the stated intent.').trim(),
  };
}

// ---- Top signals → recommended next steps ----
export type Priority = 'act-now' | 'monitor' | 'pass';

export interface SignalBrief {
  title: string;
  source: string;
  recencyDays: number;
  relevance: number;
  real: number;
  win: number;
  worth: number;
}

export interface Recommendation {
  index: number;
  action: string;
  rationale: string;
  priority: Priority;
}

const VALID_PRIORITY: Priority[] = ['act-now', 'monitor', 'pass'];

export async function recommendActions(
  signals: SignalBrief[],
  intent: string
): Promise<Recommendation[]> {
  const tool: Anthropic.Tool = {
    name: 'record_recommendations',
    description: 'Record a recommended next step for each signal, in input order.',
    input_schema: {
      type: 'object',
      properties: {
        recommendations: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              index: { type: 'integer', description: '0-based index of the signal' },
              priority: { type: 'string', enum: VALID_PRIORITY },
              action: {
                type: 'string',
                description: 'A concrete next step (imperative, <= 18 words).',
              },
              rationale: {
                type: 'string',
                description: 'One sentence tying the action to the scores and intent.',
              },
            },
            required: ['index', 'priority', 'action', 'rationale'],
          },
        },
      },
      required: ['recommendations'],
    },
  };

  const list = signals
    .map(
      (s, i) =>
        `[${i}] ${s.title}\n    source ${s.source}, ${s.recencyDays}d old · ` +
        `relevance ${s.relevance.toFixed(2)} (Real ${s.real.toFixed(2)} / ` +
        `Win ${s.win.toFixed(2)} / Worth ${s.worth.toFixed(2)})`
    )
    .join('\n');

  let message: Anthropic.Message;
  try {
    message = await client().messages.create({
      model: CLAUDE_MODEL,
      max_tokens: 2048,
      tools: [tool],
      tool_choice: { type: 'tool', name: 'record_recommendations' },
      system:
        'You are a principal research-intelligence advisor. For each signal, give ' +
        'one concrete, decision-ready next step and a one-sentence rationale. Use ' +
        'priority "act-now" for high-relevance, in-scope, time-sensitive items; ' +
        '"monitor" for promising-but-not-yet items; "pass" for low-relevance noise. ' +
        'Be specific (name the move: validate, contact, license, prototype, brief, ' +
        'shelve) and tie it to the scores.' +
        (intent ? ` The analyst\'s stated intent: ${intent}` : ''),
      messages: [
        {
          role: 'user',
          content: `Recommend a next step for each of these ${signals.length} ranked signals:\n\n${list}`,
        },
      ],
    });
  } catch (err) {
    throw new PipelineError(
      'claude_failed',
      `Recommendation generation failed: ${err instanceof Error ? err.message : String(err)}`
    );
  }

  const toolUse = message.content.find(
    (b): b is Anthropic.ToolUseBlock => b.type === 'tool_use'
  );
  const rows = (toolUse?.input as { recommendations?: Recommendation[] } | undefined)
    ?.recommendations;
  if (!rows || rows.length === 0) {
    throw new PipelineError('claude_failed', 'Claude returned no recommendations.');
  }

  return rows
    .filter((r) => typeof r.index === 'number')
    .map((r) => ({
      index: r.index,
      action: String(r.action || '').trim(),
      rationale: String(r.rationale || '').trim(),
      priority: VALID_PRIORITY.includes(r.priority) ? r.priority : 'monitor',
    }));
}
