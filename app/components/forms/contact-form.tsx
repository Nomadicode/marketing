'use client';

import { useState } from 'react';
import type { Messages } from '@/app/lib/messages';

type FormState = {
  name: string;
  business: string;
  email: string;
  message: string;
};
const initial: FormState = { name: '', business: '', email: '', message: '' };

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
      className="flex flex-col gap-[18px] rounded-lg bg-canvas-raised p-8"
    >
      <label className="block text-sm">
        <span className="mb-1.5 block text-sm font-semibold text-ink">
          {messages.name}
        </span>
        <input
          value={form.name}
          onChange={update('name')}
          required
          autoComplete="name"
          className="w-full rounded-md border border-border-strong bg-canvas px-3.5 py-3 text-[15px] text-ink placeholder:text-faint focus:border-accent focus:outline-none"
        />
      </label>
      <label className="block text-sm">
        <span className="mb-1.5 block text-sm font-semibold text-ink">
          {messages.business}
        </span>
        <input
          value={form.business}
          onChange={update('business')}
          autoComplete="organization"
          className="w-full rounded-md border border-border-strong bg-canvas px-3.5 py-3 text-[15px] text-ink placeholder:text-faint focus:border-accent focus:outline-none"
        />
      </label>
      <label className="block text-sm">
        <span className="mb-1.5 block text-sm font-semibold text-ink">
          {messages.email}
        </span>
        <input
          value={form.email}
          onChange={update('email')}
          type="email"
          required
          autoComplete="email"
          className="w-full rounded-md border border-border-strong bg-canvas px-3.5 py-3 text-[15px] text-ink placeholder:text-faint focus:border-accent focus:outline-none"
        />
      </label>
      <label className="block text-sm">
        <span className="mb-1.5 block text-sm font-semibold text-ink">
          {messages.message}
        </span>
        <span className="mb-2 block text-[13px] text-muted">
          {messages.messageHint}
        </span>
        <textarea
          value={form.message}
          onChange={update('message')}
          required
          rows={5}
          className="w-full resize-y rounded-md border border-border-strong bg-canvas px-3.5 py-3 text-[15px] text-ink placeholder:text-faint focus:border-accent focus:outline-none"
        />
      </label>
      <button
        disabled={status === 'sending'}
        className="mt-1 rounded-md bg-accent px-6 py-3.5 text-base font-semibold text-accent-foreground disabled:opacity-60"
      >
        {status === 'sending' ? messages.sending : messages.submit}
      </button>
      <p
        role="status"
        aria-live="polite"
        className={[
          'text-sm',
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
