import { cn } from '../../lib/classname';
import {
  ArrowLeft,
  Blocks,
  BoxSelect,
  type LucideIcon,
  StepBackIcon,
  StickyNote,
  Text,
} from 'lucide-react';

export const allowedProjectTabs = ['details', 'solutions'] as const;
export type AllowedProjectTab = (typeof allowedProjectTabs)[number];

type TabButtonProps = {
  text: string;
  icon: LucideIcon;
  smText?: string;
  isActive?: boolean;
  href: string;
};

function TabButton(props: TabButtonProps) {
  const { text, icon: ButtonIcon, smText, isActive, href } = props;

  return (
    <a
      href={href}
      className={cn('relative flex items-center gap-1 p-2', {
        'text-black': isActive,
        'opacity-40 hover:opacity-90': !isActive,
      })}
    >
      {ButtonIcon && <ButtonIcon className="mr-1 inline-block h-4 w-4" />}
      <span className="hidden sm:inline">{text}</span>
      {smText && <span className="sm:hidden">{smText}</span>}

      {isActive && (
        <span className="absolute bottom-0 left-0 right-0 h-0.5 translate-y-1/2 rounded-t-md bg-black"></span>
      )}
    </a>
  );
}

type ProjectTabsProps = {
  activeTab: AllowedProjectTab;
  projectId: string;
  parentRoadmapId?: string;
};

export function ProjectTabs(props: ProjectTabsProps) {
  const { activeTab, parentRoadmapId, projectId } = props;

  return (
    <div className="my-3 flex flex-row flex-wrap items-center gap-1.5 overflow-hidden rounded-md border bg-white px-2.5 text-sm">
      <a
        href={`/${parentRoadmapId}/projects`}
        className={
          '-ml-1.5 flex items-center rounded-md bg-gray-300 px-2 py-1.5 text-xs tracking-wide text-black hover:bg-gray-400/60'
        }
      >
        <ArrowLeft className="mr-1 inline-block h-3.5 w-3.5" strokeWidth={2} />
        <span className="hidden sm:inline">Back to Projects</span>
      </a>
      <TabButton
        text={'Project Detail'}
        icon={Text}
        smText={'Details'}
        isActive={activeTab === 'details'}
        href={`/projects/${projectId}`}
      />
      <TabButton
        text={'Community Solutions'}
        icon={Blocks}
        smText={'Solutions'}
        isActive={activeTab === 'solutions'}
        href={`/projects/${projectId}/solutions`}
      />
    </div>
  );
}
