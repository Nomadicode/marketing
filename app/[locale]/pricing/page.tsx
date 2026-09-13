import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { SiteFooter } from '@/app/components/layout/site-footer';
import { SiteHeader } from '@/app/components/layout/site-header';
import { Section } from '@/app/components/layout/section';
import { PageIntro } from '@/app/components/sections/page-intro';
import { PricingCard } from '@/app/components/cards/pricing-card';
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
    'pricing',
    m.meta.pricingTitle,
    m.meta.pricingDescription,
  );
}

export default function PricingPage({
  params,
}: {
  params: { locale: string };
}) {
  if (!isLocale(params.locale)) notFound();
  const locale: Locale = params.locale;
  const m = getMessages(locale);
  const p = m.pricing;

  return (
    <>
      <SiteHeader locale={locale} currentPath="pricing" />
      <main>
        <PageIntro
          eyebrow={p.eyebrow}
          title={p.title}
          description={p.description}
        />
        <Section>
          <div className="mx-auto max-w-shell">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {p.plans.map((plan) => (
                <PricingCard
                  key={plan.title}
                  badge={plan.badge}
                  title={plan.title}
                  subtitle={plan.subtitle}
                  price={plan.price}
                  priceNote={plan.priceNote}
                  features={plan.features}
                  ctaLabel={plan.ctaLabel}
                  ctaHref={localizedPath(locale, plan.ctaHref)}
                />
              ))}
            </div>
            <p className="mt-8 text-center text-xs text-faint">
              {p.disclaimer}
            </p>
          </div>
        </Section>
      </main>
      <SiteFooter locale={locale} />
    </>
  );
}
