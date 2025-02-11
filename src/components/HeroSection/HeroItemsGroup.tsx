import { useEffect, useRef, useState, type ReactNode } from 'react';
import { cn } from '../../lib/classname';
import { HeroTitle } from './HeroTitle';

type HeroItemsGroupProps = {
  icon: any;
  isLoading?: boolean;
  title: string | ReactNode;
  rightContent?: ReactNode;
  children?: ReactNode;
  className?: string;
};

export function HeroItemsGroup(props: HeroItemsGroupProps) {
  const {
    icon,
    isLoading = false,
    title,
    rightContent,
    children,
    className,
  } = props;

  const isInitialRender = useRef(true);

  const storageKey = `hero-group-${title}-collapsed`;
  const [isCollapsed, setIsCollapsed] = useState(true);

  function isCollapsedByStorage() {
    const stored = localStorage.getItem(storageKey);

    return stored === 'true';
  }

  useEffect(() => {
    setIsCollapsed(isCollapsedByStorage());
  }, [isLoading]);

  const isLoadingOrCollapsed = isLoading || isCollapsed;

  return (
    <div
      className={cn(
        'border-b border-gray-800/50',
        {
          'py-4': !isLoadingOrCollapsed,
          'py-3': isLoadingOrCollapsed,
          'opacity-50 transition-opacity hover:opacity-100':
            isCollapsed && !isLoading,
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
            localStorage.setItem(storageKey, (!isCollapsed).toString());
          }}
        />
        {!isLoadingOrCollapsed && (
          <div className="mt-4 grid grid-cols-1 gap-2.5 sm:grid-cols-2 md:grid-cols-3">
            {children}
          </div>
        )}
      </div>
    </div>
  );
}
