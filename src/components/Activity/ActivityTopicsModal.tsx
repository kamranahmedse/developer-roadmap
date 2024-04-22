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
  topicIds: string[];
  topicCount: number;
  actionType: AllowedActivityActionType;
  onClose: () => void;
};

export function ActivityTopicsModal(props: ActivityTopicDetailsProps) {
  const {
    resourceId,
    resourceType,
    isCustomResource,
    topicIds = [],
    topicCount,
    actionType,
    onClose,
  } = props;

  const [isLoading, setIsLoading] = useState(true);
  const [topicTitles, setTopicTitles] = useState<Record<string, string>>({});
  const [error, setError] = useState<string | null>(null);

  const loadTopicTitles = async () => {
    setIsLoading(true);
    setError(null);

    const { response, error } = await httpPost(
      `${import.meta.env.PUBLIC_API_URL}/v1-get-topic-titles`,
      {
        resourceId,
        resourceType,
        isCustomResource,
        topicIds,
      },
    );

    if (error || !response) {
      setError(error?.message || 'Failed to load topic titles');
      setIsLoading(false);
      return;
    }

    setTopicTitles(response);
    setIsLoading(false);
  };

  useEffect(() => {
    loadTopicTitles().finally(() => {
      setIsLoading(false);
    });
  }, []);

  if (isLoading || error) {
    return (
      <ModalLoader
        error={error!}
        text={'Loading topics..'}
        isLoading={isLoading}
      />
    );
  }

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
        setError(null);
        setIsLoading(false);
      }}
    >
      <div className={`popup-body relative rounded-lg bg-white p-4 shadow`}>
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
        <ul className="flex flex-col gap-1">
          {topicIds.map((topicId) => {
            const topicTitle = topicTitles[topicId] || 'Unknown Topic';

            const ActivityIcon =
              actionType === 'done'
                ? Check
                : actionType === 'in_progress'
                  ? BookOpen
                  : Check;

            return (
              <li key={topicId} className="flex items-start gap-2">
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
