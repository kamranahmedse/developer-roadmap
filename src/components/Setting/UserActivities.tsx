import { useCallback, useEffect, useState } from 'preact/hooks';
import { httpPost } from '../../lib/http';
import { pageLoadingMessage } from '../../stores/page';
import CheckDarkIcon from '../../icons/check-badge.svg';
import ProgressDarkIcon from '../../icons/progress-dark.svg';
import StarDarkIcon from '../../icons/star-dark.svg';

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
  streak: number;
  learning: UserResourceProgressDocument[];
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
      {/* <div className="grid border-b border-gray-200">
        <div className="p-5 pb-8 pt-10 text-center">
          <div className="relative text-3xl font-semibold">
            {data?.topicsCompleted || 0}
            <sup className="absolute top-0 ml-0.5 text-sm font-normal leading-none text-gray-500">
              +{data?.topicsCompletedToday || 0} today
            </sup>
          </div>
          <p className="mt-1">Topics Completed</p>
        </div>
      </div> */}

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
                {data?.topicsCompleted || 0}{' '}
                <span className="text-xs font-normal text-gray-400">
                  // +{data?.topicsCompletedToday || 0} today
                </span>
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 pl-2">
            <img src={StarDarkIcon} alt="star" className="h-6 w-6" />
            <div>
              <h3 className="text-xs text-gray-600">Learning Streak</h3>
              <p className="mt-1 font-semibold leading-none">
                {data?.topicsCompleted || 0}{' '}
                <span className="text-xs font-normal text-gray-400">
                  today
                </span>
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
      </div>
    </div>
  );
}
