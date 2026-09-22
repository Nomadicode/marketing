import { Section } from '@/app/components/layout/section';

type Quote = { text: string; note?: string };

// Deterministic hand-drawn look: each quote gets a small, fixed rotation/size
// variance derived from its position, so the layout never shifts between
// server and client renders.
const ROTATIONS = [-0.6, 0.4, -0.3, 0.7, -0.4, 0.3, -0.5, 0.5];
const SIZES = [20, 17, 22, 16, 18, 17, 19, 21];

export function MessyQuotes({
  heading,
  description,
  quotes,
}: {
  heading: string;
  description?: string;
  quotes: Quote[];
}) {
  return (
    <Section>
      <div className="mx-auto max-w-[1080px]">
        <h2 className="mb-4 text-center text-[clamp(30px,4vw,42px)] font-medium text-ink">
          {heading}
        </h2>
        {description && (
          <p className="mx-auto mb-14 max-w-[560px] text-center text-lg text-muted">
            {description}
          </p>
        )}
        <div className="columns-1 gap-10 sm:columns-2 lg:columns-3">
          {quotes.map((quote, index) => (
            <div
              key={quote.text}
              className="mb-11 break-inside-avoid"
              style={{
                transform: `rotate(${ROTATIONS[index % ROTATIONS.length]}deg)`,
              }}
            >
              <span className="mb-2.5 inline-block h-0 w-[22px] border-t border-dashed border-faint" />
              <p
                className="m-0 font-serif italic leading-snug text-ink"
                style={{ fontSize: SIZES[index % SIZES.length] }}
              >
                &ldquo;{quote.text}&rdquo;
              </p>
              {quote.note && (
                <p className="mt-2 font-hand text-[19px] leading-none text-highlight">
                  {quote.note}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
