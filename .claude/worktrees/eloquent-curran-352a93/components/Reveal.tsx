'use client';

import { useEffect } from 'react';

/**
 * Progressive-enhancement reveal:
 *   - Server renders content as VISIBLE (no .is-hidden class).
 *   - On mount we add `.is-hidden` to every `.reveal` element so the
 *     intersection animation has something to animate from.
 *   - As elements scroll into view, we remove `.is-hidden`.
 *   - Safety net at 1.2s: even if IO never fires (slow paint, hydration
 *     race, content already in view at load) every `.reveal` gets revealed.
 *
 * Net effect: with JS off or broken, content is visible. With JS on,
 * the animation runs. There is no failure mode that hides content.
 */
export function RevealMount() {
  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>('.reveal'));
    if (els.length === 0) return;

    // Step 1: hide everything so the animation has somewhere to come from.
    els.forEach((el) => el.classList.add('is-hidden'));

    const reveal = (el: HTMLElement) => el.classList.remove('is-hidden');

    // Step 2: safety net — force-reveal everything after 1.2s no matter what.
    const safety = setTimeout(() => {
      els.forEach(reveal);
    }, 1200);

    if (typeof IntersectionObserver === 'undefined') {
      els.forEach(reveal);
      clearTimeout(safety);
      return;
    }

    // Step 3: observe and reveal as elements enter the viewport.
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            reveal(e.target as HTMLElement);
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' },
    );
    els.forEach((el) => io.observe(el));

    return () => {
      clearTimeout(safety);
      io.disconnect();
    };
  }, []);

  return null;
}
