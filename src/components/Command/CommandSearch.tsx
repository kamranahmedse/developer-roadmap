import { useEffect, useState } from 'preact/hooks';
import SearchIcon from '../../icons/search-dark.svg';

type PagesResults = Record<
  string,
  {
    title: string;
    url: string;
  }[]
>;

const pages = {
  dashboard: {
    title: 'Dashboard',
    url: '/settings/dashboard',
  },
  profile: {
    title: 'Profile',
    url: '/settings/update-profile',
  },
  security: {
    title: 'Security',
    url: '/settings/update-password',
  },
};

export default function CommandSearch() {
  const [search, setSearch] = useState<string>('');
  const [pagesJson, setPagesJson] = useState<PagesResults>({});
  const [searchResults, setSearchResults] = useState<PagesResults | null>(null);

  const getPages = async () => {
    const pagesJson = (
      await fetch(`/pages.json`, {
        headers: {
          Accept: 'text/html',
        },
      }).then((res) => res.text())
    )
      .replace('<!DOCTYPE html>', '')
      .replace(/\\n/g, '')
      .replace(/&quot;/g, '"');

    const pages = JSON.parse(pagesJson);
    setPagesJson(pages);
  };

  useEffect(() => {
    getPages();
  }, []);

  return (
    <div className="rounded-lg border border-gray-200">
      <div className="flex items-center gap-2 border-b border-gray-200 px-5 py-2 font-normal">
        <img src={SearchIcon} alt="Search" className="h-4 w-4" />
        <input
          type="text"
          placeholder="Search"
          value={search}
          onInput={(e) => {
            setSearch(e.currentTarget.value);
            setSearchResults(null);
          }}
          className="w-full border-none bg-transparent py-1 pr-2 placeholder:text-gray-600 focus:outline-none focus:ring-0"
        />
      </div>

      <div className="px-5 py-2">
        <div>
          <h5>Pages</h5>
          <ul></ul>
        </div>
      </div>
    </div>
  );
}
