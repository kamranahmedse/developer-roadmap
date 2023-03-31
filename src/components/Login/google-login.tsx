import Cookies from 'js-cookie';
import { useEffect, useState } from 'preact/hooks';
import { TOKEN_COOKIE_NAME } from '../../lib/utils';

export default function GoogleLoginButton() {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleRedirect = () => {
    setIsLoading(true);
    fetch('http://localhost:8080/v1-google-login', {
      credentials: 'include',
    })
      .then((res) => res.json())
      .then((data) => {
        setIsLoading(false);
        window.location.href = data.loginUrl;
      });
  };

  useEffect(() => {
    // Get all query params and send them to v1-google-callback
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    const state = urlParams.get('state');
    const prompt = urlParams.get('prompt');

    if (code && state && prompt) {
      setIsLoading(true);
      fetch(
        `http://localhost:8080/v1-google-callback${window.location.search}`,
        {
          method: 'GET',
          credentials: 'include',
        }
      )
        .then((res) => res.json())
        .then((data) => {
          if (data.token) {
            Cookies.set(TOKEN_COOKIE_NAME, data.token);
            setIsLoading(false);
            window.location.href = '/';
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);

  return (
    <button
      className="mt-2 inline-flex h-10 w-full items-center justify-center rounded border border-slate-300 bg-white p-2 text-sm font-medium text-black outline-none transition duration-150 ease-in-out focus:ring-2 focus:ring-[#333] focus:ring-offset-1 disabled:opacity-60"
      onClick={handleRedirect}
    >
      {isLoading ? (
        <Spinner className="text-black" />
      ) : (
        <>
          <GoogleLogo />
          <span className="ml-2">Continue with Google</span>
        </>
      )}
    </button>
  );
}

function Spinner({ className }: { className?: string }) {
  return (
    <svg
      className={`animate-spin" h-5 w-5 ${className}`}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="stroke-[4px] opacity-25"
        cx={12}
        cy={12}
        r={10}
        stroke="currentColor"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  );
}

function GoogleLogo() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height={18}
      viewBox="0 0 186.69 190.5"
    >
      <g transform="translate(1184.583 765.171)">
        <path
          clipPath="none"
          mask="none"
          d="M-1089.333-687.239v36.888h51.262c-2.251 11.863-9.006 21.908-19.137 28.662l30.913 23.986c18.011-16.625 28.402-41.044 28.402-70.052 0-6.754-.606-13.249-1.732-19.483z"
          fill="#4285f4"
        />
        <path
          clipPath="none"
          mask="none"
          d="M-1142.714-651.791l-6.972 5.337-24.679 19.223h0c15.673 31.086 47.796 52.561 85.03 52.561 25.717 0 47.278-8.486 63.038-23.033l-30.913-23.986c-8.486 5.715-19.31 9.179-32.125 9.179-24.765 0-45.806-16.712-53.34-39.226z"
          fill="#34a853"
        />
        <path
          clipPath="none"
          mask="none"
          d="M-1174.365-712.61c-6.494 12.815-10.217 27.276-10.217 42.689s3.723 29.874 10.217 42.689c0 .086 31.693-24.592 31.693-24.592-1.905-5.715-3.031-11.776-3.031-18.098s1.126-12.383 3.031-18.098z"
          fill="#fbbc05"
        />
        <path
          d="M-1089.333-727.244c14.028 0 26.497 4.849 36.455 14.201l27.276-27.276c-16.539-15.413-38.013-24.852-63.731-24.852-37.234 0-69.359 21.388-85.032 52.561l31.692 24.592c7.533-22.514 28.575-39.226 53.34-39.226z"
          fill="#ea4335"
          clipPath="none"
          mask="none"
        />
      </g>
    </svg>
  );
}
