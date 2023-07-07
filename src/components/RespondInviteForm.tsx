import { useEffect, useState } from 'preact/hooks';
import { useParams } from '../hooks/use-params';
import { httpGet, httpPatch } from '../lib/http';

export function RespondInviteForm() {
  const [containerOpacity, setContainerOpacity] = useState(0);
  const [isPreparing, setIsPreparing] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const { inviteId } = useParams<{ inviteId: string }>();

  function showRespondContainer() {
    const respondEl = document.getElementById('respond-invite')!;
    if (!respondEl) {
      return;
    }

    respondEl.classList.add('opacity-0');
    setTimeout(() => {
      respondEl.parentElement?.removeChild(respondEl);
      setIsPreparing(false);

      setTimeout(() => {
        setContainerOpacity(100);
      }, 50);
    }, 0);
  }

  async function respondInvitation(status: 'accept' | 'reject') {
    setIsLoading(true);
    setError('');
    const { response, error } = await httpPatch<{ teamId: string }>(
      `${import.meta.env.PUBLIC_API_URL}/v1-respond-invite/${inviteId}`, {
      status
    });
    if (error || !response) {
      setError(error?.message || 'Something went wrong')
      setIsLoading(false)
      return;
    }

    if (status === 'reject') {
      window.location.href = '/';
      return;
    }
    window.location.href = `/team/progress?teamId=${response.teamId}`;
  }

  useEffect(() => {
    showRespondContainer()
    setIsPreparing(false);
  }, [])

  if (isPreparing) {
    return null
  }

  return (
    <div className={`max-w-md mx-auto w-full transition-opacity duration-500 opacity-${containerOpacity}`}>
      <div className="flex items-center gap-2 w-full">
        <button
          type="button"
          disabled={isLoading}
          onClick={() => respondInvitation('accept')}
          className="flex-grow cursor-pointer rounded-lg bg-gray-200 px-3 py-2 text-center"
        >
          {isLoading ? 'Please wait ..' : 'Accept'}
        </button>
        <button
          type="button"
          disabled={isLoading}
          onClick={() => respondInvitation('reject')}
          className="flex-grow cursor-pointer rounded-lg bg-red-500 px-3 py-2 text-white disabled:opacity-40"
        >
          {isLoading ? 'Please wait ..' : 'Reject'}
        </button>
      </div>

      {error && (
        <p className="mt-2 rounded-lg bg-red-100 p-2 text-red-700">{error}</p>
      )}
    </div>
  );
}
