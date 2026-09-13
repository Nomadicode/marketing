import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

type ContactMessage = {
  name: string;
  email: string;
  message: string;
};

const requiredFields: Array<keyof ContactMessage> = [
  'name',
  'email',
  'message',
];

function isContactMessage(value: unknown): value is ContactMessage {
  if (!value || typeof value !== 'object') return false;
  const message = value as Record<string, unknown>;
  return requiredFields.every(
    (key) =>
      typeof message[key] === 'string' &&
      message[key].trim().length > 0 &&
      message[key].trim().length <= 4000,
  );
}

function escapeHtml(value: string) {
  return value.replace(
    /[&<>"']/g,
    (character) =>
      ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;',
      })[character] ?? character,
  );
}

type EmailNotificationConfig = {
  apiKey: string;
  from: string;
  fromName: string;
  to: string;
};

function getEmailNotificationConfig(): EmailNotificationConfig | null {
  const apiKey = process.env.BREVO_API_KEY;
  const from = process.env.BREVO_FROM_EMAIL;
  const fromName = process.env.BREVO_FROM_NAME ?? 'Nomadicode';
  const to = process.env.CONTACT_NOTIFICATION_EMAIL;
  if (!apiKey || !from || !to) return null;
  return { apiKey, from, fromName, to };
}

async function sendNotification(
  contact: ContactMessage,
  email: EmailNotificationConfig,
) {
  const response = await fetch('https://api.brevo.com/v3/smtp/email', {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'api-key': email.apiKey,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      sender: { email: email.from, name: email.fromName },
      to: [{ email: email.to }],
      subject: `New contact message: ${contact.name}`,
      textContent: `New contact form submission\n\nName: ${contact.name}\nEmail: ${contact.email}\n\nMessage:\n${contact.message}`,
      htmlContent: `<h1>New contact form submission</h1><p><strong>Name:</strong> ${escapeHtml(contact.name)}<br><strong>Email:</strong> ${escapeHtml(contact.email)}</p><p>${escapeHtml(contact.message).replace(/\n/g, '<br>')}</p>`,
      tags: ['contact-notification'],
    }),
  }).catch(() => null);
  if (!response || !response.ok)
    console.error('Contact notification delivery failed');
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  if (!isContactMessage(body))
    return NextResponse.json(
      { error: 'Invalid form submission' },
      { status: 400 },
    );
  if (!/^\S+@\S+\.\S+$/.test(body.email))
    return NextResponse.json(
      { error: 'Invalid email address' },
      { status: 400 },
    );

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key)
    return NextResponse.json(
      { error: 'Contact service is not configured' },
      { status: 503 },
    );

  const contact: ContactMessage = {
    name: body.name.trim(),
    email: body.email.trim(),
    message: body.message.trim(),
  };

  const supabase = createClient(url, key, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
  const { error } = await supabase.from('contact_messages').insert(contact);
  if (error)
    return NextResponse.json(
      { error: 'Contact service unavailable' },
      { status: 502 },
    );

  const emailNotification = getEmailNotificationConfig();
  if (emailNotification) await sendNotification(contact, emailNotification);

  return NextResponse.json({ ok: true }, { status: 201 });
}
