import Link from 'next/link';
import { getMessages } from '@/app/lib/messages';
import { localizedPath, site, type Locale } from '@/app/lib/site';

export function SiteFooter({ locale }: { locale: Locale }) {
  const m = getMessages(locale);
  return (
    <footer className="site-footer">
      <div className="shell footer-grid">
        <div>
          <p className="footer-wordmark">Nomadicode</p>
          <p>{m.footer.description}</p>
        </div>
        <div>
          <p className="footer-label">{m.footer.contact}</p>
          <a href={`mailto:${site.email}`}>{site.email}</a>
          <a href={site.telephoneHref}>{site.phone}</a>
        </div>
        <div>
          <Link href={localizedPath(locale, 'services')}>{m.nav.services}</Link>
          <Link href={localizedPath(locale, 'contact')}>{m.nav.contact}</Link>
        </div>
      </div>
      <div className="shell footer-bottom">
        © {new Date().getFullYear()} Nomadicode. {m.footer.rights}
      </div>
    </footer>
  );
}
