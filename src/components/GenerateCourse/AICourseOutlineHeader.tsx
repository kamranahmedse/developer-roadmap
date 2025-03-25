import { cn } from '../../lib/classname';
import type { AiCourse } from '../../lib/ai';
import { RegenerateOutline } from './RegenerateOutline';

type AICourseOutlineHeaderProps = {
  course: AiCourse;
  isLoading: boolean;
  onRegenerateOutline: (prompt?: string) => void;
};

export function AICourseOutlineHeader(props: AICourseOutlineHeaderProps) {
  const { course, isLoading, onRegenerateOutline } = props;

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

      {!isLoading && (
        <RegenerateOutline onRegenerateOutline={onRegenerateOutline} />
      )}
    </div>
  );
} 