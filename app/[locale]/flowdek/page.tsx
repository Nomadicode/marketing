import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { SiteFooter } from '@/app/components/layout/site-footer';
import { SiteHeader } from '@/app/components/layout/site-header';
import { Section } from '@/app/components/layout/section';
import { PageIntro } from '@/app/components/sections/page-intro';
import { CtaBanner } from '@/app/components/sections/cta-banner';
import { ValueCard } from '@/app/components/cards/value-card';
import { pageMetadata } from '@/app/lib/metadata';
import { getMessages } from '@/app/lib/messages';
import { isLocale, localizedPath, locales, type Locale } from '@/app/lib/site';

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
    'flowdek',
    m.meta.flowdekTitle,
    m.meta.flowdekDescription,
  );
}

export default function FlowDekPage({
  params,
}: {
  params: { locale: string };
}) {
  if (!isLocale(params.locale)) notFound();
  const locale: Locale = params.locale;
  const m = getMessages(locale);
  const f = m.flowdek;

  return (
    <>
      <SiteHeader locale={locale} currentPath="flowdek" />
      <main>
        <PageIntro
          eyebrow={f.eyebrow}
          title={f.title}
          description={f.description}
          actions={[
            { href: localizedPath(locale, 'contact'), label: f.primaryCta },
            {
              href: '#modules',
              label: f.secondaryCta,
              variant: 'secondary',
            },
          ]}
        />

        <Section id="modules">
          <div className="mx-auto max-w-shell">
            <h2 className="mb-2 text-2xl font-bold text-ink">
              {f.modulesHeading}
            </h2>
            <p className="mb-10 max-w-[560px] text-[15px] text-muted">
              {f.modulesDescription}
            </p>
            <div className="grid grid-cols-1 gap-x-10 gap-y-9 sm:grid-cols-2 lg:grid-cols-3">
              {f.modules.map((module) => (
                <ValueCard
                  key={module.title}
                  title={module.title}
                  description={module.description}
                />
              ))}
            </div>
          </div>
        </Section>

        <Section tone="raised" borderTop borderBottom>
          <div className="mx-auto max-w-shell">
            <h2 className="mb-10 text-2xl font-bold text-ink">
              {f.whyHeading}
            </h2>
            <div className="grid grid-cols-1 gap-9 sm:grid-cols-3">
              {f.whyItems.map((item) => (
                <ValueCard
                  key={item.title}
                  title={item.title}
                  description={item.description}
                />
              ))}
            </div>
          </div>
        </Section>

        <CtaBanner
          heading={f.ctaHeading}
          body={f.ctaBody}
          actionLabel={m.home.primaryCta}
          actionHref={localizedPath(locale, 'contact')}
        />
      </main>
      <SiteFooter locale={locale} />
    </>
  );
}
