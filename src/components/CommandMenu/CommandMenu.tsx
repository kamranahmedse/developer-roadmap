import { useEffect, useRef, useState } from 'preact/hooks';
import { createPortal } from 'preact/compat';
import CommandSearch from './CommandSearch';
import { useOutsideClick } from '../../hooks/use-outside-click';

export default function Command() {
  const commandModalRef = useRef<HTMLDivElement>(null);
  const initialTriggerRef = useRef<HTMLButtonElement>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  useEffect(() => {
    const openCommand = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setIsOpen(true);
      } else if (e.key === 'Escape') {
        setIsOpen(false);
        initialTriggerRef.current?.focus();
      }
    };

    window.addEventListener('keydown', openCommand);
    return () => {
      window.removeEventListener('keydown', openCommand);
    };
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isOpen]);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        ref={initialTriggerRef}
        className="group flex h-6 w-6 items-center justify-center rounded p-1 hover:bg-gray-50/20"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          class="h-4 w-4 stroke-gray-400 group-hover:stroke-white"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
          />
        </svg>
      </button>
      {isOpen &&
        createPortal(
          <>
            <div className="fixed inset-0 z-50 h-screen w-screen">
              <div
                className="absolute inset-0 bg-black opacity-50"
                onClick={() => setIsOpen(false)}
              />
              <div
                ref={commandModalRef}
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
