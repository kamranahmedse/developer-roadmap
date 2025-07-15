import { useEffect } from 'react';

export function useOutsideClick(ref: any, callback: any) {
  useEffect(() => {
    const listener = (event: any) => {
      const isClickedOutside =
        !ref?.current?.contains(event.target) &&
        !document?.getElementById('gtx-trans')?.contains(event.target);
      if (!isClickedOutside) {
        return;
      }

      callback?.();
    };

    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);

    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [ref]);
}
