import { useEffect } from 'react';
import { Loader2, CheckCircle } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { billingDetailsOptions } from '../../queries/billing';
import { queryClient } from '../../stores/query-client';
import { Modal } from '../Modal';
import { deleteUrlParam } from '../../lib/browser';

type VerifyUpgradeProps = {
  newPriceId?: string;
};

export function VerifyUpgrade(props: VerifyUpgradeProps) {
  const { newPriceId } = props;

  const { data: userBillingDetails } = useQuery(
    {
      ...billingDetailsOptions(),
      refetchInterval: 1000,
    },
    queryClient,
  );

  useEffect(() => {
    if (!userBillingDetails) {
      return;
    }

    if (
      userBillingDetails.status === 'active' &&
      (newPriceId ? userBillingDetails.priceId === newPriceId : true)
    ) {
      deleteUrlParam('s');
      window.location.reload();

      if (newPriceId) {
        return;
      }

      // it means that the user is subscribing for the first time
      // not changing the plan
      window?.fireEvent({
        action: `tutor_purchase_${userBillingDetails.interval === 'month' ? 'mo' : 'an'}`,
        category: 'ai_tutor',
        label: `${userBillingDetails.interval} Plan Purchased`,
      });
    }
  }, [userBillingDetails]);

  useEffect(() => {
    // it means that the user is changing the plan
    // not subscribing for the first time
    if (newPriceId) {
      return;
    }

    window?.fireEvent({
      action: 'tutor_purchase',
      category: 'ai_tutor',
      label: 'Subscription Activated',
    });
    window?.fireEvent({
      action: 'tutor_ty',
      category: 'ai_tutor',
      label: 'Thank You Page Visited',
    });
  }, [newPriceId]);

  return (
    <Modal
      // it's an unique modal, so we don't need to close it
      // user can close it by refreshing the page
      onClose={() => {}}
      bodyClassName="rounded-xl bg-white p-6"
    >
      <div className="mb-4 flex flex-col items-center text-center">
        <CheckCircle className="mb-3 h-12 w-12 text-green-600" />
        <h3 className="text-xl font-bold text-black">Subscription Activated</h3>
      </div>

      <p className="mt-2 text-center text-balance text-gray-600">
        Your subscription has been activated successfully.
      </p>

      <p className="mt-4 text-center text-balance text-gray-600">
        It might take a minute for the changes to reflect. We will{' '}
        <b className="text-black">reload</b> the page for you.
      </p>

      <div className="my-6 flex animate-pulse items-center justify-center gap-2">
        <Loader2 className="size-4 animate-spin stroke-[2.5px] text-green-600" />
        <span className="text-gray-600">Please wait...</span>
      </div>

      <p className="text-center text-sm text-gray-500">
        If it takes longer than expected, please email us at{' '}
        <a
          href="mailto:info@roadmap.sh"
          className="text-blue-600 underline underline-offset-2 hover:text-blue-700"
        >
          info@roadmap.sh
        </a>
        .
      </p>
    </Modal>
  );
}
