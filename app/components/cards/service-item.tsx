import { Check } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export function ServiceItem({
  icon,
  title,
  description,
  bullets,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  bullets: string[];
}) {
  return (
    <Card className="h-full">
      <CardHeader className="px-8 pt-8">
        <span className="text-xs font-semibold text-accent">{icon}</span>
        <CardTitle className="text-xl font-bold text-ink">{title}</CardTitle>
        <CardDescription className="text-[15px] leading-relaxed text-muted">
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent className="px-8 pb-8 pt-6">
        <ul className="flex flex-col gap-2.5">
          {bullets.map((bullet) => (
            <li
              key={bullet}
              className="flex items-start gap-2 text-sm leading-relaxed text-muted"
            >
              <Check size={16} className="mt-0.5 shrink-0 text-accent" />
              {bullet}
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
