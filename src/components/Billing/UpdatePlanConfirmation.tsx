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
      bodyClassName="rounded-xl bg-white p-6"
    >
      <h3 className="text-xl font-bold text-black">Subscription Update</h3>
      <p className="mt-2 text-balance text-gray-600">
        Your plan will be updated to the{' '}
        <b className="text-black">{planDetails.interval}</b> plan, and will
        be charged{' '}
        <b className="text-black">
          ${selectedPrice.amount}/{selectedPrice.interval}
        </b>
        .
      </p>

      <div className="mt-6 grid grid-cols-2 gap-3">
        <button
          className="rounded-md border border-gray-200 py-2 text-sm font-semibold hover:bg-gray-50 transition-colors disabled:opacity-50"
          onClick={onCancel}
          disabled={isPending}
        >
          Cancel
        </button>
        <button
          className="flex items-center justify-center rounded-md bg-purple-600 py-2 text-sm font-semibold text-white hover:bg-purple-500 transition-colors disabled:opacity-50"
          disabled={isPending}
          onClick={() => {
            updatePlan({ priceId: selectedPrice.priceId });
          }}
        >
          {isPending && (
            <Loader2Icon className="size-4 animate-spin stroke-[2.5] mr-2" />
          )}
          {!isPending && 'Confirm'}
        </button>
      </div>
    </Modal>
  );
}
