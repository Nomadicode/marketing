import {
  ArrowUpRight,
  Box,
  BriefcaseBusiness,
  Building2,
  Gift,
  LayoutDashboard,
  Sparkles,
  type LucideIcon,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { CatalogEntry, CatalogIconKey } from '@/app/types/catalog';
import { localizedPath, type Locale } from '@/app/lib/site';

const icons: Record<CatalogIconKey, LucideIcon> = {
  box: Box,
  gift: Gift,
  'layout-dashboard': LayoutDashboard,
  'building-2': Building2,
  'briefcase-business': BriefcaseBusiness,
  sparkles: Sparkles,
};

export function CatalogSection({
  entries,
  heading,
  locale,
}: {
  entries: CatalogEntry[];
  heading: string;
  locale: Locale;
}) {
  if (entries.length === 0) return null;

  return (
    <section aria-labelledby={`${heading}-heading`}>
      <h2
        id={`${heading}-heading`}
        className="mb-6 text-2xl font-bold text-ink"
      >
        {heading}
      </h2>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {entries.map((entry) => {
          const Icon = icons[entry.iconKey];
          const content = (
            <Card className="h-full transition-colors hover:border-border-strong">
              <CardHeader className="px-7 pt-7">
                <div className="flex items-center justify-between gap-4">
                  <div className="flex size-11 items-center justify-center overflow-hidden rounded-lg bg-canvas-raised">
                    {entry.iconUrl ? (
                      <Image
                        src={entry.iconUrl}
                        alt=""
                        width={44}
                        height={44}
                        loading="lazy"
                        sizes="44px"
                        unoptimized
                        className="size-full object-contain"
                      />
                    ) : (
                      <Icon
                        size={22}
                        className="text-accent"
                        aria-hidden="true"
                      />
                    )}
                  </div>
                  {entry.href && entry.status === 'active' && (
                    <ArrowUpRight
                      size={18}
                      className="text-accent"
                      aria-hidden="true"
                    />
                  )}
                </div>
                <CardTitle className="font-serif text-lg font-medium text-ink">
                  {entry.name}
                </CardTitle>
              </CardHeader>
              {(entry.description || entry.status === 'coming_soon') && (
                <CardContent className="px-7 pb-7 pt-4">
                  <p className="text-sm leading-relaxed text-muted">
                    {entry.status === 'coming_soon'
                      ? 'Coming soon'
                      : entry.description}
                  </p>
                </CardContent>
              )}
            </Card>
          );

          if (!entry.href || entry.status === 'coming_soon') {
            return <div key={entry.slug}>{content}</div>;
          }

          const href =
            entry.linkType === 'internal'
              ? localizedPath(locale, entry.href)
              : entry.href;

          return entry.linkType === 'external' ? (
            <a
              key={entry.slug}
              href={href}
              target="_blank"
              rel="noreferrer"
              className="block h-full rounded-xl focus-visible:outline-none"
            >
              {content}
            </a>
          ) : (
            <Link
              key={entry.slug}
              href={href}
              className="block h-full rounded-xl focus-visible:outline-none"
            >
              {content}
            </Link>
          );
        })}
      </div>
    </section>
  );
}
