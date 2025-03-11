import {
  CreditCard,
  HeartHandshake,
  MessageCircleIcon,
  SparklesIcon,
  Zap,
} from 'lucide-react';

type EmptyBillingScreenProps = {
  onUpgrade: () => void;
};

const perks = [
  {
    icon: Zap,
    text: 'Unlimited AI course generations',
  },
  {
    icon: MessageCircleIcon,
    text: 'Unlimited AI Chat feature usage',
  },
  {
    icon: SparklesIcon,
    text: 'Early access to new features',
  },
  {
    icon: HeartHandshake,
    text: 'Support the development of platform',
  },
];

export function EmptyBillingScreen(props: EmptyBillingScreenProps) {
  const { onUpgrade } = props;

  return (
    <div className="mt-12 flex h-full w-full flex-col items-center">
      <CreditCard className="mb-3 h-12 w-12 text-gray-300" />
      <h3 className="mb-3 text-xl font-semibold text-black">
        No Active Subscription
      </h3>

      <p className="text-balance text-gray-700">
        Unlock pro benefits by upgrading to a subscription
      </p>

      <div className="my-8 flex flex-col gap-2">
        {perks.map((perk) => (
          <p className="textsm flex items-center text-gray-600" key={perk.text}>
            <perk.icon className="mr-2 h-4 w-4 text-gray-500" />
            {perk.text}
          </p>
        ))}
      </div>

      <button
        onClick={onUpgrade}
        className="inline-flex items-center justify-center rounded-md bg-black px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2"
      >
        Upgrade Account
      </button>
    </div>
  );
}
