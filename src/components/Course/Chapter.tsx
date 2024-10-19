import { Check } from 'lucide-react';
import { cn } from '../../lib/classname';
import type { ChapterFileType, LessonFileType } from '../../lib/course';
import { useMemo } from 'react';

type ChapterProps = ChapterFileType & {
  index: number;
  isActive?: boolean;
  isCompleted?: boolean;

  courseId: string;
  chapterId: string;
  lessonId?: string;
  onChapterClick?: () => void;
};

export function Chapter(props: ChapterProps) {
  const {
    index,
    frontmatter,
    lessons,
    isActive = false,
    onChapterClick,

    courseId,
    chapterId,
    lessonId,
  } = props;
  const { title } = frontmatter;

  const exercises = useMemo(
    () =>
      lessons
        ?.filter(
          (lesson) =>
            lesson.frontmatter.type === 'quiz' ||
            lesson.frontmatter.type === 'challenge',
        )
        ?.sort((a, b) => a.frontmatter.order - b.frontmatter.order) || [],
    [lessons],
  );

  const filteredLessons = useMemo(
    () =>
      lessons
        ?.filter((lesson) =>
          ['lesson', 'lesson-challenge', 'lesson-quiz'].includes(
            lesson.frontmatter.type,
          ),
        )
        ?.sort((a, b) => a.frontmatter.order - b.frontmatter.order) || [],
    [lessons],
  );

  return (
    <div>
      <button
        className={cn(
          'flex w-full items-center gap-2 border-b border-zinc-800 p-2 text-sm',
          isActive && 'bg-zinc-300 text-zinc-900',
        )}
        onClick={onChapterClick}
      >
        <div className="flex size-5 items-center justify-center rounded-full bg-zinc-700 text-xs text-white">
          {index}
        </div>
        <span className="truncate text-left">{title}</span>
      </button>

      {isActive && (
        <div className="flex flex-col border-b border-zinc-800">
          {lessons.length > 0 && (
            <>
              <div>
                {filteredLessons?.map((lesson) => {
                  const isActive = lessonId === lesson.id;

                  return (
                    <Lesson
                      key={lesson.id}
                      {...lesson}
                      courseId={courseId}
                      chapterId={chapterId}
                      isActive={isActive}
                      isCompleted={false}
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
                  const isActive = lessonId === exercise.id;

                  return (
                    <Lesson
                      key={exercise.id}
                      {...exercise}
                      courseId={courseId}
                      chapterId={chapterId}
                      isActive={isActive}
                      isCompleted={false}
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
  courseId: string;
  chapterId: string;

  isActive?: boolean;
  isCompleted?: boolean;
};

export function Lesson(props: LessonProps) {
  const {
    frontmatter,
    isCompleted,
    isActive,
    courseId,
    chapterId,
    id: lessonId,
  } = props;
  const { title } = frontmatter;

  const href = `/learn/${courseId}/${chapterId}/${lessonId}`;

  return (
    <a
      className={cn(
        'relative flex w-full items-center gap-2 p-2 text-sm text-zinc-600',
        isActive && 'bg-zinc-800 text-white',
      )}
      href={href}
    >
      <div className="relative z-10 flex size-5 items-center justify-center rounded-full bg-zinc-700 text-xs text-white">
        {isCompleted && <Check className="h-4 w-4" />}
      </div>
      <span className="truncate text-left">{title}</span>

      <span className="absolute left-[17px] top-0 h-full w-0.5 bg-zinc-700"></span>
    </a>
  );
}
