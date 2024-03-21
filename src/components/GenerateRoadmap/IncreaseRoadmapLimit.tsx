import { useState } from 'react';
import { cn } from '../../lib/classname';
import { ChevronUp } from 'lucide-react';
import { Modal } from '../Modal';
import { ReferYourFriend } from './ReferYourFriend';
import { OpenAISettings } from './OpenAISettings';
import { PayToBypass } from './PayToBypass';
import { PickLimitOption } from './PickLimitOption';

export type IncreaseTab = 'api-key' | 'refer-friends' | 'payment';

export const increaseLimitTabs: {
  key: IncreaseTab;
  title: string;
}[] = [
  { key: 'api-key', title: 'Add your own API Key' },
  { key: 'refer-friends', title: 'Refer your Friends' },
  { key: 'payment', title: 'Pay to Bypass the limit' },
];

type IncreaseRoadmapLimitProps = {
  onClose: () => void;
};
export function IncreaseRoadmapLimit(props: IncreaseRoadmapLimitProps) {
  const { onClose } = props;
  const [activeTab, setActiveTab] = useState<IncreaseTab | null>(null);

  return (
    <Modal
      onClose={onClose}
      wrapperClassName="max-w-lg"
      bodyClassName={cn(!activeTab && 'overflow-hidden')}
    >
      {!activeTab && (
        <PickLimitOption activeTab={activeTab} setActiveTab={setActiveTab} />
      )}

      {activeTab === 'api-key' && (
        <OpenAISettings
          onClose={() => setActiveTab(null)}
          onBack={() => setActiveTab(null)}
        />
      )}
      {activeTab === 'refer-friends' && (
        <ReferYourFriend onBack={() => setActiveTab(null)} />
      )}
      {activeTab === 'payment' && (
        <PayToBypass onBack={() => setActiveTab(null)} />
      )}
    </Modal>
  );
}
