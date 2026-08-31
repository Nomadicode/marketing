import type { MetadataRoute } from 'next';
import { absoluteUrl, locales, localizedPath } from './lib/site';

export default function sitemap(): MetadataRoute.Sitemap {
  return locales.flatMap((locale) =>
    ['', 'services', 'contact'].map((path) => ({
      url: absoluteUrl(localizedPath(locale, path)),
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: path === '' ? 1 : 0.8,
    })),
  );
}
