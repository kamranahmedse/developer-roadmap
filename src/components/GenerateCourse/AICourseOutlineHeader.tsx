import { cn } from '../../lib/classname';
import type { AiCourse } from '../../lib/ai';
import { RegenerateOutline } from './RegenerateOutline';
import type { AICourseViewMode } from './AICourseContent';
import { BookOpenCheck, Signpost } from 'lucide-react';

type AICourseOutlineHeaderProps = {
  course: AiCourse;
  isLoading: boolean;
  onRegenerateOutline: (prompt?: string) => void;
  viewMode: AICourseViewMode;
  setViewMode: (mode: AICourseViewMode) => void;
};

export function AICourseOutlineHeader(props: AICourseOutlineHeaderProps) {
  const { course, isLoading, onRegenerateOutline, viewMode, setViewMode } =
    props;

  return (
    <div
      className={cn(
        'relative mb-1 flex items-start justify-between border-b border-gray-100 p-6 max-lg:hidden',
        isLoading && 'striped-loader',
      )}
    >
      <div>
        <h2 className="mb-1 text-balance text-2xl font-bold max-lg:text-lg max-lg:leading-tight">
          {course.title || 'Loading course ..'}
        </h2>
        <p className="text-sm capitalize text-gray-500">
          {course.title ? course.difficulty : 'Please wait ..'}
        </p>
      </div>

      <div className="absolute right-3 top-3 flex items-center gap-2">
        {!isLoading && (
          <>
            <div className="flex rounded-md border border-gray-200 bg-white p-0.5 mr-1">
              <button
                onClick={() => setViewMode('outline')}
                className={cn(
                  'flex items-center gap-1 rounded px-2 py-1 text-sm transition-colors',
                  viewMode === 'outline'
                    ? 'bg-gray-200 text-gray-900'
                    : 'text-gray-500 hover:text-gray-900',
                )}
              >
                <BookOpenCheck
                  className={cn(
                    'size-4',
                    viewMode === 'outline' && 'text-gray-900',
                  )}
                />
                <span>Outline</span>
              </button>
              <button
                onClick={() => setViewMode('roadmap')}
                className={cn(
                  'flex items-center gap-1 rounded px-2 py-1 text-sm transition-colors',
                  viewMode === 'roadmap'
                    ? 'bg-gray-200 text-gray-900'
                    : 'text-gray-500 hover:text-gray-900',
                )}
              >
                <Signpost
                  className={cn(
                    'size-4',
                    viewMode === 'roadmap' && 'text-gray-900',
                  )}
                />
                <span>Map</span>
              </button>
            </div>
            <RegenerateOutline onRegenerateOutline={onRegenerateOutline} />
          </>
        )}
      </div>
    </div>
  );
}
