import { useRef, useState } from 'react';
import { useOutsideClick } from '../../hooks/use-outside-click';
import { Lock, MoreVertical, Shapes, Trash2 } from 'lucide-react';
import { MoreVerticalIcon } from '../ReactIcons/MoreVerticalIcon.tsx';

type RoadmapActionDropdownProps = {
  onDelete?: () => void;
  onCustomize?: () => void;
  onUpdateSharing?: () => void;
};

export function RoadmapActionDropdown(props: RoadmapActionDropdownProps) {
  const { onDelete, onUpdateSharing, onCustomize } = props;

  const menuRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  useOutsideClick(menuRef, () => {
    setIsOpen(false);
  });

  return (
    <div className="relative">
      <button
        disabled={false}
        onClick={() => setIsOpen(!isOpen)}
        className="hidden items-center opacity-60 transition-opacity hover:opacity-100 disabled:cursor-not-allowed disabled:opacity-30 sm:flex"
      >
        <MoreVerticalIcon className={'h-4 w-4'} />
      </button>
      <button
        disabled={false}
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1 rounded-md border border-gray-300 bg-white px-2 py-1.5 text-xs hover:bg-gray-50 focus:outline-hidden sm:hidden"
      >
        <MoreVertical size={14} />
        Options
      </button>

      {isOpen && (
        <div
          ref={menuRef}
          className="align-right absolute right-auto top-full z-50 mt-1 w-[140px] rounded-md bg-slate-800 px-2 py-2 text-white shadow-md sm:right-0"
        >
          <ul>
            {onUpdateSharing && (
              <li>
                <button
                  onClick={() => {
                    setIsOpen(false);
                    onUpdateSharing();
                  }}
                  className="flex w-full cursor-pointer items-center rounded-sm p-2 text-sm font-medium text-slate-100 hover:bg-slate-700"
                >
                  <Lock size={14} className="mr-2" />
                  Sharing
                </button>
              </li>
            )}
            {onCustomize && (
              <li>
                <button
                  onClick={() => {
                    setIsOpen(false);
                    onCustomize();
                  }}
                  className="flex w-full cursor-pointer items-center rounded-sm p-2 text-sm font-medium text-slate-100 hover:bg-slate-700"
                >
                  <Shapes size={14} className="mr-2" />
                  Customize
                </button>
              </li>
            )}
            {onDelete && (
              <li>
                <button
                  onClick={() => {
                    setIsOpen(false);
                    onDelete();
                  }}
                  className="flex w-full cursor-pointer items-center rounded-sm p-2 text-sm font-medium text-slate-100 hover:bg-slate-700"
                >
                  <Trash2 size={14} className="mr-2" />
                  Delete
                </button>
              </li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}
