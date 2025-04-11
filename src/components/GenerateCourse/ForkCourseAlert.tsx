import { GitForkIcon } from 'lucide-react';
import { getUser } from '../../lib/jwt';
import { cn } from '../../lib/classname';

type ForkCourseAlertProps = {
  className?: string;
  creatorId?: string;
  onForkCourse: () => void;
};

export function ForkCourseAlert(props: ForkCourseAlertProps) {
  const { creatorId, onForkCourse, className = '' } = props;

  const currentUser = getUser();

  if (!currentUser || !creatorId || currentUser?.id === creatorId) {
    return null;
  }

  return (
    <div
      className={cn(
        'mx-auto mb-3.5 flex max-w-5xl items-center justify-between gap-2 rounded-lg bg-yellow-200 p-3 text-black lg:-mt-2.5',
        className,
      )}
    >
      <p className="text-sm text-balance">
        To start tracking your progress, you can fork the course.
      </p>

      <button
        className="flex shrink-0 items-center gap-2 rounded-md bg-yellow-400 px-3 py-1.5 text-sm text-black"
        onClick={onForkCourse}
      >
        <GitForkIcon className="size-3.5" />
        Fork Course
      </button>
    </div>
  );
}
