import { AITutorSidebar, type AITutorTab } from './AITutorSidebar';

type AITutorLayoutProps = {
  children: React.ReactNode;
  activeTab: AITutorTab;
};

export function AITutorLayout(props: AITutorLayoutProps) {
  const { children, activeTab } = props;

  return (
    <div className="flex flex-grow flex-row">
      <AITutorSidebar activeTab={activeTab} />
      <div className="flex flex-grow flex-col">{children}</div>
    </div>
  );
}
