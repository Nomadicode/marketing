import type { Metadata } from 'next';
import { Caveat, Source_Sans_3, Source_Serif_4 } from 'next/font/google';
import { notFound } from 'next/navigation';
import '@/app/globals.css';
import { isLocale, locales, site, type Locale } from '@/app/lib/site';
import { GoogleAnalytics } from '@next/third-parties/google';

const sourceSans = Source_Sans_3({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-sans',
  display: 'swap',
});

const sourceSerif = Source_Serif_4({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-serif',
  display: 'swap',
});

const caveat = Caveat({
  subsets: ['latin'],
  weight: ['500', '600'],
  variable: '--font-hand',
  display: 'swap',
});

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  applicationName: site.name,
  robots: { index: true, follow: true },
};

export default function LocaleLayout({
  children,
  params,
}: Readonly<{ children: React.ReactNode; params: { locale: string } }>) {
  const gaId = process.env.NEXT_PUBLIC_GA_ID;

  if (!isLocale(params.locale)) notFound();
  const locale = params.locale as Locale;
  return (
    <html
      lang={locale}
      className={`${sourceSans.variable} ${sourceSerif.variable} ${caveat.variable}`}
    >
      <body className="bg-canvas font-sans text-ink">{children}</body>
      {gaId && <GoogleAnalytics gaId={gaId} />}
    </html>
  );
}
