import { useEffect, useState, useMemo } from 'react';
import { useToast } from '../../hooks/use-toast';
import { getUrlParams } from '../../lib/browser';
import { httpGet } from '../../lib/http';
import type { ResourceType } from '../../lib/resource-progress';
import type { AllowedActivityActionType } from '../Activity/ActivityStream';
import { pageProgressMessage } from '../../stores/page';
import { getRelativeTimeString } from '../../lib/date';

export type TeamStreamActivity = {
  _id?: string;
  resourceType: ResourceType | 'question';
  resourceId: string;
  resourceTitle: string;
  resourceSlug?: string;
  isCustomResource?: boolean;
  actionType: AllowedActivityActionType;
  topicIds?: string[];
  createdAt: Date;
  updatedAt: Date;
};

export interface TeamActivityStreamDocument {
  _id?: string;
  teamId: string;
  userId: string;
  activity: TeamStreamActivity[];
  createdAt: Date;
  updatedAt: Date;
}

type GetTeamActivityResponse = {
  users: {
    _id: string;
    name: string;
    avatar?: string;
    username?: string;
  }[];
  activities: TeamActivityStreamDocument[];
};

export function TeamActivityPage() {
  const { t: teamId } = getUrlParams();

  const toast = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [teamActivities, setTeamActivities] = useState<GetTeamActivityResponse>(
    {
      users: [],
      activities: [],
    },
  );

  const getTeamProgress = async () => {
    const { response, error } = await httpGet<GetTeamActivityResponse>(
      `${import.meta.env.PUBLIC_API_URL}/v1-get-team-activity/${teamId}`,
    );
    if (error || !response) {
      toast.error(error?.message || 'Failed to get team activity');
      return;
    }

    setTeamActivities(response);
  };

  useEffect(() => {
    if (!teamId) {
      return;
    }

    getTeamProgress().then(() => {
      pageProgressMessage.set('');
      setIsLoading(false);
    });
  }, [teamId]);

  const resourceLink = (activity: TeamStreamActivity) => {
    const { resourceId, resourceTitle, resourceType, isCustomResource } =
      activity;

    const resourceUrl =
      resourceType === 'question'
        ? `/questions/${resourceId}`
        : resourceType === 'best-practice'
          ? `/best-practices/${resourceId}`
          : isCustomResource && resourceType === 'roadmap'
            ? `/r/${resourceId}`
            : `/${resourceId}`;

    return (
      <a
        className="font-medium underline transition-colors hover:cursor-pointer hover:text-black"
        target="_blank"
        href={resourceUrl}
      >
        {resourceTitle}
      </a>
    );
  };

  const timeAgo = (date: string | Date) => (
    <span className="ml-1 text-xs text-gray-400">
      {getRelativeTimeString(new Date(date).toISOString())}
    </span>
  );

  const { users, activities } = teamActivities;
  const usersWithActivities = useMemo(
    () =>
      users
        .map((user) => {
          const userActivities = activities
            .filter((activity) => activity.userId === user._id)
            .flatMap((activity) => activity.activity)
            .sort((a, b) => {
              return (
                new Date(b.updatedAt).getTime() -
                new Date(a.updatedAt).getTime()
              );
            });

          return {
            ...user,
            activities: userActivities,
          };
        })
        .filter((user) => user.activities.length > 0)
        .sort((a, b) => {
          return (
            new Date(b.activities[0].updatedAt).getTime() -
            new Date(a.activities[0].updatedAt).getTime()
          );
        }),
    [users, activities],
  );

  console.log('-'.repeat(20));
  console.log('Team Activities: ', teamActivities);
  console.log('Users with Activities: ', usersWithActivities);
  console.log('-'.repeat(20));

  if (!teamId) {
    window.location.href = '/';
    return;
  }

  if (isLoading) {
    return null;
  }

  return (
    <ul className="flex flex-col gap-3">
      {usersWithActivities.map((user) => {
        const { activities } = user;

        const username = (
          <span className="font-medium">{user?.name || 'Unknown'}</span>
        );

        if (activities.length === 1) {
          const activity = activities[0];
          const { actionType, topicIds } = activity;
          const topicCount = topicIds?.length || 0;

          return (
            <li key={user._id}>
              {actionType === 'in_progress' && (
                <>
                  {username} started{' '}
                  <button className="font-medium underline underline-offset-2 hover:text-black">
                    {topicCount} topic{topicCount > 1 ? 's' : ''}
                  </button>{' '}
                  in {resourceLink(activity)} {timeAgo(activity.updatedAt)}
                </>
              )}
              {actionType === 'done' && (
                <>
                  {username} completed{' '}
                  <button className="font-medium underline underline-offset-2 hover:text-black">
                    {topicCount} topic{topicCount > 1 ? 's' : ''}
                  </button>{' '}
                  in {resourceLink(activity)} {timeAgo(activity.updatedAt)}
                </>
              )}
              {actionType === 'answered' && (
                <>
                  {username} answered {topicCount} question
                  {topicCount > 1 ? 's' : ''} in {resourceLink(activity)}{' '}
                  {timeAgo(activity.updatedAt)}
                </>
              )}
            </li>
          );
        }

        const uniqueResourcesCount = new Set(
          activities.map((activity) => activity.resourceId),
        ).size;

        return (
          <li key={user._id}>
            <p>
              {username} has {activities.length} activities in{' '}
              {uniqueResourcesCount} resources
            </p>
            <ul className="mt-2 flex flex-col gap-2 pl-5">
              {activities.map((activity) => {
                const { actionType, topicIds } = activity;
                const topicCount = topicIds?.length || 0;

                return (
                  <li key={activity._id} className="text-sm text-gray-600">
                    {actionType === 'in_progress' && (
                      <>
                        Started{' '}
                        <button className="font-medium underline underline-offset-2 hover:text-black">
                          {topicCount} topic{topicCount > 1 ? 's' : ''}
                        </button>{' '}
                        in {resourceLink(activity)}{' '}
                        {timeAgo(activity.updatedAt)}
                      </>
                    )}
                    {actionType === 'done' && (
                      <>
                        Completed{' '}
                        <button className="font-medium underline underline-offset-2 hover:text-black">
                          {topicCount} topic{topicCount > 1 ? 's' : ''}
                        </button>{' '}
                        in {resourceLink(activity)}{' '}
                        {timeAgo(activity.updatedAt)}
                      </>
                    )}
                    {actionType === 'answered' && (
                      <>
                        Answered {topicCount} question
                        {topicCount > 1 ? 's' : ''} in {resourceLink(activity)}{' '}
                        {timeAgo(activity.updatedAt)}
                      </>
                    )}
                  </li>
                );
              })}
            </ul>
          </li>
        );
      })}
    </ul>
  );
}
