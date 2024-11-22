import { CourseLayout, type CourseLayoutProps } from './CourseLayout';
import { BookOpenIcon } from 'lucide-react';

type EmptyViewProps = Omit<CourseLayoutProps, 'children'> & {};

export function EmptyView(props: EmptyViewProps) {
  return (
    <CourseLayout {...props}>
      <div className="mx-auto flex max-w-sm flex-col items-center justify-center gap-2 p-4 text-gray-700">
        <BookOpenIcon className="size-24" />
        <p className="text-balance text-center text-lg font-medium">
          Select a lesson from the left sidebar to get started.
        </p>
      </div>
    </CourseLayout>
  );
}
