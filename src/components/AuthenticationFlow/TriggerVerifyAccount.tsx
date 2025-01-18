import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { httpPost } from '../../lib/http';
import { TOKEN_COOKIE_NAME, setAuthToken } from '../../lib/jwt';
import { Spinner } from '../ReactIcons/Spinner';
import { ErrorIcon2 } from '../ReactIcons/ErrorIcon2';
import { triggerUtmRegistration } from '../../lib/browser.ts';

export const FIRST_LOGIN_TAG = 'fl' as const;

export function TriggerVerifyAccount() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  const triggerVerify = (code: string) => {
    setIsLoading(true);

    httpPost<{ token: string; isNewUser: boolean }>(
      `${import.meta.env.PUBLIC_API_URL}/v1-verify-account`,
      {
        code,
      },
    )
      .then(({ response, error }) => {
        if (!response?.token) {
          setError(error?.message || 'Something went wrong. Please try again.');
          setIsLoading(false);

          return;
        }

        triggerUtmRegistration();

        setAuthToken(response.token);

        const url = new URL('/', window.location.origin);
        if (response?.isNewUser) {
          url.searchParams.set(FIRST_LOGIN_TAG, '1');
        }
        window.location.href = url.toString();
      })
      .catch((err) => {
        setIsLoading(false);
        setError('Something went wrong. Please try again.');
      });
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code')!;

    if (!code) {
      setIsLoading(false);
      setError('Something went wrong. Please try again later.');
      return;
    }

    triggerVerify(code);
  }, []);

  return (
    <div className="mx-auto flex max-w-md flex-col items-center pt-0 sm:pt-12">
      <div className="mx-auto max-w-md text-center">
        {isLoading && <Spinner className="mx-auto h-16 w-16" />}
        {error && <ErrorIcon2 className="mx-auto h-16 w-16" />}
        <h2 className="mb-1 mt-4 text-center text-xl font-semibold sm:mb-3 sm:mt-4 sm:text-2xl">
          Verifying your account
        </h2>
        <div className="text-sm sm:text-base">
          {isLoading && <p>Please wait while we verify your account..</p>}
          {error && <p className="text-red-700">{error}</p>}
        </div>
      </div>
    </div>
  );
}
