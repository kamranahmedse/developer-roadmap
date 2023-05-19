import { useEffect, useState } from 'preact/hooks';
import { createPortal } from 'preact/compat';
import CommandSearch from './CommandSearch';

export default function Command() {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  useEffect(() => {
    const openCommand = (e: KeyboardEvent) => {
      if (e.metaKey && e.key === 'k') {
        e.preventDefault();
        // Set focus on the input
        setIsOpen(true);
      } else if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };

    window.addEventListener('keydown', openCommand);

    return () => {
      window.removeEventListener('keydown', openCommand);
    };
  });

  return (
    <>
      {isOpen &&
        createPortal(
          <>
            <div className="fixed inset-0 h-screen w-screen">
              <div
                className="absolute inset-0 bg-black opacity-50"
                onClick={() => setIsOpen(false)}
              />
              <div className="absolute left-1/2 top-20 z-50 w-[50vw] -translate-x-1/2">
                <CommandSearch />
              </div>
            </div>
          </>,
          document.body
        )}
    </>
  );
}
