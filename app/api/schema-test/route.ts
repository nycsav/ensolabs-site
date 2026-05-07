import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    note: 'Visit each page and check the application/ld+json script tags',
    pages: [
      'https://ensolabs.ai/',
      'https://ensolabs.ai/services',
      'https://ensolabs.ai/work',
      'https://ensolabs.ai/work/gore',
      'https://ensolabs.ai/work/heller',
      'https://ensolabs.ai/work/trading-terminal',
      'https://ensolabs.ai/work/enterprise-ai',
      'https://ensolabs.ai/insights',
      'https://ensolabs.ai/about',
      'https://ensolabs.ai/contact',
      'https://ensolabs.ai/built-with-ai',
    ],
    validator: 'https://search.google.com/test/rich-results',
  });
}
