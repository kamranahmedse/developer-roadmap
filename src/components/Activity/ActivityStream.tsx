import { useMemo, useState } from 'react';
import { getRelativeTimeString } from '../../lib/date';
import type { ResourceType } from '../../lib/resource-progress';
import { EmptyStream } from './EmptyStream';
import { ActivityTopicsModal } from './ActivityTopicsModal.tsx';

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
  const [selectedActivity, setSelectedActivity] =
    useState<UserStreamActivity | null>(null);

  const sortedActivities = activities
    .filter((activity) => activity?.topicIds && activity.topicIds.length > 0)
    .sort((a, b) => {
      return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
    })
    .slice(0, showAll ? activities.length : 10);

  return (
    <div className="mx-0 px-0 py-5 md:-mx-10 md:px-8 md:py-8">
      <h2 className="mb-3 text-xs uppercase text-gray-400">Learning Activity</h2>

      {selectedActivity && (
        <ActivityTopicsModal
          onClose={() => setSelectedActivity(null)}
          activityId={selectedActivity._id!}
          resourceId={selectedActivity.resourceId}
          resourceType={selectedActivity.resourceType}
          isCustomResource={selectedActivity.isCustomResource}
          topicIds={selectedActivity.topicIds || []}
          topicCount={selectedActivity.topicIds?.length || 0}
          actionType={selectedActivity.actionType}
        />
      )}

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

            const timeAgo = (
              <span className="ml-1 text-xs text-gray-400">
                {getRelativeTimeString(new Date(updatedAt).toISOString())}
              </span>
            );

            return (
              <li
                key={_id}
                className="rounded-md border p-2 text-sm text-gray-600"
              >
                {actionType === 'in_progress' && (
                  <>
                    Marked{' '}
                    <button
                      className="font-medium underline underline-offset-2"
                      onClick={() => setSelectedActivity(activity)}
                    >
                      {topicCount} topic(s)
                    </button>{' '}
                    in progress in {resourceLinkComponent} {timeAgo}
                  </>
                )}
                {actionType === 'done' && (
                  <>
                    Completed{' '}
                    <button
                      className="font-medium underline underline-offset-2"
                      onClick={() => setSelectedActivity(activity)}
                    >
                      {topicCount} topic(s)
                    </button>{' '}
                    in {resourceLinkComponent} {timeAgo}
                  </>
                )}
                {actionType === 'answered' && (
                  <>
                    Answered {topicCount} question(s) in {resourceLinkComponent}{' '}
                    {timeAgo}
                  </>
                )}
              </li>
            );
          })}
        </ul>
      ) : (
        <EmptyStream />
      )}

      {activities.length > 10 && (
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
