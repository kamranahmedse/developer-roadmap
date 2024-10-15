import { useState } from 'react';
import type { ChapterFileType } from '../../lib/course';
import { Chapter } from './Chapter';

export type CourseSidebarProps = {
  title: string;
  chapters: ChapterFileType[];

  completedPercentage: number;
};

export function CourseSidebar(props: CourseSidebarProps) {
  const { title, chapters, completedPercentage } = props;

  const [activeChapterId, setActiveChapterId] = useState('');

  return (
    <aside className="border-r border-zinc-800">
      <div className="border-b border-zinc-800 p-4">
        <h2 className="text-lg font-semibold">{title}</h2>

        <div className="mt-4">
          <span>{completedPercentage}% Completed</span>
          <div className="mt-2 h-1 w-full bg-zinc-800"></div>
        </div>
      </div>

      <div className="relative h-full">
        <div className="absolute inset-0 overflow-y-auto [scrollbar-color:#3f3f46_#27272a;]">
          {chapters.map((chapter, index) => {
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
              />
            );
          })}
        </div>
      </div>
    </aside>
  );
}
