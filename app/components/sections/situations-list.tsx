import Link from 'next/link';
import { HandwrittenNote } from '@/app/components/annotations/handwritten-note';
import { ScribbleArrow } from '@/app/components/annotations/scribble-arrow';
import { Section } from '@/app/components/layout/section';

type Situation = { title: string; response: string; annotation?: string };

const annotationPositions = [
  '-left-[168px] top-[-7px] w-[150px] -rotate-[5deg] text-right',
  '',
  '-right-[168px] top-[-5px] w-[150px] rotate-[4deg]',
  '',
  '-left-[168px] top-[-3px] w-[150px] -rotate-[3deg] text-right',
];

const arrowPositions = [
  '-left-[42px] top-[18px] h-[28px] w-[58px] -rotate-[7deg]',
  '',
  '-right-[42px] top-[19px] h-[26px] w-[56px] rotate-[180deg]',
  '',
  '-left-[42px] top-[18px] h-[27px] w-[56px] -rotate-[12deg]',
];

export function SituationsList({
  heading,
  description,
  situations,
  linkLabel,
  linkHref,
}: {
  heading: string;
  description?: string;
  situations: Situation[];
  linkLabel?: string;
  linkHref?: string;
}) {
  return (
    <Section tone="raised" borderTop>
      <div className="mx-auto max-w-[1080px]">
        <h2 className="mb-3 text-center text-[clamp(28px,3.6vw,38px)] font-medium text-ink">
          {heading}
        </h2>
        {description && (
          <p className="mx-auto mb-14 max-w-[560px] text-center text-[17px] text-muted">
            {description}
          </p>
        )}
        <div className="mx-auto mb-14 flex max-w-[720px] flex-col">
          {situations.map((situation, index) => (
            <div
              key={situation.title}
              className="relative grid grid-cols-1 gap-2 border-t border-border py-[18px] sm:grid-cols-[1.2fr_1fr] sm:items-baseline sm:gap-6"
            >
              <div className="font-serif text-lg font-semibold text-ink">
                {situation.title}
              </div>
              <div className="text-[15px] text-muted">{situation.response}</div>
              {situation.annotation && (
                <div className="hidden lg:block">
                  <HandwrittenNote className={annotationPositions[index]}>
                    {situation.annotation}
                  </HandwrittenNote>
                  <ScribbleArrow className={arrowPositions[index]} />
                </div>
              )}
            </div>
          ))}
        </div>
        {linkLabel && linkHref && (
          <div className="text-center">
            <Link href={linkHref} className="text-base font-semibold text-ink">
              {linkLabel}
            </Link>
          </div>
        )}
      </div>
    </Section>
  );
}
