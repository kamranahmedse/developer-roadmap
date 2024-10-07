import { useState } from 'react';
import { getRelativeTimeString } from '../../lib/date';
import type { TeamStreamActivity } from './TeamActivityPage';
import { ChevronsDown, ChevronsUp } from 'lucide-react';
import { ActivityTopicTitles } from '../Activity/ActivityTopicTitles';
import { cn } from '../../lib/classname';
import { useStore } from '@nanostores/react';
import { $currentTeam } from '../../stores/team';

type TeamActivityItemProps = {
  onTopicClick?: (activity: TeamStreamActivity) => void;
  teamId: string;
  user: {
    activities: TeamStreamActivity[];
    _id: string;
    name: string;
    avatar?: string | undefined;
    username?: string | undefined;
    memberId?: string;
  };
};

export function TeamActivityItem(props: TeamActivityItemProps) {
  const { user, onTopicClick, teamId } = props;
  const { activities } = user;

  const currentTeam = useStore($currentTeam);
  const [showAll, setShowAll] = useState(false);

  const resourceLink = (activity: TeamStreamActivity) => {
    const {
      resourceId,
      resourceTitle,
      resourceType,
      isCustomResource,
      resourceSlug,
    } = activity;

    const resourceUrl =
      resourceType === 'question'
        ? `/questions/${resourceId}`
        : resourceType === 'best-practice'
          ? `/best-practices/${resourceId}`
          : isCustomResource && resourceType === 'roadmap'
            ? `/r/${resourceSlug}`
            : `/${resourceId}`;

    return (
      <a
        className="font-medium underline transition-colors hover:cursor-pointer hover:text-black"
        target="_blank"
        href={`${resourceUrl}?t=${teamId}`}
      >
        {resourceTitle}
      </a>
    );
  };

  const timeAgo = (date: string | Date) => (
    <span className="ml-1 text-xs text-gray-400">
      {getRelativeTimeString(new Date(date).toISOString(), true)}
    </span>
  );
  const userAvatar = user.avatar
    ? `${import.meta.env.PUBLIC_AVATAR_BASE_URL}/${user.avatar}`
    : '/images/default-avatar.png';

  const isPersonalProgressOnly =
    currentTeam?.personalProgressOnly &&
    currentTeam.role === 'member' &&
    user.memberId !== currentTeam.memberId;
  const username = (
    <a
      href={`/team/member?t=${teamId}&m=${user?.memberId}`}
      className={cn(
        'inline-flex items-center gap-1.5 underline underline-offset-2 hover:underline',
        isPersonalProgressOnly
          ? 'pointer-events-none cursor-default no-underline'
          : '',
      )}
      onClick={(e) => {
        if (isPersonalProgressOnly) {
          e.preventDefault();
        }
      }}
      aria-disabled={isPersonalProgressOnly}
    >
      <img
        className="inline-block h-5 w-5 rounded-full"
        src={userAvatar}
        alt={user.name}
      />
      <span className="font-medium">{user?.name || 'Unknown'}</span>
    </a>
  );

  if (activities.length === 1) {
    const activity = activities[0];
    const { actionType, topicTitles } = activity;
    const topicCount = topicTitles?.length || 0;

    return (
      <li
        key={user._id}
        className="flex flex-wrap items-center gap-1 rounded-md border px-2 py-2.5 text-sm bg-white"
      >
        {actionType === 'in_progress' && (
          <>
            <p className="mb-1 flex w-full flex-wrap items-center">
              {username}&nbsp;started&nbsp;
              {topicCount}&nbsp;topic{topicCount > 1 ? 's' : ''}&nbsp;in&nbsp;
              {resourceLink(activity)}&nbsp;
              {timeAgo(activity.updatedAt)}
            </p>
            <ActivityTopicTitles
              className="pl-5"
              topicTitles={topicTitles || []}
            />
          </>
        )}
        {actionType === 'done' && (
          <>
            <p className="mb-1 flex w-full flex-wrap items-center">
              {username}&nbsp;completed&nbsp;
              {topicCount}&nbsp;topic{topicCount > 1 ? 's' : ''}&nbsp;in&nbsp;
              {resourceLink(activity)}&nbsp;
              {timeAgo(activity.updatedAt)}
            </p>
            <ActivityTopicTitles
              className="pl-5"
              topicTitles={topicTitles || []}
            />
          </>
        )}
        {actionType === 'answered' && (
          <>
            <p className="mb-1 flex w-full flex-wrap items-center">
              {username}&nbsp;answered&nbsp;
              {topicCount}&nbsp;question{topicCount > 1 ? 's' : ''}
              &nbsp;in&nbsp;
              {resourceLink(activity)}&nbsp;
              {timeAgo(activity.updatedAt)}
            </p>
            <ActivityTopicTitles
              className="pl-5"
              topicTitles={topicTitles || []}
            />
          </>
        )}
      </li>
    );
  }

  const uniqueResourcesCount = new Set(
    activities.map((activity) => activity.resourceId),
  ).size;

  const activityLimit = showAll ? activities.length : 5;

  return (
    <li key={user._id} className="overflow-hidden rounded-md border">
      <h3 className="flex flex-wrap items-center gap-1 bg-gray-100 px-2 py-2.5 text-sm">
        {username} has {activities.length} updates in {uniqueResourcesCount}
        &nbsp;resource(s)
      </h3>
      <div className="py-3">
        <ul className="ml-2 flex flex-col divide-y pr-2 sm:ml-[36px]">
          {activities.slice(0, activityLimit).map((activity, counter) => {
            const { actionType, topicTitles } = activity;
            const topicCount = topicTitles?.length || 0;

            return (
              <li
                key={activity._id}
                className={cn(
                  'text-sm text-gray-600',
                  counter === 0 ? 'pb-2.5' : 'py-2.5',
                  counter === activities.length - 1 ? 'pb-0' : '',
                )}
              >
                {actionType === 'in_progress' && (
                  <>
                    <p className="mb-1">
                      Started&nbsp;{topicCount}&nbsp;topic
                      {topicCount > 1 ? 's' : ''}&nbsp;in&nbsp;
                      {resourceLink(activity)}&nbsp;
                      {timeAgo(activity.updatedAt)}
                    </p>
                    <ActivityTopicTitles topicTitles={topicTitles || []} />
                  </>
                )}
                {actionType === 'done' && (
                  <>
                    <p className="mb-1">
                      Completed&nbsp;{topicCount}&nbsp;topic
                      {topicCount > 1 ? 's' : ''}&nbsp;in&nbsp;
                      {resourceLink(activity)}&nbsp;
                      {timeAgo(activity.updatedAt)}
                    </p>
                    <ActivityTopicTitles topicTitles={topicTitles || []} />
                  </>
                )}
                {actionType === 'answered' && (
                  <>
                    <p className="mb-1">
                      Answered&nbsp;{topicCount}&nbsp;question
                      {topicCount > 1 ? 's' : ''}&nbsp;in&nbsp;
                      {resourceLink(activity)}&nbsp;
                      {timeAgo(activity.updatedAt)}
                    </p>
                    <ActivityTopicTitles topicTitles={topicTitles || []} />
                  </>
                )}
              </li>
            );
          })}
        </ul>

        {activities.length > 5 && (
          <button
            className="ml-2 mt-3 flex items-center gap-2 rounded-md border border-gray-300 p-1 text-xs uppercase tracking-wide text-gray-600 transition-colors hover:border-black hover:bg-black hover:text-white sm:ml-[36px]"
            onClick={() => setShowAll(!showAll)}
          >
            {showAll ? (
              <>
                <ChevronsUp size={14} />
                Show less
              </>
            ) : (
              <>
                <ChevronsDown size={14} />
                Show more
              </>
            )}
          </button>
        )}
      </div>
    </li>
  );
}
