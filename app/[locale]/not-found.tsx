import Link from 'next/link';
import { SiteFooter } from '@/app/components/site-footer';
import { SiteHeader } from '@/app/components/site-header';
import { getMessages } from '@/app/lib/messages';
import { isLocale, localizedPath } from '@/app/lib/site';

export default function NotFound({ params }: { params?: { locale?: string } }) {
  const candidate = params?.locale ?? '';
  const locale = isLocale(candidate) ? candidate : 'en';
  const m = getMessages(locale);
  return (
    <>
      <SiteHeader locale={locale} />
      <main className="not-found shell">
        <p className="eyebrow">404</p>
        <h1>{m.notFound.title}</h1>
        <p>{m.notFound.description}</p>
        <Link className="button" href={localizedPath(locale)}>
          {m.notFound.home}
        </Link>
      </main>
      <SiteFooter locale={locale} />
    </>
  );
}
