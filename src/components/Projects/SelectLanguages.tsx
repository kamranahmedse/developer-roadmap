import { useEffect, useRef, useState } from 'react';
import { useOutsideClick } from '../../hooks/use-outside-click';
import { httpGet } from '../../lib/http';
import { useToast } from '../../hooks/use-toast';
import { ChevronDown, Search, X } from 'lucide-react';

type SelectLanguagesProps = {
  projectId: string;
  selectedLanguage: string;
  onSelectLanguage: (language: string) => void;
};

export function SelectLanguages(props: SelectLanguagesProps) {
  const { projectId, onSelectLanguage, selectedLanguage } = props;

  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const optionsRef = useRef<HTMLDivElement>(null);
  const toast = useToast();

  const [distinctLanguages, setDistinctLanguages] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [highlightedIndex, setHighlightedIndex] = useState(0);

  const filteredLanguages = distinctLanguages.filter((language) =>
    language.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  // Handle scrolling of highlighted option into view
  useEffect(() => {
    if (!isOpen || !optionsRef.current) {
      return;
    }

    const options = optionsRef.current.getElementsByTagName('button');
    const highlightedOption = options[highlightedIndex];
    if (!highlightedOption) {
      return;
    }

    const containerRect = optionsRef.current.getBoundingClientRect();
    const optionRect = highlightedOption.getBoundingClientRect();

    const isAbove = optionRect.top < containerRect.top;
    const isBelow = optionRect.bottom > containerRect.bottom;

    if (isAbove || isBelow) {
      highlightedOption.scrollIntoView({
        block: 'nearest',
        behavior: 'instant',
      });
    }
  }, [highlightedIndex, isOpen]);

  const loadDistinctLanguages = async () => {
    const { response, error } = await httpGet<string[]>(
      `${import.meta.env.PUBLIC_API_URL}/v1-list-project-languages/${projectId}`,
    );

    if (error || !response) {
      toast.error(error?.message || 'Failed to load project languages');
      return;
    }

    setDistinctLanguages(response);
  };

  useOutsideClick(dropdownRef, () => {
    setIsOpen(false);
    setSearchQuery('');
    setHighlightedIndex(0);
  });

  useEffect(() => {
    loadDistinctLanguages().finally(() => {});
  }, []);

  useEffect(() => {
    if (isOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isOpen]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setHighlightedIndex((prev) =>
          prev >= filteredLanguages.length - 1 ? 0 : prev + 1,
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setHighlightedIndex((prev) =>
          prev <= 0 ? filteredLanguages.length - 1 : prev - 1,
        );
        break;
      case 'Enter':
        e.preventDefault();
        if (filteredLanguages[highlightedIndex]) {
          onSelectLanguage(filteredLanguages[highlightedIndex]);
          setIsOpen(false);
          setSearchQuery('');
          setHighlightedIndex(0);
        }
        break;
      case 'Escape':
        setIsOpen(false);
        setSearchQuery('');
        setHighlightedIndex(0);
        break;
    }
  };

  return (
    <div className="relative flex shrink-0">
      <div className="relative">
        <button
          className="flex items-center gap-1 rounded-md border border-gray-300 py-1.5 pl-3 pr-2 text-xs font-medium text-gray-900"
          onClick={() => setIsOpen(!isOpen)}
        >
          {selectedLanguage || 'Select Language'}
          <ChevronDown className="ml-1 h-4 w-4" />
        </button>
        {selectedLanguage && (
          <button
            className="absolute -right-1.5 -top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-white hover:bg-red-600"
            onClick={(e) => {
              e.stopPropagation();
              onSelectLanguage('');
            }}
          >
            <X className="size-3" strokeWidth={2.5} />
            <span className="sr-only">Clear selection</span>
          </button>
        )}
      </div>

      {isOpen && (
        <div
          className="absolute right-0 top-full z-10 w-full min-w-[200px] max-w-[200px] translate-y-1.5 overflow-hidden rounded-md border border-gray-300 bg-white p-1 shadow-lg"
          ref={dropdownRef}
          onKeyDown={handleKeyDown}
        >
          <div className="relative mb-1 px-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <input
              ref={searchInputRef}
              type="text"
              className="w-full rounded-md border border-gray-200 py-1.5 pl-9 pr-3 text-sm focus:border-gray-300 focus:outline-hidden"
              placeholder="Search languages..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setHighlightedIndex(0);
              }}
            />
          </div>
          <div ref={optionsRef} className="max-h-[200px] overflow-y-auto">
            {filteredLanguages.map((language, index) => {
              const isSelected = selectedLanguage === language;
              const isHighlighted = index === highlightedIndex;

              return (
                <button
                  key={language}
                  className={`flex w-full items-center rounded-md px-4 py-1.5 text-left text-sm text-gray-700 hover:bg-gray-100 aria-selected:bg-gray-100 ${
                    isHighlighted ? 'bg-gray-100' : ''
                  }`}
                  onClick={() => {
                    onSelectLanguage(language);
                    setIsOpen(false);
                    setSearchQuery('');
                    setHighlightedIndex(0);
                  }}
                  aria-selected={isSelected}
                >
                  {language}
                </button>
              );
            })}
            {filteredLanguages.length === 0 && (
              <div className="px-4 py-2 text-sm text-gray-500">
                No languages found
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
