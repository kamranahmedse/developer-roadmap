import { PersonStandingIcon } from 'lucide-react';
import { useState } from 'react';
import { usePersonalizedRoadmap } from '../../hooks/use-personalized-roadmap';
import { renderTopicProgress } from '../../lib/resource-progress';
import { PersonalizedRoadmapModal } from './PersonalizedRoadmapModal';
import { useMutation } from '@tanstack/react-query';
import { httpPost } from '../../lib/query-http';
import { useToast } from '../../hooks/use-toast';
import { queryClient } from '../../stores/query-client';

type BulkUpdateResourceProgressBody = {
  done: string[];
  learning: string[];
  skipped: string[];
  pending: string[];
};

type PersonalizedRoadmapProps = {
  roadmapId: string;
};

export function PersonalizedRoadmap(props: PersonalizedRoadmapProps) {
  const { roadmapId } = props;

  const toast = useToast();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    mutate: bulkUpdateResourceProgress,
    isPending: isBulkUpdating,
    isSuccess: isBulkUpdateSuccess,
  } = useMutation(
    {
      mutationFn: (body: BulkUpdateResourceProgressBody) => {
        return httpPost(`/v1-bulk-update-resource-progress/${roadmapId}`, body);
      },
      onError: (error) => {
        toast.error(
          error?.message ?? 'Something went wrong, please try again.',
        );
      },
    },
    queryClient,
  );

  const { generatePersonalizedRoadmap } = usePersonalizedRoadmap({
    roadmapId,
    onStart: () => {
      setIsModalOpen(false);
    },
    onData: (data) => {
      const { topicIds } = data;
      topicIds.forEach((topicId) => {
        renderTopicProgress(topicId, 'skipped');
      });
    },
    onFinish: (data) => {
      bulkUpdateResourceProgress({
        skipped: data.topicIds,
        learning: [],
        done: [],
        pending: [],
      });
    },
  });

  return (
    <>
      {isModalOpen && (
        <PersonalizedRoadmapModal
          roadmapId={roadmapId}
          onClose={() => setIsModalOpen(false)}
          onSubmit={generatePersonalizedRoadmap}
        />
      )}

      <button
        className="group inline-flex items-center gap-1.5 border-b-2 border-b-transparent px-2 pb-2.5 text-sm font-normal text-gray-400 transition-colors hover:text-gray-700"
        onClick={() => setIsModalOpen(true)}
      >
        <PersonStandingIcon className="h-4 w-4 shrink-0" />
        <span>Personalized</span>
      </button>
    </>
  );
}
