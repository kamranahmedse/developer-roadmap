import { useEffect, useState } from 'preact/hooks';

export function useKeydown(keyName: string, callback: any) {
  useEffect(() => {
    const listener = (event: any) => {
      if (event.key.toLowerCase() === keyName.toLowerCase()) {
        callback();
      }
    };

    window.addEventListener('keydown', listener);
    return () => {
      window.removeEventListener('keydown', listener);
    };
  }, []);
}
