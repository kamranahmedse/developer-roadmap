import type { ReactNode } from 'react';
import { cn } from '../../lib/classname';

type DashboardTabProps = {
  label: string | ReactNode;
  isActive: boolean;
  onClick?: () => void;
  className?: string;
  href?: string;
  avatar?: string;
  icon?: ReactNode;
};

export function DashboardTabButton(props: DashboardTabProps) {
  const { isActive, onClick, label, className, href, avatar, icon } = props;

  const Slot = href ? 'a' : 'button';

  return (
    <Slot
      onClick={onClick}
      className={cn(
        'flex h-[30px] shrink-0 items-center gap-1 rounded-md border border-slate-700 bg-slate-800 p-1.5 pl-2 pr-3 text-sm leading-none text-gray-400 transition-colors hover:bg-slate-700',
        isActive
          ? 'border-slate-200 bg-slate-200 text-gray-900 hover:bg-slate-200'
          : '',
        className,
      )}
      {...(href ? { href } : {})}
    >
      {avatar && (
        <img
          src={avatar}
          alt="avatar"
          className="mr-0.5 h-4 w-4 rounded-full object-cover"
        />
      )}
      {icon}
      {label}
    </Slot>
  );
}
