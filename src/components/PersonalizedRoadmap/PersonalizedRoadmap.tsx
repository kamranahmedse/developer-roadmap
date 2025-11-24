import { Loader2Icon, PersonStandingIcon } from 'lucide-react';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { usePersonalizedRoadmap } from '../../hooks/use-personalized-roadmap';
import {
  refreshProgressCounters,
  renderTopicProgress,
} from '../../lib/resource-progress';
import { PersonalizedRoadmapModal } from './PersonalizedRoadmapModal';
import { PersonalizedRoadmapSwitcher } from './PersonalizedRoadmapSwitcher';
import { useMutation, useQuery } from '@tanstack/react-query';
import { httpPost } from '../../lib/query-http';
import { useToast } from '../../hooks/use-toast';
import { queryClient } from '../../stores/query-client';
import { userResourceProgressOptions } from '../../queries/resource-progress';
import { useAuth } from '../../hooks/use-auth';
import { roadmapJSONOptions } from '../../queries/roadmap';
import { isLoggedIn } from '../../lib/jwt';
import { showLoginPopup } from '../../lib/popup';
import { cn } from '../../lib/classname';

type PersonalizedRoadmapProps = {
  roadmapId: string;
};

export function PersonalizedRoadmap(props: PersonalizedRoadmapProps) {
  const { roadmapId } = props;

  const toast = useToast();
  const currentUser = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPersonalized, setIsPersonalized] = useState(false);

  const { data: roadmap } = useQuery(
    roadmapJSONOptions(roadmapId),
    queryClient,
  );

  const {
    data: userProgress,
    isLoading: isUserProgressLoading,
    refetch: refetchUserProgress,
  } = useQuery(userResourceProgressOptions('roadmap', roadmapId), queryClient);

  useEffect(() => {
    if (userProgress?.personalized) {
      setIsPersonalized(true);
    }
  }, [userProgress]);

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

  const { mutate: savePersonalization, isPending: isSavingPersonalization } =
    useMutation(
      {
        mutationFn: (data: { topicIds: string[]; information: string }) => {
          const remainingTopicIds = allPendingNodeIds.filter(
            (nodeId) => !data.topicIds.includes(nodeId),
          );

          return httpPost(`/v1-save-personalization/${roadmapId}`, {
            personalized: {
              ...data,
              topicIds: remainingTopicIds,
            },
          });
        },
        onError: (error) => {
          toast.error(error?.message ?? 'Failed to save personalization');
        },
        onSuccess: () => {
          clearResourceProgressLocalStorage();
          refetchUserProgress();
          refreshProgressCounters();
          toast.success('Personalization saved successfully');
        },
      },
      queryClient,
    );

  const { generatePersonalizedRoadmap, status } = usePersonalizedRoadmap({
    roadmapId,
    onStart: () => {
      setIsModalOpen(false);
    },
    onError: (error) => {
      for (const nodeId of allPendingNodeIds) {
        renderTopicProgress(nodeId, 'pending');
      }
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
      const { topicIds, information } = data;
      savePersonalization({ topicIds, information });
    },
  });

  const { mutate: clearPersonalization, isPending: isClearing } = useMutation(
    {
      mutationFn: () => {
        return httpPost(`/v1-clear-roadmap-personalization/${roadmapId}`, {});
      },
      onError: (error) => {
        toast.error(error?.message ?? 'Failed to clear personalization');
      },
      onSuccess: () => {
        // Reset all topics to pending state
        allPendingNodeIds.forEach((topicId) => {
          renderTopicProgress(topicId, 'pending');
        });

        setIsPersonalized(false);
        toast.success('Personalization cleared successfully.');
        refetchUserProgress();
      },
    },
    queryClient,
  );

  const isGenerating =
    status !== 'idle' || isClearing || isSavingPersonalization;

  const handleTogglePersonalization = (showPersonalized: boolean) => {
    setIsPersonalized(showPersonalized);

    if (!showPersonalized) {
      const allTopicIds = allPendingNodeIds;
      allTopicIds.forEach((topicId) => {
        renderTopicProgress(topicId, 'pending');
      });
    } else if (userProgress?.personalized) {
      const { topicIds } = userProgress.personalized;
      // user is asking for personalized roadmap, we need to
      // mark all the pending ids which are in the personalized roadmap
      // as skipped and mark the rest as pending
      allPendingNodeIds.forEach((topicId) => {
        if (topicIds.includes(topicId)) {
          renderTopicProgress(topicId, 'skipped');
        } else {
          renderTopicProgress(topicId, 'pending');
        }
      });
    }
  };

  return (
    <>
      {isModalOpen && (
        <PersonalizedRoadmapModal
          info={userProgress?.personalized?.information ?? ''}
          onClose={() => setIsModalOpen(false)}
          onSubmit={(information) => {
            for (const nodeId of allPendingNodeIds) {
              renderTopicProgress(nodeId, 'skipped');
            }

            generatePersonalizedRoadmap(information);
          }}
          onClearProgress={() => {
            setIsModalOpen(false);
            clearPersonalization();
          }}
        />
      )}

      {userProgress?.personalized?.information ? (
        <PersonalizedRoadmapSwitcher
          isPersonalized={isPersonalized}
          onToggle={handleTogglePersonalization}
          onEdit={() => setIsModalOpen(true)}
          onRemove={() => {
            if (confirm('Are you sure you want to remove personalization?')) {
              clearPersonalization();
            }
          }}
        />
      ) : (
        <button
          className="group hidden sm:inline-flex items-center gap-1.5 border-b-2 border-b-transparent pb-2.5 text-sm font-normal text-gray-500 transition-colors hover:text-black"
          onClick={() => {
            if (!isLoggedIn()) {
              showLoginPopup();
              return;
            }

            setIsModalOpen(true);
          }}
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
              <span
                className={cn(
                  'ml-0.5 hidden items-center gap-0.5 rounded-full bg-yellow-200 px-2 py-0.5 text-xs font-medium text-black transition-colors sm:flex',
                  {
                    'bg-yellow-200 text-black group-hover:bg-yellow-300': true,
                  },
                )}
              >
                New
              </span>
            </>
          )}
        </button>
      )}
    </>
  );
}
