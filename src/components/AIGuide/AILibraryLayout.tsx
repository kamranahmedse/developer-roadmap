import { AITutorLayout } from '../AITutor/AITutorLayout';
import { LibraryTabs } from '../Library/LibraryTab';

type AILibraryLayoutProps = {
  activeTab: 'courses' | 'guides';
  children: React.ReactNode;
};

export function AILibraryLayout(props: AILibraryLayoutProps) {
  const { activeTab, children } = props;

  return (
    <AITutorLayout activeTab="library">
      <div className="mx-auto w-full max-w-4xl p-2">
        <LibraryTabs activeTab={activeTab} />
        {children}
      </div>
    </AITutorLayout>
  );
}
