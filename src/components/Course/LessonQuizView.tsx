import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '../Resizable';
import { SqlCodeEditor } from '../SqlCodeEditor/SqlCodeEditor';
import type { ReactNode } from 'react';
import type { LessonFileType } from '../../lib/course';
import { LessonView } from './LessonView';
import { QuizView } from './QuizView';

type LessonQuizViewProps = {
  lesson: LessonFileType;
  children: ReactNode;
};

export function LessonQuizView(props: LessonQuizViewProps) {
  const { children, lesson } = props;

  return (
    <ResizablePanelGroup direction="horizontal">
      <ResizablePanel defaultSize={50} minSize={20}>
        <LessonView>{children}</LessonView>
      </ResizablePanel>

      <ResizableHandle withHandle={true} />

      <ResizablePanel defaultSize={50} minSize={20}>
        <QuizView lesson={lesson} />
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}
