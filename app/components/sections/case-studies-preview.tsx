import Image from 'next/image';
import Link from 'next/link';
import { Compass } from 'lucide-react';
import { Section } from '@/app/components/layout/section';
import type { CaseStudy } from '@/app/types/case-study';

export function CaseStudiesPreview({
  heading,
  description,
  caseStudies,
  linkLabel,
  linkHref,
}: {
  heading: string;
  description?: string;
  caseStudies: CaseStudy[];
  linkLabel?: string;
  linkHref?: string;
}) {
  if (caseStudies.length === 0) return null;

  return (
    <Section borderTop>
      <div className="mx-auto max-w-[1080px]">
        <h2 className="mb-3 text-center text-[clamp(28px,3.6vw,38px)] font-medium text-ink">
          {heading}
        </h2>
        {description && (
          <p className="mx-auto mb-14 max-w-[620px] text-center text-[17px] text-muted">
            {description}
          </p>
        )}
        <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3">
          {caseStudies.map((caseStudy) => {
            const card = (
              <>
                <div className="mb-4 h-[170px] w-full overflow-hidden rounded-lg bg-canvas-raised">
                  {caseStudy.imageUrl ? (
                    <Image
                      src={caseStudy.imageUrl}
                      alt=""
                      width={400}
                      height={170}
                      unoptimized
                      className="size-full object-cover"
                    />
                  ) : (
                    <div className="flex size-full items-center justify-center">
                      <Compass
                        size={28}
                        className="text-border-strong"
                        aria-hidden="true"
                      />
                    </div>
                  )}
                </div>
                <div className="mb-1.5 font-serif text-lg font-semibold text-ink">
                  {caseStudy.name}
                </div>
                {caseStudy.blurb && (
                  <div className="text-sm text-muted">{caseStudy.blurb}</div>
                )}
              </>
            );

            return caseStudy.projectUrl ? (
              <a
                key={caseStudy.slug}
                href={caseStudy.projectUrl}
                target="_blank"
                rel="noreferrer"
                className="block"
              >
                {card}
              </a>
            ) : (
              <div key={caseStudy.slug}>{card}</div>
            );
          })}
        </div>
        {linkLabel && linkHref && (
          <div className="mt-12 text-center">
            <Link href={linkHref} className="text-base font-semibold text-ink">
              {linkLabel}
            </Link>
          </div>
        )}
      </div>
    </Section>
  );
}
