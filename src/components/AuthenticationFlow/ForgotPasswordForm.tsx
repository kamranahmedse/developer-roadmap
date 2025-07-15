import { type FormEvent, useState } from 'react';
import { httpPost } from '../../lib/http';

export function ForgotPasswordForm() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    const { response, error } = await httpPost(
      `${import.meta.env.PUBLIC_API_URL}/v1-forgot-password`,
      {
        email,
      }
    );

    setIsLoading(false);
    if (error) {
      setError(error.message);
    } else {
      setEmail('');
      setSuccess('Check your email for a link to reset your password.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <input
        type="email"
        name="email"
        className="mt-2 block w-full appearance-none rounded-lg border border-gray-300 px-3 py-2 shadow-xs outline-hidden transition duration-150 ease-in-out placeholder:text-gray-400 focus:ring-2 focus:ring-black focus:ring-offset-1"
        required
        placeholder="Email Address"
        value={email}
        onInput={(e) => setEmail((e.target as HTMLInputElement).value)}
      />

      {error && (
        <p className="mt-2 rounded-lg bg-red-100 p-2 text-sm text-red-700">
          {error}
        </p>
      )}

      {success && (
        <p className="mt-2 rounded-lg bg-green-100 p-2 text-sm text-green-700">
          {success}
        </p>
      )}

      <button
        type="submit"
        disabled={isLoading}
        className="mt-3 inline-flex w-full items-center justify-center rounded-lg bg-black p-2 py-3 text-sm font-medium text-white outline-hidden focus:ring-2 focus:ring-black focus:ring-offset-1 disabled:bg-gray-400"
      >
        {isLoading ? 'Please wait...' : 'Continue'}
      </button>
    </form>
  );
}
