import { useMutation } from '@tanstack/react-query';
import type { USER_SUBSCRIPTION_PLAN_PRICES } from '../../queries/billing';
import { Modal } from '../Modal';
import { queryClient } from '../../stores/query-client';
import { useToast } from '../../hooks/use-toast';
import { VerifyUpgrade } from './VerifyUpgrade';
import { Loader2Icon } from 'lucide-react';
import { httpPost } from '../../lib/query-http';

type UpdatePlanBody = {
  priceId: string;
};

type UpdatePlanResponse = {
  status: 'ok';
};

type UpdatePlanConfirmationProps = {
  planDetails: (typeof USER_SUBSCRIPTION_PLAN_PRICES)[number];
  onClose: () => void;
  onCancel: () => void;
};

export function UpdatePlanConfirmation(props: UpdatePlanConfirmationProps) {
  const { planDetails, onClose, onCancel } = props;

  const toast = useToast();
  const {
    mutate: updatePlan,
    isPending,
    status,
  } = useMutation(
    {
      mutationFn: (body: UpdatePlanBody) => {
        return httpPost<UpdatePlanResponse>(
          '/v1-update-subscription-plan',
          body,
        );
      },
      onError: (error) => {
        console.error(error);
        toast.error(error?.message || 'Failed to Create Customer Portal');
      },
    },
    queryClient,
  );

  if (!planDetails) {
    return null;
  }

  const selectedPrice = planDetails;
  if (status === 'success') {
    return <VerifyUpgrade newPriceId={selectedPrice.priceId} />;
  }

  return (
    <Modal
      onClose={isPending ? () => {} : onClose}
      bodyClassName="rounded-xl bg-white p-4"
    >
      <h3 className="text-xl font-bold">Subscription Update</h3>
      <p className="mt-2 text-balance text-gray-500">
        Your plan will be updated to the{' '}
        <b className="text-gray-600">{planDetails.interval}</b> plan, and will
        be charged{' '}
        <b className="text-gray-600">
          ${selectedPrice.amount} {selectedPrice.interval}
        </b>
        .
      </p>

      <div className="mt-6 grid grid-cols-2 gap-2">
        <button
          className="rounded-md border border-gray-300 py-2 text-sm font-semibold hover:opacity-80 disabled:opacity-50"
          onClick={onCancel}
          disabled={isPending}
        >
          Cancel
        </button>
        <button
          className="flex items-center justify-center rounded-md border border-gray-800 bg-black py-2 text-sm font-semibold text-white hover:opacity-80 disabled:opacity-50"
          disabled={isPending}
          onClick={() => {
            updatePlan({ priceId: selectedPrice.priceId });
          }}
        >
          {isPending && (
            <Loader2Icon className="size-4 animate-spin stroke-[2.5]" />
          )}
          {!isPending && 'Confirm'}
        </button>
      </div>
    </Modal>
  );
}
