'use client';

import { useEffect } from 'react';

/**
 * Page-local count-up for the /ai-for-agencies KPI tiles.
 * The final value is server-rendered; this only animates it once the tile
 * scrolls into view, and does nothing under prefers-reduced-motion.
 */
export function KpiCountUp() {
  useEffect(() => {
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const els = Array.from(document.querySelectorAll<HTMLElement>('[data-afa-count]'));
    const run = (el: HTMLElement) => {
      const target = Number(el.dataset.afaCount);
      if (!Number.isFinite(target)) return;
      const dur = 1100;
      const t0 = performance.now();
      const step = (t: number) => {
        const p = Math.min(1, (t - t0) / dur);
        const eased = 1 - Math.pow(1 - p, 3);
        el.textContent = String(Math.round(target * eased));
        if (p < 1) requestAnimationFrame(step);
        else el.textContent = String(target);
      };
      requestAnimationFrame(step);
    };

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            run(e.target as HTMLElement);
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.5 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return null;
}
