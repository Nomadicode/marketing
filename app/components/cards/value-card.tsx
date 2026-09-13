export function ValueCard({
  index,
  title,
  description,
}: {
  index?: string;
  title: string;
  description: string;
}) {
  return (
    <div>
      {index && (
        <div className="mb-2 text-xs font-semibold text-accent">{index}</div>
      )}
      <h3 className="mb-2 text-base font-bold text-ink">{title}</h3>
      <p className="text-sm leading-relaxed text-muted">{description}</p>
    </div>
  );
}
