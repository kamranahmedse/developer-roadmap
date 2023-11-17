import { useRef, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { isLoggedIn } from '../../lib/jwt';
import { AccountDropdownList } from './AccountDropdownList';
import { DropdownTeamList } from './DropdownTeamList';
import { useOutsideClick } from '../../hooks/use-outside-click';
import { CreateRoadmapModal } from '../CustomRoadmap/CreateRoadmap/CreateRoadmapModal.tsx';

export function AccountDropdown() {
  const dropdownRef = useRef(null);

  const [showDropdown, setShowDropdown] = useState(false);
  const [isTeamsOpen, setIsTeamsOpen] = useState(false);
  const [isCreatingRoadmap, setIsCreatingRoadmap] = useState(false);

  useOutsideClick(dropdownRef, () => {
    setShowDropdown(false);
    setIsTeamsOpen(false);
  });

  if (!isLoggedIn()) {
    return null;
  }

  return (
    <div className="relative z-50 animate-fade-in">
      {isCreatingRoadmap && (
        <CreateRoadmapModal
          onClose={() => {
            setIsCreatingRoadmap(false);
          }}
        />
      )}

      <button
        className="flex h-8 w-40 items-center justify-center gap-1.5 rounded-full bg-gradient-to-r from-purple-500 to-purple-700 px-4 py-2 text-sm font-medium text-white hover:from-purple-500 hover:to-purple-600"
        onClick={() => {
          setIsTeamsOpen(false);
          setShowDropdown(!showDropdown);
        }}
      >
        <span className="inline-flex items-center">
          Account&nbsp;<span className="text-gray-300">/</span>&nbsp;Teams
        </span>
        <ChevronDown className="h-4 w-4 shrink-0 stroke-[2.5px]" />
      </button>

      {showDropdown && (
        <div
          ref={dropdownRef}
          className="absolute right-0 z-50 mt-2 min-h-[152px] w-48 rounded-md bg-slate-800 py-1 shadow-xl"
        >
          {isTeamsOpen ? (
            <DropdownTeamList setIsTeamsOpen={setIsTeamsOpen} />
          ) : (
            <AccountDropdownList
              onCreateRoadmap={() => {
                setIsCreatingRoadmap(true);
                setShowDropdown(false);
              }}
              setIsTeamsOpen={setIsTeamsOpen}
            />
          )}
        </div>
      )}
    </div>
  );
}
