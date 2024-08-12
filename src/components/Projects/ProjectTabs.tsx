import { cn } from '../../lib/classname';

export const allowedProjectTabs = ['details', 'solutions'] as const;
export type AllowedProjectTab = (typeof allowedProjectTabs)[number];

type ProjectTabsProps = {
  activeTab: AllowedProjectTab;
  projectId: string;
};

export function ProjectTabs(props: ProjectTabsProps) {
  const { activeTab, projectId } = props;

  const tabs = [
    { name: 'Project Details', value: 'details' },
    { name: 'Community Solutions', value: 'solutions' },
  ];

  return (
    <div className="my-3 flex flex-row flex-wrap items-center gap-1.5 rounded-md border bg-white px-2 text-sm">
      {tabs.map((tab) => {
        const isActive = tab.value === activeTab;

        const href =
          tab.value === 'details'
            ? `/projects/${projectId}`
            : `/projects/${projectId}/${tab.value}`;

        return (
          <a
            key={tab.value}
            href={href}
            className={cn(
              'relative p-2',
              isActive ? 'font-medium' : 'opacity-50',
            )}
          >
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
