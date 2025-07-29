import type { LucideIcon } from 'lucide-react';

interface StatsItemProps {
  icon: LucideIcon;
  text: string;
}

export function StatsItem(props: StatsItemProps) {
  const Icon = props.icon;
  return (
    <div className="flex items-center gap-3">
      <Icon className="h-6 w-6 text-purple-500" strokeWidth={1.5} />
      <span className="text-gray-300">{props.text}</span>
    </div>
  );
} 