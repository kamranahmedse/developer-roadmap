import { useMutation, useQuery } from '@tanstack/react-query';
import type { LucideIcon } from 'lucide-react';
import {
  Archive,
  Crown,
  Loader2,
  Map,
  MessageCircleIcon,
  X,
  Zap,
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { useToast } from '../../hooks/use-toast';
import { getUser } from '../../lib/jwt';
import { httpPost } from '../../lib/query-http';
import {
  billingDetailsOptions,
  USER_SUBSCRIPTION_PLAN_PRICES,
  type AllowedSubscriptionInterval,
} from '../../queries/billing';
import { queryClient } from '../../stores/query-client';
import { Modal } from '../Modal';
import { UpdatePlanConfirmation } from './UpdatePlanConfirmation';

type Perk = {
  icon: LucideIcon;
  title: string;
  description: string;
  highlight?: boolean;
};

const PREMIUM_PERKS: Perk[] = [
  {
    icon: Zap,
    title: 'Unlimited Courses and Guides',
    description: 'No limits on number of courses, guides, and quizzes',
    highlight: true,
  },
  {
    icon: MessageCircleIcon,
    title: 'Extended Chat Limits',
    description: 'Chat with AI Tutor and Roadmaps without limits',
  },
  {
    icon: Archive,
    title: 'Chat History',
    description: 'Access your AI Tutor and roadmap chats later',
  },
  {
    icon: Map,
    title: 'Custom Roadmaps',
    description: 'Create upto 100 custom roadmaps',
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
    useState<AllowedSubscriptionInterval>('year');
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

  const isCanceled = ['canceled', 'incomplete_expired'].includes(
    userBillingDetails?.status || '',
  );

  const selectedPlanDetails = USER_SUBSCRIPTION_PLAN_PRICES.find(
    (plan) => plan.interval === selectedPlan,
  );
  const currentPlanPriceId = isCanceled ? null : userBillingDetails?.priceId;
  const currentPlan = USER_SUBSCRIPTION_PLAN_PRICES.find(
    (plan) => plan.priceId === currentPlanPriceId,
  );

  const monthlyPlan = USER_SUBSCRIPTION_PLAN_PRICES.find(
    (p) => p.interval === 'month',
  );
  const yearlyPlan = USER_SUBSCRIPTION_PLAN_PRICES.find(
    (p) => p.interval === 'year',
  );

  useEffect(() => {
    if (!currentPlan) {
      return;
    }
    setSelectedPlan(currentPlan.interval);
  }, [currentPlan]);

  useEffect(() => {
    window?.fireEvent({
      action: 'tutor_pricing',
      category: 'ai_tutor',
      label: 'Clicked Upgrade to Pro',
    });
  }, []);

  if (!user) {
    return null;
  }

  if (isLoading) {
    return (
      <Modal
        onClose={onClose}
        bodyClassName="p-0 bg-white"
        wrapperClassName="h-auto rounded-lg max-w-md w-full mx-4"
        overlayClassName="items-center"
        hasCloseButton={false}
      >
        <div className="flex h-48 items-center justify-center">
          <Loader2 className="h-6 w-6 animate-spin text-yellow-600" />
        </div>
      </Modal>
    );
  }

  if (billingError) {
    return (
      <Modal
        onClose={onClose}
        bodyClassName="p-6 bg-white"
        wrapperClassName="h-auto rounded-lg max-w-md w-full mx-4"
        overlayClassName="items-center"
        hasCloseButton={true}
      >
        <div className="text-center">
          <div className="mx-auto mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-red-100">
            <X className="h-5 w-5 text-red-600" />
          </div>
          <h3 className="mb-2 text-lg font-medium text-gray-900">Error</h3>
          <p className="text-sm text-gray-600">
            {billingError?.message ||
              'An error occurred while loading billing details.'}
          </p>
        </div>
      </Modal>
    );
  }

  if (isUpdatingPlan && selectedPlanDetails) {
    return (
      <UpdatePlanConfirmation
        planDetails={selectedPlanDetails}
        onClose={() => setIsUpdatingPlan(false)}
        onCancel={() => setIsUpdatingPlan(false)}
      />
    );
  }

  const handlePlanSelect = (plan: typeof selectedPlanDetails) => {
    if (!plan) return;

    setSelectedPlan(plan.interval);

    if (!currentPlanPriceId) {
      const currentUrlPath = window.location.pathname;
      const encodedCurrentUrlPath = encodeURIComponent(currentUrlPath);
      const successPage = `/thank-you?next=${encodedCurrentUrlPath}&s=1`;

      window?.fireEvent({
        action: 'tutor_checkout',
        category: 'ai_tutor',
        label: 'Checkout Started',
      });

      createCheckoutSession(
        {
          priceId: plan.priceId,
          success: success || successPage,
          cancel: cancel || `${currentUrlPath}?s=0`,
        },
        {
          onSuccess: () => {
            window?.fireEvent({
              action: `tutor_checkout_${plan.interval === 'month' ? 'mo' : 'an'}`,
              category: 'ai_tutor',
              label: `${plan.interval} Plan Checkout Started`,
            });
          },
        },
      );
      return;
    }
    setIsUpdatingPlan(true);
  };

  return (
    <Modal
      onClose={onClose}
      bodyClassName="p-0 bg-white"
      wrapperClassName="h-auto rounded-lg max-w-md w-full mx-4"
      overlayClassName="items-center"
      hasCloseButton={false}
    >
      <div className="relative">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-10 flex h-6 w-6 items-center justify-center rounded-full text-gray-400 hover:text-gray-600"
        >
          <X className="h-4 w-4" />
        </button>

        {/* Header */}
        <div className="border-b border-gray-100 px-6 py-6 text-center">
          <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full border-2 border-yellow-200 bg-yellow-50">
            <Crown className="h-6 w-6 text-yellow-600" />
          </div>
          <h1 className="text-xl font-semibold text-gray-900">
            Upgrade to Premium
          </h1>
          <p className="mt-1 text-sm text-gray-600">
            Unlock all features and supercharge your learning
          </p>
        </div>

        {/* Features List */}
        <div className="px-6 py-4">
          <div className="space-y-3">
            {PREMIUM_PERKS.map((perk, index) => {
              const Icon = perk.icon;
              return (
                <div key={index} className="flex items-start space-x-3">
                  <Icon className="relative top-[0.5px] mt-1 size-4 text-gray-600" />
                  <div className="min-w-0 flex-1">
                    <p className="mb-0.5 text-sm font-medium text-gray-900">
                      {perk.title}
                    </p>
                    <p className="text-xs text-gray-600">{perk.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Buttons */}
        <div className="border-t border-gray-100 px-6 py-4">
          <div className="space-y-2">
            {/* Yearly Button */}
            {yearlyPlan && (
              <button
                onClick={() => handlePlanSelect(yearlyPlan)}
                disabled={
                  isCreatingCheckoutSession || currentPlan?.interval === 'year'
                }
                className={`flex h-11 w-full items-center justify-center rounded-lg px-4 text-sm font-medium transition-colors disabled:opacity-50 ${
                  currentPlan?.interval === 'year'
                    ? 'cursor-not-allowed bg-yellow-300 text-gray-700'
                    : 'bg-yellow-400 text-black hover:bg-yellow-500'
                }`}
              >
                {isCreatingCheckoutSession && selectedPlan === 'year' ? (
                  <Loader2 className="mx-auto h-4 w-4 animate-spin" />
                ) : (
                  <div className="flex w-full items-center justify-between text-left">
                    <span>Yearly Plan - ${yearlyPlan.amount}/year</span>
                    {currentPlan?.interval === 'year' ? (
                      <span className="rounded bg-green-600 px-2 py-1 text-xs text-white">
                        Current Plan
                      </span>
                    ) : (
                      monthlyPlan && (
                        <span className="rounded bg-yellow-600 px-2 py-1 text-xs text-white">
                          {Math.round(
                            (monthlyPlan.amount * 12 - yearlyPlan.amount) /
                              monthlyPlan.amount,
                          )}{' '}
                          months free
                        </span>
                      )
                    )}
                  </div>
                )}
              </button>
            )}

            {/* Monthly Button */}
            {monthlyPlan && (
              <button
                onClick={() => handlePlanSelect(monthlyPlan)}
                disabled={
                  isCreatingCheckoutSession || currentPlan?.interval === 'month'
                }
                className={`flex h-11 w-full items-center justify-center rounded-lg border px-4 text-sm font-medium transition-colors disabled:opacity-50 ${
                  currentPlan?.interval === 'month'
                    ? 'cursor-not-allowed border-yellow-300 bg-yellow-50 text-gray-700'
                    : 'border-yellow-400 bg-yellow-50 text-black hover:bg-yellow-100'
                }`}
              >
                {isCreatingCheckoutSession && selectedPlan === 'month' ? (
                  <Loader2 className="mx-auto h-4 w-4 animate-spin" />
                ) : (
                  <div className="flex w-full items-center justify-between text-left">
                    <span>Monthly Plan - ${monthlyPlan.amount}/month</span>
                    {currentPlan?.interval === 'month' && (
                      <span className="rounded bg-black px-2 py-1 text-xs text-white">
                        Current Plan
                      </span>
                    )}
                  </div>
                )}
              </button>
            )}
          </div>

          {/* Trust indicators */}
          <div className="mt-4 text-center">
            <p className="text-xs text-gray-500">
              By upgrading you agree to our{' '}
              <a href="/terms" className="text-yellow-600 hover:underline">
                terms and conditions
              </a>
            </p>
          </div>
        </div>
      </div>
    </Modal>
  );
}
