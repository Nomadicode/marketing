import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { SiteFooter } from '@/app/components/layout/site-footer';
import { SiteHeader } from '@/app/components/layout/site-header';
import { Section } from '@/app/components/layout/section';
import { ContactForm } from '@/app/components/forms/contact-form';
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
    'contact',
    m.meta.contactTitle,
    m.meta.contactDescription,
  );
}

export default function ContactPage({
  params,
}: {
  params: { locale: string };
}) {
  if (!isLocale(params.locale)) notFound();
  const locale: Locale = params.locale;
  const m = getMessages(locale);
  const c = m.contact;

  return (
    <>
      <SiteHeader locale={locale} currentPath="contact" />
      <main>
        <Section tone="base" className="pb-[100px] pt-[90px]">
          <div className="mx-auto grid max-w-[980px] items-start gap-16 md:grid-cols-2">
            <div>
              <h1 className="mb-5 text-[clamp(30px,4.2vw,44px)] font-medium text-ink">
                {c.title}
              </h1>
              {c.body.map((paragraph, index) => (
                <p
                  key={paragraph}
                  className={[
                    'text-[16px] text-muted',
                    index === 0 ? 'text-[17px]' : '',
                    index === c.body.length - 1 ? 'mb-0' : 'mb-4',
                  ].join(' ')}
                >
                  {paragraph}
                </p>
              ))}
              <p className="mt-4 text-[15px] text-faint">{c.duration}</p>
            </div>

            <ContactForm messages={c.form} />
          </div>
        </Section>
      </main>
      <SiteFooter locale={locale} />
    </>
  );
}
