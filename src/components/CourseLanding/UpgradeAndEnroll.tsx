import { useEffect, useState } from 'react';
import { Loader2 } from 'lucide-react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { billingDetailsOptions } from '../../queries/billing';
import { queryClient } from '../../stores/query-client';
import { Modal } from '../Modal';
import { httpPost } from '../../lib/query-http';
import { useToast } from '../../hooks/use-toast';

type UpgradeAndEnrollProps = {
  courseSlug: string;
};

export function UpgradeAndEnroll(props: UpgradeAndEnrollProps) {
  const { courseSlug } = props;

  const { data: userBillingDetails, isFetching } = useQuery(
    {
      ...billingDetailsOptions(),
      refetchInterval: 1000,
    },
    queryClient,
  );

  const toast = useToast();
  const [isEnrolled, setIsEnrolled] = useState(false);

  const { mutate: enroll, isPending: isEnrolling } = useMutation(
    {
      mutationFn: () => {
        return httpPost(`/v1-enroll-course/${courseSlug}`, {});
      },
      onSuccess: () => {
        setIsEnrolled(true);
        const courseUrl = `${import.meta.env.PUBLIC_COURSE_APP_URL}/${courseSlug}`;
        window.location.href = courseUrl;
      },
      onError: (error) => {
        console.error(error);
        toast.error(error?.message || 'Failed to enroll');
      },
      onMutate: () => {
        queryClient.cancelQueries(billingDetailsOptions());
      },
    },
    queryClient,
  );

  useEffect(() => {
    if (!userBillingDetails || isEnrolling) {
      return;
    }

    if (userBillingDetails.status === 'active' && !isEnrolled) {
      enroll();
    }
  }, [userBillingDetails, isEnrolling, isEnrolled]);

  return (
    <Modal
      // it's an unique modal, so we don't need to close it
      // user can close it by refreshing the page
      onClose={() => {}}
      bodyClassName="rounded-xl bg-white p-6"
    >
      <div className="flex items-center justify-between gap-2">
        <h3 className="text-xl font-bold">Activated & Enrolling</h3>

        {isFetching && (
          <div className="flex animate-pulse items-center gap-2">
            <Loader2 className="h-4 w-4 animate-spin stroke-[2.5px] text-gray-500" />
            <span className="text-gray-500">Refreshing</span>
          </div>
        )}
      </div>
      <p className="mt-2 text-balance text-gray-500">
        Your subscription has been activated successfully, we are enrolling you
        to the course.
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
