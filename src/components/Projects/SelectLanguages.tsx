import { useEffect, useRef, useState } from 'react';
import { useOutsideClick } from '../../hooks/use-outside-click';
import { httpGet } from '../../lib/http';
import { useToast } from '../../hooks/use-toast';
import { ChevronDown, X } from 'lucide-react';

type SelectLanguagesProps = {
  projectId: string;
  selectedLanguage: string;
  onSelectLanguage: (language: string) => void;
};

export function SelectLanguages(props: SelectLanguagesProps) {
  const { projectId, onSelectLanguage, selectedLanguage } = props;

  const dropdownRef = useRef<HTMLDivElement>(null);
  const toast = useToast();

  const [distinctLanguages, setDistinctLanguages] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState(false);

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
  });

  useEffect(() => {
    loadDistinctLanguages().finally(() => {});
  }, []);

  return (
    <div className="relative flex">
      <button
        className="flex items-center gap-1 rounded-md border border-gray-300 py-1.5 pl-3 pr-2 text-xs font-medium text-gray-900"
        onClick={() => setIsOpen(!isOpen)}
      >
        {selectedLanguage || 'Select Language'}

        <ChevronDown className="ml-1 h-4 w-4" />
      </button>
      {selectedLanguage && (
        <button
          className="ml-1 text-red-500 text-xs border border-red-500 rounded-md px-2 py-1"
          onClick={() => onSelectLanguage('')}
        >
          Clear
        </button>
      )}

      {isOpen && (
        <div
          className="absolute right-0 top-full z-10 w-full min-w-[200px] max-w-[200px] translate-y-1.5 overflow-hidden rounded-md border border-gray-300 bg-white p-1 shadow-lg"
          ref={dropdownRef}
        >
          {distinctLanguages.map((language) => {
            const isSelected = selectedLanguage === language;

            return (
              <button
                key={language}
                className="flex w-full items-center rounded-md px-4 py-1.5 text-left text-sm text-gray-700 hover:bg-gray-100 aria-selected:bg-gray-100"
                onClick={() => {
                  onSelectLanguage(language);
                  setIsOpen(false);
                }}
                aria-selected={isSelected}
              >
                {language}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
