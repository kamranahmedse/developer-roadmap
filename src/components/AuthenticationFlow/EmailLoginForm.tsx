import Cookies from 'js-cookie';
import type { FunctionComponent } from 'preact';
import { useState } from 'preact/hooks';
import { TOKEN_COOKIE_NAME } from '../../lib/constants';
import Spinner from '../Spinner';

const EmailLoginForm: FunctionComponent<{}> = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState('');

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleFormSubmit = async (e: Event) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    const res = await fetch('http://localhost:8080/v1-login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const json = await res.json();

    if (json.type === 'user_not_verified') {
      window.location.href = `/verification-pending?email=${encodeURIComponent(
        email
      )}`;
      return;
    }

    if (!json.token) {
      setIsLoading(false);
      setError(json.message || 'Something went wrong. Please try again later.');

      return;
    }

    // If the response is ok, we'll set the token in a cookie
    Cookies.set(TOKEN_COOKIE_NAME, json.token);
    window.location.href = '/';
  };

  return (
    <form className="w-full" onSubmit={handleFormSubmit}>
      <label htmlFor="email" className="sr-only">
        Email address
      </label>
      <input
        name="email"
        type="email"
        autoComplete="email"
        required
        className="block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm outline-none placeholder:text-gray-400 focus:ring-2 focus:ring-black focus:ring-offset-1"
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
        required
        className="mt-2 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm outline-none placeholder:text-gray-400 focus:ring-2 focus:ring-black focus:ring-offset-1"
        placeholder="Password"
        value={password}
        onInput={(e) => setPassword(String((e.target as any).value))}
      />

      <p class="mb-3 mt-2 text-sm text-gray-500">
        <a
          href="/forgot-password"
          className="text-blue-800 hover:text-blue-600"
        >
          Reset your password?
        </a>
      </p>

      {error && <p className="bg-red-100 text-red-800">{error}</p>}

      <button
        type="submit"
        disabled={isLoading}
        className="inline-flex w-full items-center justify-center rounded-lg bg-black p-2 py-3 text-sm font-medium text-white outline-none focus:ring-2 focus:ring-black focus:ring-offset-1 disabled:bg-gray-400"
      >
        {isLoading ? 'Please wait...' : 'Continue'}
      </button>
    </form>
  );
};

export default EmailLoginForm;
