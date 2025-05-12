import { useMutation, useQuery } from '@tanstack/react-query';
import { ArrowRightIcon, MousePointerClick, Play } from 'lucide-react';
import { useEffect, useState } from 'react';
import { cn } from '../../lib/classname';
import {
  COURSE_PURCHASE_PARAM,
  COURSE_PURCHASE_SUCCESS_PARAM,
  isLoggedIn,
} from '../../lib/jwt';
import { coursePriceOptions } from '../../queries/billing';
import { courseProgressOptions } from '../../queries/course-progress';
import { queryClient } from '../../stores/query-client';
import {
  CourseLoginPopup,
  SAMPLE_AFTER_LOGIN_KEY,
} from '../AuthenticationFlow/CourseLoginPopup';
import { useToast } from '../../hooks/use-toast';
import { httpPost } from '../../lib/query-http';
import { deleteUrlParam, getUrlParams } from '../../lib/browser';
import { VideoModal } from '../VideoModal';

export const SQL_COURSE_SLUG = 'sql';

type CreateCheckoutSessionBody = {
  courseId: string;
  success?: string;
  cancel?: string;
};

type CreateCheckoutSessionResponse = {
  checkoutUrl: string;
};

type BuyButtonProps = {
  variant?: 'main' | 'floating' | 'top-nav';
};

