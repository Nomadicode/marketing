import type { ReactNode } from 'react';

export function BorderedCard({
  icon,
  title,
  description,
}: {
  icon: ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="h-full rounded-[10px] border border-border bg-canvas-raised p-7">
      <div className="mb-4">{icon}</div>
      <h3 className="mb-2 text-[17px] font-bold text-ink">{title}</h3>
      <p className="text-sm leading-relaxed text-muted">{description}</p>
    </div>
  );
}
