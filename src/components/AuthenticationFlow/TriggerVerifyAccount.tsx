import SpinnerIcon from '../../icons/spinner.svg';
import ErrorIcon from '../../icons/error.svg';

import { useEffect, useState } from 'preact/hooks';
import Cookies from 'js-cookie';
import {TOKEN_COOKIE_NAME} from "../../lib/jwt";

export function TriggerVerifyAccount() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  const triggerVerify = (code: string) => {
    setIsLoading(true);

    fetch(`${import.meta.env.PUBLIC_API_URL}/v1-verify-account`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        code,
      }),
    })
      .then((res) => res.json())
      .then((data: any) => {
        if (!data.token) {
          throw new Error('Something went wrong. Please try again..');
        }

        Cookies.set(TOKEN_COOKIE_NAME, data.token);
        window.location.href = '/';
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
        {isLoading && (
          <img
            alt={'Please wait.'}
            src={SpinnerIcon}
            class={'mx-auto h-16 w-16 animate-spin'}
          />
        )}
        {error && (
          <img
            alt={'Please wait.'}
            src={ErrorIcon}
            className={'mx-auto h-16 w-16'}
          />
        )}
        <h2 className="mb-1 mt-4 text-center text-xl font-semibold sm:mb-3 sm:mt-4 sm:text-2xl">
          Verifying your account
        </h2>
        <div className="text-sm sm:text-base">
          {isLoading && <p>Please wait while we verify your account..</p>}
          {error && <p class="text-red-700">{error}</p>}
        </div>
      </div>
    </div>
  );
}
