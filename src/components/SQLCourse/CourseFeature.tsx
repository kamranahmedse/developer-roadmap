import { MinusIcon, PlusIcon, type LucideIcon } from 'lucide-react';
import { useState } from 'react';
import { cn } from '../../lib/classname';

type CourseFeatureProps = {
  title: string;
  icon: LucideIcon;
  description: string;
};

export function CourseFeature(props: CourseFeatureProps) {
  const { title, icon: Icon, description } = props;

  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <>
      <div
        className={cn(
          'fixed inset-0 z-10 bg-black/70 opacity-100 transition-opacity duration-200 ease-out',
          {
            'pointer-events-none opacity-0': !isExpanded,
          },
        )}
        onClick={() => setIsExpanded(false)}
      ></div>
      <div className="relative">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className={cn(
            'z-20 flex w-full items-center rounded-lg border border-zinc-800 bg-zinc-900/50 px-4 py-3 text-left transition-colors duration-200 ease-out hover:bg-zinc-800/40',
            {
              'relative bg-zinc-800 hover:bg-zinc-800': isExpanded,
            },
          )}
        >
          <span className="flex flex-grow items-center space-x-3">
            <Icon />
            <span>{title}</span>
          </span>
          {isExpanded ? (
            <MinusIcon className="h-4 w-4" />
          ) : (
            <PlusIcon className="h-4 w-4" />
          )}
        </button>
        {isExpanded && (
          <div className="absolute left-0 top-full z-20 translate-y-2 rounded-lg border border-zinc-800 bg-zinc-800 p-4">
            <p>{description}</p>
          </div>
        )}
      </div>
    </>
  );
}
