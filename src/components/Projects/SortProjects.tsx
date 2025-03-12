import { useRef, useState } from 'react';
import { useOutsideClick } from '../../hooks/use-outside-click';
import { ChevronDown } from 'lucide-react';

type SortOption = {
  label: string;
  value: string;
};

const sortOptions: SortOption[] = [
  { label: 'Latest First', value: 'latest' },
  { label: 'Oldest First', value: 'oldest' },
  { label: 'Highest Rating', value: 'rating' },
];

type SortProjectsProps = {
  selectedSort: string;
  onSelectSort: (sort: string) => void;
};

export function SortProjects(props: SortProjectsProps) {
  const { selectedSort, onSelectSort } = props;
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useOutsideClick(dropdownRef, () => {
    setIsOpen(false);
  });

  const selectedOption =
    sortOptions.find((option) => option.value === selectedSort) ||
    sortOptions[0];

  return (
    <div className="relative flex-shrink-0" ref={dropdownRef}>
      <button
        className="flex items-center gap-1 rounded-md border border-gray-300 py-1.5 pl-3 pr-2 text-xs font-medium text-gray-900"
        onClick={() => setIsOpen(!isOpen)}
      >
        {selectedOption.label}
        <ChevronDown className="ml-1 h-4 w-4" />
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full z-10 mt-1.5 min-w-[150px] overflow-hidden rounded-md border border-gray-300 bg-white shadow-lg">
          <div className="py-1">
            {sortOptions.map((option) => (
              <button
                key={option.value}
                className={`flex w-full items-center px-4 py-1.5 text-left text-sm text-gray-700 hover:bg-gray-100 ${
                  selectedSort === option.value ? 'bg-gray-100' : ''
                }`}
                onClick={() => {
                  onSelectSort(option.value);
                  setIsOpen(false);
                }}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
