import {
  type InputHTMLAttributes,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { cn } from '../../lib/classname';
import { useOutsideClick } from '../../hooks/use-outside-click';
import { useDebounceValue } from '../../hooks/use-debounce';
import { httpGet } from '../../lib/http';
import { useToast } from '../../hooks/use-toast';
import { Spinner } from '../ReactIcons/Spinner.tsx';
import type { PageType } from '../CommandMenu/CommandMenu.tsx';

type GetTopAIRoadmapTermResponse = {
  _id: string;
  term: string;
  title: string;
  isOfficial: boolean;
}[];

type AITermSuggestionInputProps = {
  value: string;
  onValueChange: (value: string) => void;
  onSelect?: (roadmapId: string, roadmapTitle: string) => void;
  inputClassName?: string;
  wrapperClassName?: string;
  placeholder?: string;
} & Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'onSelect' | 'onChange' | 'className'
>;

export function AITermSuggestionInput(props: AITermSuggestionInputProps) {
  const {
    value: defaultValue,
    onValueChange,
    onSelect,
    inputClassName,
    wrapperClassName,
    placeholder,
    ...inputProps
  } = props;

  const termCache = useMemo(
    () => new Map<string, GetTopAIRoadmapTermResponse>(),
    [],
  );
  const [officialRoadmaps, setOfficialRoadmaps] =
    useState<GetTopAIRoadmapTermResponse>([]);

  const toast = useToast();
  const searchInputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const isFirstRender = useRef(true);

  const [isActive, setIsActive] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [searchResults, setSearchResults] =
    useState<GetTopAIRoadmapTermResponse>([]);
  const [searchedText, setSearchedText] = useState(defaultValue);
  const [activeCounter, setActiveCounter] = useState(0);
  const debouncedSearchValue = useDebounceValue(searchedText, 300);

  const loadTopAIRoadmapTerm = async () => {
    const trimmedValue = debouncedSearchValue.trim();
    if (trimmedValue.length === 0) {
      return [];
    }

    if (trimmedValue.length < 3) {
      return [];
    }

    if (termCache.has(trimmedValue)) {
      const cachedData = termCache.get(trimmedValue);
      return cachedData || [];
    }

    const { response, error } = await httpGet<GetTopAIRoadmapTermResponse>(
      `${import.meta.env.PUBLIC_API_URL}/v1-get-top-ai-roadmap-term`,
      {
        term: trimmedValue,
      },
    );

    if (error || !response) {
      toast.error(error?.message || 'Something went wrong');
      setSearchResults([]);
      return [];
    }

    termCache.set(trimmedValue, response);
    return response;
  };

  const loadOfficialRoadmaps = async () => {
    if (officialRoadmaps.length > 0) {
      return officialRoadmaps;
    }

    const { error, response } = await httpGet<PageType[]>(`/pages.json`);

    if (error) {
      toast.error(error.message || 'Something went wrong');
      return;
    }

    if (!response) {
      return [];
    }

    const allRoadmaps = response
      .filter((page) => page.group === 'Roadmaps')
      .sort((a, b) => {
        if (a.title === 'Android') return 1;
        return a.title.localeCompare(b.title);
      })
      .map((page) => ({
        _id: page.id,
        term: page.title,
        title: page.title,
        isOfficial: true,
      }));

    setOfficialRoadmaps(allRoadmaps);
    return allRoadmaps;
  };

  useEffect(() => {
    if (debouncedSearchValue.length === 0 || isFirstRender.current) {
      setSearchResults([]);
      return;
    }

    setIsActive(true);
    setIsLoading(true);
    loadTopAIRoadmapTerm()
      .then((results) => {
        const normalizedSearchText = debouncedSearchValue.trim().toLowerCase();
        const matchingOfficialRoadmaps = officialRoadmaps.filter((roadmap) => {
          return (
            roadmap.title.toLowerCase().indexOf(normalizedSearchText) !== -1
          );
        });

        setSearchResults(
          [...matchingOfficialRoadmaps, ...results]?.slice(0, 5) || [],
        );
        setActiveCounter(0);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [debouncedSearchValue]);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      loadOfficialRoadmaps().finally(() => {});
    }
  }, []);

  useOutsideClick(dropdownRef, () => {
    setIsActive(false);
  });

  const isFinishedTyping = debouncedSearchValue === searchedText;

  return (
    <div className={cn('relative', wrapperClassName)}>
      <input
        {...inputProps}
        ref={searchInputRef}
        type="text"
        value={defaultValue}
        className={cn(
          'w-full rounded-md border border-gray-400 px-3 py-2.5 pr-8 transition-colors focus:border-black focus:outline-hidden',
          inputClassName,
        )}
        placeholder={placeholder}
        autoComplete="off"
        onChange={(e) => {
          const value = (e.target as HTMLInputElement).value;
          setSearchedText(value);
          onValueChange(value);
        }}
        onFocus={() => {
          setIsActive(true);
        }}
        onKeyDown={(e) => {
          if (e.key === 'ArrowDown') {
            const canGoNext = activeCounter < searchResults.length - 1;
            setActiveCounter(canGoNext ? activeCounter + 1 : 0);
          } else if (e.key === 'ArrowUp') {
            const canGoPrev = activeCounter > 0;
            setActiveCounter(
              canGoPrev ? activeCounter - 1 : searchResults.length - 1,
            );
          } else if (e.key === 'Tab') {
            if (isActive) {
              e.preventDefault();
            }
          } else if (e.key === 'Escape') {
            setSearchedText('');
            setIsActive(false);
          } else if (e.key === 'Enter') {
            if (!searchResults.length || !isFinishedTyping) {
              return;
            }

            e.preventDefault();
            const activeData = searchResults[activeCounter];
            if (activeData) {
              if (activeData.isOfficial) {
                window.open(`/${activeData._id}`, '_blank')?.focus();
                return;
              }

              onValueChange(activeData.term);
              onSelect?.(activeData._id, activeData.title);
              setIsActive(false);
            }
          }
        }}
      />

      {isLoading && (
        <div className="absolute right-3 top-0 flex h-full items-center">
          <Spinner
            isDualRing={false}
            className="h-5 w-5 animate-spin stroke-[2.5]"
          />
        </div>
      )}

      {isActive &&
        isFinishedTyping &&
        searchResults.length > 0 &&
        searchedText.length > 0 && (
          <div
            className="absolute top-full z-50 mt-1 w-full rounded-md border bg-white p-1 shadow-sm"
            ref={dropdownRef}
          >
            <div className="flex flex-col">
              {searchResults.map((result, counter) => {
                return (
                  <button
                    key={result?._id}
                    type="button"
                    className={cn(
                      'flex w-full items-start rounded-sm p-2 text-left text-sm',
                      counter === activeCounter ? 'bg-gray-100' : '',
                    )}
                    onMouseOver={() => setActiveCounter(counter)}
                    onClick={() => {
                      if (result.isOfficial) {
                        window.location.href = `/${result._id}`;
                        return;
                      }

                      onValueChange(result?.term);
                      onSelect?.(result._id, result.title);
                      setSearchedText('');
                      setIsActive(false);
                    }}
                  >
                    <span
                      className={cn(
                        'mr-2 whitespace-nowrap rounded-full p-1 px-1.5 text-xs leading-none',
                        result.isOfficial
                          ? 'bg-green-500 text-green-50'
                          : 'bg-blue-400 text-blue-50',
                      )}
                    >
                      {result.isOfficial ? 'Official' : 'AI Generated'}
                    </span>
                    {result?.title || result?.term}
                  </button>
                );
              })}
            </div>
          </div>
        )}
    </div>
  );
}
