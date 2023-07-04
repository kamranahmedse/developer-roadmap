import { useEffect, useState } from 'preact/hooks';

export type SelectorDataType = {
  id: string;
  title: string;
};

export function SearchSelector({
  defaultData,
  onSelect,
  inputClassName,
  searchInputId,
  placeholder,
}: {
  defaultData: SelectorDataType[];
  onSelect: (data: SelectorDataType) => void;
  inputClassName?: string;
  searchInputId?: string;
  placeholder?: string;
}) {
  const [isActive, setIsActive] = useState(false);
  const [searchResults, setSearchResults] = useState<SelectorDataType[]>([]);
  const [searchedText, setSearchedText] = useState('');
  const [activeCounter, setActiveCounter] = useState(0);

  useEffect(() => {
    if (searchedText.length === 0) {
      setIsActive(false);
      setSearchResults([]);
      return;
    }

    const normalizedSearchedText = searchedText.trim().toLowerCase();
    const results = defaultData
      .filter((data) => {
        return data.title.toLowerCase().indexOf(normalizedSearchedText) !== -1;
      })
      .slice(0, 5);

    setIsActive(true);
    setSearchResults(results);
    setActiveCounter(0);
  }, [searchedText]);

  return (
    <div className="relative">
      <input
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
        <div class="absolute top-14 z-50 w-full rounded-md bg-gray-100 px-2 py-2">
          <div className="flex flex-col">
            {searchResults.length === 0 && (
              <div class="p-5 text-center text-sm text-gray-400">
                No results found
              </div>
            )}

            {searchResults.map((result, counter) => {
              return (
                <>
                  <button
                    type="button"
                    class={`flex w-full items-center rounded p-2 text-sm ${
                      counter === activeCounter ? 'bg-gray-200' : ''
                    }`}
                    onMouseOver={() => setActiveCounter(counter)}
                    onClick={() => {
                      onSelect(result);
                      setSearchedText('');
                      setIsActive(false);
                    }}
                  >
                    {result.title}
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
