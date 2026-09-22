import { Section } from '@/app/components/layout/section';

type Situation = { title: string; detail: string };

export function SituationsDetail({ situations }: { situations: Situation[] }) {
  return (
    <Section>
      <div className="mx-auto flex max-w-[900px] flex-col gap-10">
        {situations.map((situation) => (
          <div
            key={situation.title}
            className="grid grid-cols-1 gap-3 border-t border-border pt-8 sm:grid-cols-[1.1fr_1.4fr] sm:gap-7"
          >
            <h2 className="font-serif text-2xl font-semibold text-ink">
              {situation.title}
            </h2>
            <p className="text-base text-muted">{situation.detail}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}
