import { useMutation, useQuery } from '@tanstack/react-query';
import { cn } from '../../lib/classname';
import { queryClient } from '../../stores/query-client';
import { useToast } from '../../hooks/use-toast';
import { httpPost } from '../../lib/query-http';
import { courseProgressOptions } from '../../queries/course-progress';
import { isLoggedIn } from '../../lib/jwt';
import { showLoginPopup } from '../../lib/popup';
import { Loader2Icon } from 'lucide-react';
import { coursePriceOptions } from '../../queries/billing';

type CreateCheckoutSessionBody = {
  courseId: string;
  success?: string;
  cancel?: string;
};

type CreateCheckoutSessionResponse = {
  checkoutUrl: string;
};

type EnrollButtonProps = {
  courseId: string;
  courseSlug: string;
  isLoading: boolean;
};

export function EnrollButton(props: EnrollButtonProps) {
  const { courseId, courseSlug, isLoading } = props;

  const toast = useToast();

  const { data: courseProgress, isLoading: isCourseProgressLoading } = useQuery(
    {
      ...courseProgressOptions(courseSlug),
      enabled: !!isLoggedIn(),
    },
    queryClient,
  );

  const { data: coursePricing } = useQuery(
    coursePriceOptions({ courseSlug }),
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

  const hasEnrolled = !!courseProgress?.startedAt;
  const hasProgress =
    courseProgress?.startedAt && courseProgress?.completed?.length > 0;

  return (
    <button
      className={cn(
        'relative flex min-h-10 w-full items-center justify-between gap-1 overflow-hidden rounded-lg bg-gradient-to-r from-purple-500 to-purple-700 p-2 px-3 text-slate-50 disabled:cursor-not-allowed disabled:opacity-50',
        (hasEnrolled || isCreatingCheckoutSession) && 'justify-center',
      )}
      onClick={() => {
        if (isCourseProgressLoading || isCreatingCheckoutSession) {
          return;
        }

        if (!isLoggedIn()) {
          showLoginPopup();
          return;
        }

        if (!courseSlug) {
          toast.error('Course slug not found');
          return;
        }

        if (hasEnrolled) {
          const courseUrl = `${import.meta.env.PUBLIC_COURSE_APP_URL}/${courseSlug}`;
          window.location.href = courseUrl;
          return;
        }

        createCheckoutSession({
          courseId,
          success: `/learn/${courseSlug}?e=1`,
          cancel: `/learn/${courseSlug}`,
        });
      }}
      disabled={isCreatingCheckoutSession || isLoading}
    >
      {hasEnrolled && !isCreatingCheckoutSession && (
        <span>{hasProgress ? 'Resume Learning' : 'Start Learning'}</span>
      )}

      {!hasEnrolled && !isCreatingCheckoutSession && (
        <>
          <span>Enroll now</span>
          <span>
            $
            {coursePricing?.isEligibleForDiscount
              ? coursePricing?.regionalPrice
              : coursePricing?.fullPrice}
          </span>
        </>
      )}

      {isCreatingCheckoutSession && (
        <Loader2Icon className="size-4 animate-spin stroke-[2.5]" />
      )}

      {isLoading && (
        <div className="striped-loader-darker absolute inset-0 z-10 h-full w-full bg-purple-500" />
      )}
    </button>
  );
}
