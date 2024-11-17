import { Check, Loader2, Play } from 'lucide-react';
import { cn } from '../../lib/classname';
import type { ChapterFileType, LessonFileType } from '../../lib/course';
import { useMemo, type CSSProperties } from 'react';
import { useCourseProgress } from '../../hooks/use-course';
import { CheckIcon } from '../ReactIcons/CheckIcon';
import { getPercentage } from '../../helper/number';
import { useIsMounted } from '../../hooks/use-is-mounted';
import { CircularProgress } from './CircularProgress';

function LeftBorder({ hasCompleted }: { hasCompleted?: boolean }) {
  return (
    <span
      className={cn('absolute left-[17px] top-0 h-full w-0.5 bg-gray-200', {
        'bg-green-600': hasCompleted,
      })}
    ></span>
  );
}

type ChapterProps = ChapterFileType & {
  index: number;
  isActive?: boolean;
  isCompleted?: boolean;

  activeCourseId: string;
  activeChapterId?: string;
  activeLessonId?: string;
  onChapterClick?: () => void;
};

export function Chapter(props: ChapterProps) {
  const {
    id: chapterId,
    index,
    frontmatter,
    lessons,
    isActive = false,
    onChapterClick,

    activeCourseId,
    activeChapterId,
    activeLessonId,
  } = props;
  const { title } = frontmatter;

  const { data: courseProgress } = useCourseProgress(activeCourseId);

  const completeLessonSet = useMemo(
    () =>
      new Set(
        (courseProgress?.completed || [])
          .filter((l) => l.chapterId === chapterId)
          .map((l) => `${l.chapterId}/${l.lessonId}`),
      ),
    [courseProgress],
  );

  const isChapterCompleted =
    lessons.length > 0 &&
    lessons.every((lesson) =>
      completeLessonSet.has(`${chapterId}/${lesson.id}`),
    );

  const completedPercentage = useMemo(() => {
    const completedCount = lessons.filter((lesson) =>
      completeLessonSet.has(`${chapterId}/${lesson.id}`),
    ).length;

    return getPercentage(completedCount, lessons.length);
  }, [lessons, completeLessonSet]);

  const [filteredLessons, exercises] = useMemo(() => {
    const sortedLessons = lessons.sort(
      (a, b) => a.frontmatter.order - b.frontmatter.order,
    );

    return [
      sortedLessons.filter(
        (lesson) => !['quiz', 'challenge'].includes(lesson.frontmatter.type),
      ),
      sortedLessons.filter((lesson) =>
        ['quiz', 'challenge'].includes(lesson.frontmatter.type),
      ),
    ];
  }, [lessons]);

  return (
    <div>
      <button
        className={cn(
          'relative z-10 flex w-full flex-row items-center gap-2 border-b px-2 py-4 text-base text-gray-600',
          {
            'text-black': isActive,
          },
        )}
        onClick={onChapterClick}
      >
        <CircularProgress
          isVisible={!isChapterCompleted}
          isActive={isActive}
          percentage={Number(completedPercentage) || 5}
        >
          <div
            className={cn(
              'text-400 flex h-[21px] w-[21px] flex-shrink-0 items-center justify-center rounded-full bg-gray-400/70 text-xs text-white',
              {
                'bg-black': isActive,
                'bg-green-600': isChapterCompleted,
              },
            )}
          >
            {!isChapterCompleted && index}
            {isChapterCompleted && (
              <Check className="h-3 w-3 stroke-[3] text-white" />
            )}
          </div>
        </CircularProgress>
        <span className="truncate text-left">{title}</span>
      </button>

      {isActive && (
        <div className="flex flex-col border-b bg-gray-100 pl-[5px]">
          {lessons.length > 0 && (
            <>
              <LessonList
                activeCourseId={activeCourseId}
                activeChapterId={activeChapterId}
                activeLessonId={activeLessonId}
                chapterId={chapterId}
                lessons={filteredLessons}
                completedLessonSet={completeLessonSet}
              />

              <div className="relative">
                <label className="relative z-10 my-2 ml-2 block max-w-max rounded-md bg-gray-200 p-1 px-2 text-xs">
                  Exercises
                </label>

                <LeftBorder />
              </div>

              <LessonList
                activeCourseId={activeCourseId}
                activeChapterId={activeChapterId}
                activeLessonId={activeLessonId}
                chapterId={chapterId}
                lessons={exercises}
                completedLessonSet={completeLessonSet}
              />
            </>
          )}

          {lessons.length === 0 && (
            <div className="p-2 text-sm text-zinc-500">Coming Soon</div>
          )}
        </div>
      )}
    </div>
  );
}

type LessonListProps = {
  activeCourseId: string;
  activeChapterId?: string;
  activeLessonId?: string;

  chapterId: string;
  lessons: LessonFileType[];
  completedLessonSet: Set<string>;
};

function LessonList(props: LessonListProps) {
  const {
    activeCourseId,
    activeChapterId,
    activeLessonId,
    chapterId,
    lessons,
    completedLessonSet,
  } = props;

  return (
    <div>
      {lessons.map((lesson, counter) => {
        const isActive =
          activeLessonId === lesson.id && chapterId === activeChapterId;
        const isCompleted = completedLessonSet.has(`${chapterId}/${lesson.id}`);

        return (
          <Lesson
            counter={counter + 1}
            key={lesson.id}
            {...lesson}
            courseId={activeCourseId}
            chapterId={chapterId}
            isActive={isActive}
            isCompleted={isCompleted}
          />
        );
      })}
    </div>
  );
}

type LessonProps = LessonFileType & {
  isActive?: boolean;
  isCompleted?: boolean;
  courseId: string;
  counter: number;
  chapterId: string;
};

export function Lesson(props: LessonProps) {
  const {
    frontmatter,
    isActive,
    courseId,
    chapterId,
    id: lessonId,
    counter,
    isCompleted,
  } = props;
  const { title } = frontmatter;

  const isMounted = useIsMounted();
  const { isLoading } = useCourseProgress(courseId);
  const href = `/learn/${courseId}/${chapterId}/${lessonId}`;

  return (
    <a
      className={
        'group relative flex w-full items-center gap-2 p-2 text-sm hover:bg-gray-100'
      }
      href={href}
    >
      <div
        className={cn(
          'relative z-10 flex size-5 flex-shrink-0 items-center justify-center rounded-full bg-gray-400/70 text-xs text-white group-hover:bg-gray-400',
          {
            'bg-black group-hover:bg-black': isActive,
            'bg-green-600 group-hover:bg-green-600': !isActive && isCompleted,
          },
        )}
      >
        {!isCompleted && counter}
        {isCompleted && <Check className={'h-3 w-3 stroke-[3] text-white'} />}
      </div>
      <span
        className={cn('flex-grow truncate text-left text-gray-600', {
          'font-medium text-black': isActive,
        })}
      >
        {title}
      </span>

      <LeftBorder />
    </a>
  );
}
