import { useEffect, useState, useMemo } from 'react';
import { useToast } from '../../hooks/use-toast';
import { getUrlParams } from '../../lib/browser';
import { httpGet } from '../../lib/http';
import type { ResourceType } from '../../lib/resource-progress';
import type { AllowedActivityActionType } from '../Activity/ActivityStream';
import { pageProgressMessage } from '../../stores/page';
import { getRelativeTimeString } from '../../lib/date';
import { TeamActivityItem } from './TeamActivityItem';
import { TeamActivityTopicsModal } from './TeamActivityTopicsModal';

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
  const [selectedActivity, setSelectedActivity] =
    useState<TeamStreamActivity | null>(null);
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

  if (!teamId) {
    window.location.href = '/';
    return;
  }

  if (isLoading) {
    return null;
  }

  return (
    <>
      {selectedActivity && (
        <TeamActivityTopicsModal
          activity={selectedActivity}
          onClose={() => setSelectedActivity(null)}
        />
      )}

      <h3 className="flex w-full items-center justify-between text-xs uppercase text-gray-400">
        Activities
      </h3>

      <ul className="mt-2 flex flex-col gap-3">
        {usersWithActivities.map((user) => {
          return (
            <TeamActivityItem
              key={user._id}
              user={user}
              onTopicClick={setSelectedActivity}
            />
          );
        })}
      </ul>
    </>
  );
}
