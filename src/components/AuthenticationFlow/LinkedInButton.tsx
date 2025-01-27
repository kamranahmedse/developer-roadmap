import { useEffect, useState } from 'react';
import { cn } from '../../lib/classname.ts';
import { httpGet } from '../../lib/http';
import { COURSE_PURCHASE_PARAM, setAuthToken } from '../../lib/jwt';
import { LinkedInIcon } from '../ReactIcons/LinkedInIcon.tsx';
import { Spinner } from '../ReactIcons/Spinner.tsx';
import { CHECKOUT_AFTER_LOGIN_KEY } from './CourseLoginPopup.tsx';
import { triggerUtmRegistration } from '../../lib/browser.ts';

type LinkedInButtonProps = {
  isDisabled?: boolean;
  setIsDisabled?: (isDisabled: boolean) => void;
  className?: string;
};

const LINKEDIN_REDIRECT_AT = 'linkedInRedirectAt';
const LINKEDIN_LAST_PAGE = 'linkedInLastPage';

export function LinkedInButton(props: LinkedInButtonProps) {
  const { isDisabled, setIsDisabled, className } = props;

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    const state = urlParams.get('state');
    const provider = urlParams.get('provider');

    if (!code || !state || provider !== 'linkedin') {
      return;
    }

    setIsLoading(true);
    setIsDisabled?.(true);
    httpGet<{ token: string }>(
      `${import.meta.env.PUBLIC_API_URL}/v1-linkedin-callback${
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

        let redirectUrl = '/';
        const linkedInRedirectAt = localStorage.getItem(LINKEDIN_REDIRECT_AT);
        const lastPageBeforeLinkedIn = localStorage.getItem(LINKEDIN_LAST_PAGE);

        // If the social redirect is there and less than 30 seconds old
        // redirect to the page that user was on before they clicked the github login button
        if (linkedInRedirectAt && lastPageBeforeLinkedIn) {
          const socialRedirectAtTime = parseInt(linkedInRedirectAt, 10);
          const now = Date.now();
          const timeSinceRedirect = now - socialRedirectAtTime;

          if (timeSinceRedirect < 30 * 1000) {
            redirectUrl = lastPageBeforeLinkedIn;
          }
        }

        const authRedirectUrl = localStorage.getItem('authRedirect');
        if (authRedirectUrl) {
          localStorage.removeItem('authRedirect');
          redirectUrl = authRedirectUrl;
        }

        const shouldTriggerPurchase =
          localStorage.getItem(CHECKOUT_AFTER_LOGIN_KEY) !== '0';
        if (redirectUrl.includes('/courses/sql') && shouldTriggerPurchase) {
          const tempUrl = new URL(redirectUrl, window.location.origin);
          tempUrl.searchParams.set(COURSE_PURCHASE_PARAM, '1');
          redirectUrl = tempUrl.toString();

          localStorage.removeItem(CHECKOUT_AFTER_LOGIN_KEY);
        }

        localStorage.removeItem(LINKEDIN_REDIRECT_AT);
        localStorage.removeItem(LINKEDIN_LAST_PAGE);
        setAuthToken(response.token);
        window.location.href = redirectUrl;
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
      `${import.meta.env.PUBLIC_API_URL}/v1-linkedin-login`,
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
            '/ai',
          ].includes(window.location.pathname)
            ? window.location.pathname + window.location.search
            : window.location.pathname;

          localStorage.setItem(LINKEDIN_REDIRECT_AT, Date.now().toString());
          localStorage.setItem(LINKEDIN_LAST_PAGE, pagePath);
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
          'inline-flex h-10 w-full items-center justify-center gap-2 rounded border border-slate-300 bg-white p-2 text-sm font-medium text-black outline-none hover:border-gray-400 focus:ring-2 focus:ring-[#333] focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-60',
          className,
        )}
        disabled={isLoading || isDisabled}
        onClick={handleClick}
      >
        {isLoading ? (
          <Spinner className={'h-[18px] w-[18px]'} isDualRing={false} />
        ) : (
          <LinkedInIcon className={'h-[18px] w-[18px] text-blue-700'} />
        )}
        Continue with LinkedIn
      </button>
      {error && (
        <p className="mb-2 mt-1 text-sm font-medium text-red-600">{error}</p>
      )}
    </>
  );
}
