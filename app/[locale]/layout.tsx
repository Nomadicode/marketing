import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import '@/app/globals.css';
import { isLocale, locales, site, type Locale } from '@/app/lib/site';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  applicationName: site.name,
  robots: { index: true, follow: true },
};

export default function LocaleLayout({
  children,
  params,
}: Readonly<{ children: React.ReactNode; params: { locale: string } }>) {
  if (!isLocale(params.locale)) notFound();
  const locale = params.locale as Locale;
  return (
    <html lang={locale}>
      <body>{children}</body>
    </html>
  );
}
