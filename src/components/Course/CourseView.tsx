import { lazy, useEffect, useState, type ReactNode } from 'react';
import type { LessonFileType } from '../../lib/course';
import { CourseLayout, type CourseLayoutProps } from './CourseLayout';
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '../Resizable';
import { isLoggedIn } from '../../lib/jwt';
import { IdCardIcon, Loader2Icon } from 'lucide-react';
import { showLoginPopup } from '../../lib/popup';
import { cn } from '../../lib/classname';

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

  const [isLoading, setIsLoading] = useState(true);
  const isAuthenticated = isLoggedIn();

  useEffect(() => {
    if (isAuthenticated === undefined) {
      return;
    }

    setIsLoading(false);
  }, [isAuthenticated]);

  if (isLoading) {
    return (
      <div className="mx-auto flex h-screen max-w-sm flex-col items-center justify-center gap-2 p-4 text-gray-700">
        <Loader2Icon className="size-10 animate-spin stroke-[2.5]" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="mx-auto flex h-screen max-w-sm flex-col items-center justify-center gap-2 p-4 text-gray-700">
        <IdCardIcon className="size-24" />
        <p className="text-balance text-center text-lg font-medium">
          You need to be logged in to access this course.
        </p>

        <button
          className="flex items-center gap-1 rounded-lg border border-gray-400 px-4 py-2 text-sm font-medium leading-none transition-colors hover:bg-black hover:text-white disabled:opacity-60"
          onClick={() => {
            showLoginPopup();
          }}
        >
          Login
        </button>
      </div>
    );
  }

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
                <div
                  className={cn('mx-auto max-w-3xl p-4', {
                    'max-w-xl': [
                      'lesson-challenge',
                      'challenge',
                      'lesson-quiz',
                    ].includes(lessonType),
                  })}
                >
                  <h3 className="mt-10 text-4xl font-bold">
                    {lesson.frontmatter.title}
                  </h3>
                  <div className="course-content prose-blockquote:font-normal prose prose-lg mt-8 text-black prose-headings:mb-3 prose-headings:mt-8 prose-pre:rounded-2xl prose-pre:text-lg prose-li:my-1 prose-thead:border-zinc-800 prose-tr:border-zinc-800">
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
