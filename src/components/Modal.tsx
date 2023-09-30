import { type ReactNode, useRef } from 'react';
import { useOutsideClick } from '../hooks/use-outside-click';
import { useKeydown } from '../hooks/use-keydown';
import { cn } from '../lib/classname';

type ModalProps = {
  onClose: () => void;
  children: ReactNode;
  bodyClassName?: string;
  wrapperClassName?: string;
};

export function Modal(props: ModalProps) {
  const { onClose, children, bodyClassName, wrapperClassName } = props;

  const popupBodyEl = useRef<HTMLDivElement>(null);

  useKeydown('Escape', () => {
    onClose();
  });

  useOutsideClick(popupBodyEl, () => {
    onClose();
  });

  return (
    <div className="popup fixed left-0 right-0 top-0 z-[99] flex h-full items-center justify-center overflow-y-auto overflow-x-hidden bg-black/50">
      <div
        className={cn(
          'relative h-full w-full max-w-md p-4 md:h-auto',
          wrapperClassName
        )}
      >
        <div
          ref={popupBodyEl}
          className={cn(
            'popup-body relative h-full rounded-lg bg-white shadow',
            bodyClassName
          )}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
