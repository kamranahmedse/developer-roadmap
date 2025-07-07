import { Loader2Icon, PersonStandingIcon } from 'lucide-react';
import { useMemo, useState } from 'react';
import { usePersonalizedRoadmap } from '../../hooks/use-personalized-roadmap';
import { renderTopicProgress } from '../../lib/resource-progress';
import { PersonalizedRoadmapModal } from './PersonalizedRoadmapModal';
import { useMutation, useQuery } from '@tanstack/react-query';
import { httpPost } from '../../lib/query-http';
import { useToast } from '../../hooks/use-toast';
import { queryClient } from '../../stores/query-client';
import { userResourceProgressOptions } from '../../queries/resource-progress';
import { useAuth } from '../../hooks/use-auth';
import { roadmapJSONOptions } from '../../queries/roadmap';

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
  const currentUser = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data: roadmap } = useQuery(
    roadmapJSONOptions(roadmapId),
    queryClient,
  );

  const allClickableNodes = useMemo(() => {
    return (
      roadmap?.json?.nodes?.filter((node) =>
        ['topic', 'subtopic'].includes(node?.type ?? ''),
      ) ?? []
    );
  }, [roadmap]);

  const { mutate: bulkUpdateResourceProgress, isPending: isBulkUpdating } =
    useMutation(
      {
        mutationFn: (body: BulkUpdateResourceProgressBody) => {
          return httpPost(
            `/v1-bulk-update-resource-progress/${roadmapId}`,
            body,
          );
        },
        onError: (error) => {
          toast.error(
            error?.message ?? 'Something went wrong, please try again.',
          );
        },
        onSuccess: () => {
          queryClient.invalidateQueries(
            userResourceProgressOptions('roadmap', roadmapId),
          );
        },
      },
      queryClient,
    );

  const { generatePersonalizedRoadmap, status } = usePersonalizedRoadmap({
    roadmapId,
    onStart: () => {
      setIsModalOpen(false);
    },
    onData: (data) => {
      const { topicIds } = data;
      topicIds.forEach((topicId) => {
        renderTopicProgress(topicId, 'pending');
      });
    },
    onFinish: (data) => {
      const { topicIds } = data;
      const remainingTopicIds = allClickableNodes
        .filter((node) => !topicIds.includes(node?.id ?? ''))
        .map((node) => node?.id ?? '');

      bulkUpdateResourceProgress({
        skipped: remainingTopicIds,
        learning: [],
        done: [],
        pending: [],
      });
    },
  });

  const { mutate: clearResourceProgress, isPending: isClearing } = useMutation(
    {
      mutationFn: () => {
        return httpPost(`/v1-clear-resource-progress`, {
          resourceId: roadmapId,
          resourceType: 'roadmap',
        });
      },
      onError: (error) => {
        toast.error(
          error?.message ?? 'Something went wrong, please try again.',
        );
      },
      onSuccess: () => {
        toast.success('Progress cleared successfully.');
        localStorage.removeItem(
          `roadmap-${roadmapId}-${currentUser?.id}-progress`,
        );
        localStorage.removeItem(
          `roadmap-${roadmapId}-${currentUser?.id}-favorite`,
        );
        window.location.reload();
      },
    },
    queryClient,
  );

  const isGenerating = status !== 'idle' || isBulkUpdating || isClearing;

  return (
    <>
      {isModalOpen && (
        <PersonalizedRoadmapModal
          onClose={() => setIsModalOpen(false)}
          onSubmit={(information) => {
            for (const node of allClickableNodes) {
              renderTopicProgress(node?.id, 'skipped');
            }

            generatePersonalizedRoadmap(information);
          }}
          onClearProgress={() => {
            setIsModalOpen(false);
            clearResourceProgress();
          }}
        />
      )}

      <button
        className="group inline-flex items-center gap-1.5 border-b-2 border-b-transparent px-2 pb-2.5 text-sm font-normal text-gray-400 transition-colors hover:text-gray-700"
        onClick={() => setIsModalOpen(true)}
        disabled={isGenerating}
      >
        {isGenerating ? (
          <Loader2Icon className="h-4 w-4 shrink-0 animate-spin" />
        ) : (
          <PersonStandingIcon className="h-4 w-4 shrink-0" />
        )}
        <span>Personalized</span>
      </button>
    </>
  );
}
