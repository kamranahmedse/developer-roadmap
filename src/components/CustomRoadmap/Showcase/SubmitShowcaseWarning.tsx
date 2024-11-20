import { useMutation } from '@tanstack/react-query';
import { Modal } from '../../Modal';
import { queryClient } from '../../../stores/query-client';
import { httpPost } from '../../../lib/query-http';
import { useStore } from '@nanostores/react';
import { currentRoadmap } from '../../../stores/roadmap';
import { useToast } from '../../../hooks/use-toast';
import { DateTime } from 'luxon';

type SubmitShowcaseWarningProps = {
  onClose: () => void;
};

export function SubmitShowcaseWarning(props: SubmitShowcaseWarningProps) {
  const { onClose } = props;

  const toast = useToast();
  const $currentRoadmap = useStore(currentRoadmap);

  const submit = useMutation(
    {
      mutationFn: async () => {
        return httpPost(`/v1-submit-for-showcase/${$currentRoadmap?._id}`, {});
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

  const {
    showcaseStatus,
    showcaseRejectedReason,
    showcaseRejectedAt,
    updatedAt,
  } = $currentRoadmap || {};

  return (
    <Modal onClose={onClose}>
      <div className="p-4">
        <h2 className="text-lg font-semibold">
          {showcaseStatus === 'rejected_with_reason'
            ? 'Rejected Reason'
            : 'Featured Listing'}
        </h2>
        <p className="mt-2 text-sm">
          {showcaseStatus === 'rejected_with_reason' && showcaseRejectedReason}
          {!showcaseStatus && (
            <>
              Submitting your roadmap for a featured listing will make it
              visible to everyone on the platform.{' '}
              <span className="font-medium">Are you sure?</span>
            </>
          )}
        </p>

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
            onClick={() => {
              const updatedAtDate =
                updatedAt && DateTime.fromJSDate(new Date(updatedAt));
              const showcaseRejectedAtDate =
                showcaseRejectedAt &&
                DateTime.fromJSDate(new Date(showcaseRejectedAt));

              if (
                showcaseRejectedAtDate &&
                updatedAtDate &&
                updatedAtDate < showcaseRejectedAtDate
              ) {
                toast.error(
                  'You need to make changes to your roadmap before resubmitting.',
                );
                return;
              }

              submit.mutate();
            }}
          >
            {submit.isPending
              ? 'Submitting...'
              : showcaseStatus === 'rejected_with_reason'
                ? 'Resubmit'
                : 'Submit'}
          </button>
        </div>
      </div>
    </Modal>
  );
}
