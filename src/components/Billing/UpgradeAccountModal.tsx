import {
  Loader2,
  Zap,
  Infinity,
  MessageSquare,
  Sparkles,
  Heart,
  MapIcon,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import { getUser } from '../../lib/jwt';
import { useMutation, useQuery } from '@tanstack/react-query';
import { Modal } from '../Modal';
import {
  billingDetailsOptions,
  USER_SUBSCRIPTION_PLAN_PRICES,
  type AllowedSubscriptionInterval,
} from '../../queries/billing';
import { cn } from '../../lib/classname';
import { queryClient } from '../../stores/query-client';
import { httpPost } from '../../lib/query-http';
import { useToast } from '../../hooks/use-toast';
import { UpdatePlanConfirmation } from './UpdatePlanConfirmation';

// Define the perk type
type Perk = {
  icon: LucideIcon;
  title: string;
  description: string;
};

// Define the perks array
const PREMIUM_PERKS: Perk[] = [
  {
    icon: Zap,
    title: 'AI Course Generations',
    description: 'No limits on the number of AI courses',
  },
  {
    icon: MapIcon,
    title: 'AI Roadmaps',
    description: 'No limits on the number of AI roadmaps',
  },
  {
    icon: Infinity,
    title: 'Extended Daily Limits',
    description: 'Generate more content in a day',
  },
  {
    icon: MessageSquare,
    title: 'Course Follow-ups',
    description: 'Ask as many questions as you need',
  },
  {
    icon: Sparkles,
    title: 'Early Access to Features',
    description: 'Be the first to try new tools and features',
  },
  {
    icon: Heart,
    title: 'Support Development',
    description: 'Help us continue building roadmap.sh',
  },
];

type CreateSubscriptionCheckoutSessionBody = {
  priceId: string;
  success?: string;
  cancel?: string;
};

type CreateSubscriptionCheckoutSessionResponse = {
  checkoutUrl: string;
};

type UpgradeAccountModalProps = {
  onClose: () => void;

  success?: string;
  cancel?: string;
};

export function UpgradeAccountModal(props: UpgradeAccountModalProps) {
  const { onClose, success, cancel } = props;

  const [selectedPlan, setSelectedPlan] =
    useState<AllowedSubscriptionInterval>('month');
  const [isUpdatingPlan, setIsUpdatingPlan] = useState(false);

  const user = getUser();

  const {
    data: userBillingDetails,
    isLoading,
    error: billingError,
  } = useQuery(billingDetailsOptions(), queryClient);

  const toast = useToast();

  const {
    mutate: createCheckoutSession,
    isPending: isCreatingCheckoutSession,
  } = useMutation(
    {
      mutationFn: (body: CreateSubscriptionCheckoutSessionBody) => {
        return httpPost<CreateSubscriptionCheckoutSessionResponse>(
          '/v1-create-subscription-checkout-session',
          body,
        );
      },
      onSuccess: (data) => {
        window.location.href = data.checkoutUrl;
      },
      onError: (error) => {
        console.error(error);
        toast.error(error?.message || 'Failed to create checkout session');
      },
    },
    queryClient,
  );

  const selectedPlanDetails = USER_SUBSCRIPTION_PLAN_PRICES.find(
    (plan) => plan.interval === selectedPlan,
  );
  const currentPlanPriceId = userBillingDetails?.priceId;
  const currentPlan = USER_SUBSCRIPTION_PLAN_PRICES.find(
    (plan) => plan.priceId === currentPlanPriceId,
  );

  useEffect(() => {
    if (!currentPlan) {
      return;
    }

    setSelectedPlan(currentPlan.interval);
  }, [currentPlan]);

  if (!user) {
    return null;
  }

  const loader = isLoading ? (
    <div className="absolute inset-0 flex h-[540px] w-full items-center justify-center bg-white">
      <Loader2 className="h-6 w-6 animate-spin stroke-[3px] text-green-600" />
    </div>
  ) : null;

  const error = billingError;
  const errorContent = error ? (
    <div className="flex h-full w-full flex-col">
      <p className="text-center text-red-400">
        {error?.message ||
          'An error occurred while loading the billing details.'}
      </p>
    </div>
  ) : null;

  const calculateYearlyPrice = (monthlyPrice: number) => {
    return (monthlyPrice * 12).toFixed(2);
  };

  if (isUpdatingPlan && selectedPlanDetails) {
    return (
      <UpdatePlanConfirmation
        planDetails={selectedPlanDetails}
        onClose={() => setIsUpdatingPlan(false)}
        onCancel={() => setIsUpdatingPlan(false)}
      />
    );
  }

  return (
    <Modal
      onClose={onClose}
      bodyClassName="p-4 sm:p-6 bg-white"
      wrapperClassName="h-auto rounded-xl max-w-3xl w-full min-h-[540px] mx-2 sm:mx-4"
      overlayClassName="items-start md:items-center"
    >
      <div onClick={(e) => e.stopPropagation()}>
        {errorContent}

        {loader}
        {!isLoading && !error && (
          <div className="flex flex-col">
            <div className="mb-6 text-left sm:mb-8">
              <h2 className="text-xl font-bold text-black sm:text-2xl">
                Unlock Premium Features
              </h2>
              <p className="mt-1 text-sm text-gray-600 sm:mt-2 sm:text-base">
                Supercharge your learning experience with premium benefits
              </p>
            </div>

            <div className="mb-6 grid grid-cols-1 gap-4 sm:mb-8 sm:gap-6 md:grid-cols-2">
              {USER_SUBSCRIPTION_PLAN_PRICES.map((plan) => {
                const isCurrentPlanSelected =
                  currentPlan?.priceId === plan.priceId;
                const isYearly = plan.interval === 'year';

                return (
                  <div
                    key={plan.interval}
                    className={cn(
                      'flex flex-col space-y-3 rounded-lg bg-white p-4 sm:space-y-4 sm:p-6',
                      isYearly
                        ? 'border-2 border-yellow-400'
                        : 'border border-gray-200',
                    )}
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="text-sm font-semibold text-black sm:text-base">
                          {isYearly ? 'Yearly Payment' : 'Monthly Payment'}
                        </h4>
                        {isYearly && (
                          <span className="text-xs font-medium text-green-500 sm:text-sm">
                            (2 months free)
                          </span>
                        )}
                      </div>
                      {isYearly && (
                        <span className="rounded-full bg-yellow-400 px-1.5 py-0.5 text-xs font-semibold text-black sm:px-2 sm:py-1">
                          Most Popular
                        </span>
                      )}
                    </div>
                    <div className="flex items-baseline">
                      {isYearly && (
                        <p className="mr-2 text-xs text-gray-400 line-through sm:text-sm">
                          $
                          {calculateYearlyPrice(
                            USER_SUBSCRIPTION_PLAN_PRICES[0].amount,
                          )}
                        </p>
                      )}
                      <p
                        className={cn(
                          'text-2xl font-bold text-black sm:text-3xl',
                          {
                            'mt-0 md:mt-6': !isYearly,
                          },
                        )}
                      >
                        ${plan.amount}{' '}
                        <span className="text-xs font-normal text-gray-500 sm:text-sm">
                          / {isYearly ? 'year' : 'month'}
                        </span>
                      </p>
                    </div>

                    <div className="grow"></div>

                    <div>
                      <button
                        className={cn(
                          'flex min-h-9 w-full items-center justify-center rounded-md py-2 text-sm font-medium transition-colors focus:outline-hidden focus-visible:ring-2 focus-visible:ring-yellow-400 disabled:cursor-not-allowed disabled:opacity-60 sm:min-h-11 sm:py-2.5 sm:text-base',
                          'bg-yellow-400 text-black hover:bg-yellow-500',
                        )}
                        disabled={
                          isCurrentPlanSelected || isCreatingCheckoutSession
                        }
                        onClick={() => {
                          setSelectedPlan(plan.interval);
                          if (!currentPlanPriceId) {
                            const currentUrlPath = window.location.pathname;
                            const encodedCurrentUrlPath = encodeURIComponent(
                              currentUrlPath,
                            );
                            const successPage = `/thank-you?next=${encodedCurrentUrlPath}&s=1`;

                            createCheckoutSession({
                              priceId: plan.priceId,
                              success: success || successPage,
                              cancel: cancel || `${currentUrlPath}?s=0`,
                            });
                            return;
                          }
                          setIsUpdatingPlan(true);
                        }}
                        data-1p-ignore=""
                        data-form-type="other"
                        data-lpignore="true"
                      >
                        {isCreatingCheckoutSession &&
                        selectedPlan === plan.interval ? (
                          <Loader2 className="h-3.5 w-3.5 animate-spin sm:h-4 sm:w-4" />
                        ) : isCurrentPlanSelected ? (
                          'Current Plan'
                        ) : (
                          'Select Plan'
                        )}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Benefits Section */}
            <div className="grid grid-cols-1 gap-3 sm:gap-4 md:grid-cols-2">
              {PREMIUM_PERKS.map((perk, index) => {
                const Icon = perk.icon;
                return (
                  <div
                    key={index}
                    className="flex items-start space-x-2 sm:space-x-3"
                  >
                    <Icon className="mt-0.5 h-4 w-4 text-yellow-500 sm:h-5 sm:w-5" />
                    <div>
                      <h4 className="text-sm font-medium text-black sm:text-base">
                        {perk.title}
                      </h4>
                      <p className="text-xs text-gray-600 sm:text-sm">
                        {perk.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
}
