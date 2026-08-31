import type { Metadata } from 'next';
import { QuoteForm } from '@/app/components/quote-form';
import { SiteFooter } from '@/app/components/site-footer';
import { SiteHeader } from '@/app/components/site-header';
import { getMessages } from '@/app/lib/messages';
import {
  isLocale,
  localizedPath,
  locales,
  site,
  type Locale,
} from '@/app/lib/site';
import { notFound } from 'next/navigation';

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
  const path = localizedPath(params.locale, 'contact');
  return {
    title: m.meta.contactTitle,
    description: m.meta.contactDescription,
    alternates: {
      canonical: path,
      languages: { en: '/contact', es: '/es/contact' },
    },
    openGraph: {
      type: 'website',
      url: path,
      siteName: site.name,
      title: m.meta.contactTitle,
      description: m.meta.contactDescription,
    },
  };
}
export default function ContactPage({
  params,
}: {
  params: { locale: string };
}) {
  if (!isLocale(params.locale)) notFound();
  const locale: Locale = params.locale;
  const m = getMessages(locale);
  return (
    <>
      <SiteHeader locale={locale} />
      <main className="contact-page">
        <section className="page-intro shell">
          <h1>{m.contact.title}</h1>
          <p>{m.contact.description}</p>
        </section>
        <section className="shell quote-wrap">
          <QuoteForm messages={m.contact} />
        </section>
      </main>
      <SiteFooter locale={locale} />
    </>
  );
}
