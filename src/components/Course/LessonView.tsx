import { type ReactNode } from 'react';

type LessonViewProps = {
  children: ReactNode;
};

export function LessonView(props: LessonViewProps) {
  const { children } = props;

  return (
    <div className="relative h-full">
      <div className="absolute inset-0 overflow-y-auto [scrollbar-color:#3f3f46_#27272a;]">
        <div className="mx-auto max-w-xl p-4">{children}</div>
      </div>
    </div>
  );
}
