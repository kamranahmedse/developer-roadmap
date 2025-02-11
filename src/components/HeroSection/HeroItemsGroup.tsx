import { useEffect, useState, type ReactNode } from 'react';
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

  const [isCollapsed, setIsCollapsed] = useState(isLoading || isAllCollapsed);

  useEffect(() => {
    setIsCollapsed(isAllCollapsed || isLoading);
  }, [isAllCollapsed, isLoading]);

  return (
    <div
      className={cn(
        'border-b border-gray-800/50',
        {
          'py-4': !isCollapsed,
          'py-3': isCollapsed,
        },
        className,
      )}
    >
      <div className="container">
        <HeroTitle
          icon={icon}
          isLoading={isLoading}
          title={title}
          rightContent={rightContent}
          isCollapsed={isCollapsed}
          onToggleCollapse={() => {
            setIsCollapsed(!isCollapsed);
          }}
        />
        {!isCollapsed && (
          <div className="mt-4 grid grid-cols-1 gap-2.5 sm:grid-cols-2 md:grid-cols-3">
            {children}
          </div>
        )}
      </div>
    </div>
  );
}
