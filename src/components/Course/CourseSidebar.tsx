import { useState } from 'react';
import type { ChapterFileType, LessonFileType } from '../../lib/course';
import { Chapter } from './Chapter';
import { StickyNote } from 'lucide-react';

export type CourseSidebarProps = {
  activeCourseId: string;
  activeChapterId?: string;
  activeLessonId?: string;

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
    activeCourseId,
    activeChapterId,
    activeLessonId,
  } = props;

  const [openedChapterId, setOpenedChapterId] = useState(activeChapterId);

  const certificateUrl = `/learn/${activeCourseId}/certificate`;

  return (
    <aside className="border-r">
      <div className="border-b p-4">
        <h2 className="mb-1.5 text-2xl font-semibold">{title}</h2>
        <div className="text-sm">
          <span className="rounded-lg bg-yellow-300 px-1.5 py-0.5 text-black">
            {completedPercentage}%
          </span>{' '}
          Completed
        </div>
      </div>

      <div className="relative h-full">
        <div className="absolute inset-0 overflow-y-auto [scrollbar-color:#3f3f46_#27272a;]">
          {chapters?.map((chapter, index) => {
            const isActive = openedChapterId === chapter.id;

            return (
              <Chapter
                key={chapter.id}
                isActive={isActive}
                onChapterClick={() => {
                  if (isActive) {
                    setOpenedChapterId('');
                  } else {
                    setOpenedChapterId(chapter.id);
                  }
                }}
                index={index + 1}
                {...chapter}
                activeCourseId={activeCourseId}
                activeChapterId={activeChapterId}
                activeLessonId={activeLessonId}
              />
            );
          })}

          <a
            className="flex items-center gap-2 p-2 text-sm text-zinc-500 hover:bg-zinc-800 hover:text-white"
            href={certificateUrl}
          >
            <StickyNote className="h-4 w-4 stroke-[2.5]" />
            Certificate
          </a>
        </div>
      </div>
    </aside>
  );
}
