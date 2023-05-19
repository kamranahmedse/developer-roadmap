import { useEffect, useState, useRef } from 'preact/hooks';
import SearchIcon from '../../icons/search-dark.svg';
import SpinnerIcon from '../../icons/spinner.svg';
import { DebounceInput } from './DebounceInput';

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
  const inputRef = useRef<HTMLInputElement>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [search, setSearch] = useState<string>('');
  const [pagesJson, setPagesJson] = useState<PagesResults>({});
  const [searchResults, setSearchResults] = useState<PagesResults | null>(null);
  const icon = isLoading ? SpinnerIcon : SearchIcon;

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
    setIsLoading(false);
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
    <div className="h-full rounded-lg border border-gray-200 bg-white shadow-md">
      <div className="flex items-center gap-2 border-b border-gray-200 px-5 py-2 font-normal">
        <img
          src={icon}
          alt="Search"
          className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`}
        />
        <DebounceInput
          ref={inputRef}
          type="text"
          placeholder="Search"
          onChange={(value) => {
            setSearch(value as string);
          }}
          className="w-full border-none bg-transparent py-1 pr-2 placeholder:text-gray-600 focus:outline-none focus:ring-0"
        />
      </div>

      <div className="max-h-[40vh] min-h-fit overflow-y-scroll">
        {!searchResults && (
          <div className="mt-3 px-3 py-3">
            <h5 className="ml-2 text-xs font-medium text-gray-600">Pages</h5>
            <ul className="mt-2 flex flex-col">
              {pages.map((page) => (
                <li key={page.title}>
                  <PageLink title={page.title} url={page.url} />
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
                          <PageLink title={page.title} url={url} />
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

function PageLink({ title, url }: { title: string; url: string }) {
  return (
    <a
      href={url}
      className="block rounded p-2 text-sm hover:bg-gray-100 focus:outline-none focus-visible:bg-gray-100 focus-visible:ring-2 focus-visible:ring-gray-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
    >
      {title}
    </a>
  );
}
