import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { SiteFooter } from '@/app/components/layout/site-footer';
import { SiteHeader } from '@/app/components/layout/site-header';
import { PageHero } from '@/app/components/sections/page-hero';
import { SituationsDetail } from '@/app/components/sections/situations-detail';
import { ToolTags } from '@/app/components/sections/tool-tags';
import { CtaBanner } from '@/app/components/sections/cta-banner';
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
    'services',
    m.meta.servicesTitle,
    m.meta.servicesDescription,
  );
}

export default function ServicesPage({
  params,
}: {
  params: { locale: string };
}) {
  if (!isLocale(params.locale)) notFound();
  const locale: Locale = params.locale;
  const m = getMessages(locale);
  const s = m.services;

  return (
    <>
      <SiteHeader locale={locale} currentPath="services" />
      <main>
        <PageHero title={s.title} description={s.description} />

        <SituationsDetail situations={s.situations} />

        <ToolTags
          heading={s.toolsHeading}
          description={s.toolsDescription}
          tools={s.tools}
        />

        <CtaBanner
          heading={s.ctaHeading}
          actionLabel={m.nav.bookCall}
          actionHref={localizedPath(locale, 'contact')}
        />
      </main>
      <SiteFooter locale={locale} />
    </>
  );
}
