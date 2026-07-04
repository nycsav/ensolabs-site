'use client';

import { useRef, useState } from 'react';
import { Arrow } from './Arrow';
import { track } from '@/lib/gtag';
import { getAttribution, attributionLabel } from '@/lib/attribution';

type Status = 'idle' | 'submitting' | 'success' | 'error';

const SERVICES = [
  { value: '', label: 'Select a service…' },
  { value: 'consult', label: 'AI Transformation Consulting' },
  { value: 'build', label: 'Agentic Systems & Products' },
  { value: 'ship', label: 'Financial AI & Trading Intelligence' },
  { value: 'workshop', label: 'Executive Workshop / Cohort' },
  { value: 'contract', label: 'Contract / Fractional Role' },
  { value: 'other', label: 'Something else' },
];

export function ContactForm() {
  const [status, setStatus] = useState<Status>('idle');
  const [errorMsg, setErrorMsg] = useState<string>('');
  // Fire form_start only once, on the first interaction with any field.
  const startedRef = useRef(false);

  const onFirstInteract = () => {
    if (startedRef.current) return;
    startedRef.current = true;
    track('form_start', { event_category: 'lead_gen', event_label: 'contact_form' });
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);

    const name = String(fd.get('name') || '').trim();
    const email = String(fd.get('email') || '').trim();
    const message = String(fd.get('message') || '').trim();
    if (!name || !email || !message) {
      setStatus('error');
      setErrorMsg('Please fill in name, email, and message.');
      return;
    }

    setStatus('submitting');
    setErrorMsg('');

    const attr = getAttribution();
    const payload = {
      name,
      email,
      company: String(fd.get('company') || '').trim(),
      service: String(fd.get('service') || '').trim(),
      message,
      source: 'Website',
      // First-touch attribution — lets the lead record show which channel /
      // campaign / post produced it (e.g. "linkedin / social / pilot-gap-post").
      attribution: attr ? attributionLabel(attr) : '',
      utm_source: attr?.source || '',
      utm_medium: attr?.medium || '',
      utm_campaign: attr?.campaign || '',
      landing: attr?.landing || '',
      website: String(fd.get('website') || ''), // honeypot
    };

    try {
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || data?.ok === false) {
        throw new Error(data?.error || `Submit failed (${res.status})`);
      }
      track('form_submit', {
        event_category: 'lead_gen',
        event_label: 'contact_form',
      });
      setStatus('success');
      form.reset();
    } catch (err) {
      setStatus('error');
      setErrorMsg(err instanceof Error ? err.message : 'Submit failed.');
    }
  };

  const showToast = status === 'success' || status === 'error';
  const toastBg =
    status === 'error'
      ? { background: 'oklch(0.78 0.15 25)' }
      : undefined;
  const toastText =
    status === 'success'
      ? 'Brief received. We read every one personally — we’ll be in touch.'
      : errorMsg;

  return (
    <>
      <form onSubmit={onSubmit} onFocusCapture={onFirstInteract} noValidate>
        <div className="field">
          <label htmlFor="name">
            Name <span className="req">required</span>
          </label>
          <input id="name" name="name" type="text" placeholder="Jane Doe" required />
        </div>

        <div className="field">
          <label htmlFor="email">
            Email <span className="req">required</span>
          </label>
          <input id="email" name="email" type="email" placeholder="jane@company.com" required />
        </div>

        <div className="field">
          <label htmlFor="company">Company</label>
          <input id="company" name="company" type="text" placeholder="Acme Corp" />
        </div>

        <div className="field">
          <label htmlFor="service">Service interest</label>
          <select id="service" name="service" defaultValue="">
            {SERVICES.map((s) => (
              <option key={s.value} value={s.value}>{s.label}</option>
            ))}
          </select>
        </div>

        <div className="field">
          <label htmlFor="message">
            Message <span className="req">required</span>
          </label>
          <textarea
            id="message"
            name="message"
            placeholder="What system are you trying to ship? What's stuck? What's the deadline that matters?"
            required
          />
        </div>

        {/* Honeypot — hidden from humans, bots fill it. Do not remove. */}
        <div aria-hidden="true" style={{ position: 'absolute', left: '-9999px', top: 'auto', width: 1, height: 1, overflow: 'hidden' }}>
          <label htmlFor="website">Leave this field empty</label>
          <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
        </div>

        <div className="submit-row">
          <span className="note">↳ Replies come from sav@ensopartners.co</span>
          <button className="btn btn-primary" type="submit" disabled={status === 'submitting'}>
            {status === 'submitting' ? 'Sending…' : 'Send brief'}
            <Arrow />
          </button>
        </div>
      </form>

      <div
        className={`toast${showToast ? ' show' : ''}`}
        role="status"
        aria-live="polite"
        style={toastBg}
      >
        <span>●</span> {toastText}
      </div>
    </>
  );
}
