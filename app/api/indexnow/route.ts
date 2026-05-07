import { NextResponse } from 'next/server';

const INDEXNOW_KEY = process.env.INDEXNOW_KEY || 'ensolabs-indexnow-key';
const HOST = 'ensolabs.ai';

const URLS = [
  '/',
  '/services',
  '/work',
  '/work/gore',
  '/work/heller',
  '/work/trading-terminal',
  '/work/enterprise-ai',
  '/insights',
  '/about',
  '/contact',
  '/built-with-ai',
  '/industries/financial-services',
  '/editorial-policy',
];

export async function GET() {
  const urlList = URLS.map((p) => `https://${HOST}${p}`);

  try {
    const res = await fetch('https://api.indexnow.org/indexnow', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        host: HOST,
        key: INDEXNOW_KEY,
        urlList,
      }),
    });

    return NextResponse.json({
      status: res.status,
      submitted: urlList.length,
      urls: urlList,
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
