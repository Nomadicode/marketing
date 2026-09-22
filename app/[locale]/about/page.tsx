import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { SiteFooter } from '@/app/components/layout/site-footer';
import { SiteHeader } from '@/app/components/layout/site-header';
import { Section } from '@/app/components/layout/section';
import { PageHero } from '@/app/components/sections/page-hero';
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

  const sections = [
    { title: a.notJustTitle, body: a.notJustBody },
    { title: a.whoWeAreTitle, body: a.whoWeAreBody },
    { title: a.wontDoTitle, body: a.wontDoBody },
  ];

  return (
    <>
      <SiteHeader locale={locale} currentPath="about" />
      <main>
        <PageHero title={a.title} description={a.description} />

        {sections.map((section, index) => (
          <Section
            key={section.title}
            tone={index % 2 === 0 ? 'base' : 'raised'}
          >
            <div className="mx-auto max-w-[720px]">
              <h2 className="mb-4 font-serif text-[26px] font-semibold text-ink">
                {section.title}
              </h2>
              {section.body.map((paragraph) => (
                <p
                  key={paragraph}
                  className="mb-4 text-base text-ink/80 last:mb-0"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </Section>
        ))}

        <Section tone={sections.length % 2 === 0 ? 'base' : 'raised'}>
          <div className="mx-auto max-w-[720px]">
            <h2 className="mb-4 font-serif text-[26px] font-semibold text-ink">
              {a.technicalTitle}
            </h2>
            {a.technicalBody.map((paragraph) => (
              <p
                key={paragraph}
                className="mb-4 text-base text-ink/80 last:mb-0"
              >
                {paragraph}
              </p>
            ))}
            <p className="text-[15px] text-muted">
              {a.technicalNotePrefix}{' '}
              <a
                href={localizedPath(locale, 'work')}
                className="text-ink underline decoration-border-strong underline-offset-4"
              >
                {a.technicalNoteLinkLabel}
              </a>
              {a.technicalNoteSuffix}
            </p>
          </div>
        </Section>

        <CtaBanner
          heading={a.ctaHeading}
          actionLabel={m.nav.bookCall}
          actionHref={localizedPath(locale, 'contact')}
        />
      </main>
      <SiteFooter locale={locale} />
    </>
  );
}
