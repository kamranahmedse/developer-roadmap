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
  visibility?: AllowedRoadmapVisibility;
};

export function CreateRoadmapButton(props: CreateRoadmapButtonProps) {
  const { className, type, visibility } = props;

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
          type={type}
          visibility={visibility}
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
        Create a new roadmap
      </button>
    </>
  );
}
