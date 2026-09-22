import Link from 'next/link';
import { Logo } from '@/app/components/layout/logo';
import { getMessages } from '@/app/lib/messages';
import { localizedPath, type Locale } from '@/app/lib/site';

export function SiteFooter({ locale }: { locale: Locale }) {
  const m = getMessages(locale);

  const primaryLinks = [
    { href: localizedPath(locale, 'services'), label: m.nav.howWeHelp },
    { href: localizedPath(locale, 'work'), label: m.nav.whereWeveGone },
    { href: localizedPath(locale, 'about'), label: m.nav.about },
    { href: localizedPath(locale, 'contact'), label: m.nav.bookCall },
  ];

  const secondaryLinks = [
    { href: localizedPath(locale, 'terms'), label: m.footer.terms },
    { href: localizedPath(locale, 'privacy'), label: m.footer.privacy },
  ];

  return (
    <footer className="bg-navy-strong px-6 pb-8 pt-16 md:px-12">
      <div className="mx-auto flex max-w-shell flex-wrap items-start justify-between gap-10 pb-10">
        <div className="max-w-[280px]">
          <Link href={localizedPath(locale)} aria-label="Nomadicode home">
            <Logo height={18} />
          </Link>
          <p className="mt-4 text-[13.5px] leading-relaxed text-navy-muted">
            {m.footer.tagline}
          </p>
        </div>
        <nav
          aria-label="Footer"
          className="flex flex-wrap items-center gap-x-8 gap-y-3"
        >
          {primaryLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-navy-muted hover:text-navy-foreground"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
      <div className="mx-auto flex max-w-shell flex-wrap items-center justify-between gap-4 border-t border-navy-border pt-6">
        <span className="text-[13px] text-navy-muted">
          {m.footer.copyright}
        </span>
        <div className="flex flex-wrap gap-x-5 gap-y-2">
          {secondaryLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-xs text-navy-muted/80 hover:text-navy-foreground"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}
