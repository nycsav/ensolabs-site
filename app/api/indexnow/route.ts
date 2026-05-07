import { NextResponse } from 'next/server';

const KEY = '912701a4d0c2d87253dd95b801738904';
const HOST = 'https://ensolabs.ai';
const PAGES = [
  '/', '/services', '/work', '/about', '/insights', '/contact',
  '/work/gore', '/work/heller', '/work/trading-terminal', '/work/enterprise-ai',
];

export async function GET() {
  const urls = PAGES.map((p) => HOST + p);
  const res = await fetch('https://api.indexnow.org/indexnow', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      host: 'ensolabs.ai',
      key: KEY,
      keyLocation: `${HOST}/${KEY}.txt`,
      urlList: urls,
    }),
  });
  return NextResponse.json({ status: res.status, submitted: urls.length });
}
