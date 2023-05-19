import { useEffect, useRef, useState } from 'preact/hooks';
import { RefObject, createPortal } from 'preact/compat';
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
    const focusableElements = getFocusableElements(commandModalRef.current);
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
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      index = activeElementIndex - 1;
      if (index < 0) {
        index = focusableElements.length - 1;
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      index = activeElementIndex + 1;
      if (index > focusableElements.length - 1) {
        index = 0;
      }
    } else if (e.key === 'Enter' && activeElement?.id !== 'command-search') {
      activeElement?.click();
    } else {
      return;
    }

    const selectedElement = focusableElements[index];
    selectedElement.ariaSelected = 'true';

    for (const element of focusableElements) {
      if (element !== selectedElement) {
        element.removeAttribute('aria-selected');
      }
    }

    setActiveElementIndex(index);
    setActiveElement(selectedElement);
  }

  useOutsideClick(commandModalRef, () => {
    setIsOpen(false);
  });

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isOpen]);

  const handleSearchResultsFocus = () => {
    const focusableElements = getFocusableElements(commandModalRef.current);

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
    const focusableElements = getFocusableElements(commandModalRef.current);

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

function getFocusableElements(parent: HTMLElement | any): HTMLElement[] {
  return Array.from(
    parent.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    )
  ) as HTMLElement[];
}
