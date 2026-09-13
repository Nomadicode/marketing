import Link from 'next/link';
import { locales, type Locale } from '@/app/lib/site';

const labels: Record<Locale, string> = { en: 'EN', es: 'ES' };

export function LanguageSelect({
  locale,
  currentPath,
  label,
}: {
  locale: Locale;
  currentPath: string;
  label: string;
}) {
  return (
    <div
      aria-label={label}
      className="flex items-center gap-0.5 rounded-md border border-border-strong p-0.5"
    >
      {locales.map((candidate) => {
        const href =
          candidate === 'en'
            ? `/${currentPath}`.replace(/\/$/, '') || '/'
            : `/es/${currentPath}`.replace(/\/$/, '');
        const isActive = candidate === locale;
        return (
          <Link
            key={candidate}
            href={href}
            aria-current={isActive ? 'true' : undefined}
            className={[
              'rounded px-2 py-1 text-xs font-bold',
              isActive ? 'bg-accent text-canvas' : 'text-muted hover:text-ink',
            ].join(' ')}
          >
            {labels[candidate]}
          </Link>
        );
      })}
    </div>
  );
}
