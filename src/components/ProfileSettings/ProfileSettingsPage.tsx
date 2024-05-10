import { useEffect, useState } from 'react';
import { UpdateEmailForm } from '../UpdateEmail/UpdateEmailForm';
import UpdatePasswordForm from '../UpdatePassword/UpdatePasswordForm';
import { pageProgressMessage } from '../../stores/page';
import { httpGet } from '../../lib/http';
import { useToast } from '../../hooks/use-toast';

export function ProfileSettingsPage() {
  const toast = useToast();

  const [authProvider, setAuthProvider] = useState('');
  const [currentEmail, setCurrentEmail] = useState('');
  const [newEmail, setNewEmail] = useState('');

  const loadProfile = async () => {
    const { error, response } = await httpGet(
      `${import.meta.env.PUBLIC_API_URL}/v1-me`,
    );

    if (error || !response) {
      toast.error(error?.message || 'Something went wrong');

      return;
    }

    const { authProvider, email, newEmail } = response;
    setAuthProvider(authProvider);
    setCurrentEmail(email);
    setNewEmail(newEmail || '');
  };

  useEffect(() => {
    loadProfile().finally(() => {
      pageProgressMessage.set('');
    });
  }, []);

  return (
    <>
      <UpdatePasswordForm authProvider={authProvider} />
      <hr className="my-8" />
      <UpdateEmailForm
        authProvider={authProvider}
        currentEmail={currentEmail}
        newEmail={newEmail}
        key={newEmail}
        onSendVerificationCode={(newEmail) => {
          setNewEmail(newEmail);
          loadProfile().finally(() => {});
        }}
        onVerificationCancel={() => {
          loadProfile().finally(() => {});
        }}
      />
    </>
  );
}
