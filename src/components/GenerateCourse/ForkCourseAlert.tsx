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
    <div className="mb-3.5 lg:-mt-2.5 max-w-5xl mx-auto flex items-center justify-between gap-2 rounded-lg bg-yellow-200 p-3 text-black">
      <p className="text-sm text-balance">
        To start tracking your progress, you can fork the course.
      </p>

      <button
        className="flex shrink-0 items-center gap-2 rounded-md bg-yellow-400 py-1.5 px-3 text-sm text-black"
        onClick={onForkCourse}
      >
        <GitForkIcon className="size-3.5" />
        Fork Course
      </button>
    </div>
  );
}
