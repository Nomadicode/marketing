import Link from 'next/link';
import { Logo } from '@/app/components/layout/logo';
import { LanguageSelect } from '@/app/components/layout/language-select';
import { MobileNav } from '@/app/components/layout/mobile-nav';
import { getMessages } from '@/app/lib/messages';
import { localizedPath, type Locale } from '@/app/lib/site';

const navPaths = ['services', 'work', 'about'] as const;

export function SiteHeader({
  locale,
  currentPath,
}: {
  locale: Locale;
  currentPath: string;
}) {
  const m = getMessages(locale);
  const navLabels: Record<(typeof navPaths)[number], string> = {
    services: m.nav.howWeHelp,
    work: m.nav.whereWeveGone,
    about: m.nav.about,
  };

  const links = navPaths.map((path) => ({
    href: localizedPath(locale, path),
    label: navLabels[path],
    active: currentPath === path,
  }));

  return (
    <header className="sticky top-0 z-50 bg-navy">
      <div className="mx-auto flex max-w-shell flex-wrap items-center justify-between gap-4 px-6 py-[18px] md:px-12">
        <Link
          href={localizedPath(locale)}
          aria-label="Nomadicode home"
          className="flex items-center"
        >
          <Logo />
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-7 md:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={[
                'text-sm',
                link.active
                  ? 'font-semibold text-navy-foreground'
                  : 'font-medium text-navy-muted hover:text-navy-foreground',
              ].join(' ')}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3.5">
          <div className="hidden md:block">
            <LanguageSelect
              locale={locale}
              currentPath={currentPath}
              label={m.nav.language}
            />
          </div>
          <Link
            href={localizedPath(locale, 'contact')}
            className="hidden whitespace-nowrap rounded-md bg-accent px-5 py-2.5 text-sm font-semibold text-accent-foreground md:inline-block"
          >
            {m.nav.bookCall}
          </Link>
          <MobileNav
            links={links}
            bookCallLabel={m.nav.bookCall}
            bookCallHref={localizedPath(locale, 'contact')}
            menuLabel={m.nav.menu}
            closeLabel={m.nav.close}
            locale={locale}
            currentPath={currentPath}
            languageLabel={m.nav.language}
          />
        </div>
      </div>
    </header>
  );
}
