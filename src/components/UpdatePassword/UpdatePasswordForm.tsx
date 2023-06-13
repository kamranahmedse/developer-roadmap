import { useEffect, useState } from 'preact/hooks';
import { httpGet, httpPost } from '../../lib/http';
import { pageProgressMessage } from '../../stores/page';

export default function UpdatePasswordForm() {
  const [authProvider, setAuthProvider] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newPasswordConfirmation, setNewPasswordConfirmation] = useState('');

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const [isLoading, setIsLoading] = useState(true);

  const handleSubmit = async (e: Event) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setSuccess('');

    if (newPassword !== newPasswordConfirmation) {
      setError('Passwords do not match');
      setIsLoading(false);

      return;
    }

    const { response, error } = await httpPost(
      `${import.meta.env.PUBLIC_API_URL}/v1-update-password`,
      {
        oldPassword: authProvider === 'email' ? currentPassword : 'social-auth',
        password: newPassword,
        confirmPassword: newPasswordConfirmation,
      }
    );

    if (error) {
      setError(error.message || 'Something went wrong');
      setIsLoading(false);

      return;
    }

    setError('');
    setCurrentPassword('');
    setNewPassword('');
    setNewPasswordConfirmation('');
    setSuccess('Password updated successfully');
    setIsLoading(false);
  };

  const loadProfile = async () => {
    setIsLoading(true);

    const { error, response } = await httpGet(
      `${import.meta.env.PUBLIC_API_URL}/v1-me`
    );

    if (error || !response) {
      setIsLoading(false);
      setError(error?.message || 'Something went wrong');

      return;
    }

    const { authProvider } = response;
    setAuthProvider(authProvider);

    setIsLoading(false);
  };

  useEffect(() => {
    loadProfile().finally(() => {
      pageProgressMessage.set('');
    });
  }, []);

  return (
    <form onSubmit={handleSubmit}>
      <div class="hidden md:block mb-8">
        <h2 className="text-3xl font-bold sm:text-4xl">Password</h2>
        <p className="mt-2 text-gray-400">Use the form below to update your password.</p>
      </div>
      <div className="space-y-4">
        {authProvider === 'email' && (
          <div className="flex w-full flex-col">
            <label
              for="current-password"
              className="text-sm leading-none text-slate-500"
            >
              Current Password
            </label>
            <input
              disabled={authProvider !== 'email'}
              type="password"
              name="current-password"
              id="current-password"
              className="mt-2 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm outline-none placeholder:text-gray-400 focus:ring-2 focus:ring-black focus:ring-offset-1 disabled:bg-gray-100"
              required
              minLength={6}
              placeholder="Current password"
              value={currentPassword}
              onInput={(e) =>
                setCurrentPassword((e.target as HTMLInputElement).value)
              }
            />
          </div>
        )}

        <div className="flex w-full flex-col">
          <label
            for="new-password"
            className="text-sm leading-none text-slate-500"
          >
            New Password
          </label>
          <input
            type="password"
            name="new-password"
            id="new-password"
            className="mt-2 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm outline-none placeholder:text-gray-400 focus:ring-2 focus:ring-black focus:ring-offset-1"
            required
            minLength={6}
            placeholder="New password"
            value={newPassword}
            onInput={(e) =>
              setNewPassword((e.target as HTMLInputElement).value)
            }
          />
        </div>
        <div className="flex w-full flex-col">
          <label
            for="new-password-confirmation"
            className="text-sm leading-none text-slate-500"
          >
            Confirm New Password
          </label>
          <input
            type="password"
            name="new-password-confirmation"
            id="new-password-confirmation"
            className="mt-2 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm outline-none placeholder:text-gray-400 focus:ring-2 focus:ring-black focus:ring-offset-1"
            required
            minLength={6}
            placeholder="Confirm New Password"
            value={newPasswordConfirmation}
            onInput={(e) =>
              setNewPasswordConfirmation((e.target as HTMLInputElement).value)
            }
          />
        </div>

        {error && (
          <p class="mt-2 rounded-lg bg-red-100 p-2 text-red-700">{error}</p>
        )}

        {success && (
          <p class="mt-2 rounded-lg bg-green-100 p-2 text-green-700">
            {success}
          </p>
        )}

        <button
          type="submit"
          disabled={isLoading}
          className="inline-flex w-full items-center justify-center rounded-lg bg-black p-2 py-3 text-sm font-medium text-white outline-none focus:ring-2 focus:ring-black focus:ring-offset-1 disabled:bg-gray-400"
        >
          {isLoading ? 'Please wait...' : 'Update Password'}
        </button>
      </div>
    </form>
  );
}
