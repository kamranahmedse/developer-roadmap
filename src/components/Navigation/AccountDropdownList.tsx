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
          className="block rounded pl-4 pr-2 py-2 text-sm font-medium text-slate-100 hover:bg-slate-700"
        >
          Profile
        </a>
      </li>
      <li className="px-1">
        <a
          href="/account/friends"
          className="block rounded pl-4 pr-2 py-2 text-sm font-medium text-slate-100 hover:bg-slate-700"
        >
          Friends
        </a>
      </li>
      <li className="px-1">
        <button
          className="group flex w-full items-center justify-between rounded pl-4 pr-2 py-2 text-sm font-medium text-slate-100 hover:bg-slate-700"
          onClick={() => setIsTeamsOpen(true)}
        >
          Teams
          <ChevronRight className="h-4 w-4 shrink-0 stroke-[2.5px] text-slate-400 group-hover:text-white" />
        </button>
      </li>
      <li className="px-1">
        <button
          className="block w-full rounded pl-4 pr-2 py-2 text-left text-sm font-medium text-slate-100 hover:bg-slate-700"
          type="button"
          onClick={logout}
        >
          Logout
        </button>
      </li>
    </ul>
  );
}
