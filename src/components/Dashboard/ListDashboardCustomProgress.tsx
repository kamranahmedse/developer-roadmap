import type { UserProgress } from '../TeamProgress/TeamProgressPage';
import { DashboardProgressCard } from './DashboardProgressCard';
import { DashboardProgressCardSkeleton } from './ListDashboardProgress';
import { DashboardCardLink } from './DashboardCardLink';
import { useState } from 'react';
import { CreateRoadmapModal } from '../CustomRoadmap/CreateRoadmap/CreateRoadmapModal';

type ListDashboardCustomProgressProps = {
  progresses: UserProgress[];
  isLoading?: boolean;
  isCustomResources?: boolean;
  isAIGeneratedRoadmaps?: boolean;
};

export function ListDashboardCustomProgress(
  props: ListDashboardCustomProgressProps,
) {
  const {
    progresses,
    isLoading = false,
    isAIGeneratedRoadmaps = false,
  } = props;
  const [isCreateCustomRoadmapModalOpen, setIsCreateCustomRoadmapModalOpen] =
    useState(false);

  if (!isLoading && progresses.length === 0) {
    return isAIGeneratedRoadmaps ? (
      <DashboardCardLink
        className="mt-8"
        href="/ai"
        title="Generate Roadmaps with AI"
        description="You can generate your own roadmap with AI"
      />
    ) : (
      <DashboardCardLink
        className="mt-8"
        href="https://draw.roadmap.sh"
        title="Use our Editor to Draw Roadmaps"
        description="You can make roadmaps that look like ours"
      />
    );
  }

  const customRoadmapModal = isCreateCustomRoadmapModalOpen ? (
    <CreateRoadmapModal
      onClose={() => setIsCreateCustomRoadmapModalOpen(false)}
      onCreated={(roadmap) => {
        window.location.href = `${
          import.meta.env.PUBLIC_EDITOR_APP_URL
        }/${roadmap?._id}`;
        return;
      }}
    />
  ) : null;

  const Slot = isAIGeneratedRoadmaps ? 'a' : 'button';

  return (
    <>
      {customRoadmapModal}

      <h2 className="mb-3 mt-8 text-xs uppercase text-gray-400">
        {isAIGeneratedRoadmaps ? 'AI Generated Roadmaps' : 'Custom Roadmaps'}
      </h2>

      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-4">
        {isLoading ? (
          <>
            {Array.from({ length: 8 }).map((_, index) => (
              <DashboardProgressCardSkeleton key={index} />
            ))}
          </>
        ) : (
          <>
            {progresses.map((progress) => (
              <DashboardProgressCard
                key={progress.resourceId}
                progress={progress}
              />
            ))}

            <Slot
              className="flex min-h-[80px] items-center justify-center rounded-lg border border-dashed border-gray-300 bg-white p-4 text-sm font-medium text-gray-500 hover:bg-gray-50 hover:text-gray-600"
              {...(isAIGeneratedRoadmaps
                ? { href: '/ai' }
                : {
                    onClick: () => {
                      setIsCreateCustomRoadmapModalOpen(true);
                    },
                  })}
            >
              {isAIGeneratedRoadmaps ? '+ Generate New' : '+ Create New'}
            </Slot>
          </>
        )}
      </div>
    </>
  );
}
