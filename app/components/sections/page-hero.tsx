import { HandwrittenNote } from '@/app/components/annotations/handwritten-note';
import { Section } from '@/app/components/layout/section';

export function PageHero({
  title,
  description,
  annotation,
}: {
  title: string;
  description?: string;
  annotation?: string;
}) {
  return (
    <Section tone="raised" className="pb-[70px] pt-[90px] text-center">
      <div className="relative mx-auto max-w-[760px]">
        <h1 className="mb-5 text-[clamp(32px,4.6vw,48px)] font-medium text-ink">
          {title}
        </h1>
        {annotation && (
          <HandwrittenNote className="-right-3 -top-5 hidden -rotate-[5deg] md:block">
            {annotation}
          </HandwrittenNote>
        )}
        {description && <p className="text-lg text-muted">{description}</p>}
      </div>
    </Section>
  );
}
