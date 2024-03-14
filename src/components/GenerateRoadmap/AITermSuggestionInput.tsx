import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type InputHTMLAttributes,
} from 'react';
import { cn } from '../../lib/classname';
import { useOutsideClick } from '../../hooks/use-outside-click';
import { useDebounceValue } from '../../hooks/use-debounce';
import { httpGet } from '../../lib/http';
import { useToast } from '../../hooks/use-toast';
import { Loader2 } from 'lucide-react';

type GetTopAIRoadmapTermResponse = {
  _id: string;
  term: string;
  title: string;
}[];

type AITermSuggestionInputProps = {
  value: string;
  onValueChange: (value: string) => void;
  onSelect?: (roadmapId: string) => void;
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

  const toast = useToast();
  const searchInputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const [isActive, setIsActive] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [searchResults, setSearchResults] =
    useState<GetTopAIRoadmapTermResponse>([]);
  const [searchedText, setSearchedText] = useState(defaultValue);
  const [activeCounter, setActiveCounter] = useState(0);
  const debouncedSearchValue = useDebounceValue(searchedText, 500);

  const loadTopAIRoadmapTerm = async () => {
    if (debouncedSearchValue.length === 0) {
      return [];
    }

    if (termCache.has(debouncedSearchValue)) {
      const cachedData = termCache.get(debouncedSearchValue);
      return cachedData || [];
    }

    const { response, error } = await httpGet<GetTopAIRoadmapTermResponse>(
      `${import.meta.env.PUBLIC_API_URL}/v1-get-top-ai-roadmap-term`,
      {
        term: debouncedSearchValue,
      },
    );

    if (error || !response) {
      toast.error(error?.message || 'Something went wrong');
      setSearchResults([]);
      return [];
    }

    termCache.set(debouncedSearchValue, response);
    return response;
  };

  useEffect(() => {
    if (debouncedSearchValue.length === 0) {
      setSearchResults([]);
      return;
    }

    setIsActive(true);
    setIsLoading(true);
    loadTopAIRoadmapTerm().then((results) => {
      setSearchResults(results?.slice(0, 5) || []);
      setActiveCounter(0);
      setIsLoading(false);
    });
  }, [debouncedSearchValue]);

  useOutsideClick(dropdownRef, () => {
    setIsActive(false);
  });

  return (
    <div className={cn('relative', wrapperClassName)}>
      <input
        {...inputProps}
        ref={searchInputRef}
        type="text"
        value={defaultValue}
        className={cn(
          'w-full rounded-md border border-gray-400 px-3 py-2.5 pr-8 transition-colors focus:border-black focus:outline-none',
          inputClassName,
        )}
        placeholder={placeholder}
        autoComplete="off"
        onInput={(e) => {
          const value = (e.target as HTMLInputElement).value.trim();
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
            e.preventDefault();
            const activeData = searchResults[activeCounter];
            if (activeData) {
              onValueChange(activeData.term);
              onSelect?.(activeData._id);
              setIsActive(false);
            }
          }
        }}
      />

      {isLoading && (
        <div className="absolute right-2 top-0 flex h-full items-center">
          <Loader2 className="h-5 w-5 animate-spin stroke-[2.5]" />
        </div>
      )}

      {isActive && searchResults.length > 0 && searchedText.length > 0 && (
        <div
          className="absolute top-full z-50 mt-1 w-full rounded-md border bg-white px-2 py-2 shadow"
          ref={dropdownRef}
        >
          <div className="flex flex-col">
            {searchResults.map((result, counter) => {
              return (
                <button
                  key={result?._id}
                  type="button"
                  className={cn(
                    'flex w-full items-center rounded p-2 text-sm',
                    counter === activeCounter ? 'bg-gray-100' : '',
                  )}
                  onMouseOver={() => setActiveCounter(counter)}
                  onClick={() => {
                    onValueChange(result?.term);
                    onSelect?.(result._id);
                    setSearchedText('');
                    setIsActive(false);
                  }}
                >
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
