export const site = {
  name: 'Nomadicode',
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://nomadicode.com',
  email: 'hello@nomadicode.com',
};

export const locales = ['en', 'es'] as const;
export type Locale = (typeof locales)[number];

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}

export const pagePaths = [
  '',
  'services',
  'flowdek',
  'work',
  'pricing',
  'about',
  'careers',
  'contact',
  'terms',
  'privacy',
] as const;

export function localizedPath(locale: Locale, path = '') {
  const normalized = path.replace(/^\//, '');
  return locale === 'en'
    ? `/${normalized}`.replace(/\/$/, '') || '/'
    : `/es/${normalized}`.replace(/\/$/, '');
}

export function absoluteUrl(path: string) {
  return new URL(path, site.url).toString();
}
