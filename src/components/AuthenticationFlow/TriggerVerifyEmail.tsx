import { useEffect, useState } from 'react';
import { httpPatch } from '../../lib/http';
import { setAuthToken } from '../../lib/jwt';
import { Spinner } from '../ReactIcons/Spinner';
import { ErrorIcon2 } from '../ReactIcons/ErrorIcon2';
import { getUrlParams } from '../../lib/browser';

export function TriggerVerifyEmail() {
  const { code } = getUrlParams() as { code: string };
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  const triggerVerify = (code: string) => {
    setIsLoading(true);

    httpPatch<{ token: string }>(
      `${import.meta.env.PUBLIC_API_URL}/v1-verify-new-email/${code}`,
      {},
    )
      .then(({ response, error }) => {
        if (!response?.token) {
          setError(error?.message || 'Something went wrong. Please try again.');
          setIsLoading(false);

          return;
        }

        setAuthToken(response.token);
        window.location.href = '/';
      })
      .catch((err) => {
        setIsLoading(false);
        setError('Something went wrong. Please try again.');
      });
  };

  useEffect(() => {
    if (!code) {
      setIsLoading(false);
      setError('Something went wrong. Please try again later.');
      return;
    }

    triggerVerify(code);
  }, [code]);

  return (
    <div className="mx-auto flex max-w-md flex-col items-center pt-0 sm:pt-12">
      <div className="mx-auto max-w-md text-center">
        {isLoading && <Spinner className="mx-auto h-16 w-16" />}
        {error && <ErrorIcon2 className="mx-auto h-16 w-16" />}
        <h2 className="mb-1 mt-4 text-center text-xl font-semibold sm:mb-3 sm:mt-4 sm:text-2xl">
          Verifying your new Email
        </h2>
        <div className="text-sm sm:text-base">
          {isLoading && <p>Please wait while we verify your new Email..</p>}
          {error && <p className="text-red-700">{error}</p>}
        </div>
      </div>
    </div>
  );
}
