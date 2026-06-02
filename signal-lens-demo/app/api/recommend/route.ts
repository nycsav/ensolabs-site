import { NextResponse } from 'next/server';
import { missingKeys, PipelineError } from '@/lib/pipeline';
import { recommendActions } from '@/lib/advisor';
import type { SignalBrief } from '@/lib/advisor';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

// POST { signals: SignalBrief[], intent?: string }
// → { recommendations: Recommendation[] } on success
export async function POST(req: Request) {
  let body: { signals?: unknown; intent?: unknown };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'bad_request', message: 'Invalid JSON body.' }, { status: 400 });
  }

  const raw = Array.isArray(body.signals) ? body.signals : [];
  const intent = typeof body.intent === 'string' ? body.intent.trim() : '';

  if (raw.length === 0) {
    return NextResponse.json(
      { error: 'bad_request', message: 'A non-empty "signals" array is required.' },
      { status: 400 }
    );
  }

  const signals: SignalBrief[] = raw.slice(0, 8).map((s: Record<string, unknown>) => ({
    title: String(s?.title || '').slice(0, 240),
    source: String(s?.source || 'commercial'),
    recencyDays: Math.max(0, Math.round(Number(s?.recencyDays) || 0)),
    relevance: Number(s?.relevance) || 0,
    real: Number(s?.real) || 0,
    win: Number(s?.win) || 0,
    worth: Number(s?.worth) || 0,
  }));

  const missing = missingKeys().filter((k) => k === 'ANTHROPIC_API_KEY');
  if (missing.length > 0) {
    return NextResponse.json(
      {
        error: 'missing_keys',
        message:
          'Missing ANTHROPIC_API_KEY. Set it in your Vercel project Environment Variables, then redeploy.',
      },
      { status: 503 }
    );
  }

  try {
    const recommendations = await recommendActions(signals, intent);
    return NextResponse.json({ recommendations });
  } catch (err) {
    if (err instanceof PipelineError) {
      const status = err.code === 'missing_keys' ? 503 : 502;
      return NextResponse.json({ error: err.code, message: err.message }, { status });
    }
    return NextResponse.json(
      { error: 'unknown', message: err instanceof Error ? err.message : 'Unexpected error.' },
      { status: 500 }
    );
  }
}
