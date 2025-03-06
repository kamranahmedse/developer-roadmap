import { useEffect } from 'react';
import { Loader2 } from 'lucide-react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { billingDetailsOptions } from '../../queries/billing';
import { queryClient } from '../../stores/query-client';
import { Modal } from '../Modal';
import { deleteUrlParam } from '../../lib/browser';

type VerifyUpgradeProps = {
  newPriceId?: string;
};

export function VerifyUpgrade(props: VerifyUpgradeProps) {
  const { newPriceId } = props;

  const { data: userBillingDetails, isFetching } = useQuery(
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
    }
  }, [userBillingDetails]);

  return (
    <Modal
      // it's an unique modal, so we don't need to close it
      // user can close it by refreshing the page
      onClose={() => {}}
      bodyClassName="rounded-xl bg-white p-6"
    >
      <div className="flex items-center justify-between gap-2">
        <h3 className="text-xl font-bold">Subscription Activated</h3>

        {isFetching && (
          <div className="flex animate-pulse items-center gap-2">
            <Loader2 className="h-4 w-4 animate-spin stroke-[2.5px] text-gray-500" />
            <span className="text-gray-500">Refreshing</span>
          </div>
        )}
      </div>
      <p className="mt-2 text-balance text-gray-500">
        Your subscription has been activated successfully.
      </p>

      <p className="mt-4 text-balance text-gray-500">
        It might take a few minutes for the changes to reflect. We will{' '}
        <b className="text-gray-600">reload</b> the page for you.
      </p>

      <p className="mt-4 text-gray-500">
        If it takes longer than expected, please{' '}
        <a className="text-blue-500 underline underline-offset-2 hover:text-blue-300">
          contact us
        </a>
        .
      </p>
    </Modal>
  );
}
