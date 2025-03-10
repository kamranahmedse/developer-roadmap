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
      <div className="flex flex-col items-center text-center mb-4">
        <CheckCircle className="h-12 w-12 text-green-600 mb-3" />
        <h3 className="text-xl font-bold text-black">Subscription Activated</h3>
      </div>
      
      <p className="mt-2 text-balance text-gray-600 text-center">
        Your subscription has been activated successfully.
      </p>

      <p className="mt-4 text-balance text-gray-600 text-center">
        It might take a few minutes for the changes to reflect. We will{' '}
        <b className="text-black">reload</b> the page for you.
      </p>

      {isFetching && (
        <div className="flex animate-pulse items-center justify-center gap-2 mt-4">
          <Loader2 className="h-5 w-5 animate-spin stroke-[2.5px] text-green-600" />
          <span className="text-gray-600">Refreshing</span>
        </div>
      )}

      <p className="mt-6 text-gray-500 text-center text-sm">
        If it takes longer than expected, please{' '}
        <a className="text-blue-600 underline underline-offset-2 hover:text-blue-700">
          contact us
        </a>.
      </p>
    </Modal>
  );
}
