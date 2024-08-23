import { useEffect, useRef, useState } from 'react';
import { cn } from '../../lib/classname';
import { useOutsideClick } from '../../hooks/use-outside-click';
import { httpGet } from '../../lib/http';
import { useToast } from '../../hooks/use-toast';

const languageColors = new Map([
  ['JavaScript', 'bg-[#f1e05a]'],
  ['Python', 'bg-[#3572A5]'],
  ['Java', 'bg-[#b07219]'],
  ['HTML', 'bg-[#e34c26]'],
  ['CSS', 'bg-[#563d7c]'],
  ['C++', 'bg-[#f34b7d]'],
  ['C', 'bg-[#555555]'],
  ['Go', 'bg-[#00ADD8]'],
  ['TypeScript', 'bg-[#2b7489]'],
  ['Shell', 'bg-[#89e051]'],
  ['Ruby', 'bg-[#701516]'],
  ['PHP', 'bg-[#4F5D95]'],
  ['Rust', 'bg-[#dea584]'],
  ['Swift', 'bg-[#ffac45]'],
  ['Kotlin', 'bg-[#A97BFF]'],
  ['Dart', 'bg-[#00B4AB]'],
  ['Scala', 'bg-[#c22d40]'],
  ['Objective-C', 'bg-[#438eff]'],
  ['Vue', 'bg-[#41b883]'],
  ['R', 'bg-[#198CE7]'],
  ['Perl', 'bg-[#0298c3]'],
  ['Haskell', 'bg-[#5e5086]'],
  ['Lua', 'bg-[#000080]'],
  ['Matlab', 'bg-[#e16737]'],
  ['Vim script', 'bg-[#199f4b]'],
  ['Elixir', 'bg-[#6e4a7e]'],
  ['Erlang', 'bg-[#B83998]'],
  ['Clojure', 'bg-[#db5855]'],
  ['Markdown', 'bg-[#083fa1]'],
  ['TeX', 'bg-[#3D6117]'],
  ['SQL', 'bg-[#e38c00]'],
]);

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
        className="rounded-lg border border-gray-300 px-3 py-1.5 text-sm font-medium text-gray-900"
        onClick={() => setIsOpen(!isOpen)}
      >
        {selectedLanguage || 'Select Language'}
      </button>

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
