import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '../Resizable';
import { SqlCodeEditor } from '../SqlCodeEditor/SqlCodeEditor';
import type { ReactNode } from 'react';
import type { LessonFileType } from '../../lib/course';

type ChallengeViewProps = {
  lesson: LessonFileType;
  children: ReactNode;
};

export function ChallengeView(props: ChallengeViewProps) {
  const { children, lesson } = props;

  const { frontmatter } = lesson;
  const { defaultValue, initSteps, expectedResults } = frontmatter;

  return (
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
  );
}
