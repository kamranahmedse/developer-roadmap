import { type FormEvent, useEffect, useState } from 'react';
import { httpPost } from '../../lib/http';
import { deleteUrlParam, getUrlParams } from '../../lib/browser';
import { isLoggedIn, setAIReferralCode } from '../../lib/jwt';

type EmailSignupFormProps = {
  isDisabled?: boolean;
  setIsDisabled?: (isDisabled: boolean) => void;
};

export function EmailSignupForm(props: EmailSignupFormProps) {
  const { isDisabled, setIsDisabled } = props;

  const { rc: referralCode } = getUrlParams() as {
    rc?: string;
  };
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsLoading(true);
    setIsDisabled?.(true);
    setError('');

    const { response, error } = await httpPost<{ status: 'ok' }>(
      `${import.meta.env.PUBLIC_API_URL}/v1-register`,
      {
        email,
        password,
        name,
      },
    );

    if (error || response?.status !== 'ok') {
      setIsLoading(false);
      setIsDisabled?.(false);
      setError(
        error?.message || 'Something went wrong. Please try again later.',
      );

      return;
    }

    window.location.href = `/verification-pending?email=${encodeURIComponent(
      email,
    )}`;
  };

  useEffect(() => {
    if (!referralCode || isLoggedIn()) {
      deleteUrlParam('rc');
      return;
    }

    setAIReferralCode(referralCode);
    deleteUrlParam('rc');
  }, []);

  return (
    <form className="flex w-full flex-col gap-2" onSubmit={onSubmit}>
      <label htmlFor="name" className="sr-only">
        Name
      </label>
      <input
        name="name"
        type="text"
        autoComplete="name"
        min={3}
        max={50}
        required
        className="block w-full rounded-lg border border-gray-300 px-3 py-2 outline-none placeholder:text-gray-400 focus:ring-2 focus:ring-black focus:ring-offset-1"
        placeholder="Full Name"
        value={name}
        onInput={(e) => setName(String((e.target as any).value))}
      />
      <label htmlFor="email" className="sr-only">
        Email address
      </label>
      <input
        name="email"
        type="email"
        autoComplete="email"
        required
        className="block w-full rounded-lg border border-gray-300 px-3 py-2 outline-none placeholder:text-gray-400 focus:ring-2 focus:ring-black focus:ring-offset-1"
        placeholder="Email Address"
        value={email}
        onInput={(e) => setEmail(String((e.target as any).value))}
      />
      <label htmlFor="password" className="sr-only">
        Password
      </label>
      <input
        name="password"
        type="password"
        autoComplete="current-password"
        min={6}
        max={50}
        required
        className="block w-full rounded-lg border border-gray-300 px-3 py-2 outline-none placeholder:text-gray-400 focus:ring-2 focus:ring-black focus:ring-offset-1"
        placeholder="Password"
        value={password}
        onInput={(e) => setPassword(String((e.target as any).value))}
      />

      {error && (
        <p className="rounded-lg bg-red-100 p-2 text-red-700">{error}.</p>
      )}

      <button
        type="submit"
        disabled={isLoading || isDisabled}
        className="inline-flex w-full items-center justify-center rounded-lg bg-black p-2 py-3 text-sm font-medium text-white outline-none focus:ring-2 focus:ring-black focus:ring-offset-1 disabled:bg-gray-400"
      >
        {isLoading ? 'Please wait...' : 'Continue to Verify Email'}
      </button>
    </form>
  );
}
