import {
  CreditCard,
  Ellipsis,
  HeartHandshake,
  MessageCircleIcon,
  SparklesIcon,
  Zap,
  CheckCircle,
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
  {
    icon: Ellipsis,
    text: 'more perks coming soon!',
  },
];

export function EmptyBillingScreen(props: EmptyBillingScreenProps) {
  const { onUpgrade } = props;

  return (
    <div className="mt-6 max-w-3xl">
      <h2 className="mb-6 text-2xl font-bold text-black">Subscription Details</h2>
      
      <div className="overflow-hidden rounded-lg bg-white shadow-sm">
        <div className="p-6">
          <div className="flex flex-col items-center text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
              <CreditCard className="h-8 w-8 text-gray-500" />
            </div>
            
            <h3 className="mt-4 text-xl font-semibold text-black">
              No Active Subscription
            </h3>

            <p className="mt-2 max-w-md text-balance text-gray-600">
              Unlock premium benefits by upgrading to a subscription
            </p>

            <div className="mt-6 w-full max-w-md rounded-lg border border-gray-200 bg-gray-50 p-4">
              <h4 className="mb-3 font-medium text-gray-800">Premium Benefits</h4>
              <div className="flex flex-col gap-3">
                {perks.map((perk) => (
                  <div className="flex items-center gap-2 text-gray-700" key={perk.text}>
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span>{perk.text}</span>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={onUpgrade}
              className="mt-6 inline-flex items-center justify-center rounded-md bg-black px-6 py-2.5 text-sm font-medium text-white shadow-sm transition-colors hover:bg-black/80 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2"
            >
              Upgrade Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
