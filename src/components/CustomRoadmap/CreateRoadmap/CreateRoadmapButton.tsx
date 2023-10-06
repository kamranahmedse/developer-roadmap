import { Plus } from 'lucide-react';
import { isLoggedIn } from '../../../lib/jwt';
import { showLoginPopup } from '../../../lib/popup';
import { cn } from '../../../lib/classname';
import {
  type AllowedCustomRoadmapType,
  type AllowedRoadmapVisibility,
  CreateRoadmapModal,
} from './CreateRoadmapModal';
import { useState } from 'react';

type CreateRoadmapButtonProps = {
  className?: string;
  type?: AllowedCustomRoadmapType;
  text?: string;
  teamId?: string;
};

export function CreateRoadmapButton(props: CreateRoadmapButtonProps) {
  const { teamId, className, type, text = 'Create your own Roadmap' } = props;

  const [isCreatingRoadmap, setIsCreatingRoadmap] = useState(false);

  function toggleCreateRoadmapHandler() {
    if (!isLoggedIn()) {
      return showLoginPopup();
    }

    setIsCreatingRoadmap(true);
  }

  return (
    <>
      {isCreatingRoadmap && (
        <CreateRoadmapModal
          teamId={teamId}
          type={type}
          onClose={() => {
            setIsCreatingRoadmap(false);
          }}
        />
      )}

      <button
        className={cn(
          'flex h-full w-full items-center justify-center gap-1 overflow-hidden rounded-md border border-dashed border-gray-800 p-3 text-sm text-gray-400 hover:border-gray-600 hover:bg-gray-900 hover:text-gray-300',
          className
        )}
        onClick={toggleCreateRoadmapHandler}
      >
        <Plus size={16} />
        {text}
      </button>
    </>
  );
}
