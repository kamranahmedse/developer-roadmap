import { PencilIcon, XIcon, MoreVertical } from 'lucide-react';
import { cn } from '../../lib/classname';
import { useState, useRef, useEffect } from 'react';

type PersonalizedRoadmapSwitcherProps = {
  isPersonalized: boolean;
  onToggle: (isPersonalized: boolean) => void;
  onEdit: () => void;
  onRemove: () => void;
  className?: string;
};

export function PersonalizedRoadmapSwitcher(
  props: PersonalizedRoadmapSwitcherProps,
) {
  const { isPersonalized, onToggle, onEdit, onRemove, className } = props;
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className={cn('mb-2 flex items-center gap-2', className)}>
      <div className="relative flex items-center">
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="mr-0.5 p-1 text-gray-400 hover:text-gray-600"
            title="More options"
          >
            <MoreVertical className="h-3.5 w-3.5" />
          </button>
          {isDropdownOpen && (
            <div className="absolute top-full left-0 z-20 mt-1 rounded-md border border-gray-200 bg-white shadow-lg">
              <button
                onClick={() => {
                  onEdit();
                  setIsDropdownOpen(false);
                }}
                className="flex w-full items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                <PencilIcon className="h-3.5 w-3.5" />
                Edit
              </button>
              <button
                onClick={() => {
                  onRemove();
                  setIsDropdownOpen(false);
                }}
                className="flex w-full items-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50"
              >
                <XIcon className="h-3.5 w-3.5" />
                Delete
              </button>
            </div>
          )}
        </div>
        <div className="flex bg-gray-200 rounded-full">
          <button
            className={cn(
              'rounded-full px-2.5 py-1 text-xs font-medium transition-all',
              isPersonalized
                ? 'bg-gray-900 text-white'
                : 'text-gray-500 hover:text-gray-700',
            )}
            onClick={() => onToggle(true)}
          >
            Personalized
          </button>
          <button
            className={cn(
              'rounded-full px-2.5 py-1 text-xs font-medium transition-all',
              !isPersonalized
                ? 'bg-gray-900 text-white'
                : 'text-gray-500 hover:text-gray-700',
            )}
            onClick={() => onToggle(false)}
          >
            Original
          </button>
        </div>
      </div>
    </div>
  );
}
