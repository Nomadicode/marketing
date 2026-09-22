import { Section } from '@/app/components/layout/section';
import Image from 'next/image';

export function PerspectiveSplit({
  heading,
  paragraphs,
  yourBusinessLabel,
  ourPerspectiveLabel,
  centerLabel,
}: {
  heading: string;
  paragraphs: string[];
  yourBusinessLabel: string;
  ourPerspectiveLabel: string;
  centerLabel: string;
}) {
  return (
    <Section tone="raised" borderTop>
      <div className="mx-auto grid max-w-[1080px] items-center gap-14 md:grid-cols-2">
        <div>
          <h2 className="mb-5 text-[clamp(28px,3.6vw,38px)] font-medium text-ink">
            {heading}
          </h2>
          {paragraphs.map((paragraph, index) => (
            <p
              key={paragraph}
              className={[
                'text-[17px] leading-relaxed text-muted',
                index === paragraphs.length - 1 ? 'mb-0' : 'mb-4',
              ].join(' ')}
            >
              {paragraph}
            </p>
          ))}
        </div>
        <div className="relative h-[300px]">
          <Image
            src="/split-diagram.webp"
            alt={`${yourBusinessLabel} / ${ourPerspectiveLabel} — ${centerLabel}`}
            width={500}
            height={500}
            className="h-full w-full object-contain"
          />
        </div>
      </div>
    </Section>
  );
}
