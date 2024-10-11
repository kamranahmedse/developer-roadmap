import { useState, type ReactNode } from 'react';
import { CourseSidebar } from './CourseSidebar';
import { CourseLayout } from './CourseLayout';
import { Circle, CircleCheck, CircleX } from 'lucide-react';
import { cn } from '../../lib/classname';

type LessonViewProps = {
  children: ReactNode;
};

export function LessonView(props: LessonViewProps) {
  const { children } = props;

  return (
    <CourseLayout>
      <CourseSidebar />

      <div className="relative h-full">
        <div className="absolute inset-0 overflow-y-auto [scrollbar-color:#3f3f46_#27272a;]">
          <div className="mx-auto max-w-xl p-4 py-10">{children}</div>
        </div>
      </div>
    </CourseLayout>
  );
}
