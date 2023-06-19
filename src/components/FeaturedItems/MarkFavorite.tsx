import { useEffect, useState } from 'preact/hooks';
import { httpPatch } from '../../lib/http';
import { pageProgressMessage } from '../../stores/page';
import heart from '../../icons/heart.svg';
import heartFilled from '../../icons/heart-filled.svg';

export default function MarkFavorite({ url }: { url: string }) {
  const [isFavorite, setIsFavorite] = useState(false);
  const icon = isFavorite ? heartFilled : heart;
  const resourceType = url.includes('best-practices')
    ? 'best-practice'
    : 'roadmap';
  const resourceId = url.split('/').pop()!;

  const toggleFavoriteHandler = async (e: Event) => {
    e.preventDefault();
    pageProgressMessage.set('Updating favorite status...');
    const { response, error } = await httpPatch<{ status: 'ok' }>(
      `${import.meta.env.PUBLIC_API_URL}/v1-mark-favorite`,
      {
        resourceType,
        resourceId,
      }
    );

    if (error) {
      alert('Failed to update favorite status');
    }
    setIsFavorite((p) => !p);
    pageProgressMessage.set('');
  };

  useEffect(() => {
    const listener = (e: Event) => {
      const {
        resourceId: id,
        resourceType: type,
        isFavorite: fav,
      } = (e as CustomEvent).detail;
      console.log(id, type, fav);
      if (id === resourceId && type === resourceType) {
        setIsFavorite(fav);
      }
    };

    window.addEventListener('toggle-fav', listener);

    return () => {
      window.removeEventListener('toggle-fav', listener);
    };
  }, []);

  return (
    <button
      onClick={toggleFavoriteHandler}
      className={`
    ${
      isFavorite ? '' : 'opacity-30 hover:opacity-100'
    } absolute right-1.5 top-1.5
    `}
    >
      <img src={icon} alt="Mark Favorite" className="h-3 w-3" />
    </button>
  );
}
