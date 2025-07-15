import { useMutation } from '@tanstack/react-query';
import { queryClient } from '../../stores/query-client';
import { Modal } from '../Modal';
import { httpPost } from '../../lib/query-http';
import { useToast } from '../../hooks/use-toast';
import { Loader2Icon } from 'lucide-react';
import { projectStatusOptions } from '../../queries/project';

type StartProjectConfirmationProps = {
  projectId: string;
  onClose: () => void;
};

export function StartProjectConfirmation(props: StartProjectConfirmationProps) {
  const { onClose, projectId } = props;

  const toast = useToast();

  const { mutate: startProject, isPending: isStartingProject } = useMutation(
    {
      mutationFn: () => {
        return httpPost<{
          startedAt: Date;
        }>(
          `${import.meta.env.PUBLIC_API_URL}/v1-start-project/${projectId}`,
          {},
        );
      },
      onSettled: () => {
        queryClient.invalidateQueries(projectStatusOptions(projectId));
      },
      onSuccess: () => {
        onClose();
      },
      onError: (error) => {
        toast.error(error?.message || 'Failed to start project');
      },
    },
    queryClient,
  );

  return (
    <Modal onClose={onClose} bodyClassName="h-auto p-4">
      <h2 className="mb-2 flex items-center gap-2.5 text-xl font-semibold">
        Start Project
      </h2>
      <p className="text-sm text-gray-500">
        Are you sure you want to start this project?
      </p>

      <div className="mt-4 grid grid-cols-2 gap-2">
        <button
          onClick={onClose}
          className="rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-200"
        >
          Cancel
        </button>
        <button
          onClick={() => startProject()}
          className="flex h-9 items-center justify-center gap-2 rounded-lg bg-purple-600 px-4 py-2 text-sm font-medium text-white hover:bg-purple-700"
        >
          {isStartingProject ? (
            <Loader2Icon className="h-4 w-4 animate-spin stroke-[2.5]" />
          ) : (
            'Start Project'
          )}
        </button>
      </div>
    </Modal>
  );
}
