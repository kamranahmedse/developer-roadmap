import { useEffect, useState } from 'react';
import { Modal } from '../Modal';
import { GitHubButton } from './GitHubButton';
import { GoogleButton } from './GoogleButton';
import { LinkedInButton } from './LinkedInButton';
import { EmailLoginForm } from './EmailLoginForm';
import { EmailSignupForm } from './EmailSignupForm';

type CourseLoginPopupProps = {
  onClose: () => void;
  checkoutAfterLogin?: boolean;
};

export const CHECKOUT_AFTER_LOGIN_KEY = 'checkoutAfterLogin';

export function CourseLoginPopup(props: CourseLoginPopupProps) {
  const { onClose: parentOnClose, checkoutAfterLogin = true } = props;

  const [isDisabled, setIsDisabled] = useState(false);
  const [isUsingEmail, setIsUsingEmail] = useState(false);

  const [emailNature, setEmailNature] = useState<'login' | 'signup' | null>(
    null,
  );

  function onClose() {
    // if user didn't login and closed the popup, we remove the checkoutAfterLogin flag
    // so that login from other buttons on course page will trigger purchase
    localStorage.removeItem(CHECKOUT_AFTER_LOGIN_KEY);
    parentOnClose();
  }

  useEffect(() => {
    localStorage.setItem(
      CHECKOUT_AFTER_LOGIN_KEY,
      checkoutAfterLogin ? '1' : '0',
    );
  }, [checkoutAfterLogin]);

  if (emailNature) {
    const emailHeader = (
      <div className="mb-7 text-center">
        <p className="mb-3.5 pt-2 text-2xl font-semibold leading-5 text-slate-900">
          {emailNature === 'login'
            ? 'Login to your account'
            : 'Create an account'}
        </p>
        <p className="mt-2 text-sm leading-4 text-slate-600">
          Fill in the details below to continue
        </p>
      </div>
    );

    return (
      <Modal onClose={onClose} bodyClassName="p-5 h-auto">
        {emailHeader}
        {emailNature === 'login' && (
          <EmailLoginForm
            isDisabled={isDisabled}
            setIsDisabled={setIsDisabled}
          />
        )}
        {emailNature === 'signup' && (
          <EmailSignupForm
            isDisabled={isDisabled}
            setIsDisabled={setIsDisabled}
          />
        )}

        <button
          className="mt-2 w-full rounded-md border border-gray-400 py-2 text-center text-sm text-gray-600 hover:bg-gray-100"
          onClick={() => setEmailNature(null)}
        >
          Back to Options
        </button>
      </Modal>
    );
  }

  return (
    <Modal onClose={onClose} bodyClassName="p-5 h-auto">
      <div className="mb-7 text-center">
        <p className="mb-3.5 pt-2 text-2xl font-semibold leading-5 text-slate-900">
          Create or login to Enroll
        </p>
        <p className="mt-2 text-sm leading-4 text-slate-600">
          Login or sign up for an account to start learning
        </p>
      </div>

      <div className="flex w-full flex-col gap-2">
        <GitHubButton
          className="rounded-md border-gray-400 hover:bg-gray-100"
          isDisabled={isDisabled}
          setIsDisabled={setIsDisabled}
        />
        <GoogleButton
          className="rounded-md border-gray-400 hover:bg-gray-100"
          isDisabled={isDisabled}
          setIsDisabled={setIsDisabled}
        />
        <LinkedInButton
          className="rounded-md border-gray-400 hover:bg-gray-100"
          isDisabled={isDisabled}
          setIsDisabled={setIsDisabled}
        />
      </div>

      <div className="flex w-full items-center gap-4 py-6 text-sm text-gray-600">
        <div className="h-px w-full bg-gray-200" />
        OR
        <div className="h-px w-full bg-gray-200" />
      </div>

      <div className="flex flex-row gap-2">
        {!isUsingEmail && (
          <button
            className="flex-grow rounded-md border border-gray-400 px-4 py-2 text-sm text-gray-600 hover:bg-gray-100"
            onClick={() => setIsUsingEmail(true)}
          >
            Use your email address
          </button>
        )}
        {isUsingEmail && (
          <>
            <button
              className="flex-grow rounded-md border border-gray-400 px-4 py-2 text-sm text-gray-600 hover:bg-gray-100"
              onClick={() => setEmailNature('login')}
            >
              Already have an account
            </button>
            <button
              className="flex-grow rounded-md border border-gray-400 px-4 py-2 text-sm text-gray-600 hover:bg-gray-100"
              onClick={() => setEmailNature('signup')}
            >
              Create an account
            </button>
          </>
        )}
      </div>
    </Modal>
  );
}
