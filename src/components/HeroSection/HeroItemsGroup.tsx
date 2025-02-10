import type { ReactNode } from 'react';
import { cn } from '../../lib/classname';
import { HeroTitle } from './HeroTitle';

type HeroItemsGroupProps = {
  icon: any;
  isLoading?: boolean;
  title: string | ReactNode;
  rightContent?: ReactNode;
  isAllCollapsed?: boolean;
  children?: ReactNode;
  className?: string;
};

export function HeroItemsGroup(props: HeroItemsGroupProps) {
  const {
    icon,
    isLoading = false,
    title,
    rightContent,
    isAllCollapsed = false,
    children,
    className,
  } = props;

  const isCollapsed = isAllCollapsed || isLoading;

  return (
    <div
      className={cn(
        '',
        {
          'border-b border-b-slate-800/70 pb-5 pt-5': !isCollapsed,
          'py-2': isCollapsed,
        },
        className,
      )}
    >
      <div className="container">
        <HeroTitle
          icon={icon}
          isLoading={isLoading}
          title={title}
          rightContent={!isCollapsed && rightContent}
        />
        {!isCollapsed && (
          <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3">
            {children}
          </div>
        )}
      </div>
    </div>
  );
}
