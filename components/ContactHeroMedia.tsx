'use client';

import { useEffect, useRef } from 'react';

/**
 * Contact hero as a full-bleed NYC media band.
 *
 * Baseline (always renders): the Flatiron / Union Square still with a slow
 * Ken Burns push. This alone is production-ready — no video file required.
 *
 * Progressive upgrade: if a committed loop exists at
 * /images/flatiron-loop.mp4, it is preloaded and cross-fades in over the
 * still. Until that file lands in /public/images, the still carries the hero.
 *
 * Reduced motion: the Ken Burns animation is disabled via CSS media query
 * (see the <style> block) and the still holds a static frame.
 */
export function ContactHeroMedia() {
  const heroRef = useRef<HTMLElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const hero = heroRef.current;
    const video = videoRef.current;
    if (!hero || !video) return;

    let cancelled = false;
    const LOOP = '/images/flatiron-loop.mp4';

    // Only attempt the video upgrade if the loop is actually committed.
    fetch(LOOP, { method: 'HEAD' })
      .then((r) => {
        if (cancelled || !r.ok) return;
        video.src = LOOP;
        video.play().catch(() => {});
        hero.classList.add('has-video');
      })
      .catch(() => {});

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section
      ref={heroRef}
      className="contact-hero"
      data-screen-label="01 Contact hero"
    >
      <style>{`
        .contact-hero {
          position: relative; width: 100%; min-height: 620px;
          display: flex; align-items: flex-end; overflow: hidden;
          isolation: isolate; background: var(--bg);
        }
        .contact-hero .ch-media { position: absolute; inset: 0; z-index: 0; }
        .contact-hero .ch-media img,
        .contact-hero .ch-media video {
          position: absolute; inset: 0; width: 100%; height: 100%;
          object-fit: cover; object-position: center 42%;
        }
        .contact-hero .ch-still {
          animation: ch-kenburns 28s ease-in-out infinite alternate;
          filter: saturate(1.02) contrast(1.02);
        }
        @keyframes ch-kenburns {
          from { transform: scale(1.06); }
          to   { transform: scale(1.14) translate3d(-1.5%, -1%, 0); }
        }
        @media (prefers-reduced-motion: reduce) {
          .contact-hero .ch-still { animation: none; transform: scale(1.06); }
        }
        .contact-hero .ch-video { opacity: 0; transition: opacity .6s ease; }
        .contact-hero.has-video .ch-video { opacity: 1; }
        .contact-hero.has-video .ch-still { opacity: 0; }
        .contact-hero .ch-scrim {
          position: absolute; inset: 0; z-index: 1; pointer-events: none;
          background:
            linear-gradient(180deg,
              color-mix(in oklab, var(--bg) 40%, transparent) 0%,
              color-mix(in oklab, var(--bg) 6%, transparent) 30%,
              color-mix(in oklab, var(--bg) 66%, transparent) 76%,
              color-mix(in oklab, var(--bg) 94%, transparent) 100%),
            linear-gradient(90deg,
              color-mix(in oklab, var(--bg) 80%, transparent) 0%,
              color-mix(in oklab, var(--bg) 32%, transparent) 48%, transparent 76%);
        }
        .contact-hero .ch-inner {
          position: relative; z-index: 2; width: 100%;
          padding-top: 72px; padding-bottom: 52px;
        }
        .contact-hero .eyebrow { color: color-mix(in oklab, var(--fg) 84%, transparent); }
        .contact-hero .eyebrow .num { color: var(--teal); }
        .contact-hero h1.display {
          font-size: clamp(44px, 7.2vw, 96px); line-height: 1.0;
          letter-spacing: -0.02em; margin: 20px 0 0; color: #fff; max-width: 15ch;
        }
        .contact-hero h1.display em { font-style: italic; font-weight: 300; }
        .contact-hero h1.display .accent { color: var(--teal); }
        .contact-hero .ch-foot {
          display: flex; align-items: center; gap: 20px; flex-wrap: wrap; margin-top: 28px;
          font-family: var(--mono); font-size: 12.5px; letter-spacing: 0.06em;
          text-transform: uppercase; color: color-mix(in oklab, var(--fg) 76%, transparent);
        }
        .contact-hero .ch-foot .pin { color: var(--teal); }
        .contact-hero .ch-foot .dot {
          width: 5px; height: 5px; border-radius: 50%;
          background: color-mix(in oklab, var(--fg) 40%, transparent); display: inline-block;
        }
        .contact-hero .ch-foot .live { display: inline-flex; align-items: center; gap: 8px; }
        .contact-hero .ch-foot .rec {
          width: 7px; height: 7px; border-radius: 50%; background: var(--teal);
          animation: ch-liveblink 2.4s ease-in-out infinite;
        }
        @keyframes ch-liveblink { 0%,100% { opacity: 1; } 50% { opacity: .25; } }
        @media (prefers-reduced-motion: reduce) { .contact-hero .ch-foot .rec { animation: none; } }
      `}</style>

      <div className="ch-media">
        <img
          className="ch-still"
          src="/images/nyc-street-flatiron.png"
          alt="A New York City street in motion — pedestrians and taxis near Union Square, Lower Manhattan skyline beyond"
        />
        <video
          ref={videoRef}
          className="ch-video"
          muted
          loop
          playsInline
          preload="auto"
          poster="/images/nyc-street-flatiron.png"
        />
      </div>
      <div className="ch-scrim" aria-hidden="true" />

      <div className="ch-inner">
        <div className="shell">
          <span className="eyebrow"><span className="num">PAGE / 06</span>&nbsp;Contact</span>
          <h1 className="display">
            Let&rsquo;s <em>scope</em><br />
            <span className="accent">something real.</span>
          </h1>
          <div className="ch-foot">
            <span className="live"><span className="rec" /> <span className="pin">NEW YORK CITY</span></span>
            <span className="dot" />
            <span>31 UNION SQUARE WEST, 6TH FL</span>
          </div>
        </div>
      </div>
    </section>
  );
}
