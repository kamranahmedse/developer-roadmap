import { useEffect, useState } from 'preact/hooks';
import { httpPatch } from '../../lib/http';
import type { ResourceType } from '../../lib/resource-progress';
import { isLoggedIn } from '../../lib/jwt';
import { showLoginPopup } from '../../lib/popup';
import { FavoriteIcon } from './FavoriteIcon';

type MarkFavoriteType = {
  url: string;
  favorite?: boolean;
};

export function MarkFavorite({ url, favorite }: MarkFavoriteType) {
  const [isLoading, setIsLoading] = useState(false);
  const [isFavorite, setIsFavorite] = useState(favorite ?? false);
  const resourceType: ResourceType = url.includes('best-practices')
    ? 'best-practice'
    : 'roadmap';
  const resourceId = url.split('/').pop()!;

  async function toggleFavoriteHandler(e: Event) {
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
      }
    );

    if (error) {
      setIsLoading(false);
      return alert('Failed to update favorite status');
    }

    window.dispatchEvent(new CustomEvent('refresh-favorites', {}));

    setIsFavorite(!isFavorite);
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
      }
    };

    window.addEventListener('mark-favorite', listener);
    return () => {
      window.removeEventListener('mark-favorite', listener);
    };
  }, []);

  return (
    <button
      onClick={toggleFavoriteHandler}
      tabIndex={-1}
      className={`${
        isFavorite ? '' : 'opacity-30 hover:opacity-100'
      } absolute right-1.5 top-1.5 z-30 focus:outline-0`}
    >
      {isLoading ? <Spinner /> : <FavoriteIcon isFavorite={isFavorite} />}
    </button>
  );
}

function Spinner() {
  return (
    <svg
      className="h-3.5 w-3.5 animate-spin"
      viewBox="0 0 93 93"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M46.5 93C72.1812 93 93 72.1812 93 46.5C93 20.8188 72.1812 0 46.5 0C20.8188 0 0 20.8188 0 46.5C0 72.1812 20.8188 93 46.5 93ZM46.5 77C63.3447 77 77 63.3447 77 46.5C77 29.6553 63.3447 16 46.5 16C29.6553 16 16 29.6553 16 46.5C16 63.3447 29.6553 77 46.5 77Z"
        style="fill: #404040;"
      ></path>
      <path
        d="M84.9746 49.5667C89.3257 49.9135 93.2042 46.6479 92.81 42.3008C92.3588 37.3251 91.1071 32.437 89.0872 27.8298C86.0053 20.7998 81.2311 14.6422 75.1905 9.90623C69.15 5.17027 62.031 2.00329 54.4687 0.687889C49.5126 -0.174203 44.467 -0.223422 39.5274 0.525737C35.2118 1.18024 32.966 5.72596 34.3411 9.86865V9.86865C35.7161 14.0113 40.2118 16.1424 44.5681 15.8677C46.9635 15.7166 49.3773 15.8465 51.7599 16.2609C56.7515 17.1291 61.4505 19.2196 65.4377 22.3456C69.4249 25.4717 72.5762 29.5362 74.6105 34.1764C75.5815 36.3912 76.2835 38.7044 76.7084 41.0666C77.4811 45.3626 80.6234 49.2199 84.9746 49.5667V49.5667Z"
        style="fill: #94a3b8;"
      ></path>
    </svg>
  );
}
