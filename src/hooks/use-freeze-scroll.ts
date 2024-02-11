import { useEffect } from 'react';

export function useFreezeScroll(isActive: boolean) {
  useEffect(() => {
    if (!isActive) return;
    const scrollbarWidth =
      window.innerWidth - document.documentElement.clientWidth;
    document.documentElement.style.marginRight = scrollbarWidth + 'px';
    document.documentElement.style.overflow = 'hidden';

    return () => {
      document.documentElement.style.overflow = 'visible';
      document.documentElement.style.marginRight = '0';
    };
  }, [isActive]);
}
