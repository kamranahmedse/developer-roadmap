import { useEffect, useMemo, useState } from 'preact/hooks';
import CheckIcon from '../../icons/check.svg';
import ProgressIcon from '../../icons/progress.svg';
import ResetIcon from '../../icons/reset.svg';
import SpinnerIcon from '../../icons/spinner.svg';
import { isLoggedIn } from '../../lib/jwt';
import {
    ResourceProgressType,
    ResourceType,
    getTopicStatus,
    renderTopicProgress,
    updateResourceProgress,
} from '../../lib/resource-progress';

type TopicProgressButtonProps = {
  topicId: string;
  resourceId: string;
  resourceType: ResourceType;

  onClose: () => void;
};

export function TopicProgressButton(props: TopicProgressButtonProps) {
  const { topicId, resourceId, resourceType, onClose } = props;

  const [isUpdatingProgress, setIsUpdatingProgress] = useState(true);
  const [progress, setProgress] = useState<ResourceProgressType>('pending');

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

  const handleUpdateResourceProgress = (progress: ResourceProgressType) => {
    setIsUpdatingProgress(true);
    updateResourceProgress(
      {
        topicId,
        resourceId,
        resourceType,
      },
      progress
    )
      .then(() => {
        setProgress(progress);
        onClose();
        renderTopicProgress(topicId, progress);
      })
      .catch((err) => {
        alert(err.message);
        console.error(err);
      })
      .finally(() => {
        setIsUpdatingProgress(false);
      });
  };

  const allowMarkingDone = ['pending', 'learning'].includes(progress);
  const allowMarkingLearning = ['pending'].includes(progress);
  const allowMarkingPending = ['done', 'learning'].includes(progress);

  if (isUpdatingProgress) {
    return (
      <button className="inline-flex cursor-default items-center rounded-md border border-gray-300 bg-white p-1 px-2 text-sm text-black">
        <img alt="Check" class="h-4 w-4 animate-spin" src={SpinnerIcon} />
        <span className="ml-2">Updating Status..</span>
      </button>
    );
  }

  if (isGuest) {
    return (
      <div className="flex items-center gap-2">
        <button
          data-popup="login-popup"
          className="inline-flex items-center rounded-md bg-green-600 p-1 px-2 text-sm text-white hover:bg-green-700"
          onClick={onClose}
        >
          <img alt="Check" class="w-3" src={CheckIcon} />
          <span className="ml-2">Mark as Done</span>
        </button>
        <button
          data-popup="login-popup"
          className="inline-flex items-center rounded-md bg-[#dad1fd] p-1 px-2 text-sm text-[#0E033B] hover:bg-[#C4B6FC]"
          onClick={onClose}
        >
          <img alt="Learning" class="w-4" src={ProgressIcon} />
          <span className="ml-2">In Progress</span>
        </button>
      </div>
    );
  }

  return (
    <div class="flex items-center gap-2 rounded-md">
      {allowMarkingDone && (
        <button
          className="inline-flex items-center rounded-md border border-green-600 bg-green-600 p-1 px-2 text-sm text-white hover:bg-green-700"
          onClick={() => handleUpdateResourceProgress('done')}
        >
          <img alt="Check" class="w-3" src={CheckIcon} />
          <span className="ml-1">Done</span>
        </button>
      )}

      {allowMarkingLearning && (
        <button
          className="inline-flex items-center rounded-md bg-[#dad1fd] p-1 px-2 text-sm text-[#0E033B] hover:bg-[#C4B6FC]"
          onClick={() => handleUpdateResourceProgress('learning')}
        >
          <img alt="Learning" className="w-4" src={ProgressIcon} />
          <span className="ml-1">Doing</span>
        </button>
      )}

      {allowMarkingPending && (
        <button
          className="inline-flex items-center rounded-md border border-red-600 bg-red-600 p-1 px-2 text-sm text-white hover:bg-red-700"
          onClick={() => handleUpdateResourceProgress('pending')}
        >
          <img alt="Check" class="h-4" src={ResetIcon} />
          <span className="ml-2">Pending</span>
        </button>
      )}
    </div>
  );
}
