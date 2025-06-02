import {
  ChevronsUpDownIcon,
  CogIcon,
  CreditCardIcon,
  LogOutIcon,
  UserIcon,
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../DropdownMenu';
import { useAuth } from '../../hooks/use-auth';
import { logout } from '../../lib/auth';

type UserDropdownProps = {};

export function UserDropdown(props: UserDropdownProps) {
  const currentUser = useAuth();

  if (!currentUser) {
    return null;
  }

  const userAvatar = currentUser?.avatar
    ? `${import.meta.env.PUBLIC_AVATAR_BASE_URL}/${currentUser?.avatar}`
    : '/images/default-avatar.png';

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="inline-flex h-auto w-full items-center justify-between gap-2 rounded-lg border border-transparent px-4 py-2 text-sm font-medium outline-none hover:bg-gray-100 hover:text-black focus-visible:border-gray-300 focus-visible:bg-gray-100 focus-visible:text-black disabled:cursor-not-allowed disabled:opacity-60 [&_svg]:pointer-events-none [&_svg]:shrink-0">
          <div className="flex min-w-0 items-center gap-2.5">
            <div className="relative size-7 shrink-0 overflow-hidden rounded-full">
              <img src={userAvatar} className="absolute inset-0 object-cover" />
            </div>

            <div className="flex min-w-0 flex-col gap-0.5 text-left">
              <h3 className="truncate text-sm font-medium">
                {currentUser.name}
              </h3>
              <p className="truncate text-xs text-gray-500">
                {currentUser.email}
              </p>
            </div>
          </div>

          <ChevronsUpDownIcon className="ml-auto size-3.5" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[var(--radix-dropdown-menu-trigger-width)] min-w-full p-0.5">
        <div className="flex h-auto flex-col justify-between gap-0.5 p-2">
          <div className="flex min-w-0 items-center gap-2.5">
            <div className="relative size-8 shrink-0 overflow-hidden rounded-full">
              <img src={userAvatar} className="absolute inset-0 object-cover" />
            </div>

            <div className="flex min-w-0 flex-col gap-0.5 text-left">
              <h3 className="truncate text-sm font-medium">
                {currentUser.name}
              </h3>
              <p className="truncate text-xs text-gray-500">
                {currentUser.email}
              </p>
            </div>
          </div>
        </div>

        <DropdownMenuSeparator />

        <div className="space-y-0.5">
          <DropdownMenuItem asChild>
            <a href="/account/billing">
              <CreditCardIcon className="size-4" />
              Billing
            </a>
          </DropdownMenuItem>
        </div>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          className="text-red-600 focus:bg-red-100 focus:text-red-600"
          onSelect={() => {
            logout();
          }}
        >
          <LogOutIcon className="size-4" />
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
