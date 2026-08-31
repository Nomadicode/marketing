export const site = {
  name: 'Nomadicode',
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://nomadicode.com',
  email: 'hello@nomadicode.com',
  phone: '+1 (856) 263-0593',
  telephoneHref: 'tel:+18562630593',
  whatsapp: 'https://wa.me/18562630593',
};

export const locales = ['en', 'es'] as const;
export type Locale = (typeof locales)[number];

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}

export function localizedPath(locale: Locale, path = '') {
  const normalized = path.replace(/^\//, '');
  return locale === 'en'
    ? `/${normalized}`.replace(/\/$/, '') || '/'
    : `/es/${normalized}`.replace(/\/$/, '');
}

export function absoluteUrl(path: string) {
  return new URL(path, site.url).toString();
}
