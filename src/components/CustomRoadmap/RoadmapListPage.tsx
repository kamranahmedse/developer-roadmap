import { useEffect, useState } from 'react';
import { httpGet } from '../../lib/http';
import { pageProgressMessage } from '../../stores/page';
import {
  CreateRoadmapModal,
  type RoadmapDocument,
} from './CreateRoadmap/CreateRoadmapModal';
import { PersonalRoadmapList } from './PersonalRoadmapList';
import { useToast } from '../../hooks/use-toast';
import { SharedRoadmapList } from './SharedRoadmapList';
import type { FriendshipStatus } from '../Befriend';
import { useIsPaidUser } from '../../queries/billing';
import { UpgradeAccountModal } from '../Billing/UpgradeAccountModal';

export type FriendUserType = {
  id: string;
  name: string;
  avatar: string;
  status: FriendshipStatus;
};

export type GetRoadmapListResponse = {
  personalRoadmaps: (RoadmapDocument & {
    topics: number;
  })[];
  sharedRoadmaps: (RoadmapDocument & {
    topics: number;
    creator: FriendUserType;
  })[];
};

type TabType = {
  label: string;
  value: 'personal' | 'shared';
};

const tabTypes: TabType[] = [
  { label: 'Personal', value: 'personal' },
  { label: 'Shared by Friends', value: 'shared' },
];

export const MAX_ROADMAP_LIMIT = 3;

export function RoadmapListPage() {
  const toast = useToast();

  const [isLoading, setIsLoading] = useState(true);
  const [isCreatingRoadmap, setIsCreatingRoadmap] = useState(false);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);

  const [activeTab, setActiveTab] = useState<TabType['value']>('personal');
  const [allRoadmaps, setAllRoadmaps] = useState<GetRoadmapListResponse>({
    personalRoadmaps: [],
    sharedRoadmaps: [],
  });

  const { isPaidUser, isLoading: isLoadingIsPaidUser } = useIsPaidUser();

  async function loadRoadmapList() {
    setIsLoading(true);
    const { response, error } = await httpGet<GetRoadmapListResponse>(
      `${import.meta.env.PUBLIC_API_URL}/v1-get-user-roadmap-list`,
    );

    if (error || !response) {
      console.error(error);
      toast.error(error?.message || 'Something went wrong, please try again');
      return;
    }

    setAllRoadmaps(
      response! || {
        personalRoadmaps: [],
        sharedRoadmaps: [],
      },
    );
  }

  useEffect(() => {
    loadRoadmapList().finally(() => {
      setIsLoading(false);
      pageProgressMessage.set('');
    });
  }, []);

  if (isLoading) {
    return null;
  }

  const totalRoadmaps = allRoadmaps.personalRoadmaps.length;
  const hasCrossedLimit = !isPaidUser && totalRoadmaps >= MAX_ROADMAP_LIMIT;

  return (
    <div>
      {isCreatingRoadmap && (
        <CreateRoadmapModal onClose={() => setIsCreatingRoadmap(false)} />
      )}

      {showUpgradeModal && (
        <UpgradeAccountModal onClose={() => setShowUpgradeModal(false)} />
      )}

      <div className="mb-6 flex flex-col justify-between gap-2 sm:flex-row sm:items-center sm:gap-0">
        <div className="flex grow items-center gap-2">
          {tabTypes.map((tab) => {
            return (
              <button
                key={tab.value}
                className={`relative flex w-full items-center justify-center rounded-md border p-1 px-3 text-sm whitespace-nowrap sm:w-auto ${
                  activeTab === tab.value ? 'border-gray-400 bg-gray-200' : ''
                } w-full sm:w-auto`}
                onClick={() => setActiveTab(tab.value)}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
        <button
          className={`relative flex w-full items-center justify-center rounded-md border p-1 px-3 text-sm sm:w-auto`}
          onClick={() => {
            if (hasCrossedLimit) {
              setShowUpgradeModal(true);
              return;
            }

            setIsCreatingRoadmap(true);
          }}
          disabled={isLoadingIsPaidUser}
        >
          + Create Roadmap
        </button>
      </div>

      <div className="mt-4">
        {activeTab === 'personal' && (
          <PersonalRoadmapList
            maxLimit={
              isPaidUser ? -1 : Math.max(MAX_ROADMAP_LIMIT, totalRoadmaps)
            }
            roadmaps={allRoadmaps?.personalRoadmaps}
            setAllRoadmaps={setAllRoadmaps}
            onUpgrade={() => setShowUpgradeModal(true)}
            onDelete={(roadmapId) => {
              setAllRoadmaps({
                ...allRoadmaps,
                personalRoadmaps: allRoadmaps.personalRoadmaps.filter(
                  (r) => r._id !== roadmapId,
                ),
              });
            }}
          />
        )}
        {activeTab === 'shared' && (
          <SharedRoadmapList roadmaps={allRoadmaps?.sharedRoadmaps} />
        )}
      </div>
    </div>
  );
}
