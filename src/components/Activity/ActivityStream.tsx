import { useState } from 'react';
import { getRelativeTimeString } from '../../lib/date';
import type { ResourceType } from '../../lib/resource-progress';
import { EmptyStream } from './EmptyStream';
import { ActivityTopicsModal } from './ActivityTopicsModal.tsx';
import { ChevronsDown, ChevronsUp } from 'lucide-react';
import { ActivityTopicTitles } from './ActivityTopicTitles.tsx';
import { cn } from '../../lib/classname.ts';

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
  topicTitles?: string[];
  createdAt: Date;
  updatedAt: Date;
};

type ActivityStreamProps = {
  activities: UserStreamActivity[];
  className?: string;
  onResourceClick?: (
    resourceId: string,
    resourceType: ResourceType,
    isCustomResource: boolean,
  ) => void;
};

export function ActivityStream(props: ActivityStreamProps) {
  const { activities, className, onResourceClick } = props;

  const [showAll, setShowAll] = useState(false);
  const [selectedActivity, setSelectedActivity] =
    useState<UserStreamActivity | null>(null);

  const sortedActivities = activities
    .filter(
      (activity) => activity?.topicTitles && activity.topicTitles.length > 0,
    )
    .sort((a, b) => {
      return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
    })
    .slice(0, showAll ? activities.length : 10);

  return (
    <div className={cn('mx-0 px-0 py-5 md:-mx-10 md:px-8 md:py-8', className)}>
      {activities.length > 0 && (
        <h2 className="mb-3 text-xs uppercase text-gray-400">
          Learning Activity
        </h2>
      )}

      {selectedActivity && (
        <ActivityTopicsModal
          onClose={() => setSelectedActivity(null)}
          activityId={selectedActivity._id!}
          resourceId={selectedActivity.resourceId}
          resourceType={selectedActivity.resourceType}
          isCustomResource={selectedActivity.isCustomResource}
          topicTitles={selectedActivity.topicTitles || []}
          topicCount={selectedActivity.topicTitles?.length || 0}
          actionType={selectedActivity.actionType}
        />
      )}

      {activities.length > 0 ? (
        <ul className="divide-y divide-gray-100">
          {sortedActivities.map((activity) => {
            const {
              _id,
              resourceType,
              resourceId,
              resourceTitle,
              actionType,
              updatedAt,
              topicTitles,
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

            const resourceLinkComponent =
              onResourceClick && resourceType !== 'question' ? (
                <button
                  className="font-medium underline transition-colors hover:cursor-pointer hover:text-black"
                  onClick={() =>
                    onResourceClick(resourceId, resourceType, isCustomResource!)
                  }
                >
                  {resourceTitle}
                </button>
              ) : (
                <a
                  className="font-medium underline transition-colors hover:cursor-pointer hover:text-black"
                  target="_blank"
                  href={resourceUrl}
                >
                  {resourceTitle}
                </a>
              );

            const topicCount = topicTitles?.length || 0;

            const timeAgo = (
              <span className="ml-1 text-xs text-gray-400">
                {getRelativeTimeString(new Date(updatedAt).toISOString())}
              </span>
            );

            return (
              <li key={_id} className="py-2 text-sm text-gray-600">
                {actionType === 'in_progress' && (
                  <>
                    <p className="mb-1">
                      Started&nbsp;{topicCount}&nbsp;topic
                      {topicCount > 1 ? 's' : ''}&nbsp;in&nbsp;
                      {resourceLinkComponent}&nbsp;
                      {timeAgo}
                    </p>
                    <ActivityTopicTitles topicTitles={topicTitles || []} />
                  </>
                )}
                {actionType === 'done' && (
                  <>
                    <p className="mb-1">
                      Completed&nbsp;{topicCount}&nbsp;topic
                      {topicCount > 1 ? 's' : ''}&nbsp;in&nbsp;
                      {resourceLinkComponent}&nbsp;
                      {timeAgo}
                    </p>
                    <ActivityTopicTitles topicTitles={topicTitles || []} />
                  </>
                )}
                {actionType === 'answered' && (
                  <>
                    <p className="mb-1">
                      Answered&nbsp;{topicCount}&nbsp;question
                      {topicCount > 1 ? 's' : ''}&nbsp;in&nbsp;
                      {resourceLinkComponent}&nbsp;
                      {timeAgo}
                    </p>
                    <ActivityTopicTitles topicTitles={topicTitles || []} />
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
        <button
          className="mt-3 flex items-center gap-2 rounded-md border border-black py-1 pl-1.5 pr-2 text-xs uppercase tracking-wide text-black transition-colors hover:border-black hover:bg-black hover:text-white"
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
  );
}
