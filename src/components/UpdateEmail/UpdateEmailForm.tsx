import { type FormEvent, useState } from 'react';
import { httpPatch } from '../../lib/http';
import { pageProgressMessage } from '../../stores/page';
import { useToast } from '../../hooks/use-toast';
import { cn } from '../../lib/classname';
import { ArrowUpRight, X } from 'lucide-react';

type UpdateEmailFormProps = {
  authProvider: string;
  currentEmail: string;
  newEmail?: string;
  onSendVerificationCode?: (newEmail: string) => void;
  onVerificationCancel?: () => void;
};

export function UpdateEmailForm(props: UpdateEmailFormProps) {
  const {
    authProvider,
    currentEmail,
    newEmail: defaultNewEmail = '',
    onSendVerificationCode,
    onVerificationCancel,
  } = props;
  const toast = useToast();

  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(defaultNewEmail !== '');
  const [newEmail, setNewEmail] = useState(defaultNewEmail);
  const [isResendDone, setIsResendDone] = useState(false);

  const handleSentVerificationCode = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!newEmail || !newEmail.includes('@') || isSubmitted) {
      return;
    }

    setIsLoading(true);
    pageProgressMessage.set('Sending verification code');
    const { response, error } = await httpPatch(
      `${import.meta.env.PUBLIC_API_URL}/v1-update-user-email`,
      { email: newEmail },
    );

    if (error || !response) {
      toast.error(error?.message || 'Something went wrong');
      setIsLoading(false);
      pageProgressMessage.set('');

      return;
    }

    pageProgressMessage.set('');
    setIsLoading(false);
    setIsSubmitted(true);
    onSendVerificationCode?.(newEmail);
  };

  const handleResendVerificationCode = async () => {
    if (isResendDone) {
      toast.error('You have already resent the verification code');
      return;
    }

    setIsLoading(true);
    pageProgressMessage.set('Resending verification code');
    const { response, error } = await httpPatch(
      `${import.meta.env.PUBLIC_API_URL}/v1-resend-email-verification-code`,
      { email: newEmail },
    );

    if (error || !response) {
      toast.error(error?.message || 'Something went wrong');
      setIsLoading(false);
      pageProgressMessage.set('');

      return;
    }

    toast.success('Verification code has been resent');
    pageProgressMessage.set('');
    setIsResendDone(true);
    setIsLoading(false);
  };

  const handleCancelEmailVerification = async () => {
    setIsLoading(true);
    pageProgressMessage.set('Cancelling email verification');
    const { response, error } = await httpPatch(
      `${import.meta.env.PUBLIC_API_URL}/v1-cancel-email-verification`,
      {},
    );

    if (error || !response) {
      toast.error(error?.message || 'Something went wrong');
      setIsLoading(false);
      pageProgressMessage.set('');

      return;
    }

    pageProgressMessage.set('');
    onVerificationCancel?.();
    setIsSubmitted(false);
    setNewEmail('');
    setIsLoading(false);
  };

  if (authProvider && authProvider !== 'email') {
    return (
      <div className="block">
        <h2 className="text-xl font-bold sm:text-2xl">Update Email</h2>
        <p className="mt-2 text-gray-400">
          You have used {authProvider} when signing up. Please set your password
          first.
        </p>

        <div className="mt-4 flex w-full flex-col">
          <label
            htmlFor="current-email"
            className="text-sm leading-none text-slate-500"
          >
            Current Email
          </label>
          <input
            type="email"
            name="current-email"
            id="current-email"
            autoComplete="current-email"
            className="mt-2 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-xs outline-hidden placeholder:text-gray-400 focus:ring-2 focus:ring-black focus:ring-offset-1"
            required
            disabled
            value={currentEmail}
          />
        </div>
        <p className="mt-3 rounded-lg border border-red-600 px-2 py-1 text-red-600">
          Please set your password first to update your email.
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="mb-8 block">
        <h2 className="text-xl font-bold sm:text-2xl">Update Email</h2>
        <p className="mt-2 text-gray-400">
          Use the form below to update your email.
        </p>
      </div>

      <form onSubmit={handleSentVerificationCode} className="space-y-4">
        <div className="flex w-full flex-col">
          <label
            htmlFor="current-email"
            className="text-sm leading-none text-slate-500"
          >
            Current Email
          </label>
          <input
            type="email"
            name="current-email"
            id="current-email"
            autoComplete="current-email"
            className="mt-2 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-xs outline-hidden placeholder:text-gray-400 focus:ring-2 focus:ring-black focus:ring-offset-1"
            required
            disabled
            value={currentEmail}
          />
        </div>
        <div
          className={cn('flex w-full flex-col', {
            'rounded-lg border border-green-500 p-3': isSubmitted,
          })}
        >
          <div className="flex items-center justify-between gap-2">
            <label
              htmlFor="new-email"
              className="text-sm leading-none text-slate-500"
            >
              New Email
            </label>

            {isSubmitted && (
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleResendVerificationCode}
                  disabled={isLoading || isResendDone}
                  className="flex items-center gap-1 text-sm font-medium leading-none text-green-600 transition-colors hover:text-green-700"
                >
                  <span className="hidden sm:block">
                    Resend Verification Link
                  </span>
                  <span className="sm:hidden">Resend Code</span>
                </button>
              </div>
            )}
          </div>
          <input
            type="email"
            name="new-email"
            id="new-email"
            autoComplete={'new-email'}
            className="mt-2 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-xs outline-hidden placeholder:text-gray-400 focus:ring-2 focus:ring-black focus:ring-offset-1"
            required
            placeholder="Enter new email"
            value={newEmail}
            onChange={(e) => setNewEmail(e.target.value)}
            disabled={isSubmitted}
          />
          {!isSubmitted && (
            <button
              type="submit"
              disabled={
                isLoading || !newEmail || !newEmail.includes('@') || isSubmitted
              }
              className="mt-3 inline-flex w-full items-center justify-center rounded-lg bg-black p-2 py-3 text-sm font-medium text-white outline-hidden focus:ring-2 focus:ring-black focus:ring-offset-1 disabled:bg-gray-400"
            >
              {isLoading ? 'Please wait...' : 'Send Verification Link'}
            </button>
          )}
          {isSubmitted && (
            <>
              <button
                type="button"
                onClick={handleCancelEmailVerification}
                disabled={isLoading}
                className="font-regular mt-4 w-full rounded-lg border border-red-600 py-2 text-sm text-red-600 outline-hidden transition-colors hover:bg-red-500 hover:text-white focus:ring-2 focus:ring-red-500 focus:ring-offset-1"
              >
                Cancel Update
              </button>
              <div className="mt-3 flex items-center gap-2 rounded-lg bg-green-100 p-4">
                <span className="text-sm text-green-800">
                  A verification link has been sent to your{' '}
                  <span>new email address</span>. Please follow the instructions
                  in email to verify and update your email.
                </span>
              </div>
            </>
          )}
        </div>
      </form>
    </>
  );
}
