import Image from 'next/image';
import { Compass } from 'lucide-react';
import type { CaseStudy } from '@/app/types/case-study';

export function CaseStudyDetail({
  caseStudies,
  labels,
}: {
  caseStudies: CaseStudy[];
  labels: {
    started: string;
    discovered: string;
    did: string;
    went: string;
    next: string;
    nextCaption: string;
    technical: string;
  };
}) {
  if (caseStudies.length === 0) return null;

  return (
    <>
      {caseStudies.map((caseStudy, index) => (
        <section
          key={caseStudy.slug}
          className={[
            'px-6 py-20 md:px-12',
            index % 2 === 0 ? 'bg-canvas' : 'bg-canvas-raised',
          ].join(' ')}
        >
          <div className="mx-auto max-w-[900px]">
            <div className="mb-10 grid grid-cols-1 items-start gap-8 md:grid-cols-[1fr_1.3fr]">
              <div className="h-[220px] w-full overflow-hidden rounded-lg bg-canvas-raised">
                {caseStudy.imageUrl ? (
                  <Image
                    src={caseStudy.imageUrl}
                    alt=""
                    width={480}
                    height={220}
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
              <div>
                {caseStudy.tag && (
                  <div className="mb-2.5 text-[13px] font-semibold uppercase tracking-wide text-accent">
                    {caseStudy.tag}
                  </div>
                )}
                <h2 className="mb-3 font-serif text-[30px] font-semibold text-ink">
                  {caseStudy.name}
                </h2>
                {caseStudy.summary && (
                  <p className="text-base text-muted">{caseStudy.summary}</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-4">
              {caseStudy.started && (
                <div>
                  <h3 className="mb-2 text-[14px] font-semibold uppercase tracking-wide text-faint">
                    {labels.started}
                  </h3>
                  <p className="text-[15px] text-ink/85">{caseStudy.started}</p>
                </div>
              )}
              {caseStudy.discovered && (
                <div>
                  <h3 className="mb-2 text-[14px] font-semibold uppercase tracking-wide text-faint">
                    {labels.discovered}
                  </h3>
                  <p className="text-[15px] text-ink/85">
                    {caseStudy.discovered}
                  </p>
                </div>
              )}
              {caseStudy.did && (
                <div>
                  <h3 className="mb-2 text-[14px] font-semibold uppercase tracking-wide text-faint">
                    {labels.did}
                  </h3>
                  <p className="text-[15px] text-ink/85">{caseStudy.did}</p>
                </div>
              )}
              {caseStudy.went && (
                <div>
                  <h3 className="mb-2 text-[14px] font-semibold uppercase tracking-wide text-faint">
                    {labels.went}
                  </h3>
                  <p className="text-[15px] text-ink/85">{caseStudy.went}</p>
                </div>
              )}
            </div>

            {caseStudy.nextStep && (
              <div className="mt-7 border-t border-dashed border-border pt-6">
                <h3 className="mb-2 text-[14px] font-semibold uppercase tracking-wide text-accent">
                  {labels.next}{' '}
                  <span className="font-serif text-[15px] font-normal italic normal-case tracking-normal text-faint">
                    : {labels.nextCaption}
                  </span>
                </h3>
                <p className="text-[15px] text-ink/85">{caseStudy.nextStep}</p>
              </div>
            )}

            {caseStudy.technical && (
              <div className="mt-5 rounded-md bg-canvas px-[22px] py-5">
                <h3 className="mb-2 text-[13px] font-semibold uppercase tracking-wide text-faint">
                  {labels.technical}
                </h3>
                <p className="text-sm text-muted">{caseStudy.technical}</p>
              </div>
            )}
          </div>
        </section>
      ))}
    </>
  );
}
