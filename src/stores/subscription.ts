import { atom } from 'nanostores';

export const isUpgradeModalOpen = atom(false);

export function showUpgradeModal() {
  isUpgradeModalOpen.set(true);
}

export function hideUpgradeModal() {
  isUpgradeModalOpen.set(false);
}
