import type { Metadata } from 'next';
import { localizedPath, site, type Locale } from './site';

export function pageMetadata(
  locale: Locale,
  path: string,
  title: string,
  description: string,
): Metadata {
  const canonical = localizedPath(locale, path);
  return {
    title,
    description,
    alternates: {
      canonical,
      languages: {
        en: localizedPath('en', path),
        es: localizedPath('es', path),
      },
    },
    openGraph: {
      type: 'website',
      url: canonical,
      siteName: site.name,
      title,
      description,
    },
  };
}
