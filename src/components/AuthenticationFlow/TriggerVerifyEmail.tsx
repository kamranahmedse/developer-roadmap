import { useEffect, useState } from 'react';
import { httpPatch } from '../../lib/http';
import { setAuthToken } from '../../lib/jwt';
import { Spinner } from '../ReactIcons/Spinner';
import { ErrorIcon2 } from '../ReactIcons/ErrorIcon2';
import { getUrlParams } from '../../lib/browser';
import { CheckIcon } from '../ReactIcons/CheckIcon';

export function TriggerVerifyEmail() {
  const { code } = getUrlParams() as { code: string };

  // const [isLoading, setIsLoading] = useState(true);
  const [status, setStatus] = useState<'loading' | 'error' | 'success'>(
    'loading',
  );
  const [error, setError] = useState('');

  const triggerVerify = (code: string) => {
    setStatus('loading');

    httpPatch<{ token: string }>(
      `${import.meta.env.PUBLIC_API_URL}/v1-verify-new-email/${code}`,
      {},
    )
      .then(({ response, error }) => {
        if (!response?.token) {
          setError(error?.message || 'Something went wrong. Please try again.');
          setStatus('error');

          return;
        }

        setAuthToken(response.token);
        setStatus('success');
      })
      .catch((err) => {
        setStatus('error');
        setError('Something went wrong. Please try again.');
      });
  };

  useEffect(() => {
    if (!code) {
      setStatus('error');
      setError('Something went wrong. Please try again later.');
      return;
    }

    triggerVerify(code);
  }, [code]);

  const isLoading = status === 'loading';
  if (status === 'success') {
    return (
      <div className="mx-auto flex max-w-md flex-col items-center pt-0 sm:pt-12">
        <CheckIcon additionalClasses={'h-16 w-16 opacity-100'} />
        <h2 className="mb-1 mt-4 text-center text-xl font-semibold sm:mb-3 sm:mt-4 sm:text-2xl">
          Email Update Successful
        </h2>
        <p className="text-sm sm:text-base">
          Your email has been changed successfully. Happy learning!
        </p>
      </div>
    );
  }

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
