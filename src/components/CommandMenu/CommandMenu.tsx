import { Fragment, useEffect, useRef, useState } from 'react';
import { useKeydown } from '../../hooks/use-keydown';
import { useOutsideClick } from '../../hooks/use-outside-click';
import BestPracticesIcon from '../../icons/best-practices.svg';
import GuideIcon from '../../icons/guide.svg';
import HomeIcon from '../../icons/home.svg';
import RoadmapIcon from '../../icons/roadmap.svg';
import UserIcon from '../../icons/user.svg';
import GroupIcon from '../../icons/group.svg';
import VideoIcon from '../../icons/video.svg';
import { httpGet } from '../../lib/http';
import { isLoggedIn } from '../../lib/jwt';

export type PageType = {
  id: string;
  url: string;
  title: string;
  group: string;
  icon?: string;
  isProtected?: boolean;
  metadata?: Record<string, any>;
};

const defaultPages: PageType[] = [
  { id: 'home', url: '/', title: 'Home', group: 'Pages', icon: HomeIcon },
  {
    id: 'account',
    url: '/account',
    title: 'Account',
    group: 'Pages',
    icon: UserIcon,
    isProtected: true,
  },
  {
    id: 'team',
    url: '/team',
    title: 'Teams',
    group: 'Pages',
    icon: GroupIcon,
    isProtected: true,
  },
  {
    id: 'roadmaps',
    url: '/roadmaps',
    title: 'Roadmaps',
    group: 'Pages',
    icon: RoadmapIcon,
  },
  {
    id: 'best-practices',
    url: '/best-practices',
    title: 'Best Practices',
    group: 'Pages',
    icon: BestPracticesIcon,
  },
  {
    id: 'guides',
    url: '/guides',
    title: 'Guides',
    group: 'Pages',
    icon: GuideIcon,
  },
  {
    id: 'videos',
    url: '/videos',
    title: 'Videos',
    group: 'Pages',
    icon: VideoIcon,
  },
];

function shouldShowPage(page: PageType) {
  const isUser = isLoggedIn();

  return !page.isProtected || isUser;
}

export function CommandMenu() {
  const inputRef = useRef<HTMLInputElement>(null);
  const modalRef = useRef<HTMLInputElement>(null);
  const [isActive, setIsActive] = useState(false);
  const [allPages, setAllPages] = useState<PageType[]>([]);
  const [searchResults, setSearchResults] = useState<PageType[]>(defaultPages);
  const [searchedText, setSearchedText] = useState('');
  const [activeCounter, setActiveCounter] = useState(0);

  useKeydown('mod_k', () => {
    setIsActive(true);
  });

  useOutsideClick(modalRef, () => {
    setSearchedText('');
    setIsActive(false);
  });

  useEffect(() => {
    function handleToggleTopic(e: any) {
      setIsActive(true);
    }

    getAllPages();
    window.addEventListener(`command.k`, handleToggleTopic);
    return () => {
      window.removeEventListener(`command.k`, handleToggleTopic);
    };
  }, []);

  useEffect(() => {
    if (!isActive || !inputRef.current) {
      return;
    }

    inputRef.current.focus();
  }, [isActive]);

  async function getAllPages() {
    if (allPages.length > 0) {
      return allPages;
    }
    const { error, response } = await httpGet<PageType[]>(`/pages.json`);
    if (!response) {
      return defaultPages.filter(shouldShowPage);
    }

    setAllPages([...defaultPages, ...response].filter(shouldShowPage));

    return response;
  }

  useEffect(() => {
    if (!searchedText) {
      setSearchResults(defaultPages.filter(shouldShowPage));
      return;
    }

    const normalizedSearchText = searchedText.trim().toLowerCase();
    getAllPages().then((unfilteredPages = defaultPages) => {
      const filteredPages = unfilteredPages
        .filter((currPage: PageType) => {
          return (
            currPage.title.toLowerCase().indexOf(normalizedSearchText) !== -1
          );
        })
        .slice(0, 10);

      setActiveCounter(0);
      setSearchResults(filteredPages);
    });
  }, [searchedText]);

  if (!isActive) {
    return null;
  }

  return (
    <div className="fixed left-0 right-0 top-0 z-50 flex h-full justify-center overflow-y-auto overflow-x-hidden bg-black/50">
      <div className="relative top-0 h-full w-full max-w-lg p-2 sm:top-20 md:h-auto">
        <div className="relative rounded-lg bg-white shadow" ref={modalRef}>
          <input
            ref={inputRef}
            autoFocus={true}
            type="text"
            value={searchedText}
            className="w-full rounded-t-md border-b p-4 text-sm focus:bg-gray-50 focus:outline-none"
            placeholder="Search roadmaps, guides or pages .."
            autoComplete="off"
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
              } else if (e.key === 'Escape') {
                setSearchedText('');
                setIsActive(false);
              } else if (e.key === 'Enter') {
                const activePage = searchResults[activeCounter];
                if (activePage) {
                  window.location.href = activePage.url;
                }
              }
            }}
          />

          <div className="px-2 py-2">
            <div className="flex flex-col">
              {searchResults.length === 0 && (
                <div className="p-5 text-center text-sm text-gray-400">
                  No results found
                </div>
              )}

              {searchResults.map((page: PageType, counter: number) => {
                const prevPage = searchResults[counter - 1];
                const groupChanged = prevPage && prevPage.group !== page.group;

                return (
                  <Fragment key={page.id}>
                    {groupChanged && (
                      <div className="border-b border-gray-100"></div>
                    )}
                    <a
                      className={`flex w-full items-center rounded p-2 text-sm ${
                        counter === activeCounter ? 'bg-gray-100' : ''
                      }`}
                      onMouseOver={() => setActiveCounter(counter)}
                      href={page.url}
                    >
                      {!page.icon && (
                        <span className="mr-2 text-gray-400">{page.group}</span>
                      )}
                      {page.icon && (
                        <img
                          alt={page.title}
                          src={page.icon as any}
                          className="mr-2 h-4 w-4"
                        />
                      )}
                      {page.title}
                    </a>
                  </Fragment>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
