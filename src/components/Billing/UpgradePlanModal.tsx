import { useEffect, useState } from 'react';
import {
  billingDetailsOptions,
  USER_SUBSCRIPTION_PLAN_PRICES,
} from '../../queries/billing';
import { Modal } from '../Modal';
import { useMutation, useQuery } from '@tanstack/react-query';
import { queryClient } from '../../stores/query-client';
import { cn } from '../../lib/classname';
import { httpPost } from '../../lib/query-http';
import { useToast } from '../../hooks/use-toast';
import { Loader2Icon } from 'lucide-react';
import { UpdatePlanConfirmation } from '../Billing/UpdatePlanConfirmation';
import type {
  CreateCustomerPortalBody,
  CreateCustomerPortalResponse,
} from '../Billing/BillingPage';

type CreateCheckoutSessionBody = {
  priceId: string;
  success?: string;
  cancel?: string;
};

type CreateCheckoutSessionResponse = {
  checkoutUrl: string;
};

export type IntervalType = 'month' | 'year';

type UpgradePlanModalProps = {
  onClose: () => void;

  success?: string;
  cancel?: string;
};

export function UpgradePlanModal(props: UpgradePlanModalProps) {
  const { onClose, success, cancel } = props;

  const { data: billingDetails } = useQuery(
    billingDetailsOptions(),
    queryClient,
  );

  const toast = useToast();
  const [interval, setInterval] = useState<IntervalType>('month');
  const [priceId, setPriceId] = useState<string>('');
  const [isUpdatingPlan, setIsUpdatingPlan] = useState(false);

  const { mutate: createCheckoutSession, isPending } = useMutation(
    {
      mutationFn: (body: CreateCheckoutSessionBody) => {
        return httpPost<CreateCheckoutSessionResponse>(
          '/v1-create-checkout-session',
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

  const { mutate: createCustomerPortal, isPending: isCreatingCustomerPortal } =
    useMutation(
      {
        mutationFn: (body: CreateCustomerPortalBody) => {
          return httpPost<CreateCustomerPortalResponse>(
            '/v1-create-customer-portal',
            body,
          );
        },
        onSuccess: (data) => {
          window.location.href = data.url;
        },
        onError: (error) => {
          console.error(error);
          toast.error(error?.message || 'Failed to Create Customer Portal');
        },
      },
      queryClient,
    );

  useEffect(() => {
    if (!billingDetails) {
      return;
    }

    setInterval((billingDetails.interval as IntervalType) || 'month');
  }, [billingDetails]);

  // const isCurrentPlanSelected =
  //   billingDetails?.planId === planId &&
  //   (interval === billingDetails.interval || billingDetails?.planId === 'free');

  // const selectedPrice = USER_SUBSCRIPTION_PLAN_PRICES.find(
  //   (plan) => plan.planId === planId,
  // );

  const selectedPrice = USER_SUBSCRIPTION_PLAN_PRICES.find(
    (plan) => plan.priceId === priceId,
  );

  if (isUpdatingPlan && selectedPrice) {
    return (
      <UpdatePlanConfirmation
        planDetails={selectedPrice}
        interval={interval}
        onClose={() => {
          setIsUpdatingPlan(false);
        }}
        onCancel={() => {
          setIsUpdatingPlan(false);
        }}
      />
    );
  }

  const showCancelSubscription = !!billingDetails?.priceId;

  return (
    <>
      <Modal
        onClose={onClose}
        wrapperClassName="max-w-2xl"
        bodyClassName="overflow-hidden"
      >
        <div className="grid grid-cols-2">
          <div className="p-4">
            <h2 className="font-medium">Upgrade Plan</h2>
            <p className="mt-1 text-balance text-sm text-gray-500">
              Upgrade your plan to unlock more features, unlimited limits, and
              more.
            </p>

            <div className="mt-6 flex flex-col gap-1">
              {USER_SUBSCRIPTION_PLAN_PRICES.map((plan) => {
                const isselectedPrice = plan.planId === planId;
                const price = plan.prices[interval];
                const isCurrentPlan = billingDetails?.planId === plan.planId;

                return (
                  <button
                    key={plan.planId}
                    className={cn(
                      'flex items-center justify-between gap-2 rounded-lg border p-2',
                      isselectedPrice && 'border-purple-500',
                    )}
                    onClick={() => {
                      setPlanId(plan.planId);
                    }}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={cn(
                          'size-2 rounded-full bg-gray-300',
                          isselectedPrice && 'bg-purple-500',
                        )}
                      ></div>
                      <h4>{plan.name}</h4>
                      {isCurrentPlan && (
                        <span className="rounded-full bg-purple-500 px-1.5 py-0.5 text-xs leading-none text-white">
                          Current
                        </span>
                      )}
                    </div>
                    <span className="text-sm">
                      <span className="font-medium">
                        ${price?.amount / 100}
                      </span>
                      &nbsp;
                      <span className="text-gray-500">/ {interval}</span>
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="mt-16">
              {!showCancelSubscription && (
                <button
                  className={cn(
                    'mb-2 rounded-lg border border-dashed p-2 text-left',
                    interval === 'year'
                      ? 'border-purple-500 bg-purple-100/40'
                      : 'border-gray-300',
                  )}
                  onClick={() => {
                    setInterval(interval === 'month' ? 'year' : 'month');
                  }}
                >
                  <h3 className="font-medium">Enjoy 20% Off</h3>
                  <p className="mt-1 text-balance text-sm text-gray-500">
                    Get 20% off when you upgrade to a yearly plan.
                  </p>
                </button>
              )}

              {showCancelSubscription && (
                <button
                  className="mb-2 rounded-lg border border-dashed p-2 text-left"
                  onClick={() => {
                    createCustomerPortal({});
                  }}
                >
                  <h3 className="font-medium">Cancel Subscription</h3>
                  <p className="mt-1 text-balance text-sm text-gray-500">
                    To downgrade to the free plan, you need to cancel your
                    current subscription.
                  </p>
                </button>
              )}

              <button
                className="flex min-h-10 w-full items-center justify-center rounded-lg bg-purple-500 p-2 text-white disabled:cursor-not-allowed disabled:bg-zinc-600 disabled:opacity-70"
                disabled={isCurrentPlanSelected || isPending}
                onClick={() => {
                  const priceId = selectedPrice?.prices[interval].id;
                  if (!priceId) {
                    toast.error('Price id is missing');
                    return;
                  }

                  // if downgrading from paid plan to free plan
                  // then redirect to customer portal to cancel the subscription
                  if (planId === 'free') {
                    createCustomerPortal({});
                    return;
                  }

                  // if user is already on a paid plan
                  // then show a confirmation modal to update the plan
                  // instead of creating a new checkout session
                  if (billingDetails?.planId !== 'free') {
                    setIsUpdatingPlan(true);
                    return;
                  }

                  createCheckoutSession({
                    priceId,
                    success,
                    cancel,
                  });
                }}
              >
                {(isPending || isCreatingCustomerPortal) && (
                  <Loader2Icon className="size-4 animate-spin stroke-[2.5]" />
                )}

                {!isPending &&
                  !isCreatingCustomerPortal &&
                  !showCancelSubscription && (
                    <>
                      {isCurrentPlanSelected
                        ? 'Current Plan'
                        : `Select ${selectedPrice?.name}`}
                    </>
                  )}

                {!isPending &&
                  !isCreatingCustomerPortal &&
                  showCancelSubscription && <>Cancel Subscription</>}
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
}
