import { useEffect } from 'preact/hooks';

export function useKeydown(keyName: string, callback: any, deps: any[] = []) {
  useEffect(() => {
    const listener = (event: any) => {
      if (
        !keyName.startsWith('mod_') &&
        event.key.toLowerCase() === keyName.toLowerCase()
      ) {
        callback();
      } else if (
        keyName.startsWith('mod_') &&
        event.metaKey &&
        event.key.toLowerCase() === keyName.replace('mod_', '').toLowerCase()
      ) {
        event.preventDefault();
        callback();
      }
    };

    window.addEventListener('keydown', listener);
    return () => {
      window.removeEventListener('keydown', listener);
    };
  }, deps);
}
