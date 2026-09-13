import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { SiteFooter } from '@/app/components/layout/site-footer';
import { SiteHeader } from '@/app/components/layout/site-header';
import { Section } from '@/app/components/layout/section';
import { pageMetadata } from '@/app/lib/metadata';
import { getMessages } from '@/app/lib/messages';
import { isLocale, locales, type Locale } from '@/app/lib/site';

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
    'privacy',
    m.meta.privacyTitle,
    m.meta.privacyDescription,
  );
}

export default function PrivacyPage({
  params,
}: {
  params: { locale: string };
}) {
  if (!isLocale(params.locale)) notFound();
  const locale: Locale = params.locale;
  const m = getMessages(locale);
  const p = m.privacy;

  return (
    <>
      <SiteHeader locale={locale} currentPath="privacy" />
      <main>
        <Section className="pb-16 pt-24 md:pb-20 md:pt-28">
          <div className="mx-auto max-w-[720px]">
            <span className="mb-5 inline-block text-[13px] font-semibold uppercase tracking-wide text-accent">
              {p.eyebrow}
            </span>
            <h1 className="mb-2 text-3xl font-extrabold text-ink">{p.title}</h1>
            <p className="mb-10 text-sm text-faint">{p.updated}</p>
            <div className="flex flex-col gap-10">
              {p.sections.map((section, index) => (
                <section
                  key={section.heading}
                  aria-labelledby={`privacy-${index}`}
                >
                  <h2
                    id={`privacy-${index}`}
                    className="mb-3 text-xl font-bold text-ink"
                  >
                    {section.heading}
                  </h2>
                  <div className="flex flex-col gap-4">
                    {section.body.map((paragraph) => (
                      <p
                        key={paragraph}
                        className="text-[15px] leading-relaxed text-muted"
                      >
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </section>
              ))}
            </div>
          </div>
        </Section>
      </main>
      <SiteFooter locale={locale} />
    </>
  );
}
