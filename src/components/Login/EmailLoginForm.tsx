import Cookies from 'js-cookie';
import type { FunctionComponent } from 'preact';
import { useState } from 'preact/hooks';
import { TOKEN_COOKIE_NAME } from '../../lib/constants';

const EmailLoginForm: FunctionComponent<{}> = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<{
    type: 'success' | 'error' | 'verification' | 'warning';
    message: string;
  } | null>(null);

  const handleFormSubmit = async (e: Event) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage(null);
    // Check if the verification-email-sent-at is less than 5 seconds ago
    const verificationEmailSentAt = localStorage.getItem(
      'verification-email-sent-at'
    );

    if (verificationEmailSentAt) {
      const now = new Date();
      if (Number(verificationEmailSentAt) > now.getTime()) {
        setIsLoading(false);
        setEmail('');
        setPassword('');
        return setMessage({
          type: 'error',
          message: 'Please wait before sending another verification email.',
        });
      }
    }

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
      setIsLoading(false);
      return setMessage({
        type: 'verification',
        message:
          'Your account is not verified. Please click the verification link in your email. Or resend verification email.',
      });
    }

    if (json.token) {
      // If the response is ok, we'll set the token in a cookie
      Cookies.set(TOKEN_COOKIE_NAME, json.token);
      window.location.href = '/';
    } else {
      setMessage({
        type: 'error',
        message: json.message,
      });
    }

    setIsLoading(false);
  };

  const handleResendVerificationEmail = async () => {
    setIsLoading(true);
    // Check if the verification-email-sent-at is less than 5 seconds ago
    const verificationEmailSentAt = localStorage.getItem(
      'verification-email-sent-at'
    );

    if (verificationEmailSentAt) {
      const now = new Date();
      if (Number(verificationEmailSentAt) > now.getTime()) {
        setIsLoading(false);
        return setMessage({
          type: 'error',
          message: 'Please wait before sending another verification email.',
        });
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
      return setMessage({
        type: 'error',
        message: json.message,
      });
    }
    // If the response is ok, we'll set the token in a cookie
    setEmail('');
    setPassword('');
    setMessage({
      type: 'success',
      message: 'Verification instructions have been sent to your email.',
    });

    // Current time + 5 seconds, save it to localStorage
    const now = new Date();
    const time = now.getTime();
    const expireTime = time + 5000;
    now.setTime(expireTime);
    localStorage.setItem(
      'verification-email-sent-at',
      now.getTime().toString()
    );

    setIsLoading(false);
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
        placeholder="john@example.com"
        value={email}
        onInput={(e) => setEmail(String((e.target as any).value))}
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
        onInput={(e) => setPassword(String((e.target as any).value))}
      />

      {message && (
        <>
          {message.type === 'verification' ? (
            <div className="mt-2 rounded-lg bg-yellow-100 p-2 text-sm text-yellow-800">
              Your account is not verified. Please click the verification link
              in your email. Or{' '}
              <button
                type="button"
                className="font-semibold text-yellow-900 hover:text-yellow-800"
                onClick={handleResendVerificationEmail}
              >
                resend verification email.
              </button>
            </div>
          ) : (
            <div
              className={`mt-2 rounded-lg p-2 ${
                message.type === 'success' && 'bg-green-100 text-green-800'
              } ${message.type === 'error' && 'bg-red-100 text-red-800'} ${
                message.type === 'warning' && 'bg-yellow-100 text-yellow-800'
              }`}
            >
              {message.message}
            </div>
          )}
        </>
      )}

      <button
        disabled={isLoading || !email || !password}
        type="submit"
        className="mt-3 inline-flex h-10 w-full items-center justify-center rounded-lg border border-slate-300 bg-black p-2 text-sm font-medium text-white outline-none transition duration-150 ease-in-out focus:ring-2 focus:ring-black focus:ring-offset-1 disabled:opacity-60"
      >
        Continue
      </button>
    </form>
  );
};

export default EmailLoginForm;
