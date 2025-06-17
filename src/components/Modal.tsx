import { type ReactNode, useRef } from 'react';
import { useOutsideClick } from '../hooks/use-outside-click';
import { useKeydown } from '../hooks/use-keydown';
import { cn } from '../lib/classname';
import { X } from 'lucide-react';

type ModalProps = {
  onClose: () => void;
  children: ReactNode;
  overlayClassName?: string;
  bodyClassName?: string;
  wrapperClassName?: string;
  hasCloseButton?: boolean;
};

export function Modal(props: ModalProps) {
  const {
    onClose,
    children,
    bodyClassName,
    wrapperClassName,
    overlayClassName,
    hasCloseButton = true,
  } = props;

  const popupBodyEl = useRef<HTMLDivElement>(null);

  useKeydown('Escape', () => {
    onClose();
  });

  useOutsideClick(popupBodyEl, () => {
    onClose();
  });

  return (
    <div
      className={cn(
        'fixed top-0 right-0 left-0 z-99 flex h-full items-center justify-center overflow-x-hidden overflow-y-auto bg-black/50',
        overlayClassName,
      )}
    >
      <div
        className={cn(
          'relative h-full w-full max-w-md p-4 md:h-auto',
          wrapperClassName,
        )}
      >
        <div
          ref={popupBodyEl}
          className={cn(
            'relative h-full rounded-lg bg-white shadow-sm',
            bodyClassName,
          )}
        >
          {hasCloseButton && (
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-300 hover:text-gray-700"
            >
              <X className="h-5 w-5" />
            </button>
          )}
          {children}
        </div>
      </div>
    </div>
  );
}
