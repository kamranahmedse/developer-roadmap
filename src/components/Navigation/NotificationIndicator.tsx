import { cn } from '../../lib/classname.ts';

type NotificationIndicatorProps = {
  className?: string;
};
export function NotificationIndicator(props: NotificationIndicatorProps) {
  const { className = '' } = props;

  return (
    <span
      className={cn(
        'absolute -top-1 right-0 h-3 w-3 text-xs uppercase tracking-wider',
        className,
      )}
    >
      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"></span>
      <span className="relative inline-flex h-3 w-3 rounded-full bg-green-500"></span>
    </span>
  );
}
