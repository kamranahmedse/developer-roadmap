import { type ReactNode } from 'react';

type LessonViewProps = {
  children: ReactNode;
};

export function LessonView(props: LessonViewProps) {
  const { children } = props;

  return (
    <div className="relative h-full">
      <div className="absolute inset-0 overflow-y-auto [scrollbar-color:#3f3f46_#27272a;]">
        <div className="mx-auto max-w-xl p-4">
          <div className="course-content prose prose-lg prose-invert mt-8 text-zinc-300 prose-headings:mb-3 prose-headings:mt-8 prose-code:text-zinc-100 prose-li:my-1 prose-thead:border-zinc-800 prose-tr:border-zinc-800">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
