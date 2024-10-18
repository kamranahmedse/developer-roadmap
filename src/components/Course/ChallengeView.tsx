import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '../Resizable';
import { CourseSidebar } from './CourseSidebar';
import { CourseLayout } from './CourseLayout';
import { SqlCodeEditor } from '../SqlCodeEditor/SqlCodeEditor';
import type { ReactNode } from 'react';
import type {
  ChapterFileType,
  CourseFileType,
  LessonFileType,
} from '../../lib/course';

type ChallengeViewProps = {
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

export function ChallengeView(props: ChallengeViewProps) {
  const { children, title, course, lesson, courseId, chapterId } = props;
  const { chapters } = course;

  const { frontmatter } = lesson;
  const { defaultValue, initSteps, expectedResults } = frontmatter;

  return (
    <CourseLayout
      courseId={courseId}
      chapterId={chapterId}
      lessonId={lesson.id}
      lesson={lesson}
      title={title}
      chapters={chapters}
      completedPercentage={0}
    >
      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel defaultSize={60} minSize={20}>
          <div className="relative h-full">
            <div className="absolute inset-0 overflow-y-auto [scrollbar-color:#3f3f46_#27272a;]">
              <div className="mx-auto max-w-xl p-4">{children}</div>
            </div>
          </div>
        </ResizablePanel>

        <ResizableHandle withHandle={true} />

        <ResizablePanel defaultSize={40} minSize={20}>
          <SqlCodeEditor
            defaultValue={defaultValue}
            initSteps={initSteps}
            expectedResults={expectedResults}
          />
        </ResizablePanel>
      </ResizablePanelGroup>
    </CourseLayout>
  );
}
