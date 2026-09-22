import { Section } from '@/app/components/layout/section';

export function StatementBlock({
  heading,
  body,
}: {
  heading: string;
  body: string;
}) {
  return (
    <Section tone="raised" borderTop className="py-24 md:py-28">
      <div className="mx-auto max-w-[680px] text-center">
        <h2 className="mb-5 text-[clamp(26px,3.2vw,34px)] font-medium text-ink">
          {heading}
        </h2>
        <p className="text-[17px] text-muted">{body}</p>
      </div>
    </Section>
  );
}
