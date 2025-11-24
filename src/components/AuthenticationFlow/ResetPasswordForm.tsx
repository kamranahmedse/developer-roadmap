import { type FormEvent, useEffect, useState } from 'react';
import { httpPost } from '../../lib/http';
import Cookies from 'js-cookie';
import { TOKEN_COOKIE_NAME, setAuthToken } from '../../lib/jwt';

export function ResetPasswordForm() {
  const [code, setCode] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');

    if (!code) {
      window.location.href = '/login';
    } else {
      setCode(code);
    }
  }, []);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    if (password !== passwordConfirm) {
      setIsLoading(false);
      setError('Passwords do not match.');
      return;
    }

    const { response, error } = await httpPost(
      `${import.meta.env.PUBLIC_API_URL}/v1-reset-forgotten-password`,
      {
        newPassword: password,
        confirmPassword: passwordConfirm,
        code,
      },
    );

    if (error?.message) {
      setIsLoading(false);
      setError(error.message);
      return;
    }

    if (!response?.token) {
      setIsLoading(false);
      setError('Something went wrong. Please try again later.');
      return;
    }

    const token = response.token;
    setAuthToken(response.token);
    window.location.href = '/';
  };

  return (
    <form className="mx-auto w-full" onSubmit={handleSubmit}>
      <input
        type="password"
        className="mb-2 mt-2 block w-full appearance-none rounded-lg border border-gray-300 px-3 py-2 shadow-xs outline-hidden transition duration-150 ease-in-out placeholder:text-gray-400 focus:ring-2 focus:ring-black focus:ring-offset-1"
        required
        minLength={6}
        placeholder="New Password"
        value={password}
        onInput={(e) => setPassword((e.target as HTMLInputElement).value)}
      />

      <input
        type="password"
        className="mt-2 block w-full appearance-none rounded-lg border border-gray-300 px-3 py-2 shadow-xs outline-hidden transition duration-150 ease-in-out placeholder:text-gray-400 focus:ring-2 focus:ring-black focus:ring-offset-1"
        required
        minLength={6}
        placeholder="Confirm New Password"
        value={passwordConfirm}
        onInput={(e) =>
          setPasswordConfirm((e.target as HTMLInputElement).value)
        }
      />

      {error && (
        <p className="mt-2 rounded-lg bg-red-100 p-2 text-red-700">{error}</p>
      )}

      <button
        type="submit"
        disabled={isLoading}
        className="mt-2 inline-flex w-full items-center justify-center rounded-lg bg-black p-2 py-3 text-sm font-medium text-white outline-hidden focus:ring-2 focus:ring-black focus:ring-offset-1 disabled:bg-gray-400"
      >
        {isLoading ? 'Please wait...' : 'Reset Password'}
      </button>
    </form>
  );
}
