import { type FormEvent, useState } from 'react';
import { httpPatch } from '../../lib/http';
import { pageProgressMessage } from '../../stores/page';
import { useToast } from '../../hooks/use-toast';
import { cn } from '../../lib/classname';

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

  const isEmailProvider = authProvider === 'email';
  if (!isEmailProvider) {
    return (
      <div className="block">
        <h2 className="text-xl font-bold sm:text-2xl">Update Email</h2>
        <p className="mt-2 text-gray-400">
          You're using a social login provider. To update your email, please
          update your password first.
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
            className="mt-2 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm outline-none placeholder:text-gray-400 focus:ring-2 focus:ring-black focus:ring-offset-1"
            required
            disabled
            value={currentEmail}
          />
        </div>
        <div className="flex w-full flex-col">
          <label
            htmlFor="new-email"
            className="text-sm leading-none text-slate-500"
          >
            New Email
          </label>
          <input
            type="email"
            name="new-email"
            id="new-email"
            autoComplete={'new-email'}
            className="mt-2 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm outline-none placeholder:text-gray-400 focus:ring-2 focus:ring-black focus:ring-offset-1"
            required
            placeholder="Enter new email"
            value={newEmail}
            onChange={(e) => setNewEmail(e.target.value)}
            disabled={isSubmitted}
          />
        </div>

        <button
          type="submit"
          disabled={
            isLoading || !newEmail || !newEmail.includes('@') || isSubmitted
          }
          className={cn(
            'inline-flex w-full items-center justify-center rounded-lg bg-black p-2 py-3 text-sm font-medium text-white outline-none focus:ring-2 focus:ring-black focus:ring-offset-1 disabled:bg-gray-400',
            isSubmitted && 'hidden',
          )}
        >
          {isLoading ? 'Please wait...' : 'Send Verification Code'}
        </button>
      </form>
      {isSubmitted && (
        <div className="mt-4 space-y-4">
          <p className="text-gray-400">
            A verification code has been sent to your email. Please check your
            inbox and verify your new email.
          </p>
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={handleCancelEmailVerification}
              disabled={isLoading}
              className="inline-flex items-center justify-center rounded-lg border-2 border-black p-2 py-3 text-sm font-medium outline-none transition-colors hover:bg-black hover:text-white focus:ring-2 focus:ring-black focus:ring-offset-1 disabled:bg-gray-400"
            >
              {isLoading ? 'Please wait...' : 'Cancel'}
            </button>
            <button
              onClick={handleResendVerificationCode}
              disabled={isLoading || isResendDone}
              className="inline-flex items-center justify-center rounded-lg bg-black p-2 py-3 text-sm font-medium text-white outline-none hover:opacity-90 focus:ring-2 focus:ring-black focus:ring-offset-1 disabled:bg-gray-400"
            >
              {isLoading ? 'Please wait...' : 'Resend Verification Code'}
            </button>
          </div>
        </div>
      )}
    </>
  );
}
