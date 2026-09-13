import Link from 'next/link';
import { Logo } from '@/app/components/layout/logo';
import { getMessages } from '@/app/lib/messages';
import { localizedPath, type Locale } from '@/app/lib/site';

export function SiteFooter({ locale }: { locale: Locale }) {
  const m = getMessages(locale);

  const columns = [
    {
      heading: m.footer.companyHeading,
      links: [
        { href: localizedPath(locale, 'about'), label: m.footer.about },
        { href: localizedPath(locale, 'careers'), label: m.footer.careers },
        { href: localizedPath(locale, 'contact'), label: m.footer.contact },
      ],
    },
    {
      heading: m.footer.servicesHeading,
      links: [
        {
          href: localizedPath(locale, 'services'),
          label: m.footer.migrations,
        },
        {
          href: localizedPath(locale, 'services'),
          label: m.footer.automation,
        },
        {
          href: localizedPath(locale, 'services'),
          label: m.footer.customDev,
        },
      ],
    },
    {
      heading: m.footer.productHeading,
      links: [
        { href: localizedPath(locale, 'flowdek'), label: 'FlowDek' },
        { href: localizedPath(locale, 'pricing'), label: m.nav.pricing },
      ],
    },
    {
      heading: m.footer.legalHeading,
      links: [
        { href: localizedPath(locale, 'terms'), label: m.footer.terms },
        { href: localizedPath(locale, 'privacy'), label: m.footer.privacy },
      ],
    },
  ];

  return (
    <footer className="border-t border-border bg-canvas px-6 pb-8 pt-16 md:px-12">
      <div className="mx-auto flex max-w-shell flex-wrap justify-between gap-12 pb-12">
        <div className="max-w-[280px]">
          <Link href={localizedPath(locale)} aria-label="Nomadicode home">
            <Logo height={18} />
          </Link>
          <p className="mt-4 text-[13.5px] leading-relaxed text-faint">
            {m.footer.tagline}
          </p>
        </div>
        <div className="flex flex-wrap gap-14">
          {columns.map((column) => (
            <div key={column.heading}>
              <div className="mb-4 text-xs font-semibold uppercase tracking-wide text-faint">
                {column.heading}
              </div>
              <div className="flex flex-col gap-2.5">
                {column.links.map((link, index) => (
                  <Link
                    key={`${link.href}-${index}`}
                    href={link.href}
                    className="text-sm text-muted hover:text-ink"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="mx-auto max-w-shell border-t border-border/60 pt-6">
        <span className="text-[13px] text-faint">{m.footer.copyright}</span>
      </div>
    </footer>
  );
}
