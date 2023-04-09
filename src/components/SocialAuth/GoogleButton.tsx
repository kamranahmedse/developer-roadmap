import { useEffect, useState } from 'preact/hooks';
import Cookies from 'js-cookie';
import GoogleIcon from '../../icons/google.svg';
import SpinnerIcon from '../../icons/spinner.svg';
import { TOKEN_COOKIE_NAME } from '../../lib/constants';

type GoogleButtonProps = {};

export function GoogleButton(props: GoogleButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const icon = isLoading ? SpinnerIcon : GoogleIcon;

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    const state = urlParams.get('state');
    const provider = urlParams.get('provider');

    if (!code || !state || provider !== 'google') {
      return;
    }

    setIsLoading(true);
    fetch(
      `${import.meta.env.PUBLIC_API_URL}/v1-google-callback${
        window.location.search
      }`,
      {
        method: 'GET',
        credentials: 'include',
      }
    )
      .then((res) => res.json())
      .then((data: any) => {
        if (!data.token) {
          setError('Something went wrong. Please try again later.');
          setIsLoading(false);
        } else {
          Cookies.set(TOKEN_COOKIE_NAME, data.token);
          window.location.href = '/';
        }
      })
      .catch((err) => {
        setError('Something went wrong. Please try again later.');
        setIsLoading(false);
      });
  }, []);

  const handleClick = () => {
    setIsLoading(true);
    fetch(`${import.meta.env.PUBLIC_API_URL}/v1-google-login`, {
      credentials: 'include',
      redirect: 'follow',
    })
      .then((res) => res.json())
      .then((data: any) => {
        // @todo proper typing for API response
        if (data.loginUrl) {
          window.location.href = data.loginUrl;
        } else {
          setError('Something went wrong. Please try again later.');
          setIsLoading(false);
        }
      })
      .catch((err) => {
        setError('Something went wrong. Please try again later.');
        setIsLoading(false);
      });
  };

  return (
    <>
      <button
        class="inline-flex h-10 w-full items-center justify-center gap-2 rounded border border-slate-300 bg-white p-2 text-sm font-medium text-black outline-none focus:ring-2 focus:ring-[#333] focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-60"
        disabled={isLoading}
        onClick={handleClick}
      >
        <img
          src={icon}
          alt="Google"
          class={`h-[18px] w-[18px] ${isLoading ? 'animate-spin' : ''}`}
        />
        Continue with Google
      </button>
      {error && (
        <p className="mb-2 mt-1 text-sm font-medium text-red-600">{error}</p>
      )}
    </>
  );
}
