import { Search } from 'lucide-react';
import { useState } from 'react';

type ExploreAISearchProps = {
  onSubmit?: (search: string, sort: string) => void;
};

export function ExploreAISearch(props: ExploreAISearchProps) {
  const { onSubmit } = props;

  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('createdAt');

  return (
    <form
      className="flex items-center gap-2"
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit?.(search, sort);
      }}
    >
      <div className="relative w-full">
        <label
          className="absolute left-3 flex h-full items-center text-gray-500"
          htmlFor="search"
        >
          <Search className="h-4 w-4" />
        </label>
        <input
          id="search"
          name="search"
          type="search"
          placeholder="Search AI Roadmaps"
          className="h-10 w-full rounded-md border border-gray-200 px-3 py-2 pl-9 transition-colors focus:border-black focus:outline-none"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <select
        className="h-10 rounded-md border border-gray-200 px-2.5 py-2 transition-colors focus:border-black focus:outline-none"
        value={sort}
        onChange={(e) => setSort(e.target.value)}
      >
        <option value="createdAt">Sort by Date</option>
        <option value="viewCount">Sort by Views</option>
      </select>
      <button
        type="submit"
        className="flex min-w-[154px] flex-shrink-0 items-center justify-center gap-2 rounded-md bg-black px-4 py-2 text-white disabled:cursor-not-allowed disabled:opacity-50"
      >
        Apply
      </button>
    </form>
  );
}
