import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '../Resizable';
import { CourseSidebar, type CourseSidebarProps } from './CourseSidebar';
import { CourseLayout } from './CourseLayout';
import {
  SqlCodeEditor,
  type SqlCodeEditorProps,
} from '../SqlCodeEditor/SqlCodeEditor';
import type { ReactNode } from 'react';

type ChallengeViewProps = SqlCodeEditorProps &
  CourseSidebarProps & {
    children: ReactNode;
  };

export function ChallengeView(props: ChallengeViewProps) {
  const {
    children,
    title,
    chapters,
    completedPercentage,
    ...sqlCodeEditorProps
  } = props;

  return (
    <CourseLayout>
      <CourseSidebar
        title={title}
        chapters={chapters}
        completedPercentage={completedPercentage}
      />

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
          <SqlCodeEditor {...sqlCodeEditorProps} />
        </ResizablePanel>
      </ResizablePanelGroup>
    </CourseLayout>
  );
}
