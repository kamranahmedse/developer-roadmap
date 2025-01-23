import { useMutation, useQuery } from '@tanstack/react-query';
import { ArrowRightIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import { cn } from '../../lib/classname';
import { COURSE_PURCHASE_PARAM, isLoggedIn } from '../../lib/jwt';
import { coursePriceOptions } from '../../queries/billing';
import { courseProgressOptions } from '../../queries/course-progress';
import { queryClient } from '../../stores/query-client';
import { CourseLoginPopup } from '../AuthenticationFlow/CourseLoginPopup';
import { useToast } from '../../hooks/use-toast';
import { httpPost } from '../../lib/query-http';
import { deleteUrlParam, getUrlParams } from '../../lib/browser';

type CreateCheckoutSessionBody = {
  courseId: string;
  success?: string;
  cancel?: string;
};

type CreateCheckoutSessionResponse = {
  checkoutUrl: string;
};

type BuyButtonProps = {
  variant?: 'main' | 'floating';
};

export function BuyButton(props: BuyButtonProps) {
  const { variant = 'main' } = props;

  const [isLoginPopupOpen, setIsLoginPopupOpen] = useState(false);
  const toast = useToast();

  const { data: coursePricing, isLoading: isLoadingCourse } = useQuery(
    coursePriceOptions({ courseSlug: 'road-to-sql' }),
    queryClient,
  );

  const { data: courseProgress, isLoading: isLoadingCourseProgress } = useQuery(
    {
      ...courseProgressOptions('road-to-sql'),
      enabled: !!isLoggedIn(),
    },
    queryClient,
  );

  const {
    mutate: createCheckoutSession,
    isPending: isCreatingCheckoutSession,
  } = useMutation(
    {
      mutationFn: (body: CreateCheckoutSessionBody) => {
        return httpPost<CreateCheckoutSessionResponse>(
          '/v1-create-checkout-session',
          body,
        );
      },
      onMutate: () => {
        toast.loading('Creating checkout session...');
      },
      onSuccess: (data) => {
        window.location.href = data.checkoutUrl;
      },
      onError: (error) => {
        console.error(error);
        toast.error(error?.message || 'Failed to create checkout session');
      },
    },
    queryClient,
  );

  useEffect(() => {
    const urlParams = getUrlParams();
    const shouldTriggerPurchase = urlParams[COURSE_PURCHASE_PARAM] === '1';
    if (shouldTriggerPurchase) {
      deleteUrlParam(COURSE_PURCHASE_PARAM);
      initPurchase();
    }
  }, []);

  const isLoadingPricing =
    isLoadingCourse || !coursePricing || isLoadingCourseProgress;
  const isAlreadyEnrolled = !!courseProgress?.enrolledAt;

  function initPurchase() {
    if (!isLoggedIn()) {
      return;
    }

    createCheckoutSession({
      courseId: 'road-to-sql',
      success: `/road-to-sql?e=1`,
      cancel: `/road-to-sql`,
    });
  }

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

    initPurchase();
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
            'group relative inline-flex min-w-[235px] items-center justify-center overflow-hidden rounded-full bg-gradient-to-r from-yellow-500 to-yellow-300 px-8 py-3 text-lg font-semibold text-black transition-all duration-300 ease-out hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(234,179,8,0.4)] focus:outline-none active:ring-0',
            (isLoadingPricing || isCreatingCheckoutSession) &&
              'striped-loader-yellow pointer-events-none scale-105 bg-yellow-500',
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
        {!isLoadingPricing &&
          !isAlreadyEnrolled &&
          coursePricing?.isEligibleForDiscount && (
            <span className="absolute top-full translate-y-2.5 text-sm text-yellow-400">
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
          'group relative inline-flex min-w-[220px] items-center justify-center overflow-hidden rounded-full bg-gradient-to-r from-yellow-500 to-yellow-300 px-8 py-2 font-medium text-black transition-all duration-300 ease-out hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(234,179,8,0.4)] focus:outline-none',
          (isLoadingPricing || isCreatingCheckoutSession) &&
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
