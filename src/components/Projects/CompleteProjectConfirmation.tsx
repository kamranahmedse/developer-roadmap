import { useMutation } from '@tanstack/react-query';
import { queryClient } from '../../stores/query-client';
import { Modal } from '../Modal';
import { httpPost } from '../../lib/query-http';
import { useToast } from '../../hooks/use-toast';
import { Loader2Icon } from 'lucide-react';
import { projectStatusOptions } from '../../queries/project';

type CompleteProjectConfirmationProps = {
  projectId: string;
  onClose: () => void;
};

export function CompleteProjectConfirmation(
  props: CompleteProjectConfirmationProps,
) {
  const { onClose, projectId } = props;

  const toast = useToast();

  const { mutate: completeProject, isPending: isCompletingProject } =
    useMutation(
      {
        mutationFn: () => {
          return httpPost<{
            startedAt: Date;
          }>(
            `${import.meta.env.PUBLIC_API_URL}/v1-mark-as-done-project/${projectId}`,
            {},
          );
        },
        onSettled: () => {
          queryClient.invalidateQueries(projectStatusOptions(projectId));
        },
        onError: (error) => {
          toast.error(error?.message || 'Failed to start project');
        },
        onSuccess: () => {
          onClose();
        },
      },
      queryClient,
    );

  return (
    <Modal onClose={onClose} bodyClassName="h-auto p-4">
      <h2 className="mb-2 flex items-center gap-2.5 text-xl font-semibold">
        Complete Project
      </h2>
      <p className="text-sm text-gray-500">
        Are you sure you want to mark this project as completed?
      </p>

      <div className="mt-4 grid grid-cols-2 gap-2">
        <button
          onClick={onClose}
          className="rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-200"
        >
          Cancel
        </button>
        <button
          onClick={() => completeProject()}
          className="flex h-9 items-center justify-center gap-2 rounded-lg bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700"
        >
          {isCompletingProject ? (
            <Loader2Icon className="h-4 w-4 animate-spin stroke-[2.5]" />
          ) : (
            'Complete Project'
          )}
        </button>
      </div>
    </Modal>
  );
}
