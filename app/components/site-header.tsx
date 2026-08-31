import Image from 'next/image';
import Link from 'next/link';
import { LanguageSelect } from '@/app/components/language-select';
import { getMessages } from '@/app/lib/messages';
import { localizedPath, type Locale } from '@/app/lib/site';

export function SiteHeader({ locale }: { locale: Locale }) {
  const m = getMessages(locale);
  return (
    <header className="site-header">
      <nav aria-label="Primary navigation" className="shell nav">
        <Link
          className="brand brand-logo"
          href={localizedPath(locale)}
          aria-label="Nomadicode home"
        >
          <Image
            src="/nomadicode-logo.png"
            alt="Nomadicode"
            width={172}
            height={52}
            priority
          />
        </Link>
        <div className="nav-links">
          <Link href={localizedPath(locale, 'services')}>{m.nav.services}</Link>
          <Link href={localizedPath(locale, 'contact')}>{m.nav.contact}</Link>
          <LanguageSelect locale={locale} label={m.nav.language} />
          <Link
            className="button button-small"
            href={localizedPath(locale, 'contact')}
          >
            {m.nav.contact}
          </Link>
        </div>
      </nav>
    </header>
  );
}
