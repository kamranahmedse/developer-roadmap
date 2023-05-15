import { useCallback, useEffect, useState } from 'preact/hooks';
import { httpPost } from '../../lib/http';
import { pageLoadingMessage } from '../../stores/page';
import CheckDarkIcon from '../../icons/check-badge.svg';
import ProgressDarkIcon from '../../icons/progress-dark.svg';
import StarDarkIcon from '../../icons/star-dark.svg';
import { UserActivity, UserActivitySkeleton } from './UserActivity';
import { LearningProgress, LearningProgressSkeleton } from './LearningProgress';

export interface UserResourceProgressDocument {
  _id?: string;
  userId: string;
  resourceId: string;
  resourceType: 'roadmap' | 'best-practice';
  done: string[];
  learning: string[];
  createdAt: Date;
  updatedAt: Date;
  totalGroupCount: number;
}

export type UserActivityResponse = {
  topicsCompletedToday: number;
  topicsCompleted: number;
  topicsLearning: number;
  streak: number;
  learning: {
    roadmap: UserResourceProgressDocument[];
    bestPractice: UserResourceProgressDocument[];
  };
  activities: {
    type: 'done' | 'learning' | 'pending' | 'skipped' | 'cleared' | 'completed';
    createdAt: Date;
    metadata: {
      resourceId?: string;
      resourceType?: 'roadmap' | 'best-practice';
      topicId?: string;
      label?: string;
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
    <>
      {isLoading ? (
        <UserActivitiesSkeleton />
      ) : (
        <div>
          <div className="pl-0 pt-4 md:p-10 md:pb-0 md:pr-0">
            <div className="divider-gray-300 grid divide-y rounded border border-gray-300 sm:grid-cols-3 sm:divide-x sm:divide-y-0 sm:divide-gray-300 sm:border-none">
              <div className="flex items-center gap-3 p-2 sm:p-0">
                <img src={CheckDarkIcon} alt="done" className="h-6 w-6" />
                <div>
                  <h3 className="text-xs text-gray-600">Topics Completed</h3>
                  <p className="mt-1 text-lg font-bold leading-none">
                    {data?.topicsCompleted || 0}{' '}
                    <span className="text-xs font-normal text-gray-400">
                      +{data?.topicsCompletedToday || 0} today
                    </span>
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-2 sm:p-0 sm:pl-2">
                <img
                  src={ProgressDarkIcon}
                  alt="learning"
                  className="h-6 w-6"
                />
                <div>
                  <h3 className="text-xs text-gray-600">Currently Learning</h3>
                  <p className="mt-1 text-lg font-bold leading-none">
                    {data?.topicsLearning || 0}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-2 sm:p-0 sm:pl-2">
                <img src={StarDarkIcon} alt="star" className="h-6 w-6" />
                <div>
                  <h3 className="text-xs text-gray-600">Learning Streak</h3>
                  <p className="mt-1 text-lg font-bold leading-none">
                    {data?.streak || 0}{' '}
                    <span className="text-xs font-normal text-gray-400">
                      {data?.streak === 1 ? 'day' : 'days'}
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="pl-0 pt-4 md:p-10 md:pr-0 md:pt-8">
            <div>
              <h4 className="text-2xl font-medium">Roadmaps</h4>

              {data?.learning.roadmap.length === 0 ? (
                <p className="mt-2">No roadmaps found. Start learning now!</p>
              ) : (
                <div className="mt-2 grid gap-2 sm:grid-cols-2">
                  {data?.learning.roadmap.map((item) => (
                    <LearningProgress
                      resource={item}
                      key={item._id?.toString()}
                    />
                  ))}
                </div>
              )}
            </div>

            <div className="mt-5">
              <h4 className="text-2xl font-medium">Best Practices</h4>

              {data?.learning.bestPractice.length === 0 ? (
                <p className="mt-2">
                  No best practices found. Start learning now!
                </p>
              ) : (
                <div className="mt-2 grid gap-2 sm:grid-cols-2">
                  {data?.learning.bestPractice.map((item) => (
                    <LearningProgress
                      resource={item}
                      key={item._id?.toString()}
                    />
                  ))}
                </div>
              )}
            </div>

            <h3 className="mt-8 text-2xl font-medium">Recent Activities</h3>

            {data?.activities.length === 0 ? (
              <p className="mt-4">No activities found.</p>
            ) : (
              <ul className="mt-4 flex flex-col gap-2">
                {data?.activities.map((activity) => (
                  <li>
                    <UserActivity activity={activity} />
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}
    </>
  );
}

function UserActivitiesSkeleton() {
  return (
    <div>
      <div className="pl-0 pt-4 md:p-10 md:pb-0 md:pr-0">
        <div className="divider-gray-300 grid divide-y rounded border border-gray-300 sm:grid-cols-3 sm:divide-x sm:divide-y-0 sm:divide-gray-300 sm:border-none">
          <div className="flex items-center gap-3 p-2 sm:p-0">
            <div className="mt-1 h-6 w-6 rounded-full bg-gray-300" />
            <div>
              <div className="mt-1 h-3 w-10 rounded bg-gray-300" />
              <div className="mt-1 h-[18px] w-10 rounded bg-gray-300" />
            </div>
          </div>
          <div className="flex items-center gap-3 p-2 sm:p-0 sm:pl-2">
            <div className="mt-1 h-6 w-6 rounded-full bg-gray-300" />
            <div>
              <div className="mt-1 h-3 w-10 rounded bg-gray-300" />
              <div className="mt-1 h-[18px] w-10 rounded bg-gray-300" />
            </div>
          </div>
          <div className="flex items-center gap-3 p-2 sm:p-0 sm:pl-2">
            <div className="mt-1 h-6 w-6 rounded-full bg-gray-300" />
            <div>
              <div className="mt-1 h-3 w-10 rounded bg-gray-300" />
              <div className="mt-1 h-[18px] w-10 rounded bg-gray-300" />
            </div>
          </div>
        </div>
      </div>

      <div className="pl-0 pt-4 md:p-10 md:pr-0 md:pt-8">
        <div>
          <div className="h-8 w-1/3 rounded bg-gray-300" />
          <div className="mt-2 grid gap-2 sm:grid-cols-2">
            <LearningProgressSkeleton />
            <LearningProgressSkeleton />
            <LearningProgressSkeleton />
            <LearningProgressSkeleton />
          </div>
        </div>

        <div className="mt-5">
          <div className="h-8 w-1/3 rounded bg-gray-300" />
          <div className="mt-2 grid gap-2 sm:grid-cols-2">
            <LearningProgressSkeleton />
            <LearningProgressSkeleton />
            <LearningProgressSkeleton />
            <LearningProgressSkeleton />
          </div>
        </div>

        <div className="mt-8 h-8 w-1/3 rounded bg-gray-300" />
        <ul className="mt-4 flex flex-col gap-2">
          <li>
            <UserActivitySkeleton />
          </li>
          <li>
            <UserActivitySkeleton />
          </li>
          <li>
            <UserActivitySkeleton />
          </li>
          <li>
            <UserActivitySkeleton />
          </li>
        </ul>
      </div>
    </div>
  );
}
