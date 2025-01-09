import { useEffect, useState } from 'react';
import { pageProgressMessage } from '../../stores/page';
import { useToast } from '../../hooks/use-toast';
import { useMutation, useQuery } from '@tanstack/react-query';
import {
  billingDetailsOptions,
  USER_SUBSCRIPTION_PLANS,
} from '../../queries/billing';
import { queryClient } from '../../stores/query-client';
import { httpPost } from '../../lib/query-http';
import { UpgradePlanModal } from '../CourseLanding/UpgradePlanModal';
import { getUrlParams } from '../../lib/browser';
import { VerifyUpgrade } from './VerifyUpgrade';

export type CreateCustomerPortalBody = {};

export type CreateCustomerPortalResponse = {
  url: string;
};

export function BillingPage() {
  const toast = useToast();

  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [showVerifyUpgradeModal, setShowVerifyUpgradeModal] = useState(false);

  const { data: billingDetails, isPending: isLoadingBillingDetails } = useQuery(
    billingDetailsOptions(),
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
    if (isLoadingBillingDetails) {
      return;
    }

    pageProgressMessage.set('');
    const shouldVerifyUpgrade = getUrlParams()?.s === '1';
    if (shouldVerifyUpgrade) {
      setShowVerifyUpgradeModal(true);
    }
  }, [isLoadingBillingDetails]);

  if (isLoadingBillingDetails || !billingDetails) {
    return null;
  }

  const selectedPlanDetails = USER_SUBSCRIPTION_PLANS.find(
    (plan) => plan.planId === (billingDetails?.planId || 'free'),
  );

  const shouldHideDeleteButton =
    billingDetails?.status === 'canceled' || billingDetails?.cancelAtPeriodEnd;
  const priceDetails =
    (billingDetails?.interval || 'month') === 'month'
      ? selectedPlanDetails?.prices.month
      : selectedPlanDetails?.prices.year;

  const formattedNextBillDate = new Date(
    billingDetails?.currentPeriodEnd || '',
  ).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <>
      {showUpgradeModal && (
        <UpgradePlanModal
          onClose={() => {
            setShowUpgradeModal(false);
          }}
          success="/account/billing?s=1"
          cancel="/account/billing"
        />
      )}

      {showVerifyUpgradeModal && <VerifyUpgrade />}

      {billingDetails?.status === 'none' && !isLoadingBillingDetails && (
        <div className="flex h-full w-full flex-col">
          <p className="text-gray-800">
            You are using free plan,&nbsp;
            <button
              className="text-black underline underline-offset-2 hover:text-gray-800"
              onClick={() => {
                setShowUpgradeModal(true);
              }}
            >
              upgrade account.
            </button>
          </p>
        </div>
      )}

      {billingDetails?.status !== 'none' && !isLoadingBillingDetails && (
        <>
          {billingDetails?.status === 'past_due' && (
            <div className="mb-4 rounded-md border border-red-300 bg-red-50 p-2 text-sm text-red-500">
              We were not able to charge your card. Please update your payment
              information.
            </div>
          )}

          <div className="flex items-start gap-10">
            <div className="flex flex-col">
              <span className="text-gray-500">Plan</span>
              <span className="mt-1 text-lg font-medium capitalize text-black">
                {selectedPlanDetails?.name}
              </span>
            </div>
            <div className="flex grow items-center justify-between gap-2">
              <div className="flex flex-col">
                <span className="text-gray-500">Payment</span>
                <span className="mt-1 text-lg font-medium capitalize text-black">
                  ${priceDetails!.amount / 100}
                  <span className="text-sm font-normal text-gray-500">
                    &nbsp;/ {priceDetails!.interval}
                  </span>
                </span>
              </div>

              {!shouldHideDeleteButton && (
                <button
                  className="inline-flex items-center gap-1 self-end text-xs underline underline-offset-1 hover:text-gray-600"
                  onClick={() => {
                    setShowUpgradeModal(true);
                  }}
                >
                  Update Plan
                </button>
              )}
            </div>
          </div>

          <div className="mt-4 flex justify-between gap-2">
            <div className="flex flex-col">
              <span className="text-gray-500">
                {billingDetails?.cancelAtPeriodEnd ? 'Expires On' : 'Renews On'}
              </span>
              <span className="mt-1 text-lg font-medium capitalize text-black">
                {formattedNextBillDate}
              </span>
            </div>
            <button
              className="inline-flex self-end text-xs underline underline-offset-1 hover:text-gray-600 disabled:cursor-not-allowed disabled:opacity-50"
              onClick={() => {
                createCustomerPortal({});
              }}
              disabled={isCreatingCustomerPortal}
            >
              Manage my Subscription
            </button>
          </div>
        </>
      )}
    </>
  );
}
