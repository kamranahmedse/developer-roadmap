import { Check } from 'lucide-react';
import { cn } from '../../lib/classname';

export type Lesson = {
  slug: string;
  index: number;
  title: string;
};

export type Quiz = {
  slug: string;
  index: number;
  title: string;
};

export type Challenge = {
  slug: string;
  index: number;
  title: string;
};

export type Chapter = {
  index: number;
  slug: string;
  title: string;
  lessons: Lesson[];
  exercises: (Quiz | Challenge)[];
};

type ChapterProps = Chapter & {
  isActive?: boolean;
  isCompleted?: boolean;
};

export function Chapter(props: ChapterProps) {
  const { index, title, lessons, exercises, isActive = false } = props;

  return (
    <div>
      <button
        className={cn(
          'flex w-full items-center gap-2 border-b border-zinc-800 p-2 text-sm',
          isActive && 'bg-zinc-300 text-zinc-900',
        )}
      >
        <div className="flex size-5 items-center justify-center rounded-full bg-zinc-700 text-xs text-white">
          {index}
        </div>
        <span>{title}</span>
      </button>

      {isActive && (
        <div className="flex flex-col border-b border-zinc-800">
          <div>
            {lessons.map((lesson) => (
              <Lesson key={lesson.slug} {...lesson} isCompleted={false} />
            ))}
          </div>

          <div className="relative">
            <label className="relative z-10 my-2 ml-2 block max-w-max rounded-md bg-zinc-800 p-1 px-2 text-xs">
              Exercises
            </label>

            <span className="absolute left-[17px] top-0 h-full w-0.5 bg-zinc-700"></span>
          </div>

          <div>
            {exercises.map((exercise) => (
              <Lesson key={exercise.slug} {...exercise} isCompleted={false} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

type LessonProps = (Lesson | Quiz | Challenge) & {
  isActive?: boolean;
  isCompleted?: boolean;
};

export function Lesson(props: LessonProps) {
  const { title, isCompleted, isActive } = props;

  return (
    <a
      className={cn(
        'relative flex w-full items-center gap-2 p-2 text-sm text-zinc-600',
        isActive && 'bg-zinc-800 text-white',
      )}
    >
      <div className="relative z-10 flex size-5 items-center justify-center rounded-full bg-zinc-700 text-xs text-white">
        {isCompleted && <Check className="h-4 w-4" />}
      </div>
      <span>{title}</span>

      <span className="absolute left-[17px] top-0 h-full w-0.5 bg-zinc-700"></span>
    </a>
  );
}
