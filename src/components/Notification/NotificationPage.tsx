import { useEffect, useState } from 'react';
import { httpGet, httpPatch } from '../../lib/http';
import { pageProgressMessage } from '../../stores/page';
import type { TeamMemberDocument } from '../TeamMembers/TeamMembersPage';
import { useToast } from '../../hooks/use-toast';
import { AcceptIcon } from '../ReactIcons/AcceptIcon.tsx';
import { XIcon } from 'lucide-react';

interface NotificationList extends TeamMemberDocument {
  name: string;
}

export function NotificationPage() {
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [notifications, setNotifications] = useState<NotificationList[]>([]);
  const [error, setError] = useState('');

  const lostNotifications = async () => {
    const { error, response } = await httpGet<NotificationList[]>(
      `${import.meta.env.PUBLIC_API_URL}/v1-get-invitation-list`,
    );
    if (error || !response) {
      toast.error(error?.message || 'Something went wrong');
      return;
    }

    setNotifications(response);
  };

  async function respondInvitation(
    status: 'accept' | 'reject',
    inviteId: string,
  ) {
    setIsLoading(true);
    setError('');
    const { response, error } = await httpPatch<{ teamId: string }>(
      `${import.meta.env.PUBLIC_API_URL}/v1-respond-invite/${inviteId}`,
      {
        status,
      },
    );
    if (error || !response) {
      setError(error?.message || 'Something went wrong');
      setIsLoading(false);
      return;
    }

    if (status === 'accept') {
      window.location.href = `/team/activity?t=${response.teamId}`;
    } else {
      window.dispatchEvent(
        new CustomEvent('refresh-notification', {
          detail: {
            count: notifications.length - 1,
          },
        }),
      );
      setNotifications(
        notifications.filter((notification) => notification._id !== inviteId),
      );
      setIsLoading(false);
    }
  }

  useEffect(() => {
    lostNotifications().finally(() => {
      pageProgressMessage.set('');
    });
  }, []);

  return (
    <div>
      <div className="mb-8 hidden md:block">
        <h2 className="text-3xl font-bold sm:text-4xl">Notification</h2>
        <p className="mt-2 text-gray-400">Manage your notifications</p>
      </div>
      {notifications.length === 0 && (
        <div className="mt-6 flex items-center justify-center">
          <p className="text-gray-400">
            No notifications, you can{' '}
            <a
              href="/team/new"
              className="text-blue-500 underline hover:no-underline"
            >
              create a team
            </a>{' '}
            and invite your friends to join.
          </p>
        </div>
      )}
      <div className="space-y-4">
        {notifications.map((notification) => (
          <div className="flex items-center justify-between rounded-md border p-2">
            <div className="flex items-center space-x-4">
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-gray-900">
                  {notification.name}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button
                type="button"
                disabled={isLoading}
                className="inline-flex rounded-sm border p-1 hover:bg-gray-50 disabled:opacity-75"
                onClick={() => respondInvitation('accept', notification?._id!)}
              >
                <AcceptIcon className="h-4 w-4" />
              </button>
              <button
                type="button"
                disabled={isLoading}
                className="inline-flex rounded-sm border p-1 hover:bg-gray-50 disabled:opacity-75"
                onClick={() => respondInvitation('reject', notification?._id!)}
              >
                <XIcon className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
