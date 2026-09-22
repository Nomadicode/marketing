import { Section } from '@/app/components/layout/section';

export function PageHero({
  title,
  description,
}: {
  title: string;
  description?: string;
}) {
  return (
    <Section tone="raised" className="pb-[70px] pt-[90px] text-center">
      <div className="mx-auto max-w-[760px]">
        <h1 className="mb-5 text-[clamp(32px,4.6vw,48px)] font-medium text-ink">
          {title}
        </h1>
        {description && <p className="text-lg text-muted">{description}</p>}
      </div>
    </Section>
  );
}
