import { cn } from '../../lib/classname.ts';
import { useScrollPosition } from '../../hooks/use-scroll-position.ts';
import { X } from 'lucide-react';
import type { StickyTopSponsorType } from './PageSponsors.tsx';
import { useEffect, useState } from 'react';

type StickyTopSponsorProps = {
  sponsor: StickyTopSponsorType;

  onSponsorImpression: () => void;
  onSponsorClick: () => void;
  onSponsorHidden: () => void;
};

const SCROLL_DISTANCE = 100;

export function StickyTopSponsor(props: StickyTopSponsorProps) {
  const { sponsor, onSponsorHidden, onSponsorImpression, onSponsorClick } =
    props;

  const { y: scrollY } = useScrollPosition();
  const [isImpressionLogged, setIsImpressionLogged] = useState(false);
  const [isHidden, setIsHidden] = useState(false);

  useEffect(() => {
    if (scrollY < SCROLL_DISTANCE || isImpressionLogged) {
      return;
    }

    setIsImpressionLogged(true);
    onSponsorImpression();
  }, [scrollY]);

  if (scrollY < SCROLL_DISTANCE || isHidden) {
    return null;
  }

  return (
    <a
      target="_blank"
      href="https://www.google.com"
      onClick={onSponsorClick}
      className={cn(
        'fixed left-0 right-0 top-0 z-[91] flex min-h-[45px] w-full flex-row items-center justify-center px-14 pb-2 pt-1.5 text-base font-medium text-yellow-950',
        'bg-gradient-to-b from-purple-700 to-purple-800 text-white',
      )}
    >
      <img
        className="h-[23px]"
        src={'https://tpc.googlesyndication.com/simgad/915843892126714634?'}
        alt={'ad'}
      />
      <span className="mx-3 truncate">
        Register for our free cloud workshop
      </span>
      <button className="flex-truncate rounded-md bg-yellow-400 px-3 py-1 text-sm text-purple-900 transition-colors hover:bg-yellow-300">
        Register now
      </button>
      <button
        type="button"
        className="absolute right-5 top-1/2 ml-1 -translate-y-1/2 px-1 py-1 opacity-70 hover:opacity-100"
        onClick={(e) => {
          e.preventDefault();

          setIsHidden(true);
          onSponsorHidden();
        }}
      >
        <X className="h-4 w-4" strokeWidth={3} />
      </button>
    </a>
  );
}
