import { useState } from 'preact/hooks';
import Cookies from 'js-cookie';
import { httpDelete } from '../../lib/http';
import { TOKEN_COOKIE_NAME } from '../../lib/jwt';
import { hideDeleteAccountPopup } from './DeleteAccount';

const DELETE_ACCOUNT_VERIFICATION = 'delete my account';

export function DeleteAccountForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [deleteAccount, setDeleteAccount] = useState('');

  const handleSubmit = async (e: Event) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    if (deleteAccount !== DELETE_ACCOUNT_VERIFICATION) {
      setError('Verification text does not match');
      setIsLoading(false);
      return;
    }

    const { response, error } = await httpDelete(
      `${import.meta.env.PUBLIC_API_URL}/v1-delete-account`
    );

    if (error || !response) {
      setIsLoading(false);
      setError(error?.message || 'Something went wrong');
      return;
    }

    Cookies.remove(TOKEN_COOKIE_NAME);
    window.location.href = '/';
  };

  const handleClosePopup = () => {
    setIsLoading(false);
    setError('');
    setDeleteAccount('');

    hideDeleteAccountPopup();
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="delete-account" className="text-sm text-gray-500">
          To verify, type{' '}
          <span className="font-medium text-gray-600">
            {DELETE_ACCOUNT_VERIFICATION}
          </span>{' '}
          below:
        </label>
        <input
          type="text"
          name="delete-account"
          id="delete-account"
          className="mt-2 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm outline-none placeholder:text-gray-400 focus:ring-2 focus:ring-black focus:ring-offset-1"
          required
          autoFocus
          value={deleteAccount}
          onInput={(e) =>
            setDeleteAccount((e.target as HTMLInputElement).value)
          }
        />
        {error && (
          <p className="mt-2 rounded-lg bg-red-100 p-2 text-red-700">{error}</p>
        )}
      </div>

      <div className="mt-6 flex items-center justify-between gap-2">
        <button
          type="button"
          disabled={isLoading}
          onClick={handleClosePopup}
          className="flex h-10 items-center justify-center rounded-md bg-gray-100 px-4 py-2 text-sm font-medium text-black shadow-sm hover:bg-gray-100/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-200 disabled:pointer-events-none disabled:opacity-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isLoading}
          className="flex h-10 items-center justify-center rounded-md bg-red-500 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-red-500/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-red-200 disabled:pointer-events-none disabled:opacity-50"
        >
          {isLoading ? 'Please wait...' : 'Delete Account'}
        </button>
      </div>
    </form>
  );
}
