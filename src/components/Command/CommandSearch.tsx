import { useEffect, useState } from 'preact/hooks';
import SearchIcon from '../../icons/search-dark.svg';

type PagesResults = Record<
  string,
  {
    title: string;
    url: string;
  }[]
>;

const pages = [
  {
    title: 'Dashboard',
    url: '/settings/dashboard',
  },
  {
    title: 'Profile',
    url: '/settings/update-profile',
  },
  {
    title: 'Security',
    url: '/settings/update-password',
  },
  {
    title: 'Roadmaps',
    url: '/roadmaps',
  },
];

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

  const searchByTitle = (title: string) => {
    const results: PagesResults = {};

    Object.keys(pagesJson).forEach((key) => {
      const pages = pagesJson[key].filter((page) =>
        page.title.toLowerCase().includes(title.toLowerCase())
      );

      if (pages.length > 0) {
        results[key] = pages;
      }
    });

    setSearchResults(results);
  };

  useEffect(() => {
    getPages();
  }, []);

  useEffect(() => {
    if (search.length > 0) {
      searchByTitle(search);
    } else {
      setSearchResults(null);
    }

    return () => {
      setSearchResults(null);
    };
  }, [search]);

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

      {!searchResults && (
        <div className="mt-3 px-3 py-3">
          <h5 className="ml-2 text-xs font-medium text-gray-600">Pages</h5>
          <ul className="mt-2 flex flex-col">
            {pages.map((page) => (
              <li key={page.title}>
                <a
                  href={page.url}
                  className="block rounded p-2 text-sm hover:bg-gray-100"
                >
                  {page.title}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}

      {searchResults && (
        <div className="mt-3">
          <ul className="divider-gray-300 flex flex-col divide-y">
            {Object.keys(searchResults).map((key) => (
              <li key={key} className="px-3 py-3">
                <h6 className="ml-2 text-xs font-medium text-gray-600">
                  {key}
                </h6>
                <ul className="mt-2 flex flex-col">
                  {searchResults[key].map((page) => (
                    <li key={page.title}>
                      <a
                        href={page.url}
                        className="block rounded p-2 text-sm hover:bg-gray-100"
                      >
                        {page.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>

          {Object.keys(searchResults).length === 0 && (
            <div className="px-5 py-3 text-sm text-gray-600">
              No results found. Try searching for something else.
            </div>
          )}
        </div>
      )}
    </div>
  );
}
