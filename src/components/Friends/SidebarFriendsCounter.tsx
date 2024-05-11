import { httpGet } from '../../lib/http';
import { useEffect, useState } from 'react';

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
    return null;
  }

  return (
    <span className="flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-xs font-medium text-white">
      {pendingCount}
    </span>
  );
}
