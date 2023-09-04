import { Plus } from 'lucide-react';
import { isLoggedIn } from '../../../lib/jwt';
import { showLoginPopup } from '../../../lib/popup';
import { showCreateRoadmapModal } from '../../../stores/roadmap';
import { cn } from '../../../lib/classname';

type CreateRoadmapButtonProps = {
  className?: string;
};

export function CreateRoadmapButton(props: CreateRoadmapButtonProps) {
  const { className } = props;
  function toggleCreateRoadmapHandler() {
    if (!isLoggedIn()) {
      showLoginPopup();
    }
    showCreateRoadmapModal();
  }

  return (
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
  );
}
