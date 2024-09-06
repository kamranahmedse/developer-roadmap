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
};

export function ListDashboardCustomProgress(
  props: ListDashboardCustomProgressProps,
) {
  const { progresses, isLoading = false } = props;
  const [isCreateCustomRoadmapModalOpen, setIsCreateCustomRoadmapModalOpen] =
    useState(false);

  if (!isLoading && progresses.length === 0) {
    return (
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

  return (
    <>
      {customRoadmapModal}
      <h2 className="mb-3 mt-8 text-xs uppercase text-gray-400">
        Custom Roadmaps
      </h2>

      {isLoading ? (
        <div className="grid grid-cols-4 gap-2">
          {Array.from({ length: 8 }).map((_, index) => (
            <DashboardProgressCardSkeleton key={index} />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-4 gap-2">
          {progresses.map((progress) => (
            <DashboardProgressCard
              key={progress.resourceId}
              progress={progress}
            />
          ))}

          <button
            className="flex min-h-[80px] items-center justify-center rounded-lg border border-dashed border-gray-300 bg-white p-4 text-sm font-medium text-gray-500 hover:bg-gray-50 hover:text-gray-600"
            onClick={() => {
              setIsCreateCustomRoadmapModalOpen(true);
            }}
          >
            + Create New
          </button>
        </div>
      )}
    </>
  );
}
