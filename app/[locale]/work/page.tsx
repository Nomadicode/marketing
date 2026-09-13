import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { SiteFooter } from '@/app/components/layout/site-footer';
import { SiteHeader } from '@/app/components/layout/site-header';
import { Section } from '@/app/components/layout/section';
import { PageIntro } from '@/app/components/sections/page-intro';
import { CtaBanner } from '@/app/components/sections/cta-banner';
import { CatalogSection } from '@/app/components/lists/catalog-section';
import { pageMetadata } from '@/app/lib/metadata';
import { getMessages } from '@/app/lib/messages';
import { getPublishedProducts } from '@/app/services/catalog.service';
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
  const products = await getPublishedProducts();

  return (
    <>
      <SiteHeader locale={locale} currentPath="work" />
      <main>
        <PageIntro
          eyebrow={w.eyebrow}
          title={w.title}
          description={w.description}
        />
        {products.length > 0 && (
          <Section>
            <div className="mx-auto max-w-shell">
              <CatalogSection
                entries={products}
                heading={w.productsHeading}
                locale={locale}
              />
            </div>
          </Section>
        )}
        <CtaBanner
          heading={w.ctaHeading}
          body={w.ctaBody}
          actionLabel={m.home.primaryCta}
          actionHref={localizedPath(locale, 'contact')}
        />
      </main>
      <SiteFooter locale={locale} />
    </>
  );
}
