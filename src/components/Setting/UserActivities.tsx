import { useCallback, useEffect, useState } from 'preact/hooks';
import { httpPost } from '../../lib/http';
import { pageLoadingMessage } from '../../stores/page';
import CheckDarkIcon from '../../icons/check-badge.svg';
import ProgressDarkIcon from '../../icons/progress-dark.svg';
import StarDarkIcon from '../../icons/star-dark.svg';
import CheckCircleIcon from '../../icons/check-circle.svg';
import XIcon from '../../icons/close-dark.svg';
import ClockIcon from '../../icons/clock.svg';

interface UserResourceProgressDocument {
  _id?: string;
  userId: string;
  resourceId: string;
  resourceType: 'roadmap' | 'best-practice';
  done: string[];
  learning: string[];
  createdAt: Date;
  updatedAt: Date;
}

type UserActivityResponse = {
  topicsCompletedToday: number;
  topicsCompleted: number;
  topicsLearning: number;
  streak: number;
  learning: UserResourceProgressDocument[];
  activities: {
    type:
      | 'roadmap-progress-done'
      | 'best-practice-progress-done'
      | 'roadmap-progress-learning'
      | 'best-practice-progress-learning'
      | 'roadmap-progress-pending'
      | 'best-practice-progress-pending'
      | 'roadmap-progress-skipped'
      | 'best-practice-progress-skipped';
    timestamp: Date;
    metadata: {
      resourceId?: string;
      resourceType?: 'roadmap' | 'best-practice';
      topicId?: string;
    };
  }[];
};

export default function UserActivities() {
  const [data, setData] = useState<UserActivityResponse>();
  const [isLoading, setIsLoading] = useState(true);

  const loadActivities = useCallback(async () => {
    setIsLoading(true);
    const { response, error } = await httpPost<UserActivityResponse>(
      `${import.meta.env.PUBLIC_API_URL}/v1-user-activity`,
      {
        timestring: new Date().toISOString(),
      }
    );

    if (error) {
      return;
    }

    setData(response);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    pageLoadingMessage.set('Loading Activities');
    loadActivities().finally(() => {
      pageLoadingMessage.set('');
    });
  }, [loadActivities]);

  return (
    <div>
      <div className="pl-0 pt-4 md:p-10 md:pb-0 md:pr-0">
        <div className="grid grid-cols-3 divide-x divide-gray-300">
          <div className="flex items-center gap-3">
            <img src={CheckDarkIcon} alt="done" className="h-6 w-6" />
            <div>
              <h3 className="text-xs text-gray-600">Topics Completed</h3>
              <p className="mt-1 font-semibold leading-none">
                {data?.topicsCompleted || 0}{' '}
                <span className="text-xs font-normal text-gray-400">
                  // +{data?.topicsCompletedToday || 0} today
                </span>
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 pl-2">
            <img src={ProgressDarkIcon} alt="learning" className="h-6 w-6" />
            <div>
              <h3 className="text-xs text-gray-600">Currently Learning</h3>
              <p className="mt-1 font-semibold leading-none">
                {data?.topicsLearning || 0}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 pl-2">
            <img src={StarDarkIcon} alt="star" className="h-6 w-6" />
            <div>
              <h3 className="text-xs text-gray-600">Learning Streak</h3>
              <p className="mt-1 font-semibold leading-none">
                {data?.topicsCompleted || 0}{' '}
                <span className="text-xs font-normal text-gray-400">today</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="pl-0 pt-4 md:p-10 md:pr-0 md:pt-8">
        <h3 className="text-2xl font-medium">Continue Learning</h3>
        <div className="mt-4 grid gap-2 sm:grid-cols-2 md:grid-cols-3">
          {data?.learning.map((item) => (
            <div className="rounded border border-gray-100 p-2">
              <h4 className="font-medium">{item.resourceId}</h4>
              <p className="text-sm">5/10 Completed</p>
            </div>
          ))}
        </div>

        <h3 className="mt-8 text-2xl font-medium">Recent Activities</h3>
        <ul className="mt-4 flex flex-col gap-2">
          {data?.activities.map((activity) => (
            <li>{formatActivity(activity)}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function formatActivity(activity: UserActivityResponse['activities'][0]) {
  const { type, timestamp, metadata } = activity;
  const progress = type.split('-')[
    metadata.resourceType === 'roadmap' ? 2 : 3
  ] as 'done' | 'learning' | 'pending' | 'skipped';
  const formatedDate = new Date(timestamp).toLocaleDateString('en-US', {
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
    learning: 'Learning',
    pending: 'Pending',
    skipped: 'Skipped',
  };

  return (
    <div className="flex items-center justify-between gap-2 rounded border border-gray-200 p-1">
      <p className="flex items-center gap-2 text-sm">
        <img src={icon[progress]} alt={progress} className="h-4 w-4" />
        <p>
          {status[progress]}{' '}
          <a className="text-black hover:underline" href={resourceUrl}>
            {metadata.resourceId}'s
          </a>{' '}
          <span>{metadata.topicId}</span>
        </p>
      </p>
      <p className="text-xs text-gray-400">{formatedDate}</p>
    </div>
  );
}
