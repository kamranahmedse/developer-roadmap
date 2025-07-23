import { useStore } from '@nanostores/react';
import {
    hideUpgradeModal,
    isUpgradeModalOpen,
} from '../../stores/subscription';
import { UpgradeAccountModal } from './UpgradeAccountModal';

export function GlobalUpgradeModal() {
  const isOpen = useStore(isUpgradeModalOpen);

  if (!isOpen) {
    return null;
  }

  return <UpgradeAccountModal onClose={hideUpgradeModal} />;
}
