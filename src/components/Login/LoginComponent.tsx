import type { FunctionComponent } from 'preact';
import EmailLoginForm from './email-login-form';
import GoogleLoginButton from './google-login';

export default function LoginComponent() {
  return (
    <div>
      <div className="text-center">
        <h2 className="text-2xl font-semibold leading-5 text-slate-900">
          Welcome back
        </h2>
        <p className="mt-2 text-sm leading-4 text-slate-600">
          Please enter your details.
        </p>
      </div>

      <div className="mt-10 space-y-2">
        <GithubLoginButton />
        <GoogleLoginButton />
      </div>

      <Divider />

      <EmailLoginForm />

      <div className="mt-6 text-center text-sm text-slate-600">
        Don't have an account?{' '}
        <a href="/signup" className="font-medium text-[#4285f4]">
          Sign up
        </a>
      </div>
    </div>
  );
}

export const Divider: FunctionComponent<{ className?: string }> = ({
  className,
}) => {
  return (
    <div className="flex w-full items-center gap-2 py-6 text-sm text-slate-600">
      <div className="h-px w-full bg-slate-200" />
      OR
      <div className="h-px w-full bg-slate-200" />
    </div>
  );
};

export const GithubLoginButton: FunctionComponent<{ className?: string }> = ({
  className,
}) => {
  return (
    <button className="inline-flex h-10 w-full items-center justify-center rounded border border-slate-300 bg-white p-2 text-sm font-medium text-black outline-none transition duration-150 ease-in-out focus:ring-2 focus:ring-[#333] focus:ring-offset-1 disabled:opacity-60">
      <svg
        width="18"
        height="18"
        viewBox="0 0 96 96"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M48.854 0C21.839 0 0 22 0 49.217c0 21.756 13.993 40.172 33.405 46.69 2.427.49 3.316-1.059 3.316-2.362 0-1.141-.08-5.052-.08-9.127-13.59 2.934-16.42-5.867-16.42-5.867-2.184-5.704-5.42-7.17-5.42-7.17-4.448-3.015.324-3.015.324-3.015 4.934.326 7.523 5.052 7.523 5.052 4.367 7.496 11.404 5.378 14.235 4.074.404-3.178 1.699-5.378 3.074-6.6-10.839-1.141-22.243-5.378-22.243-24.283 0-5.378 1.94-9.778 5.014-13.2-.485-1.222-2.184-6.275.486-13.038 0 0 4.125-1.304 13.426 5.052a46.97 46.97 0 0 1 12.214-1.63c4.125 0 8.33.571 12.213 1.63 9.302-6.356 13.427-5.052 13.427-5.052 2.67 6.763.97 11.816.485 13.038 3.155 3.422 5.015 7.822 5.015 13.2 0 18.905-11.404 23.06-22.324 24.283 1.78 1.548 3.316 4.481 3.316 9.126 0 6.6-.08 11.897-.08 13.526 0 1.304.89 2.853 3.316 2.364 19.412-6.52 33.405-24.935 33.405-46.691C97.707 22 75.788 0 48.854 0z"
          fill="#24292f"
        />
      </svg>
      <span className="ml-2">Continue with Github</span>
    </button>
  );
};
