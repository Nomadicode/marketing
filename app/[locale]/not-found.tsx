import Link from 'next/link';
import { SiteFooter } from '@/app/components/layout/site-footer';
import { SiteHeader } from '@/app/components/layout/site-header';
import { getMessages } from '@/app/lib/messages';
import { isLocale, localizedPath } from '@/app/lib/site';

export default function NotFound({ params }: { params?: { locale?: string } }) {
  const candidate = params?.locale ?? '';
  const locale = isLocale(candidate) ? candidate : 'en';
  const m = getMessages(locale);
  return (
    <>
      <SiteHeader locale={locale} currentPath="" />
      <main className="mx-auto max-w-shell px-6 py-32 text-center md:px-12">
        <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-accent">
          404
        </p>
        <h1 className="mb-4 text-3xl font-bold text-ink">{m.notFound.title}</h1>
        <p className="mb-8 text-muted">{m.notFound.description}</p>
        <Link
          href={localizedPath(locale)}
          className="inline-block rounded-md bg-accent px-6 py-3 text-sm font-semibold text-accent-foreground"
        >
          {m.notFound.home}
        </Link>
      </main>
      <SiteFooter locale={locale} />
    </>
  );
}
