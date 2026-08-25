'use client';

import { useEffect } from 'react';

// Effects-only component for the homepage motion layer (hero mosaic parallax,
// block micro-motion reveal + count-up, and the "Running now" terminal typing).
// Renders nothing — mounted once in app/page.tsx.
//
// Guarantees (see handoffs/homepage-motion-a-e.md — subject of two verification rounds):
// - Blocks are visible by default in CSS; `.bm-in` (the hidden offset) is only
//   added on desktop + hover-capable + non-reduced-motion, and only below the fold.
// - No IntersectionObserver — reveal runs off getBoundingClientRect() on scroll
//   plus a setInterval(bmCheck, 600) that never expires.
// - `.bm-in` is removed outright 1400ms after a block enters view.
// - Count-up never renders 0 synchronously; a 1200ms guard writes the true value
//   if no rAF frame fires. Skipped when document.hidden or reduced-motion.
// - Terminal typing has a 9s guard and a 12s hard fallback that write full text.
export function HomeMotion() {
  useEffect(() => {
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
    const DESK = innerWidth > 768 && matchMedia('(hover:hover)').matches && !reduce;

    const timers: Array<ReturnType<typeof setTimeout> | ReturnType<typeof setInterval>> = [];
    const listeners: Array<[EventTarget, string, EventListenerOrEventListenerObject, boolean?]> = [];

    function on(target: EventTarget, type: string, fn: EventListenerOrEventListenerObject, opts?: boolean | AddEventListenerOptions) {
      target.addEventListener(type, fn, opts as AddEventListenerOptions);
      listeners.push([target, type, fn, opts as boolean]);
    }

    // parallax — mosaic only
    let raf = 0;
    const onScrollPar = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const y = scrollY;
        document.querySelectorAll<HTMLElement>('[data-par]').forEach((el) => {
          const par = +(el.dataset.par || '0');
          el.style.transform = `translate3d(0,${(y * par).toFixed(1)}px,0)`;
        });
      });
    };
    on(window, 'scroll', onScrollPar, { passive: true });

    // block reveal + count-up — visible by default, never gated on a frame
    let BM: HTMLElement[] = [];

    function countUp(n: HTMLElement) {
      const end = +(n.dataset.count || 'NaN');
      const em = n.querySelector('em');
      const suf = em ? em.outerHTML : '';
      if (reduce || document.hidden || !isFinite(end)) {
        n.innerHTML = end + suf;
        return;
      }
      let done = false;
      const guard = setTimeout(() => {
        if (!done) {
          done = true;
          n.innerHTML = end + suf;
        }
      }, 1200);
      timers.push(guard);
      const t0 = performance.now();
      const dur = 900;
      function tick(t: number) {
        if (done) return;
        const p = Math.min((t - t0) / dur, 1);
        const e = 1 - Math.pow(1 - p, 3);
        n.innerHTML = Math.round(end * e) + suf;
        if (p < 1) requestAnimationFrame(tick);
        else {
          done = true;
          clearTimeout(guard);
          n.innerHTML = end + suf;
        }
      }
      requestAnimationFrame(tick);
    }

    function bmCheck() {
      if (!BM.length) return;
      const h = innerHeight;
      BM.forEach((e) => {
        if (e.classList.contains('bm-on')) return;
        const r = e.getBoundingClientRect();
        if (r.top < h * 0.94 && r.bottom > -200) {
          const g = [...(e.parentElement?.children || [])].indexOf(e);
          e.style.transitionDelay = Math.min(g, 7) * 60 + 'ms';
          e.classList.add('bm-on');
          const t = setTimeout(() => {
            e.classList.remove('bm-in');
            e.style.transitionDelay = '';
          }, 1400);
          timers.push(t);
          const n = e.querySelector<HTMLElement>('[data-count]');
          if (n) countUp(n);
        }
      });
    }

    function bmInit() {
      BM = [...document.querySelectorAll<HTMLElement>('.bm')];
      if (!DESK || document.hidden) {
        BM.forEach((e) => e.classList.remove('bm-in', 'bm-on'));
        BM = [];
        return;
      }
      const h = innerHeight;
      BM.forEach((e) => e.classList.toggle('bm-in', e.getBoundingClientRect().top > h * 0.94));
      bmCheck();
    }

    on(window, 'scroll', bmCheck, { passive: true });
    const onResize = () => {
      if (!DESK) document.querySelectorAll('.bm').forEach((e) => e.classList.remove('bm-in'));
      else bmCheck();
    };
    on(window, 'resize', onResize, { passive: true });
    const bmInterval = setInterval(bmCheck, 600);
    timers.push(bmInterval);
    bmInit();

    // terminal — types once, on entry; full text guaranteed if frames never run
    const LINES: [string, string][] = [
      ['p', '$ '],
      ['o', 'enso run --pipeline market-intel --rules on\n'],
      ['c', '› init 8-stage LangGraph pipeline …\n'],
      ['c', '› fetchers: 4 parallel · ReAct agents: 3\n'],
      ['o', '  documents        '],
      ['a', '731\n'],
      ['o', '  sources curated  '],
      ['a', '111\n'],
      ['o', '  signals surfaced '],
      ['a', '16\n'],
      ['o', '  RWW score ≥ 0.78  '],
      ['c', '// real / win / worth\n'],
      ['p', '$ '],
      ['o', 'enso ship --target prod --review lead-scientist\n'],
      ['c', '› validated · go/no-go milestone delivered\n'],
      ['p', '$ '],
    ];
    const term = document.getElementById('term');
    const full = () =>
      LINES.map(([c, t]) => `<span class="${c}">${t.replace(/</g, '&lt;')}</span>`).join('') +
      '<span class="cur">_</span>';
    let typed = false;
    let tt: ReturnType<typeof setTimeout> | null = null;

    function typeTerm() {
      if (typed || !term) return;
      typed = true;
      if (reduce || document.hidden) {
        term.innerHTML = full();
        return;
      }
      const guard = setTimeout(() => {
        if (tt) clearTimeout(tt);
        term.innerHTML = full();
      }, 9000);
      timers.push(guard);
      term.innerHTML = '';
      let li = 0;
      let ci = 0;
      let cur: HTMLSpanElement | null = null;
      (function step() {
        if (li >= LINES.length) {
          clearTimeout(guard);
          term.insertAdjacentHTML('beforeend', '<span class="cur">_</span>');
          return;
        }
        const [cls, txt] = LINES[li];
        if (ci === 0) {
          cur = document.createElement('span');
          cur.className = cls;
          term.appendChild(cur);
        }
        if (cur) cur.textContent += txt[ci++];
        if (ci >= txt.length) {
          li++;
          ci = 0;
        }
        tt = setTimeout(step, 12);
        timers.push(tt);
      })();
    }

    function termCheck() {
      if (!term) return;
      const r = term.getBoundingClientRect();
      if (r.top < innerHeight * 0.9 && r.bottom > 0) typeTerm();
    }
    on(window, 'scroll', termCheck, { passive: true });
    const termInterval = setInterval(() => {
      if (!typed) termCheck();
    }, 600);
    timers.push(termInterval);
    termCheck();
    const termFallback = setTimeout(() => {
      if (!typed && term) term.innerHTML = full();
    }, 12000);
    timers.push(termFallback);

    return () => {
      timers.forEach((t) => {
        clearTimeout(t as ReturnType<typeof setTimeout>);
        clearInterval(t as ReturnType<typeof setInterval>);
      });
      listeners.forEach(([target, type, fn, opts]) => target.removeEventListener(type, fn, opts));
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return null;
}
