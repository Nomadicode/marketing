import type { ReactNode } from 'react';

export function HandwrittenNote({
  children,
  className = '',
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      aria-hidden="true"
      className={`pointer-events-none absolute font-hand text-[22px] leading-[0.9] text-highlight ${className}`}
    >
      {children}
    </span>
  );
}
