import { useState } from 'preact/hooks';

export default function ResetPasswordForm() {
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{
    type: 'error' | 'success' | 'info';
    message: string;
  }>();

  const handleSubmit = async (e: Event) => {
    e.preventDefault();
    setIsLoading(true);

    if (password !== passwordConfirm) {
      setIsLoading(false);
      return setMessage({
        type: 'error',
        message: 'Passwords do not match.',
      });
    }

    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');

    const res = await fetch(
      'http://localhost:8080/v1-reset-forgotten-password',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          newPassword: password,
          confirmPassword: passwordConfirm,
          code,
        }),
      }
    );

    const data = await res.json();

    if (!res.ok) {
      setIsLoading(false);
      setMessage({
        type: 'error',
        message: data.message,
      });
      return;
    }

    setIsLoading(false);
    setPassword('');
    setPasswordConfirm('');
    setMessage({
      type: 'success',
      message: 'Your password has been reset.',
    });

    // TODO: Redirect to login page after 2 seconds
    setTimeout(() => {
      window.location.href = '/';
    }, 2000);
  };

  return (
    <form className="mx-auto max-w-md" onSubmit={handleSubmit}>
      <h2 className="mb-6 text-3xl font-bold sm:text-center sm:text-4xl">
        Reset your password
      </h2>

      <label
        for="new-password"
        className='text-sm leading-none text-slate-500 after:text-red-400 after:content-["*"]'
      >
        New Password
      </label>
      <input
        type="password"
        name="new-password"
        id="new-password"
        className="mt-2 mb-2 block w-full appearance-none rounded-lg border border-gray-300 px-3 py-2 shadow-sm outline-none transition duration-150 ease-in-out placeholder:text-gray-400 focus:ring-2 focus:ring-black focus:ring-offset-1"
        required
        minLength={6}
        placeholder="Enter a new password"
        value={password}
        onChange={(e) => setPassword((e.target as HTMLInputElement).value)}
      />

      <label
        for="new-password-confirm"
        className='text-sm leading-none text-slate-500 after:text-red-400 after:content-["*"]'
      >
        Confirm New Password
      </label>
      <input
        type="password"
        name="new-password-confirm"
        id="new-password-confirm"
        className="mt-2 block w-full appearance-none rounded-lg border border-gray-300 px-3 py-2 shadow-sm outline-none transition duration-150 ease-in-out placeholder:text-gray-400 focus:ring-2 focus:ring-black focus:ring-offset-1"
        required
        minLength={6}
        placeholder="Confirm your new password"
        value={passwordConfirm}
        onChange={(e) =>
          setPasswordConfirm((e.target as HTMLInputElement).value)
        }
      />

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
        type="submit"
        className="mt-5 inline-flex h-10 w-full items-center justify-center rounded-lg border border-slate-300 bg-black p-2 px-4 text-sm font-medium text-white outline-none transition duration-150 ease-in-out focus:ring-2 focus:ring-black focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isLoading ? (
          <svg
            className={`h-5 w-5 animate-spin text-white`}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="stroke-[4px] opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        ) : (
          'Reset my password'
        )}
      </button>
    </form>
  );
}
