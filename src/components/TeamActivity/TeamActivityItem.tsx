import { useState } from 'react';
import { getRelativeTimeString } from '../../lib/date';
import type { TeamStreamActivity } from './TeamActivityPage';
import { ChevronsDown, ChevronsUp } from 'lucide-react';

type TeamActivityItemProps = {
  onTopicClick?: (activity: TeamStreamActivity) => void;
  user: {
    activities: TeamStreamActivity[];
    _id: string;
    name: string;
    avatar?: string | undefined;
    username?: string | undefined;
  };
};

export function TeamActivityItem(props: TeamActivityItemProps) {
  const { user, onTopicClick } = props;
  const { activities } = user;

  const [showAll, setShowAll] = useState(false);

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

  const username = (
    <span className="font-medium">{user?.name || 'Unknown'}</span>
  );

  if (activities.length === 1) {
    const activity = activities[0];
    const { actionType, topicIds } = activity;
    const topicCount = topicIds?.length || 0;

    return (
      <li key={user._id} className="rounded-md border p-2">
        {actionType === 'in_progress' && (
          <>
            {username} started{' '}
            <button
              className="font-medium underline underline-offset-2 hover:text-black"
              onClick={() => onTopicClick?.(activity)}
            >
              {topicCount} topic{topicCount > 1 ? 's' : ''}
            </button>{' '}
            in {resourceLink(activity)} {timeAgo(activity.updatedAt)}
          </>
        )}
        {actionType === 'done' && (
          <>
            {username} completed{' '}
            <button
              className="font-medium underline underline-offset-2 hover:text-black"
              onClick={() => onTopicClick?.(activity)}
            >
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

  const activityLimit = showAll ? activities.length : 5;

  return (
    <li key={user._id} className="rounded-md border">
      <h3 className="border-b p-2">
        {username} has {activities.length} activities in {uniqueResourcesCount}{' '}
        resources
      </h3>
      <div className="p-2">
        <ul className="flex flex-col gap-2">
          {activities.slice(0, activityLimit).map((activity) => {
            const { actionType, topicIds } = activity;
            const topicCount = topicIds?.length || 0;

            return (
              <li key={activity._id} className="text-sm text-gray-600">
                {actionType === 'in_progress' && (
                  <>
                    Started{' '}
                    <button
                      className="font-medium underline underline-offset-2 hover:text-black"
                      onClick={() => onTopicClick?.(activity)}
                    >
                      {topicCount} topic{topicCount > 1 ? 's' : ''}
                    </button>{' '}
                    in {resourceLink(activity)} {timeAgo(activity.updatedAt)}
                  </>
                )}
                {actionType === 'done' && (
                  <>
                    Completed{' '}
                    <button
                      className="font-medium underline underline-offset-2 hover:text-black"
                      onClick={() => onTopicClick?.(activity)}
                    >
                      {topicCount} topic{topicCount > 1 ? 's' : ''}
                    </button>{' '}
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
            className="mt-3 flex items-center gap-2 rounded-md border border-gray-300 p-1 text-xs uppercase tracking-wide text-gray-600 transition-colors hover:border-black hover:bg-black hover:text-white"
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
