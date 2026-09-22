import Link from 'next/link';

type Action = {
  href: string;
  label: string;
  variant?: 'primary' | 'secondary';
};

export function Hero({
  title,
  kicker,
  description,
  actions,
  imageSrc,
}: {
  title: string;
  kicker?: string;
  description?: string;
  actions?: Action[];
  imageSrc?: string;
}) {
  return (
    <section className="relative flex min-h-[640px] items-center overflow-hidden bg-navy">
      {imageSrc ? (
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-cover bg-[60%_50%]"
          style={{ backgroundImage: `url(${imageSrc})` }}
        />
      ) : (
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(120% 130% at 78% 30%, oklch(38% 0.05 264) 0%, oklch(20% 0.03 264) 55%, oklch(16% 0.025 264) 100%)',
          }}
        />
      )}
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(105deg, oklch(18% 0.03 264 / 0.94) 0%, oklch(18% 0.03 264 / 0.8) 32%, oklch(18% 0.03 264 / 0.25) 60%, transparent 78%)',
        }}
      />
      <div className="relative w-full max-w-shell px-6 py-[70px] mx-auto md:px-12">
        <div className="max-w-[480px]">
          <h1 className="mb-[22px] text-[clamp(36px,5.4vw,56px)] font-medium leading-[1.08] tracking-[-0.01em] text-navy-foreground">
            {title}
          </h1>
          {kicker && (
            <div className="mb-[22px] flex items-center gap-3">
              <span className="h-0 w-[30px] border-t border-dashed border-accent/80" />
              <p className="m-0 font-serif text-[19px] italic text-accent">
                {kicker}
              </p>
            </div>
          )}
          {description && (
            <p className="mb-9 text-base text-navy-muted">{description}</p>
          )}
          {actions && actions.length > 0 && (
            <div className="flex flex-wrap gap-4">
              {actions.map((action) =>
                action.variant === 'secondary' ? (
                  <Link
                    key={action.href}
                    href={action.href}
                    className="rounded-md border border-navy-border px-7 py-3.5 text-base font-semibold text-navy-foreground"
                  >
                    {action.label}
                  </Link>
                ) : (
                  <Link
                    key={action.href}
                    href={action.href}
                    className="rounded-md bg-accent px-7 py-3.5 text-base font-semibold text-accent-foreground"
                  >
                    {action.label}
                  </Link>
                ),
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
