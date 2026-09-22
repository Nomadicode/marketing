import { Check } from 'lucide-react';
import Link from 'next/link';
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export function PricingCard({
  badge,
  title,
  subtitle,
  price,
  priceNote,
  features,
  ctaLabel,
  ctaHref,
}: {
  badge?: string;
  title: string;
  subtitle: string;
  price: string;
  priceNote: string;
  features: string[];
  ctaLabel: string;
  ctaHref: string;
}) {
  return (
    <Card className="h-full">
      {badge && (
        <CardAction>
          <span className="rounded bg-accent px-2 py-1 text-[10px] font-bold uppercase tracking-wide text-accent-foreground">
            {badge}
          </span>
        </CardAction>
      )}
      <CardHeader className="px-8 pt-8">
        <CardTitle className="font-serif text-xl font-medium text-ink">
          {title}
        </CardTitle>
        <CardDescription className="text-muted">{subtitle}</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-1 flex-col px-8 pb-8 pt-6">
        <div className="text-3xl font-extrabold text-ink">{price}</div>
        <p className="mt-1 text-xs text-faint">{priceNote}</p>
        <ul className="mt-6 flex flex-1 flex-col gap-3">
          {features.map((feature) => (
            <li
              key={feature}
              className="flex items-start gap-2 text-sm text-muted"
            >
              <Check size={16} className="mt-0.5 shrink-0 text-accent" />
              {feature}
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter className="px-8 pb-8 pt-0">
        <Link
          href={ctaHref}
          className="block w-full rounded-md bg-accent px-5 py-3 text-center text-sm font-semibold text-accent-foreground"
        >
          {ctaLabel}
        </Link>
      </CardFooter>
    </Card>
  );
}
