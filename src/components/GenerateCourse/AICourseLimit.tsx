import { useQuery } from '@tanstack/react-query';
import {
  BookIcon,
  BookOpenIcon,
  MessageCircleQuestionIcon,
  ChevronDownIcon,
  ClockIcon,
  BotIcon,
} from 'lucide-react';
import { useState, useRef } from 'react';
import { getAiCourseLimitOptions } from '../../queries/ai-course';
import { queryClient } from '../../stores/query-client';
import { useOutsideClick } from '../../hooks/use-outside-click';

export function AICourseLimit() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  const { data: limits, isLoading } = useQuery(
    getAiCourseLimitOptions(),
    queryClient,
  );

  useOutsideClick(containerRef, () => {
    setIsOpen(false);
  });

  if (isLoading || !limits) {
    return (
      <div className="h-[34px] w-[243px] animate-pulse rounded-lg border border-gray-200 bg-gray-200"></div>
    );
  }

  const {
    used: courseUsed,
    limit: courseLimit,
    lessonUsed,
    lessonLimit,
    followUpUsed,
    followUpLimit,
  } = limits;

  const coursePercentage = Math.round((courseUsed / courseLimit) * 100);
  const lessonPercentage = Math.round((lessonUsed / lessonLimit) * 100);
  const followUpPercentage = Math.round((followUpUsed / followUpLimit) * 100);

  return (
    <div className="relative z-10" ref={containerRef}>
      <button
        className="flex cursor-pointer items-center rounded-lg border border-gray-200 px-2 py-1.5 text-sm hover:bg-gray-50"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="mr-3 flex items-center gap-1.5">
          <BookIcon className="h-4 w-4" />
          {coursePercentage}%
        </div>
        <div className="mr-3 flex items-center gap-1.5">
          <BookOpenIcon className="h-4 w-4" />
          {lessonPercentage}%
        </div>
        <div className="mr-3 flex items-center gap-1.5">
          <BotIcon className="h-4 w-4" />
          {followUpPercentage}%
        </div>

        <span className="mr-1">of daily limits</span>
        <ChevronDownIcon className="h-4 w-4" />
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full w-full translate-y-1 overflow-hidden rounded-lg border border-gray-200 bg-white p-2 pt-0 text-sm shadow-lg">
          <div className="-mx-2">
            <div className="relative overflow-hidden">
              <div className="relative z-10 flex items-center gap-2 border-b border-b-gray-200 px-2 py-1">
                <BookIcon className="size-3.5" />
                {courseUsed} of {courseLimit} courses used
              </div>

              <div
                className="absolute inset-0 bg-gray-100"
                style={{
                  width: `${coursePercentage}%`,
                }}
              />
            </div>

            <div className="relative overflow-hidden">
              <div className="relative z-10 flex items-center gap-2 border-b border-b-gray-200 px-2 py-1">
                <BookOpenIcon className="size-3.5" />
                {lessonUsed} of {lessonLimit} lessons used
              </div>

              <div
                className="absolute inset-0 bg-gray-100"
                style={{
                  width: `${lessonPercentage}%`,
                }}
              />
            </div>

            <div className="relative overflow-hidden">
              <div className="relative z-10 flex items-center gap-2 border-b border-b-gray-200 px-2 py-1">
                <BotIcon className="size-3.5" />
                {followUpUsed} of {followUpLimit} follow-ups used
              </div>

              <div
                className="absolute inset-0 bg-gray-100"
                style={{
                  width: `${followUpPercentage}%`,
                }}
              />
            </div>
          </div>

          <div className="mt-2 flex items-center justify-center gap-2 text-gray-500">
            <ClockIcon className="size-3.5" />
            Limit resets every 24 hours
          </div>
        </div>
      )}
    </div>
  );
}
