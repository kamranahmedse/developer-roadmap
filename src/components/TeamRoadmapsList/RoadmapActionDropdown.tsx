import MoreIcon from '../../icons/more-vertical.svg';
import { useRef, useState } from 'react';
import { useOutsideClick } from '../../hooks/use-outside-click';
import {MoreVertical, PenSquare, Trash2} from 'lucide-react';

type RoadmapActionDropdownProps = {
  onDelete?: () => void;
  onEdit?: () => void;
};

export function RoadmapActionDropdown(props: RoadmapActionDropdownProps) {
  const { onDelete, onEdit } = props;

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
        <img alt="menu" src={MoreIcon.src} className="h-4 w-4" />
      </button>

      <button
        disabled={false}
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center sm:hidden gap-1 rounded-md border border-gray-300 bg-white px-2 py-1.5 text-xs hover:bg-gray-50 focus:outline-none"
      >
        <MoreVertical size={14} />
        Options
      </button>

      {isOpen && (
        <div
          ref={menuRef}
          className="align-right absolute right-auto sm:right-0 top-full z-50 mt-1 w-[100px] rounded-md bg-slate-800 px-2 py-2 text-white shadow-md"
        >
          <ul>
            {onEdit && (
              <li>
                <button
                  onClick={() => {
                    setIsOpen(false);
                    onEdit();
                  }}
                  className="flex w-full cursor-pointer items-center rounded p-2 text-sm font-medium text-slate-100 hover:bg-slate-700"
                >
                  <PenSquare size={14} className="mr-2" />
                  Edit
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
                  className="flex w-full cursor-pointer items-center rounded p-2 text-sm font-medium text-slate-100 hover:bg-slate-700"
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
