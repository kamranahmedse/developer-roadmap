import { Check, Loader2 } from 'lucide-react';
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
    <div className="absolute inset-0 flex h-[540px] w-full items-center justify-center">
      <Loader2 className="h-6 w-6 animate-spin stroke-[3px] text-zinc-500" />
    </div>
  ) : null;

  const error = billingError;
  const errorContent = error ? (
    <div className="flex h-full w-full flex-col">
      <p className="text-center text-red-500">
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
      wrapperClassName="rounded-xl max-w-3xl w-full min-h-[540px]"
      bodyClassName="p-6"
    >
      <div onClick={(e) => e.stopPropagation()}>
        {errorContent}

        {loader}
        {!isLoading && !error && (
          <div className="flex flex-col">
            <div className="mb-8 text-left">
              <h2 className="text-xl font-bold">
                Unlock premium features and by-pass the limits.
              </h2>
            </div>
            <div className="grid grid-cols-2 gap-8">
              {USER_SUBSCRIPTION_PLAN_PRICES.map((plan) => {
                const isCurrentPlanSelected =
                  currentPlan?.priceId === plan.priceId;
                const isYearly = plan.interval === 'year';

                return (
                  <div
                    key={plan.interval}
                    className={cn(
                      'flex flex-col space-y-4 rounded-lg p-6',
                      isYearly
                        ? 'border-2 border-yellow-400'
                        : 'border border-gray-200',
                    )}
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="font-semibold">
                          {isYearly ? 'Yearly Payment' : 'Monthly Payment'}
                        </h4>
                        {isYearly && (
                          <span className="text-sm text-green-500">
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
                        <p className="mr-2 text-sm text-zinc-400 line-through">
                          $
                          {calculateYearlyPrice(
                            USER_SUBSCRIPTION_PLAN_PRICES[0].amount,
                          )}
                        </p>
                      )}
                      <p className="text-3xl font-bold text-yellow-400">
                        ${plan.amount}{' '}
                        <span className="text-sm font-normal text-zinc-500">
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
          </div>
        )}
      </div>
    </Modal>
  );
}
