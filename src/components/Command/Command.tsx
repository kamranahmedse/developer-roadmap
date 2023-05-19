import { useEffect, useRef, useState } from 'preact/hooks';
import { createPortal } from 'preact/compat';
import CommandSearch from './CommandSearch';
import { useOutsideClick } from '../../hooks/use-outside-click';

export default function Command() {
  const commandModalRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  useEffect(() => {
    const openCommand = (e: KeyboardEvent) => {
      if (e.metaKey && e.key === 'k') {
        e.preventDefault();
        setIsOpen(true);
      } else if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };

    window.addEventListener('keydown', openCommand);
    return () => {
      window.removeEventListener('keydown', openCommand);
    };
  }, [isOpen]);

  function handleTrapFocusKeydown(e: KeyboardEvent) {
    const focusableElements = commandModalRef.current?.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    ) as NodeListOf<HTMLElement>;

    const firstFocusableElement = focusableElements[0];
    const lastFocusableElement =
      focusableElements[focusableElements.length - 1];

    if (e.key === 'Tab') {
      if (e.shiftKey) {
        if (document.activeElement === firstFocusableElement) {
          e.preventDefault();
          lastFocusableElement.focus();
        }
      } else {
        if (document.activeElement === lastFocusableElement) {
          e.preventDefault();
          firstFocusableElement.focus();
        }
      }
    } else if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      e.preventDefault();
      const activeElement = document.activeElement as HTMLElement;
      const activeElementIndex =
        Array.from(focusableElements).indexOf(activeElement);
      let nextElementIndex = 0;

      if (e.key === 'ArrowDown') {
        if (activeElementIndex === focusableElements.length - 1) {
          nextElementIndex = focusableElements.length - 1;
        } else {
          nextElementIndex = activeElementIndex + 1;
        }
      } else if (e.key === 'ArrowUp') {
        if (activeElementIndex === 0) {
          nextElementIndex = 0;
        } else {
          nextElementIndex = activeElementIndex - 1;
        }
      }
      const nextElement = focusableElements[nextElementIndex];
      nextElement.focus();
    }
  }

  useOutsideClick(commandModalRef, () => {
    setIsOpen(false);
  });

  return (
    <>
      {isOpen &&
        createPortal(
          <>
            <div className="fixed inset-0 z-50 h-screen w-screen">
              <div className="absolute inset-0 bg-black opacity-50" />
              <div
                ref={commandModalRef}
                onKeyDown={handleTrapFocusKeydown}
                className="absolute left-1/2 top-20 w-[80vw] max-w-md -translate-x-1/2"
                tabIndex={-1}
              >
                <CommandSearch />
              </div>
            </div>
          </>,
          document.body
        )}
    </>
  );
}
