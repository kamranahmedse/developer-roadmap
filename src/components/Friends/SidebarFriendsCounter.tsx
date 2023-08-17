import { httpGet } from '../../lib/http';
import type { TeamListResponse } from '../TeamDropdown/TeamDropdown';
import { useEffect, useState } from 'preact/hooks';

type GetFriendCountsResponse = {
  sentCount: number;
  acceptedCount: number;
  receivedCount: number;
  rejectedCount: number;
  gotRejectedCount: number;
};

export function SidebarFriendsCounter() {
  const [friendCounts, setFriendCounts] = useState<GetFriendCountsResponse>();
  async function getFriendCounts() {
    const { response, error } = await httpGet<GetFriendCountsResponse>(
      `${import.meta.env.PUBLIC_API_URL}/v1-get-friend-counts`
    );

    if (error || !response) {
      return;
    }

    setFriendCounts(response);
  }

  useEffect(() => {
    getFriendCounts().finally(() => null);
  }, []);

  const pendingCount = friendCounts?.receivedCount || 0;
  if (!pendingCount) {
    return (
      <span class="relative mr-1 flex items-center">
        <span class="relative rounded-full bg-gray-200 p-1 text-xs" />
        <span class="absolute bottom-0 left-0 right-0 top-0 animate-ping rounded-full bg-gray-400 p-1 text-xs" />
      </span>
    );
  }

  return (
    <span class="flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-xs font-medium text-white">
      {pendingCount}
    </span>
  );
}
