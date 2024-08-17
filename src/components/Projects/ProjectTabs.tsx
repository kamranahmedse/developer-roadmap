import { cn } from '../../lib/classname';
import {
  Blocks,
  BoxSelect,
  type LucideIcon,
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
        <span className="absolute bottom-0 left-0 right-0 h-0.5 translate-y-1/2 bg-black rounded-t-md"></span>
      )}
    </a>
  );
}

type ProjectTabsProps = {
  activeTab: AllowedProjectTab;
  projectId: string;
};

export function ProjectTabs(props: ProjectTabsProps) {
  const { activeTab, projectId } = props;

  return (
    <div className="my-3 flex flex-row flex-wrap items-center gap-1.5 rounded-md border bg-white px-2.5 text-sm">
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
