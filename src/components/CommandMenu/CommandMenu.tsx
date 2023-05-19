import { useEffect, useRef, useState } from 'preact/hooks';
import { createPortal } from 'preact/compat';
import CommandSearch from './CommandSearch';
import { useOutsideClick } from '../../hooks/use-outside-click';

export default function Command() {
  const commandModalRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [activeElement, setActiveElement] = useState<HTMLElement | null>(null);
  const [activeElementIndex, setActiveElementIndex] = useState<number>(0);

  useEffect(() => {
    const openCommand = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
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
    let index: number = 0;

    if (e.key === 'Tab') {
      e.preventDefault();
      if (e.shiftKey) {
        index = activeElementIndex - 1;
        if (index < 0) {
          index = focusableElements.length - 1;
        }
      } else {
        index = activeElementIndex + 1;
        if (index > focusableElements.length - 1) {
          index = 0;
        }
      }

      const selectedElement = focusableElements[index];
      selectedElement.ariaSelected = 'true';

      for (const element of focusableElements) {
        if (element !== selectedElement) {
          element.removeAttribute('aria-selected');
        }
      }
      setActiveElementIndex(index);
      setActiveElement(focusableElements[index]);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      index = activeElementIndex - 1;
      if (index < 0) {
        index = focusableElements.length - 1;
      }

      const selectedElement = focusableElements[index];
      selectedElement.ariaSelected = 'true';

      for (const element of focusableElements) {
        if (element !== selectedElement) {
          element.removeAttribute('aria-selected');
        }
      }
      setActiveElementIndex(index);
      setActiveElement(focusableElements[index]);
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      index = activeElementIndex + 1;
      if (index > focusableElements.length - 1) {
        index = 0;
      }

      const selectedElement = focusableElements[index];
      selectedElement.ariaSelected = 'true';

      for (const element of focusableElements) {
        if (element !== selectedElement) {
          element.removeAttribute('aria-selected');
        }
      }
      setActiveElementIndex(index);
      setActiveElement(focusableElements[index]);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (activeElement?.id === 'command-search') return;
      activeElement?.click();
    }
  }

  useOutsideClick(commandModalRef, () => {
    setIsOpen(false);
  });

  // Prevent scrolling when command menu is open
  useEffect(() => {
    const focusableElements = commandModalRef.current?.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    ) as NodeListOf<HTMLElement>;
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setActiveElement(focusableElements[1]);
      setActiveElementIndex(1);

      for (const element of focusableElements) {
        element.removeAttribute('aria-selected');
      }

      const selectedElement = focusableElements[1];
      selectedElement.ariaSelected = 'true';
    } else {
      document.body.style.overflow = 'auto';
      setActiveElement(null);
      setActiveElementIndex(0);

      if (!focusableElements) return;
      for (const element of focusableElements) {
        element.removeAttribute('aria-selected');
      }
    }
  }, [isOpen]);

  const handleSearchResultsFocus = () => {
    const focusableElements = commandModalRef.current?.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    ) as NodeListOf<HTMLElement>;

    const selectedElement = focusableElements[1];
    if (!selectedElement) return;
    selectedElement.ariaSelected = 'true';

    for (const element of focusableElements) {
      if (element !== selectedElement) {
        element.removeAttribute('aria-selected');
      }
    }
    setActiveElementIndex(1);
    setActiveElement(focusableElements[1]);
  };

  const handleHoverFocus = (e: MouseEvent) => {
    const focusableElements = commandModalRef.current?.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    ) as NodeListOf<HTMLElement>;

    const selectedElement = e.target as HTMLElement;
    selectedElement.ariaSelected = 'true';

    for (const element of focusableElements) {
      if (element !== selectedElement) {
        element.removeAttribute('aria-selected');
      }
    }

    setActiveElementIndex(
      Array.from(focusableElements).indexOf(selectedElement)
    );
    setActiveElement(selectedElement);
  };

  useEffect(() => {
    // activeElement?.focus();
    console.log(activeElement);
  }, [activeElement]);

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
                <CommandSearch
                  handleSearchResultsFocus={handleSearchResultsFocus}
                  handleHoverFocus={handleHoverFocus}
                />
              </div>
            </div>
          </>,
          document.body
        )}
    </>
  );
}
