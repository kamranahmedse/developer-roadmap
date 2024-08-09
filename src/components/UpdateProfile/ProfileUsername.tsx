import { useEffect, useState } from 'react';
import type { AllowedProfileVisibility } from '../../api/user';
import { httpPost } from '../../lib/http';
import { useToast } from '../../hooks/use-toast';
import { CheckIcon, Loader2, X } from 'lucide-react';
import { useDebounceValue } from '../../hooks/use-debounce.ts';

type ProfileUsernameProps = {
  username: string;
  setUsername: (username: string) => void;
  profileVisibility: AllowedProfileVisibility;
  currentUsername?: string;
};

export function ProfileUsername(props: ProfileUsernameProps) {
  const { username, setUsername, profileVisibility, currentUsername } = props;

  const toast = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [isUnique, setIsUnique] = useState<boolean | null>(null);
  const debouncedUsername = useDebounceValue(username, 500);

  useEffect(() => {
    checkIsUnique(debouncedUsername).then();
  }, [debouncedUsername]);

  const checkIsUnique = async (username: string) => {
    if (isLoading || !username) {
      return;
    }

    if (username.length < 3) {
      setIsUnique(false);
      return;
    }

    if (currentUsername && username === currentUsername && isUnique !== false) {
      setIsUnique(true);
      return;
    }

    setIsLoading(true);
    const { response, error } = await httpPost<{
      isUnique: boolean;
    }>(`${import.meta.env.PUBLIC_API_URL}/v1-check-is-unique-username`, {
      username,
    });

    if (error || !response) {
      setIsUnique(null);
      setIsLoading(false);
      toast.error(error?.message || 'Something went wrong. Please try again.');
      return;
    }

    setIsUnique(response.isUnique);
    setIsLoading(false);
  };
  const USERNAME_REGEX = /^[a-zA-Z0-9]*$/;
  const isUserNameValid = (value: string) =>
    USERNAME_REGEX.test(value) && value.length <= 20;

  return (
    <div className="flex w-full flex-col">
      <label
        htmlFor="username"
        className="flex min-h-[16.5px] items-center justify-between text-sm leading-none text-slate-500"
      >
        <span>Profile URL</span>
        {!isLoading && (
          <span className="flex items-center">
            {currentUsername &&
              (currentUsername === username || !username || !isUnique) && (
                <span className="text-xs">
                  Current URL{' '}
                  <a
                    href={`${import.meta.env.DEV ? 'http://localhost:3000' : 'https://roadmap.sh'}/u/${currentUsername}`}
                    target="_blank"
                    className={
                      'ml-0.5 rounded-md border border-purple-500 px-1.5 py-0.5 font-mono text-xs font-medium text-purple-700 transition-colors hover:bg-purple-500 hover:text-white'
                    }
                  >
                    roadmap.sh/u/{currentUsername}
                  </a>
                </span>
              )}
            {currentUsername !== username && username && isUnique && (
              <span className="text-xs text-green-600">
                URL after update{' '}
                <a
                  href={`${import.meta.env.DEV ? 'http://localhost:3000' : 'https://roadmap.sh'}/u/${username}`}
                  target="_blank"
                  className={
                    'ml-0.5 rounded-md border border-purple-500 px-1.5 py-0.5 text-xs font-medium text-purple-700 transition-colors hover:bg-purple-500 hover:text-white'
                  }
                >
                  roadmap.sh/u/{username}
                </a>
              </span>
            )}
          </span>
        )}
      </label>
      <div className="mt-2 flex items-center overflow-hidden rounded-lg border border-gray-300">
        <span className="border-r border-gray-300 bg-gray-100 p-2">
          roadmap.sh/u/
        </span>

        <div className="relative grow">
          <input
            type="text"
            name="username"
            id="username"
            className="w-full px-3 py-2 outline-none placeholder:text-gray-400"
            placeholder="johndoe"
            spellCheck={false}
            value={username}
            title="Username must be at least 3 characters long and can only contain letters, numbers, and underscores"
            onKeyDown={(e) => {
              // only allow letters, numbers
              const keyCode = e.key;
              if (
                !isUserNameValid(keyCode) &&
                !['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight'].includes(
                  keyCode,
                )
              ) {
                e.preventDefault();
              }
            }}
            onInput={(e) => {
              const value = (e.target as HTMLInputElement).value?.trim();
              if (!isUserNameValid(value)) {
                return;
              }

              setUsername((e.target as HTMLInputElement).value.toLowerCase());
            }}
            required={profileVisibility === 'public'}
          />

          {username && (
            <span className="absolute bottom-0 right-0 top-0 flex items-center px-2">
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : isUnique === false ? (
                <X className="h-4 w-4 text-red-500" />
              ) : isUnique === true ? (
                <CheckIcon className="h-4 w-4 text-green-500" />
              ) : null}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
