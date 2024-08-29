import type { ReactNode } from 'react';
import { cn } from '../../lib/classname';

type DashboardTabProps = {
  label: string | ReactNode;
  isActive: boolean;
  onClick?: () => void;
  className?: string;
  href?: string;
};

export function DashboardTab(props: DashboardTabProps) {
  const { isActive, onClick, label, className, href } = props;

  const Slot = href ? 'a' : 'button';

  return (
    <Slot
      onClick={onClick}
      className={cn(
        'shrink-0 rounded-md border p-1.5 px-2 text-sm leading-none text-gray-600',
        isActive ? 'border-gray-500 bg-gray-200 text-gray-900' : '',
        className,
      )}
      {...(href ? { href } : {})}
    >
      {label}
    </Slot>
  );
}
