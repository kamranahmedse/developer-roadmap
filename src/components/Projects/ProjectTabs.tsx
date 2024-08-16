import { cn } from '../../lib/classname';
import { Blocks, BoxSelect, StickyNote, Text } from 'lucide-react';

export const allowedProjectTabs = ['details', 'solutions'] as const;
export type AllowedProjectTab = (typeof allowedProjectTabs)[number];

type ProjectTabsProps = {
  activeTab: AllowedProjectTab;
  projectId: string;
};

export function ProjectTabs(props: ProjectTabsProps) {
  const { activeTab, projectId } = props;

  const tabs = [
    { name: 'Project Details', value: 'details', icon: Text },
    { name: 'Community Solutions', value: 'solutions', icon: Blocks },
  ];

  return (
    <div className="my-3 flex flex-row flex-wrap items-center gap-1.5 rounded-md border bg-white px-2.5 text-sm">
      {tabs.map((tab) => {
        const isActive = tab.value === activeTab;

        return (
          <a
            key={tab.value}
            href={
              tab.value === 'details'
                ? `/projects/${projectId}`
                : `/projects/${projectId}/${tab.value}`
            }
            className={cn('relative flex items-center gap-1 p-2', {
              'text-black': isActive,
              'opacity-40 hover:opacity-90': !isActive,
            })}
          >
            {tab.icon && <tab.icon className="mr-1 inline-block h-4 w-4" />}
            {tab.name}
            {isActive && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 translate-y-1/2 bg-black"></span>
            )}
          </a>
        );
      })}
    </div>
  );
}
