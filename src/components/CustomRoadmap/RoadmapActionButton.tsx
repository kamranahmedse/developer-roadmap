import { useRef, useState } from 'react';
import { useOutsideClick } from '../../hooks/use-outside-click';
import { Lock, MoreVertical, PenSquare, Shapes, Trash2 } from 'lucide-react';

type RoadmapActionButtonProps = {
  onDelete?: () => void;
  onCustomize?: () => void;
  onUpdateSharing?: () => void;
};

export function RoadmapActionButton(props: RoadmapActionButtonProps) {
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
        className="inline-flex items-center justify-center rounded-md border border-gray-300 bg-white py-1.5 pl-2 pr-2 text-xs font-medium text-black hover:border-gray-300 hover:bg-gray-300 sm:pl-1.5 sm:pr-3 sm:text-sm"
      >
        <MoreVertical className="mr-0 h-4 w-4 stroke-[2.5] sm:mr-1.5" />
        <span className="hidden sm:inline">Actions</span>
      </button>

      {isOpen && (
        <div
          ref={menuRef}
          className="align-right absolute right-0 top-full z-[9999] mt-1 w-[140px] rounded-md bg-slate-800 px-2 py-2 text-white shadow-md"
        >
          <ul>
            {onCustomize && (
              <li>
                <button
                  onClick={() => {
                    setIsOpen(false);
                    onCustomize();
                  }}
                  className="flex w-full cursor-pointer items-center rounded p-2 text-sm font-medium text-slate-100 hover:bg-slate-700"
                >
                  <PenSquare size={14} className="mr-2" />
                  Edit
                </button>
              </li>
            )}
            {onUpdateSharing && (
              <li>
                <button
                  onClick={() => {
                    setIsOpen(false);
                    onUpdateSharing();
                  }}
                  className="flex w-full cursor-pointer items-center rounded p-2 text-sm font-medium text-slate-100 hover:bg-slate-700"
                >
                  <Lock size={14} className="mr-2" />
                  Sharing
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
