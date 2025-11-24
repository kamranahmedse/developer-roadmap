import { useEffect, useState } from 'react';
import type { MouseEvent } from 'react';
import { httpPatch } from '../../lib/http';
import type { ResourceType } from '../../lib/resource-progress';
import { isLoggedIn } from '../../lib/jwt';
import { showLoginPopup } from '../../lib/popup';
import { FavoriteIcon } from './FavoriteIcon';
import { Spinner } from '../ReactIcons/Spinner';
import { useToast } from '../../hooks/use-toast';
import { cn } from '../../lib/classname';

type MarkFavoriteType = {
  resourceType: ResourceType;
  resourceId: string;
  favorite?: boolean;
  className?: string;
};

export function MarkFavorite({
  resourceId,
  resourceType,
  favorite,
  className,
}: MarkFavoriteType) {
  const isAuthenticated = isLoggedIn();
  const localStorageKey = `${resourceType}-${resourceId}-favorite`;

  const toast = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [isFavorite, setIsFavorite] = useState(
    isAuthenticated
      ? (favorite ?? localStorage.getItem(localStorageKey) === '1')
      : false,
  );

  async function toggleFavoriteHandler(e: MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    if (!isLoggedIn()) {
      showLoginPopup();
      return;
    }

    if (isLoading) {
      return;
    }

    setIsLoading(true);

    const { error } = await httpPatch<{ status: 'ok' }>(
      `${import.meta.env.PUBLIC_API_URL}/v1-mark-favorite`,
      {
        resourceType,
        resourceId,
      },
    );

    if (error) {
      setIsLoading(false);
      toast.error('Failed to update favorite status');
      return;
    }

    // Dispatching an event instead of setting the state because
    // MarkFavorite component is used in the HeroSection as well
    // as featured items section. We will let the custom event
    // listener set the update `useEffect`
    window.dispatchEvent(
      new CustomEvent('mark-favorite', {
        detail: {
          resourceId,
          resourceType,
          isFavorite: !isFavorite,
        },
      }),
    );

    window.dispatchEvent(new CustomEvent('refresh-favorites', {}));
    setIsLoading(false);
  }

  useEffect(() => {
    const listener = (e: Event) => {
      const {
        resourceId: id,
        resourceType: type,
        isFavorite: fav,
      } = (e as CustomEvent).detail;
      if (id === resourceId && type === resourceType) {
        setIsFavorite(fav);
        localStorage.setItem(localStorageKey, fav ? '1' : '0');
      }
    };

    window.addEventListener('mark-favorite', listener);
    return () => {
      window.removeEventListener('mark-favorite', listener);
    };
  }, []);

  return (
    <button
      aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
      onClick={toggleFavoriteHandler}
      tabIndex={-1}
      className={cn(
        'absolute right-1.5 top-1.5 z-30 focus:outline-0',
        isFavorite ? '' : 'opacity-30 hover:opacity-100',
        className,
      )}
      data-is-favorite={isFavorite}
    >
      {isLoading ? (
        <Spinner isDualRing={false} />
      ) : (
        <FavoriteIcon isFavorite={isFavorite} />
      )}
    </button>
  );
}
