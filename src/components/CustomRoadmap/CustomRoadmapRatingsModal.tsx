import { useState } from 'react';
import { Modal } from '../Modal';
import type { RoadmapDocument } from './CreateRoadmap/CreateRoadmapModal';
import { RateRoadmapForm } from './RateRoadmapForm';
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

  const [activeTab, setActiveTab] = useState<ActiveTab>(
    canManage ? 'feedback' : 'ratings',
  );

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
    <Modal
      onClose={onClose}
      bodyClassName="bg-transparent shadow-none"
      wrapperClassName="h-auto"
      overlayClassName="items-start md:items-center"
    >
      {activeTab === 'ratings' && (
        <RateRoadmapForm
          ratings={ratings}
          roadmapSlug={roadmapSlug}
          canManage={canManage}
        />
      )}
      {activeTab === 'feedback' && (
        <ListRoadmapRatings ratings={ratings} roadmapSlug={roadmapSlug} />
      )}
    </Modal>
  );
}
