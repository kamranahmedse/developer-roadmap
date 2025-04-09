import { GitForkIcon, Loader2Icon } from 'lucide-react';
import { Modal } from '../Modal';
import type { AICourseDocument } from '../../queries/ai-course';
import { useMutation } from '@tanstack/react-query';
import { queryClient } from '../../stores/query-client';
import { httpPost } from '../../lib/query-http';
import { useToast } from '../../hooks/use-toast';
import { useState } from 'react';

type ForkAICourseParams = {
  aiCourseSlug: string;
};

type ForkAICourseBody = {};

type ForkAICourseQuery = {};

type ForkAICourseResponse = AICourseDocument;

type ForkCourseConfirmationProps = {
  onClose: () => void;
  courseSlug: string;
};

export function ForkCourseConfirmation(props: ForkCourseConfirmationProps) {
  const { onClose, courseSlug } = props;

  const toast = useToast();
  const [isPending, setIsPending] = useState(false);
  const { mutate: forkCourse } = useMutation(
    {
      mutationFn: async () => {
        setIsPending(true);
        return httpPost(
          `${import.meta.env.PUBLIC_API_URL}/v1-fork-ai-course/${courseSlug}`,
          {},
        );
      },
      onSuccess(data) {
        window.location.href = `/ai/${data.slug}`;
      },
      onError(error) {
        toast.error(error?.message || 'Failed to fork course');
        setIsPending(false);
      },
    },
    queryClient,
  );

  return (
    <Modal onClose={isPending ? () => {} : onClose}>
      <div className="flex flex-col items-center p-4 pt-8">
        <GitForkIcon className="size-14 text-gray-500" />
        <p className="mt-2 text-xl font-medium">Fork Course</p>
        <p className="mt-1 text-center text-balance text-gray-500">
          Forking this course will create a new course with the same content.
        </p>

        <div className="mt-4 grid w-full grid-cols-2 gap-2">
          <button
            disabled={isPending}
            className="flex items-center justify-center gap-2 rounded-md bg-gray-100 p-2 hover:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Cancel
          </button>

          <button
            disabled={isPending}
            className="flex h-10 items-center justify-center gap-2 rounded-md bg-black p-2 text-white hover:opacity-80 disabled:cursor-not-allowed disabled:opacity-50"
            onClick={() => {
              forkCourse();
            }}
          >
            {isPending ? (
              <Loader2Icon className="size-4 animate-spin" />
            ) : (
              'Fork Course'
            )}
          </button>
        </div>
      </div>
    </Modal>
  );
}
