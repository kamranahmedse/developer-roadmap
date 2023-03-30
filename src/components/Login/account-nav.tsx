import Cookies from 'js-cookie';
import { useAuth } from '../../hooks/use-auth';
import { TOKEN_COOKIE_NAME } from '../../lib/utils';

export default function AccountNavigation() {
  const { user, isLoading } = useAuth();

  console.log('user', user, isLoading);

  return (
    <div>
      {isLoading ? (
        <div className="flex h-10 w-32 items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-blue-700 py-2 px-4 text-sm text-white hover:from-blue-500 hover:to-blue-600">
          <Spinner />
        </div>
      ) : (
        <>
          {user ? (
            <button
              className="flex h-10 w-32 items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-blue-700 py-2 px-4 text-sm font-medium text-white hover:from-blue-500 hover:to-blue-600"
              onClick={() => {
                Cookies.remove(TOKEN_COOKIE_NAME);
                window.location.reload();
              }}
            >
              <span className="mr-2">Logout</span>
            </button>
          ) : (
            <a
              className="flex h-10 w-32 cursor-pointer items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-blue-700 py-2 px-4 text-sm font-medium text-white hover:from-blue-500 hover:to-blue-600"
              href="/signup"
            >
              <span className="mr-2">Login</span>
            </a>
          )}
        </>
      )}
    </div>
  );
}

function Spinner() {
  return (
    <svg
      className="h-5 w-5 animate-spin text-white"
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
