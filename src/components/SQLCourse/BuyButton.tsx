import { useQuery } from '@tanstack/react-query';
import { ArrowRightIcon } from 'lucide-react';
import { useState } from 'react';
import { cn } from '../../lib/classname';
import { isLoggedIn } from '../../lib/jwt';
import { coursePriceOptions } from '../../queries/billing';
import { courseProgressOptions } from '../../queries/course-progress';
import { queryClient } from '../../stores/query-client';
import { CourseLoginPopup } from '../AuthenticationFlow/CourseLoginPopup';
import { useToast } from '../../hooks/use-toast';

type BuyButtonProps = {
  variant?: 'main' | 'floating';
};

export function BuyButton(props: BuyButtonProps) {
  const { variant = 'main' } = props;

  const [isLoginPopupOpen, setIsLoginPopupOpen] = useState(false);
  const toast = useToast();

  const { data: coursePricing, isFetching } = useQuery(
    coursePriceOptions({ courseSlug: 'road-to-sql' }),
    queryClient,
  );

  const { data: courseProgress, isLoading: isCourseProgressLoading } = useQuery(
    {
      ...courseProgressOptions('road-to-sql'),
      enabled: !!isLoggedIn(),
    },
    queryClient,
  );

  const isLoadingPricing =
    isFetching || !coursePricing || isCourseProgressLoading;
  const isAlreadyEnrolled = !!courseProgress?.enrolledAt;

  function onBuyClick() {
    if (!isLoggedIn()) {
      setIsLoginPopupOpen(true);
      return;
    }

    const hasEnrolled = !!courseProgress?.enrolledAt;
    if (hasEnrolled) {
      window.location.href = `${import.meta.env.PUBLIC_COURSE_APP_URL}/road-to-sql`;
      return;
    }

    alert('purchase');
  }

  const courseLoginPopup = isLoginPopupOpen && (
    <CourseLoginPopup onClose={() => setIsLoginPopupOpen(false)} />
  );

  if (variant === 'main') {
    return (
      <div className="relative flex flex-col items-center gap-2">
        {courseLoginPopup}
        <button
          onClick={onBuyClick}
          disabled={isLoadingPricing}
          className={cn(
            'group relative inline-flex min-w-[235px] items-center justify-center overflow-hidden rounded-full bg-gradient-to-r from-yellow-500 to-yellow-300 px-8 py-3 text-lg font-semibold text-black transition-all duration-300 ease-out hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(234,179,8,0.4)] focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2 focus:ring-offset-zinc-900',
            isLoadingPricing &&
              'striped-loader-yellow pointer-events-none bg-yellow-500',
          )}
        >
          {isLoadingPricing ? (
            <span className="relative flex items-center gap-2">&nbsp;</span>
          ) : isAlreadyEnrolled ? (
            <span className="relative flex items-center gap-2">
              Start Learning
            </span>
          ) : (
            <span className="relative flex items-center gap-2">
              {coursePricing?.isEligibleForDiscount && coursePricing?.flag} Buy
              now for{' '}
              {coursePricing?.isEligibleForDiscount ? (
                <span className="flex items-center gap-2">
                  <span className="text-base line-through opacity-75">
                    ${coursePricing?.fullPrice}
                  </span>
                  <span className="text-xl">
                    ${coursePricing?.regionalPrice}
                  </span>
                </span>
              ) : (
                <span>${coursePricing?.regionalPrice}</span>
              )}
              <ArrowRightIcon className="h-5 w-5 transition-transform duration-300 ease-out group-hover:translate-x-1" />
            </span>
          )}
        </button>
        {!isAlreadyEnrolled && coursePricing?.isEligibleForDiscount && (
          <span className="absolute top-full translate-y-2 text-sm text-yellow-400">
            {coursePricing.regionalDiscountPercentage}% regional discount
            applied
          </span>
        )}
      </div>
    );
  }

  return (
    <div className="relative flex flex-col items-center gap-2">
      {courseLoginPopup}
      <button
        onClick={onBuyClick}
        disabled={isLoadingPricing}
        className={cn(
          'group relative inline-flex min-w-[220px] items-center justify-center overflow-hidden rounded-full bg-gradient-to-r from-yellow-500 to-yellow-300 px-8 py-2 font-medium text-black transition-all duration-300 ease-out hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(234,179,8,0.4)] focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2 focus:ring-offset-zinc-900',
          isLoadingPricing &&
            'striped-loader-yellow pointer-events-none bg-yellow-500',
        )}
      >
        {isLoadingPricing ? (
          <span className="relative flex items-center gap-2">&nbsp;</span>
        ) : isAlreadyEnrolled ? (
          <span className="relative flex items-center gap-2">
            Start Learning
          </span>
        ) : (
          <span className="relative flex items-center gap-2">
            {coursePricing?.flag} Buy Now ${coursePricing?.regionalPrice}
            <ArrowRightIcon className="h-5 w-5 transition-transform duration-300 ease-out group-hover:translate-x-1" />
          </span>
        )}
      </button>
      {!isAlreadyEnrolled && coursePricing?.isEligibleForDiscount && (
        <span className="top-full text-sm text-yellow-400">
          {coursePricing.regionalDiscountPercentage}% regional discount applied
        </span>
      )}
    </div>
  );
}
