import { Section } from '@/app/components/layout/section';

export function ToolTags({
  heading,
  description,
  tools,
}: {
  heading: string;
  description?: string;
  tools: string[];
}) {
  return (
    <Section tone="raised" className="text-center">
      <div className="mx-auto max-w-[900px]">
        <h2 className="mb-4 text-[clamp(26px,3.2vw,34px)] font-medium text-ink">
          {heading}
        </h2>
        {description && (
          <p className="mx-auto mb-9 max-w-[560px] text-base text-muted">
            {description}
          </p>
        )}
        <div className="flex flex-wrap justify-center gap-3">
          {tools.map((tool) => (
            <span
              key={tool}
              className="rounded-full border border-border bg-canvas px-[18px] py-2.5 text-[15px] text-ink/80"
            >
              {tool}
            </span>
          ))}
        </div>
      </div>
    </Section>
  );
}
