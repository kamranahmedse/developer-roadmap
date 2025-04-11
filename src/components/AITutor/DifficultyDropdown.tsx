import { ChevronDown } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { cn } from '../../lib/classname';
import {
  difficultyLevels,
  type DifficultyLevel,
} from '../GenerateCourse/AICourse';

type DifficultyDropdownProps = {
  value: DifficultyLevel;
  onChange: (value: DifficultyLevel) => void;
};

export function DifficultyDropdown(props: DifficultyDropdownProps) {
  const { value, onChange } = props;

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

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          'flex items-center gap-2 rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-700 hover:bg-gray-200 hover:text-black',
        )}
      >
        <span className="capitalize">{value}</span>
        <ChevronDown size={16} className={cn(isOpen && 'rotate-180')} />
      </button>

      {isOpen && (
        <div className="absolute z-10 mt-1 flex flex-col overflow-hidden rounded-md border border-gray-200 bg-white shadow-lg">
          {difficultyLevels.map((level) => (
            <button
              key={level}
              type="button"
              onClick={() => {
                onChange(level);
                setIsOpen(false);
              }}
              className={cn(
                'px-5 py-2 text-left text-sm capitalize hover:bg-gray-100',
                value === level && 'bg-gray-200 font-medium hover:bg-gray-200',
              )}
            >
              {level}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
