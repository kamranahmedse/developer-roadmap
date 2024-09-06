import { useEffect, useState, useMemo } from 'react';
import { useToast } from '../../hooks/use-toast';
import { getUrlParams } from '../../lib/browser';
import { httpGet } from '../../lib/http';
import type { ResourceType } from '../../lib/resource-progress';
import type { AllowedActivityActionType } from '../Activity/ActivityStream';
import { pageProgressMessage } from '../../stores/page';
import { TeamActivityItem } from './TeamActivityItem';
import { TeamActivityTopicsModal } from './TeamActivityTopicsModal';
import { TeamEmptyStream } from './TeamEmptyStream';
import { Pagination } from '../Pagination/Pagination';

export type TeamStreamActivity = {
  _id?: string;
  resourceType: ResourceType | 'question';
  resourceId: string;
  resourceTitle: string;
  resourceSlug?: string;
  isCustomResource?: boolean;
  actionType: AllowedActivityActionType;
  topicTitles?: string[];
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
  data: {
    users: {
      _id: string;
      name: string;
      avatar?: string;
      username?: string;
      memberId?: string;
    }[];
    activities: TeamActivityStreamDocument[];
  };
  totalCount: number;
  totalPages: number;
  currPage: number;
  perPage: number;
};

type TeamActivityPageProps = {
  teamId?: string;
};

export function TeamActivityPage(props: TeamActivityPageProps) {
  const { teamId: defaultTeamId } = props;
  const { t: teamId = defaultTeamId } = getUrlParams();

  const toast = useToast();

  const [isLoading, setIsLoading] = useState(true);
  const [selectedActivity, setSelectedActivity] =
    useState<TeamStreamActivity | null>(null);
  const [teamActivities, setTeamActivities] = useState<GetTeamActivityResponse>(
    {
      data: {
        users: [],
        activities: [],
      },
      totalCount: 0,
      totalPages: 0,
      currPage: 1,
      perPage: 21,
    },
  );
  const [currPage, setCurrPage] = useState(1);

  const getTeamProgress = async (currPage: number = 1) => {
    const { response, error } = await httpGet<GetTeamActivityResponse>(
      `${import.meta.env.PUBLIC_API_URL}/v1-get-team-activity/${teamId}`,
      {
        currPage,
      },
    );
    if (error || !response) {
      toast.error(error?.message || 'Failed to get team activity');
      return;
    }

    setTeamActivities(response);
    setCurrPage(response.currPage);
  };

  useEffect(() => {
    if (!teamId) {
      return;
    }

    setIsLoading(true);
    setTeamActivities({
      data: {
        users: [],
        activities: [],
      },
      totalCount: 0,
      totalPages: 0,
      currPage: 1,
      perPage: 21,
    });
    setCurrPage(1);
    getTeamProgress().then(() => {
      pageProgressMessage.set('');
      setIsLoading(false);
    });
  }, [teamId]);

  const { users, activities } = teamActivities?.data;
  const validActivities = useMemo(() => {
    return activities?.filter((activity) => {
      return (
        activity.activity.length > 0 &&
        activity.activity.some((t) => (t?.topicTitles?.length || 0) > 0)
      );
    });
  }, [activities]);

  const sortedUniqueCreatedAt = useMemo(() => {
    return new Set(
      validActivities
        ?.map((activity) => new Date(activity.createdAt).setHours(0, 0, 0, 0))
        .sort((a, b) => {
          return new Date(b).getTime() - new Date(a).getTime();
        }),
    );
  }, [validActivities]);

  const usersWithActivities = useMemo(() => {
    const enrichedUsers: {
      _id: string;
      name: string;
      avatar?: string;
      username?: string;
      activities: TeamStreamActivity[];
    }[] = [];

    for (const uniqueCreatedAt of sortedUniqueCreatedAt) {
      const uniqueActivities = validActivities.filter(
        (activity) =>
          new Date(activity.createdAt).setHours(0, 0, 0, 0) === uniqueCreatedAt,
      );

      const usersWithUniqueActivities = users
        .map((user) => {
          const userActivities = uniqueActivities
            .filter((activity) => activity.userId === user._id)
            .flatMap((activity) => activity.activity)
            .filter((activity) => (activity?.topicTitles?.length || 0) > 0)
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
        });

      enrichedUsers.push(...usersWithUniqueActivities);
    }

    return enrichedUsers;
  }, [users, activities]);

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

      {usersWithActivities.length > 0 ? (
        <>
          <h3 className="mb-4 flex w-full items-center justify-between text-xs uppercase text-gray-400">
            Team Activity
          </h3>
          <ul className="mb-4 mt-2 flex flex-col gap-3">
            {usersWithActivities.map((user, index) => {
              return (
                <TeamActivityItem
                  key={`${user._id}-${index}`}
                  user={user}
                  teamId={teamId}
                  onTopicClick={setSelectedActivity}
                />
              );
            })}
          </ul>

          <Pagination
            currPage={currPage}
            totalPages={teamActivities.totalPages}
            totalCount={teamActivities.totalCount}
            perPage={teamActivities.perPage}
            onPageChange={(page) => {
              setCurrPage(page);
              pageProgressMessage.set('Loading...');
              getTeamProgress(page).finally(() => {
                pageProgressMessage.set('');
              });
            }}
          />
        </>
      ) : (
        <TeamEmptyStream teamId={teamId} />
      )}
    </>
  );
}
