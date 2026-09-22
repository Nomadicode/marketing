import Link from 'next/link';
import { Section } from '@/app/components/layout/section';

export function CtaBanner({
  heading,
  body,
  actionLabel,
  actionHref,
  tone = 'navy',
}: {
  heading: string;
  body?: string | string[];
  actionLabel: string;
  actionHref: string;
  tone?: 'base' | 'raised' | 'navy';
}) {
  const isNavy = tone === 'navy';
  const bodyLines = Array.isArray(body) ? body : body ? [body] : [];

  return (
    <Section tone={tone} borderTop className="py-24 text-center md:py-28">
      <div className="mx-auto max-w-[640px]">
        <h2
          className={[
            'text-[clamp(28px,4vw,40px)] font-medium',
            isNavy ? 'text-navy-foreground' : 'text-ink',
          ].join(' ')}
        >
          {heading}
        </h2>
        {bodyLines.map((line) => (
          <p
            key={line}
            className={[
              'mt-4 text-[15px]',
              isNavy ? 'text-navy-muted' : 'text-muted',
            ].join(' ')}
          >
            {line}
          </p>
        ))}
        <Link
          href={actionHref}
          className="mt-8 inline-block rounded-md bg-accent px-7 py-3.5 text-[15px] font-semibold text-accent-foreground"
        >
          {actionLabel}
        </Link>
      </div>
    </Section>
  );
}
