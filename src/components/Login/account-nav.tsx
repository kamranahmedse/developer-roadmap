import Cookies from 'js-cookie';
import { useAuth } from '../../hooks/use-auth';
import { TOKEN_COOKIE_NAME } from '../../lib/utils';
import AccountDropdown from './account-dropdown';

export default function AccountNavigation() {
  const { user, isLoading } = useAuth();

  console.log('user', user, isLoading);

  return (
    <div>
      {isLoading ? (
        <div className="flex h-10 w-32 items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-blue-700 py-2 px-4 text-sm text-white hover:from-blue-500 hover:to-blue-600">
          <Spinner className="text-white" />
        </div>
      ) : (
        <>
          {user ? (
            <AccountDropdown />
          ) : (
            <a
              className="flex h-10 w-32 cursor-pointer items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-blue-700 py-2 px-4 text-sm font-medium text-white hover:from-blue-500 hover:to-blue-600"
              href="/signup"
            >
              <span className="mr-2">Register</span>
            </a>
          )}
        </>
      )}
    </div>
  );
}

export function Spinner({className}: {className?: string}) {
  return (
    <svg
      className={`h-5 w-5 animate-spin ${className}`}
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