export function BuyButton(props: BuyButtonProps) {
  const { variant = 'main' } = props;

  const [isFakeLoading, setIsFakeLoading] = useState(true);
  const [isLoginPopupOpen, setIsLoginPopupOpen] = useState(false);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const toast = useToast();

  const { data: coursePricing, isLoading: isLoadingPrice } = useQuery(
    coursePriceOptions({ courseSlug: SQL_COURSE_SLUG }),
    queryClient,
  );

  const { data: courseProgress, isLoading: isLoadingCourseProgress } = useQuery(
    courseProgressOptions(SQL_COURSE_SLUG),
    queryClient,
  );

  const {
    mutate: createCheckoutSession,
    isPending: isCreatingCheckoutSession,
    isSuccess: isCheckoutSessionCreated,
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
        if (!window.gtag) {
          window.location.href = data.checkoutUrl;
          return;
        }

        window?.fireEvent({
          action: `${SQL_COURSE_SLUG}_begin_checkout`,
          category: 'course',
          label: `${SQL_COURSE_SLUG} Course Checkout Started`,
          callback: () => {
            window.location.href = data.checkoutUrl;
          },
        });

        // Hacky way to make sure that we redirect in case
        // GA was blocked or not able to redirect the user.
        setTimeout(() => {
          window.location.href = data.checkoutUrl;
        }, 3000);
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
    const shouldTriggerSample =
      localStorage.getItem(SAMPLE_AFTER_LOGIN_KEY) === '1';

    if (shouldTriggerSample) {
      localStorage.removeItem(SAMPLE_AFTER_LOGIN_KEY);
      window.location.href = `${import.meta.env.PUBLIC_COURSE_APP_URL}/${SQL_COURSE_SLUG}`;
    } else if (shouldTriggerPurchase) {
      deleteUrlParam(COURSE_PURCHASE_PARAM);
      initPurchase();
    }
  }, []);

  useEffect(() => {
    const urlParams = getUrlParams();
    const param = urlParams?.[COURSE_PURCHASE_SUCCESS_PARAM];
    if (!param) {
      return;
    }

    const success = param === '1';

    if (success) {
      window?.fireEvent({
        action: `${SQL_COURSE_SLUG}_purchase_complete`,
        category: 'course',
        label: `${SQL_COURSE_SLUG} Course Purchase Completed`,
      });
    } else {
      window?.fireEvent({
        action: `${SQL_COURSE_SLUG}_purchase_canceled`,
        category: 'course',
        label: `${SQL_COURSE_SLUG} Course Purchase Canceled`,
      });
    }

    deleteUrlParam(COURSE_PURCHASE_SUCCESS_PARAM);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsFakeLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const isLoadingPricing =
    isFakeLoading ||
    isCheckoutSessionCreated ||
    isLoadingPrice ||
    !coursePricing ||
    isLoadingCourseProgress ||
    isCreatingCheckoutSession;
  const isAlreadyEnrolled = !!courseProgress?.enrolledAt;

  function initPurchase() {
    if (!isLoggedIn()) {
      setIsLoginPopupOpen(true);
      return;
    }

    const encodedCourseSlug = encodeURIComponent(`/courses/${SQL_COURSE_SLUG}`);
    const successUrl = `/thank-you?next=${encodedCourseSlug}`;
    
    createCheckoutSession({
      courseId: SQL_COURSE_SLUG,
      success: successUrl,
      cancel: `/courses/${SQL_COURSE_SLUG}?${COURSE_PURCHASE_SUCCESS_PARAM}=0`,
    });
  }

  function onBuyClick() {
    if (!isLoggedIn()) {
      setIsLoginPopupOpen(true);
      return;
    }

    const hasEnrolled = !!courseProgress?.enrolledAt;
    if (hasEnrolled) {
      window.location.href = `${import.meta.env.PUBLIC_COURSE_APP_URL}/${SQL_COURSE_SLUG}`;
      return;
    }

    initPurchase();
  }

  function onReadSampleClick() {
    if (!isLoggedIn()) {
      localStorage.setItem(SAMPLE_AFTER_LOGIN_KEY, '1');
      setIsLoginPopupOpen(true);
      return;
    }

    window?.fireEvent({
      action: `${SQL_COURSE_SLUG}_demo_started`,
      category: 'course',
      label: `${SQL_COURSE_SLUG} Course Demo Started`,
    });

    setTimeout(() => {
      window.location.href = `${import.meta.env.PUBLIC_COURSE_APP_URL}/${SQL_COURSE_SLUG}`;
    }, 200);
  }

  const courseLoginPopup = isLoginPopupOpen && (
    <CourseLoginPopup onClose={() => setIsLoginPopupOpen(false)} />
  );

  if (variant === 'main') {
    return (
      <div className="relative flex w-full flex-col items-center gap-2 md:w-auto">
        {courseLoginPopup}
        {isVideoModalOpen && (
          <VideoModal
            videoId="6S1CcF-ngeQ"
            onClose={() => setIsVideoModalOpen(false)}
          />
        )}
        <div className="flex flex-col gap-2 md:flex-row md:gap-0">
          <button
            onClick={onBuyClick}
            disabled={isLoadingPricing}
            className={cn(
              'group relative mr-2 inline-flex w-full min-w-[235px] items-center justify-center overflow-hidden rounded-xl bg-linear-to-r from-yellow-500 to-yellow-300 px-8 py-3 text-base font-semibold text-black transition-all duration-300 ease-out hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(234,179,8,0.4)] focus:outline-hidden active:ring-0 md:w-auto md:rounded-full md:text-lg',
              (isLoadingPricing || isCreatingCheckoutSession) &&
                'striped-loader-yellow pointer-events-none mr-4 scale-105 bg-yellow-500',
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
                Buy now for{' '}
                {coursePricing?.isEligibleForDiscount ? (
                  <span className="flex items-center gap-2">
                    <span className="hidden text-base line-through opacity-75 md:inline">
                      ${coursePricing?.fullPrice}
                    </span>
                    <span className="text-base md:text-xl">
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
          <button
            onClick={onReadSampleClick}
            data-demo-button
            className={cn(
              'group relative hidden items-center justify-center overflow-hidden rounded-xl border border-yellow-500/30 bg-transparent px-6 py-3 text-base font-medium text-yellow-500 transition-all duration-300 ease-out hover:bg-yellow-500/10 focus:outline-hidden active:ring-0 md:rounded-full',
              {
                'hidden lg:inline-flex':
                  !isLoadingPricing && !isAlreadyEnrolled,
              },
            )}
          >
            <span className="relative flex items-center gap-2">
              <MousePointerClick className="h-5 w-5" />
              Access Demo
            </span>
          </button>
        </div>

        {!isLoadingPricing && (
          <span className="absolute top-full z-50 flex w-[300px] translate-y-4 flex-row items-center justify-center text-sm text-yellow-400">
            Lifetime access <span className="mx-2">&middot;</span>{' '}
            <button
              onClick={() => setIsVideoModalOpen(true)}
              className="flex cursor-pointer flex-row items-center gap-1.5 underline underline-offset-4 hover:text-yellow-500"
            >
              <Play className="size-3 fill-current" /> Watch Video (3 min)
            </button>
          </span>
        )}
      </div>
    );
  }

  if (variant === 'top-nav') {
    return (
      <button
        onClick={onBuyClick}
        disabled={isLoadingPricing}
        className={`animate-fade-in rounded-full px-5 py-2 text-base font-medium text-yellow-700 transition-colors hover:text-yellow-500`}
      >
        Purchase Course
      </button>
    );
  }

  return (
    <div className="relative flex flex-col items-center gap-2">
      {courseLoginPopup}
      <button
        onClick={onBuyClick}
        disabled={isLoadingPricing}
        className={cn(
          'group relative inline-flex min-w-[220px] items-center justify-center overflow-hidden rounded-full bg-linear-to-r from-yellow-500 to-yellow-300 px-8 py-2 font-medium text-black transition-all duration-300 ease-out hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(234,179,8,0.4)] focus:outline-hidden',
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
            Buy Now ${coursePricing?.regionalPrice}
            <ArrowRightIcon className="h-5 w-5 transition-transform duration-300 ease-out group-hover:translate-x-1" />
          </span>
        )}
      </button>

      {!isLoadingPricing && !isAlreadyEnrolled && (
        <span className="top-full text-sm text-yellow-400">
          Lifetime access <span className="mx-1">&middot;</span> Free updates
        </span>
      )}
    </div>
  );
}
