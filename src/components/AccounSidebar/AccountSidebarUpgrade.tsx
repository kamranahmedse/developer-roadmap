import { useIsMounted } from '../../hooks/use-is-mounted';
import { isLoggedIn } from '../../lib/jwt';
import { useIsPaidUser } from '../../queries/billing';
import { UpgradeSidebarCard } from '../AITutor/UpgradeSidebarCard';
import { useState } from 'react';
import { UpgradeAccountModal } from '../Billing/UpgradeAccountModal';

export function AccountSidebarUpgrade() {
  const isMounted = useIsMounted();
  const { isPaidUser, isLoading: isPaidUserLoading } = useIsPaidUser();
  const [isUpgradeModalOpen, setIsUpgradeModalOpen] = useState(false);

  if (!isMounted || isPaidUserLoading || !isLoggedIn() || isPaidUser) {
    return null;
  }

  return (
    <>
      {isUpgradeModalOpen && (
        <UpgradeAccountModal onClose={() => setIsUpgradeModalOpen(false)} />
      )}

      <UpgradeSidebarCard
        onUpgrade={() => setIsUpgradeModalOpen(true)}
        className="mt-4 -mr-px rounded-r-none ml-0"
        descriptionClassName="leading-normal"
        title="Upgrade"
        description="Unlock premium features including AI tutor and more."
        showLimit={false}
      />
    </>
  );
}
