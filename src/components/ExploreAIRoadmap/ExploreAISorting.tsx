import { Check, ChevronDown } from 'lucide-react';
import { useRef, useState } from 'react';
import { useOutsideClick } from '../../hooks/use-outside-click';

export type SortByValues = 'viewCount' | 'createdAt' | '-createdAt';
const sortingLabels: { label: string; value: SortByValues }[] = [
  {
    label: 'Most Viewed',
    value: 'viewCount',
  },
  {
    label: 'Newest',
    value: 'createdAt',
  },
  {
    label: 'Oldest',
    value: '-createdAt',
  },
];

type ExploreAISortingProps = {
  sortBy: SortByValues;
  onSortChange: (sortBy: SortByValues) => void;
};

export function ExploreAISorting(props: ExploreAISortingProps) {
  const { sortBy, onSortChange } = props;

  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const selectedValue = sortingLabels.find((item) => item.value === sortBy);

  useOutsideClick(dropdownRef, () => {
    setIsOpen(false);
  });

  return (
    <div
      className="min-auto relative flex shrink-0 sm:min-w-[140px]"
      ref={dropdownRef}
    >
      <button
        className="flex w-full items-center justify-between gap-2 rounded-md border px-2 text-sm"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{selectedValue?.label}</span>

        <span>
          <ChevronDown className="ml-4 h-3.5 w-3.5" />
        </span>
      </button>

      {isOpen && (
        <div className="absolute top-10 right-0 z-10 min-w-40 overflow-hidden rounded-md border border-gray-200 bg-white shadow-lg">
          {sortingLabels.map((item) => (
            <button
              key={item.value}
              className="flex w-full items-center gap-2 px-4 py-2 text-sm hover:bg-gray-100"
              onClick={() => {
                onSortChange(item.value);
                setIsOpen(false);
              }}
            >
              <span>{item.label}</span>
              {item.value === sortBy && <Check className="ml-auto h-4 w-4" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
