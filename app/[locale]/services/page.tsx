import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { GitBranch, Workflow, Code2, FileSpreadsheet } from 'lucide-react';
import { SiteFooter } from '@/app/components/layout/site-footer';
import { SiteHeader } from '@/app/components/layout/site-header';
import { Section } from '@/app/components/layout/section';
import { PageIntro } from '@/app/components/sections/page-intro';
import { CtaBanner } from '@/app/components/sections/cta-banner';
import { ServiceItem } from '@/app/components/cards/service-item';
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

  const serviceIcons = [GitBranch, Workflow, Code2, FileSpreadsheet];

  return (
    <>
      <SiteHeader locale={locale} currentPath="services" />
      <main>
        <PageIntro
          eyebrow={s.eyebrow}
          title={s.title}
          description={s.description}
        />
        <Section>
          <div className="mx-auto grid max-w-shell grid-cols-1 gap-6 md:grid-cols-2">
            {s.items.map((item, index) => {
              const Icon = serviceIcons[index];
              return (
                <ServiceItem
                  key={item.title}
                  icon={<Icon size={28} className="text-accent" />}
                  title={item.title}
                  description={item.description}
                  bullets={item.bullets}
                />
              );
            })}
          </div>
        </Section>
        <CtaBanner
          heading={s.ctaHeading}
          body={s.ctaBody}
          actionLabel={m.home.primaryCta}
          actionHref={localizedPath(locale, 'contact')}
        />
      </main>
      <SiteFooter locale={locale} />
    </>
  );
}
