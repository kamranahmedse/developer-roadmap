import { ChevronDownIcon } from '../ReactIcons/ChevronDownIcon';
import { useRef, useState } from 'preact/hooks';
import { useOutsideClick } from '../../hooks/use-outside-click';

const allowedRoles = [
  {
    name: 'Admin',
    value: 'admin',
    description: 'Can do everything',
  },
  {
    name: 'Manager',
    value: 'manager',
    description: 'Can manage team and skills',
  },
  {
    name: 'Member',
    value: 'member',
    description: 'Can view team and skills',
  },
] as const;

export type AllowedRoles = (typeof allowedRoles)[number]['value'];

type RoleDropdownProps = {
  className?: string;
  selectedRole: string;
  setSelectedRole: (role: AllowedRoles) => void;
};

export function RoleDropdown(props: RoleDropdownProps) {
  const { selectedRole, setSelectedRole, className = 'w-[120px]' } = props;
  const dropdownRef = useRef(null);

  const [activeRoleIndex, setActiveRoleIndex] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useOutsideClick(dropdownRef, () => {
    setIsMenuOpen(false);
  });

  return (
    <div className={`relative ${className}`}>
      <button
        type={'button'}
        onKeyDown={(e) => {
          const isUpOrDown = e.key === 'ArrowUp' || e.key === 'ArrowDown';
          if (isUpOrDown && !isMenuOpen) {
            e.preventDefault();
            setIsMenuOpen(true);
            return;
          }

          const isEnter = e.key === 'Enter';
          if (isEnter && isMenuOpen) {
            e.preventDefault();
            setSelectedRole(allowedRoles[activeRoleIndex].value);
            setIsMenuOpen(false);
            return;
          }

          if (e.key === 'ArrowDown') {
            e.preventDefault();
            setActiveRoleIndex((prev) => {
              const nextIndex = prev + 1;
              if (nextIndex >= allowedRoles.length) {
                return 0;
              }
              return nextIndex;
            });
          }
          if (e.key === 'ArrowUp') {
            e.preventDefault();
            setActiveRoleIndex((prev) => {
              const nextIndex = prev - 1;
              if (nextIndex < 0) {
                return allowedRoles.length - 1;
              }
              return nextIndex;
            });
          }
        }}
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className={`flex h-full w-full cursor-default items-center justify-between rounded-md border px-4 ${
          isMenuOpen ? 'border-gray-300 bg-gray-100' : ''
        }`}
      >
        <span
          className={`capitalize`}>
          {selectedRole || 'Select Role'}
        </span>
        <ChevronDownIcon
          className={'relative top-0.5 ml-2 h-4 w-4 text-gray-400'}
        />
      </button>

      {isMenuOpen && (
        <div
          className="absolute z-10 mt-1 w-[200px] rounded-md border bg-white shadow-md"
          ref={dropdownRef}
        >
          <div
            className="py-1"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="options-menu"
          >
            {allowedRoles.map((allowedRole, roleCounter) => (
              <button
                key={allowedRole.value}
                type={'button'}
                className={`w-full cursor-default px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 ${
                  roleCounter === activeRoleIndex ? 'bg-gray-100' : 'bg-white'
                }`}
                role="menuitem"
                onClick={() => {
                  setIsMenuOpen(false);
                  setSelectedRole(allowedRole.value);
                }}
              >
                <span className="block font-medium">{allowedRole.name}</span>
                <span className="block text-xs text-gray-400">
                  {allowedRole.description}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
