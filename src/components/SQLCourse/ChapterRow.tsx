import { ChevronDown } from 'lucide-react';
import { cn } from '../../lib/classname';
import { useState } from 'react';

type ChapterRowProps = {
  icon: React.ReactNode;
  title: string;
  description: string;
  lessonCount: number;
  challengeCount: number;
  isExpandable?: boolean;
  className?: string;
};

export function ChapterRow({
  icon,
  title,
  description,
  lessonCount,
  challengeCount,
  isExpandable = true,
  className
}: ChapterRowProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div 
      role="button"
      onClick={() => isExpandable && setIsExpanded(!isExpanded)}
      className={cn(
        'group relative rounded-xl border border-zinc-800 bg-zinc-900/50 p-6 transition-colors',
        'hover:bg-zinc-900/70 hover:cursor-pointer',
        className
      )}
    >
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0">
          <div className="rounded-full bg-yellow-500/10 p-3">
            {icon}
          </div>
        </div>

        <div className="flex-grow">
          <h3 className="text-xl font-bold text-white">{title}</h3>
          <p className="mt-2 text-zinc-400">{description}</p>

          <div className="mt-4 flex items-center gap-4">
            <div className="flex items-center gap-2 text-sm text-zinc-500">
              <span>{lessonCount} Lessons</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-zinc-500">
              <span>{challengeCount} Challenges</span>
            </div>
          </div>
        </div>

        {isExpandable && (
          <div className="flex-shrink-0 rounded-full bg-zinc-800/80 p-2 text-zinc-400 group-hover:bg-zinc-800 group-hover:text-yellow-500">
            <ChevronDown className={cn('h-4 w-4 transition-transform', isExpanded ? 'rotate-180' : '')} />
          </div>
        )}
      </div>
    </div>
  );
} 