import Cookies from 'js-cookie';
import type { FunctionComponent } from 'preact';
import { useState } from 'preact/hooks';
import { TOKEN_COOKIE_NAME } from '../../lib/constants';
import Spinner from '../Spinner';

const EmailSignupForm: FunctionComponent<{}> = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [name, setName] = useState<string>('');

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<{
    type: 'success' | 'error' | 'verification' | 'warning';
    message: string;
  } | null>(null);

  return (
    <form
      className="w-full"
      onSubmit={(e) => {
        e.preventDefault();
        setIsLoading(true);
        fetch('http://localhost:8080/v1-register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email,
            password,
            name,
          }),
        })
          .then(async (res) => {
            const json = await res.json();
            if (res.status === 200) {
              window.location.href = `/verify?email=${email}`;
              setName('');
              setEmail('');
              setPassword('');
              setMessage({
                type: 'success',
                message:
                  'We have sent you an email with the verification link. Please follow the instructions to login.',
              });
            } else {
              const error = new Error(json.message) as any;
              error.status = res.status;
              throw error;
            }
            setIsLoading(false);
          })
          .catch((err) => {
            setIsLoading(false);
            setMessage({
              type: 'error',
              message: err.message,
            });
          });
      }}
    >
      <label htmlFor="name" className="sr-only">
        Name
      </label>
      <input
        id="name"
        name="name"
        type="name"
        autoComplete="name"
        required
        className="block w-full appearance-none rounded-lg border border-gray-300 px-3 py-2 shadow-sm  outline-none transition duration-150 ease-in-out placeholder:text-gray-400 focus:ring-2 focus:ring-black focus:ring-offset-1"
        placeholder="John Doe"
        value={name}
        onInput={(e) => setName(String((e.target as any).value))}
      />
      <label htmlFor="email" className="sr-only">
        Email address
      </label>
      <input
        id="email"
        name="email"
        type="email"
        autoComplete="email"
        required
        className="mt-2 block w-full appearance-none rounded-lg border border-gray-300 px-3 py-2 shadow-sm  outline-none transition duration-150 ease-in-out placeholder:text-gray-400 focus:ring-2 focus:ring-black focus:ring-offset-1"
        placeholder="john@example.com"
        value={email}
        onInput={(e) => setEmail(String((e.target as any).value))}
      />
      <label htmlFor="password" className="sr-only">
        Password
      </label>
      <input
        id="password"
        name="password"
        type="password"
        autoComplete="current-password"
        required
        className="mt-2 block w-full appearance-none rounded-lg border border-gray-300 px-3 py-2 shadow-sm  outline-none transition duration-150 ease-in-out placeholder:text-gray-400 focus:ring-2 focus:ring-black focus:ring-offset-1"
        placeholder="Enter you password"
        value={password}
        onInput={(e) => setPassword(String((e.target as any).value))}
      />

      {message && (
        <div
          className={`mt-2 rounded-lg p-2 ${
            message.type === 'error'
              ? 'bg-red-100 text-red-700'
              : message.type === 'success'
              ? 'bg-green-100 text-green-700'
              : 'bg-blue-100 text-blue-700'
          }`}
        >
          {message.message}
        </div>
      )}

      <button
        type="submit"
        disabled={
          email.length === 0 ||
          password.length === 0 ||
          name.length === 0 ||
          isLoading
        }
        className="mt-3 inline-flex h-10 w-full items-center justify-center rounded-lg border border-slate-300 bg-black p-2 text-sm font-medium text-white outline-none transition duration-150 ease-in-out focus:ring-2 focus:ring-black focus:ring-offset-1 disabled:opacity-60"
      >
        {isLoading ? <Spinner className="text-white" /> : 'Continue'}
      </button>
    </form>
  );
};

export default EmailSignupForm;
