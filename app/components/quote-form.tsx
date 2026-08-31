'use client';

import { useState } from 'react';
import type { Messages } from '@/app/lib/messages';

type FormState = {
  name: string;
  email: string;
  company: string;
  service: string;
  budget: string;
  message: string;
};
const initial: FormState = {
  name: '',
  email: '',
  company: '',
  service: '',
  budget: '',
  message: '',
};

export function QuoteForm({ messages }: { messages: Messages['contact'] }) {
  const [form, setForm] = useState(initial);
  const [status, setStatus] = useState<
    'idle' | 'sending' | 'success' | 'error'
  >('idle');
  const update =
    (field: keyof FormState) =>
    (
      event: React.ChangeEvent<
        HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
      >,
    ) =>
      setForm((current) => ({ ...current, [field]: event.target.value }));

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus('sending');
    try {
      const response = await fetch('/api/quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!response.ok) throw new Error('Quote request failed');
      setForm(initial);
      setStatus('success');
    } catch {
      setStatus('error');
    }
  }

  return (
    <form className="quote-form" onSubmit={submit} noValidate>
      <div className="field-grid">
        <label>
          {messages.name}
          <input
            value={form.name}
            onChange={update('name')}
            required
            autoComplete="name"
          />
        </label>
        <label>
          {messages.email}
          <input
            value={form.email}
            onChange={update('email')}
            type="email"
            required
            autoComplete="email"
          />
        </label>
      </div>
      <label>
        {messages.company}
        <input
          value={form.company}
          onChange={update('company')}
          required
          autoComplete="organization"
        />
      </label>
      <div className="field-grid">
        <label>
          {messages.service}
          <select value={form.service} onChange={update('service')} required>
            <option value="">{messages.select}</option>
            {messages.services.map((service) => (
              <option key={service}>{service}</option>
            ))}
          </select>
        </label>
        <label>
          {messages.budget}
          <select value={form.budget} onChange={update('budget')} required>
            <option value="">{messages.select}</option>
            {messages.budgets.map((budget) => (
              <option key={budget}>{budget}</option>
            ))}
          </select>
        </label>
      </div>
      <label>
        {messages.message}
        <textarea
          value={form.message}
          onChange={update('message')}
          required
          rows={5}
          placeholder={messages.messageHint}
        />
      </label>
      <button className="button" disabled={status === 'sending'}>
        {status === 'sending' ? messages.sending : messages.submit}
      </button>
      <p className={`form-status ${status}`} role="status" aria-live="polite">
        {status === 'success'
          ? messages.success
          : status === 'error'
            ? messages.error
            : ''}
      </p>
    </form>
  );
}
