import { useEffect, useState } from 'preact/hooks';
import { httpDelete, httpPost } from '../../lib/http';
import { useParams } from '../../hooks/use-params';

export function InviteMemberForm() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const { teamId } = useParams<{ teamId: string }>();

  useEffect(() => {
    setError('');
  }, []);

  const handleSubmit = async (e: Event) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    const { response, error } = await httpPost(
      `${import.meta.env.PUBLIC_API_URL}/v1-invite-member/${teamId}`,
      { email }
    );

    if (error || !response) {
      setIsLoading(false);
      setError(error?.message || 'Something went wrong');
      return;
    }

    window.dispatchEvent(
      new CustomEvent('invite-member', {
        detail: {},
      })
    );
    setIsLoading(false);
    handleClosePopup();
  };

  const handleClosePopup = () => {
    setIsLoading(false);
    setError('');

    const deleteAccountPopup = document.getElementById('invite-member-popup');
    deleteAccountPopup?.classList.add('hidden');
    deleteAccountPopup?.classList.remove('flex');
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="my-4">
        <input
          type="text"
          name="invite-member"
          id="invite-member"
          className="mt-2 block w-full rounded-md border border-gray-300 px-3 py-2 outline-none placeholder:text-gray-400 focus:border-gray-400"
          placeholder="Enter email address"
          required
          autoFocus
          value={email}
          onInput={(e) => setEmail((e.target as HTMLInputElement).value)}
        />
        {error && (
          <p className="mt-2 rounded-lg bg-red-100 p-2 text-red-700">{error}</p>
        )}
      </div>

      <div className="flex items-center gap-2">
        <button
          type="button"
          disabled={isLoading}
          onClick={handleClosePopup}
          className="flex-grow cursor-pointer rounded-lg bg-gray-200 py-2 text-center"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isLoading || !email}
          className="flex-grow cursor-pointer rounded-lg bg-red-500 py-2 text-white disabled:opacity-40"
        >
          {isLoading ? 'Please wait ..' : 'Invite'}
        </button>
      </div>
    </form>
  );
}
