import { ChevronRight } from 'lucide-react';
import { logout } from './navigation';

type AccountDropdownListProps = {
  setIsTeamsOpen: (isOpen: boolean) => void;
};

export function AccountDropdownList(props: AccountDropdownListProps) {
  const { setIsTeamsOpen } = props;

  return (
    <ul>
      <li className="px-1">
        <a
          href="/account"
          className="block rounded px-4 py-2 text-sm font-medium text-slate-100 hover:bg-slate-700"
        >
          Profile
        </a>
      </li>
      <li className="px-1">
        <a
          href="/account/friends"
          className="block rounded px-4 py-2 text-sm font-medium text-slate-100 hover:bg-slate-700"
        >
          Friends
        </a>
      </li>
      <li className="px-1">
        <button
          className="flex w-full items-center justify-between rounded px-4 py-2 text-sm font-medium text-slate-100 hover:bg-slate-700"
          onClick={() => setIsTeamsOpen(true)}
        >
          Teams
          <ChevronRight className="h-4 w-4 shrink-0 stroke-[2.5px]" />
        </button>
      </li>
      <li className="px-1">
        <button
          className="block w-full rounded px-4 py-2 text-left text-sm font-medium text-slate-100 hover:bg-slate-700"
          type="button"
          onClick={logout}
        >
          Logout
        </button>
      </li>
    </ul>
  );
}
