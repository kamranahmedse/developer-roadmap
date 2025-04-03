import { useEffect, useState } from 'react';
import {
  FIRST_LOGIN_PARAM, setAuthToken
} from '../../lib/jwt';
import { httpGet } from '../../lib/http';
import { COURSE_PURCHASE_PARAM } from '../../lib/jwt';
import { GoogleIcon } from '../ReactIcons/GoogleIcon.tsx';
import { Spinner } from '../ReactIcons/Spinner.tsx';
import { CHECKOUT_AFTER_LOGIN_KEY } from './CourseLoginPopup.tsx';
import {
  triggerUtmRegistration
} from '../../lib/browser.ts';
import { cn } from '../../lib/classname.ts';

type GoogleButtonProps = {
  isDisabled?: boolean;
  setIsDisabled?: (isDisabled: boolean) => void;
  className?: string;
};

const GOOGLE_REDIRECT_AT = 'googleRedirectAt';
const GOOGLE_LAST_PAGE = 'googleLastPage';

export function GoogleButton(props: GoogleButtonProps) {
  const { isDisabled, setIsDisabled, className } = props;

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    const state = urlParams.get('state');
    const provider = urlParams.get('provider');

    if (!code || !state || provider !== 'google') {
      return;
    }

    setIsLoading(true);
    setIsDisabled?.(true);
    httpGet<{ token: string; isNewUser: boolean }>(
      `${import.meta.env.PUBLIC_API_URL}/v1-google-callback${
        window.location.search
      }`,
    )
      .then(({ response, error }) => {
        if (!response?.token) {
          setError(error?.message || 'Something went wrong.');
          setIsLoading(false);
          setIsDisabled?.(false);

          return;
        }

        triggerUtmRegistration();

        let redirectUrl = new URL('/', window.location.origin);
        const googleRedirectAt = localStorage.getItem(GOOGLE_REDIRECT_AT);
        const lastPageBeforeGoogle = localStorage.getItem(GOOGLE_LAST_PAGE);

        // If the social redirect is there and less than 30 seconds old
        // redirect to the page that user was on before they clicked the github login button
        if (googleRedirectAt && lastPageBeforeGoogle) {
          const socialRedirectAtTime = parseInt(googleRedirectAt, 10);
          const now = Date.now();
          const timeSinceRedirect = now - socialRedirectAtTime;

          if (timeSinceRedirect < 30 * 1000) {
            redirectUrl = new URL(lastPageBeforeGoogle, window.location.origin);
          }
        }

        const authRedirectUrl = localStorage.getItem('authRedirect');
        if (authRedirectUrl) {
          localStorage.removeItem('authRedirect');
          redirectUrl = new URL(authRedirectUrl, window.location.origin);
        }

        redirectUrl.searchParams.set(
          FIRST_LOGIN_PARAM,
          response?.isNewUser ? '1' : '0',
        );

        const shouldTriggerPurchase =
          localStorage.getItem(CHECKOUT_AFTER_LOGIN_KEY) !== '0';
        if (
          redirectUrl.pathname.includes('/courses/sql') &&
          shouldTriggerPurchase
        ) {
          redirectUrl.searchParams.set(COURSE_PURCHASE_PARAM, '1');

          localStorage.removeItem(CHECKOUT_AFTER_LOGIN_KEY);
        }

        localStorage.removeItem(GOOGLE_REDIRECT_AT);
        localStorage.removeItem(GOOGLE_LAST_PAGE);
        setAuthToken(response.token);

        window.location.href = redirectUrl.toString();
      })
      .catch((err) => {
        setError('Something went wrong. Please try again later.');
        setIsLoading(false);
        setIsDisabled?.(false);
      });
  }, []);

  const handleClick = () => {
    setIsLoading(true);
    setIsDisabled?.(true);
    httpGet<{ loginUrl: string }>(
      `${import.meta.env.PUBLIC_API_URL}/v1-google-login`,
    )
      .then(({ response, error }) => {
        if (!response?.loginUrl) {
          setError(error?.message || 'Something went wrong.');
          setIsLoading(false);
          setIsDisabled?.(false);

          return;
        }

        // For non authentication pages, we want to redirect back to the page
        // the user was on before they clicked the social login button
        if (!['/login', '/signup'].includes(window.location.pathname)) {
          const pagePath = [
            '/respond-invite',
            '/befriend',
            '/r',
            '/ai-roadmaps',
          ].includes(window.location.pathname)
            ? window.location.pathname + window.location.search
            : window.location.pathname;

          localStorage.setItem(GOOGLE_REDIRECT_AT, Date.now().toString());
          localStorage.setItem(GOOGLE_LAST_PAGE, pagePath);
        }

        window.location.href = response.loginUrl;
      })
      .catch((err) => {
        setError('Something went wrong. Please try again later.');
        setIsLoading(false);
        setIsDisabled?.(false);
      });
  };

  return (
    <>
      <button
        className={cn(
          'inline-flex h-10 w-full items-center justify-center gap-2 rounded border border-slate-300 bg-white p-2 text-sm font-medium text-black outline-none hover:border-gray-400 hover:bg-gray-50 focus:ring-2 focus:ring-[#333] focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-60',
          className,
        )}
        disabled={isLoading || isDisabled}
        onClick={handleClick}
      >
        {isLoading ? (
          <Spinner className={'h-[18px] w-[18px]'} isDualRing={false} />
        ) : (
          <GoogleIcon className={'h-[18px] w-[18px]'} />
        )}
        Continue with Google
      </button>
      {error && (
        <p className="mb-2 mt-1 text-sm font-medium text-red-600">{error}</p>
      )}
    </>
  );
}
