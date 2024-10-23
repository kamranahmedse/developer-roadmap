import { useState } from 'react';
import type { ChapterFileType, LessonFileType } from '../../lib/course';
import { Chapter } from './Chapter';
import { StickyNote } from 'lucide-react';

export type CourseSidebarProps = {
  currentCourseId: string;
  currentChapterId?: string;
  currentLessonId?: string;

  title: string;
  chapters: ChapterFileType[];
  lesson?: LessonFileType;

  completedPercentage: number;
};

export function CourseSidebar(props: CourseSidebarProps) {
  const {
    title,
    chapters,
    completedPercentage,
    currentCourseId,
    currentChapterId,
    currentLessonId,
  } = props;

  const [activeChapterId, setActiveChapterId] = useState(currentChapterId);

  const ceritificateUrl = `/learn/${currentCourseId}/certificate`;

  return (
    <aside className="border-r border-zinc-800">
      <div className="border-b border-zinc-800 p-4">
        <h2 className="text-lg font-semibold">{title}</h2>

        <div className="mt-4">
          <span>{completedPercentage}% Completed</span>
          <div className="relative mt-2 h-1 w-full overflow-hidden rounded-md bg-zinc-800">
            <div
              className="absolute inset-0 rounded-md bg-zinc-500 transition-[width] duration-150 will-change-[width]"
              style={{ width: `${completedPercentage}%` }}
            />
          </div>
        </div>
      </div>

      <div className="relative h-full">
        <div className="absolute inset-0 overflow-y-auto [scrollbar-color:#3f3f46_#27272a;]">
          {chapters?.map((chapter, index) => {
            const isActive = activeChapterId === chapter.id;

            return (
              <Chapter
                key={chapter.id}
                isActive={isActive}
                onChapterClick={() => {
                  if (isActive) {
                    setActiveChapterId('');
                  } else {
                    setActiveChapterId(chapter.id);
                  }
                }}
                index={index + 1}
                {...chapter}
                currentCourseId={currentCourseId}
                currentChapterId={currentChapterId}
                currentLessonId={currentLessonId}
              />
            );
          })}

          <a
            className="flex items-center gap-2 p-2 text-sm text-zinc-500 hover:bg-zinc-800 hover:text-white"
            href={ceritificateUrl}
          >
            <StickyNote className="h-4 w-4 stroke-[2.5]" />
            Certificate
          </a>
        </div>
      </div>
    </aside>
  );
}
