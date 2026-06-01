import { NextResponse } from 'next/server';
import { fetchLiveSignals, missingKeys, PipelineError } from '@/lib/pipeline';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

// POST { topic: string, count?: number }
// → { signals: Signal[], source: 'live', topic } on success
// → { error, message } with an appropriate status on failure
export async function POST(req: Request) {
  let body: { topic?: unknown; count?: unknown };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'bad_request', message: 'Invalid JSON body.' }, { status: 400 });
  }

  const topic = typeof body.topic === 'string' ? body.topic.trim() : '';
  if (!topic) {
    return NextResponse.json(
      { error: 'bad_request', message: 'A non-empty "topic" is required.' },
      { status: 400 }
    );
  }
  const count = Math.min(20, Math.max(4, Number(body.count) || 12));

  const missing = missingKeys();
  if (missing.length > 0) {
    return NextResponse.json(
      {
        error: 'missing_keys',
        message: `Missing API key(s): ${missing.join(
          ', '
        )}. Copy .env.example to .env.local and fill them in, then restart the dev server.`,
      },
      { status: 503 }
    );
  }

  try {
    const signals = await fetchLiveSignals(topic, count);
    return NextResponse.json({ signals, source: 'live', topic });
  } catch (err) {
    if (err instanceof PipelineError) {
      const status = err.code === 'missing_keys' ? 503 : err.code === 'empty' ? 404 : 502;
      return NextResponse.json({ error: err.code, message: err.message }, { status });
    }
    return NextResponse.json(
      { error: 'unknown', message: err instanceof Error ? err.message : 'Unexpected error.' },
      { status: 500 }
    );
  }
}
