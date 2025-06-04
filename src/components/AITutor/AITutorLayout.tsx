import { Menu } from 'lucide-react';
import { useState } from 'react';
import { AITutorSidebar, type AITutorTab } from './AITutorSidebar';
import { RoadmapLogoIcon } from '../ReactIcons/RoadmapLogo';
import { cn } from '../../lib/classname';

type AITutorLayoutProps = {
  children: React.ReactNode;
  activeTab: AITutorTab;
  wrapperClassName?: string;
  containerClassName?: string;
};

export function AITutorLayout(props: AITutorLayoutProps) {
  const { children, activeTab, wrapperClassName, containerClassName } = props;

  const [isSidebarFloating, setIsSidebarFloating] = useState(false);

  return (
    <>
      <div className="sticky top-0 z-10 flex flex-row items-center justify-between border-b border-slate-200 bg-white px-4 py-3 lg:hidden">
        <a href="/" className="flex flex-row items-center gap-1.5">
          <RoadmapLogoIcon className="size-6 text-gray-500" color="black" />
        </a>
        <button
          className="flex flex-row items-center gap-1"
          onClick={() => setIsSidebarFloating(!isSidebarFloating)}
        >
          <Menu className="size-5 text-gray-500" />
        </button>
      </div>

      <div
        className={cn(
          'flex flex-grow flex-row lg:h-screen',
          containerClassName,
        )}
        style={
          {
            '--ai-sidebar-width': '255px',
          } as React.CSSProperties
        }
      >
        <AITutorSidebar
          onClose={() => setIsSidebarFloating(false)}
          isFloating={isSidebarFloating}
          activeTab={activeTab}
        />
        <div
          className={cn(
            'flex flex-grow flex-col overflow-y-scroll bg-gray-100 p-3 lg:p-4',
            wrapperClassName,
          )}
        >
          {children}
        </div>
      </div>
    </>
  );
}
