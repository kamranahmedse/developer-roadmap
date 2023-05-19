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
            <div className="fixed inset-0 h-screen w-screen">
              <div className="absolute inset-0 bg-black opacity-50" />
              <div
                ref={commandModalRef}
                onKeyDown={handleTrapFocusKeydown}
                className="absolute left-1/2 top-20 z-50 w-[80vw] max-w-md -translate-x-1/2"
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
