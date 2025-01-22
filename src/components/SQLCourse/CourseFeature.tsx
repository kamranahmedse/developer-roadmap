import { PlusIcon, type LucideIcon } from 'lucide-react';
import { useState } from 'react';

type CourseFeatureProps = {
  title: string;
  icon: LucideIcon;
  description: string;
};

export function CourseFeature(props: CourseFeatureProps) {
  const { title, icon: Icon, description } = props;

  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <button className="flex w-full items-center rounded-lg border border-zinc-800 bg-zinc-900/50 px-4 py-3 text-left hover:bg-zinc-800/40 transition-colors duration-200 ease-out">
      <span className="flex flex-grow items-center space-x-3">
        <Icon />
        <span>{title}</span>
      </span>
      <PlusIcon className="h-4 w-4" />
    </button>
  );
}
