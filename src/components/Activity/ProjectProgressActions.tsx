import { MoreVertical, X } from 'lucide-react';
import { useRef, useState } from 'react';
import { useOutsideClick } from '../../hooks/use-outside-click';
import { useKeydown } from '../../hooks/use-keydown';
import { cn } from '../../lib/classname';
import { useCopyText } from '../../hooks/use-copy-text';
import { CheckIcon } from '../ReactIcons/CheckIcon';
import { ShareIcon } from '../ReactIcons/ShareIcon';

type ProjectProgressActionsType = {
  userId: string;
  projectId: string;
};

export function ProjectProgressActions(props: ProjectProgressActionsType) {
  const { userId, projectId } = props;

  const dropdownRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  const { copyText, isCopied } = useCopyText();

  const projectSolutionUrl = `${import.meta.env.DEV ? 'http://localhost:3000' : 'https://roadmap.sh'}/projects/${projectId}/solutions?u=${userId}`;

  useOutsideClick(dropdownRef, () => {
    setIsOpen(false);
  });

  useKeydown('Escape', () => {
    setIsOpen(false);
  });

  return (
    <div className="relative h-full" ref={dropdownRef}>
      <button
        className="h-full text-gray-400 hover:text-gray-700"
        onClick={() => setIsOpen(!isOpen)}
      >
        <MoreVertical size={16} />
      </button>

      {isOpen && (
        <div className="absolute right-0 top-8 z-10 w-48 overflow-hidden rounded-md border border-gray-200 bg-white shadow-lg">
          <button
            className={cn(
              'flex w-full items-center gap-1.5 p-2 text-xs font-medium hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-70 sm:text-sm',
              isCopied ? 'text-green-500' : 'text-gray-500 hover:text-black',
            )}
            onClick={() => {
              copyText(projectSolutionUrl);
            }}
          >
            {isCopied ? (
              <>
                <CheckIcon additionalClasses="h-3.5 w-3.5" /> Link Copied
              </>
            ) : (
              <>
                <ShareIcon className="h-3.5 w-3.5 stroke-[2.5px]" /> Share
                Solution
              </>
            )}
          </button>
        </div>
      )}
    </div>
  );
}
