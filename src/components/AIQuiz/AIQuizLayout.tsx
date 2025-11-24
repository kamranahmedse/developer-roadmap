import { AITutorLayout } from '../AITutor/AITutorLayout';

type AIQuizLayoutProps = {
  children: React.ReactNode;
};

export function AIQuizLayout(props: AIQuizLayoutProps) {
  const { children } = props;
  return (
    <AITutorLayout
      activeTab="quiz"
      wrapperClassName="flex-row p-0 lg:p-0 relative overflow-hidden bg-white"
      containerClassName="h-[calc(100vh-49px)] overflow-hidden relative"
    >
      {children}
    </AITutorLayout>
  );
}
