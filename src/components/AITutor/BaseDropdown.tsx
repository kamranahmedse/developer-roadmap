import { ChevronDown } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { cn } from '../../lib/classname';
import type { LucideIcon } from 'lucide-react';

type BaseDropdownProps<T extends string> = {
  value: T;
  options: readonly T[];
  onChange: (value: T) => void;
  icons?: Record<T, LucideIcon>;
};

export function BaseDropdown<T extends string>(props: BaseDropdownProps<T>) {
  const { value, options, onChange, icons } = props;

  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const Icon = icons?.[value];

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          'flex items-center gap-2 rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-700 hover:bg-gray-200 hover:text-black',
        )}
      >
        {Icon && <Icon size={16} />}
        <span className="capitalize">{value}</span>
        <ChevronDown size={16} className={cn(isOpen && 'rotate-180')} />
      </button>

      {isOpen && (
        <div className="absolute z-10 mt-1 flex flex-col overflow-hidden rounded-md border border-gray-200 bg-white shadow-lg">
          {options.map((option) => {
            const OptionIcon = icons?.[option];
            return (
              <button
                key={option}
                type="button"
                onClick={() => {
                  onChange(option);
                  setIsOpen(false);
                }}
                className={cn(
                  'flex items-center gap-2 px-5 py-2 text-left text-sm capitalize hover:bg-gray-100',
                  value === option && 'bg-gray-200 font-medium hover:bg-gray-200',
                )}
              >
                {OptionIcon && <OptionIcon size={16} />}
                {option}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
} 