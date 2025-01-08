import { useMutation, useQueries, useQuery } from '@tanstack/react-query';
import type { CourseDetailsResponse } from '../../api/course';
import { cn } from '../../lib/classname';
import { isLoggedIn } from '../../lib/jwt';
import { showLoginPopup } from '../../lib/popup';
import { courseProgressOptions } from '../../queries/course-progress';
import { queryClient } from '../../stores/query-client';
import { useEffect, useState } from 'react';
import { httpPost } from '../../lib/query-http';
import { useToast } from '../../hooks/use-toast';
import { CheckCircle2Icon, Loader2Icon, LockIcon } from 'lucide-react';
import { getUrlParams } from '../../lib/browser';
import { billingDetailsOptions } from '../../queries/billing';
import { UpgradePlanModal } from './UpgradePlanModal';
import { UpgradeAndEnroll } from './UpgradeAndEnroll';

type CourseFloatingSidebarProps = {
  isSticky: boolean;
  course: CourseDetailsResponse;
};

export function CourseFloatingSidebar(props: CourseFloatingSidebarProps) {
  const { isSticky, course } = props;

  const { slug } = course;
  const courseUrl = `${import.meta.env.PUBLIC_COURSE_APP_URL}/${slug}`;

  const toast = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [showUpgradePlanModal, setShowUpgradePlanModal] = useState(false);
  const [showUpgradeAndEnrollModal, setShowUpgradeAndEnrollModal] =
    useState(false);

  const {
    courseProgress,
    billingDetails,
    pending: isPending,
  } = useQueries(
    {
      queries: [
        {
          ...courseProgressOptions(slug),
          enabled: !!isLoggedIn(),
        },
        {
          ...billingDetailsOptions(),
          enabled: !!isLoggedIn(),
        },
      ],
      combine(results) {
        return {
          courseProgress: results[0].data,
          billingDetails: results[1].data,
          pending: results.some((result) => result.isPending),
        };
      },
    },
    queryClient,
  );

  const { mutate: enroll, isPending: isEnrolling } = useMutation(
    {
      mutationFn: () => {
        return httpPost(`/v1-enroll-course/${slug}`, {});
      },
      onSuccess: () => {
        window.location.href = courseUrl;
      },
      onError: (error) => {
        console.error(error);
        toast.error(error?.message || 'Failed to enroll');
      },
    },
    queryClient,
  );

  const hasEnrolled = courseProgress?.startedAt ? true : false;
  const isPaidUser = billingDetails?.status === 'active';

  useEffect(() => {
    if (!isLoggedIn()) {
      setIsLoading(false);
      return;
    }

    if (isPending) {
      return;
    }

    setIsLoading(false);
    const shouldAutoEnroll = getUrlParams()?.e === '1';
    if (!hasEnrolled && shouldAutoEnroll) {
      setShowUpgradeAndEnrollModal(true);
    }
  }, [courseProgress, isPending]);

  const whatYouGet = [
    'Full access to all the courses',
    'Personalized access using AI',
    'Certificate of Completion',
    'Playground for live-coding',
    'Challenges / Quizes',
  ];

  return (
    <>
      {showUpgradePlanModal && (
        <UpgradePlanModal
          onClose={() => setShowUpgradePlanModal(false)}
          success={`/learn/${slug}?e=1`}
          cancel={`/learn/${slug}`}
        />
      )}

      {showUpgradeAndEnrollModal && <UpgradeAndEnroll courseSlug={slug} />}

      <div
        className={cn(
          'sticky top-8 -translate-y-1/2 overflow-hidden rounded-lg border bg-white shadow-sm transition-transform',
          isSticky && '-translate-y-0',
        )}
      >
        <figure>
          <img
            src="https://images.unsplash.com/photo-1732200584655-3511db5c24e2?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw5fHx8ZW58MHx8fHx8"
            alt="SQL 101"
            className="aspect-video w-full object-cover"
          />
        </figure>

        <div className="p-2">
          <button
            className={cn(
              'relative flex min-h-10 w-full items-center justify-between gap-1 overflow-hidden rounded-lg bg-gradient-to-r from-purple-500 to-purple-700 p-2 px-3 text-slate-50 disabled:cursor-not-allowed disabled:opacity-50',
              (hasEnrolled || isEnrolling || isPaidUser) && 'justify-center',
            )}
            onClick={() => {
              if (!isLoggedIn()) {
                showLoginPopup();
                return;
              }

              if (!slug) {
                toast.error('Course slug not found');
                return;
              }

              if (hasEnrolled && isPaidUser) {
                window.location.href = courseUrl;
                return;
              }

              if (isPaidUser) {
                enroll();
                return;
              }

              setShowUpgradePlanModal(true);
            }}
            disabled={isLoading || isEnrolling}
          >
            {!isEnrolling && (
              <>
                {hasEnrolled && isPaidUser && <span>Resume Learning</span>}
                {!hasEnrolled && !isPaidUser && (
                  <>
                    <span>Enroll now</span>
                    <span>5$ / month</span>
                  </>
                )}
                {!hasEnrolled && isPaidUser && <span>Enroll now</span>}
              </>
            )}

            {isEnrolling && (
              <>
                <Loader2Icon className="size-4 animate-spin stroke-[2.5]" />
                <span>Enrolling...</span>
              </>
            )}

            {isLoading && (
              <div className="striped-loader-darker absolute inset-0 z-10 h-full w-full bg-purple-500" />
            )}
          </button>
        </div>

        <div className="border-b p-2 pb-4">
          <Certificate
            isLoading={isLoading}
            hasEnrolled={hasEnrolled}
            isCourseComplete={courseProgress?.completedAt ? true : false}
            courseSlug={slug}
          />
        </div>

        <div className="p-2">
          <h4 className="text-lg font-medium">What you get</h4>
          <ul
            role="list"
            className="mt-2 flex list-disc flex-col gap-1 pl-4 text-sm text-gray-700 marker:text-gray-400"
          >
            {whatYouGet.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}

type CertificateProps = {
  isLoading: boolean;
  hasEnrolled: boolean;
  isCourseComplete: boolean;
  courseSlug: string;
};

export function Certificate(props: CertificateProps) {
  const { isLoading, hasEnrolled, isCourseComplete, courseSlug } = props;

  return (
    <>
      <h4 className="text-lg font-medium">Certificate of Completion</h4>
      <p className="text-xs text-gray-500">
        Certificate will be issued on completion
      </p>

      <button
        className="relative mt-4 flex min-h-40 w-full flex-col items-center justify-center gap-2 overflow-hidden rounded-md border text-sm text-gray-500"
        onClick={(e) => {
          if (!isLoggedIn()) {
            return showLoginPopup();
          }

          if (hasEnrolled || isLoading || !isCourseComplete) {
            return;
          }

          window.location.href = `${import.meta.env.PUBLIC_COURSE_APP_URL}/${courseSlug}/certificate`;
        }}
        disabled={isLoading}
      >
        {!hasEnrolled && !isLoading && (
          <>
            <LockIcon className="size-8 stroke-[2.5] text-gray-300" />
            <p className="text-balance">Enroll to unlock the certificate</p>
          </>
        )}

        {hasEnrolled && !isLoading && (
          <>
            <LockIcon className="size-8 stroke-[2.5] text-gray-300" />
            <p className="text-balance">
              Complete the course to unlock the certificate
            </p>
          </>
        )}

        {hasEnrolled && isCourseComplete && !isLoading && (
          <>
            <CheckCircle2Icon className="size-8 stroke-[2.5] text-gray-300" />
            <p className="text-balance">Download Certificate</p>
          </>
        )}

        {isLoading && (
          <div className="striped-loader absolute inset-0 z-10 h-full w-full bg-white" />
        )}
      </button>
    </>
  );
}
