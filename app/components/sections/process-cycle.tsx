import Image from 'next/image';
import { Section } from '@/app/components/layout/section';

export function ProcessCycle({
  heading,
  imageAlt,
}: {
  heading: string;
  imageAlt: string;
}) {
  return (
    <Section>
      <div className="mx-auto max-w-[1080px]">
        <h2 className="mb-10 text-center text-[clamp(28px,3.6vw,38px)] font-medium text-ink">
          {heading}
        </h2>
        <Image
          src="/process-diagram.webp"
          alt={imageAlt}
          width={1942}
          height={809}
          className="h-auto w-full object-contain"
        />
      </div>
    </Section>
  );
}
