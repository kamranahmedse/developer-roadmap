import { type FormEvent, useState } from 'react';
import { httpPost } from '../../lib/http';
import { useToast } from '../../hooks/use-toast';

type UpdatePasswordFormProps = {
  authProvider: string;
};

export default function UpdatePasswordForm(props: UpdatePasswordFormProps) {
  const { authProvider } = props;

  const toast = useToast();

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newPasswordConfirmation, setNewPasswordConfirmation] = useState('');

  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    if (newPassword !== newPasswordConfirmation) {
      toast.error('Passwords do not match');
      setIsLoading(false);

      return;
    }

    const { response, error } = await httpPost(
      `${import.meta.env.PUBLIC_API_URL}/v1-update-password`,
      {
        oldPassword: authProvider === 'email' ? currentPassword : 'social-auth',
        password: newPassword,
        confirmPassword: newPasswordConfirmation,
      },
    );

    if (error || !response) {
      toast.error(error?.message || 'Something went wrong');
      setIsLoading(false);

      return;
    }

    setCurrentPassword('');
    setNewPassword('');
    setNewPasswordConfirmation('');
    toast.success('Password updated successfully');
    setIsLoading(false);
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-8 hidden md:block">
        <h2 className="text-3xl font-bold sm:text-4xl">Password</h2>
        <p className="mt-2 text-gray-400">
          Use the form below to update your password.
        </p>
      </div>
      <div className="space-y-4">
        {authProvider === 'email' && (
          <div className="flex w-full flex-col">
            <label
              htmlFor="current-password"
              className="text-sm leading-none text-slate-500"
            >
              Current Password
            </label>
            <input
              disabled={authProvider !== 'email'}
              type="password"
              name="current-password"
              id="current-password"
              autoComplete={'current-password'}
              className="mt-2 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-xs outline-hidden placeholder:text-gray-400 focus:ring-2 focus:ring-black focus:ring-offset-1 disabled:bg-gray-100"
              required
              minLength={6}
              placeholder="Current password"
              value={currentPassword}
              onInput={(e) =>
                setCurrentPassword((e.target as HTMLInputElement).value)
              }
            />
          </div>
        )}

        <div className="flex w-full flex-col">
          <label
            htmlFor="new-password"
            className="text-sm leading-none text-slate-500"
          >
            New Password
          </label>
          <input
            type="password"
            name="new-password"
            id="new-password"
            autoComplete={'new-password'}
            className="mt-2 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-xs outline-hidden placeholder:text-gray-400 focus:ring-2 focus:ring-black focus:ring-offset-1"
            required
            minLength={6}
            placeholder="New password"
            value={newPassword}
            onInput={(e) =>
              setNewPassword((e.target as HTMLInputElement).value)
            }
          />
        </div>
        <div className="flex w-full flex-col">
          <label
            htmlFor="new-password-confirmation"
            className="text-sm leading-none text-slate-500"
          >
            Confirm New Password
          </label>
          <input
            type="password"
            name="new-password-confirmation"
            id="new-password-confirmation"
            className="mt-2 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-xs outline-hidden placeholder:text-gray-400 focus:ring-2 focus:ring-black focus:ring-offset-1"
            autoComplete={'new-password'}
            required
            minLength={6}
            placeholder="Confirm New Password"
            value={newPasswordConfirmation}
            onInput={(e) =>
              setNewPasswordConfirmation((e.target as HTMLInputElement).value)
            }
          />
        </div>

        <button
          type="submit"
          disabled={
            isLoading || !newPassword || newPassword !== newPasswordConfirmation
          }
          className="inline-flex w-full items-center justify-center rounded-lg bg-black p-2 py-3 text-sm font-medium text-white outline-hidden focus:ring-2 focus:ring-black focus:ring-offset-1 disabled:bg-gray-400"
        >
          {isLoading ? 'Please wait...' : 'Update Password'}
        </button>
      </div>
    </form>
  );
}
