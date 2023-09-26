import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { isLoggedIn } from '../../lib/jwt';
import { AccountDropdownList } from './AccountDropdownList';

export function AccountDropdown() {
  const [showDropdown, setShowDropdown] = useState(false);

  if (!isLoggedIn()) {
    return null;
  }

  return (
    <div className="relative z-50 animate-fade-in">
      <button
        className="flex h-8 w-40 items-center justify-center gap-1.5 rounded-full bg-gradient-to-r from-purple-500 to-purple-700 px-4 py-2 text-sm font-medium text-white hover:from-purple-500 hover:to-purple-600"
        onClick={(e) => {
          e.stopPropagation();
          setShowDropdown(!showDropdown);
        }}
      >
        <span className="inline-flex items-center">
          Account&nbsp;<span className="text-gray-300">/</span>&nbsp;Teams
        </span>
        <ChevronDown className="h-4 w-4 shrink-0 stroke-[2.5px]" />
      </button>

      {showDropdown && <AccountDropdownList />}
    </div>
  );
}
