import Cookies from 'js-cookie';
import { TOKEN_COOKIE_NAME } from '../../lib/utils';
import { useEffect, useState } from 'preact/hooks';

export default function AccountDropdown() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // If user click outside the dropdown, and dropdown is open then close it.
    const handleOpen = () => {
      if (isOpen) setIsOpen(false);
    };

    document.addEventListener('click', handleOpen);
    return () => document.removeEventListener('click', handleOpen);
  }, [isOpen]);

  return (
    <div className="relative">
      <button
        className="flex h-8 w-24 items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-blue-700 py-2 px-4 text-sm font-medium text-white hover:from-blue-500 hover:to-blue-600"
        onClick={() => setIsOpen((p) => !p)}
      >
        <span>Account</span>
      </button>

      <div
        className={`absolute right-0 z-10 mt-2 w-48 rounded-md bg-slate-800 py-1 shadow-xl ${
          isOpen ? 'block' : 'hidden'
        }`}
      >
        <ul>
          <li className="px-1">
            <a
              href="/profile"
              className="block rounded px-4 py-2 text-sm font-medium text-slate-100 hover:bg-slate-700"
            >
              Your Profile
            </a>
          </li>
          <li className="px-1">
            <button
              className="block w-full rounded px-4 py-2 text-left text-sm font-medium text-slate-100 hover:bg-slate-700"
              onClick={() => {
                Cookies.remove(TOKEN_COOKIE_NAME);
                window.location.reload();
              }}
            >
              Logout
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
}
