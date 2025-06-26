import { ChevronDown, BookIcon, CodeIcon, CircleDot } from 'lucide-react';
import { cn } from '../../lib/classname';
import { useEffect, useState } from 'react';

type ChapterRowProps = {
  counter: number;
  icon: React.ReactNode;
  title: string;
  description: string;
  lessonCount: number;
  challengeCount: number;
  isExpandable?: boolean;
  className?: string;
  lessons?: { title: string; type: 'lesson' | 'challenge' | 'quiz' }[];
};

export function ChapterRow(props: ChapterRowProps) {
  const {
    counter,
    icon,
    title,
    description,
    lessonCount,
    challengeCount,
    isExpandable = true,
    className,
    lessons = [],
  } = props;

  const [isExpanded, setIsExpanded] = useState(false);

  const regularLessons = lessons.filter((l) => l.type === 'lesson');
  const challenges = lessons.filter((l) =>
    ['challenge', 'quiz'].includes(l.type),
  );

  return (
    <div
      className={cn('group relative overflow-hidden select-none', className)}
    >
      <div
        role="button"
        onClick={() => isExpandable && setIsExpanded(!isExpanded)}
        className={cn(
          'relative rounded-xl border border-zinc-800 bg-zinc-800 p-6',
          'bg-linear-to-br from-zinc-900/90 via-zinc-900/70 to-zinc-900/50',
          !isExpanded &&
            'hover:bg-linear-to-br hover:from-zinc-900/95 hover:via-zinc-900/80 hover:to-zinc-900/60',
          !isExpanded &&
            'hover:cursor-pointer hover:shadow-[0_0_30px_rgba(0,0,0,0.2)]',
          isExpanded && 'cursor-pointer rounded-b-none border-b-0',
        )}
      >
        <div className="flex items-start gap-4">
          <div className="hidden shrink-0 md:block">
            <div className="rounded-full bg-yellow-500/10 p-3">{icon}</div>
          </div>

          <div className="grow">
            <h3 className="text-xl font-semibold tracking-wide text-white">
              <span className="inline text-gray-500 md:hidden">
                {counter}.{' '}
              </span>
              {title}
            </h3>
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
            <div className="shrink-0 rounded-full bg-zinc-800/80 p-2 text-zinc-400 group-hover:bg-zinc-800 group-hover:text-zinc-500">
              <ChevronDown
                className={cn(
                  'h-4 w-4 transition-transform',
                  isExpanded ? 'rotate-180' : '',
                )}
              />
            </div>
          )}
        </div>
      </div>

      {isExpanded && (
        <div className="rounded-b-xl border border-t-0 border-zinc-800 bg-linear-to-br from-zinc-900/50 via-zinc-900/30 to-zinc-900/20">
          <div className="grid grid-cols-1 divide-zinc-800 md:grid-cols-2 md:divide-x">
            {regularLessons.length > 0 && (
              <div className="p-6 pb-0 md:pb-6">
                <h4 className="mb-4 text-sm font-medium tracking-wider text-zinc-500 uppercase">
                  Lessons
                </h4>
                <div className="space-y-3">
                  {regularLessons.map((lesson, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 text-zinc-400 hover:text-yellow-500"
                    >
                      <BookIcon className="h-4 w-4" />
                      <span>{lesson.title}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {challenges.length > 0 && (
              <div className="p-6">
                <h4 className="mb-4 text-sm font-medium tracking-wider text-zinc-500 uppercase">
                  Exercises
                </h4>
                <div className="space-y-3">
                  {challenges.map((challenge, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 text-zinc-400 hover:text-yellow-500"
                    >
                      {challenge.type === 'challenge' ? (
                        <CodeIcon className="h-4 w-4" />
                      ) : (
                        <CircleDot className="h-4 w-4" />
                      )}
                      <span>{challenge.title}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
