import { useState } from 'react';
import { getRelativeTimeString } from '../../lib/date';
import type { TeamStreamActivity } from './TeamActivityPage';
import { ChevronsDown, ChevronsUp } from 'lucide-react';
import { ActivityTopicTitles } from '../Activity/ActivityTopicTitles';

type TeamActivityItemProps = {
  onTopicClick?: (activity: TeamStreamActivity) => void;
  teamId: string;
  user: {
    activities: TeamStreamActivity[];
    _id: string;
    name: string;
    avatar?: string | undefined;
    username?: string | undefined;
  };
};

export function TeamActivityItem(props: TeamActivityItemProps) {
  const { user, onTopicClick, teamId } = props;
  const { activities } = user;

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

  const username = (
    <>
      <img
        className="mr-1 inline-block h-5 w-5 rounded-full"
        src={userAvatar}
        alt={user.name}
      />
      <span className="font-medium">{user?.name || 'Unknown'}</span>{' '}
    </>
  );

  if (activities.length === 1) {
    const activity = activities[0];
    const { actionType, topicTitles } = activity;
    const topicCount = topicTitles?.length || 0;

    return (
      <li
        key={user._id}
        className="flex flex-wrap items-center gap-1 rounded-md border px-2 py-2.5 text-sm"
      >
        {actionType === 'in_progress' && (
          <>
            {username} started{' '}
            <ActivityTopicTitles
              topicTitles={topicTitles || []}
              onSelectActivity={() => onTopicClick?.(activity)}
            />{' '}
            in {resourceLink(activity)} {timeAgo(activity.updatedAt)}
          </>
        )}

        {actionType === 'done' && (
          <>
            {username} completed{' '}
            <ActivityTopicTitles
              topicTitles={topicTitles || []}
              onSelectActivity={() => onTopicClick?.(activity)}
            />{' '}
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

  const activityLimit = showAll ? activities.length : 5;

  return (
    <li key={user._id} className="overflow-hidden rounded-md border">
      <h3 className="flex flex-wrap items-center gap-1 bg-gray-100 px-2 py-2.5 text-sm">
        {username} has {activities.length} updates in {uniqueResourcesCount}{' '}
        resource(s)
      </h3>
      <div className="py-3">
        <ul className="ml-2 flex flex-col gap-2 sm:ml-[36px]">
          {activities.slice(0, activityLimit).map((activity) => {
            const { actionType, topicTitles } = activity;
            const topicCount = topicTitles?.length || 0;

            return (
              <li key={activity._id} className="text-sm text-gray-600">
                {actionType === 'in_progress' && (
                  <>
                    Started{' '}
                    <ActivityTopicTitles
                      topicTitles={topicTitles || []}
                      onSelectActivity={() => onTopicClick?.(activity)}
                    />{' '}
                    in {resourceLink(activity)} {timeAgo(activity.updatedAt)}
                  </>
                )}
                {actionType === 'done' && (
                  <>
                    Completed{' '}
                    <ActivityTopicTitles
                      topicTitles={topicTitles || []}
                      onSelectActivity={() => onTopicClick?.(activity)}
                    />{' '}
                    in {resourceLink(activity)} {timeAgo(activity.updatedAt)}
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
