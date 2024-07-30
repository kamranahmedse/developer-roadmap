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
    <Modal onClose={onClose} bodyClassName="bg-transparent shadow-none">
      {/*{canManage && (*/}
      {/*  <div className="mb-1 flex items-center gap-1">*/}
      {/*    {tabs.map((tab) => {*/}
      {/*      const isActive = tab.id === activeTab;*/}

      {/*      return (*/}
      {/*        <button*/}
      {/*          key={tab.id}*/}
      {/*          onClick={() => {*/}
      {/*            setActiveTab(tab.id);*/}
      {/*          }}*/}
      {/*          className={cn('rounded-md bg-white px-3 py-2 text-sm', {*/}
      {/*            'bg-gray-100 font-medium text-black': isActive,*/}
      {/*            'text-gray-500 hover:text-gray-700': !isActive,*/}
      {/*          })}*/}
      {/*        >*/}
      {/*          {tab.label}*/}
      {/*        </button>*/}
      {/*      );*/}
      {/*    })}*/}
      {/*  </div>*/}
      {/*)}*/}

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
