import { GitForkIcon } from 'lucide-react';
import { getUser } from '../../lib/jwt';

type ForkCourseAlertProps = {
  courseSlug: string;
  creatorId?: string;
  onForkCourse: () => void;
};

export function ForkCourseAlert(props: ForkCourseAlertProps) {
  const { courseSlug, creatorId, onForkCourse } = props;

  const currentUser = getUser();

  if (!currentUser || !creatorId || currentUser?.id === creatorId) {
    return null;
  }

  return (
    <div className="mb-4 flex items-center justify-between gap-2 rounded-lg bg-yellow-200 p-3 text-black">
      <p className="text-sm text-balance">
        To start tracking your progress, you can fork the course.
      </p>

      <button
        className="flex shrink-0 items-center gap-2 rounded-md bg-yellow-400 p-1 px-2 text-sm text-black"
        onClick={onForkCourse}
      >
        <GitForkIcon className="size-3.5" />
        Fork Course
      </button>
    </div>
  );
}
