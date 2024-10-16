import { useState, type ReactNode } from 'react';
import { CourseSidebar } from './CourseSidebar';
import { CourseLayout } from './CourseLayout';
import { Circle, CircleCheck, CircleX } from 'lucide-react';
import { cn } from '../../lib/classname';
import type {
  ChapterFileType,
  CourseFileType,
  LessonFileType,
} from '../../lib/course';

type LessonViewProps = {
  courseId: string;
  chapterId: string;
  lessonId: string;

  title: string;
  course: CourseFileType & {
    chapters: ChapterFileType[];
  };
  lesson: LessonFileType;
  children: ReactNode;
};

export function LessonView(props: LessonViewProps) {
  const { children, title, course, lesson, courseId, lessonId, chapterId } =
    props;
  const { chapters } = course;

  return (
    <CourseLayout
      courseId={courseId}
      chapterId={chapterId}
      lessonId={lesson.id}
      title={title}
      chapters={chapters}
      completedPercentage={0}
    >
      <div className="relative h-full">
        <div className="absolute inset-0 overflow-y-auto [scrollbar-color:#3f3f46_#27272a;]">
          <div className="mx-auto max-w-xl p-4 py-10">{children}</div>
        </div>
      </div>
    </CourseLayout>
  );
}
