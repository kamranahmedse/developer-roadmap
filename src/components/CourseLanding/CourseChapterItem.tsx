import { BookIcon, ChevronDownIcon, CodeXmlIcon } from 'lucide-react';
import { cn } from '../../lib/classname';
import type { LessonFrontmatter } from '../../lib/course';
import { useMemo, useState } from 'react';

type CourseChapterItemProps = {
  title: string;
  lessons: {
    type: string;
    title: string;
  }[];
  className?: string;
};

export function CourseChapterItem(props: CourseChapterItemProps) {
  const { title, lessons, className } = props;

  const [isOpen, setIsOpen] = useState(false);

  const { excercises, textualLessons } = useMemo(() => {
    const excercises: CourseChapterItemProps['lessons'] = [];
    const textualLessons: CourseChapterItemProps['lessons'] = [];

    lessons.forEach((lesson) => {
      if (lesson.type === 'quiz' || lesson.type === 'challenge') {
        excercises.push(lesson);
      } else {
        textualLessons.push(lesson);
      }
    });

    return {
      excercises,
      textualLessons,
    };
  }, [lessons]);

  return (
    <div className={cn('border', className)}>
      <div
        role="button"
        className="flex w-full items-center justify-between gap-1 p-2 pr-3"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="text-lg font-medium">{title}</span>

        <div className="flex items-center gap-2">
          {textualLessons.length > 0 && (
            <span className="text-sm text-gray-500">
              {textualLessons.length} Lesson
              {textualLessons.length > 1 ? 's' : ''}
            </span>
          )}

          {excercises.length > 0 && (
            <span className="text-sm text-gray-500">
              {excercises.length} Excerice
              {excercises.length > 1 ? 's' : ''}
            </span>
          )}

          <ChevronDownIcon
            className={cn(
              'size-3.5 stroke-[2.5] transition-transform',
              isOpen ? 'rotate-180 transform' : '',
            )}
          />
        </div>
      </div>

      {isOpen && (
        <div className="border-t">
          {lessons.map((lesson, index) => {
            return (
              <div key={index} className="flex items-center gap-2 p-2">
                <span className="text-gray-500">
                  {lesson.type === 'lesson' ? (
                    <BookIcon className="size-4 stroke-[2.5]" />
                  ) : (
                    <CodeXmlIcon className="size-4 stroke-[2.5]" />
                  )}
                </span>
                <span>{lesson.title}</span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
