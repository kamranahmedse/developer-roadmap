import { useEffect, useState } from 'preact/hooks';
import { httpGet } from '../../lib/http';

type PageType = {
  url: string;
  title: string;
  group: string;
};

const defaultPages: PageType[] = [
  { url: '/', title: 'Home', group: 'Pages' },
  { url: '/profile', title: 'Account', group: 'Pages' },
  { url: '/roadmaps', title: 'Roadmaps', group: 'Pages' },
  { url: '/best-practices', title: 'Best Practices', group: 'Pages' },
  { url: '/guides', title: 'Guides', group: 'Pages' },
  { url: '/videos', title: 'Videos', group: 'Pages' },
];

export function CommandMenu() {
  const [isActive, setIsActive] = useState(true);
  const [allPages, setAllPages] = useState<PageType[]>([]);
  const [searchResults, setSearchResults] = useState<PageType[]>(defaultPages);
  const [searchedText, setSearchedText] = useState('');
  const [activeCounter, setActiveCounter] = useState(0);

  async function getAllPages() {
    if (allPages.length > 0) {
      return allPages;
    }

    const { error, response } = await httpGet<PageType[]>(`/pages.json`);
    if (!response) {
      return defaultPages;
    }

    setAllPages([...defaultPages, ...response]);

    return response;
  }

  useEffect(() => {
    if (!searchedText) {
      setSearchResults(defaultPages);
      return;
    }

    const normalizedSearchText = searchedText.trim().toLowerCase();
    getAllPages().then((unfilteredPages = defaultPages) => {
      const filteredPages = unfilteredPages.filter((currPage: PageType) => {
        return (
          currPage.title.toLowerCase().indexOf(normalizedSearchText) !== -1
        );
      });

      setActiveCounter(0);
      setSearchResults(filteredPages);
    });
  }, [searchedText]);

  if (!isActive) {
    return null;
  }

  return (
    <div className="fixed left-0 right-0 top-0 z-50 flex h-full justify-center overflow-y-auto overflow-x-hidden bg-black/50">
      <div className="relative top-20 h-full w-full max-w-lg p-2 md:h-auto">
        <div className="relative rounded-lg bg-white shadow">
          <input
            autofocus={true}
            type="text"
            value={searchedText}
            className="w-full rounded-t-md border-b p-4 text-sm focus:bg-gray-50 focus:outline-0"
            placeholder="Search anywhere .."
            autocomplete="off"
            onInput={(e) => {
              const value = (e.target as HTMLInputElement).value.trim();
              setSearchedText(value);
            }}
            onKeyDown={(e) => {
              if (e.key === 'ArrowDown') {
                const canGoNext = activeCounter < searchResults.length - 1;
                setActiveCounter(canGoNext ? activeCounter + 1 : 0);
              } else if (e.key === 'ArrowUp') {
                const canGoPrev = activeCounter > 0;
                setActiveCounter(
                  canGoPrev ? activeCounter - 1 : searchResults.length - 1
                );
              } else if (e.key === 'Tab') {
                e.preventDefault();
              } else if (e.key === 'Enter') {
                const activePage = searchResults[activeCounter];
                if (activePage) {
                  window.location.href = activePage.url;
                }
              }
            }}
          />

          <div class="px-2 py-2">
            <div className="flex flex-col">
              {searchResults.map((page, counter) => (
                <a
                  class={`block w-full rounded p-2 text-sm ${
                    counter === activeCounter ? 'bg-gray-100' : ''
                  }`}
                  onMouseOver={() => setActiveCounter(counter)}
                  href={page.url}
                >
                  {searchedText && (
                    <span class="mr-2 text-gray-400">{page.group}</span>
                  )}
                  {!searchedText && (
                    <span class="mr-2 text-gray-400">ICON</span>
                  )}
                  {page.title}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
