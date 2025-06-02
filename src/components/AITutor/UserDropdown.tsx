import {
  ChevronDown,
  CreditCardIcon,
  LogInIcon,
  LogOutIcon,
  Settings,
  User2,
} from 'lucide-react';
import { useAuth } from '../../hooks/use-auth';
import { useClientMount } from '../../hooks/use-client-mount';
import { logout } from '../../lib/auth';
import { showLoginPopup } from '../../lib/popup';
import { useIsPaidUser } from '../../queries/billing';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../DropdownMenu';

type UserDropdownProps = {};

export function UserDropdown(props: UserDropdownProps) {
  const currentUser = useAuth();
  const { isPaidUser, isLoading } = useIsPaidUser();
  const isMounted = useClientMount();

  if (!isMounted || isLoading) {
    return null;
  }

  if (!currentUser) {
    return (
      <button
        onClick={showLoginPopup}
        className="animate-fade-in inline-flex h-auto w-full items-center justify-center gap-2 rounded-lg border border-gray-700 bg-black px-4 py-2.5 text-sm font-medium text-white transition-all duration-200 outline-none hover:!opacity-80 disabled:cursor-not-allowed disabled:opacity-60"
      >
        <LogInIcon className="size-4" />
        Free Signup or Login
      </button>
    );
  }

  const userAvatar = currentUser?.avatar
    ? `${import.meta.env.PUBLIC_AVATAR_BASE_URL}/${currentUser?.avatar}`
    : '/images/default-avatar.png';

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="group flex w-full items-center gap-3 rounded-lg border border-transparent px-4 py-2.5 text-sm font-medium transition-colors hover:bg-gray-100 hover:text-black focus:outline-none data-[state=open]:bg-gray-100 data-[state=open]:text-black">
          <div className="relative size-7 shrink-0 overflow-hidden rounded-full">
            <img
              src={userAvatar}
              alt={currentUser.name}
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>

          <div className="flex min-w-0 flex-1 flex-col text-left">
            <span className="truncate font-medium text-gray-900">
              {currentUser.name}
            </span>
            <span className="truncate text-xs text-gray-500">
              {isPaidUser ? 'Pro Member' : 'Free User'}
            </span>
          </div>

          <ChevronDown className="size-4 text-gray-400 transition-transform duration-200 group-data-[state=open]:rotate-180" />
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-[var(--radix-dropdown-menu-trigger-width)] min-w-52 rounded-lg border border-gray-200 bg-white p-1">
        <div className="space-y-1">
          <DropdownMenuItem asChild>
            <a
              href="/account"
              className="flex w-full items-center gap-3 rounded px-3 py-2 text-sm font-medium text-gray-500 transition-colors hover:bg-gray-100 hover:text-black"
            >
              <User2 className="size-4" />
              Account
            </a>
          </DropdownMenuItem>

          <DropdownMenuItem asChild>
            <a
              href="/account/billing"
              className="flex w-full items-center gap-3 rounded px-3 py-2 text-sm font-medium text-gray-500 transition-colors hover:bg-gray-100 hover:text-black"
            >
              <CreditCardIcon className="size-4" />
              Billing
            </a>
          </DropdownMenuItem>

          <DropdownMenuItem asChild>
            <a
              href="/account/settings"
              className="flex w-full items-center gap-3 rounded px-3 py-2 text-sm font-medium text-gray-500 transition-colors hover:bg-gray-100 hover:text-black"
            >
              <Settings className="size-4" />
              Settings
            </a>
          </DropdownMenuItem>
        </div>

        <DropdownMenuSeparator className="my-1" />

        <DropdownMenuItem
          className="flex w-full items-center gap-3 rounded px-3 py-2 text-sm font-medium text-red-600 transition-colors hover:bg-red-50 hover:text-red-700"
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
