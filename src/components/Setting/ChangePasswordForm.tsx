import { useCallback, useEffect, useState } from 'preact/hooks';
import Cookies from 'js-cookie';
import { TOKEN_COOKIE_NAME } from '../../lib/constants';

export default function ChangePasswordForm() {
  const [authProvider, setAuthProvider] = useState<
    'email' | 'google' | 'github' | null
  >(null);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newPasswordConfirmation, setNewPasswordConfirmation] = useState('');
  const [message, setMessage] = useState<{
    type: 'error' | 'success' | 'info';
    message: string;
  }>();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: Event) => {
    e.preventDefault();
    setIsLoading(true);

    if (newPassword !== newPasswordConfirmation) {
      setMessage({
        type: 'error',
        message: 'Passwords do not match',
      });
      setIsLoading(false);
      return;
    }

    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append(
      'Cookie',
      `${TOKEN_COOKIE_NAME}=${Cookies.get(TOKEN_COOKIE_NAME)}`
    );

    fetch('http://localhost:8080/v1-update-password', {
      method: 'POST',
      credentials: 'include',
      headers,
      body: JSON.stringify({
        oldPassword: authProvider === 'email' ? currentPassword : 'social-auth',
        password: newPassword,
        confirmPassword: newPasswordConfirmation,
      }),
    })
      .then(async (res) => {
        const json = await res.json();
        if (res.ok) {
          return json;
        } else {
          throw new Error(json.message);
        }
      })
      .then((data) => {
        setIsLoading(false);
        setCurrentPassword('');
        setNewPassword('');
        setNewPasswordConfirmation('');
        fetchProfile();
        setMessage({
          type: 'success',
          message: 'Password updated successfully',
        });
      })
      .catch((err) => {
        setIsLoading(false);
        setMessage({
          type: 'error',
          message: err.message,
        });
      });
  };

  const fetchProfile = useCallback(async () => {
    // Set the loading state
    setIsLoading(true);

    // Create headers with the cookie
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append(
      'Cookie',
      `${TOKEN_COOKIE_NAME}=${Cookies.get(TOKEN_COOKIE_NAME)}`
    );

    try {
      const res = await fetch('http://localhost:8080/v1-me', {
        method: 'POST',
        credentials: 'include',
        headers,
      });

      const json = await res.json();
      if (res.ok) {
        setAuthProvider(json.authProvider);
      } else {
        throw new Error(json.message);
      }
    } catch (error: any) {
      setMessage({
        type: 'error',
        message: error?.message || 'Something went wrong',
      });
    }
    setIsLoading(false);
  }, []);

  // Make a request to the backend to fill in the form with the current values
  useEffect(() => {
    fetchProfile();
  }, []);

  return (
    <form onSubmit={handleSubmit}>
      <h2 className="text-3xl font-bold sm:text-4xl">Password</h2>
      <p className="mt-2">Manage settings for your account passwords</p>
      <div className="mt-8 space-y-4">
        {authProvider === 'email' && (
          <div className="flex w-full flex-col">
            <label
              for="current-password"
              className="text-sm leading-none text-slate-500"
            >
              Current Password
            </label>
            <input
              type="password"
              name="current-password"
              id="current-password"
              className="mt-2 block w-full appearance-none rounded-lg border border-gray-300 px-3 py-2 shadow-sm outline-none transition duration-150 ease-in-out placeholder:text-gray-400 focus:ring-2 focus:ring-black focus:ring-offset-1"
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
            className="mt-2 block w-full appearance-none rounded-lg border border-gray-300 px-3 py-2 shadow-sm outline-none transition duration-150 ease-in-out placeholder:text-gray-400 focus:ring-2 focus:ring-black focus:ring-offset-1"
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
            New Password Confirm
          </label>
          <input
            type="password"
            name="new-password-confirmation"
            id="new-password-confirmation"
            className="mt-2 block w-full appearance-none rounded-lg border border-gray-300 px-3 py-2 shadow-sm outline-none transition duration-150 ease-in-out placeholder:text-gray-400 focus:ring-2 focus:ring-black focus:ring-offset-1"
            required
            minLength={6}
            placeholder="New password confirm"
            value={newPasswordConfirmation}
            onInput={(e) =>
              setNewPasswordConfirmation((e.target as HTMLInputElement).value)
            }
          />
        </div>

        {message && (
          <div
            className={`mt-2 rounded-lg p-2 ${
              message.type === 'error'
                ? 'bg-red-100 text-red-700'
                : message.type === 'success'
                ? 'bg-green-100 text-green-700'
                : 'bg-blue-100 text-blue-700'
            }`}
          >
            {message.message}
          </div>
        )}

        <button
          className="!mt-5 inline-flex h-10 min-w-[120px] items-center justify-center rounded-lg border border-slate-300 bg-black p-2 px-4 text-sm font-medium text-white outline-none transition duration-150 ease-in-out focus:ring-2 focus:ring-black focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-60"
          type="submit"
          disabled={isLoading}
        >
          {isLoading ? (
            <svg
              class={`h-5 w-5 animate-spin text-white`}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                class="stroke-[4px] opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
              ></circle>
              <path
                class="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
          ) : (
            'Change'
          )}
        </button>
      </div>
    </form>
  );
}
