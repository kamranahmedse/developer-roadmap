import { useEffect, useMemo, useRef, useState } from 'react';
import { useKeydown } from '../../hooks/use-keydown';
import { useOutsideClick } from '../../hooks/use-outside-click';
import { isLoggedIn } from '../../lib/jwt';
import {
  getTopicStatus,
  refreshProgressCounters,
  renderTopicProgress,
  updateResourceProgress,
} from '../../lib/resource-progress';
import type {
  ResourceProgressType,
  ResourceType,
} from '../../lib/resource-progress';
import { showLoginPopup } from '../../lib/popup';
import { useToast } from '../../hooks/use-toast';
import { Spinner } from '../ReactIcons/Spinner';
import { ChevronDown } from 'lucide-react';

type TopicProgressButtonProps = {
  topicId: string;
  resourceId: string;
  resourceType: ResourceType;

  onClose: () => void;
};

const statusColors: Record<ResourceProgressType, string> = {
  done: 'bg-green-500',
  learning: 'bg-yellow-500',
  pending: 'bg-gray-300',
  skipped: 'bg-black',
  removed: '',
};

export function TopicProgressButton(props: TopicProgressButtonProps) {
  const { topicId, resourceId, resourceType, onClose } = props;

  const toast = useToast();
  const [isUpdatingProgress, setIsUpdatingProgress] = useState(true);
  const [progress, setProgress] = useState<ResourceProgressType>('pending');
  const [showChangeStatus, setShowChangeStatus] = useState(false);

  const changeStatusRef = useRef<HTMLDivElement>(null);

  useOutsideClick(changeStatusRef, () => {
    setShowChangeStatus(false);
  });

  const isGuest = useMemo(() => !isLoggedIn(), []);

  useEffect(() => {
    if (!topicId || !resourceId || !resourceType) {
      return;
    }

    setIsUpdatingProgress(true);
    getTopicStatus({ topicId, resourceId, resourceType })
      .then((status) => {
        setIsUpdatingProgress(false);
        setProgress(status);
      })
      .catch(console.error);
  }, [topicId, resourceId, resourceType]);

  // Mark as done
  useKeydown(
    'd',
    () => {
      if (progress === 'done') {
        onClose();
        return;
      }

      handleUpdateResourceProgress('done');
    },
    [progress],
  );

  // Mark as learning
  useKeydown(
    'l',
    () => {
      if (progress === 'learning') {
        return;
      }

      handleUpdateResourceProgress('learning');
    },
    [progress],
  );

  // Mark as learning
  useKeydown(
    's',
    () => {
      if (progress === 'skipped') {
        onClose();
        return;
      }

      handleUpdateResourceProgress('skipped');
    },
    [progress],
  );

  // Mark as pending
  useKeydown(
    'r',
    () => {
      if (progress === 'pending') {
        onClose();
        return;
      }

      handleUpdateResourceProgress('pending');
    },
    [progress],
  );

  const handleUpdateResourceProgress = (progress: ResourceProgressType) => {
    if (isGuest) {
      onClose();
      showLoginPopup();
      return;
    }

    setIsUpdatingProgress(true);
    updateResourceProgress(
      {
        topicId,
        resourceId,
        resourceType,
      },
      progress,
    )
      .then(() => {
        setProgress(progress);
        if (progress !== 'learning') {
          onClose();
        }
        renderTopicProgress(topicId, progress);
        refreshProgressCounters();
      })
      .catch((err) => {
        toast.error(err.message || 'Error updating progress');
        console.error(err);
      })
      .finally(() => {
        setIsUpdatingProgress(false);
      });
  };

  const allowMarkingSkipped = ['pending', 'learning', 'done'].includes(
    progress,
  );
  const allowMarkingDone = ['skipped', 'pending', 'learning'].includes(
    progress,
  );
  const allowMarkingLearning = ['done', 'skipped', 'pending'].includes(
    progress,
  );
  const allowMarkingPending = ['skipped', 'done', 'learning'].includes(
    progress,
  );

  if (isUpdatingProgress) {
    return (
      <button className="inline-flex cursor-default items-center rounded-md border border-gray-300 bg-white p-1 px-2 text-sm text-black">
        <Spinner className="h-4 w-4" />
        <span className="ml-2">Updating Status..</span>
      </button>
    );
  }

  return (
    <div className="relative inline-flex rounded-md border border-gray-300">
      <span className="inline-flex cursor-default items-center  p-1 px-2 text-sm text-black">
        <span className="flex h-2 w-2">
          <span
            className={`relative inline-flex h-2 w-2 rounded-full ${statusColors[progress]}`}
          ></span>
        </span>
        <span className="ml-2 capitalize">
          {progress === 'learning' ? 'In Progress' : progress}
        </span>
      </span>

      <button
        className="inline-flex cursor-pointer items-center rounded-br-md rounded-tr-md border-l border-l-gray-300 bg-gray-100 p-1 px-2 text-sm text-black hover:bg-gray-200"
        onClick={() => setShowChangeStatus(true)}
      >
        <span className="mr-0.5">Update Status</span>
        <ChevronDown className="h-4 w-4" />
      </button>

      {showChangeStatus && (
        <div
          className="absolute right-0 top-full mt-1 flex min-w-[160px] flex-col divide-y rounded-md border border-gray-200 bg-white shadow-md [&>button:first-child]:rounded-t-md [&>button:last-child]:rounded-b-md"
          ref={changeStatusRef!}
        >
          {allowMarkingDone && (
            <button
              className="inline-flex justify-between px-3 py-1.5 text-left text-sm text-gray-800 hover:bg-gray-100"
              onClick={() => handleUpdateResourceProgress('done')}
            >
              <span>
                <span
                  className={`mr-2 inline-block h-2 w-2 rounded-full ${statusColors['done']}`}
                ></span>
                Done
              </span>
              <span className="text-xs text-gray-500">D</span>
            </button>
          )}
          {allowMarkingLearning && (
            <button
              className="inline-flex justify-between px-3 py-1.5 text-left text-sm text-gray-800 hover:bg-gray-100"
              onClick={() => handleUpdateResourceProgress('learning')}
            >
              <span>
                <span
                  className={`mr-2 inline-block h-2 w-2 rounded-full ${statusColors['learning']}`}
                ></span>
                In Progress
              </span>

              <span className="text-xs text-gray-500">L</span>
            </button>
          )}
          {allowMarkingPending && (
            <button
              className="inline-flex justify-between px-3 py-1.5 text-left text-sm text-gray-800 hover:bg-gray-100"
              onClick={() => handleUpdateResourceProgress('pending')}
            >
              <span>
                <span
                  className={`mr-2 inline-block h-2 w-2 rounded-full ${statusColors['pending']}`}
                ></span>
                Reset
              </span>
              <span className="text-xs text-gray-500">R</span>
            </button>
          )}
          {allowMarkingSkipped && (
            <button
              className="inline-flex justify-between px-3 py-1.5 text-left text-sm text-gray-800 hover:bg-gray-100"
              onClick={() => handleUpdateResourceProgress('skipped')}
            >
              <span>
                <span
                  className={`mr-2 inline-block h-2 w-2 rounded-full ${statusColors['skipped']}`}
                ></span>
                Skip
              </span>
              <span className="text-xs text-gray-500">S</span>
            </button>
          )}
        </div>
      )}
    </div>
  );
}
