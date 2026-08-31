import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

type Quote = {
  name: string;
  email: string;
  company: string;
  service: string;
  budget: string;
  message: string;
};

const requiredFields: Array<keyof Quote> = [
  'name',
  'email',
  'company',
  'service',
  'budget',
  'message',
];

function isQuote(value: unknown): value is Quote {
  if (!value || typeof value !== 'object') return false;
  const quote = value as Record<string, unknown>;
  return requiredFields.every(
    (key) =>
      typeof quote[key] === 'string' &&
      quote[key].trim().length > 0 &&
      quote[key].trim().length <= 4000,
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

function notificationText(quote: Quote) {
  return `New ContractorKit workflow assessment\n\nName: ${quote.name}\nEmail: ${quote.email}\nCompany: ${quote.company}\nSolution: ${quote.service}\nBudget: ${quote.budget}\n\nDetails:\n${quote.message}`;
}

async function sendNotifications(quote: Quote) {
  const text = notificationText(quote);
  const requests: Promise<Response>[] = [];
  const email = process.env.QUOTE_NOTIFICATION_EMAIL;
  if (process.env.RESEND_API_KEY && process.env.RESEND_FROM_EMAIL && email) {
    requests.push(
      fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: process.env.RESEND_FROM_EMAIL,
          to: [email],
          subject: `New workflow assessment: ${quote.name}`,
          text,
          html: `<h1>New workflow assessment</h1><p><strong>Name:</strong> ${escapeHtml(quote.name)}<br><strong>Email:</strong> ${escapeHtml(quote.email)}<br><strong>Company:</strong> ${escapeHtml(quote.company)}<br><strong>Solution:</strong> ${escapeHtml(quote.service)}<br><strong>Budget:</strong> ${escapeHtml(quote.budget)}</p><p>${escapeHtml(quote.message).replace(/\n/g, '<br>')}</p>`,
        }),
      }),
    );
  }
  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  if (accountSid && authToken) {
    const sendTwilio = (from: string, body: string, to: string) =>
      fetch(
        `https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Messages.json`,
        {
          method: 'POST',
          headers: {
            Authorization: `Basic ${Buffer.from(`${accountSid}:${authToken}`).toString('base64')}`,
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: new URLSearchParams({
            To: to,
            From: from,
            Body: body,
          }).toString(),
        },
      );
    if (process.env.TWILIO_SMS_FROM && process.env.TWILIO_SMS_TO)
      requests.push(
        sendTwilio(
          process.env.TWILIO_SMS_FROM,
          text,
          process.env.TWILIO_SMS_TO,
        ),
      );
    if (process.env.TWILIO_WHATSAPP_FROM && process.env.TWILIO_WHATSAPP_TO)
      requests.push(
        sendTwilio(
          process.env.TWILIO_WHATSAPP_FROM,
          text,
          process.env.TWILIO_WHATSAPP_TO,
        ),
      );
  }
  const results = await Promise.allSettled(requests);
  if (
    results.some(
      (result) =>
        result.status === 'rejected' ||
        (result.status === 'fulfilled' && !result.value.ok),
    )
  )
    console.error('Quote notification delivery failed');
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  if (!isQuote(body))
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
      { error: 'Quote service is not configured' },
      { status: 503 },
    );
  const quote: Quote = {
    name: body.name.trim(),
    email: body.email.trim(),
    company: body.company.trim(),
    service: body.service.trim(),
    budget: body.budget.trim(),
    message: body.message.trim(),
  };
  const supabase = createClient(url, key, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
  const { error } = await supabase.from('quotes').insert({
    name: quote.name,
    email: quote.email,
    category: quote.service,
    budget: quote.budget,
    message: `${quote.company}\n\n${quote.message}`,
  });
  if (error)
    return NextResponse.json(
      { error: 'Quote service unavailable' },
      { status: 502 },
    );
  await sendNotifications(quote);
  return NextResponse.json({ ok: true }, { status: 201 });
}
