import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Signal Lens — Interactive Demo · Enso Labs',
  description:
    'An interactive demo of the Signal Lens: toggleable expert-knowledge relevance rules that re-rank signals in real time. Powered by Enso Labs.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
