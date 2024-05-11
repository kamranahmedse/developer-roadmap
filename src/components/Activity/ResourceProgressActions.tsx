import { MoreVertical, X } from 'lucide-react';
import { useRef, useState } from 'react';
import { useOutsideClick } from '../../hooks/use-outside-click';
import { useKeydown } from '../../hooks/use-keydown';
import { ProgressShareButton } from '../UserProgress/ProgressShareButton';
import type { ResourceType } from '../../lib/resource-progress';
import { httpPost } from '../../lib/http';
import { useToast } from '../../hooks/use-toast';

type ResourceProgressActionsType = {
  userId: string;
  resourceType: ResourceType;
  resourceId: string;
  isCustomResource: boolean;
  showClearButton?: boolean;
  onCleared?: () => void;
};

export function ResourceProgressActions(props: ResourceProgressActionsType) {
  const {
    userId,
    resourceType,
    resourceId,
    isCustomResource,
    showClearButton = true,
    onCleared,
  } = props;

  const toast = useToast();
  const dropdownRef = useRef<HTMLDivElement>(null);

  const [isOpen, setIsOpen] = useState(false);
  const [isClearing, setIsClearing] = useState(false);
  const [isConfirming, setIsConfirming] = useState(false);

  async function clearProgress() {
    setIsClearing(true);
    const { error, response } = await httpPost(
      `${import.meta.env.PUBLIC_API_URL}/v1-clear-resource-progress`,
      {
        resourceId,
        resourceType,
      },
    );

    if (error || !response) {
      toast.error('Error clearing progress. Please try again.');
      console.error(error);
      setIsClearing(false);
      return;
    }

    localStorage.removeItem(`${resourceType}-${resourceId}-${userId}-favorite`);
    localStorage.removeItem(`${resourceType}-${resourceId}-${userId}-progress`);

    setIsClearing(false);
    setIsConfirming(false);
    if (onCleared) {
      onCleared();
    }
  }

  useOutsideClick(dropdownRef, () => {
    setIsOpen(false);
  });

  useKeydown('Escape', () => {
    setIsOpen(false);
  });

  return (
    <div className="relative h-full" ref={dropdownRef}>
      <button
        className="h-full text-gray-400 hover:text-gray-700"
        onClick={() => setIsOpen(!isOpen)}
      >
        <MoreVertical size={16} />
      </button>

      {isOpen && (
        <div className="absolute right-0 top-8 z-10 w-48 overflow-hidden rounded-md border border-gray-200 bg-white shadow-lg">
          <ProgressShareButton
            resourceType={resourceType}
            resourceId={resourceId}
            isCustomResource={isCustomResource}
            className="w-full gap-1.5 p-2 hover:bg-gray-100"
          />
          {showClearButton && (
            <>
              {!isConfirming && (
                <button
                  className="flex w-full items-center gap-1.5 p-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-black disabled:cursor-not-allowed disabled:opacity-70"
                  onClick={() => setIsConfirming(true)}
                  disabled={isClearing}
                >
                  {!isClearing ? (
                    <>
                      <X className="h-3.5 w-3.5" />
                      Clear Progress
                    </>
                  ) : (
                    'Processing...'
                  )}
                </button>
              )}

              {isConfirming && (
                <span className="flex w-full items-center justify-between gap-1.5 p-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-black disabled:cursor-not-allowed disabled:opacity-70">
                  Are you sure?
                  <div className="flex items-center gap-2">
                    <button
                      onClick={clearProgress}
                      className="text-red-500 underline hover:text-red-800"
                    >
                      Yes
                    </button>
                    <button
                      onClick={() => setIsConfirming(false)}
                      className="text-red-500 underline hover:text-red-800"
                    >
                      No
                    </button>
                  </div>
                </span>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
}
