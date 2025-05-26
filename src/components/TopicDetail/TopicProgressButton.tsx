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
import { cn } from '../../lib/classname';
import { queryClient } from '../../stores/query-client';
import { userResourceProgressOptions } from '../../queries/resource-progress';

const statusColors: Record<ResourceProgressType, string> = {
  done: 'bg-green-500',
  learning: 'bg-yellow-500',
  pending: 'bg-gray-300',
  skipped: 'bg-black',
  removed: '',
};

type TopicProgressButtonProps = {
  topicId: string;
  resourceId: string;
  resourceType: ResourceType;
  dropdownClassName?: string;

  onClose: () => void;
};

type ProgressDropdownItemProps = {
  status: ResourceProgressType;
  shortcutKey: string;
  label: string;
  onClick: () => void;
};

function ProgressDropdownItem(props: ProgressDropdownItemProps) {
  const { status, shortcutKey, label, onClick } = props;

  return (
    <button
      className="inline-flex justify-between px-3 py-1.5 text-left text-sm text-gray-800 hover:bg-gray-100"
      onClick={onClick}
    >
      <span>
        <span
          className={`mr-2 inline-block h-2 w-2 rounded-full ${statusColors[status]}`}
        ></span>
        {label}
      </span>
      <span className="text-xs text-gray-500">{shortcutKey}</span>
    </button>
  );
}

export function TopicProgressButton(props: TopicProgressButtonProps) {
  const { topicId, resourceId, resourceType, onClose, dropdownClassName } =
    props;

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
    (e: KeyboardEvent) => {
      if (
        e.target instanceof HTMLTextAreaElement ||
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLSelectElement
      ) {
        return;
      }

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
    (e: KeyboardEvent) => {
      if (
        e.target instanceof HTMLTextAreaElement ||
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLSelectElement
      ) {
        return;
      }

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
    (e: KeyboardEvent) => {
      if (
        e.target instanceof HTMLTextAreaElement ||
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLSelectElement
      ) {
        return;
      }

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
    (e: KeyboardEvent) => {
      if (
        e.target instanceof HTMLTextAreaElement ||
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLSelectElement
      ) {
        return;
      }

      if (progress === 'pending') {
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
        setShowChangeStatus(false);
        setIsUpdatingProgress(false);
        queryClient.invalidateQueries(
          userResourceProgressOptions(resourceType, resourceId),
        );
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
        <Spinner isDualRing={false} className="h-4 w-4" />
        <span className="ml-2">Please wait..</span>
      </button>
    );
  }

  return (
    <div className="relative inline-flex">
      <button
        className={cn(
          'flex cursor-default cursor-pointer items-center rounded-md border border-gray-300 p-1 px-2 text-sm text-black hover:border-gray-400',
        )}
        onClick={() => setShowChangeStatus(true)}
      >
        <span className="flex h-2 w-2">
          <span
            className={`relative inline-flex h-2 w-2 rounded-full ${statusColors[progress]}`}
          ></span>
        </span>
        <span className="ml-2 capitalize">
          {progress === 'learning' ? 'In Progress' : progress}
        </span>
        <ChevronDown className="ml-2 h-4 w-4" />
      </button>

      {showChangeStatus && (
        <div
          className={cn(
            'absolute top-full right-0 z-50 mt-1 flex min-w-[160px] flex-col divide-y rounded-md border border-gray-200 bg-white shadow-md [&>button:first-child]:rounded-t-md [&>button:last-child]:rounded-b-md',
            dropdownClassName,
          )}
          ref={changeStatusRef!}
        >
          {allowMarkingDone && (
            <ProgressDropdownItem
              status="done"
              shortcutKey="D"
              label="Done"
              onClick={() => handleUpdateResourceProgress('done')}
            />
          )}
          {allowMarkingLearning && (
            <ProgressDropdownItem
              status="learning"
              shortcutKey="L"
              label="In Progress"
              onClick={() => handleUpdateResourceProgress('learning')}
            />
          )}
          {allowMarkingPending && (
            <ProgressDropdownItem
              status="pending"
              shortcutKey="R"
              label="Reset"
              onClick={() => handleUpdateResourceProgress('pending')}
            />
          )}
          {allowMarkingSkipped && (
            <ProgressDropdownItem
              status="skipped"
              shortcutKey="S"
              label="Skip"
              onClick={() => handleUpdateResourceProgress('skipped')}
            />
          )}
        </div>
      )}
    </div>
  );
}
