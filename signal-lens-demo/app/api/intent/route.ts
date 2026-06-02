import { NextResponse } from 'next/server';
import { missingKeys, PipelineError } from '@/lib/pipeline';
import { interpretIntent } from '@/lib/advisor';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

// POST { intent: string }
// → { weights: Partial<Record<RuleId, number>>, summary } on success
export async function POST(req: Request) {
  let body: { intent?: unknown };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'bad_request', message: 'Invalid JSON body.' }, { status: 400 });
  }

  const intent = typeof body.intent === 'string' ? body.intent.trim() : '';
  if (!intent) {
    return NextResponse.json(
      { error: 'bad_request', message: 'A non-empty "intent" is required.' },
      { status: 400 }
    );
  }

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
    const result = await interpretIntent(intent);
    return NextResponse.json(result);
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
