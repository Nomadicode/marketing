import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowDownRight, Check } from 'lucide-react';
import { OrganizationSchema } from '@/app/components/structured-data';
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
  const locale = params.locale;
  const m = getMessages(locale);
  const path = localizedPath(locale);
  return {
    title: m.meta.homeTitle,
    description: m.meta.homeDescription,
    alternates: { canonical: path, languages: { en: '/', es: '/es' } },
    openGraph: {
      type: 'website',
      url: path,
      siteName: site.name,
      title: m.meta.homeTitle,
      description: m.meta.homeDescription,
      locale: locale === 'es' ? 'es_ES' : 'en_US',
    },
    twitter: {
      card: 'summary_large_image',
      title: m.meta.homeTitle,
      description: m.meta.homeDescription,
    },
  };
}

export default function HomePage({ params }: { params: { locale: string } }) {
  if (!isLocale(params.locale)) notFound();
  const locale: Locale = params.locale;
  const m = getMessages(locale);
  return (
    <>
      <OrganizationSchema />
      <SiteHeader locale={locale} />
      <main>
        <section className="hero">
          <div className="shell hero-grid">
            <div>
              <h1>{m.hero.title}</h1>
              <p className="hero-copy">{m.hero.description}</p>
              <div className="cta-row">
                <Link
                  className="button"
                  href={localizedPath(locale, 'contact')}
                >
                  {m.hero.primaryCta}
                  <ArrowDownRight size={18} />
                </Link>
                <Link
                  className="text-link"
                  href={localizedPath(locale, 'services')}
                >
                  {m.hero.secondaryCta}
                </Link>
              </div>
            </div>
            <aside className="hero-panel" aria-label={m.proof.title}>
              <h2>{m.proof.title}</h2>
              <ul>
                {m.proof.items.map((item) => (
                  <li key={item}>
                    <Check size={18} />
                    {item}
                  </li>
                ))}
              </ul>
            </aside>
          </div>
        </section>
        <section className="section shell">
          <div className="section-heading">
            <h2>{m.services.title}</h2>
            <p>{m.services.intro}</p>
          </div>
          <div className="service-grid">
            {m.services.items.map((item) => (
              <article className="service-card" key={item.title}>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </article>
            ))}
          </div>
          <Link className="text-link" href={localizedPath(locale, 'services')}>
            {m.services.cta} <ArrowDownRight size={18} />
          </Link>
        </section>
        <section className="approach">
          <div className="shell">
            <div className="section-heading">
              <h2>{m.approach.title}</h2>
              <p>{m.approach.description}</p>
            </div>
            <ol className="steps">
              {m.approach.steps.map((step, index) => (
                <li key={step.title}>
                  <span>{index + 1}</span>
                  <div>
                    <h3>{step.title}</h3>
                    <p>{step.description}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
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
