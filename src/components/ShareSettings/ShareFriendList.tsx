import { useEffect, useState } from 'react';
import { Users } from 'lucide-react';
import { useToast } from '../../hooks/use-toast';
import { UserItem } from './UserItem';
import { httpGet } from '../../lib/http';

export type FriendshipStatus =
  | 'none'
  | 'sent'
  | 'received'
  | 'accepted'
  | 'rejected'
  | 'got_rejected';

type FriendResourceProgress = {
  updatedAt: string;
  title: string;
  resourceId: string;
  resourceType: string;
  learning: number;
  skipped: number;
  done: number;
  total: number;
};

export type ListFriendsResponse = {
  userId: string;
  name: string;
  email: string;
  avatar: string;
  status: FriendshipStatus;
  roadmaps: FriendResourceProgress[];
  bestPractices: FriendResourceProgress[];
}[];

type ShareFriendListProps = {
  defaultSharedFriendIds: string[];
  setFriends: (friends: ListFriendsResponse) => void;
  friends: ListFriendsResponse;
  sharedFriendIds: string[];
  setSharedFriendIds: (friendIds: string[]) => void;
};

export function ShareFriendList(props: ShareFriendListProps) {
  const {
    setFriends,
    friends,
    sharedFriendIds,
    setSharedFriendIds,
    defaultSharedFriendIds,
  } = props;
  const toast = useToast();

  const [isLoading, setIsLoading] = useState(true);

  async function loadFriends() {
    if (friends.length > 0) {
      return;
    }

    setIsLoading(true);
    const { response, error } = await httpGet<ListFriendsResponse>(
      `${import.meta.env.PUBLIC_API_URL}/v1-list-friends`
    );

    if (error || !response) {
      toast.error(error?.message || 'Something went wrong');
      return;
    }

    setSharedFriendIds(
      defaultSharedFriendIds.length > 0
        ? defaultSharedFriendIds
        : response.map((friend) => friend.userId?.toString()!)
    );
    setFriends(response);
  }

  useEffect(() => {
    loadFriends().finally(() => {
      setIsLoading(false);
    });
  }, []);

  const acceptedFriends = friends.filter(
    (friend) => friend.status === 'accepted'
  );

  const loadingFriends = isLoading && (
    <ul className="mt-2 grid grid-cols-3 gap-1.5">
      {[...Array(3)].map((_, idx) => (
        <li
          key={idx}
          className="flex animate-pulse items-center gap-2 rounded-md border p-2"
        >
          <div className="h-8 w-8 shrink-0 rounded-full bg-gray-200" />
          <div className="inline-grid w-full">
            <div className="h-5 w-2/4 rounded bg-gray-200" />
            <div className="mt-1 h-5 w-3/4 rounded bg-gray-200" />
          </div>
        </li>
      ))}
    </ul>
  );

  return (
    <>
      {(acceptedFriends.length > 0 || isLoading) && (
        <div className="flex items-center justify-between gap-2">
          <p>Select Friends</p>

          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={sharedFriendIds.length === acceptedFriends.length}
              onChange={(e) => {
                if (e.target.checked) {
                  setSharedFriendIds(acceptedFriends.map((f) => f.userId));
                } else {
                  setSharedFriendIds([]);
                }
              }}
            />
            <span className="text-sm">Select all</span>
          </label>
        </div>
      )}

      {loadingFriends}
      {acceptedFriends.length > 0 && !isLoading && (
        <ul className="mt-2 grid grid-cols-3 gap-1.5">
          {acceptedFriends.map((friend) => {
            const isSelected = sharedFriendIds?.includes(friend.userId);
            return (
              <li key={friend.userId}>
                <UserItem
                  user={{
                    name: friend.name,
                    avatar: friend.avatar,
                    email: friend.email,
                  }}
                  isSelected={isSelected}
                  onClick={() => {
                    if (isSelected) {
                      setSharedFriendIds(
                        sharedFriendIds.filter((id) => id !== friend.userId)
                      );
                    } else {
                      setSharedFriendIds([...sharedFriendIds, friend.userId]);
                    }
                  }}
                />
              </li>
            );
          })}
        </ul>
      )}

      {acceptedFriends.length === 0 && !isLoading && (
        <div className="flex grow flex-col items-center justify-center gap-2">
          <Users className="h-12 w-12 text-gray-500" />
          <p className="text-gray-500">You haven't added any friends yet.</p>
        </div>
      )}
    </>
  );
}
