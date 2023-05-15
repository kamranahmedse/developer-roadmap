import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import type { UserActivityResponse } from './UserActivities';
import ProgressDarkIcon from '../../icons/progress-dark.svg';
import CheckCircleIcon from '../../icons/check-circle.svg';
import XIcon from '../../icons/close-dark.svg';
import ClockIcon from '../../icons/clock.svg';

dayjs.extend(relativeTime);

export function UserActivity({
  activity,
}: {
  activity: UserActivityResponse['activities'][0];
}) {
  const { type, createdAt, metadata } = activity;

  const resourceUrl =
    metadata.resourceType === 'roadmap'
      ? `/${metadata.resourceId}`
      : `/best-practices/${metadata.resourceId}`;
  const icon = {
    done: CheckCircleIcon,
    learning: ProgressDarkIcon,
    pending: ClockIcon,
    skipped: XIcon,
    cleared: XIcon,
    completed: CheckCircleIcon,
  };
  const status = {
    done: 'Finished',
    learning: 'Started',
    pending: 'Pending',
    skipped: 'Skipped',
    cleared: 'Cleared',
    completed: 'Completed',
  };

  return (
    <div className="flex items-center justify-between gap-2 rounded border border-gray-200 p-1">
      <p className="flex items-center gap-2 text-sm">
        <img src={icon[type]} alt={type} className="h-4 w-4" />
        <p>
          {status[type]}{' '}
          <a
            className="text-black underline hover:no-underline"
            href={resourceUrl}
          >
            {metadata.resourceId}'s
          </a>{' '}
          <span>{metadata.label}</span>
        </p>
      </p>
      <p className="whitespace-nowrap text-xs text-gray-400">
        {dayjs().to(dayjs(new Date(createdAt)))}
      </p>
    </div>
  );
}

export function UserActivitySkeleton() {
  return (
    <div className="flex items-center justify-between gap-2 rounded border border-gray-200 p-1">
      <div className="flex items-center gap-2 text-sm">
        <div className="h-4 w-4 rounded-full bg-gray-200" />
        <div className="h-4 w-24 rounded-full bg-gray-200" />
      </div>
      <div className="whitespace-nowrap text-xs text-gray-400">
        <div className="h-4 w-12 rounded-full bg-gray-200" />
      </div>
    </div>
  );
}
