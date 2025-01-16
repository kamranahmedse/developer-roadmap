import type { LucideIcon } from 'lucide-react';
import { cn } from '../../lib/classname';

type CourseStatPillProps = {
  icon: LucideIcon;
  label: string;
  tinyLabel?: string;
  className?: string;
};

export function CourseStatPill(props: CourseStatPillProps) {
  const { icon: Icon, label, tinyLabel, className } = props;

  return (
    <div
      className={cn(
        'flex items-center gap-2 rounded-full border border-slate-400 px-2.5 py-1 text-sm',
        className,
      )}
    >
      <Icon className="size-3.5 shrink-0 stroke-[2.5]" />
      <span className={cn(tinyLabel && 'max-sm:hidden')}>{label}</span>
      {tinyLabel && <span className="hidden max-sm:flex">{tinyLabel}</span>}
    </div>
  );
}
