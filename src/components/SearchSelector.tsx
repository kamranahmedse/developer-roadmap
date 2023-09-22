import { useEffect, useRef, useState } from 'react';

export type OptionType = {
  value: string;
  label: string;
};

export function SearchSelector({
  options,
  onSelect,
  inputClassName,
  searchInputId,
  placeholder,
}: {
  options: OptionType[];
  onSelect: (data: OptionType) => void;
  inputClassName?: string;
  searchInputId?: string;
  placeholder?: string;
}) {
  const searchInputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [isActive, setIsActive] = useState(false);
  const [searchResults, setSearchResults] = useState<OptionType[]>([]);
  const [searchedText, setSearchedText] = useState('');
  const [activeCounter, setActiveCounter] = useState(0);

  useEffect(() => {
    if (searchedText.length === 0) {
      setSearchResults(options.slice(0, 5));
      return;
    }

    setIsActive(true);
    const normalizedSearchedText = searchedText.trim().toLowerCase();
    const results = options
      .filter((data) => {
        return data.label.toLowerCase().indexOf(normalizedSearchedText) !== -1;
      })
      .slice(0, 5);

    setSearchResults(results);
    setActiveCounter(0);
  }, [searchedText]);

  useEffect(() => {
    setSearchResults(options.slice(0, 5));
  }, [options]);

  useEffect(() => {
    if (isActive) {
      const handleOutsideClick = (e: MouseEvent) => {
        if (
          dropdownRef.current &&
          !dropdownRef.current.contains(e.target as Node) &&
          searchInputRef.current &&
          !searchInputRef.current.contains(e.target as Node)
        ) {
          setIsActive(false);
          setSearchedText('');
          setSearchResults(options.slice(0, 5));
        }
      };

      document.addEventListener('mousedown', handleOutsideClick);

      return () => {
        document.removeEventListener('mousedown', handleOutsideClick);
      };
    }
  }, [isActive]);

  return (
    <div className="relative">
      <input
        ref={searchInputRef}
        type="text"
        id={searchInputId}
        value={searchedText}
        className={`w-full ${inputClassName}`}
        placeholder={placeholder}
        autoComplete="off"
        onInput={(e) => {
          const value = (e.target as HTMLInputElement).value.trim();
          setSearchedText(value);
        }}
        onFocus={() => {
          setIsActive(true);
          setSearchResults(options.slice(0, 5));
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
              onSelect(activeData);
              setSearchedText('');
              setIsActive(false);
            }
          }
        }}
      />

      {isActive && (
        <div
          className="absolute top-full z-50 mt-2 w-full rounded-md bg-gray-100 px-2 py-2"
          ref={dropdownRef}
        >
          <div className="flex flex-col">
            {searchResults.length === 0 && (
              <div className="p-5 text-center text-sm text-gray-400">
                No results found
              </div>
            )}

            {searchResults.map((result, counter) => {
              return (
                <>
                  <button
                    type="button"
                    className={`flex w-full items-center rounded p-2 text-sm ${
                      counter === activeCounter ? 'bg-gray-200' : ''
                    }`}
                    onMouseOver={() => setActiveCounter(counter)}
                    onClick={() => {
                      onSelect(result);
                      setSearchedText('');
                      setIsActive(false);
                    }}
                  >
                    {result.label}
                  </button>
                </>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
