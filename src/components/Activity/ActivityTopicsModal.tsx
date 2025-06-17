import { useEffect, useState } from 'react';
import type { ResourceType } from '../../lib/resource-progress';
import type { AllowedActivityActionType } from './ActivityStream';
import { httpPost } from '../../lib/http';
import { Modal } from '../Modal.tsx';
import { ModalLoader } from '../UserProgress/ModalLoader.tsx';
import { ArrowUpRight, BookOpen, Check } from 'lucide-react';

type ActivityTopicDetailsProps = {
  activityId: string;
  resourceId: string;
  resourceType: ResourceType | 'question';
  isCustomResource?: boolean;
  topicTitles: string[];
  topicCount: number;
  actionType: AllowedActivityActionType;
  onClose: () => void;
};

export function ActivityTopicsModal(props: ActivityTopicDetailsProps) {
  const {
    resourceId,
    resourceType,
    isCustomResource,
    topicTitles = [],
    topicCount,
    actionType,
    onClose,
  } = props;

  let pageUrl = '';
  if (resourceType === 'roadmap') {
    pageUrl = isCustomResource ? `/r/${resourceId}` : `/${resourceId}`;
  } else if (resourceType === 'best-practice') {
    pageUrl = `/best-practices/${resourceId}`;
  } else {
    pageUrl = `/questions/${resourceId}`;
  }

  return (
    <Modal
      onClose={() => {
        onClose();
      }}
    >
      <div className={`popup-body relative rounded-lg bg-white p-4 shadow-sm`}>
        <span className="mb-2 flex items-center justify-between text-lg font-semibold capitalize">
          <span className="flex items-center gap-2">
            {actionType.replace('_', ' ')}
          </span>
          <a
            href={pageUrl}
            target="_blank"
            className="flex items-center gap-1 rounded-md border border-transparent py-0.5 pl-2 pr-1 text-sm font-normal text-gray-400 transition-colors hover:border-black hover:bg-black hover:text-white"
          >
            Visit Page{' '}
            <ArrowUpRight
              size={16}
              strokeWidth={2}
              className="relative top-px"
            />
          </a>
        </span>
        <ul className="flex max-h-[50vh] flex-col gap-1 overflow-y-auto max-md:max-h-full">
          {topicTitles.map((topicTitle) => {
            const ActivityIcon =
              actionType === 'done'
                ? Check
                : actionType === 'in_progress'
                  ? BookOpen
                  : Check;

            return (
              <li key={topicTitle} className="flex items-start gap-2">
                <ActivityIcon
                  strokeWidth={3}
                  className="relative top-[4px] text-green-500"
                  size={16}
                />
                {topicTitle}
              </li>
            );
          })}
        </ul>
      </div>
    </Modal>
  );
}
