import { useState } from 'preact/hooks';
import Cookies from 'js-cookie';
import { TOKEN_COOKIE_NAME } from '../../lib/utils';

export default function ChangePasswordForm() {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newPasswordConfirmation, setNewPasswordConfirmation] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: Event) => {
    e.preventDefault();
    setIsLoading(true);

    if (newPassword !== newPasswordConfirmation) {
      setError('New password and confirmation do not match');
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
        oldPassword: currentPassword,
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
        setSuccessMessage('Password updated successfully');
      })
      .catch((err) => {
        setIsLoading(false);
        setError(err.message);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2 className="text-3xl font-bold sm:text-4xl">Password</h2>
      <p className="mt-2">Manage settings for your account passwords</p>
      <div className="mt-8 space-y-4">
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
            onChange={(e) =>
              setCurrentPassword((e.target as HTMLInputElement).value)
            }
          />
        </div>
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
            onChange={(e) =>
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
            onChange={(e) =>
              setNewPasswordConfirmation((e.target as HTMLInputElement).value)
            }
          />
        </div>

        {error && (
          <div className="text-sm font-medium text-red-500">
            <p>{error}</p>
          </div>
        )}

        {successMessage && (
          <div className="text-sm font-medium text-green-500">
            <p>{successMessage}</p>
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
