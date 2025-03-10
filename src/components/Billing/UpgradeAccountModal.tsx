import {
  Loader2,
  Zap,
  Infinity,
  MessageSquare,
  Sparkles,
  Heart,
} from 'lucide-react';
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
      bodyClassName="p-6 bg-white"
      wrapperClassName="h-auto rounded-xl max-w-3xl w-full min-h-[540px]"
      overlayClassName="items-start md:items-center"
    >
      <div onClick={(e) => e.stopPropagation()}>
        {errorContent}

        {loader}
        {!isLoading && !error && (
          <div className="flex flex-col">
            <div className="mb-8 text-left">
              <h2 className="text-2xl font-bold text-black">
                Unlock Premium Features
              </h2>
              <p className="mt-2 text-gray-600">
                Supercharge your learning experience with premium benefits
              </p>
            </div>

            <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2">
              {USER_SUBSCRIPTION_PLAN_PRICES.map((plan) => {
                const isCurrentPlanSelected =
                  currentPlan?.priceId === plan.priceId;
                const isYearly = plan.interval === 'year';

                return (
                  <div
                    key={plan.interval}
                    className={cn(
                      'flex flex-col space-y-4 rounded-lg bg-white p-6',
                      isYearly
                        ? 'border-2 border-yellow-400 shadow-lg shadow-yellow-400/20'
                        : 'border border-gray-200',
                    )}
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="font-semibold text-black">
                          {isYearly ? 'Yearly Payment' : 'Monthly Payment'}
                        </h4>
                        {isYearly && (
                          <span className="text-sm font-medium text-green-600">
                            (2 months free)
                          </span>
                        )}
                      </div>
                      {isYearly && (
                        <span className="rounded-full bg-yellow-400 px-2 py-1 text-xs font-semibold text-black">
                          Most Popular
                        </span>
                      )}
                    </div>
                    <div className="flex items-baseline">
                      {isYearly && (
                        <p className="mr-2 text-sm text-gray-400 line-through">
                          $
                          {calculateYearlyPrice(
                            USER_SUBSCRIPTION_PLAN_PRICES[0].amount,
                          )}
                        </p>
                      )}
                      <p className="text-3xl font-bold text-black">
                        ${plan.amount}{' '}
                        <span className="text-sm font-normal text-gray-500">
                          / {isYearly ? 'year' : 'month'}
                        </span>
                      </p>
                    </div>

                    <div className="flex-grow"></div>

                    <div>
                      <button
                        className={cn(
                          'flex min-h-11 w-full items-center justify-center rounded-md py-2.5 font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-yellow-400 disabled:cursor-not-allowed disabled:opacity-60',
                          'bg-yellow-400 text-black hover:bg-yellow-500',
                        )}
                        disabled={
                          isCurrentPlanSelected || isCreatingCheckoutSession
                        }
                        onClick={() => {
                          setSelectedPlan(plan.interval);
                          if (!currentPlanPriceId) {
                            const currentUrlPath = window.location.pathname;
                            createCheckoutSession({
                              priceId: plan.priceId,
                              success: success || `${currentUrlPath}?s=1`,
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
                          <Loader2 className="h-4 w-4 animate-spin" />
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
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="flex items-start space-x-3">
                <Zap className="mt-0.5 h-5 w-5 text-yellow-400" />
                <div>
                  <h4 className="font-medium text-black">
                    Unlimited AI Course Generations
                  </h4>
                  <p className="text-sm text-gray-600">
                    Generate as many custom courses as you need
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Infinity className="mt-0.5 h-5 w-5 text-yellow-400" />
                <div>
                  <h4 className="font-medium text-black">
                    No Daily Limits on course features
                  </h4>
                  <p className="text-sm text-gray-600">
                    Use all features without restrictions
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <MessageSquare className="mt-0.5 h-5 w-5 text-yellow-400" />
                <div>
                  <h4 className="font-medium text-black">
                    Unlimited Course Follow-ups
                  </h4>
                  <p className="text-sm text-gray-600">
                    Ask as many questions as you need
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Sparkles className="mt-0.5 h-5 w-5 text-yellow-400" />
                <div>
                  <h4 className="font-medium text-black">
                    Early Access to Features
                  </h4>
                  <p className="text-sm text-gray-600">
                    Be the first to try new tools and features
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Heart className="mt-0.5 h-5 w-5 text-yellow-400" />
                <div>
                  <h4 className="font-medium text-black">
                    Support Development
                  </h4>
                  <p className="text-sm text-gray-600">
                    Help us continue building roadmap.sh
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
}
