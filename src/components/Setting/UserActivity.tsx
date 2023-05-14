import type { UserActivityResponse } from './UserActivities';
import ProgressDarkIcon from '../../icons/progress-dark.svg';
import CheckCircleIcon from '../../icons/check-circle.svg';
import XIcon from '../../icons/close-dark.svg';
import ClockIcon from '../../icons/clock.svg';

export function UserActivity({
  activity,
}: {
  activity: UserActivityResponse['activities'][0];
}) {
  const { type, createdAt, metadata } = activity;
  const progress = type.split('-')[
    metadata.resourceType === 'roadmap' ? 2 : 3
  ] as 'done' | 'learning' | 'pending' | 'skipped';
  const formatedDate = new Date(createdAt).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  });
  const resourceUrl =
    metadata.resourceType === 'roadmap'
      ? `/${metadata.resourceId}`
      : `/best-practices/${metadata.resourceId}`;
  const icon = {
    done: CheckCircleIcon,
    learning: ProgressDarkIcon,
    pending: ClockIcon,
    skipped: XIcon,
  };
  const status = {
    done: 'Finished',
    learning: 'Started',
    pending: 'Pending',
    skipped: 'Skipped',
  };

  return (
    <div className="flex items-center justify-between gap-2 rounded border border-gray-200 p-1">
      <p className="flex items-center gap-2 text-sm">
        <img src={icon[progress]} alt={progress} className="h-4 w-4" />
        <p>
          {status[progress]}{' '}
          <a className="text-black underline hover:no-underline" href={resourceUrl}>
            {metadata.resourceId}'s
          </a>{' '}
          <span>{metadata.label}</span>
        </p>
      </p>
      <p className="text-xs text-gray-400">{formatedDate}</p>
    </div>
  );
}
