import Link from 'next/link';
import {
  Code2,
  FileSpreadsheet,
  GitBranch,
  Workflow,
  ArrowRight,
} from 'lucide-react';
import { SiteFooter } from '@/app/components/layout/site-footer';
import { SiteHeader } from '@/app/components/layout/site-header';
import { Section } from '@/app/components/layout/section';
import { PageIntro } from '@/app/components/sections/page-intro';
import { CtaBanner } from '@/app/components/sections/cta-banner';
import { BorderedCard } from '@/app/components/cards/bordered-card';
import { ValueCard } from '@/app/components/cards/value-card';
import { CatalogSection } from '@/app/components/lists/catalog-section';
import { pageMetadata } from '@/app/lib/metadata';
import { getMessages } from '@/app/lib/messages';
import {
  getPublishedClients,
  getPublishedProducts,
} from '@/app/services/catalog.service';
import { isLocale, localizedPath, locales, type Locale } from '@/app/lib/site';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

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

const serviceIcons = [GitBranch, Workflow, Code2, FileSpreadsheet];

export default async function HomePage({
  params,
}: {
  params: { locale: string };
}) {
  if (!isLocale(params.locale)) notFound();
  const locale: Locale = params.locale;
  const m = getMessages(locale);
  const h = m.home;
  const [products, clients] = await Promise.all([
    getPublishedProducts(),
    getPublishedClients(),
  ]);
  const additionalProducts = products.filter(
    (product) => product.slug !== 'flowdek',
  );

  return (
    <>
      <SiteHeader locale={locale} currentPath="" />
      <main>
        <PageIntro
          title={h.title}
          description={h.description}
          actions={[
            { href: localizedPath(locale, 'contact'), label: h.primaryCta },
            {
              href: localizedPath(locale, 'work'),
              label: h.secondaryCta,
              variant: 'secondary',
            },
          ]}
        />

        <Section>
          <div className="mx-auto max-w-shell">
            <div className="mb-10 flex flex-wrap items-center justify-between gap-4">
              <h2 className="text-2xl font-bold text-ink">
                {h.whatWeDoHeading}
              </h2>
              <Link
                href={localizedPath(locale, 'services')}
                className="flex items-center gap-1.5 text-sm font-medium text-accent"
              >
                {h.allServices}
                <ArrowRight size={16} />
              </Link>
            </div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {h.services.map((service, index) => {
                const Icon = serviceIcons[index];
                return (
                  <BorderedCard
                    key={service.title}
                    icon={<Icon size={28} className="text-accent" />}
                    title={service.title}
                    description={service.description}
                  />
                );
              })}
            </div>
          </div>
        </Section>

        <Section tone="raised" borderTop>
          <div className="mx-auto grid max-w-shell gap-10 md:grid-cols-2 md:items-center">
            <div>
              <span className="mb-5 inline-block text-[13px] font-semibold uppercase tracking-wide text-accent">
                {h.flowdekEyebrow}
              </span>
              <h2 className="mb-4 text-3xl font-extrabold text-ink">
                {h.flowdekName}
              </h2>
              <p className="mb-6 max-w-[420px] text-[15px] leading-relaxed text-muted">
                {h.flowdekDescription}
              </p>
              <Link
                href={localizedPath(locale, 'flowdek')}
                className="inline-flex items-center gap-1.5 rounded-md bg-accent px-6 py-3 text-sm font-semibold text-canvas"
              >
                {h.flowdekCta}
                <ArrowRight size={16} />
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-3 rounded-xl border border-border bg-canvas p-5">
              {h.flowdekModules.map((module) => (
                <div
                  key={module}
                  className="rounded-md border border-border-strong px-4 py-3 text-sm font-medium text-ink"
                >
                  {module}
                </div>
              ))}
            </div>
          </div>
        </Section>

        {(additionalProducts.length > 0 || clients.length > 0) && (
          <Section borderTop>
            <div className="mx-auto flex max-w-shell flex-col gap-14">
              <CatalogSection
                entries={additionalProducts}
                heading={h.productsHeading}
                locale={locale}
              />
              <CatalogSection
                entries={clients}
                heading={h.clientsHeading}
                locale={locale}
              />
            </div>
          </Section>
        )}

        <Section borderTop>
          <div className="mx-auto max-w-shell">
            <h2 className="mb-10 text-2xl font-bold text-ink">
              {h.howWeWorkHeading}
            </h2>
            <div className="grid grid-cols-1 gap-9 sm:grid-cols-3">
              {h.steps.map((step) => (
                <ValueCard
                  key={step.index}
                  index={step.index}
                  title={step.title}
                  description={step.description}
                />
              ))}
            </div>
          </div>
        </Section>

        <Section tone="raised" borderTop borderBottom>
          <div className="mx-auto max-w-shell">
            <span className="mb-10 block text-center text-[13px] font-semibold uppercase tracking-wide text-accent">
              {h.whyEyebrow}
            </span>
            <div className="grid grid-cols-1 gap-9 text-center sm:grid-cols-3 sm:text-left">
              {h.whyItems.map((item) => (
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
