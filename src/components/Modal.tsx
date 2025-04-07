import { type ReactNode, useRef } from 'react';
import { useOutsideClick } from '../hooks/use-outside-click';
import { useKeydown } from '../hooks/use-keydown';
import { cn } from '../lib/classname';

type ModalProps = {
  onClose: () => void;
  children: ReactNode;
  overlayClassName?: string;
  bodyClassName?: string;
  wrapperClassName?: string;
};

export function Modal(props: ModalProps) {
  const {
    onClose,
    children,
    bodyClassName,
    wrapperClassName,
    overlayClassName,
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
        'fixed left-0 right-0 top-0 z-99 flex h-full items-center justify-center overflow-y-auto overflow-x-hidden bg-black/50',
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
          {children}
        </div>
      </div>
    </div>
  );
}
