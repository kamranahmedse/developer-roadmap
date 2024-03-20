import { useState } from 'react';
import { cn } from '../../lib/classname';
import { ChevronUp } from 'lucide-react';
import { Modal } from '../Modal';
import { ReferYourFriend } from './ReferYourFriend';
import { OpenAISettings } from './OpenAISettings';
import { PayToBypass } from './PayToBypass';

type IncreaseTab = 'api-key' | 'refer-friends' | 'payment';

type IncreaseRoadmapLimitProps = {
  onClose: () => void;
};
export function IncreaseRoadmapLimit(props: IncreaseRoadmapLimitProps) {
  const { onClose } = props;
  const [activeTab, setActiveTab] = useState<IncreaseTab | null>(null);

  const increaseLimitTabs: {
    key: IncreaseTab;
    title: string;
  }[] = [
    { key: 'api-key', title: 'Add your own API Key' },
    { key: 'refer-friends', title: 'Refer your Friends' },
    { key: 'payment', title: 'Pay to Bypass the limit' },
  ];

  const isPaymentTabActive = activeTab === 'payment';

  return (
    <Modal
      onClose={onClose}
      overlayClassName={cn(isPaymentTabActive && 'items-start')}
      wrapperClassName={cn('max-w-lg', isPaymentTabActive && 'md:h-fit')}
      bodyClassName="overflow-hidden"
    >
      <div className="p-4">
        <h2 className="text-xl font-medium text-gray-800">Pick an Option</h2>
        <p className="mt-2 text-sm text-gray-700">
          Increase the Number of Roadmaps you can generate by selecting one of
          the options below
        </p>
      </div>

      <ul className="w-full">
        {increaseLimitTabs.map((tab) => {
          const isActive = tab.key === activeTab;

          return (
            <li key={tab.key}>
              <button
                onClick={() => {
                  setActiveTab(isActive ? null : tab.key);
                }}
                className={cn(
                  'flex w-full items-center justify-between gap-2 border-t px-4 py-2',
                  isActive ? 'bg-gray-100' : 'hover:bg-gray-100',
                )}
              >
                {tab.title}
                <ChevronUp
                  size={16}
                  className={cn(
                    'rotate-180 transform transition-transform duration-200 ease-in-out',
                    isActive && 'rotate-0',
                  )}
                />
              </button>

              {isActive && (
                <div className="border-t p-4">
                  {tab.key === 'api-key' && (
                    <OpenAISettings onClose={onClose} />
                  )}
                  {tab.key === 'refer-friends' && <ReferYourFriend />}
                  {tab.key === 'payment' && <PayToBypass />}
                </div>
              )}
            </li>
          );
        })}
      </ul>
    </Modal>
  );
}
