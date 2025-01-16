import {
  BookIcon,
  CalendarIcon,
  CodeXmlIcon,
  LetterTextIcon,
  ShapesIcon,
  UsersIcon,
} from 'lucide-react';
import { Rating } from '../Rating/Rating';
import { CourseStatPill } from './CourseStatPill';
import { useRef, useState, useEffect, useMemo } from 'react';
import { cn } from '../../lib/classname';
import { CourseInfoCard } from './CourseInfoCard';
import { ChevronDownIcon } from '../ReactIcons/ChevronDownIcon';
import { CourseChapterItem } from './CourseChapterItem';
import { CourseFloatingSidebar } from './CourseFloatingSidebar';
import type { CourseDetailsResponse } from '../../api/course';
import { sanitizeHtml } from '../../lib/sanitize-html';
import { markdownToHtml } from '../../lib/markdown';
import { getRelativeTimeString } from '../../lib/date';
import { humanizeNumber } from '../../lib/number';
import { EnrollButton } from './EnrollButton';

type CourseLandingProps = {
  course: CourseDetailsResponse;
};

export function CourseLanding(props: CourseLandingProps) {
  const { course } = props;

  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);

  const {
    title,
    chapters,
    description,
    detailedDescription,
    difficulty,
    updatedAt,
    rating,
    willLearn = [],
    enrolled,
    prerequisites,
  } = course;

  const updatedTime = getRelativeTimeString(updatedAt);
  const averageRating = rating ? rating.average : 0;

  const sortedChapters = chapters.sort((a, b) => a.sort - b.sort);
  const [lessonCount, challengeCount] = sortedChapters.reduce(
    (acc, chapter) => {
      const lessonCount = chapter.lessons.filter(
        (lesson) => lesson.type === 'lesson',
      ).length;
      const challengeCount = chapter.lessons.filter(
        (lesson) => lesson.type === 'challenge' || lesson.type === 'quiz',
      ).length;

      return [acc[0] + lessonCount, acc[1] + challengeCount];
    },
    [0, 0],
  );

  const enrolledLabel = `${humanizeNumber(enrolled)} user${
    enrolled > 1 ? 's' : ''
  }`;

  return (
    <div ref={containerRef}>
      <div className="bg-slate-900 py-5 text-white sm:py-8">
        <div className="container grid grid-cols-5 gap-6">
          <div className="col-start-1 col-end-4 space-y-4 max-md:col-end-6">
            <p className="flex items-center gap-1 text-sm text-slate-400">
              <a href="/">Home</a> / <a href="/courses">Courses</a> /{' '}
              <a href={`/learn/${course.slug}`}>{title}</a>
            </p>

            <h1 className="mt-8 text-5xl font-bold">{title}</h1>

            <div className="flex items-center gap-2">
              <CourseStatPill
                icon={ShapesIcon}
                label={`Difficulty ${difficulty}`}
                className="border-none p-0 capitalize text-slate-400"
              />
              <CourseStatPill
                icon={CalendarIcon}
                label={`Updated ${updatedTime}`}
                className="border-none p-0 text-slate-400"
              />
            </div>

            {description && (
              <Description description={description} className="prose-invert" />
            )}

            <div className="flex items-center gap-2 text-sm">
              <Rating rating={averageRating} />
              <span>{averageRating}</span>
            </div>

            <div className="flex items-center gap-2">
              <CourseStatPill
                icon={UsersIcon}
                label={enrolledLabel + ' enrolled'}
                tinyLabel={enrolledLabel}
              />
              <CourseStatPill
                icon={LetterTextIcon}
                label={`${lessonCount} Lessons`}
                tinyLabel={`${lessonCount}`}
              />
              <CourseStatPill
                icon={CodeXmlIcon}
                label={`${challengeCount} Challenges`}
                tinyLabel={`${challengeCount}`}
              />
            </div>
          </div>

          <div className="relative col-start-4 col-end-6 max-md:hidden">
            <CourseFloatingSidebar
              containerRef={containerRef}
              course={course}
              isLoading={isLoading}
              setIsLoading={setIsLoading}
            />
          </div>
        </div>
      </div>

      <div className="bg-gray-50">
        <div className="container grid grid-cols-5 gap-6 py-8">
          <div className="col-start-1 col-end-4 space-y-4 max-md:col-end-6">
            {willLearn.length > 0 && (
              <CourseInfoCard title="What you'll learn">
                <ul className="flex list-inside list-disc flex-col gap-1 text-sm text-gray-700 marker:text-gray-400">
                  {willLearn.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </CourseInfoCard>
            )}

            {detailedDescription && (
              <CourseInfoCard title="About this Course">
                <div className="mt-4">
                  <Description description={detailedDescription} />
                </div>
              </CourseInfoCard>
            )}

            {prerequisites && prerequisites.length > 0 && (
              <CourseInfoCard title="Prerequisites">
                <ul className="flex list-inside list-disc flex-col gap-1 text-sm text-gray-700 marker:text-gray-400">
                  {prerequisites.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </CourseInfoCard>
            )}

            <CourseInfoCard title="Course Content">
              {sortedChapters.map((chapter, index) => {
                const { title, lessons } = chapter;
                const isFirst = index === 0;
                const isLast = index === sortedChapters.length - 1;

                return (
                  <CourseChapterItem
                    key={title}
                    title={title}
                    lessons={lessons}
                    className={cn(
                      isFirst ? 'rounded-t-md' : '',
                      isLast ? 'rounded-b-md' : 'border-b-0',
                    )}
                    isOpen={isFirst}
                  />
                );
              })}
            </CourseInfoCard>
          </div>
        </div>
      </div>

      <div className="bottom-0 hidden items-center justify-between gap-2 bg-black p-4 text-white max-md:sticky max-md:flex">
        <div>
          <h2 className="truncate text-xl font-medium">{title}</h2>

          <div className="mt-2 flex items-center gap-2">
            <CourseStatPill
              icon={ShapesIcon}
              label={`Difficulty ${difficulty}`}
              className="border-none p-0 capitalize text-slate-400"
              tinyLabel={difficulty}
            />
            <CourseStatPill
              icon={CalendarIcon}
              label={`Updated ${updatedTime}`}
              tinyLabel={updatedTime}
              className="border-none p-0 text-slate-400"
            />
          </div>
        </div>

        <EnrollButton
          courseId={course._id}
          courseSlug={course.slug}
          isLoading={isLoading}
          className="w-fit gap-3"
        />
      </div>
    </div>
  );
}

type DescriptionProps = {
  description: string;
  className?: string;
};

export function Description(props: DescriptionProps) {
  const { description, className } = props;

  const html = useMemo(() => {
    return sanitizeHtml(markdownToHtml(description, false));
  }, [description]);

  return (
    <div
      className={cn(
        'course-content prose prose-sm prose-headings:mb-3 prose-headings:mt-8 prose-blockquote:font-normal prose-pre:rounded-2xl prose-pre:text-lg prose-li:my-1 prose-thead:border-zinc-800 prose-tr:border-zinc-800',
        className,
      )}
      dangerouslySetInnerHTML={{ __html: html }}
    ></div>
  );
}
