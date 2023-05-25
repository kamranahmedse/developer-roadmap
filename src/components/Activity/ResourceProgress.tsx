import { useEffect, useState } from 'preact/hooks';
import { httpPost } from '../../lib/http';

type ResourceProgressType = {
  resourceType: 'roadmap' | 'best-practice';
  resourceId: string;
  title: string;
  totalCount: number;
  doneCount: number;
  learningCount: number;
  skippedCount: number;
  onCleared: () => void;
};

export function ResourceProgress(props: ResourceProgressType) {
  const [isClearing, setIsClearing] = useState(false);
  const [isConfirming, setIsConfirming] = useState(false);

  const {
    resourceType,
    resourceId,
    title,
    totalCount,
    learningCount,
    doneCount,
    skippedCount,
    onCleared,
  } = props;

  async function clearProgress() {
    setIsClearing(true);
    const { error, response } = await httpPost(
      `${import.meta.env.PUBLIC_API_URL}/v1-clear-resource-progress`,
      {
        resourceId,
        resourceType,
      }
    );

    if (error || !response) {
      alert('Error clearing progress. Please try again.');
      console.error(error);
      setIsClearing(false);
      return;
    }

    localStorage.removeItem(`${resourceType}-${resourceId}-progress`);
    console.log(`${resourceType}-${resourceId}-progress`);
    setIsClearing(false);
    setIsConfirming(false);
    onCleared();
  }

  const url =
    resourceType === 'roadmap'
      ? `/${resourceId}`
      : `/best-practices/${resourceId}`;

  const totalMarked = doneCount + skippedCount;
  const progressPercentage = Math.round((totalMarked / totalCount) * 100);

  return (
    <div>
      <a
        href={url}
        className="group relative flex cursor-pointer items-center rounded-t-md border p-3 text-gray-600 hover:border-gray-300 hover:text-black"
      >
        <span
          className={`absolute left-0 top-0 block h-full cursor-pointer rounded-tl-md bg-black/5 group-hover:bg-black/10`}
          style={{
            width: `${progressPercentage}%`,
          }}
        ></span>
        <span className="relative  flex-1 cursor-pointer">{title}</span>
        <span className="cursor-pointer text-sm  text-gray-400">
          5 hours ago
        </span>
      </a>
      <p className="items-start sm:space-between flex flex-row rounded-b-md border border-t-0 px-2 py-2 text-xs text-gray-500">
        <span className="flex-1 gap-1 flex">
          <span>{doneCount} done</span> &bull;
          { learningCount > 0 && <><span>{learningCount} in progress</span> &bull;</> }
          { skippedCount > 0 && <><span>{skippedCount} skipped</span> &bull;</> }
          <span>{totalCount} total</span>
        </span>
        {!isConfirming && (
          <button
            className="text-red-500 hover:text-red-800"
            onClick={() => setIsConfirming(true)}
            disabled={isClearing}
          >
            {!isClearing && (
              <>
                Clear Progress <span>&times;</span>
              </>
            )}

            {isClearing && 'Processing...'}
          </button>
        )}

        {isConfirming && (
          <span>
            <span className='hidden sm:inline'>Are you sure?{' '}</span>
            <span className='inline sm:hidden'>Sure?{' '}</span>
            <button onClick={clearProgress} className="ml-1 mr-1 underline text-red-500 hover:text-red-800">Yes</button>{' '}
            <button onClick={() => setIsConfirming(false)} className="underline text-red-500 hover:text-red-800">No</button>
          </span>
        )}
      </p>
    </div>
  );
}
