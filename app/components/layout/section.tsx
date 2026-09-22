import type { ReactNode } from 'react';

type SectionProps = {
  id?: string;
  tone?: 'base' | 'raised' | 'navy';
  grid?: boolean;
  borderTop?: boolean;
  borderBottom?: boolean;
  className?: string;
  children: ReactNode;
};

export function Section({
  id,
  tone = 'base',
  grid = false,
  borderTop = false,
  borderBottom = false,
  className = '',
  children,
}: SectionProps) {
  const toneBg =
    tone === 'raised'
      ? 'bg-canvas-raised'
      : tone === 'navy'
        ? 'bg-navy'
        : 'bg-canvas';
  const borderColor = tone === 'navy' ? 'border-navy-border' : 'border-border';
  const classes = [
    toneBg,
    grid && tone !== 'navy' ? 'bg-dot-grid' : '',
    borderTop ? `border-t ${borderColor}` : '',
    borderBottom ? `border-b ${borderColor}` : '',
    'px-6 py-16 md:px-12 md:py-20',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <section id={id} className={classes}>
      {children}
    </section>
  );
}
