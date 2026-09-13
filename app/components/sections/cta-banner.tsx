import Link from 'next/link';
import { Section } from '@/app/components/layout/section';

export function CtaBanner({
  heading,
  body,
  actionLabel,
  actionHref,
  tone = 'raised',
}: {
  heading: string;
  body?: string;
  actionLabel: string;
  actionHref: string;
  tone?: 'base' | 'raised';
}) {
  return (
    <Section grid tone={tone} borderTop className="py-24 text-center md:py-28">
      <div className="mx-auto max-w-[640px]">
        <h2 className="text-[clamp(26px,4vw,36px)] font-extrabold tracking-tight text-ink">
          {heading}
        </h2>
        {body && <p className="mt-4 text-[15px] text-muted">{body}</p>}
        <Link
          href={actionHref}
          className="mt-6 inline-block rounded-md bg-accent px-7 py-3.5 text-[15px] font-semibold text-canvas"
        >
          {actionLabel}
        </Link>
      </div>
    </Section>
  );
}
