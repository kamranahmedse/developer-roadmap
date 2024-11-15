import { cn } from '../../lib/classname.ts';
import { useScrollPosition } from '../../hooks/use-scroll-position.ts';
import { X } from 'lucide-react';
import type { StickyTopSponsorType } from './PageSponsors.tsx';
import { useEffect, useState } from 'react';
import { isOnboardingStripHidden } from '../../stores/page.ts';

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
    if (!sponsor) {
      return;
    }

    // preload the image so that we don't see a flicker
    const img = new Image();
    img.src = sponsor.imageUrl;

    // hide the onboarding strip when the sponsor is visible
    isOnboardingStripHidden.set(true);
  }, [sponsor]);

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
      href={sponsor.url}
      onClick={onSponsorClick}
      className={cn(
        'fixed left-0 right-0 top-0 z-[91] flex min-h-[45px] w-full flex-row items-center justify-center px-14 pb-2 pt-1.5 text-base font-medium text-yellow-950',
      )}
      style={{
        backgroundImage: `linear-gradient(to bottom, ${sponsor.style?.fromColor}, ${sponsor.style?.toColor})`,
        color: sponsor.style?.textColor,
      }}
    >
      <img className="h-[23px]" src={sponsor.imageUrl} alt={'ad'} />
      <span className="mx-3 truncate">{sponsor.description}</span>
      <button
        className="flex-truncate rounded-md px-3 py-1 text-sm transition-colors"
        style={{
          backgroundColor: sponsor.style?.buttonBackgroundColor,
          color: sponsor.style?.buttonTextColor,
        }}
      >
        {sponsor.buttonText}
      </button>
      <button
        type="button"
        className="absolute right-5 top-1/2 ml-1 -translate-y-1/2 px-1 py-1 opacity-70 hover:opacity-100"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();

          setIsHidden(true);
          onSponsorHidden();
        }}
      >
        <X className="h-4 w-4" strokeWidth={3} />
      </button>
    </a>
  );
}
