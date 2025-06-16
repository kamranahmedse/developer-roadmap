import { SearchIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useDebounceValue } from '../../hooks/use-debounce';

type AICourseSearchProps = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
};

export function AICourseSearch(props: AICourseSearchProps) {
  const { value: defaultValue, onChange, placeholder } = props;

  const [searchTerm, setSearchTerm] = useState(defaultValue);
  const debouncedSearchTerm = useDebounceValue(searchTerm, 500);

  useEffect(() => {
    setSearchTerm(defaultValue);
  }, [defaultValue]);

  useEffect(() => {
    if (debouncedSearchTerm && debouncedSearchTerm.length < 3) {
      return;
    }

    if (debouncedSearchTerm === defaultValue) {
      return;
    }

    onChange(debouncedSearchTerm);
  }, [debouncedSearchTerm]);

  return (
    <div className="relative w-64 max-sm:hidden">
      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
        <SearchIcon className="h-4 w-4 text-gray-400" />
      </div>
      <input
        type="text"
        className="block w-full rounded-md border border-gray-200 bg-white py-1.5 pr-3 pl-10 leading-5 placeholder-gray-500 focus:border-gray-300 focus:ring-blue-500 focus:outline-hidden disabled:opacity-70 sm:text-sm"
        placeholder={placeholder || 'Search courses...'}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </div>
  );
}
