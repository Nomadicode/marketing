import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowDownRight } from 'lucide-react';
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
  const path = localizedPath(params.locale, 'services');
  return {
    title: m.meta.servicesTitle,
    description: m.meta.servicesDescription,
    alternates: {
      canonical: path,
      languages: { en: '/services', es: '/es/services' },
    },
    openGraph: {
      type: 'website',
      url: path,
      siteName: site.name,
      title: m.meta.servicesTitle,
      description: m.meta.servicesDescription,
    },
  };
}
export default function ServicesPage({
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
      <main>
        <section className="page-intro shell">
          <h1>{m.services.title}</h1>
          <p>{m.services.intro}</p>
        </section>
        <section className="shell service-page-grid">
          {m.services.items.map((item) => (
            <article key={item.title}>
              <h2>{item.title}</h2>
              <p>{item.description}</p>
            </article>
          ))}
        </section>
        <section className="contact-banner">
          <div className="shell">
            <h2>{m.contact.title}</h2>
            <Link
              className="button button-light"
              href={localizedPath(locale, 'contact')}
            >
              {m.nav.contact}
              <ArrowDownRight size={18} />
            </Link>
          </div>
        </section>
      </main>
      <SiteFooter locale={locale} />
    </>
  );
}
