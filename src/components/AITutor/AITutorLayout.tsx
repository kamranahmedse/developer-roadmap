import { Menu } from 'lucide-react';
import { useState } from 'react';
import { AITutorSidebar, type AITutorTab } from './AITutorSidebar';
import { RoadmapLogoIcon } from '../ReactIcons/RoadmapLogo';

type AITutorLayoutProps = {
  children: React.ReactNode;
  activeTab: AITutorTab;
};

export function AITutorLayout(props: AITutorLayoutProps) {
  const { children, activeTab } = props;

  const [isSidebarFloating, setIsSidebarFloating] = useState(false);

  return (
    <>
      <div className="flex flex-row items-center justify-between border-b border-slate-200 px-4 py-3 lg:hidden">
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

      <div className="flex flex-grow flex-row">
        <AITutorSidebar
          onClose={() => setIsSidebarFloating(false)}
          isFloating={isSidebarFloating}
          activeTab={activeTab}
        />
        <div className="flex flex-grow flex-col overflow-y-scroll bg-gray-100 p-3 lg:px-4 lg:py-4">
          {children}
        </div>
      </div>
    </>
  );
}
