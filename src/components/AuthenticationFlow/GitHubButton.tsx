import { useEffect, useState } from 'preact/hooks';

import GitHubIcon from '../../icons/github.svg';
import SpinnerIcon from '../../icons/spinner.svg';
import Cookies from 'js-cookie';
import { TOKEN_COOKIE_NAME } from '../../lib/jwt';
import { httpGet } from '../../lib/http';

type GitHubButtonProps = {};

const GITHUB_REDIRECT_AT = 'githubRedirectAt';
const GITHUB_LAST_PAGE = 'githubLastPage';

export function GitHubButton(props: GitHubButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const icon = isLoading ? SpinnerIcon : GitHubIcon;

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    const state = urlParams.get('state');
    const provider = urlParams.get('provider');

    if (!code || !state || provider !== 'github') {
      return;
    }

    setIsLoading(true);
    httpGet<{ token: string }>(
      `${import.meta.env.PUBLIC_API_URL}/v1-github-callback${
        window.location.search
      }`
    )
      .then(({ response, error }) => {
        if (!response?.token) {
          const errMessage = error?.message || 'Something went wrong.';
          setError(errMessage);
          setIsLoading(false);

          return;
        }

        let redirectUrl = '/';
        const gitHubRedirectAt = localStorage.getItem(GITHUB_REDIRECT_AT);
        const lastPageBeforeGithub = localStorage.getItem(GITHUB_LAST_PAGE);

        // If the social redirect is there and less than 30 seconds old
        // redirect to the page that user was on before they clicked the github login button
        if (gitHubRedirectAt && lastPageBeforeGithub) {
          const socialRedirectAtTime = parseInt(gitHubRedirectAt, 10);
          const now = Date.now();
          const timeSinceRedirect = now - socialRedirectAtTime;

          if (timeSinceRedirect < 30 * 1000) {
            redirectUrl = lastPageBeforeGithub;
          }
        }

        localStorage.removeItem(GITHUB_REDIRECT_AT);
        localStorage.removeItem(GITHUB_LAST_PAGE);
        Cookies.set(TOKEN_COOKIE_NAME, response.token, {
          path: '/',
          expires: 30,
        });
        window.location.href = redirectUrl;
      })
      .catch((err) => {
        setError('Something went wrong. Please try again later.');
        setIsLoading(false);
      });
  }, []);

  const handleClick = async () => {
    setIsLoading(true);

    const { response, error } = await httpGet<{ loginUrl: string }>(
      `${import.meta.env.PUBLIC_API_URL}/v1-github-login`
    );

    if (error || !response?.loginUrl) {
      setError(
        error?.message || 'Something went wrong. Please try again later.'
      );

      setIsLoading(false);
      return;
    }

    // For non authentication pages, we want to redirect back to the page
    // the user was on before they clicked the social login button
    if (!['/login', '/signup'].includes(window.location.pathname)) {
      const pagePath =
        ['/respond-invite', '/befriend'].includes(window.location.pathname)
          ? window.location.pathname + window.location.search
          : window.location.pathname;

      localStorage.setItem(GITHUB_REDIRECT_AT, Date.now().toString());
      localStorage.setItem(GITHUB_LAST_PAGE, pagePath);
    }

    window.location.href = response.loginUrl;
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
          alt="GitHub"
          class={`h-[18px] w-[18px] ${isLoading ? 'animate-spin' : ''}`}
        />
        Continue with GitHub
      </button>
      {error && (
        <p className="mb-2 mt-1 text-sm font-medium text-red-600">{error}</p>
      )}
    </>
  );
}
