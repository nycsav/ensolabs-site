import { NextResponse } from 'next/server';

const KEY = 'ensolabs2026indexnow';

export async function GET() {
  const urls = [
    '/',
    '/services',
    '/work',
    '/about',
    '/insights',
    '/contact',
    '/work/gore',
    '/work/heller',
    '/work/trading-terminal',
    '/work/enterprise-ai',
  ].map((p) => 'https://ensolabs.ai' + p);

  try {
    const res = await fetch('https://api.indexnow.org/indexnow', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        host: 'ensolabs.ai',
        key: KEY,
        keyLocation: 'https://ensolabs.ai/' + KEY + '.txt',
        urlList: urls,
      }),
    });
    return NextResponse.json({ status: res.status, submitted: urls.length });
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}
