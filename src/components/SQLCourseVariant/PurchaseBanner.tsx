import { CheckIcon, Star } from 'lucide-react';
import { BuyButton } from './BuyButton';
import { Rating } from '../Rating/Rating';
import { cn } from '../../lib/classname';
import { useEffect, useRef, useState } from 'react';

export function PurchaseBanner() {
  const bannerRef = useRef<HTMLDivElement>(null);

  const [isFullyInView, setIsFullyInView] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (!bannerRef.current) return;
      
      const bannerRect = bannerRef.current.getBoundingClientRect();
      const bannerTop = bannerRect.top;
      const bannerBottom = bannerRect.bottom;
      const scrollTop = window.scrollY;
      
      // Banner is fully in view when both top and bottom are within viewport
      const fullyVisible = bannerTop >= 0 && bannerBottom <= window.innerHeight;
      setIsFullyInView(fullyVisible || scrollTop > bannerRect.top);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check initial state

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const Banner = (props: {
    className?: string;
    ref?: React.RefObject<HTMLDivElement | null>;
  }) => {
    return (
      <div
        ref={props.ref}
        className={cn(
          'top-4 z-50 mt-14 flex w-full flex-col gap-4 rounded-2xl bg-yellow-950 p-5 shadow-lg ring-1 ring-yellow-500/40 lg:sticky lg:flex-row lg:items-center lg:justify-between',
          props.className,
        )}
      >
        <div className="order-3 flex w-full flex-col items-center gap-2 lg:order-0 lg:w-fit lg:items-start">
          {['7-Day Money-Back Guarantee', 'Lifetime access & updates'].map(
            (text, index) => (
              <span
                key={index}
                className="inline-flex items-center gap-1.5 text-yellow-500"
              >
                <CheckIcon className="size-5 stroke-[2.5]" />
                {text}
              </span>
            ),
          )}
        </div>

        <div className="order-2 lg:order-0">
          <BuyButton
            variant="floating"
            floatingClassName="translate-x-0 lg:-translate-x-5"
          />
        </div>

        <div className="flex flex-col items-center gap-2">
          <Rating rating={4.9} className="hidden lg:flex" />
          <span className="flex items-center gap-1 text-base font-semibold text-yellow-500">
            <Star className="block size-4 fill-current lg:hidden" />
            4.9 avg. Review
          </span>
        </div>
      </div>
    );
  };
  return (
    <>
      <Banner ref={bannerRef} />
      <Banner
        className={cn(
          'fixed top-[unset] right-0 bottom-0 left-0 rounded-none lg:hidden',
          isFullyInView ? 'flex' : 'hidden',
        )}
      />
    </>
  );
}
