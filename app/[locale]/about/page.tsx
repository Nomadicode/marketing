import type { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { SiteFooter } from '@/app/components/layout/site-footer';
import { SiteHeader } from '@/app/components/layout/site-header';
import { Section } from '@/app/components/layout/section';
import { PageIntro } from '@/app/components/sections/page-intro';
import { CtaBanner } from '@/app/components/sections/cta-banner';
import { TextBlock } from '@/app/components/cards/text-block';
import { ValueCard } from '@/app/components/cards/value-card';
import { BorderedCard } from '@/app/components/cards/bordered-card';
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
    'about',
    m.meta.aboutTitle,
    m.meta.aboutDescription,
  );
}

export default function AboutPage({ params }: { params: { locale: string } }) {
  if (!isLocale(params.locale)) notFound();
  const locale: Locale = params.locale;
  const m = getMessages(locale);
  const a = m.about;

  return (
    <>
      <SiteHeader locale={locale} currentPath="about" />
      <main>
        <PageIntro
          eyebrow={a.eyebrow}
          title={a.title}
          description={a.description}
        />

        <Section>
          <div className="mx-auto grid max-w-shell grid-cols-1 gap-14 md:grid-cols-2">
            <TextBlock title={a.believeTitle} description={a.believeBody} />
            <TextBlock title={a.whoTitle} description={a.whoBody} />
          </div>
        </Section>

        <Section tone="raised" borderTop borderBottom>
          <div className="mx-auto max-w-shell">
            <h2 className="mb-10 text-2xl font-bold text-ink">
              {a.approachHeading}
            </h2>
            <div className="grid grid-cols-1 gap-9 sm:grid-cols-2 lg:grid-cols-4">
              {a.approach.map((item) => (
                <ValueCard
                  key={item.title}
                  title={item.title}
                  description={item.description}
                />
              ))}
            </div>
          </div>
        </Section>

        <Section>
          <div className="mx-auto grid max-w-shell grid-cols-1 gap-14 md:grid-cols-2">
            <TextBlock title={a.structureTitle} description={a.structureBody} />
            <TextBlock title={a.growingTitle} description={a.growingBody} />
          </div>
        </Section>

        <Section>
          <div className="mx-auto max-w-shell">
            <h2 className="mb-10 text-2xl font-bold text-ink">
              {a.builtHeading}
            </h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <BorderedCard
                icon={
                  <Image
                    src="/nex-icon.png"
                    alt="Nex"
                    width={44}
                    height={44}
                    className="rounded-[10px]"
                  />
                }
                title="Nex"
                description={a.nexShort}
              />
              <BorderedCard
                icon={
                  <Image
                    src="/flowdek-logo.svg"
                    alt="FlowDek"
                    width={104}
                    height={26}
                  />
                }
                title="FlowDek"
                description={a.flowdekShort}
              />
            </div>
          </div>
        </Section>

        <CtaBanner
          heading={a.ctaHeading}
          actionLabel={m.home.primaryCta}
          actionHref={localizedPath(locale, 'contact')}
        />
      </main>
      <SiteFooter locale={locale} />
    </>
  );
}
