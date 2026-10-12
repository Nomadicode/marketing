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

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: requestedLocale } = await params;
  if (!isLocale(requestedLocale)) return {};
  const m = getMessages(requestedLocale);
  return pageMetadata(
    requestedLocale,
    'services',
    m.meta.servicesTitle,
    m.meta.servicesDescription,
  );
}

export default async function ServicesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: requestedLocale } = await params;
  if (!isLocale(requestedLocale)) notFound();
  const locale: Locale = requestedLocale;
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
