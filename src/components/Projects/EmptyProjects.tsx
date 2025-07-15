import { Bell, Check, FolderKanbanIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import { cn } from '../../lib/classname.ts';
import { isLoggedIn } from '../../lib/jwt.ts';
import { showLoginPopup } from '../../lib/popup.ts';

export function EmptyProjects() {
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsSubscribed(isLoggedIn());
    setIsLoading(false);
  }, []);

  return (
    <div className="relative mt-2.5 mb-5 flex min-h-[400px] flex-col items-center justify-center rounded-lg border bg-white">
      <FolderKanbanIcon className="h-14 w-14 text-gray-300" strokeWidth={1.5} />
      <h2 className="mb-0.5 mt-2 text-center text-base font-medium text-gray-900 sm:text-xl">
        <span className="hidden sm:inline">Projects are coming soon!</span>
        <span className="inline sm:hidden">Coming soon!</span>
      </h2>
      <p className="mb-3 text-balance text-center text-sm text-gray-500 sm:text-base">
        Sign up to get notified when projects are available.
      </p>

      <button
        onClick={() => {
          if (isSubscribed) {
            return;
          }

          showLoginPopup();
        }}
        className={cn(
          'flex items-center rounded-md bg-gray-800 py-1.5 pl-3 pr-4 text-xs text-white opacity-0 transition-opacity duration-500 hover:bg-black sm:text-sm',
          {
            'cursor-default bg-gray-300 text-black hover:bg-gray-300':
              isSubscribed,
            'opacity-100': !isLoading,
          },
        )}
      >
        {!isSubscribed && (
          <>
            <Bell className="mr-2 h-4 w-4" />
            Signup to get Notified
          </>
        )}
        {isSubscribed && (
          <>
            <Check className="mr-2 h-4 w-4" />
            We will notify you by email
          </>
        )}
      </button>
    </div>
  );
}
