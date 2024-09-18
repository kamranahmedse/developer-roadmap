import type { UserProgress } from '../TeamProgress/TeamProgressPage';
import { DashboardCustomProgressCard } from './DashboardCustomProgressCard';
import { DashboardCardLink } from './DashboardCardLink';
import { useState } from 'react';
import { CreateRoadmapModal } from '../CustomRoadmap/CreateRoadmap/CreateRoadmapModal';
import { Simulate } from 'react-dom/test-utils';
import {
  ArrowUpRight,
  Bot,
  BrainCircuit,
  Map,
  PencilRuler,
} from 'lucide-react';

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

      <div className="mb-2 mt-6 flex items-center justify-between gap-2">
        <h2 className="text-xs uppercase text-gray-400">
          {isAIGeneratedRoadmaps ? 'AI Generated Roadmaps' : 'Custom Roadmaps'}
        </h2>

        {!isLoading && progresses.length !== 0 && (
          <a
            href="/ai/explore"
            className="flex items-center gap-1 text-xs text-gray-500 hover:text-black"
          >
            <ArrowUpRight size={12} />
            Community Roadmaps
          </a>
        )}
      </div>

      {!isLoading && progresses.length === 0 && isAIGeneratedRoadmaps && (
        <DashboardCardLink
          className="mt-0"
          icon={BrainCircuit}
          href="/ai"
          title="Generate Roadmaps with AI"
          description="You can generate your own roadmap with AI"
        />
      )}

      {!isLoading && progresses.length === 0 && !isAIGeneratedRoadmaps && (
        <DashboardCardLink
          className="mt-0"
          icon={PencilRuler}
          href="https://draw.roadmap.sh"
          title="Draw your own Roadmap"
          description="Use our editor to draw your own roadmap"
        />
      )}

      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-4">
        {isLoading && (
          <>
            {Array.from({ length: 8 }).map((_, index) => (
              <CustomProgressCardSkeleton key={index} />
            ))}
          </>
        )}

        {!isLoading && progresses.length > 0 && (
          <>
            {progresses.map((progress) => (
              <DashboardCustomProgressCard
                key={progress.resourceId}
                progress={progress}
              />
            ))}

            <a
              className="flex min-h-[80px] items-center justify-center rounded-lg border border-dashed border-gray-300 bg-white p-4 text-sm font-medium text-gray-500 hover:bg-gray-50 hover:text-gray-600"
              href={'/ai'}
              onClick={(e) => {
                if (!isAIGeneratedRoadmaps) {
                  e.preventDefault();
                  setIsCreateCustomRoadmapModalOpen(true);
                }
              }}
            >
              {isAIGeneratedRoadmaps ? '+ Generate New' : '+ Create New'}
            </a>
          </>
        )}
      </div>
    </>
  );
}

type CustomProgressCardSkeletonProps = {};

export function CustomProgressCardSkeleton(
  props: CustomProgressCardSkeletonProps,
) {
  return (
    <div className="h-[106px] w-full animate-pulse rounded-md bg-gray-200" />
  );
}
