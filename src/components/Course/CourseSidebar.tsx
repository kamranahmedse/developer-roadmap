import { useState } from 'react';
import type { ChapterFileType, LessonFileType } from '../../lib/course';
import { Chapter } from './Chapter';
import { StickyNote, ChevronLeft } from 'lucide-react';
import { ProgressPercentageSkeleton } from './CourseSkeletons';
import { cn } from '../../lib/classname';

export type CourseSidebarProps = {
  isLoading: boolean;

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
    isLoading: isProgressLoading,
  } = props;

  const [openedChapterId, setOpenedChapterId] = useState(activeChapterId);

  const certificateUrl = `/learn/${activeCourseId}/certificate`;

  return (
    <aside className="border-r">
      <a
        href="/roadmaps"
        className="flex items-center gap-1 border-b bg-gray-100 px-3 py-2 text-sm hover:bg-gray-200"
      >
        <ChevronLeft className="size-4" />
        Back to All Courses
      </a>

      <div className="border-b">
        <div className="px-4 pb-5 pt-7">
          <h2 className="mb-1.5 text-2xl font-semibold">{title}</h2>

          {!isProgressLoading && (
            <div className="text-sm">
              <span className="rounded-lg bg-yellow-300 px-1.5 py-0.5 text-black">
                {completedPercentage}%
              </span>{' '}
              Completed
            </div>
          )}

          {isProgressLoading && <ProgressPercentageSkeleton />}
        </div>
      </div>

      <div className="relative h-full">
        <div className="absolute pb-[150px] inset-0 overflow-y-auto [scrollbar-color:#3f3f46_#27272a;]">
          {chapters?.map((chapter, index) => {
            const isActive = openedChapterId === chapter.id;

            return (
              <Chapter
                key={chapter.id}
                isActive={isActive}
                isLoading={isProgressLoading}
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
            className={cn("flex items-center py-4 px-4 gap-2 text-base text-zinc-500 hover:bg-gray-200 hover:text-black", {
              "bg-gray-200": false,
            })}
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
