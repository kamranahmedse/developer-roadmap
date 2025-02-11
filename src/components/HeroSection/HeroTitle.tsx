import type { ReactNode } from 'react';
import { Spinner } from '../ReactIcons/Spinner.tsx';
import { ChevronDown, ChevronsDownUp, ChevronsUpDown } from 'lucide-react';
import { cn } from '../../lib/classname.ts';

type HeroTitleProps = {
  icon: any;
  isLoading?: boolean;
  title: string | ReactNode;
  rightContent?: ReactNode;
  isCollapsed?: boolean;
  onToggleCollapse?: () => void;
  isEmpty?: boolean;
  emptyTitle?: ReactNode;
};

export function HeroTitle(props: HeroTitleProps) {
  const {
    isLoading = false,
    title,
    icon,
    rightContent,
    isCollapsed = false,
    onToggleCollapse,
    isEmpty = false,
    emptyTitle,
  } = props;

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <p className="flex items-center gap-0.5 text-sm text-gray-400">
          {!isLoading && icon}
          {isLoading && (
            <span className="mr-1.5">
              <Spinner />
            </span>
          )}
          {!isEmpty ? title : emptyTitle || title}
        </p>
      </div>
      <div className="flex items-center gap-2">
        {!isCollapsed && rightContent}

        {!isLoading && !isEmpty && (
          <button
            onClick={onToggleCollapse}
            className={cn(
              'ml-2 inline-flex items-center gap-1 rounded-md bg-slate-800 py-0.5 pl-1 pr-1.5 text-xs uppercase tracking-wider text-slate-400 hover:bg-slate-700',
              {
                'bg-slate-800 text-slate-500 hover:bg-slate-800 hover:text-slate-400':
                  !isCollapsed,
              },
            )}
          >
            {isCollapsed && (
              <>
                <ChevronsUpDown className="h-3.5 w-3.5" /> Expand
              </>
            )}
            {!isCollapsed && (
              <>
                <ChevronsDownUp className="h-3.5 w-3.5" /> Collapse
              </>
            )}
          </button>
        )}
      </div>
    </div>
  );
}
