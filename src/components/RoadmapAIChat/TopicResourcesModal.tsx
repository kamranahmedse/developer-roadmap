import { useQuery } from '@tanstack/react-query';
import { Modal } from '../Modal';
import { roadmapTreeMappingOptions } from '../../queries/roadmap-tree';
import { queryClient } from '../../stores/query-client';
import { roadmapContentOptions } from '../../queries/roadmap';
import { ModalLoader } from '../UserProgress/ModalLoader';
import { TopicDetailLink } from '../TopicDetail/TopicDetailLink';

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

  if (isLoadingRoadmapContent || error) {
    return (
      <ModalLoader
        text="Loading Topic Resources..."
        isLoading={isLoadingRoadmapContent}
        error={error?.message}
      />
    );
  }

  return (
    <Modal onClose={onClose}>
      <div className="p-4">
        <h2 className="text-xl font-bold">{topicContent?.title}</h2>
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
      </div>
    </Modal>
  );
}
