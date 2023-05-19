import { useEffect, useState, useRef } from 'preact/hooks';
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
    title: 'Home',
    url: '/',
  },
  {
    title: 'Account',
    url: '/settings/update-profile',
  },
  {
    title: 'Roadmaps',
    url: '/roadmaps',
  },
  {
    title: 'Best Practices',
    url: '/best-practices',
  },
  {
    title: 'Guides',
    url: '/guides',
  },
  {
    title: 'Videos',
    url: '/videos',
  },
];

export default function CommandSearch({
  handleSearchResultsFocus,
  handleHoverFocus,
}: {
  handleSearchResultsFocus: () => void;
  handleHoverFocus: (e: MouseEvent) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
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
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    handleSearchResultsFocus();
  }, [searchResults]);

  return (
    <div className="h-full rounded-lg border border-gray-200 bg-white shadow-md">
      <div className="flex items-center gap-2 border-b border-gray-200 px-5 py-2 font-normal">
        <img src={SearchIcon} alt="Search" className={`h-4 w-4`} />
        <input
          ref={inputRef}
          id="command-search"
          type="text"
          placeholder="Search"
          value={search}
          onChange={(e) => {
            setSearch((e.target as HTMLInputElement).value);
            if ((e.target as HTMLInputElement).value.length > 0) {
              searchByTitle((e.target as HTMLInputElement).value);
            } else {
              setSearchResults(null);
            }
          }}
          className="w-full border-none bg-transparent py-1 pr-2 placeholder:text-gray-600 focus:outline-none focus:ring-0"
        />
      </div>

      <div className="max-h-[50vh] min-h-fit overflow-y-scroll">
        {!searchResults && (
          <div className="mt-3 px-3 py-3">
            <h5 className="ml-2 text-xs font-medium text-gray-600">Pages</h5>
            <ul className="mt-2 flex flex-col">
              {pages.map((page) => (
                <li key={page.title}>
                  <PageLink
                    title={page.title}
                    url={page.url}
                    handleHoverFocus={handleHoverFocus}
                  />
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
                    {searchResults[key].map((page) => {
                      let url = page.url;
                      switch (key) {
                        case 'Roadmaps':
                          url = page.url;
                          break;
                        case 'Best Practices':
                          url = `/best-practices${page.url}`;
                          break;
                        case 'Guides':
                          url = `/guides${page.url}`;
                          break;
                        case 'Videos':
                          url = `/videos${page.url}`;
                          break;
                        default:
                          break;
                      }
                      return (
                        <li key={url}>
                          <PageLink
                            title={page.title}
                            url={url}
                            handleHoverFocus={handleHoverFocus}
                          />
                        </li>
                      );
                    })}
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
    </div>
  );
}

function PageLink({
  title,
  url,
  handleHoverFocus,
}: {
  title: string;
  url: string;
  handleHoverFocus: (e: MouseEvent) => void;
}) {
  return (
    <a
      href={url}
      onMouseOver={handleHoverFocus}
      className="block rounded p-2 text-sm focus:outline-none aria-selected:bg-red-100"
    >
      {title}
    </a>
  );
}
