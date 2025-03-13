import { useEffect, useState } from 'react';
import { pageProgressMessage } from '../../stores/page';
import { useToast } from '../../hooks/use-toast';
import { useMutation, useQuery } from '@tanstack/react-query';
import {
  billingDetailsOptions,
  USER_SUBSCRIPTION_PLAN_PRICES,
} from '../../queries/billing';
import { queryClient } from '../../stores/query-client';
import { httpPost } from '../../lib/query-http';
import { UpgradeAccountModal } from './UpgradeAccountModal';
import { getUrlParams } from '../../lib/browser';
import { VerifyUpgrade } from './VerifyUpgrade';
import { EmptyBillingScreen } from './EmptyBillingScreen';
import {
  Calendar,
  RefreshCw,
  Loader2,
  CreditCard,
  ArrowRightLeft,
  CircleX,
} from 'lucide-react';
import { BillingWarning } from './BillingWarning';

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

  const isCanceled =
    billingDetails?.status === 'canceled' || billingDetails?.cancelAtPeriodEnd;
  const isPastDue = billingDetails?.status === 'past_due';

  const {
    mutate: createCustomerPortal,
    isSuccess: isCreatingCustomerPortalSuccess,
    isPending: isCreatingCustomerPortal,
  } = useMutation(
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

  const selectedPlanDetails = USER_SUBSCRIPTION_PLAN_PRICES.find(
    (plan) => plan.priceId === billingDetails?.priceId,
  );
  const priceDetails = selectedPlanDetails;

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
        <UpgradeAccountModal
          onClose={() => {
            setShowUpgradeModal(false);
          }}
          success="/account/billing?s=1"
          cancel="/account/billing"
        />
      )}

      {showVerifyUpgradeModal && <VerifyUpgrade />}

      {billingDetails?.status === 'none' && !isLoadingBillingDetails && (
        <EmptyBillingScreen onUpgrade={() => setShowUpgradeModal(true)} />
      )}

      {billingDetails?.status !== 'none' &&
        !isLoadingBillingDetails &&
        priceDetails && (
          <div className="mt-1">
            {isCanceled && (
              <BillingWarning
                icon={CircleX}
                message="Your subscription has been canceled."
                buttonText="Reactivate?"
                onButtonClick={() => {
                  createCustomerPortal({});
                }}
                isLoading={
                  isCreatingCustomerPortal || isCreatingCustomerPortalSuccess
                }
              />
            )}
            {isPastDue && (
              <BillingWarning
                message="We were not able to charge your card."
                buttonText="Update payment information."
                onButtonClick={() => {
                  createCustomerPortal({});
                }}
                isLoading={
                  isCreatingCustomerPortal || isCreatingCustomerPortalSuccess
                }
              />
            )}

            <h2 className="mb-2 text-xl font-semibold text-black">
              Current Subscription
            </h2>

            <p className="text-sm text-gray-500">
              Thank you for being a pro member. Your plan details are below.
            </p>

            <div className="mt-8 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-100">
                  <RefreshCw className="size-5 text-gray-600" />
                </div>
                <div>
                  <span className="text-xs uppercase tracking-wider text-gray-400">
                    Payment
                  </span>
                  <h3 className="flex items-baseline text-lg font-semibold text-black">
                    ${priceDetails.amount}
                    <span className="ml-1 text-sm font-normal text-gray-500">
                      / {priceDetails.interval}
                    </span>
                  </h3>
                </div>
              </div>
            </div>

            <div className="mt-6 border-t border-gray-100 pt-6">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-100">
                  <Calendar className="size-5 text-gray-600" />
                </div>
                <div>
                  <span className="text-xs uppercase tracking-wider text-gray-400">
                    {billingDetails?.cancelAtPeriodEnd
                      ? 'Expires On'
                      : 'Renews On'}
                  </span>
                  <h3 className="text-lg font-semibold text-black">
                    {formattedNextBillDate}
                  </h3>
                </div>
              </div>

              <div className="mt-8 flex gap-3 max-sm:flex-col">
                {!isCanceled && (
                  <button
                    className="inline-flex items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm transition-colors hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 max-sm:flex-grow"
                    onClick={() => {
                      setShowUpgradeModal(true);
                    }}
                  >
                    <ArrowRightLeft className="mr-2 h-4 w-4" />
                    Switch Plan
                  </button>
                )}

                <button
                  className="inline-flex items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm transition-colors hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  onClick={() => {
                    createCustomerPortal({});
                  }}
                  disabled={
                    isCreatingCustomerPortal || isCreatingCustomerPortalSuccess
                  }
                >
                  {isCreatingCustomerPortal ||
                  isCreatingCustomerPortalSuccess ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <CreditCard className="mr-2 h-4 w-4" />
                  )}
                  Manage Subscription
                </button>
              </div>
            </div>
          </div>
        )}
    </>
  );
}
