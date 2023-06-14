import { useState } from 'preact/hooks';
import { httpPost } from '../../lib/http';

type ResourceClearProgressType = {
  resourceType: 'roadmap' | 'best-practice';
  resourceId: string;
  onCleared?: () => void;
};

export function ResourceClearProgress({
  resourceType,
  resourceId,
  onCleared,
}: ResourceClearProgressType) {
  const [isClearing, setIsClearing] = useState(false);
  const [isConfirming, setIsConfirming] = useState(false);

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
    
    if (onCleared) {
      onCleared();
    }
  }

  return (
    <>
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
          Are you sure?{' '}
          <button
            onClick={clearProgress}
            className="ml-1 mr-1 text-red-500 underline hover:text-red-800"
          >
            Yes
          </button>{' '}
          <button
            onClick={() => setIsConfirming(false)}
            className="text-red-500 underline hover:text-red-800"
          >
            No
          </button>
        </span>
      )}
    </>
  );
}
