'use client';

import { useState, useMemo } from 'react';
import { Arrow } from './Arrow';
import { track } from '@/lib/gtag';

type Status = 'idle' | 'submitting' | 'success' | 'error';

const SERVICES = [
  { value: '', label: 'Select a service…' },
  { value: 'consult', label: 'AI Transformation Consulting' },
  { value: 'build', label: 'Agentic Systems & Products' },
  { value: 'ship', label: 'Financial AI & Trading Intelligence' },
  { value: 'workshop', label: 'Executive Workshop / Cohort' },
  { value: 'other', label: 'Something else' },
];

export function ContactForm() {
  const [status, setStatus] = useState<Status>('idle');
  const [errorMsg, setErrorMsg] = useState<string>('');

  const formspreeId = process.env.NEXT_PUBLIC_FORMSPREE_ID;
  const endpoint = useMemo(
    () => (formspreeId ? `https://formspree.io/f/${formspreeId}` : null),
    [formspreeId],
  );

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

    if (!endpoint) {
      setStatus('error');
      setErrorMsg('Form is not configured. Email sav@ensopartners.co directly.');
      return;
    }

    setStatus('submitting');
    setErrorMsg('');

    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        body: fd,
        headers: { Accept: 'application/json' },
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
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
      ? 'Brief received. I’ll respond within 24h.'
      : errorMsg;

  return (
    <>
      <form onSubmit={onSubmit} noValidate>
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
