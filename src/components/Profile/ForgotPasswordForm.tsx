import { useState } from 'preact/hooks';

export default function ForgotPasswordForm() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{
    type: 'error' | 'success' | 'info';
    message: string;
  }>();

  const handleSubmit = async (e: Event) => {
    e.preventDefault();
    setIsLoading(true);

    const previousLocalStorageValue = localStorage.getItem(
      'forgot-password-send-at'
    );

    if (previousLocalStorageValue) {
      if (new Date().getTime() < Number(previousLocalStorageValue)) {
        setIsLoading(false);
        return setMessage({
          type: 'error',
          message: 'Please wait a few seconds before trying again.',
        });
      }
    }

    const res = await fetch('http://localhost:8080/v1-forgot-password', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    });

    const data = await res.json();

    if (!res.ok) {
      setIsLoading(false);
      return setMessage({
        type: 'error',
        message: data.message,
      });
    }

    setIsLoading(false);
    setEmail('');
    setMessage({
      type: 'success',
      message: 'Check your email for a link to reset your password.',
    });

    // TODO: Set a time in localStorage to prevent spamming the API (now + 5s)
    const now = new Date();
    const time = now.getTime();
    const expireTime = time + 5 * 1000;
    now.setTime(expireTime);
    localStorage.setItem('forgot-password-send-at', now.getTime().toString());
  };

  return (
    <form class="mx-auto max-w-md" onSubmit={handleSubmit}>
      <h2 class="text-3xl font-bold sm:text-center sm:text-4xl">
        Forgot password?
      </h2>
      <p class="mt-2 mb-6 sm:text-center">
        Enter the email address associated with your account, and we'll email
        you a link to reset your password.
      </p>

      <label
        for="email"
        class='text-sm leading-none text-slate-500 after:text-red-400 after:content-["*"]'
      >
        Email
      </label>
      <input
        type="email"
        name="email"
        id="email"
        class="mt-2 block w-full appearance-none rounded-lg border border-gray-300 px-3 py-2 shadow-sm outline-none transition duration-150 ease-in-out placeholder:text-gray-400 focus:ring-2 focus:ring-black focus:ring-offset-1"
        required
        placeholder="arik@roadmap.sh"
        value={email}
        onChange={(e) => setEmail((e.target as HTMLInputElement).value)}
      />

      {message && (
        <div
          class={`mt-2 rounded-lg p-2 ${
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
        class="mt-2 inline-flex h-10 w-full items-center justify-center rounded-lg border border-slate-300 bg-black p-2 px-4 text-sm font-medium text-white outline-none transition duration-150 ease-in-out focus:ring-2 focus:ring-black focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isLoading ? (
          <svg
            class={`h-5 w-5 animate-spin text-white`}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              class="stroke-[4px] opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
            ></circle>
            <path
              class="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        ) : (
          'Continue'
        )}
      </button>
    </form>
  );
}
