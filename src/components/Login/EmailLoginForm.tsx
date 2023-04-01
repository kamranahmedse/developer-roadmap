import Cookies from 'js-cookie';
import type { FunctionComponent } from 'preact';
import { useState } from 'preact/hooks';
import { TOKEN_COOKIE_NAME } from '../../lib/utils';

const EmailLoginForm: FunctionComponent<{}> = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [showVerifiedError, setShowVerifiedError] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');

  const [error, setError] = useState<{
    message: string;
    status: number;
  } | null>(null);

  const handleFormSubmit = async (e: Event) => {
    e.preventDefault();
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

    // If the response isn't ok, we'll throw an error
    if (json.type === 'user_not_verified') {
      setError(null);
      setMessage('');
      setShowVerifiedError(true);
      return;
    } else {
      setShowVerifiedError(false);
    }

    if (json.token) {
      // If the response is ok, we'll set the token in a cookie
      Cookies.set(TOKEN_COOKIE_NAME, json.token);
      window.location.href = '/';
    } else {
      setError({
        message: json.message,
        status: res.status,
      });
    }
  };

  const handleResendVerificationEmail = async () => {
    // Check if the verification-email-sent-at is less than 5 seconds ago
    const verificationEmailSentAt = localStorage.getItem(
      'verification-email-sent-at'
    );

    if (verificationEmailSentAt) {
      const now = new Date();
      if (Number(verificationEmailSentAt) > now.getTime()) {
        setMessage('');
        setShowVerifiedError(false);
        setError({
          message: 'Please wait before sending another verification email.',
          status: 429,
        });
        return;
      }
    }

    const res = await fetch(
      'http://localhost:8080/v1-send-verification-email',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
        }),
      }
    );
    const json = await res.json();

    // If the response isn't ok, we'll throw an error
    if (!res.ok) {
      setError({
        message: json.message,
        status: res.status,
      });
    }

    // If the response is ok, we'll set the token in a cookie
    setShowVerifiedError(false);
    setMessage('Verification instructions have been sent to your email.');

    // Current time + 5 seconds, save it to localStorage
    const now = new Date();
    const time = now.getTime();
    const expireTime = time + 5000;
    now.setTime(expireTime);
    localStorage.setItem(
      'verification-email-sent-at',
      now.getTime().toString()
    );
  };

  return (
    <form className="w-full" onSubmit={handleFormSubmit}>
      <label htmlFor="email" className="sr-only">
        Email address
      </label>
      <input
        id="email"
        name="email"
        type="email"
        autoComplete="email"
        required
        className="block w-full appearance-none rounded-lg border border-gray-300 px-3 py-2 shadow-sm  outline-none transition duration-150 ease-in-out placeholder:text-gray-400 focus:ring-2 focus:ring-black focus:ring-offset-1"
        placeholder="Enter you email"
        value={email}
        onChange={(e) => setEmail(String((e.target as any).value))}
      />
      <label htmlFor="password" className="sr-only">
        Password
      </label>
      <input
        id="password"
        name="password"
        type="password"
        autoComplete="current-password"
        required
        className="mt-2 block w-full appearance-none rounded-lg border border-gray-300 px-3 py-2 shadow-sm  outline-none transition duration-150 ease-in-out placeholder:text-gray-400 focus:ring-2 focus:ring-black focus:ring-offset-1"
        placeholder="Enter you password"
        value={password}
        onChange={(e) => setPassword(String((e.target as any).value))}
      />

      {error && (
        <div className="mt-2 text-sm text-red-500">{error.message}</div>
      )}

      {message && <div className="mt-2 text-sm text-slate-600">{message}</div>}

      {showVerifiedError && (
        <div className="mt-2 text-sm text-slate-600">
          Your account is not verified. Please click the verification link in
          your email. Or{' '}
          <button
            type="button"
            className="text-blue-600 hover:text-blue-500"
            onClick={handleResendVerificationEmail}
          >
            resend verification email.
          </button>
        </div>
      )}

      <button
        type="submit"
        className="mt-3 inline-flex h-10 w-full items-center justify-center rounded-lg border border-slate-300 bg-black p-2 text-sm font-medium text-white outline-none transition duration-150 ease-in-out focus:ring-2 focus:ring-black focus:ring-offset-1 disabled:opacity-60"
      >
        Continue
      </button>
    </form>
  );
};

export default EmailLoginForm;
