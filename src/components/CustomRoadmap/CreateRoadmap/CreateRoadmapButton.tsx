import { Plus } from 'lucide-react';
import { isLoggedIn } from '../../../lib/jwt';
import { showLoginPopup } from '../../../lib/popup';
import { cn } from '../../../lib/classname';
import { CreateRoadmapModal } from './CreateRoadmapModal';
import { useState } from 'react';
import { useIsPaidUser } from '../../../queries/billing';
import { UpgradeAccountModal } from '../../Billing/UpgradeAccountModal';
import { MAX_ROADMAP_LIMIT } from '../RoadmapListPage';

type CreateRoadmapButtonProps = {
  className?: string;
  existingRoadmapCount?: number;
  text?: string;
  teamId?: string;
};

export function CreateRoadmapButton(props: CreateRoadmapButtonProps) {
  const {
    teamId,
    className,
    text = 'Create your own Roadmap',
    existingRoadmapCount = 0,
  } = props;

  const [isCreatingRoadmap, setIsCreatingRoadmap] = useState(false);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const { isPaidUser, isLoading: isPaidUserLoading } = useIsPaidUser();

  function toggleCreateRoadmapHandler() {
    if (!isLoggedIn()) {
      return showLoginPopup();
    }

    const hasExceededLimit =
      !isPaidUser &&
      existingRoadmapCount > 0 &&
      existingRoadmapCount >= MAX_ROADMAP_LIMIT;

    if (hasExceededLimit) {
      setShowUpgradeModal(true);
      return;
    }

    setIsCreatingRoadmap(true);
  }

  return (
    <>
      {showUpgradeModal && (
        <UpgradeAccountModal onClose={() => setShowUpgradeModal(false)} />
      )}

      {isCreatingRoadmap && (
        <CreateRoadmapModal
          teamId={teamId}
          onClose={() => {
            setIsCreatingRoadmap(false);
          }}
        />
      )}

      <button
        className={cn(
          'flex h-full w-full items-center justify-center gap-1 overflow-hidden rounded-md border border-dashed border-gray-800 p-3 text-sm text-gray-400 hover:border-gray-600 hover:bg-gray-900 hover:text-gray-300',
          className,
        )}
        onClick={toggleCreateRoadmapHandler}
      >
        <Plus size={16} />
        {text}
      </button>
    </>
  );
}
