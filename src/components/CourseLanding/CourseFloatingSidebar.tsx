import { useMutation, useQueries, useQuery } from '@tanstack/react-query';
import type { CourseDetailsResponse } from '../../api/course';
import { cn } from '../../lib/classname';
import { isLoggedIn } from '../../lib/jwt';
import { showLoginPopup } from '../../lib/popup';
import { courseProgressOptions } from '../../queries/course-progress';
import { queryClient } from '../../stores/query-client';
import { useEffect, useRef, useState, type RefObject } from 'react';
import { CheckCircle2Icon, LockIcon } from 'lucide-react';
import { coursePriceOptions } from '../../queries/billing';
import { EnrollButton } from './EnrollButton';

type CourseFloatingSidebarProps = {
  containerRef: RefObject<HTMLDivElement>;
  course: CourseDetailsResponse;

  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
};

export function CourseFloatingSidebar(props: CourseFloatingSidebarProps) {
  const { containerRef, course, isLoading, setIsLoading } = props;

  const { slug, _id: courseId } = course;

  const floatingSidebarRef = useRef<HTMLDivElement>(null);

  const { data: courseProgress, isLoading: isCourseProgressLoading } = useQuery(
    {
      ...courseProgressOptions(slug),
      enabled: !!isLoggedIn(),
    },
    queryClient,
  );

  const { isLoading: isCoursePricingLoading } = useQuery(
    coursePriceOptions({ courseSlug: slug }),
    queryClient,
  );

  const hasEnrolled = courseProgress?.enrolledAt ? true : false;

  const isQueryLoading = isCourseProgressLoading || isCoursePricingLoading;
  useEffect(() => {
    if (isQueryLoading) {
      return;
    }

    setIsLoading(false);
  }, [courseProgress, isQueryLoading]);

  const whatYouGet = [
    'Full access to all the courses',
    'Personalized access using AI',
    'Certificate of Completion',
    'Playground for live-coding',
    'Challenges / Quizes',
  ];

  useEffect(() => {
    const container = containerRef.current;
    const sidebar = floatingSidebarRef.current;

    if (!container || !sidebar) return;

    // Cache container dimensions
    const containerRect = container.getBoundingClientRect();
    const containerPaddingTop = 32;
    const containerPaddingBottom = 32;
    const containerTop =
      window.scrollY + containerRect.top + containerPaddingTop;
    const containerBottom = containerTop + containerRect.height;

    const topMargin = 32;
    const bottomMargin = 32;

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const sidebarHeight = sidebar.offsetHeight;

      const hasReachedBottom =
        scrollY +
          sidebarHeight +
          bottomMargin +
          topMargin +
          containerPaddingBottom >
        containerBottom;

      if (scrollY + topMargin < containerTop) {
        sidebar.style.top = `0px`;
      } else if (hasReachedBottom) {
        const bottomPosition =
          containerRect.height - sidebarHeight - bottomMargin - topMargin;
        sidebar.style.top = `${bottomPosition}px`;
      } else {
        sidebar.style.top = `${scrollY - containerTop + topMargin}px`;
      }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [containerRef, floatingSidebarRef]);

  return (
    <div
      className="absolute overflow-hidden rounded-lg border bg-white shadow-sm"
      ref={floatingSidebarRef}
    >
      <figure>
        <img
          src="https://images.unsplash.com/photo-1732200584655-3511db5c24e2?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw5fHx8ZW58MHx8fHx8"
          alt="SQL 101"
          className="aspect-video w-full object-cover"
        />
      </figure>

      <div className="p-2">
        <EnrollButton
          courseId={courseId}
          courseSlug={slug}
          isLoading={isLoading}
        />
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
      <h4 className="text-lg font-medium text-black">
        Certificate of Completion
      </h4>
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
