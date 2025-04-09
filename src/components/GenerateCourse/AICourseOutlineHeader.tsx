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
  isForkable: boolean;
  onForkCourse: () => void;
};

export function AICourseOutlineHeader(props: AICourseOutlineHeaderProps) {
  const {
    course,
    isLoading,
    onRegenerateOutline,
    viewMode,
    setViewMode,
    isForkable,
    onForkCourse,
  } = props;

  return (
    <div
      className={cn(
        'relative mb-1 flex items-start justify-between border-b border-gray-100 p-6 max-lg:p-3',
        isLoading && 'striped-loader',
      )}
    >
      <div className="max-lg:hidden">
        <h2 className="mb-1 text-2xl font-bold text-balance max-lg:text-lg max-lg:leading-tight">
          {course.title || 'Loading course ..'}
        </h2>
        <p className="text-sm text-gray-500 capitalize">
          {course.title ? course.difficulty : 'Please wait ..'}
        </p>
      </div>

      <div className="absolute top-3 right-3 flex gap-2 max-lg:relative max-lg:top-0 max-lg:right-0 max-lg:w-full max-lg:flex-row-reverse max-lg:justify-between">
        {!isLoading && (
          <>
            <RegenerateOutline
              onRegenerateOutline={onRegenerateOutline}
              isForkable={isForkable}
              onForkCourse={onForkCourse}
            />
            <div className="mr-1 flex rounded-lg border border-gray-200 bg-white p-0.5">
              <button
                onClick={() => setViewMode('outline')}
                className={cn(
                  'flex items-center gap-1 rounded-md px-2 py-1 text-sm transition-colors',
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
                onClick={() => {
                  if (isForkable) {
                    onForkCourse();
                    return;
                  }

                  setViewMode('roadmap');
                }}
                className={cn(
                  'flex items-center gap-1 rounded-md px-2 py-1 text-sm transition-colors',
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
          </>
        )}
      </div>
    </div>
  );
}
