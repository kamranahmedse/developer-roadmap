import { Check, Loader2 } from 'lucide-react';
import { cn } from '../../lib/classname';
import type { ChapterFileType, LessonFileType } from '../../lib/course';
import { useMemo, type CSSProperties } from 'react';
import { useCourseProgress } from '../../hooks/use-course';
import { CheckIcon } from '../ReactIcons/CheckIcon';
import { getPercentage } from '../../helper/number';
import { useIsMounted } from '../../hooks/use-is-mounted';

type ChapterProps = ChapterFileType & {
  index: number;
  isActive?: boolean;
  isCompleted?: boolean;

  currentCourseId: string;
  currentChapterId?: string;
  currentLessonId?: string;
  onChapterClick?: () => void;
};

export function Chapter(props: ChapterProps) {
  const {
    index,
    frontmatter,
    lessons,
    isActive = false,
    onChapterClick,

    currentCourseId,
    currentChapterId,
    currentLessonId,
  } = props;
  const { title } = frontmatter;

  const { data: courseProgress } = useCourseProgress(currentCourseId);

  const completeLessonSet = useMemo(
    () =>
      new Set(
        (courseProgress?.completed || [])
          .filter((l) => l.chapterId === currentChapterId)
          .map((l) => `${l.chapterId}/${l.lessonId}`),
      ),
    [courseProgress],
  );
  const isChapterCompleted = lessons.every((lesson) =>
    completeLessonSet.has(`${currentChapterId}/${lesson.id}`),
  );

  const completedPercentage = useMemo(() => {
    const completedCount = lessons.filter((lesson) =>
      completeLessonSet.has(`${currentChapterId}/${lesson.id}`),
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
          'relative z-10 flex w-full items-center gap-2 border-b border-zinc-800 p-2 text-sm',
          isActive && 'text-white',
        )}
        onClick={onChapterClick}
      >
        <div className="flex size-5 items-center justify-center rounded-full bg-zinc-700 text-xs text-white">
          {index}
        </div>
        <span className="truncate text-left">{title}</span>
        {isChapterCompleted && lessons.length > 0 && (
          <CheckIcon additionalClasses="h-4 w-4 ml-auto" />
        )}

        <div
          className="absolute inset-0 -z-10 w-[var(--completed-percentage)] bg-zinc-800 transition-[width] duration-150 will-change-[width]"
          style={
            {
              '--completed-percentage': `${completedPercentage}%`,
            } as CSSProperties
          }
        />
      </button>

      {isActive && (
        <div className="flex flex-col border-b border-zinc-800">
          {lessons.length > 0 && (
            <>
              <div>
                {filteredLessons?.map((lesson) => {
                  const isActive = currentLessonId === lesson.id;
                  const isCompleted = completeLessonSet.has(
                    `${currentChapterId}/${lesson.id}`,
                  );

                  return (
                    <Lesson
                      key={lesson.id}
                      {...lesson}
                      currentCourseId={currentCourseId}
                      currentChapterId={currentChapterId}
                      isActive={isActive}
                      isCompleted={isCompleted}
                    />
                  );
                })}
              </div>

              <div className="relative">
                <label className="relative z-10 my-2 ml-2 block max-w-max rounded-md bg-zinc-800 p-1 px-2 text-xs">
                  Exercises
                </label>

                <span className="absolute left-[17px] top-0 h-full w-0.5 bg-zinc-700"></span>
              </div>

              <div>
                {exercises?.map((exercise) => {
                  const isActive = currentLessonId === exercise.id;
                  const isCompleted = completeLessonSet.has(
                    `${currentChapterId}/${exercise.id}`,
                  );

                  return (
                    <Lesson
                      key={exercise.id}
                      {...exercise}
                      currentCourseId={currentCourseId}
                      currentChapterId={currentChapterId}
                      isActive={isActive}
                      isCompleted={isCompleted}
                    />
                  );
                })}
              </div>
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

type LessonProps = LessonFileType & {
  currentCourseId: string;
  currentChapterId?: string;

  isActive?: boolean;
  isCompleted?: boolean;
};

export function Lesson(props: LessonProps) {
  const {
    frontmatter,
    isActive,
    currentCourseId,
    currentChapterId,
    id: lessonId,
    isCompleted,
  } = props;
  const { title } = frontmatter;

  const isMounted = useIsMounted();
  const { isLoading } = useCourseProgress(currentCourseId);
  const href = `/learn/${currentCourseId}/${currentChapterId}/${lessonId}`;

  return (
    <a
      className={cn(
        'relative flex w-full items-center gap-2 p-2 text-sm text-zinc-600',
        isActive && 'bg-zinc-800/50 text-white',
      )}
      href={href}
    >
      <div className="relative z-10 flex size-5 items-center justify-center rounded-full bg-zinc-700 text-xs text-white">
        {isCompleted && <Check className="h-3 w-3 stroke-[3]" />}
        {isLoading && isMounted && (
          <Loader2 className="h-3 w-3 animate-spin stroke-[3] opacity-60" />
        )}
      </div>
      <span className="truncate text-left">{title}</span>

      <span className="absolute left-[17px] top-0 h-full w-0.5 bg-zinc-700"></span>
    </a>
  );
}
