import Link from 'next/link';
import { Section } from '@/app/components/layout/section';

type Action = {
  href: string;
  label: string;
  variant?: 'primary' | 'secondary';
};

export function PageIntro({
  eyebrow,
  title,
  description,
  actions,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  actions?: Action[];
}) {
  return (
    <Section grid borderBottom className="pb-16 pt-24 md:pb-20 md:pt-28">
      <div className="mx-auto max-w-shell">
        {eyebrow && (
          <span className="mb-5 inline-block text-[13px] font-semibold uppercase tracking-wide text-accent">
            {eyebrow}
          </span>
        )}
        <h1 className="max-w-[760px] whitespace-pre-line text-[clamp(32px,5vw,56px)] font-extrabold leading-[1.1] tracking-tight text-ink">
          {title}
        </h1>
        {description && (
          <p className="mt-5 max-w-[640px] text-lg leading-relaxed text-muted">
            {description}
          </p>
        )}
        {actions && actions.length > 0 && (
          <div className="mt-8 flex flex-wrap items-center gap-6">
            {actions.map((action) =>
              action.variant === 'secondary' ? (
                <Link
                  key={action.href}
                  href={action.href}
                  className="text-sm font-medium text-ink underline decoration-border-strong underline-offset-4"
                >
                  {action.label}
                </Link>
              ) : (
                <Link
                  key={action.href}
                  href={action.href}
                  className="rounded-md bg-accent px-6 py-3 text-sm font-semibold text-canvas"
                >
                  {action.label}
                </Link>
              ),
            )}
          </div>
        )}
      </div>
    </Section>
  );
}
