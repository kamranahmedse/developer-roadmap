import { useMutation } from '@tanstack/react-query';
import { useListConnectedCalenders } from '../../hooks/use-schedule';
import { Modal } from '../Modal';
import { Calendar, Loader2, Plus, BookOpen, Trash2 } from 'lucide-react';
import { httpPost } from '../../lib/query-http';
import { queryClient } from '../../stores/query-client';
import { useToast } from '../../hooks/use-toast';

type ConnectGoogleCalendarResponse = {
  redirectUrl: string;
};

type ScheduleEventModalProps = {
  onClose: () => void;
};

export function ScheduleEventModal(props: ScheduleEventModalProps) {
  const { onClose } = props;

  const toast = useToast();
  const { isLoading } = useListConnectedCalenders();

  const connectGoogleCalendar = useMutation<ConnectGoogleCalendarResponse>(
    {
      mutationFn: async () => {
        return httpPost('/v1-connect-google-calendar', {});
      },
      onSuccess(data) {
        const { redirectUrl } = data;
        if (!redirectUrl) {
          return;
        }

        window.location.href = redirectUrl;
      },
      onError(error) {
        toast.error(error?.message || 'Failed to connect Google Calendar');
      },
    },
    queryClient,
  );

  return (
    <Modal onClose={onClose}>
      <div className="flex max-w-md flex-col items-center p-4 py-10 text-center">
        <BookOpen className="text-primary h-14 w-14" />
        <h2 className="mt-4 text-xl font-bold tracking-tight">
          Learning Calendar
        </h2>
        <p className="mt-1 text-balance text-sm text-gray-600">
          Link your Google Calendar to start scheduling your learning sessions.
        </p>

        <button
          className="mt-4 flex items-center gap-2 rounded-full bg-black px-5 py-3 leading-none text-white disabled:opacity-60"
          onClick={() => {
            connectGoogleCalendar.mutate();
          }}
          disabled={connectGoogleCalendar.isPending}
        >
          <Calendar className="h-4 w-4 shrink-0 stroke-[2.5]" />
          Connect Calendar
        </button>
      </div>
    </Modal>
  );
}
