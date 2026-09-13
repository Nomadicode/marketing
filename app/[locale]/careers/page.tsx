import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { SiteFooter } from '@/app/components/layout/site-footer';
import { SiteHeader } from '@/app/components/layout/site-header';
import { Section } from '@/app/components/layout/section';
import { PageIntro } from '@/app/components/sections/page-intro';
import { ValueCard } from '@/app/components/cards/value-card';
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
    'careers',
    m.meta.careersTitle,
    m.meta.careersDescription,
  );
}

export default function CareersPage({
  params,
}: {
  params: { locale: string };
}) {
  if (!isLocale(params.locale)) notFound();
  const locale: Locale = params.locale;
  const m = getMessages(locale);
  const c = m.careers;

  return (
    <>
      <SiteHeader locale={locale} currentPath="careers" />
      <main>
        <PageIntro
          eyebrow={c.eyebrow}
          title={c.title}
          description={c.description}
        />

        <Section>
          <div className="mx-auto max-w-shell">
            <p className="mb-14 max-w-[720px] text-[15px] leading-relaxed text-muted">
              {c.subDescription}
            </p>
            <div className="grid grid-cols-1 gap-9 sm:grid-cols-3">
              {c.traits.map((trait) => (
                <ValueCard
                  key={trait.title}
                  title={trait.title}
                  description={trait.description}
                />
              ))}
            </div>
          </div>
        </Section>

        <Section tone="raised" borderTop>
          <div className="mx-auto max-w-[640px] text-center">
            <h2 className="mb-4 text-2xl font-extrabold text-ink">
              {c.noRolesHeading}
            </h2>
            <p className="mb-2 text-[15px] text-muted">{c.noRolesBody1}</p>
            <p className="mb-6 text-[15px] text-muted">{c.noRolesBody2}</p>
            <a
              href={`mailto:${site.email}`}
              className="inline-block rounded-md bg-accent px-7 py-3.5 text-[15px] font-semibold text-canvas"
            >
              {c.ctaLabel}
            </a>
          </div>
        </Section>
      </main>
      <SiteFooter locale={locale} />
    </>
  );
}
