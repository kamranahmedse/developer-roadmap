import { Loader2Icon, PersonStandingIcon } from 'lucide-react';
import { useCallback, useMemo, useState } from 'react';
import { usePersonalizedRoadmap } from '../../hooks/use-personalized-roadmap';
import {
  refreshProgressCounters,
  renderTopicProgress,
} from '../../lib/resource-progress';
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

  const { data: userProgress, refetch: refetchUserProgress } = useQuery(
    userResourceProgressOptions('roadmap', roadmapId),
    queryClient,
  );

  const alreadyInProgressNodeIds = useMemo(() => {
    return new Set([
      ...(userProgress?.learning ?? []),
      ...(userProgress?.done ?? []),
    ]);
  }, [userProgress]);

  const allPendingNodeIds = useMemo(() => {
    const nodes =
      roadmap?.json?.nodes?.filter((node) =>
        ['topic', 'subtopic'].includes(node?.type ?? ''),
      ) ?? [];

    return nodes
      .filter((node) => {
        const topicId = node?.id;
        return !alreadyInProgressNodeIds.has(topicId);
      })
      .map((node) => node?.id);
  }, [roadmap, alreadyInProgressNodeIds]);

  const clearResourceProgressLocalStorage = useCallback(() => {
    localStorage.removeItem(`roadmap-${roadmapId}-${currentUser?.id}-progress`);
    localStorage.removeItem(`roadmap-${roadmapId}-${currentUser?.id}-favorite`);
  }, [roadmapId, currentUser]);

  const {
    mutate: bulkUpdateResourceProgress,
    isPending: isBulkUpdating,
    mutateAsync: bulkUpdateResourceProgressAsync,
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
      onSuccess: () => {
        clearResourceProgressLocalStorage();
        refetchUserProgress();
        refreshProgressCounters();
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
        if (alreadyInProgressNodeIds.has(topicId)) {
          return;
        }

        renderTopicProgress(topicId, 'pending');
      });
    },
    onFinish: (data) => {
      const { topicIds } = data;
      const remainingTopicIds = allPendingNodeIds.filter(
        (nodeId) => !topicIds.includes(nodeId),
      );

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
      mutationFn: (pendingTopicIds: string[]) => {
        return bulkUpdateResourceProgressAsync({
          skipped: [],
          learning: [],
          done: [],
          pending: pendingTopicIds,
        });
      },
      onError: (error) => {
        toast.error(
          error?.message ?? 'Something went wrong, please try again.',
        );
      },
      onSuccess: (_, pendingTopicIds) => {
        for (const topicId of pendingTopicIds) {
          renderTopicProgress(topicId, 'pending');
        }

        toast.success('Progress cleared successfully.');
        clearResourceProgressLocalStorage();
        refreshProgressCounters();
        refetchUserProgress();
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
            for (const nodeId of allPendingNodeIds) {
              renderTopicProgress(nodeId, 'skipped');
            }

            generatePersonalizedRoadmap(information);
          }}
          onClearProgress={() => {
            setIsModalOpen(false);
            const prevSkipped = userProgress?.skipped ?? [];
            clearResourceProgress(prevSkipped);
          }}
        />
      )}

      <button
        className="group inline-flex items-center gap-1.5 border-b-2 border-b-transparent px-2 pb-2.5 text-sm font-normal text-gray-400 transition-colors hover:text-gray-700"
        onClick={() => setIsModalOpen(true)}
        disabled={isGenerating}
      >
        {isGenerating ? (
          <>
            <Loader2Icon className="h-4 w-4 shrink-0 animate-spin" />
            <span>Personalizing...</span>
          </>
        ) : (
          <>
            <PersonStandingIcon className="h-4 w-4 shrink-0" />
            <span>Personalize</span>
          </>
        )}
      </button>
    </>
  );
}
