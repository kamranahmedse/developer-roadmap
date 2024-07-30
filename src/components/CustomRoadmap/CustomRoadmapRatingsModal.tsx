import { useState, type CSSProperties } from 'react';
import { formatCommaNumber } from '../../lib/number';
import { Modal } from '../Modal';
import { Rating } from '../Rating/Rating';
import type { RoadmapDocument } from './CreateRoadmap/CreateRoadmapModal';
import { RateRoadmapForm } from './RateRoadmapForm';
import { cn } from '../../lib/classname';
import { ListRoadmapRatings } from './ListRoadmapRatings';

type ActiveTab = 'ratings' | 'feedback';

type CustomRoadmapRatingsModalProps = {
  onClose: () => void;
  roadmapSlug: string;
  ratings: RoadmapDocument['ratings'];
  canManage?: boolean;
};

export function CustomRoadmapRatingsModal(
  props: CustomRoadmapRatingsModalProps,
) {
  const { onClose, ratings, roadmapSlug, canManage = false } = props;

  const [activeTab, setActiveTab] = useState<ActiveTab>('ratings');
  const tabs: {
    id: ActiveTab;
    label: string;
  }[] = [
    {
      id: 'ratings',
      label: 'Ratings',
    },
    {
      id: 'feedback',
      label: 'Feedback',
    },
  ];

  return (
    <Modal onClose={onClose} bodyClassName="bg-transparent shadow-none">
      {canManage && (
        <div className="-mx-4 mb-4 flex items-center gap-4 border-b px-4">
          {tabs.map((tab) => {
            const isActive = tab.id === activeTab;

            return (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                }}
                className={cn(
                  'py-2 text-sm',
                  isActive
                    ? 'border-b-2 border-black font-medium'
                    : 'text-gray-500 hover:text-gray-700',
                )}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      )}

      {activeTab === 'ratings' && (
        <RateRoadmapForm ratings={ratings} roadmapSlug={roadmapSlug} canManage={canManage} />
      )}
      {activeTab === 'feedback' && (
        <ListRoadmapRatings roadmapSlug={roadmapSlug} />
      )}
    </Modal>
  );
}
