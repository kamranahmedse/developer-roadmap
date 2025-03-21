import { useState } from 'react';
import { cn } from '../../lib/classname';
import { Modal } from '../Modal';
import { ReferYourFriend } from './ReferYourFriend';
import { PayToBypass } from './PayToBypass';
import { PickLimitOption } from './PickLimitOption';

export type IncreaseTab = 'refer-friends' | 'payment';

export const increaseLimitTabs: {
  key: IncreaseTab;
  title: string;
}[] = [
  { key: 'refer-friends', title: 'Refer your Friends' },
  { key: 'payment', title: 'Pay to Bypass the limit' },
];

type IncreaseRoadmapLimitProps = {
  onClose: () => void;
};
export function IncreaseRoadmapLimit(props: IncreaseRoadmapLimitProps) {
  const { onClose } = props;

  const [activeTab, setActiveTab] = useState<IncreaseTab | null>(
    'refer-friends',
  );

  return (
    <Modal
      onClose={onClose}
      overlayClassName={cn(
        'overscroll-contain',
        activeTab === 'payment' && 'block',
      )}
      wrapperClassName="max-w-lg mx-auto"
      bodyClassName={cn('h-auto pt-px', !activeTab && 'overflow-hidden')}
    >
      {!activeTab && (
        <PickLimitOption activeTab={activeTab} setActiveTab={setActiveTab} />
      )}

      {activeTab === 'refer-friends' && (
        <ReferYourFriend onBack={() => setActiveTab(null)} />
      )}
      {activeTab === 'payment' && (
        <PayToBypass
          onBack={() => setActiveTab(null)}
          onClose={() => {
            onClose();
          }}
        />
      )}
    </Modal>
  );
}
