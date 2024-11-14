import { useMutation } from '@tanstack/react-query';
import { Modal } from '../../Modal';
import { queryClient } from '../../../stores/query-client';
import { httpPost } from '../../../lib/query-http';
import { useStore } from '@nanostores/react';
import { currentRoadmap } from '../../../stores/roadmap';
import { useToast } from '../../../hooks/use-toast';

type RejectedReasonProps = {
  onClose: () => void;
};

export function RejectedReason(props: RejectedReasonProps) {
  const { onClose } = props;

  const toast = useToast();
  const $currentRoadmap = useStore(currentRoadmap);

  const submit = useMutation(
    {
      mutationFn: async () => {
        return httpPost(
          `/v1-submit-for-featured-listing/${$currentRoadmap?._id}`,
          {},
        );
      },
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ['get-roadmap'],
        });

        onClose();
      },
      onError: (error) => {
        toast.error(error?.message || 'Something went wrong');
      },
    },
    queryClient,
  );

  return (
    <Modal onClose={onClose}>
      <div className="p-4">
        <h2 className="text-lg font-semibold">Rejected Reason</h2>
        <p className="mt-2 text-sm">{$currentRoadmap?.featuredListReason}</p>

        <div className="mt-4 grid grid-cols-2 gap-2">
          <button
            className="flex-grow cursor-pointer rounded-lg bg-gray-200 py-2 text-center text-sm hover:bg-gray-300"
            onClick={onClose}
            disabled={submit.isPending}
          >
            Cancel
          </button>
          <button
            className="w-full rounded-lg bg-gray-900 py-2 text-sm text-white hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-60"
            disabled={submit.isPending}
            onClick={() => submit.mutate()}
          >
            {submit.isPending ? 'Submitting...' : 'Resubmit'}
          </button>
        </div>
      </div>
    </Modal>
  );
}
