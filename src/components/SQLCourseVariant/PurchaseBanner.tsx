import { CheckIcon } from 'lucide-react';
import { BuyButton } from './BuyButton';
import { Rating } from '../Rating/Rating';

export function PurchaseBanner() {
  return (
    <div className="sticky top-4 z-50 mt-20 flex w-full flex-col gap-4 rounded-2xl bg-yellow-950 p-5 shadow-lg ring-1 ring-yellow-500/40 lg:flex-row lg:items-center lg:justify-between">
      <div className="order-3 flex w-full flex-col items-center gap-2 lg:order-0 lg:w-fit lg:items-start">
        <span className="inline-flex items-center gap-1.5 text-yellow-500">
          <CheckIcon className="size-5 stroke-[2.5]" />
          7-Day Money-Back Guarantee
        </span>
        <span className="inline-flex items-center gap-1.5 text-yellow-500">
          <CheckIcon className="size-5 stroke-[2.5]" />
          Lifetime access & updates
        </span>
      </div>

      <div className="order-2 -translate-x-2 lg:order-0">
        <BuyButton variant="floating" />
      </div>

      <div className="flex flex-col items-center gap-2">
        <Rating rating={4.9} />
        <span className="text-base font-semibold text-yellow-500">
          4.9 avg. Review
        </span>
      </div>
    </div>
  );
}
