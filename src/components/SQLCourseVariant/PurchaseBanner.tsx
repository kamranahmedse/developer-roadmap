import { CheckIcon, Star } from 'lucide-react';
import { BuyButton } from './BuyButton';
import { Rating } from '../Rating/Rating';

export function PurchaseBanner() {
  return (
    <div className="sticky top-4 z-50 mt-16.5 flex w-full flex-col gap-4 rounded-2xl bg-yellow-950 p-5 shadow-lg ring-1 ring-yellow-500/40 lg:flex-row lg:items-center lg:justify-between">
      <div className="order-3 flex w-full flex-col items-center gap-2 lg:order-0 lg:w-fit lg:items-start">
        {[
          '7-Day Money-Back Guarantee',
          'Lifetime access & updates'
        ].map((text, index) => (
          <span key={index} className="inline-flex items-center gap-1.5 text-yellow-500">
            <CheckIcon className="size-5 stroke-[2.5]" />
            {text}
          </span>
        ))}
      </div>

      <div className="order-2 lg:order-0">
        <BuyButton variant="floating" floatingClassName="translate-x-0 lg:-translate-x-5" />
      </div>

      <div className="flex flex-col items-center gap-2">
        <Rating rating={4.9} className="hidden lg:flex" />
        <span className="text-base font-semibold text-yellow-500 flex items-center gap-1">
          <Star className="size-4 block lg:hidden fill-current" />
          4.9 avg. Review
        </span>
      </div>
    </div>
  );
}
