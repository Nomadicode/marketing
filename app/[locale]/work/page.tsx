import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { SiteFooter } from '@/app/components/layout/site-footer';
import { SiteHeader } from '@/app/components/layout/site-header';
import { PageHero } from '@/app/components/sections/page-hero';
import { CaseStudyDetail } from '@/app/components/sections/case-study-detail';
import { CtaBanner } from '@/app/components/sections/cta-banner';
import { pageMetadata } from '@/app/lib/metadata';
import { getMessages } from '@/app/lib/messages';
import { getPublishedCaseStudies } from '@/app/services/catalog.service';
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
    'work',
    m.meta.workTitle,
    m.meta.workDescription,
  );
}

export const revalidate = 300;

export default async function WorkPage({
  params,
}: {
  params: { locale: string };
}) {
  if (!isLocale(params.locale)) notFound();
  const locale: Locale = params.locale;
  const m = getMessages(locale);
  const w = m.work;
  const caseStudies = await getPublishedCaseStudies();

  return (
    <>
      <SiteHeader locale={locale} currentPath="work" />
      <main>
        <PageHero
          title={w.title}
          description={w.description}
          annotation={w.annotation}
        />

        <CaseStudyDetail caseStudies={caseStudies} labels={w.caseStudyLabels} />

        <CtaBanner
          heading={w.ctaHeading}
          actionLabel={m.nav.bookCall}
          actionHref={localizedPath(locale, 'contact')}
        />
      </main>
      <SiteFooter locale={locale} />
    </>
  );
}
