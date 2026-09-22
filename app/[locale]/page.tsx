import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { SiteFooter } from '@/app/components/layout/site-footer';
import { SiteHeader } from '@/app/components/layout/site-header';
import { Hero } from '@/app/components/sections/hero';
import { MessyQuotes } from '@/app/components/sections/messy-quotes';
import { PerspectiveSplit } from '@/app/components/sections/perspective-split';
import { ProcessCycle } from '@/app/components/sections/process-cycle';
import { SituationsList } from '@/app/components/sections/situations-list';
import { CaseStudiesPreview } from '@/app/components/sections/case-studies-preview';
import { StatementBlock } from '@/app/components/sections/statement-block';
import { CtaBanner } from '@/app/components/sections/cta-banner';
import { pageMetadata } from '@/app/lib/metadata';
import { getMessages } from '@/app/lib/messages';
import { getPublishedCaseStudies } from '@/app/services/catalog.service';
import { isLocale, localizedPath, locales, type Locale } from '@/app/lib/site';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export const revalidate = 300;

export function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Metadata {
  if (!isLocale(params.locale)) return {};
  const m = getMessages(params.locale);
  return pageMetadata(
    params.locale,
    '',
    m.meta.homeTitle,
    m.meta.homeDescription,
  );
}

export default async function HomePage({
  params,
}: {
  params: { locale: string };
}) {
  if (!isLocale(params.locale)) notFound();
  const locale: Locale = params.locale;
  const m = getMessages(locale);
  const h = m.home;
  const caseStudies = await getPublishedCaseStudies();

  return (
    <>
      <SiteHeader locale={locale} currentPath="" />
      <main>
        <Hero
          title={h.title}
          kicker={h.kicker}
          description={h.description}
          imageSrc="/hero-image.webp"
          actions={[
            { href: localizedPath(locale, 'contact'), label: h.primaryCta },
            {
              href: localizedPath(locale, 'work'),
              label: h.secondaryCta,
              variant: 'secondary',
            },
          ]}
        />

        <MessyQuotes
          heading={h.messyHeading}
          description={h.messyDescription}
          quotes={h.messyQuotes}
        />

        <PerspectiveSplit
          heading={h.perspectiveHeading}
          paragraphs={h.perspectiveBody}
          yourBusinessLabel={h.perspectiveYourBusinessLabel}
          ourPerspectiveLabel={h.perspectiveOurLabel}
          centerLabel={h.perspectiveCenterLabel}
        />

        <ProcessCycle heading={h.processHeading} imageAlt={h.processImageAlt} />

        <SituationsList
          heading={h.situationsHeading}
          description={h.situationsDescription}
          situations={h.situations}
          linkLabel={h.situationsLinkLabel}
          linkHref={localizedPath(locale, 'services')}
        />

        <CaseStudiesPreview
          heading={h.caseStudiesHeading}
          description={h.caseStudiesDescription}
          caseStudies={caseStudies}
          linkLabel={h.caseStudiesLinkLabel}
          linkHref={localizedPath(locale, 'work')}
        />

        <StatementBlock heading={h.trustHeading} body={h.trustBody} />

        <CtaBanner
          heading={h.ctaHeading}
          body={h.ctaBody}
          actionLabel={h.primaryCta}
          actionHref={localizedPath(locale, 'contact')}
        />
      </main>
      <SiteFooter locale={locale} />
    </>
  );
}
