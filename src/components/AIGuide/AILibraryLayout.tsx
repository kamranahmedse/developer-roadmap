import { useState } from 'react';
import { AITutorHeader } from '../AITutor/AITutorHeader';
import { AITutorLayout } from '../AITutor/AITutorLayout';
import { UpgradeAccountModal } from '../Billing/UpgradeAccountModal';
import { LibraryTabs } from '../Library/LibraryTab';

type AILibraryLayoutProps = {
  activeTab: 'courses' | 'guides';
  children: React.ReactNode;
};

export function AILibraryLayout(props: AILibraryLayoutProps) {
  const { activeTab, children } = props;

  const [showUpgradePopup, setShowUpgradePopup] = useState(false);

  return (
    <AITutorLayout activeTab="library">
      {showUpgradePopup && (
        <UpgradeAccountModal onClose={() => setShowUpgradePopup(false)} />
      )}
      <div className="mx-auto flex w-full max-w-6xl flex-grow flex-col p-2">
        <AITutorHeader
          title="Library"
          subtitle="Explore your AI-generated guides and courses"
          onUpgradeClick={() => setShowUpgradePopup(true)}
        />

        <LibraryTabs activeTab={activeTab} />
        {children}
      </div>
    </AITutorLayout>
  );
}
