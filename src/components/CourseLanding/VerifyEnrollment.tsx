import { useEffect, useState } from 'react';
import { Loader2 } from 'lucide-react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { billingDetailsOptions } from '../../queries/billing';
import { queryClient } from '../../stores/query-client';
import { Modal } from '../Modal';
import { httpPost } from '../../lib/query-http';
import { useToast } from '../../hooks/use-toast';
import { courseProgressOptions } from '../../queries/course-progress';
import { isLoggedIn } from '../../lib/jwt';
import { deleteUrlParam } from '../../lib/browser';

type VerifyEnrollmentProps = {
  courseSlug: string;
};

export function VerifyEnrollment(props: VerifyEnrollmentProps) {
  const { courseSlug } = props;

  const { data: courseProgress, isFetching } = useQuery(
    {
      ...courseProgressOptions(courseSlug),
      enabled: !!isLoggedIn(),
      refetchInterval: 1000,
    },
    queryClient,
  );

  const toast = useToast();

  useEffect(() => {
    if (!courseProgress) {
      return;
    }

    if (courseProgress.startedAt) {
      deleteUrlParam('e');
      window.location.reload();
    }
  }, [courseProgress]);

  return (
    <Modal
      // it's an unique modal, so we don't need to close it
      // user can close it by refreshing the page
      onClose={() => {}}
      bodyClassName="rounded-xl bg-white p-6"
    >
      <div className="flex items-center justify-between gap-2">
        <h3 className="text-xl font-bold">Enrolling</h3>

        <div className="flex animate-pulse items-center gap-2">
          <Loader2 className="h-4 w-4 animate-spin stroke-[2.5px] text-gray-500" />
          <span className="text-gray-500">Refreshing</span>
        </div>
      </div>
      <p className="mt-2 text-balance text-gray-500">
        We are enrolling you to the course. Please wait.
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
