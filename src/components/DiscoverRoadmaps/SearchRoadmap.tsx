import { Search } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useDebounceValue } from '../../hooks/use-debounce';
import { Spinner } from '../ReactIcons/Spinner';

type SearchRoadmapProps = {
  value: string;
  total: number;
  isLoading: boolean;
  onValueChange: (value: string) => void;
};

export function SearchRoadmap(props: SearchRoadmapProps) {
  const { total, value: defaultValue, onValueChange, isLoading } = props;

  const [term, setTerm] = useState(defaultValue);
  const debouncedTerm = useDebounceValue(term, 500);

  useEffect(() => {
    setTerm(defaultValue);
  }, [defaultValue]);

  useEffect(() => {
    if (debouncedTerm && debouncedTerm.length < 3) {
      return;
    }

    if (debouncedTerm === defaultValue) {
      return;
    }

    onValueChange(debouncedTerm);
  }, [debouncedTerm]);

  return (
    <div className="relative flex w-full items-center gap-3">
      <form
        className="relative flex w-full max-w-[310px] items-center"
        onSubmit={(e) => {
          e.preventDefault();
          onValueChange(term);
        }}
      >
        <label
          className="absolute left-3 flex h-full items-center text-gray-500"
          htmlFor="search"
        >
          <Search className="h-4 w-4" />
        </label>
        <input
          id="q"
          name="q"
          type="text"
          minLength={3}
          placeholder="Type 3 or more characters to search..."
          className="w-full rounded-md border border-gray-200 px-3 py-2 pl-9 text-sm transition-colors focus:border-black focus:outline-hidden"
          value={term}
          onChange={(e) => setTerm(e.target.value)}
        />
        {isLoading && (
          <span className="absolute right-3 top-0 flex h-full items-center text-gray-500">
            <Spinner isDualRing={false} className={`h-3 w-3`} />
          </span>
        )}
      </form>
      {total > 0 && (
        <p className="hidden shrink-0 text-sm text-gray-500 sm:block">
          {Intl.NumberFormat('en-US', {
            notation: 'compact',
          }).format(total)}{' '}
          result{total > 1 ? 's' : ''} found
        </p>
      )}
    </div>
  );
}
