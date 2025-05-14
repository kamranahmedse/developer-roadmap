import { type LucideIcon, Star } from 'lucide-react';
import { cn } from '../../lib/classname.ts';

type ResourceSeparatorProps = {
  text: string;
  className?: string;
  labelClassName?: string;
  icon?: LucideIcon;
};

export function ResourceListSeparator(props: ResourceSeparatorProps) {
  const { text, icon: Icon, className = '', labelClassName = '' } = props;

  return (
    <p
      className={cn(
        'relative mt-6 flex items-center justify-start text-purple-600',
        className,
      )}
    >
      <span
        className={cn(
          'relative left-3 z-50 inline-flex items-center gap-1 rounded-md border border-current bg-white px-2 py-0.5 text-xs font-medium',
          labelClassName,
        )}
      >
        {Icon && <Icon className="inline-block h-3 w-3 fill-current" />}
        {text}
      </span>
      <span className="absolute inset-x-0 h-px w-full grow bg-current" />
    </p>
  );
}
