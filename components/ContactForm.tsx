'use client';

import { useRef, useState } from 'react';
import { Arrow } from './Arrow';
import { track } from '@/lib/gtag';
import { getAttribution, attributionLabel } from '@/lib/attribution';
import { SITE } from '@/lib/site';

type Status = 'idle' | 'submitting' | 'success' | 'error';

/**
 * Lead-capture note form — the async fallback to the primary "book a call" path.
 *
 * Two fields only: message ("What are you trying to ship?") + email. Name is
 * dropped — it comes back in the reply, and every removed field lifts completion.
 *
 * Instrumentation (honest — the old events fired on the wrong things):
 *  - form_start    → first focus in any field, once.
 *  - form_submit   → on the submit attempt, before the network call.
 *  - generate_lead → ONLY on a confirmed 200 from POST /api/leads.
 *
 * Native <form action="/api/leads" method="POST"> so it still submits with JS off.
 * On error the fields are never cleared and the bad fields are marked.
 */
export function ContactForm({ source = 'Website — Contact' }: { source?: string }) {
  const [status, setStatus] = useState<Status>('idle');
  const [errorMsg, setErrorMsg] = useState<string>('');
  const [badFields, setBadFields] = useState<string[]>([]);
  const startedRef = useRef(false);
  const messageRef = useRef<HTMLTextAreaElement | null>(null);
  const emailRef = useRef<HTMLInputElement | null>(null);

  const onFirstInteract = () => {
    if (startedRef.current) return;
    startedRef.current = true;
    track('form_start', { event_category: 'lead_gen', event_label: 'contact_form' });
  };

  // auto-grow the textarea (starts 1 line, expands to a cap)
  const grow = (el: HTMLTextAreaElement) => {
    el.style.height = 'auto';
    el.style.height = Math.min(el.scrollHeight, 260) + 'px';
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);

    const email = String(fd.get('email') || '').trim();
    const message = String(fd.get('message') || '').trim();

    // form_submit — fires on the attempt, before the network call.
    track('form_submit', { event_category: 'lead_gen', event_label: 'contact_form' });

    // Client-side guard (server re-validates). Do NOT clear fields on error.
    const bad: string[] = [];
    if (!message) bad.push('message');
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) bad.push('email');
    if (bad.length) {
      setStatus('error');
      setBadFields(bad);
      setErrorMsg(
        'Add ' +
          bad
            .map((b) => (b === 'email' ? 'a valid email' : 'a line about what you’re shipping'))
            .join(' and ') +
          '.',
      );
      (bad[0] === 'email' ? emailRef.current : messageRef.current)?.focus();
      return;
    }

    // Honeypot — bots fill it. Pretend success, send nothing.
    if (String(fd.get('website') || '')) {
      form.reset();
      return;
    }

    setStatus('submitting');
    setBadFields([]);
    setErrorMsg('');

    const attr = getAttribution();
    const payload = {
      email,
      message,
      source,
      // First-touch attribution — kept out of the visible form but preserved so a
      // lead record still shows which channel/campaign produced it.
      attribution: attr ? attributionLabel(attr) : '',
      utm_source: attr?.source || '',
      utm_medium: attr?.medium || '',
      utm_campaign: attr?.campaign || '',
      landing: attr?.landing || '',
      website: String(fd.get('website') || ''), // honeypot
    };

    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || data?.ok === false) {
        throw new Error(data?.error || `Submit failed (${res.status})`);
      }
      // generate_lead — fires ONLY now, on a backend-confirmed 200.
      track('generate_lead', {
        event_category: 'lead_gen',
        event_label: 'contact_form',
        page_location: '/contact',
        source,
      });
      setStatus('success');
    } catch (err) {
      // Surface inline; leave the fields exactly as the user typed them.
      setStatus('error');
      setBadFields([]);
      setErrorMsg(err instanceof Error ? err.message : 'Something broke on our end — try again.');
    }
  };

  const isBad = (id: string) => badFields.includes(id);

  if (status === 'success') {
    return (
      <div className="form-success show" role="status" aria-live="polite">
        <div className="tick" aria-hidden="true">✓</div>
        <h3>Got it — Sav replies within 24h.</h3>
        <p>Your note reached the studio directly. No CRM, no auto-responder.</p>
        {SITE.bookingUrl.startsWith('http') && (
          <a
            className="btn book-again"
            href={SITE.bookingUrl}
            target="_blank"
            rel="noopener"
            data-booking
          >
            Want to talk sooner? Book a 15-min intro
            <Arrow />
          </a>
        )}
      </div>
    );
  }

  return (
    <>
      {/* Native form: POSTs to /api/leads even if JS fails. */}
      <form
        id="leadForm"
        action="/api/leads"
        method="POST"
        onSubmit={onSubmit}
        onFocusCapture={onFirstInteract}
        noValidate
      >
        <div className="field">
          <label htmlFor="message">What are you trying to ship?</label>
          <textarea
            id="message"
            name="message"
            ref={messageRef}
            rows={1}
            placeholder="One line is fine — what's stuck, and the deadline that matters."
            className={isBad('message') ? 'invalid' : undefined}
            onInput={(e) => grow(e.currentTarget)}
            required
          />
        </div>

        <div className="field">
          <label htmlFor="email">Where do we reply?</label>
          <input
            id="email"
            name="email"
            ref={emailRef}
            type="email"
            placeholder="you@company.com"
            autoComplete="email"
            className={isBad('email') ? 'invalid' : undefined}
            required
          />
        </div>

        {/* Honeypot — hidden from humans, bots fill it. Do not remove. */}
        <div
          aria-hidden="true"
          style={{ position: 'absolute', left: '-9999px', top: 'auto', width: 1, height: 1, overflow: 'hidden' }}
        >
          <label htmlFor="website">Leave this field empty</label>
          <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
        </div>

        {status === 'error' && (
          <div className="form-err show" role="alert" aria-live="assertive">
            <span>
              {badFields.length > 0 && <b>Almost there. </b>}
              {errorMsg}
            </span>
          </div>
        )}

        <button className="btn btn-primary send-btn" type="submit" disabled={status === 'submitting'}>
          {status === 'submitting' ? 'Sending…' : 'Send it'}
          <Arrow />
        </button>
      </form>

      <p className="trust" id="trustLine">
        Reaches Sav directly · response within 24h · NDA on request<br />
        <a href="mailto:sav@ensolabs.ai">sav@ensolabs.ai</a>
        <span className="sep">/</span>
        <a href="https://www.linkedin.com/in/savbanerjee/" target="_blank" rel="noopener">LinkedIn</a>
      </p>
    </>
  );
}
