import { useQuery } from '@tanstack/react-query';
import { Modal } from '../Modal';
import { roadmapTreeMappingOptions } from '../../queries/roadmap-tree';
import { queryClient } from '../../stores/query-client';
import { roadmapContentOptions } from '../../queries/roadmap';
import { ModalLoader } from '../UserProgress/ModalLoader';
import { TopicDetailLink } from '../TopicDetail/TopicDetailLink';
import { Spinner } from '../ReactIcons/Spinner';
import { ErrorIcon } from '../ReactIcons/ErrorIcon';
import { markdownToHtml } from '../../lib/markdown';

type TopicResourcesModalProps = {
  roadmapId: string;
  topicId: string;
  onClose: () => void;
};

export function TopicResourcesModal(props: TopicResourcesModalProps) {
  const { roadmapId, topicId, onClose } = props;

  const {
    data: roadmapContentData,
    isLoading: isLoadingRoadmapContent,
    error,
  } = useQuery(roadmapContentOptions(roadmapId), queryClient);

  const topicContent = roadmapContentData?.[topicId];
  const links = topicContent?.links || [];

  return (
    <Modal onClose={onClose} wrapperClassName="max-w-lg">
      {!isLoadingRoadmapContent && !error && topicContent && (
        <div className="p-4">
          <h2 className="text-xl font-bold">{topicContent?.title}</h2>

          <div
            className="course-content course-ai-content prose prose-sm mt-1 max-w-full overflow-hidden text-sm"
            dangerouslySetInnerHTML={{
              __html: markdownToHtml(topicContent.description, true),
            }}
          />

          {links.length > 0 && (
            <ul className="mt-4 space-y-1">
              {links.map((link, index) => {
                return (
                  <li key={`${link.url}-${index}`}>
                    <TopicDetailLink
                      url={link.url}
                      type={link.type}
                      title={link.title}
                    />
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      )}

      {(isLoadingRoadmapContent || error || !topicContent) && (
        <div className="rounded-lg bg-white p-5">
          <div className="flex items-center">
            {isLoadingRoadmapContent && (
              <>
                <Spinner className="h-6 w-6" isDualRing={false} />
                <span className="ml-3 text-lg font-semibold">
                  Loading Topic Resources...
                </span>
              </>
            )}

            {(error || !topicContent) && !isLoadingRoadmapContent && (
              <>
                <ErrorIcon additionalClasses="h-6 w-6 text-red-500" />
                <span className="ml-3 text-lg font-semibold">
                  {!topicContent
                    ? 'No resources found'
                    : (error?.message ?? 'Something went wrong')}
                </span>
              </>
            )}
          </div>
        </div>
      )}
    </Modal>
  );
}
