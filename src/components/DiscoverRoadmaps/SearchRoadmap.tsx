import { Search } from 'lucide-react';

type SearchRoadmapProps = {
  value: string;
  total: number;
};

export function SearchRoadmap(props: SearchRoadmapProps) {
  const { total, value: defaultValue } = props;

  return (
    <div className="relative mb-3 flex w-full items-center gap-3">
      <form
        className="relative flex w-full max-w-[310px] items-center"
        action="/discover"
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
          className="w-full rounded-md border border-gray-200 px-3 py-2 pl-9 text-sm transition-colors focus:border-black focus:outline-none"
          defaultValue={defaultValue}
        />
      </form>
      {total > 0 && (
        <p className="hidden flex-shrink-0 text-sm text-gray-500 sm:block">
          {Intl.NumberFormat('en-US', {
            notation: 'compact',
          }).format(total)}{' '}
          results found
        </p>
      )}
    </div>
  );
}
