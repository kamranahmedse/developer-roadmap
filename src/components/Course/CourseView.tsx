import { lazy, type ReactNode } from 'react';
import type { LessonFileType } from '../../lib/course';
import { CourseLayout, type CourseLayoutProps } from './CourseLayout';
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '../Resizable';

const SqlCodeEditor = lazy(() =>
  import('../SqlCodeEditor/SqlCodeEditor').then((module) => ({
    default: module.SqlCodeEditor,
  })),
);

const QuizView = lazy(() =>
  import('./QuizView').then((module) => ({
    default: module.QuizView,
  })),
);

type CourseViewProps = Omit<CourseLayoutProps, 'children'> & {
  lesson: LessonFileType;
  children?: ReactNode;
};

export function CourseView(props: CourseViewProps) {
  const { children, ...courseLayoutProps } = props;

  const { lesson } = courseLayoutProps;
  const { frontmatter } = lesson;
  const lessonType = frontmatter.type;

  const { defaultValue, initSteps, expectedResults } = frontmatter;
  const isTextualLesson = [
    'lesson',
    'lesson-challenge',
    'lesson-quiz',
  ].includes(lessonType);

  return (
    <CourseLayout {...courseLayoutProps}>
      <ResizablePanelGroup direction="horizontal">
        {children && (isTextualLesson || lessonType === 'challenge') && (
          <ResizablePanel
            defaultSize={lessonType === 'lesson' ? 100 : 60}
            minSize={20}
          >
            <div className="relative h-full">
              <div className="absolute inset-0 overflow-y-auto [scrollbar-color:#3f3f46_#27272a;]">
                <div className="mx-auto max-w-xl p-4">
                  <div className="course-content prose prose-lg prose-invert mt-8 text-zinc-300 prose-headings:mb-3 prose-headings:mt-8 prose-code:text-zinc-100 prose-li:my-1 prose-thead:border-zinc-800 prose-tr:border-zinc-800">
                    {children}
                  </div>
                </div>
              </div>
            </div>
          </ResizablePanel>
        )}

        {lessonType !== 'lesson' && (
          <>
            {lessonType !== 'quiz' && <ResizableHandle withHandle={true} />}

            <ResizablePanel
              defaultSize={lessonType === 'quiz' ? 100 : 40}
              minSize={20}
            >
              {(lessonType === 'challenge' ||
                lessonType === 'lesson-challenge') && (
                <SqlCodeEditor
                  defaultValue={defaultValue}
                  initSteps={initSteps}
                  expectedResults={expectedResults}
                />
              )}

              {(lessonType === 'quiz' || lessonType === 'lesson-quiz') && (
                <QuizView lesson={lesson} />
              )}
            </ResizablePanel>
          </>
        )}
      </ResizablePanelGroup>
    </CourseLayout>
  );
}
