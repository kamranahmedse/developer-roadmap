import { type RefObject, useEffect, useState } from 'react';
import { isMobileScreen } from '../lib/is-mobile.ts';

// Checks if the sticky element is stuck or not
export function useStickyStuck<T extends HTMLElement>(
  ref: RefObject<T>,
  offset: number = 0,
): boolean {
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    if (isMobileScreen()) {
      return;
    }

    const handleScroll = () => {
      if (ref.current) {
        setIsSticky(ref.current.getBoundingClientRect().top <= offset);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [ref, offset]);

  return isSticky;
}
