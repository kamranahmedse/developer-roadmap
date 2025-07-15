import { useEffect, useState } from 'react';
import { useDebounceValue } from '../../hooks/use-debounce';
import { Loader2Icon, XIcon, SearchIcon } from 'lucide-react';
import { cn } from '../../lib/classname';

type SearchAIChatHistoryProps = {
  onSearch: (search: string) => void;
  isLoading?: boolean;
  className?: string;
  inputClassName?: string;
};

export function SearchAIChatHistory(props: SearchAIChatHistoryProps) {
  const { onSearch, isLoading, className, inputClassName } = props;

  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounceValue(search, 300);

  useEffect(() => {
    onSearch(debouncedSearch);
  }, [debouncedSearch, onSearch]);

  return (
    <form
      className={cn('relative mt-2 flex grow items-center', className)}
      onSubmit={(e) => {
        e.preventDefault();
        onSearch(search);
      }}
    >
      <input
        type="text"
        placeholder="Search folder by name"
        className={cn(
          'block h-9 w-full rounded-lg border border-gray-200 bg-white px-3 py-2 pr-7 pl-8 text-sm outline-none placeholder:text-zinc-500 focus:border-zinc-500',
          inputClassName,
        )}
        required
        minLength={3}
        maxLength={255}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="absolute top-1/2 left-2.5 -translate-y-1/2">
        {isLoading ? (
          <Loader2Icon className="size-4 animate-spin text-gray-500" />
        ) : (
          <SearchIcon className="size-4 text-gray-500" />
        )}
      </div>
      {search && (
        <div className="absolute inset-y-0 right-1 flex items-center">
          <button
            onClick={() => {
              setSearch('');
            }}
            className="rounded-lg p-1 hover:bg-gray-100"
          >
            <XIcon className="size-4 text-gray-500" />
          </button>
        </div>
      )}
    </form>
  );
}
