import { logout } from "./navigation";

export function AccountDropdownList() {
  return (
    <div className="absolute right-0 z-50 mt-2 w-48 rounded-md bg-slate-800 py-1 shadow-xl">
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
          <a
            href="/team"
            className="block rounded px-4 py-2 text-sm font-medium text-slate-100 hover:bg-slate-700"
          >
            Teams
          </a>
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
    </div>
  );
}