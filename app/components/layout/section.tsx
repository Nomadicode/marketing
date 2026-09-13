import type { ReactNode } from 'react';

type SectionProps = {
  id?: string;
  tone?: 'base' | 'raised';
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
  const classes = [
    tone === 'raised' ? 'bg-canvas-raised' : 'bg-canvas',
    grid ? 'bg-dot-grid' : '',
    borderTop ? 'border-t border-border' : '',
    borderBottom ? 'border-b border-border' : '',
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
