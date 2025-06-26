import { ArrowRightIcon, CheckIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import { cn } from '../../lib/classname';
import { BuyButton } from './BuyButton';
import { Rating } from '../Rating/Rating';

export function PurchaseBanner() {
  return (
    <div className="mt-20 flex w-full items-center justify-between rounded-2xl bg-yellow-950 p-5 shadow-lg ring-1 ring-yellow-500/40">
      <div className="flex flex-col gap-2">
        <span className="inline-flex items-center gap-1.5 text-yellow-500">
          <CheckIcon className="size-5 stroke-[2.5]" />
          7-Day Money-Back Guarantee
        </span>
        <span className="inline-flex items-center gap-1.5 text-yellow-500">
          <CheckIcon className="size-5 stroke-[2.5]" />
          Lifetime access & updates
        </span>
      </div>

      <BuyButton variant="floating" />

      <div className="flex flex-col items-center gap-2">
        <Rating rating={4.9} />
        <span className="text-base font-semibold text-yellow-500">
          4.9 avg. Review
        </span>
      </div>
    </div>
  );
}
