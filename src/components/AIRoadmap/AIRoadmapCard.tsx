import { CalendarIcon } from 'lucide-react';
import { getRelativeTimeString } from '../../lib/date';
import { cn } from '../../lib/classname';
import type { AIRoadmapDocument } from '../../queries/ai-roadmap';
import { AIRoadmapActions } from './AIRoadmapActions';

type AIRoadmapCardProps = {
  roadmap: Omit<AIRoadmapDocument, 'data' | 'questionAndAnswers'>;
  variant?: 'row' | 'column';
  showActions?: boolean;
};

export function AIRoadmapCard(props: AIRoadmapCardProps) {
  const { roadmap, variant = 'row', showActions = true } = props;

  const updatedAgo = getRelativeTimeString(roadmap?.updatedAt);

  return (
    <div className="relative flex flex-grow">
      <a
        href={`/ai-roadmaps/${roadmap.slug}`}
        className={cn(
          'group relative flex h-full w-full gap-3 overflow-hidden rounded-lg border border-gray-200 bg-white p-4 text-left transition-all hover:border-gray-300 hover:bg-gray-50 sm:gap-4',
          variant === 'column' && 'flex-col',
          variant === 'row' && 'flex-row sm:flex-row sm:items-center',
        )}
      >
        <div className="min-w-0 flex-1">
          <h3 className="line-clamp-2 text-base font-semibold text-balance text-gray-900">
            {roadmap.title}
          </h3>
        </div>

        <div className="mt-7 flex items-center gap-4 sm:gap-4">
          <div className="hidden items-center text-xs text-gray-600 sm:flex">
            <CalendarIcon className="mr-1 h-3.5 w-3.5" />
            <span>{updatedAgo}</span>
          </div>
        </div>
      </a>

      {showActions && roadmap.slug && (
        <div className="absolute top-2 right-2">
          <AIRoadmapActions roadmapSlug={roadmap.slug} />
        </div>
      )}
    </div>
  );
}
