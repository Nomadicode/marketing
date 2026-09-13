'use client';

import { useState } from 'react';
import type { Messages } from '@/app/lib/messages';

type FormState = { name: string; email: string; message: string };
const initial: FormState = { name: '', email: '', message: '' };

export function ContactForm({
  messages,
}: {
  messages: Messages['contact']['form'];
}) {
  const [form, setForm] = useState(initial);
  const [status, setStatus] = useState<
    'idle' | 'sending' | 'success' | 'error'
  >('idle');

  const update =
    (field: keyof FormState) =>
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((current) => ({ ...current, [field]: event.target.value }));

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus('sending');
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!response.ok) throw new Error('Contact request failed');
      setForm(initial);
      setStatus('success');
    } catch {
      setStatus('error');
    }
  }

  return (
    <form
      onSubmit={submit}
      noValidate
      className="rounded-xl border border-border bg-canvas-raised p-7"
    >
      <label className="mb-4 block text-sm">
        <span className="mb-1.5 block text-xs text-faint">{messages.name}</span>
        <input
          value={form.name}
          onChange={update('name')}
          required
          autoComplete="name"
          placeholder={messages.namePlaceholder}
          className="w-full rounded-md border border-border-strong bg-canvas px-3.5 py-2.5 text-sm text-ink placeholder:text-faint focus:border-accent focus:outline-none"
        />
      </label>
      <label className="mb-4 block text-sm">
        <span className="mb-1.5 block text-xs text-faint">
          {messages.email}
        </span>
        <input
          value={form.email}
          onChange={update('email')}
          type="email"
          required
          autoComplete="email"
          placeholder={messages.emailPlaceholder}
          className="w-full rounded-md border border-border-strong bg-canvas px-3.5 py-2.5 text-sm text-ink placeholder:text-faint focus:border-accent focus:outline-none"
        />
      </label>
      <label className="mb-5 block text-sm">
        <span className="mb-1.5 block text-xs text-faint">
          {messages.message}
        </span>
        <textarea
          value={form.message}
          onChange={update('message')}
          required
          rows={5}
          placeholder={messages.messagePlaceholder}
          className="w-full resize-y rounded-md border border-border-strong bg-canvas px-3.5 py-2.5 text-sm text-ink placeholder:text-faint focus:border-accent focus:outline-none"
        />
      </label>
      <button
        disabled={status === 'sending'}
        className="w-full rounded-md bg-accent px-5 py-3 text-sm font-semibold text-canvas disabled:opacity-60"
      >
        {status === 'sending' ? messages.sending : messages.submit}
      </button>
      <p
        role="status"
        aria-live="polite"
        className={[
          'mt-3 text-sm',
          status === 'success'
            ? 'text-accent'
            : status === 'error'
              ? 'text-red-400'
              : 'sr-only',
        ].join(' ')}
      >
        {status === 'success'
          ? messages.success
          : status === 'error'
            ? messages.error
            : ''}
      </p>
    </form>
  );
}
