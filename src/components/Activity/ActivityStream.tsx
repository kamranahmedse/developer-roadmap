import { useState } from 'react';
import { getRelativeTimeString } from '../../lib/date';
import type { ResourceType } from '../../lib/resource-progress';
import { EmptyStream } from './EmptyStream';

export const allowedActivityActionType = [
  'in_progress',
  'done',
  'answered',
] as const;
export type AllowedActivityActionType =
  (typeof allowedActivityActionType)[number];

export type UserStreamActivity = {
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

type ActivityStreamProps = {
  activities: UserStreamActivity[];
};

export function ActivityStream(props: ActivityStreamProps) {
  const { activities } = props;

  const [showAll, setShowAll] = useState(false);
  const sortedActivities = activities
    .filter((activity) => activity?.topicIds && activity.topicIds.length > 0)
    .sort((a, b) => {
      return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
    })
    .slice(0, showAll ? activities.length : 5);

  return (
    <div className="mx-0 px-0 py-5 md:-mx-10 md:px-8 md:py-8">
      <h2 className="mb-3 text-xs uppercase text-gray-400">Activities</h2>

      {activities.length > 0 ? (
        <ul className="space-y-1.5">
          {sortedActivities.map((activity) => {
            const {
              _id,
              resourceType,
              resourceId,
              resourceTitle,
              actionType,
              updatedAt,
              topicIds,
              isCustomResource,
            } = activity;

            const resourceUrl =
              resourceType === 'question'
                ? `/questions/${resourceId}`
                : resourceType === 'best-practice'
                  ? `/best-practices/${resourceId}`
                  : isCustomResource && resourceType === 'roadmap'
                    ? `/r?id=${resourceId}`
                    : `/${resourceId}`;

            const resourceLinkComponent = (
              <a
                className="font-medium text-black underline hover:cursor-pointer hover:no-underline"
                target="_blank"
                href={resourceUrl}
              >
                {resourceTitle}
              </a>
            );

            const topicCount = topicIds?.length || 0;
            const itemCount = (
              <span className="font-medium text-black">
                {topicCount}&nbsp;
                {actionType === 'answered'
                  ? topicCount > 1
                    ? 'questions'
                    : 'question'
                  : topicCount > 1
                    ? 'items'
                    : 'item'}
              </span>
            );

            const timeAgo = (
              <span className="text-gray-400">
                ({getRelativeTimeString(new Date(updatedAt).toISOString())})
              </span>
            );

            return (
              <li
                key={_id}
                className="rounded-md border p-2 text-sm text-gray-600"
              >
                {actionType === 'in_progress' && (
                  <>
                    Marked {itemCount} in progress in {resourceLinkComponent}{' '}
                    {timeAgo}
                  </>
                )}
                {actionType === 'done' && (
                  <>
                    Completed {itemCount} in {resourceLinkComponent} {timeAgo}
                  </>
                )}
                {actionType === 'answered' && (
                  <>
                    Answered {itemCount} for {resourceLinkComponent} {timeAgo}
                  </>
                )}
              </li>
            );
          })}
        </ul>
      ) : (
        <EmptyStream />
      )}

      {activities.length > 5 && (
        <div className="mt-2 text-center">
          <button
            className="text-sm text-gray-400 hover:text-gray-600"
            onClick={() => setShowAll(!showAll)}
          >
            {showAll ? '- Show less' : '+ Show all'}
          </button>
        </div>
      )}
    </div>
  );
}
