import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { SiteFooter } from '@/app/components/layout/site-footer';
import { SiteHeader } from '@/app/components/layout/site-header';
import { Section } from '@/app/components/layout/section';
import { ContactForm } from '@/app/components/forms/contact-form';
import { pageMetadata } from '@/app/lib/metadata';
import { getMessages } from '@/app/lib/messages';
import { isLocale, locales, site, type Locale } from '@/app/lib/site';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Metadata {
  if (!isLocale(params.locale)) return {};
  const m = getMessages(params.locale);
  return pageMetadata(
    params.locale,
    'contact',
    m.meta.contactTitle,
    m.meta.contactDescription,
  );
}

export default function ContactPage({
  params,
}: {
  params: { locale: string };
}) {
  if (!isLocale(params.locale)) notFound();
  const locale: Locale = params.locale;
  const m = getMessages(locale);
  const c = m.contact;

  return (
    <>
      <SiteHeader locale={locale} currentPath="contact" />
      <main>
        <Section grid className="pb-16 pt-24 md:pb-20 md:pt-28">
          <div className="mx-auto grid max-w-shell gap-14 md:grid-cols-2">
            <div>
              <span className="mb-5 inline-block text-[13px] font-semibold uppercase tracking-wide text-accent">
                {c.eyebrow}
              </span>
              <h1 className="mb-5 whitespace-pre-line text-[clamp(32px,5vw,44px)] font-extrabold leading-[1.1] tracking-tight text-ink">
                {c.title}
              </h1>
              <p className="mb-10 max-w-[420px] text-[15px] leading-relaxed text-muted">
                {c.description}
              </p>
              <div className="space-y-6">
                <div>
                  <div className="mb-1 text-xs font-semibold uppercase tracking-wide text-faint">
                    {c.emailLabel}
                  </div>
                  <a
                    href={`mailto:${site.email}`}
                    className="text-sm text-ink underline decoration-border-strong underline-offset-4"
                  >
                    {site.email}
                  </a>
                </div>
                <div>
                  <div className="mb-1 text-xs font-semibold uppercase tracking-wide text-faint">
                    {c.responseTimeLabel}
                  </div>
                  <div className="text-sm text-ink">{c.responseTime}</div>
                </div>
              </div>
            </div>
            <ContactForm messages={c.form} />
          </div>
        </Section>
      </main>
      <SiteFooter locale={locale} />
    </>
  );
}
