import { useState } from 'react';
import { GitHubButton } from './GitHubButton';
import { GoogleButton } from './GoogleButton';
import { LinkedInButton } from './LinkedInButton';
import { EmailLoginForm } from './EmailLoginForm';
import { EmailSignupForm } from './EmailSignupForm';

type AuthenticationFormProps = {
  type?: 'login' | 'signup';
};

export function AuthenticationForm(props: AuthenticationFormProps) {
  const { type = 'login' } = props;

  const [isDisabled, setIsDisabled] = useState(false);

  return (
    <>
      <div className="flex w-full flex-col gap-2">
        <GitHubButton isDisabled={isDisabled} setIsDisabled={setIsDisabled} />
        <GoogleButton isDisabled={isDisabled} setIsDisabled={setIsDisabled} />
        <LinkedInButton isDisabled={isDisabled} setIsDisabled={setIsDisabled} />
      </div>

      <div className="flex w-full items-center gap-2 py-6 text-sm text-slate-600">
        <div className="h-px w-full bg-slate-200" />
        OR
        <div className="h-px w-full bg-slate-200" />
      </div>

      {type === 'login' ? (
        <EmailLoginForm isDisabled={isDisabled} setIsDisabled={setIsDisabled} />
      ) : (
        <EmailSignupForm
          isDisabled={isDisabled}
          setIsDisabled={setIsDisabled}
        />
      )}
    </>
  );
}
