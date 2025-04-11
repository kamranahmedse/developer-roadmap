import { Copy, GitForkIcon, Loader2Icon } from 'lucide-react';
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
    <Modal
      onClose={isPending ? () => {} : onClose}
      wrapperClassName="h-auto items-start max-w-md w-full"
      overlayClassName="items-start md:items-center"
    >
      <div className="relative flex flex-col items-center p-8">
        <div className="p-4">
          <Copy className="size-12 text-gray-300" strokeWidth={1.5} />
        </div>

        <div className="mt-6 text-center">
          <h2 className="text-2xl font-bold text-gray-900">Fork Course</h2>
          <p className="mt-3 text-center leading-relaxed text-balance text-gray-600">
            Create a copy of this course to track your progress and make changes
            to suit your learning style.
          </p>
        </div>

        <div className="mt-8 grid w-full grid-cols-2 gap-3">
          <button
            disabled={isPending}
            onClick={onClose}
            className="flex items-center justify-center gap-2 rounded-lg border border-gray-200 px-4 py-2.5 font-medium text-gray-700 transition-all hover:border-gray-300 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Cancel
          </button>

          <button
            disabled={isPending}
            className="flex hover:opacity-80 items-center justify-center gap-2 rounded-lg bg-black px-4 py-2.5 font-medium text-white transition-all hover:bg-gray-900 disabled:cursor-not-allowed disabled:opacity-50"
            onClick={() => forkCourse()}
          >
            {isPending ? (
              <>
                <Loader2Icon className="size-4 animate-spin" />
                <span>Forking...</span>
              </>
            ) : (
              <>
                <GitForkIcon className="size-4" />
                <span>Fork Course</span>
              </>
            )}
          </button>
        </div>
      </div>
    </Modal>
  );
}
