import { useState } from 'preact/hooks';

const defaultPages = [
  { href: '/profile', title: 'Account', group: 'Pages' },
  { href: '/roadmaps', title: 'Roadmaps', group: 'Pages' },
  { href: '/best-practices', title: 'Best Practices', group: 'Pages' },
  { href: '/guides', title: 'Guides', group: 'Pages' },
  { href: '/videos', title: 'Videos', group: 'Pages' },
];

export function CommandMenu() {
  const [isActive, setIsActive] = useState(true);
  const [pages, setPages] = useState(defaultPages);
  const [searchedText, setSearchedText] = useState('');
  const [activeCounter, setActiveCounter] = useState(0);

  if (!isActive) {
    return null;
  }

  return (
    <div className="fixed left-0 right-0 top-0 z-50 flex h-full justify-center overflow-y-auto overflow-x-hidden bg-black/50">
      <div className="relative top-20 h-full w-full max-w-lg p-2 md:h-auto">
        <div className="relative rounded-lg bg-white shadow">
          <input
            type="text"
            value={searchedText}
            className="w-full rounded-t-md border-b p-4 text-sm focus:bg-gray-50 focus:outline-0"
            placeholder="Search anywhere .."
            onInput={(e) => {
              const value = (e.target as HTMLInputElement).value.trim();
              setSearchedText(value);
            }}
            onKeyDown={(e) => {
              if (e.key === 'ArrowDown') {
                const canGoNext = activeCounter < pages.length - 1;
                setActiveCounter(canGoNext ? activeCounter + 1 : 0);
              } else if (e.key === 'ArrowUp') {
                const canGoPrev = activeCounter > 0;
                setActiveCounter(
                  canGoPrev ? activeCounter - 1 : pages.length - 1
                );
              } else if (e.key === 'Enter') {
                // const activePage = pages[activeCounter]
              }
            }}
          />

          <div class="mt-2 px-2">
            <div className="flex flex-col">
              {pages.map((page, counter) => (
                <a
                  class={`block w-full rounded p-2 text-sm ${
                    counter === activeCounter ? 'bg-gray-100' : ''
                  }`}
                  onMouseOver={() => setActiveCounter(counter)}
                  href={page.href}
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
