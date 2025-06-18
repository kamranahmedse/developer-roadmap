import { BookOpen, FileTextIcon, type LucideIcon } from 'lucide-react';
import { cn } from '../../lib/classname';

type LibraryTabsProps = {
  activeTab: 'guides' | 'courses';
};

export function LibraryTabs(props: LibraryTabsProps) {
  const { activeTab } = props;

  return (
    <div className="mb-6 flex gap-2 border-b border-gray-300">
      <LibraryTabButton
        isActive={activeTab === 'courses'}
        icon={BookOpen}
        label="Courses"
        href="/ai/courses"
      />
      <LibraryTabButton
        isActive={activeTab === 'guides'}
        icon={FileTextIcon}
        label="Guides"
        href="/ai/guides"
      />
    </div>
  );
}

type LibraryTabButtonProps = {
  isActive: boolean;
  icon: LucideIcon;
  label: string;
  href: string;
};

function LibraryTabButton(props: LibraryTabButtonProps) {
  const { isActive, icon: Icon, label, href } = props;

  return (
    <a
      href={href}
      className={cn(
        'flex items-center gap-1 rounded-t-md px-4 py-2 text-sm font-medium',
        isActive
          ? 'bg-gray-300'
          : 'bg-gray-100 transition-colors hover:bg-gray-200',
      )}
    >
      <Icon className="h-4 w-4" />
      {label}
    </a>
  );
}
