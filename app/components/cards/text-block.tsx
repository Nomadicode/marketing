export function TextBlock({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div>
      <h2 className="mb-3.5 text-2xl font-bold text-ink">{title}</h2>
      <p className="text-[15.5px] leading-relaxed text-muted">{description}</p>
    </div>
  );
}
